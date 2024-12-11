<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-1 min-h-0">
      <div class="max-w-4xl mx-auto px-4">
        <h1 class="text-3xl font-bold text-center mb-8">最新动态</h1>
        
        <div class="bg-white/30 backdrop-blur-sm rounded-lg shadow-lg p-6 min-h-[300px]">
          <div class="prose prose-lg max-w-none">
            <ContentDoc path="/news">
              <template #not-found>
                <p>内容加载中...</p>
              </template>
            </ContentDoc>
          </div>
        </div>

        <div class="mt-8 flex justify-center space-x-4">
          <button class="px-4 py-2 bg-white/20 hover:bg-white/30 text-black rounded-lg backdrop-blur-sm transition duration-300 border border-white/30">
            上一页
          </button>
          <button class="px-4 py-2 bg-white/20 hover:bg-white/30 text-black rounded-lg backdrop-blur-sm transition duration-300 border border-white/30">
            下一页
          </button>
        </div>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script setup>
// 可以添加分页逻辑
</script>
