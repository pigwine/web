<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getErrorQuestions } from '~/utils/ocr-api'
import { isAuthenticated, getCurrentUser, logout } from '~/utils/auth'

const router = useRouter()
const errorQuestions = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const currentUser = ref<any>(null)
const isLoggedIn = ref(false)

// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const totalItems = ref(0)

// 筛选条件
const searchText = ref('')
const selectedSubject = ref('')
const selectedDifficulty = ref('')
const subjects = ref<string[]>([])

// 检查登录状态
onMounted(() => {
  isLoggedIn.value = isAuthenticated()
  
  if (isLoggedIn.value) {
    // 获取当前用户信息
    currentUser.value = getCurrentUser()
    
    // 获取错题列表
    fetchErrorQuestions()
  } else {
    loading.value = false
  }
})

// 处理登出
function handleLogout() {
  logout()
  isLoggedIn.value = false
  currentUser.value = null
  errorQuestions.value = []
}

// 跳转到登录页
function goToLogin() {
  router.push('/ocr-login')
}

// 跳转到注册页
function goToRegister() {
  router.push('/ocr-register')
}

// 获取错题列表
async function fetchErrorQuestions() {
  if (!isLoggedIn.value) {
    return
  }
  
  loading.value = true
  error.value = null
  
  try {
    const params = {
      page: currentPage.value,
      pageSize: pageSize.value,
      search: searchText.value || undefined,
      subject: selectedSubject.value || undefined,
      difficulty: selectedDifficulty.value || undefined
    }
    
    const result = await getErrorQuestions(params)
    errorQuestions.value = result.items || []
    totalItems.value = result.total || 0
    
    // 提取所有学科
    if (result.subjects) {
      subjects.value = result.subjects as string[];
    }
  } catch (err: any) {
    error.value = err.message || '获取错题列表失败'
    errorQuestions.value = []
  } finally {
    loading.value = false
  }
}

// 处理筛选器重置
function handleFilterReset() {
  searchText.value = ''
  selectedSubject.value = ''
  selectedDifficulty.value = ''
  currentPage.value = 1
  fetchErrorQuestions()
}

// 处理删除事件
function handleDelete() {
  // 重新获取数据
  fetchErrorQuestions()
}

// 处理页码变更
function handlePageChange(page: number) {
  currentPage.value = page
  fetchErrorQuestions()
}

// 处理筛选条件变更
function handleFilterChange() {
  currentPage.value = 1
  fetchErrorQuestions()
}
</script>

<template>
  <div class="container mx-auto py-10 px-4">
    <!-- 顶部导航栏 -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">我的错题本</h1>
      
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
    
    <div class="max-w-5xl mx-auto">
      <!-- 未登录提示 -->
      <div v-if="!isLoggedIn" class="bg-blue-50 border border-blue-200 text-blue-700 p-6 rounded-md mb-6 text-center">
        <h2 class="text-xl font-semibold mb-2">请登录后查看您的错题本</h2>
        <p class="mb-4">登录后可以保存和管理您的错题记录</p>
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
      
      <!-- 已登录内容 -->
      <template v-if="isLoggedIn">
        <!-- 筛选器 -->
        <div class="mb-6">
          <div class="bg-white rounded-lg border shadow-sm p-6">
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1">
                <label class="block text-sm font-medium mb-1">关键词搜索</label>
                <input 
                  v-model="searchText"
                  type="text"
                  placeholder="搜索题目内容"
                  class="w-full border rounded-md px-3 py-2"
                  @input="handleFilterChange"
                />
              </div>
              
              <div class="md:w-48">
                <label class="block text-sm font-medium mb-1">学科</label>
                <select
                  v-model="selectedSubject"
                  class="w-full border rounded-md px-3 py-2"
                  @change="handleFilterChange"
                >
                  <option value="">全部</option>
                  <option v-for="subject in subjects" :key="subject" :value="subject">
                    {{ subject }}
                  </option>
                </select>
              </div>
              
              <div class="md:w-48">
                <label class="block text-sm font-medium mb-1">难度</label>
                <select
                  v-model="selectedDifficulty"
                  class="w-full border rounded-md px-3 py-2"
                  @change="handleFilterChange"
                >
                  <option value="">全部</option>
                  <option value="1">★ 简单</option>
                  <option value="2">★★ 较简单</option>
                  <option value="3">★★★ 中等</option>
                  <option value="4">★★★★ 较难</option>
                  <option value="5">★★★★★ 困难</option>
                </select>
              </div>
              
              <div class="md:flex-none md:self-end">
                <button
                  @click="handleFilterReset"
                  class="w-full md:w-auto px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  重置筛选
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 错题列表 -->
        <OcrErrorQuestionList
          :questions="errorQuestions"
          :loading="loading"
          :error="error"
          :totalItems="totalItems"
          :pageSize="pageSize"
          :currentPage="currentPage"
          @delete="handleDelete"
          @page-change="handlePageChange"
        />
      </template>
    </div>
  </div>
</template> 