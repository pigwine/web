<template>
  <div class="p-4">
    <div class="space-y-4">
      <!-- 登录按钮 -->
      <button 
        @click="showAuth = true"
        class="bg-blue-500 text-white px-4 py-2 rounded mr-4"
      >
        登录/注册
      </button>

      <!-- 测试连接按钮 -->
      <button 
        @click="testConnection" 
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        测试连接
      </button>

      <!-- 状态显示 -->
      <div v-if="status" class="mt-4">
        <p>{{ status }}</p>
      </div>

      <!-- 待办事项列表 -->
      <div v-if="todos.length" class="mt-4">
        <h3 class="text-lg mb-2">待办事项列表：</h3>
        <ul>
          <li v-for="todo in todos" :key="todo.id">
            {{ todo.title }}
          </li>
        </ul>
      </div>
    </div>

    <!-- 认证组件 -->
    <Auth v-if="showAuth" @close="showAuth = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
const { $supabase } = useNuxtApp()

const status = ref('')
const todos = ref([])
const showAuth = ref(false)

const testConnection = async () => {
  try {
    const { data, error } = await $supabase
      .from('todos')
      .select('*')
    
    if (error) {
      status.value = '查询失败: ' + error.message
      console.error('查询错误:', error)
    } else {
      status.value = '连接成功！成功查询到数据。'
      todos.value = data
      console.log('查询结果:', data)
    }
  } catch (error) {
    status.value = '连接出错: ' + (error.message || '未知错误')
    console.error('测试连接时发生错误:', error)
  }
}
</script>