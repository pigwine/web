<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getErrorQuestionDetail, deleteErrorQuestion } from '~/utils/ocr-api'
import { isAuthenticated, getCurrentUser, logout } from '~/utils/auth'

const route = useRoute()
const router = useRouter()
const questionId = computed(() => Number(route.params.id))
const currentUser = ref<any>(null)
const isLoggedIn = ref(false)

const question = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)

// 检查登录状态
onMounted(() => {
  isLoggedIn.value = isAuthenticated()
  
  if (isLoggedIn.value) {
    // 获取当前用户信息
    currentUser.value = getCurrentUser()
    
    // 获取错题详情
    if (questionId.value) {
      fetchQuestionDetail()
    } else {
      error.value = '无效的错题ID'
    }
  } else {
    loading.value = false
    error.value = '请登录后查看错题详情'
  }
})

// 处理登出
function handleLogout() {
  logout()
  isLoggedIn.value = false
  currentUser.value = null
  router.push('/error-questions')
}

// 跳转到登录页
function goToLogin() {
  router.push('/ocr-login')
}

// 跳转到注册页
function goToRegister() {
  router.push('/ocr-register')
}

// 获取错题详情
async function fetchQuestionDetail() {
  loading.value = true
  error.value = null
  
  try {
    const result = await getErrorQuestionDetail(questionId.value)
    question.value = result
  } catch (err: any) {
    error.value = err.message || '获取错题详情失败'
  } finally {
    loading.value = false
  }
}

// 删除错题
async function handleDelete() {
  if (!confirm('确定要删除这道错题吗？此操作不可恢复。')) {
    return
  }
  
  try {
    await deleteErrorQuestion(questionId.value)
    // 跳转到列表页
    router.push('/error-questions')
  } catch (err: any) {
    error.value = err.message || '删除失败'
  }
}
</script>

<template>
  <div class="container mx-auto py-10 px-4">
    <!-- 顶部导航栏 -->
    <div class="flex justify-between items-center mb-8">
      <div class="flex items-center">
        <NuxtLink to="/error-questions" class="text-primary mr-4">
          &larr; 返回错题列表
        </NuxtLink>
        <h1 class="text-3xl font-bold">错题详情</h1>
      </div>
      
      <div class="flex items-center space-x-4">
        <!-- 已登录状态 -->
        <template v-if="isLoggedIn">
          <div class="text-sm">
            <span class="text-gray-600">欢迎，</span>
            <span class="font-medium">{{ currentUser?.nickname || currentUser?.username }}</span>
          </div>
          
          <NuxtLink to="/ocr" class="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
            OCR识别
          </NuxtLink>
          
          <button 
            @click="handleLogout" 
            class="px-3 py-1 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
          >
            退出登录
          </button>
        </template>
        
        <!-- 未登录状态 -->
        <template v-else>
          <button 
            @click="goToLogin" 
            class="px-3 py-1 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            登录
          </button>
          
          <button 
            @click="goToRegister" 
            class="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            注册
          </button>
          
          <NuxtLink to="/ocr" class="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
            返回OCR
          </NuxtLink>
        </template>
      </div>
    </div>
    
    <div class="max-w-3xl mx-auto">
      <!-- 未登录提示 -->
      <div v-if="!isLoggedIn" class="bg-blue-50 border border-blue-200 text-blue-700 p-6 rounded-md mb-6 text-center">
        <h2 class="text-xl font-semibold mb-2">请登录后查看错题详情</h2>
        <p class="mb-4">登录后可以查看和管理您的错题记录</p>
        <div class="flex justify-center space-x-4">
          <button 
            @click="goToLogin" 
            class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            登录
          </button>
          
          <button 
            @click="goToRegister" 
            class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            注册
          </button>
        </div>
      </div>
      
      <!-- 错误提示 -->
      <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
        {{ error }}
      </div>
      
      <!-- 错题详情 -->
      <OcrErrorQuestionDetail v-if="question" :question="question" :loading="loading" />
      
      <!-- 操作按钮 -->
      <div v-if="question && !loading" class="mt-6 flex justify-between">
        <NuxtLink to="/error-questions" class="px-4 py-2 border rounded-md hover:bg-gray-50">
          返回列表
        </NuxtLink>
        
        <button 
          @click="handleDelete" 
          class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          删除错题
        </button>
      </div>
    </div>
  </div>
</template> 