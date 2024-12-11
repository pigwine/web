<template>
  <div>
    <!-- 白色背景测试区域 -->
    <div style="background-color: white; padding: 20px; margin: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <h1 style="color: #333; margin-bottom: 20px;">错误页面测试</h1>
      
      <!-- 测试按钮区域 -->
      <div style="display: flex; gap: 10px;">
        <!-- 404 测试按钮 -->
        <button 
          @click="test404" 
          style="background-color: blue; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;"
        >
          测试404错误
        </button>

        <!-- 500 测试按钮 -->
        <button 
          @click="test500" 
          style="background-color: red; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;"
        >
          测试500错误
        </button>
      </div>

      <!-- 状态显示 -->
      <p style="margin-top: 20px; color: #666;">
        状态: {{ status }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { createError } from 'nuxt/app'  // 添加这行导入

const status = ref('准备测试')

const test404 = () => {
  status.value = '触发404错误'
  throw createError({
    statusCode: 404,
    message: '这是一个404测试错误',
    fatal: true
  })
}

const test500 = () => {
  status.value = '触发500错误'
  throw createError({
    statusCode: 500,
    message: '这是一个500测试错误',
    fatal: true
  })
}
</script>

<style scoped>
button:hover {
  opacity: 0.8;
}
</style> 