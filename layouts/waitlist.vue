<template>  
    <div class="min-h-screen flex flex-col">
        <div class="min-h-screen flex flex-col fixed w-full h-full"
            :style="{ backgroundImage: 'url(/background2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }">
        </div>
        <CommonNavbar />
        <div class="min-h-screen flex flex-col relative">
            
            <main class="flex-grow flex flex-col items-center justify-center">
                <slot />
            </main>
            <CommonFooter />
        </div>
    </div>
</template>
<script setup>


</script>