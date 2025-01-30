<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-white">
    <div class="max-w-md w-full space-y-8 p-8 border border-gray-900 rounded-2xl">
      <!-- 页面标题 -->
      <div class="text-center">
        <h2 class="text-4xl font-light text-gray-900">欢迎回来</h2>
        <p class="mt-3 text-sm text-gray-500">
          还没有账号？
          <NuxtLink to="/register" class="text-blue-500 hover:text-blue-600 transition-colors">
            创建新账号
          </NuxtLink>
        </p>
      </div>

      <!-- 登录表单 -->
      <form @submit.prevent="handleEmailLogin" class="mt-10 space-y-6">
        <!-- 邮箱输入 -->
        <div class="space-y-2">
          <input
            id="email"
            type="email"
            v-model="email"
            placeholder="邮箱地址"
            required
            class="block w-full px-4 py-3 border border-gray-900 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
          />
        </div>

        <!-- 密码输入 -->
        <div class="space-y-2">
          <input
            id="password"
            type="password"
            v-model="password"
            placeholder="密码"
            required
            class="block w-full px-4 py-3 border border-gray-900 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
          />
        </div>

        <!-- 状态显示 -->
        <div v-if="status" 
          class="text-sm text-center py-2 rounded-lg border"
          :class="{
            'text-red-500 border-red-500': error,
            'text-green-500 border-green-500': !error
          }"
        >
          {{ status }}
        </div>

        <!-- 登录按钮 -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full flex justify-center py-3 px-4 rounded-xl text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 transition-colors duration-200 font-medium"
        >
          {{ loading ? '登录中...' : '登录' }}
        </button>

        <!-- 分割线 -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-900"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-white text-gray-500">或者</span>
          </div>
        </div>

        <!-- Google 登录按钮 -->
        <button
          type="button"
          @click="handleGoogleLogin"
          :disabled="loading"
          class="w-full flex justify-center py-3 px-4 rounded-xl border border-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 transition-all duration-200"
        >
          <span class="text-gray-900">使用 Google 账号登录</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
const { $supabase } = useNuxtApp()
const router = useRouter()

// 状态管理
const email = ref('')
const password = ref('')
const status = ref('')
const error = ref(false)
const loading = ref(false)

// 邮箱密码登录
const handleEmailLogin = async () => {
  if (loading.value) return
  
  loading.value = true
  status.value = ''
  error.value = false
  
  try {
    const { error: signInError } = await $supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (signInError) throw signInError

    status.value = '登录成功！'
    error.value = false
    router.push('/')
  } catch (e) {
    status.value = '登录失败: ' + e.message
    error.value = true
    console.error('登录错误:', e)
  } finally {
    loading.value = false
  }
}

// Google 登录
const handleGoogleLogin = async () => {
  if (loading.value) return
  
  loading.value = true
  status.value = ''
  error.value = false
  
  try {
    const { data, error: signInError } = await $supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if (signInError) throw signInError
    
    if (!data?.url) {
      throw new Error('未获取到重定向 URL')
    }

    window.location.href = data.url
  } catch (e) {
    status.value = '登录失败: ' + e.message
    error.value = true
    console.error('Google 登录错误:', e)
    loading.value = false
  }
}
</script>

<style scoped>
/* 添加平滑过渡效果 */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* 输入框聚焦时的阴影效果 */
input:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

/* 按钮悬浮效果 */
button:not(:disabled):hover {
  transform: translateY(-1px);
}
</style> 