<template>
    <div class="flex flex-col items-center justify-center py-12 px-4">
        <div class="max-w-4xl w-full">
            <!-- 导航按钮 -->
            <div class="flex justify-center gap-4 mb-12">
                <button 
                    @click="scrollToSection('offshore')"
                    class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    离岸账户
                </button>
                <button 
                    @click="scrollToSection('web3')"
                    class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Web3投资
                </button>
            </div>

            <!-- 移动到这里的标题 -->
            <h1 class="text-3xl font-bold text-gray-900 mb-12 text-center">资金出海投资指南</h1>
            
            <!-- 离岸账户部分 -->
            <div id="offshore">
                <offshoreaccount />
            </div>
            
            <!-- Web3投资部分 -->
            <div id="web3" class="mt-16">
                <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">Web3投资渠道</h2>
                <div class="bg-white/80 rounded-lg p-6 shadow-sm">
                    <web3 />
                </div>
            </div>
            
            <!-- 重要提示部分 -->
        </div>
    </div>
</template>

<script setup>
import offshoreaccount from '~/components/investment/offshoreaccount.vue'
import web3 from '~/components/investment/web3.vue'

definePageMeta({
    layout: 'waitlist'
})

// 添加滚动函数
const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        })
    }
}
</script>

<style scoped>
/* 确保背景和阴影效果统一 */
:deep(.bg-white\/80) {
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(8px);
}

:deep(.shadow-sm) {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
</style>   