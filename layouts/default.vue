<template>
    <div>
        <div class="flex flex-col items-center justify-center min-h-screen backdrop-blur-md"
            :style="{ backgroundImage: 'url(/background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }">
            <slot /> <!-- 插入其他内容 -->
            <CommonNavbar />
            <CommonFooter />
        </div>
    </div>
</template>
<script setup>

</script>