<template>
    <CommonNavbar />
    <div>
        <div class="flex flex-col items-center justify-center min-h-screen backdrop-blur-md"
            :style="{ backgroundImage: 'url(/background2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }">
            <BoxContainer>
                <!-- 页面标题 -->
                <h1 class="text-2xl font-bold text-white mt-4">页面标题</h1>
                <!-- 返回主页按钮 -->
                <div class="mt-8">
                    <NuxtLink 
                        to="/" 
                        class="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-lg backdrop-blur-sm transition duration-300 border border-white/30"
                    >
                        返回主页
                    </NuxtLink>
                </div>
            </BoxContainer>
            
        </div>
    </div>
    <CommonFooter />
</template>
<script setup>


</script>