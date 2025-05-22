<script setup lang="ts">
import { ref } from 'vue'
import { saveErrorQuestion } from '~/utils/ocr-api'
import { isAuthenticated } from '~/utils/auth'

const props = defineProps<{
  question: {
    id?: number;
    text: string;
    answer?: string;
    options?: string[];
    explanation?: string;
  };
  index: number;
}>()

const emit = defineEmits(['saved', 'error'])

const isLoggedIn = ref(isAuthenticated())
const isSaving = ref(false)
const showForm = ref(false)
const saveSuccess = ref(false)
const error = ref('')
const hoverRating = ref(0)

// 表单数据
const formData = ref({
  question_text: props.question.text || '',
  correct_answer: props.question.answer || '',
  options: props.question.options ? props.question.options.map((opt, i) => 
    opt.startsWith(String.fromCharCode(65 + i)) ? opt : `${String.fromCharCode(65 + i)}. ${opt}`
  ) : [],
  analysis: props.question.explanation || '',
  subject: '',
  difficulty: 3,
  student_answer: ''
})

// 主题选项
const subjectOptions = [
  '数学', '语文', '英语', '物理', '化学', '生物', 
  '历史', '地理', '政治', '其他'
]

function handleSaveClick() {
  if (!isLoggedIn.value) {
    error.value = '请先登录后再保存错题'
    return
  }
  
  showForm.value = true
  saveSuccess.value = false
}

async function handleSave() {
  if (formData.value.question_text.trim() === '' || formData.value.correct_answer.trim() === '') {
    error.value = '请至少填写题目和正确答案'
    return
  }
  
  error.value = ''
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
    
    saveSuccess.value = true
    showForm.value = false
    emit('saved', result)
  } catch (err: any) {
    error.value = err.message || '保存失败'
    emit('error', err)
  } finally {
    isSaving.value = false
  }
}

function cancelSave() {
  showForm.value = false
  error.value = ''
}
</script>

<template>
  <div class="border rounded-lg p-4 mb-4 bg-white relative">
    <!-- 题目编号和内容 -->
    <div class="flex items-start">
      <div class="font-bold mr-2 text-gray-700">{{ index + 1 }}.</div>
      <div class="flex-1">{{ question.text }}</div>
    </div>
    
    <!-- 保存成功提示 -->
    <div v-if="saveSuccess" class="mt-2 text-green-600 text-sm flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      已添加到错题本
    </div>
    
    <!-- 错误提示 -->
    <div v-if="error" class="mt-2 text-red-600 text-sm">
      {{ error }}
    </div>
    
    <!-- 收藏按钮 -->
    <div v-if="!showForm && !saveSuccess" class="absolute top-4 right-4">
      <button 
        @click="handleSaveClick"
        class="px-2 py-1 bg-blue-50 text-blue-600 text-sm rounded border border-blue-200 hover:bg-blue-100 flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        收纳进错题本
      </button>
    </div>
    
    <!-- 保存表单 -->
    <div v-if="showForm" class="mt-4 border-t pt-4">
      <h4 class="font-medium mb-3">添加到错题本</h4>
      
      <div class="space-y-3">
        <!-- 题目 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">题目</label>
          <textarea 
            v-model="formData.question_text"
            rows="2"
            class="w-full px-3 py-2 border rounded-md text-sm"
          ></textarea>
        </div>
        
        <!-- 答案 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">正确答案</label>
          <input 
            type="text"
            v-model="formData.correct_answer"
            class="w-full px-3 py-2 border rounded-md text-sm"
          />
        </div>
        
        <!-- 学科 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">学科</label>
          <select 
            v-model="formData.subject"
            class="w-full px-3 py-2 border rounded-md text-sm"
          >
            <option value="">选择学科</option>
            <option v-for="subject in subjectOptions" :key="subject" :value="subject">
              {{ subject }}
            </option>
          </select>
        </div>
        
        <!-- 难度 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">难度</label>
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
        
        <!-- 按钮 -->
        <div class="flex space-x-2 justify-end">
          <button 
            @click="cancelSave"
            class="px-3 py-1 border rounded-md text-sm hover:bg-gray-50"
          >
            取消
          </button>
          
          <button 
            @click="handleSave"
            :disabled="isSaving"
            class="px-3 py-1 bg-primary text-white rounded-md text-sm hover:bg-primary/90 disabled:opacity-50"
          >
            {{ isSaving ? '保存中...' : '保存' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template> 