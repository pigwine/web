<template>
  <div>
    <header class="static w-full relative z-10">
      <div class="container mx-auto flex flex-col md:flex-row justify-between items-center p-4 gap-4">
        <div class="text-2xl md:text-xl sm:text-lg tracking-tight font-sans">
          <span class="font-bold text-gray-800">Kaima</span>
          <span class="text-gray-500">Find</span>
        </div>
        
        <nav class="w-full md:w-auto">
          <ul class="flex justify-center items-center gap-1 text-base md:text-sm">
            <li v-for="(item, index) in navItems" :key="index" class="flex-shrink">
              <NuxtLink :to="item.path" class="flex items-center hover:bg-white/30 rounded-full px-1 py-1">
                <span v-if="!isMobile" class="nav-text">{{ item.text }}</span>
                <span v-else class="nav-icon">{{ item.icon }}</span>
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <div class="flex gap-2 min-w-max">
          <template v-if="user">
            <div class="gradient-text px-3 py-2">Hello, {{ user.username }}</div>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="hover:bg-white/30 rounded-full px-3 py-2 text-gray-800">登录</NuxtLink>
            <NuxtLink to="/register" class="hover:bg-white/30 rounded-full px-3 py-2 text-gray-800">注册</NuxtLink>
          </template>
        </div>
      </div>
    </header>

    <button 
      v-show="showBackToTop"
      @click="scrollToTop"
      class="fixed right-8 bottom-8 bg-gray-800/80 hover:bg-gray-700 text-white rounded-full p-3 shadow-lg transition-all duration-300 z-50"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showBackToTop = ref(false)
const user = ref(null)
const isMobile = ref(false)
const navItems = [
  { path: '/', text: '首页', icon: '🏠' },
  { path: '/bookgroup', text: '阅读空间', icon: '📚' },
  { path: '/usefultool', text: '实用工具', icon: '🛠️' },
  { path: '/investment', text: '投资理财', icon: '💰' },
  { path: '/news/news', text: '新闻资讯', icon: '📰' },
  { path: '/question', text: '常见问题', icon: '❓' }
]

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300 // 滚动超过300px时显示按钮
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const checkDevice = () => {
  // 检查是否是移动设备
  const userAgent = navigator.userAgent || navigator.vendor || window.opera
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
  isMobile.value = mobileRegex.test(userAgent.toLowerCase())
}

// 添加和移除滚动事件监听器
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  checkDevice()
  // 监听窗口大小变化，以处理平板等设备的旋转
  window.addEventListener('resize', checkDevice)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', checkDevice)
})

// 在组件挂载时获取用户信息
onMounted(async () => {
  // 这里需要根据你的认证系统来获取用户信息
  // 例如：
  try {
    const token = localStorage.getItem('token') // 或者从你的认证系统获取token
    if (token) {
      // 从你的API获取用户信息
      // user.value = await fetchUserInfo()
    }
  } catch (error) {
    console.error('Error fetching user info:', error)
  }
})
</script>

<style scoped>
.nav-icon, .nav-text {
  display: inline-block;
  padding: 1px 4px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.8);
  transition: all 0.2s ease;
  color: #1f2937;
  font-size: 0.85em;
  min-width: 24px;
  text-align: center;
}

.nav-icon {
  font-family: "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.nav-icon:hover, .nav-text:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.gradient-text {
  background: linear-gradient(45deg, #3B82F6, #EC4899);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 600;
}

/* 添加导航栏响应式样式 */
@media (max-width: 640px) {
  nav {
    margin: 0;
  }
  
  nav ul {
    padding: 0;
  }
}
</style>