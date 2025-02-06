<template>
  <div>
    <header class="static w-full relative z-10">
      <div class="container mx-auto flex flex-col md:flex-row items-center p-4 gap-4">
        <div class="text-2xl md:text-xl sm:text-lg tracking-tight font-sans">
          <span class="font-bold text-gray-800">Kaima</span>
          <span class="text-gray-500">Find</span>
        </div>
        
        <div class="flex-grow flex justify-center">
          <nav class="w-auto">
            <ul class="flex justify-center items-center gap-1 text-base md:text-sm">
              <li v-for="(item, index) in navItems" :key="index" class="flex-shrink">
                <NuxtLink :to="item.path" class="flex items-center hover:bg-white/30 rounded-full px-1 py-1">
                  <span v-if="!isMobile" class="nav-text">{{ item.text }}</span>
                  <span v-else class="nav-icon">{{ item.icon }}</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
        
        <!-- 用户状态区域 -->
        <div class="w-[120px] md:block flex items-center gap-2">
          <template v-if="user">
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-600 truncate max-w-[100px]">{{ user.email }}</span>
              <button
                @click="handleLogout"
                :disabled="loading"
                class="nav-text hover:bg-red-50 hover:text-red-500"
              >
                {{ loading ? '退出中...' : '退出' }}
              </button>
            </div>
          </template>
          <template v-else>
            <NuxtLink
              to="/login"
              class="nav-text hover:bg-blue-50 hover:text-blue-500"
            >
              登录
            </NuxtLink>
            <NuxtLink
              to="/register"
              class="nav-text hover:bg-green-50 hover:text-green-500"
            >
              注册
            </NuxtLink>
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

const { $supabase } = useNuxtApp()
const router = useRouter()

const showBackToTop = ref(false)
const isMobile = ref(false)
const user = ref(null)
const loading = ref(false)

const navItems = [
  { path: '/', text: '首页', icon: '🏠' },
  // { path: '/bookgroup', text: '阅读空间', icon: '📚' },  // 注释掉阅读空间
  { path: '/usefultool', text: '实用工具', icon: '🛠️' },
  { path: '/investment', text: '投资理财', icon: '💰' },
  { path: '/usefulthings', text: '实用好物', icon: '🎁' },
  { path: '/news/news', text: '新闻资讯', icon: '📰' }
]

// 获取当前用户
const getUser = async () => {
  try {
    const { data: { user: currentUser } } = await $supabase.auth.getUser()
    user.value = currentUser
  } catch (error) {
    console.error('获取用户信息失败:', error)
  }
}

// 处理退出
const handleLogout = async () => {
  if (loading.value) return
  
  loading.value = true
  try {
    const { error } = await $supabase.auth.signOut()
    if (error) throw error
    
    user.value = null
    router.push('/login')
  } catch (error) {
    console.error('退出失败:', error)
  } finally {
    loading.value = false
  }
}

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const checkDevice = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
  isMobile.value = mobileRegex.test(userAgent.toLowerCase())
}

// 监听认证状态变化
$supabase.auth.onAuthStateChange((event, session) => {
  user.value = session?.user || null
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  checkDevice()
  window.addEventListener('resize', checkDevice)
  getUser() // 获取初始用户状态
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', checkDevice)
})
</script>

<style scoped>
.nav-icon, .nav-text {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1px 4px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.8);
  transition: all 0.2s ease;
  color: #1f2937;
  font-size: 0.85em;
  min-width: 24px;
  text-align: center;
  height: 28px;
  min-width: 60px;
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