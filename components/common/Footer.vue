<template>
        <footer 
            class="flex flex-col items-center p-4 w-full transition-opacity duration-300"
            :class="{ 'opacity-0': !showFooter }"
        >
            <div class="flex justify-center space-x-4">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <UIcon name="i-simple-icons-twitter" class="w-6 h-6 opacity-80 hover:opacity-90" />
                </a>
                <a href="https://xiaohongshu.com" target="_blank" rel="noopener noreferrer">
                    <UIcon name="i-simple-icons-xiaohongshu" class="w-6 h-6 opacity-80 hover:opacity-90" />
                </a>
                <a href="https://weixin.qq.com" target="_blank" rel="noopener noreferrer">
                    <UIcon name="i-simple-icons-wechat" class="w-6 h-6 opacity-80 hover:opacity-90" />
                </a>
            </div>
            <div class="text-sm mt-2">
                Copyright © 2024 Kiama. All Rights Reserved.
            </div>
        </footer>
</template>

<script setup>
import { ref } from 'vue'

const showFooter = ref(true)
</script>
