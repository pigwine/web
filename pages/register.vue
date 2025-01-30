<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-white">
    <div class="max-w-md w-full space-y-8 p-8 border border-gray-900 rounded-2xl">
      <!-- 页面标题 -->
      <div class="text-center">
        <h2 class="text-4xl font-light text-gray-900">创建账号</h2>
        <p class="mt-3 text-sm text-gray-500">
          已有账号？
          <NuxtLink to="/login" class="text-blue-500 hover:text-blue-600 transition-colors">
            返回登录
          </NuxtLink>
        </p>
      </div>

      <!-- 注册表单 -->
      <form @submit.prevent="handleRegister" class="mt-10 space-y-6">
        <!-- 用户名输入 -->
        <div class="space-y-2">
          <input
            id="username"
            type="text"
            v-model="username"
            placeholder="用户名"
            required
            class="block w-full px-4 py-3 border border-gray-900 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
          />
        </div>

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
            minlength="6"
            class="block w-full px-4 py-3 border border-gray-900 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
          />
          <p class="text-xs text-gray-500 ml-1">密码至少需要6个字符</p>
        </div>

        <!-- 确认密码 -->
        <div class="space-y-2">
          <input
            id="confirmPassword"
            type="password"
            v-model="confirmPassword"
            placeholder="确认密码"
            required
            class="block w-full px-4 py-3 border border-gray-900 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
          />
        </div>

        <!-- 状态显示 -->
        <div v-if="error || success" 
          class="text-sm text-center py-2 px-4 rounded-lg border"
          :class="{
            'text-red-500 border-red-500': error,
            'text-green-500 border-green-500': success
          }"
        >
          {{ error || success }}
        </div>

        <!-- 注册按钮 -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full flex justify-center py-3 px-4 rounded-xl text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 transition-colors duration-200 font-medium"
        >
          {{ loading ? '注册中...' : '创建账号' }}
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

        <!-- Google 注册按钮 -->
        <button
          type="button"
          @click="handleGoogleSignUp"
          :disabled="loading"
          class="w-full flex justify-center py-3 px-4 rounded-xl border border-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 transition-all duration-200"
        >
          <span class="text-gray-900">使用 Google 账号注册</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
const { $supabase } = useNuxtApp()
const router = useRouter()

// 状态管理
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const success = ref('')
const loading = ref(false)

// 处理注册
const handleRegister = async () => {
  if (loading.value) return
  
  error.value = ''
  success.value = ''
  
  // 验证密码匹配
  if (password.value !== confirmPassword.value) {
    error.value = '两次输入的密码不匹配'
    return
  }
  
  loading.value = true
  
  try {
    const { error: signUpError } = await $supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          username: username.value
        }
      }
    })

    if (signUpError) throw signUpError

    success.value = '注册成功！请查收验证邮件。'
    
    // 3秒后跳转到登录页
    setTimeout(() => {
      router.push('/login')
    }, 3000)
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

// Google 注册
const handleGoogleSignUp = async () => {
  if (loading.value) return
  
  loading.value = true
  error.value = ''
  success.value = ''
  
  try {
    const { data, error: signInError } = await $supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    })

    if (signInError) throw signInError
    
    if (!data?.url) {
      throw new Error('未获取到授权 URL')
    }

    window.location.href = data.url
  } catch (e) {
    error.value = 'Google 授权失败: ' + e.message
    console.error('Google 授权错误:', e)
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