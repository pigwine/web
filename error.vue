<template>
  <div class="error-wrapper">
    <div class="error-page">
      <!-- 根据不同错误类型显示不同内容 -->
      <template v-if="error.statusCode === 404">
        <h1>页面未找到</h1>
        <p v-if="error.message && !error.message.includes('页面未找到')">
          {{ error.message }}
        </p>
        <p v-else>
          抱歉，您访问的页面不存在
          <span class="error-code">404</span>
        </p>
      </template>
      <template v-else>
        <h1>发生错误</h1>
        <p>{{ error.message }}
          <span class="error-code">{{ error.statusCode || '500' }}</span>
        </p>
      </template>

      <!-- 倒计时和返回按钮 -->
      <p>{{ countdown }} 秒后自动返回首页</p>
      <NuxtLink to="/" class="home-button">
        立即返回首页
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, clearError } from '#app'

const props = defineProps({
  error: Object
})

const countdown = ref(5)
const router = useRouter()

const goHome = () => {
  clearError()
  navigateTo('/')
}

onMounted(() => {
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      goHome()
    }
  }, 1000)
})
</script>

<style scoped>
.error-wrapper {
  background-image: url('/errorbacground.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  margin: 0;
  padding: 20px;
}

.error-page {
  text-align: center;
  padding: 40px 20px;
  max-width: 500px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: relative;
  z-index: 1;
}

h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 16px;
}

p {
  color: #666;
  margin-bottom: 20px;
}

.home-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.home-button:hover {
  background-color: #2980b9;
}

.error-code {
  display: block;
  font-size: 48px;
  color: #000000;
  margin: 20px 0;
  font-weight: bold;
  opacity: 0.8;
}
</style> 