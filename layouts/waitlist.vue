<template>  
    <div class="min-h-screen flex flex-col">
        <div class="min-h-screen flex flex-col fixed w-full h-full">
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