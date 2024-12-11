<template>
  <div class="min-h-screen flex flex-col">
    <!-- 标题部分 -->
    <div class="flex-grow container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold mb-8 text-gray-800">实用工具集</h1>
      
      <!-- 说明文字部分，使用 max-w-[61.8%] 来控制宽度 -->
      <div class="bg-gray-50 rounded-lg p-8 shadow-lg mb-8 max-w-[61.8%] mx-auto">
        <p class="text-lg mb-6 text-gray-700">这里收集了一些常用的在线工具，希望能帮助提高您的工作效率。</p>
        
        <div class="space-y-4">
          <h2 class="text-xl font-semibold text-gray-800">使用说明:</h2>
          <ul class="list-disc pl-6 space-y-2 text-gray-700">
            <li>选择您需要使用的工具类别</li>
            <li>根据提示输入相应参数</li>
            <li>点击执行即可获得结果</li>
          </ul>
        </div>
      </div>

      <!-- 工具列表部分也使用相同宽度 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[61.8%] mx-auto">
        <!-- 工具卡片将在这里展示 -->
      </div>
    </div>

    <!-- 页脚会自然地显示在底部 -->
    <Footer />
  </div>
</template>