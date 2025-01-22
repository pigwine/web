<template>
    <div class="flex flex-col items-center justify-center py-12 px-4">
        <div class="max-w-4xl w-full">
            <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">读书空间</h1>
            
            <!-- 知识站点介绍 -->
            <BookGroupOutside />
        </div>
    </div>
</template>

<script setup>
import BookGroupOutside from '~/components/books/bookgroupoutside.vue'

definePageMeta({
    layout: 'waitlist'
})
</script>