<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { saveErrorQuestion } from '~/utils/ocr-api'

const props = defineProps<{
  questionData: {
    question?: string;
    answer?: string;
    explanation?: string;
    options?: string[];
  };
}>()

const emit = defineEmits(['saved', 'error'])

// 表单数据
const formData = ref({
  question_text: props.questionData.question || '',
  correct_answer: props.questionData.answer || '',
  options: props.questionData.options ? props.questionData.options.map((opt, i) => 
    opt.startsWith(String.fromCharCode(65 + i)) ? opt : `${String.fromCharCode(65 + i)}. ${opt}`
  ) : [],
  analysis: props.questionData.explanation || '',
  subject: '',
  difficulty: 3,
  student_answer: ''
})

// 用于星级评分的悬停效果
const hoverRating = ref(0)

// 主题选项
const subjectOptions = [
  '数学', '语文', '英语', '物理', '化学', '生物', 
  '历史', '地理', '政治', '其他'
]

// 验证
const isValid = computed(() => {
  return formData.value.question_text.trim() !== '' && 
         formData.value.correct_answer.trim() !== ''
})

// 保存错题
const isSaving = ref(false)
const saveError = ref('')

async function handleSave() {
  if (!isValid.value) {
    saveError.value = '请至少填写题目和正确答案'
    return
  }
  
  saveError.value = ''
  isSaving.value = true
  
  try {
    // 确保选项格式正确（带有A. B. C.前缀）
    const formattedOptions = formData.value.options.map((opt, i) => {
      const prefix = `${String.fromCharCode(65 + i)}. `;
      return opt.startsWith(prefix) ? opt : prefix + opt;
    });
    
    // 确保难度值是纯数字
    const difficulty = parseInt(formData.value.difficulty.toString(), 10) || 3;
    
    // 发送请求
    const result = await saveErrorQuestion({
      question_text: formData.value.question_text,
      correct_answer: formData.value.correct_answer,
      options: formattedOptions,
      analysis: formData.value.analysis,
      subject: formData.value.subject,
      difficulty: difficulty,
      student_answer: formData.value.student_answer
    });
    
    emit('saved', result)
  } catch (err: any) {
    saveError.value = err.message || '保存失败'
    emit('error', err)
  } finally {
    isSaving.value = false
  }
}

// 初始化表单数据
function updateFormFromProps() {
  if (props.questionData) {
    formData.value.question_text = props.questionData.question || formData.value.question_text
    formData.value.correct_answer = props.questionData.answer || formData.value.correct_answer
    
    // 确保选项格式正确
    if (props.questionData.options) {
      formData.value.options = props.questionData.options.map((opt, i) => {
        const prefix = `${String.fromCharCode(65 + i)}. `;
        return opt.startsWith(prefix) ? opt : prefix + opt;
      });
    }
    
    formData.value.analysis = props.questionData.explanation || formData.value.analysis
  }
}

// 监听属性变化
watch(() => props.questionData, updateFormFromProps, { deep: true })

// 初始化
onMounted(updateFormFromProps)
</script>

<template>
  <div class="bg-white rounded-lg border shadow-sm p-6">
    <h3 class="text-xl font-semibold mb-4">保存为错题</h3>
    
    <div v-if="saveError" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
      {{ saveError }}
    </div>
    
    <form @submit.prevent="handleSave" class="space-y-4">
      <!-- 题目 -->
      <div>
        <label class="block text-sm font-medium mb-1">题目文本 <span class="text-red-500">*</span></label>
        <textarea 
          v-model="formData.question_text"
          required
          rows="3"
          class="w-full border rounded-md px-3 py-2"
          placeholder="输入题目内容"
        ></textarea>
      </div>
      
      <!-- 选项 -->
      <div v-if="formData.options.length > 0">
        <label class="block text-sm font-medium mb-1">选项</label>
        <div class="space-y-2">
          <div v-for="(option, index) in formData.options" :key="index" class="flex items-center">
            <div class="flex-none w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full mr-2">
              {{ String.fromCharCode(65 + index) }}
            </div>
            <input 
              v-model="formData.options[index]"
              type="text"
              class="flex-1 border rounded-md px-3 py-2"
              :placeholder="`选项 ${String.fromCharCode(65 + index)}`"
            />
            <button 
              type="button"
              @click="formData.options.splice(index, 1)"
              class="ml-2 text-red-500 hover:text-red-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        <button 
          type="button"
          @click="formData.options.push(`${String.fromCharCode(65 + formData.options.length)}. `)"
          class="mt-2 text-sm text-primary hover:text-primary-dark"
        >
          + 添加选项
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- 正确答案 -->
        <div>
          <label class="block text-sm font-medium mb-1">正确答案 <span class="text-red-500">*</span></label>
          <input 
            v-model="formData.correct_answer"
            required
            type="text"
            class="w-full border rounded-md px-3 py-2"
            placeholder="输入正确答案"
          />
        </div>
        
        <!-- 我的答案 -->
        <div>
          <label class="block text-sm font-medium mb-1">我的答案</label>
          <input 
            v-model="formData.student_answer"
            type="text"
            class="w-full border rounded-md px-3 py-2"
            placeholder="输入你的答案（可选）"
          />
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- 学科 -->
        <div>
          <label class="block text-sm font-medium mb-1">学科</label>
          <select
            v-model="formData.subject"
            class="w-full border rounded-md px-3 py-2"
          >
            <option value="">-- 选择学科 --</option>
            <option v-for="subject in subjectOptions" :key="subject" :value="subject">
              {{ subject }}
            </option>
          </select>
        </div>
        
        <!-- 难度 -->
        <div>
          <label class="block text-sm font-medium mb-1">难度</label>
          <div class="flex items-center">
            <div class="flex">
              <span 
                v-for="i in 5" 
                :key="i" 
                class="text-2xl cursor-pointer"
                @click="formData.difficulty = i"
                @mouseover="hoverRating = i"
                @mouseleave="hoverRating = 0"
              >
                <span v-if="(hoverRating || formData.difficulty) >= i" class="text-yellow-400">★</span>
                <span v-else class="text-gray-300">★</span>
              </span>
            </div>
            <span class="ml-2 text-sm text-gray-500">{{ formData.difficulty }} / 5</span>
          </div>
        </div>
      </div>
      
      <!-- 解析 -->
      <div>
        <label class="block text-sm font-medium mb-1">解析</label>
        <textarea 
          v-model="formData.analysis"
          rows="3"
          class="w-full border rounded-md px-3 py-2"
          placeholder="输入解析内容（可选）"
        ></textarea>
      </div>
      
      <!-- 提交按钮 -->
      <div class="flex justify-end">
        <button
          type="submit"
          :disabled="!isValid || isSaving"
          class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isSaving">保存中...</span>
          <span v-else>保存错题</span>
        </button>
      </div>
    </form>
  </div>
</template> 