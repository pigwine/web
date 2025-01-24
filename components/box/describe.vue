<template>
  <div>
    
    <div class="space-y-6">
      <!-- 阅读空间 -->
      <NuxtLink to="/bookgroup" class="block mb-6 hover:transform hover:scale-105 transition-transform">
        <div class="cursor-pointer p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all bg-white">
          <h2 class="text-2xl font-bold mb-3 text-gray-900">📚 阅读空间</h2>
          <p class="text-base text-gray-900">精选好书推荐，分享读书心得与方法</p>
        </div>
      </NuxtLink>

      <!-- 效率工具 -->
      <NuxtLink to="/usefultool" class="block mb-6 hover:transform hover:scale-105 transition-transform">
        <div class="cursor-pointer p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all bg-white">
          <h2 class="text-2xl font-bold mb-3 text-gray-900">🛠️ 效率工具</h2>
          <p class="text-base text-gray-900">发掘实用工具，提升学习与工作效率</p>
        </div>
      </NuxtLink>

      <!-- 投资理财 -->
      <NuxtLink to="/investment" class="block mb-6 hover:transform hover:scale-105 transition-transform">
        <div class="cursor-pointer p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all bg-white">
          <h2 class="text-2xl font-bold mb-3 text-gray-900">💰 投资理财</h2>
          <p class="text-base text-gray-900">分享投资知识，探讨财富增长之道</p>
        </div>
      </NuxtLink>

      <!-- 实用好物 -->
      <NuxtLink to="/usefulthings" class="block mb-6 hover:transform hover:scale-105 transition-transform">
        <div class="cursor-pointer p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all bg-white">
          <h2 class="text-2xl font-bold mb-3 text-gray-900">🎁 实用好物</h2>
          <p class="text-base text-gray-900">分享不一样的路子货，学会更好活</p>
        </div>
      </NuxtLink>
    
    </div>
    <div class="mt-8 text-sm text-gray-500">
      <p>🌟 持续更新中，欢迎关注！</p>
      <p>✨ 终身学习，不断成长</p>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.text-gray-600 {
  transition: colors 300ms;
}

.mb-6:hover .text-gray-600 {
  color: rgb(37 99 235); /* blue-600 颜色 */
}

h1 {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  letter-spacing: -0.5px;
}
</style>