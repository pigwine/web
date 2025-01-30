<template>
        <footer 
            class="flex flex-col items-center p-4 w-full transition-opacity duration-300 text-black relative"
            :class="{ 'opacity-0': !showFooter }"
        >
            <div class="flex justify-center space-x-4">
                <a href="https://x.com/adoma1314" target="_blank" rel="noopener noreferrer">
                    <UIcon name="i-simple-icons-twitter" class="w-6 h-6 opacity-80 hover:opacity-90 text-black" />
                </a>
                <a href="https://xiaohongshu.com" target="_blank" rel="noopener noreferrer">
                    <UIcon name="i-simple-icons-xiaohongshu" class="w-6 h-6 opacity-80 hover:opacity-90 text-black" />
                </a>
                <div class="relative group">
                    <UIcon 
                        name="i-simple-icons-wechat" 
                        class="w-6 h-6 opacity-80 group-hover:opacity-90 text-black cursor-pointer" 
                    />
                    <!-- 二维码悬浮框 -->
                    <div class="fixed bottom-[60px] left-1/2 transform -translate-x-1/2 hidden group-hover:block z-50">
                        <img 
                            src="/wechat-qr.jpg" 
                            alt="微信二维码" 
                            class="w-32 h-32 object-cover bg-white p-2 rounded-lg shadow-lg"
                        />
                        <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                            <div class="border-8 border-transparent border-t-white"></div>
                        </div>
                    </div>
                </div>
                <a href="https://www.bilibili.com/video/BV1Yb6iYcEYZ/?spm_id_from=333.1387.homepage.video_card.click&vd_source=de7880749695c9021fae930098f9a57b" target="_blank" rel="noopener noreferrer">
                    <UIcon name="i-simple-icons-bilibili" class="w-6 h-6 opacity-80 hover:opacity-90 text-black" />
                </a>
            </div>
            <div class="text-sm mt-2 text-black">
                Copyright © 2025 Kiama. 
            </div>
        </footer>
</template>

<script setup>
import { ref } from 'vue'

const showFooter = ref(true)
</script>

<style scoped>
/* 确保悬浮框在其他元素之上 */
.group:hover .group-hover\:block {
    animation: fadeIn 0.2s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translate(-50%, 5px);
    }
    to {
        opacity: 1;
        transform: translate(-50%, 0);
    }
}
</style>
