<template>
  <div class="register-container">
    <div class="register-form">
      <h2>作业批改系统</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="username">用户名</label>
          <input 
            type="text" 
            id="username" 
            v-model="registerForm.username" 
            placeholder="请输入用户名"
            autocomplete="username"
          />
        </div>
        <div class="form-group">
          <label for="nickname">昵称</label>
          <input 
            type="text" 
            id="nickname" 
            v-model="registerForm.nickname" 
            placeholder="请输入昵称"
            autocomplete="nickname"
          />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input 
            type="password" 
            id="password" 
            v-model="registerForm.password" 
            placeholder="请输入密码"
            autocomplete="new-password"
          />
        </div>
        <div class="form-group">
          <label for="confirmPassword">确认密码</label>
          <input 
            type="password" 
            id="confirmPassword" 
            v-model="registerForm.confirmPassword" 
            placeholder="请再次输入密码"
            autocomplete="new-password"
          />
        </div>
        <div class="form-actions">
          <button type="submit" :disabled="loading">
            {{ loading ? '注册中...' : '注册' }}
          </button>
          <div class="login-link">
            已有账号？<a @click="goToLogin">立即登录</a>
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
import { register, login } from '~/utils/auth'

const router = useRouter()

const registerForm = ref({
  username: '',
  nickname: '',
  password: '',
  confirmPassword: ''
})
const loading = ref(false)
const error = ref('')

async function handleRegister() {
  // 表单验证
  if (!registerForm.value.username || !registerForm.value.password || !registerForm.value.confirmPassword) {
    error.value = '用户名和密码不能为空'
    return
  }
  
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    error.value = '两次输入的密码不一致'
    return
  }
  
  loading.value = true
  error.value = ''
  
  try {
    // 注册
    await register({
      username: registerForm.value.username,
      nickname: registerForm.value.nickname || registerForm.value.username,
      password: registerForm.value.password
    })
    
    // 注册成功后自动登录
    try {
      await login(registerForm.value.username, registerForm.value.password)
      // 登录成功后跳转到OCR页面
      router.push('/ocr')
    } catch (loginErr) {
      // 注册成功但登录失败，跳转到登录页
      alert('注册成功，请登录')
      router.push('/ocr-login')
    }
  } catch (err) {
    error.value = err.message || '注册失败，请稍后再试'
  } finally {
    loading.value = false
  }
}

function goToLogin() {
  router.push('/ocr-login')
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.register-form {
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

.login-link {
  margin-top: 16px;
  text-align: center;
}

.login-link a {
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