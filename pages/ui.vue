<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-grow container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold mb-8 text-gray-800">UI 测试页面</h1>
      
      <!-- 内容区域控制在黄金比例 -->
      <div class="max-w-[61.8%] mx-auto space-y-8">
        <!-- 按钮测试区域 -->
        <section class="bg-gray-50 rounded-lg p-6 shadow-lg">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">按钮样式</h2>
          <div class="space-x-4">
            <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              主要按钮
            </button>
            <button class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
              次要按钮
            </button>
            <button class="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50">
              边框按钮
            </button>
          </div>
        </section>

        <!-- 输入框测试区域 -->
        <section class="bg-gray-50 rounded-lg p-6 shadow-lg">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">输入框样式</h2>
          <div class="space-y-4">
            <input 
              type="text" 
              placeholder="基础输入框"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            <textarea 
              placeholder="文本域"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            ></textarea>
          </div>
        </section>

        <!-- 卡片测试区域 -->
        <section class="bg-gray-50 rounded-lg p-6 shadow-lg">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">卡片样式</h2>
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded-lg shadow">
              <h3 class="font-medium mb-2">卡片标题 1</h3>
              <p class="text-gray-600">这是一个基础卡片示例，用于展示内容。</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
              <h3 class="font-medium mb-2">卡片标题 2</h3>
              <p class="text-gray-600">这是一个可悬浮的卡片示例。</p>
            </div>
          </div>
        </section>

        <!-- 提示信息测试区域 -->
        <section class="bg-gray-50 rounded-lg p-6 shadow-lg">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">提示信息</h2>
          <div class="space-y-4">
            <div class="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4">
              信息提示
            </div>
            <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4">
              成功提示
            </div>
            <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
              警告提示
            </div>
            <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              错误提示
            </div>
          </div>
        </section>
      </div>
    </div>
   
  </div>
</template>

<script setup>
</script>

<style scoped>
/* 如果需要额外的样式可以在这里添加 */
</style> 