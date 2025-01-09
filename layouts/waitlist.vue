<template>  
    <div class="min-h-screen flex flex-col bg-white dark:bg-gray-100">
        <div class="min-h-screen flex flex-col fixed w-full h-full bg-white dark:bg-gray-100">
        </div>
        <div class="min-h-screen flex flex-col relative z-10">
            <CommonNavbar />
            <main class="flex-grow flex flex-col items-center justify-center">
                <slot />
            </main>
            <CommonFooter />
        </div>
    </div>
</template>
<script setup>


</script>