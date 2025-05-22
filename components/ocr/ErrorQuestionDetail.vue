<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  question: {
    id: number;
    question_text: string | any;
    question_image?: string;
    options?: string[];
    correct_answer: string;
    student_answer?: string;
    analysis?: string;
    subject?: string;
    difficulty?: number;
    error_count?: number;
    created_at: string;
    updated_at?: string;
  };
  loading: boolean;
}>()

// 计算属性：是否为选择题
const isMultipleChoice = computed(() => {
  return props.question.options && props.question.options.length > 0
})

// 计算属性：是否答错
const isIncorrect = computed(() => {
  if (!props.question.student_answer) return false
  return props.question.student_answer !== props.question.correct_answer
})

// 格式化日期
const formattedDate = computed(() => {
  if (!props.question.created_at) return ''
  return new Date(props.question.created_at).toLocaleString()
})

// 难度星级
const difficultyStars = computed(() => {
  const difficulty = props.question.difficulty || 0
  return Array(5).fill(null).map((_, i) => i < difficulty)
})

// 格式化题目文本
const formattedQuestionText = computed(() => {
  const questionText = props.question.question_text;
  if (!questionText) return '';
  
  // 如果是JSON字符串，尝试解析
  if (typeof questionText === 'string') {
    try {
      const parsed = JSON.parse(questionText);
      if (parsed && typeof parsed === 'object') {
        return parsed.String || questionText;
      }
    } catch (e) {
      // 如果不是JSON，直接返回原文本
      return questionText;
    }
  }
  
  // 如果是对象，提取String字段
  if (typeof questionText === 'object' && questionText !== null) {
    return questionText.String || JSON.stringify(questionText);
  }
  
  return String(questionText);
})

// 格式化学科
const formattedSubject = computed(() => {
  const subject = props.question.subject;
  if (!subject || subject === 'undefined') {
    return '未分类';
  }
  
  // 如果是JSON字符串，尝试解析
  if (typeof subject === 'string') {
    try {
      const parsed = JSON.parse(subject);
      if (parsed && typeof parsed === 'object') {
        return parsed.String || '未分类';
      }
    } catch (e) {
      // 如果不是JSON，直接返回原文本
      return subject;
    }
  }
  
  // 如果是对象，提取String字段
  if (typeof subject === 'object' && subject !== null) {
    return (subject as any).String || '未分类';
  }
  
  return subject;
})

// 格式化错误次数
const formattedErrorCount = computed(() => {
  const errorCount = props.question.error_count;
  if (!errorCount) return 1;
  
  if (typeof errorCount === 'string') {
    try {
      return parseInt(errorCount, 10) || 1;
    } catch (e) {
      return 1;
    }
  }
  
  return Number(errorCount) || 1;
})
</script>

<template>
  <div class="bg-white rounded-lg border shadow-sm p-6">
    <!-- 加载状态 -->
    <div v-if="loading" class="text-center py-10">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-r-transparent"></div>
      <p class="mt-2 text-gray-500">加载中...</p>
    </div>
    
    <div v-else>
      <!-- 标题区域 -->
      <div class="flex justify-between items-start mb-6">
        <h2 class="text-2xl font-bold">错题详情</h2>
        <div class="flex items-center space-x-3">
          <div class="px-3 py-1 bg-gray-100 rounded-full text-sm">
            {{ formattedSubject }}
          </div>
          <div class="flex items-center">
            <span v-for="(isFilled, index) in difficultyStars" :key="index" class="text-lg">
              <span v-if="isFilled" class="text-yellow-400">★</span>
              <span v-else class="text-gray-300">★</span>
            </span>
          </div>
        </div>
      </div>
      
      <!-- 错题卡片 -->
      <div class="mb-6 bg-gray-50 rounded-lg p-6 border border-gray-200">
        <!-- 题目内容 -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-2 text-gray-700">题目</h3>
          <div class="whitespace-pre-wrap text-gray-900">
            {{ formattedQuestionText }}
          </div>
        </div>
        
        <!-- 题目图片（如果有） -->
        <div v-if="question.question_image" class="mb-6">
          <img :src="question.question_image" alt="题目图片" class="max-w-full h-auto rounded-md border border-gray-200" />
        </div>
        
        <!-- 选项（如果有） -->
        <div v-if="isMultipleChoice" class="mb-6">
          <h3 class="text-lg font-semibold mb-2 text-gray-700">选项</h3>
          <div class="space-y-2">
            <div 
              v-for="(option, index) in question.options" 
              :key="index"
              class="p-3 border rounded-lg flex items-center"
              :class="{
                'border-green-500 bg-green-50': String.fromCharCode(65 + index) === question.correct_answer,
                'border-red-500 bg-red-50': String.fromCharCode(65 + index) === question.student_answer && question.student_answer !== question.correct_answer
              }"
            >
              <div class="flex-none w-8 h-8 flex items-center justify-center rounded-full mr-3"
                :class="{
                  'bg-green-100 text-green-700': String.fromCharCode(65 + index) === question.correct_answer,
                  'bg-red-100 text-red-700': String.fromCharCode(65 + index) === question.student_answer && question.student_answer !== question.correct_answer,
                  'bg-gray-100 text-gray-700': String.fromCharCode(65 + index) !== question.correct_answer && String.fromCharCode(65 + index) !== question.student_answer
                }"
              >
                {{ String.fromCharCode(65 + index) }}
              </div>
              <div>{{ option }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 答案区域 -->
      <div class="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- 正确答案 -->
        <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 class="text-lg font-semibold mb-2 text-green-800">正确答案</h3>
          <div class="text-green-800 font-medium">
            {{ question.correct_answer }}
          </div>
        </div>
        
        <!-- 学生答案（如果有） -->
        <div v-if="question.student_answer" class="p-4 rounded-lg"
          :class="isIncorrect ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'"
        >
          <h3 class="text-lg font-semibold mb-2" :class="isIncorrect ? 'text-red-800' : 'text-green-800'">
            您的答案
          </h3>
          <div :class="isIncorrect ? 'text-red-800' : 'text-green-800'" class="font-medium">
            {{ question.student_answer }}
          </div>
        </div>
      </div>
      
      <!-- 解析（如果有） -->
      <div v-if="question.analysis" class="mb-6">
        <h3 class="text-lg font-semibold mb-2 text-gray-700">解析</h3>
        <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 whitespace-pre-wrap">
          {{ question.analysis }}
        </div>
      </div>
      
      <!-- 元数据 -->
      <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500 border-t border-gray-200 pt-4">
        <div>
          <span class="font-medium">错误次数:</span> {{ formattedErrorCount }}
        </div>
        <div>
          <span class="font-medium">保存时间:</span> {{ formattedDate }}
        </div>
        <div v-if="question.updated_at && question.updated_at !== question.created_at">
          <span class="font-medium">更新时间:</span> {{ new Date(question.updated_at).toLocaleString() }}
        </div>
      </div>
    </div>
  </div>
</template> 