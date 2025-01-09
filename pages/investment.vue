<template>
    <div class="flex flex-col items-center justify-center py-12 px-4">
        <div class="max-w-4xl w-full">
            <h1 class="text-3xl font-bold text-gray-900 mb-8 text-center">投资分析</h1>
            
            <!-- 投资链路展示 -->
            <div class="space-y-6">
                <div class="bg-white/20 backdrop-blur-sm rounded-lg p-6 border border-white/30">
                    <h2 class="text-xl font-bold text-gray-900 mb-4">🔄 投资链路</h2>
                    <div class="text-gray-800 space-y-2">
                        <p class="flex items-center">
                            <span class="mr-2">1.</span>
                            <span>资金募集 → 风险评估 → 资产配置 → 投资执行 → 收益分配</span>
                        </p>
                        <p class="flex items-center">
                            <span class="mr-2">2.</span>
                            <span>投前尽调 → 投资决策 → 投后管理 → 退出机制</span>
                        </p>
                        <p class="flex items-center">
                            <span class="mr-2">3.</span>
                            <span>风控体系 → 合规监管 → 信息披露</span>
                        </p>
                    </div>
                </div>

                <!-- 投资对象分析 -->
                <div class="bg-white/20 backdrop-blur-sm rounded-lg p-6 border border-white/30">
                    <h2 class="text-xl font-bold text-gray-900 mb-4">🎯 投资对象</h2>
                    <div class="text-gray-800 space-y-2">
                        <p>• 一级市场：PE/VC、天使投资、并购重组</p>
                        <p>• 二级市场：股票、债券、基金、期货</p>
                        <p>• 另类投资：房地产、艺术品、数字资产</p>
                        <p>• 创新领域：新能源、人工智能、生物科技</p>
                    </div>
                </div>

                <!-- 可视化分析 -->
                <div class="bg-white/20 backdrop-blur-sm rounded-lg p-6 border border-white/30">
                    <h2 class="text-xl font-bold text-gray-900 mb-4">📊 可视化分析</h2>
                    <div class="text-gray-800 space-y-2">
                        <p>• 市场趋势图表</p>
                        <div class="h-40 bg-white/10 rounded-lg flex items-center justify-center">
                            [趋势图表占位]
                        </div>
                        <p>• 资产配置分析</p>
                        <div class="h-40 bg-white/10 rounded-lg flex items-center justify-center">
                            [配置分析占位]
                        </div>
                        <p class="text-sm mt-4">
                            * 图表数据每日更新，仅供参考
                        </p>
                    </div>
                </div>
            </div>

            <!-- 底部提示 -->
            <div class="mt-8 text-center text-gray-700 text-sm">
                <p>投资有风险，入市需谨慎</p>
                <p>本页面信息仅供参考，不构成投资建议</p>
            </div>

            <div class="mt-8 text-center">
                <NuxtLink 
                    to="/" 
                    class="inline-block text-center bg-white/20 hover:bg-white/30 text-gray-900 font-bold py-3 px-6 rounded-lg backdrop-blur-sm transition duration-300 border border-white/30"
                >
                    返回主页
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'waitlist'
})
</script> 