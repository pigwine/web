<template>
    <div class="flex flex-col items-center justify-center py-12 px-4">
        <div class="max-w-4xl w-full">
            <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">读书空间</h1>
            
            <!-- 知识站点介绍 -->
            <div class="space-y-6">
                <div class="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                    <h2 class="text-xl font-bold text-gray-800 mb-4">📖 读书方法</h2>
                    <p class="text-gray-600">
                        分享高效阅读技巧、笔记方法、知识内化等实用阅读方法论
                    </p>
                </div>

                <div class="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                    <h2 class="text-xl font-bold text-gray-800 mb-4">🎯 主题阅读</h2>
                    <p class="text-gray-600">
                        围绕特定主题，提供系统化的阅读建议和学习路径
                    </p>
                </div>

                <div class="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                    <h2 class="text-xl font-bold text-gray-800 mb-4">💡 读书心得</h2>
                    <p class="text-gray-600">
                        定期更新读书笔记和思考，与你一起探讨书中的智慧
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'waitlist'
})
</script>