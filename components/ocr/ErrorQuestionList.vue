<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { deleteErrorQuestion } from '~/utils/ocr-api'

const props = defineProps<{
  questions: any[];
  loading: boolean;
  error: string | null;
  totalItems: number;
  pageSize: number;
  currentPage: number;
}>()

const emit = defineEmits(['delete', 'page-change'])

// 格式化题目文本，将JSON对象转换为可读文本
const formatQuestionText = (question: any): string => {
  if (!question.question_text) return '';
  
  // 如果是JSON字符串，尝试解析
  if (typeof question.question_text === 'string') {
    try {
      const parsed = JSON.parse(question.question_text);
      if (parsed && typeof parsed === 'object') {
        return parsed.String || question.question_text;
      }
    } catch (e) {
      // 如果不是JSON，直接返回原文本
      return question.question_text;
    }
  }
  
  // 如果是对象，提取String字段
  if (typeof question.question_text === 'object' && question.question_text !== null) {
    return question.question_text.String || JSON.stringify(question.question_text);
  }
  
  return String(question.question_text);
}

// 格式化学科
const formatSubject = (question: any): string => {
  if (!question.subject || question.subject === 'undefined') {
    return '未分类';
  }
  
  // 如果是JSON字符串，尝试解析
  if (typeof question.subject === 'string') {
    try {
      const parsed = JSON.parse(question.subject);
      if (parsed && typeof parsed === 'object') {
        return parsed.String || '未分类';
      }
    } catch (e) {
      // 如果不是JSON，直接返回原文本
      return question.subject;
    }
  }
  
  // 如果是对象，提取String字段
  if (typeof question.subject === 'object' && question.subject !== null) {
    return question.subject.String || '未分类';
  }
  
  return question.subject;
}

// 格式化难度
const formatDifficulty = (question: any): number => {
  if (!question.difficulty) return 3;
  
  if (typeof question.difficulty === 'string') {
    try {
      return parseInt(question.difficulty, 10) || 3;
    } catch (e) {
      return 3;
    }
  }
  
  if (typeof question.difficulty === 'object') {
    return 3;
  }
  
  return Number(question.difficulty) || 3;
}

// 格式化错误次数
const formatErrorCount = (question: any): number => {
  if (!question.error_count) return 1;
  
  if (typeof question.error_count === 'string') {
    try {
      return parseInt(question.error_count, 10) || 1;
    } catch (e) {
      return 1;
    }
  }
  
  return Number(question.error_count) || 1;
}

// 删除错题
async function handleDelete(id: number) {
  if (!confirm('确定要删除这道错题吗？此操作不可恢复。')) {
    return
  }
  
  try {
    await deleteErrorQuestion(id)
    emit('delete', id)
  } catch (err: any) {
    alert(err.message || '删除失败')
  }
}

// 页码变更
function changePage(page: number) {
  if (page !== props.currentPage && page > 0 && page <= Math.ceil(props.totalItems / props.pageSize)) {
    emit('page-change', page)
  }
}
</script>

<template>
  <!-- 错误提示 -->
  <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
    {{ error }}
  </div>
  
  <!-- 加载状态 -->
  <div v-if="loading" class="text-center py-10">
    <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-r-transparent"></div>
    <p class="mt-2 text-gray-500">加载中...</p>
  </div>
  
  <!-- 错题列表 -->
  <div v-else-if="questions.length > 0" class="bg-white rounded-lg border shadow-sm overflow-hidden">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">题目</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">学科</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">难度</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">错误次数</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日期</th>
          <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="question in questions" :key="question.id">
          <td class="px-6 py-4">
            <div class="text-sm text-gray-900 line-clamp-2">{{ formatQuestionText(question) }}</div>
          </td>
          <td class="px-6 py-4">
            <div class="text-sm text-gray-900">{{ formatSubject(question) }}</div>
          </td>
          <td class="px-6 py-4">
            <div class="flex items-center">
              <div v-for="i in 5" :key="i" class="text-xs">
                <span v-if="i <= formatDifficulty(question)" class="text-yellow-400">★</span>
                <span v-else class="text-gray-300">★</span>
              </div>
            </div>
          </td>
          <td class="px-6 py-4">
            <div class="text-sm text-gray-900">{{ formatErrorCount(question) }}</div>
          </td>
          <td class="px-6 py-4">
            <div class="text-sm text-gray-500">{{ new Date(question.created_at).toLocaleDateString() }}</div>
          </td>
          <td class="px-6 py-4 text-right text-sm font-medium">
            <NuxtLink :to="`/error-questions/${question.id}`" class="text-primary hover:text-primary-dark mr-3">
              查看
            </NuxtLink>
            <button @click="handleDelete(question.id)" class="text-red-600 hover:text-red-900">
              删除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <!-- 空状态 -->
  <div v-else class="bg-white rounded-lg border shadow-sm p-10 text-center">
    <div class="text-gray-400 mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </div>
    <h3 class="text-lg font-medium text-gray-900 mb-1">暂无错题</h3>
    <p class="text-gray-500">当您在OCR识别后保存错题，它们将显示在这里</p>
    <NuxtLink to="/ocr" class="mt-4 inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
      去OCR页面
    </NuxtLink>
  </div>
  
  <!-- 分页 -->
  <div v-if="totalItems > pageSize" class="mt-6 flex justify-center">
    <nav class="flex items-center space-x-1">
      <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage <= 1"
        class="px-3 py-1 rounded-md border hover:bg-gray-50 disabled:opacity-50"
      >
        上一页
      </button>
      
      <div class="px-4 py-1 text-sm">
        {{ currentPage }} / {{ Math.ceil(totalItems / pageSize) }}
      </div>
      
      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage >= Math.ceil(totalItems / pageSize)"
        class="px-3 py-1 rounded-md border hover:bg-gray-50 disabled:opacity-50"
      >
        下一页
      </button>
    </nav>
  </div>
</template> 