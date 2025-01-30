<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
      <!-- 标题部分 -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">{{ isLogin ? '登录' : '注册' }}</h2>
        <button @click="close" class="text-gray-500 hover:text-gray-700">
          <span class="text-2xl">&times;</span>
        </button>
      </div>

      <!-- 表单部分 -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">邮箱</label>
          <input 
            type="email" 
            v-model="email" 
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">密码</label>
          <input 
            type="password" 
            v-model="password" 
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
        </div>

        <!-- 错误信息显示 -->
        <div v-if="error" class="text-red-500 text-sm">
          {{ error }}
        </div>

        <!-- 提交按钮 -->
        <button 
          type="submit" 
          class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {{ isLogin ? '登录' : '注册' }}
        </button>

        <!-- 切换登录/注册 -->
        <div class="text-center text-sm">
          <button 
            type="button"
            @click="isLogin = !isLogin" 
            class="text-blue-500 hover:text-blue-700"
          >
            {{ isLogin ? '没有账号？点击注册' : '已有账号？点击登录' }}
          </button>
        </div>

        <!-- 第三方登录选项 -->
        <div class="mt-4 text-center">
          <p class="text-sm text-gray-600 mb-2">或者使用以下方式</p>
          <div class="space-x-4">
            <button 
              type="button"
              @click="handleGoogleLogin"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Google 登录
            </button>
            <button 
              type="button"
              @click="handleGithubLogin"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              GitHub 登录
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const { $supabase } = useNuxtApp()

// 状态管理
const isOpen = ref(false)
const isLogin = ref(true)
const email = ref('')
const password = ref('')
const error = ref('')

// 打开模态框
const open = () => {
  isOpen.value = true
}

// 关闭模态框
const close = () => {
  isOpen.value = false
  error.value = ''
  email.value = ''
  password.value = ''
}

// 处理表单提交
const handleSubmit = async () => {
  error.value = ''
  try {
    if (isLogin.value) {
      // 登录逻辑
      const { error: signInError } = await $supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      })
      if (signInError) throw signInError
    } else {
      // 注册逻辑
      const { error: signUpError } = await $supabase.auth.signUp({
        email: email.value,
        password: password.value,
      })
      if (signUpError) throw signUpError
    }
    close()
  } catch (e) {
    error.value = e.message
  }
}

// 第三方登录处理
const handleGoogleLogin = async () => {
  const { error: googleError } = await $supabase.auth.signInWithOAuth({
    provider: 'google'
  })
  if (googleError) error.value = googleError.message
}

const handleGithubLogin = async () => {
  const { error: githubError } = await $supabase.auth.signInWithOAuth({
    provider: 'github'
  })
  if (githubError) error.value = githubError.message
}

// 暴露方法供父组件使用
defineExpose({
  open,
  close
})
</script>
