<template>
  <div class="login-container">
    <div class="login-form">
      <h2>作业批改系统</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">用户名</label>
          <input 
            type="text" 
            id="username" 
            v-model="loginForm.username" 
            placeholder="请输入用户名"
            autocomplete="username"
          />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input 
            type="password" 
            id="password" 
            v-model="loginForm.password" 
            placeholder="请输入密码"
            autocomplete="current-password"
          />
        </div>
        <div class="form-actions">
          <button type="submit" :disabled="loading">
            {{ loading ? '登录中...' : '登录' }}
          </button>
          <div class="register-link">
            还没有账号？<a @click="goToRegister">立即注册</a>
          </div>
        </div>
        <div v-if="error" class="error-message">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '~/utils/auth'

const router = useRouter()

const loginForm = ref({
  username: '',
  password: ''
})
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  if (!loginForm.value.username || !loginForm.value.password) {
    error.value = '用户名和密码不能为空'
    return
  }
  
  loading.value = true
  error.value = ''
  
  try {
    await login(loginForm.value.username, loginForm.value.password)
    // 登录成功后跳转到OCR页面
    router.push('/ocr')
  } catch (err) {
    error.value = err.message || '登录失败，请稍后再试'
  } finally {
    loading.value = false
  }
}

function goToRegister() {
  router.push('/ocr-register')
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-form {
  width: 100%;
  max-width: 400px;
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 24px;
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.form-actions {
  margin-top: 24px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.register-link {
  margin-top: 16px;
  text-align: center;
}

.register-link a {
  color: #4caf50;
  cursor: pointer;
  text-decoration: underline;
}

.error-message {
  margin-top: 16px;
  color: #f44336;
  text-align: center;
}
</style> 