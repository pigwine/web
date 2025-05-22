<template>
  <div class="container mx-auto py-10 px-4">
    <h1 class="text-2xl font-bold mb-6">API连接测试</h1>
    
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-3">API基础URL</h2>
      <input 
        type="text" 
        v-model="apiBaseUrl" 
        class="w-full px-3 py-2 border rounded-md mb-2"
      />
      <p class="text-sm text-gray-500">默认: http://148.135.56.176:8080</p>
    </div>
    
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-3">测试注册API</h2>
      <div class="bg-white rounded-lg border shadow-sm p-6">
        <div class="mb-4">
          <label class="block mb-1 font-medium">用户名</label>
          <input 
            type="text" 
            v-model="registerForm.username" 
            class="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div class="mb-4">
          <label class="block mb-1 font-medium">密码</label>
          <input 
            type="password" 
            v-model="registerForm.password" 
            class="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div class="mb-4">
          <label class="block mb-1 font-medium">昵称</label>
          <input 
            type="text" 
            v-model="registerForm.nickname" 
            class="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <button 
          @click="testRegister" 
          class="px-4 py-2 bg-blue-500 text-white rounded-md"
          :disabled="loading"
        >
          {{ loading ? '测试中...' : '测试注册API' }}
        </button>
      </div>
    </div>
    
    <div v-if="result" class="mb-8">
      <h2 class="text-xl font-semibold mb-3">测试结果</h2>
      <div class="bg-gray-50 p-4 rounded-md whitespace-pre-wrap">
        {{ result }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const apiBaseUrl = ref('http://148.135.56.176:8080')
const loading = ref(false)
const result = ref('')

const registerForm = ref({
  username: 'testuser' + Math.floor(Math.random() * 1000),
  password: 'password123',
  nickname: 'Test User'
})

async function testRegister() {
  loading.value = true
  result.value = '发送请求中...'
  
  try {
    console.log('测试注册API:', `${apiBaseUrl.value}/api/register`)
    console.log('请求数据:', registerForm.value)
    
    const response = await axios({
      method: 'post',
      url: `${apiBaseUrl.value}/api/register`,
      data: registerForm.value,
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000
    })
    
    console.log('API响应:', response)
    result.value = '请求成功!\n\n' + JSON.stringify(response.data, null, 2)
  } catch (error) {
    console.error('API错误:', error)
    
    let errorMessage = '请求失败!\n\n'
    
    if (error.response) {
      // 服务器返回了错误状态码
      errorMessage += `状态码: ${error.response.status}\n`
      errorMessage += `响应数据: ${JSON.stringify(error.response.data, null, 2)}\n`
    } else if (error.request) {
      // 请求已发送但没有收到响应
      errorMessage += '未收到服务器响应。可能原因:\n'
      errorMessage += '1. 服务器未运行\n'
      errorMessage += '2. CORS配置问题\n'
      errorMessage += '3. 网络连接问题\n'
      errorMessage += `错误信息: ${error.message}\n`
    } else {
      // 请求设置有误
      errorMessage += `请求错误: ${error.message}\n`
    }
    
    result.value = errorMessage
  } finally {
    loading.value = false
  }
}
</script> 