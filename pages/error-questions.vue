<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { getErrorQuestions } from '~/utils/ocr-api'
import { isAuthenticated, getCurrentUser, logout } from '~/utils/auth'
import * as echarts from 'echarts'

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
// const searchText = ref('') // 移除关键词检索
const selectedSubject = ref('')
const subjects = ref<string[]>([])

// 图表相关
const chartSubjectRef = ref()
const chartTrendRef = ref()
const chartTopErrorRef = ref()
const chartStackedRef = ref()
let chartSubjectInstance: any = null
let chartTrendInstance: any = null
let chartTopErrorInstance: any = null
let chartStackedInstance: any = null

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
      // search: searchText.value || undefined, // 移除关键词检索
      subject: selectedSubject.value || undefined
    }
    
    const result = await getErrorQuestions(params)
    errorQuestions.value = result.items || []
    totalItems.value = result.total || 0
    
    // 提取所有学科
    if (result.subjects) {
      // 清洗学科列表，去除无效和重复项
      subjects.value = (result.subjects as string[])
        .map(s => {
          if (!s || s === 'undefined') return '未分类'
          if (typeof s === 'string') {
            try {
              const parsed = JSON.parse(s)
              if (parsed && typeof parsed === 'object' && parsed.String !== undefined) {
                return parsed.String || '未分类'
              }
            } catch {
              // 不是 JSON 字符串，直接返回
              return s
            }
          }
          return s
        })
        .filter((s, i, arr) => !!s && arr.indexOf(s) === i) // 去重去空
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
  // searchText.value = '' // 移除关键词检索
  selectedSubject.value = ''
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

function getSubjectStats() {
  const stats: Record<string, number> = {}
  errorQuestions.value.forEach(q => {
    let subject = q.subject
    if (!subject || subject === 'undefined') subject = '未分类'
    if (typeof subject === 'string') {
      try {
        subject = JSON.parse(subject).String || subject
      } catch {}
    }
    stats[subject] = (stats[subject] || 0) + 1
  })
  return Object.entries(stats).map(([name, value]) => ({ name, value }))
}

function getTrendStats() {
  const stats: Record<string, number> = {}
  errorQuestions.value.forEach(q => {
    const date = new Date(q.created_at).toLocaleDateString()
    stats[date] = (stats[date] || 0) + 1
  })
  // 按日期排序
  return Object.entries(stats).sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
}

function getTopErrorStats() {
  // 错题错误次数TOP5
  return errorQuestions.value
    .map(q => ({ name: (q.question_text || '未知'), value: q.error_count || 1 }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)
}

function getStackedStats() {
  // 按学科统计每个日期的错题数
  const map: Record<string, Record<string, number>> = {}
  const subjectsSet = new Set<string>()
  errorQuestions.value.forEach(q => {
    const date = new Date(q.created_at).toLocaleDateString()
    let subject = q.subject
    if (!subject || subject === 'undefined') subject = '未分类'
    if (typeof subject === 'string') {
      try { subject = JSON.parse(subject).String || subject } catch {}
    }
    subjectsSet.add(subject)
    if (!map[date]) map[date] = {}
    map[date][subject] = (map[date][subject] || 0) + 1
  })
  const dates = Object.keys(map).sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
  const subjectsArr = Array.from(subjectsSet)
  const series = subjectsArr.map(subj => ({
    name: subj,
    type: 'bar',
    stack: '总量',
    emphasis: { focus: 'series' },
    data: dates.map(date => map[date][subj] || 0)
  }))
  return { dates, subjectsArr, series }
}

function renderCharts() {
  nextTick(() => {
    // 学科分布饼图
    if (chartSubjectRef.value) {
      if (!chartSubjectInstance) {
        chartSubjectInstance = echarts.init(chartSubjectRef.value)
      }
      chartSubjectInstance.setOption({
        title: { text: '错题学科分布', left: 'center' },
        tooltip: { trigger: 'item' },
        legend: { bottom: 0 },
        series: [{
          name: '学科',
          type: 'pie',
          radius: '60%',
          data: getSubjectStats(),
        }],
      })
    }
    // 错题趋势折线图
    if (chartTrendRef.value) {
      if (!chartTrendInstance) {
        chartTrendInstance = echarts.init(chartTrendRef.value)
      }
      const trend = getTrendStats()
      chartTrendInstance.setOption({
        title: { text: '错题数随时间变化', left: 'center' },
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: trend.map(i => i[0]) },
        yAxis: { type: 'value' },
        series: [{
          data: trend.map(i => i[1]),
          type: 'line',
          smooth: true,
        }],
      })
    }
    // TOP5柱状图
    if (chartTopErrorRef.value) {
      if (!chartTopErrorInstance) {
        chartTopErrorInstance = echarts.init(chartTopErrorRef.value)
      }
      const top = getTopErrorStats()
      chartTopErrorInstance.setOption({
        title: { text: '错题错误次数TOP5', left: 'center' },
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: top.map(i => i.name), axisLabel: { interval: 0, rotate: 30 } },
        yAxis: { type: 'value' },
        series: [{ data: top.map(i => i.value), type: 'bar', color: '#f59e42' }],
      })
    }
    // 堆叠柱状图
    if (chartStackedRef.value) {
      if (!chartStackedInstance) {
        chartStackedInstance = echarts.init(chartStackedRef.value)
      }
      const { dates, series } = getStackedStats()
      chartStackedInstance.setOption({
        title: { text: '学科-日期错题分布', left: 'center' },
        tooltip: { trigger: 'axis' },
        legend: { top: 30 },
        xAxis: { type: 'category', data: dates },
        yAxis: { type: 'value' },
        series
      })
    }
  })
}

watch(errorQuestions, () => { renderCharts() })
onMounted(() => { renderCharts() })
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
        <!-- 图表区 -->
        <div class="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white rounded-lg border shadow-sm p-4">
            <div ref="chartSubjectRef" style="width:100%;height:320px;"></div>
          </div>
          <div class="bg-white rounded-lg border shadow-sm p-4">
            <div ref="chartTrendRef" style="width:100%;height:320px;"></div>
          </div>
          <div class="bg-white rounded-lg border shadow-sm p-4">
            <div ref="chartTopErrorRef" style="width:100%;height:320px;"></div>
          </div>
          <div class="bg-white rounded-lg border shadow-sm p-4">
            <div ref="chartStackedRef" style="width:100%;height:320px;"></div>
          </div>
        </div>
        <!-- 筛选器 -->
        <div class="mb-6">
          <div class="bg-white rounded-lg border shadow-sm p-6">
            <div class="flex flex-col md:flex-row gap-4">
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