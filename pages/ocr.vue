<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { recognizeText, analyzeQuestion } from '~/utils/ocr-api'
import { isAuthenticated, getCurrentUser, logout } from '~/utils/auth'

const router = useRouter()
const file = ref<File | null>(null)
const recognizedText = ref<string>('')
const analyzedResult = ref<any>(null)
const isRecognizing = ref(false)
const isAnalyzing = ref(false)
const error = ref<string | null>(null)
const showSaveForm = ref(false)
const savedSuccess = ref(false)
const currentUser = ref<any>(null)
const isLoggedIn = ref(false)
const savedQuestions = ref<number[]>([]) // 记录已保存的题目索引

// 检查登录状态
onMounted(() => {
  isLoggedIn.value = isAuthenticated()
  if (isLoggedIn.value) {
    currentUser.value = getCurrentUser()
  }
})

// 处理登出
function handleLogout() {
  logout()
  isLoggedIn.value = false
  currentUser.value = null
}

// 跳转到登录页
function goToLogin() {
  router.push('/ocr-login')
}

// 跳转到注册页
function goToRegister() {
  router.push('/ocr-register')
}

async function handleFileSelected(selectedFile: File) {
  file.value = selectedFile
  recognizedText.value = ''
  analyzedResult.value = null
  error.value = null
  showSaveForm.value = false
  savedSuccess.value = false
  savedQuestions.value = []
}

async function startRecognition() {
  if (!file.value) return
  
  try {
    isRecognizing.value = true
    error.value = null
    showSaveForm.value = false
    savedSuccess.value = false
    savedQuestions.value = []
    const result = await recognizeText(file.value)
    recognizedText.value = result.text || ''
  } catch (err: any) {
    error.value = err.response?.data?.message || err.message || '识别失败'
  } finally {
    isRecognizing.value = false
  }
}

async function startAnalysis() {
  if (!recognizedText.value) return
  
  try {
    isAnalyzing.value = true
    error.value = null
    const result = await analyzeQuestion(recognizedText.value)
    analyzedResult.value = result
  } catch (err: any) {
    error.value = err.response?.data?.message || err.message || '分析失败'
  } finally {
    isAnalyzing.value = false
  }
}

function handleSaveClick() {
  if (!isLoggedIn.value) {
    error.value = '请先登录后再保存错题'
    return
  }
  
  showSaveForm.value = true
  savedSuccess.value = false
}

function handleSaveSuccess() {
  showSaveForm.value = false
  savedSuccess.value = true
}

function handleSaveError(err: any) {
  error.value = err.message || '保存错题失败'
}

// 处理单个题目保存成功
function handleQuestionSaved(result: any, index: number) {
  savedQuestions.value.push(index)
  // 如果保存了至少一个题目，显示成功提示
  if (savedQuestions.value.length > 0 && !savedSuccess.value) {
    savedSuccess.value = true
  }
}

const canAnalyze = computed(() => recognizedText.value.trim().length > 0)
const canSave = computed(() => analyzedResult.value && analyzedResult.value.question && analyzedResult.value.answer)
</script>

<template>
  <div class="container mx-auto py-10 px-4">
    <!-- 顶部导航栏 -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">题目批改系统</h1>
      
      <div class="flex items-center space-x-4">
        <!-- 已登录状态 -->
        <template v-if="isLoggedIn">
          <div class="text-sm">
            <span class="text-gray-600">欢迎，</span>
            <span class="font-medium">{{ currentUser?.nickname || currentUser?.username }}</span>
          </div>
          
          <NuxtLink to="/error-questions" class="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
            我的错题本
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
        </template>
      </div>
    </div>
    
    <div class="max-w-3xl mx-auto">
      <div class="bg-white rounded-lg border shadow-sm p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">上传图片</h2>
        <OcrUploader @file-selected="handleFileSelected" />
        
        <div class="mt-4 flex justify-end">
          <button 
            @click="startRecognition" 
            :disabled="!file || isRecognizing"
            class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isRecognizing">识别中...</span>
            <span v-else>开始识别</span>
          </button>
        </div>
      </div>
      
      <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
        {{ error }}
      </div>
      
      <div v-if="savedSuccess" class="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-6">
        错题保存成功!
        <NuxtLink to="/error-questions" class="underline">查看我的错题本</NuxtLink>
      </div>
      
      <div v-if="recognizedText" class="bg-white rounded-lg border shadow-sm p-6 mb-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">识别结果</h2>
          <div class="flex space-x-2">
            <button 
              @click="startAnalysis" 
              :disabled="!canAnalyze || isAnalyzing"
              class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isAnalyzing">分析中...</span>
              <span v-else>分析问题</span>
            </button>
          </div>
        </div>
        
        <!-- 原始识别文本 -->
        <div class="mb-6">
          <details>
            <summary class="cursor-pointer text-gray-600 hover:text-gray-900 mb-2">查看原始文本</summary>
            <div class="p-4 bg-gray-50 rounded-md whitespace-pre-wrap text-sm">{{ recognizedText }}</div>
          </details>
        </div>
        
        <!-- 自动解析的题目列表 -->
        <div class="mb-4">
          <h3 class="text-lg font-medium mb-3">自动识别题目</h3>
          <OcrRecognizedTextParser 
            :text="recognizedText"
            @question-saved="handleQuestionSaved"
            @error="handleSaveError"
          />
        </div>
      </div>
      
      <div v-if="analyzedResult" class="bg-white rounded-lg border shadow-sm p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">问题分析</h2>
        <div class="space-y-4">
          <div v-if="analyzedResult.question" class="p-4 bg-gray-50 rounded-md">
            <h3 class="font-medium mb-2">问题:</h3>
            <p>{{ analyzedResult.question }}</p>
          </div>
          
          <div v-if="analyzedResult.answer" class="p-4 bg-gray-50 rounded-md">
            <h3 class="font-medium mb-2">答案:</h3>
            <p>{{ analyzedResult.answer }}</p>
          </div>
          
          <div v-if="analyzedResult.explanation" class="p-4 bg-gray-50 rounded-md">
            <h3 class="font-medium mb-2">解析:</h3>
            <p>{{ analyzedResult.explanation }}</p>
          </div>
          
          <div v-if="analyzedResult.options && analyzedResult.options.length > 0" class="p-4 bg-gray-50 rounded-md">
            <h3 class="font-medium mb-2">选项:</h3>
            <div v-for="(option, index) in analyzedResult.options" :key="index" class="mb-1">
              {{ String.fromCharCode(65 + index) }}. {{ option }}
            </div>
          </div>
        </div>
        
        <div class="mt-4 flex justify-end">
          <button 
            v-if="canSave && !showSaveForm"
            @click="handleSaveClick"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            保存为错题
          </button>
        </div>
      </div>
      
      <div v-if="showSaveForm && analyzedResult">
        <OcrErrorQuestionSaver
          :questionData="analyzedResult"
          @saved="handleSaveSuccess"
          @error="handleSaveError"
        />
      </div>
    </div>
  </div>
</template>