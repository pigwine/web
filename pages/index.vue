<template>
    <div>
        <div class="flex flex-col items-center justify-center min-h-screen">
            <h1 class="text-4xl font-bold mb-8">首页</h1>
            <UButton
                label="立即订阅"
                size="lg"
                @click="handleClick"
            />
        </div>
    </div>
</template>

<script setup>
const handleClick = () => {
    window.open('https://x.com/nanjingsifang', '_blank')
}
</script>