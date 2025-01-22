<template>
    <div class="flex flex-col items-center justify-center py-12 px-4">
        <div class="max-w-4xl w-full">
            <h1 class="text-3xl font-bold text-gray-900 mb-12 text-center">资金出海投资指南</h1>
            
            <!-- 其他路径内容 -->
            
            <!-- 使用离岸账户组件 -->
            <offshoreaccount />
            
            <!-- 重要提示部分 -->
        </div>
    </div>
</template>

<script setup>
import offshoreaccount from '~/components/investment/offshoreaccount.vue'

definePageMeta({
    layout: 'waitlist'
})
</script>   