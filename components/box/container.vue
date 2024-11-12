<template>
    <div>
        <div class="flex flex-col items-center justify-center h-[calc(100vh-100px)]">
            <div class="text-center bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-lg">
                <slot />
               
            </div>
        </div>
    </div>
</template>

<script setup>
// 移除未使用的handleClick函数，因为它已在JoinButton组件中定义
</script>