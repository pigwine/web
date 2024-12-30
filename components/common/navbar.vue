<template>
  <div>
    <header class="static w-full relative z-10">
      <div class="container mx-auto flex flex-col md:flex-row justify-between items-center p-4 gap-4">
        <div class="text-2xl md:text-xl sm:text-lg tracking-tight font-sans">
          <span class="font-bold text-gray-800">Kaima</span>
          <span class="text-gray-500">Find</span>
        </div>
        
        <nav>
          <ul class="flex flex-nowrap text-base md:text-sm sm:text-xs">
            <li>
              <NuxtLink to="/" class="hover:bg-white/30 rounded-full px-4 md:px-2.5 sm:px-1.5 py-2 md:py-1.5 sm:py-1">首页</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/waitlist" class="hover:bg-white/30 rounded-full px-4 md:px-2.5 sm:px-1.5 py-2 md:py-1.5 sm:py-1">预约列表</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/question" class="hover:bg-white/30 rounded-full px-4 md:px-2.5 sm:px-1.5 py-2 md:py-1.5 sm:py-1">常见问题</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/news/news" class="hover:bg-white/30 rounded-full px-4 md:px-2.5 sm:px-1.5 py-2 md:py-1.5 sm:py-1">新闻资讯</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/usefultool" class="hover:bg-white/30 rounded-full px-4 md:px-2.5 sm:px-1.5 py-2 md:py-1.5 sm:py-1">实用工具</NuxtLink>
            </li>
          </ul>
        </nav>

        <div class="flex gap-2">
          <template v-if="user">
            <div class="gradient-text px-4 md:px-2.5 sm:px-1.5 py-2 md:py-1.5 sm:py-1">
              Hello, {{ user.username }}
            </div>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="hover:bg-white/30 rounded-full px-4 md:px-2.5 sm:px-1.5 py-2 md:py-1.5 sm:py-1">登录</NuxtLink>
            <NuxtLink to="/register" class="hover:bg-white/30 rounded-full px-4 md:px-2.5 sm:px-1.5 py-2 md:py-1.5 sm:py-1">注册</NuxtLink>
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

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300 // 滚动超过300px时显示按钮
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// 添加和移除滚动事件监听器
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
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
button {
  opacity: 0.8;
}

button:hover {
  opacity: 1;
  transform: translateY(-2px);
}

/* 添加导航栏响应式样式 */
@media (max-width: 640px) {
  nav {
    margin: 0 -1rem;
  }
  
  nav ul {
    padding: 0 0.5rem;
  }
}

.gradient-text {
  background: linear-gradient(45deg, #3B82F6, #EC4899);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 600;
}
</style>