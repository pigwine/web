<template>
  <div class="min-h-screen flex flex-col items-center justify-center gap-4">
    <!-- 成功提示 -->
    <div v-if="showSuccess" 
         class="bg-green-500 text-white px-8 py-4 rounded-lg shadow-lg flex items-center space-x-3 transition-all duration-500 animate-slide-in">
      <svg class="w-6 h-6 animate-check" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span>登录成功！</span>
    </div>

    <!-- 登录框 -->
    <div class="max-w-md w-full space-y-8 p-8 border border-gray-200 rounded-xl">
      <!-- 标题 -->
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-900">登录账号</h2>
        <p class="mt-2 text-sm text-gray-600">欢迎回来</p>
      </div>

      <!-- 登录表单 -->
      <div class="space-y-4">
        <!-- 邮箱输入框 -->
        <div>
          <input 
            type="email" 
            v-model="email"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="请输入邮箱"
          >
        </div>

        <!-- 密码输入框 -->
        <div>
          <input 
            type="password" 
            v-model="password"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="请输入密码"
          >
        </div>

        <!-- 记住我和忘记密码 -->
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input 
              type="checkbox" 
              v-model="rememberMe"
              class="h-4 w-4 text-blue-500 border-gray-300 rounded"
            >
            <label class="ml-2 text-sm text-gray-600">记住我</label>
          </div>
          <div>
            <a href="#" class="text-sm text-blue-500 hover:text-blue-600">忘记密码？</a>
          </div>
        </div>

        <!-- 登录按钮 -->
        <button 
          @click="handleLogin"
          class="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          登录
        </button>

        <!-- 注册链接 -->
        <div class="text-center text-sm">
          <span class="text-gray-900">还没有账号？</span>
          <a 
            @click="goToRegister" 
            class="text-blue-500 hover:text-blue-600 cursor-pointer"
          >立即注册</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showSuccess = ref(false)

// 处理登录
const handleLogin = async () => {
  try {
    // 这里添加登录逻辑
    // await fetch('/api/login', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     email: email.value,
    //     password: password.value,
    //     rememberMe: rememberMe.value
    //   })
    // })
    
    // 显示成功提示
    showSuccess.value = true
    
    // 1秒后关闭提示并跳转
    setTimeout(() => {
      showSuccess.value = false
      router.push('/')
    }, 1000)
  } catch (error) {
    console.error('登录失败:', error)
  }
}

// 跳转到注册页
const goToRegister = () => {
  router.push('/register')
}
</script>

<style scoped>
.animate-slide-in {
  animation: slideIn 0.5s ease-out forwards;
}

.animate-check {
  animation: check 0.5s ease-out 0.2s forwards;
}

@keyframes slideIn {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes check {
  0% {
    transform: scale(0);
  }
  70% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style> 