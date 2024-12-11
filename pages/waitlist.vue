<template>
    <div class="flex flex-col items-center justify-center min-h-screen"
        :style="{  backgroundSize: 'cover', backgroundPosition: 'center' }">
        
        <div>
           
            <h1 class="text-2xl font-bold text-white mt-4 text-center">加入我们</h1>
            <p class="text-white mt-4 text-center">
                请点击下方按钮加入等待名单
            </p>
            <div class="mt-8 space-y-4">
                <NuxtLink 
                    to="https://表单链接"
                    target="_blank"
                    class="block text-center bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-lg backdrop-blur-sm transition duration-300 border border-white/30"
                >
                    立即加入
                </NuxtLink>
                <NuxtLink 
                    to="/" 
                    class="block text-center bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-lg backdrop-blur-sm transition duration-300 border border-white/30"
                >
                    返回主页
                </NuxtLink>
            </div>
            <p class="text-white mt-4 text-center max-w-md">
            感谢您的关注！我们会尽快处理您的申请。
            </p>
        </div>
    </div>
</template>
<script setup>
definePageMeta({
    layout: 'waitlist'
})

</script>