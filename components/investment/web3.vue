<template>
    <div class="flex flex-col items-center justify-center py-12 px-4">
       
        <div class="max-w-4xl w-full space-y-4">
            <!-- 币安 Binance -->
            <div class="bg-white/80 rounded-lg shadow-sm p-4">
                <a 
                    :href="affLinks.binance"
                    target="_blank"
                    class="w-full flex items-center justify-between hover:bg-gray-50/50 transition-colors rounded-lg"
                >
                    <div class="flex items-center">
                        <img src="/binance.png" alt="Binance" class="w-12 h-12 mr-4">
                        <div>
                            <div class="flex items-center">
                                <span class="font-medium">币安 Binance</span>
                                <span class="ml-2 text-sm text-green-600 bg-green-50 px-2 py-0.5 rounded">全球第一</span>
                            </div>
                            <div class="text-sm text-gray-500 mt-1">加入最高享受20%返佣优惠</div>
                        </div>
                    </div>
                    <span class="text-sm text-gray-500 px-4 py-2 bg-gray-50 rounded-lg">点击注册</span>
                </a>
            </div>

            <!-- OKX -->
            <div class="bg-white/80 rounded-lg shadow-sm p-4">
                <a 
                    :href="affLinks.okx"
                    target="_blank"
                    class="w-full flex items-center justify-between hover:bg-gray-50/50 transition-colors rounded-lg"
                >
                    <div class="flex items-center">
                        <img src="/okx.png" alt="OKX" class="w-12 h-12 mr-4">
                        <div>
                            <div class="flex items-center">
                                <span class="font-medium">欧意 OKX</span>
                                <span class="ml-2 text-sm text-blue-600 bg-blue-50 px-2 py-0.5 rounded">老牌交易所</span>
                            </div>
                            <div class="text-sm text-gray-500 mt-1">老牌交易所，安全可靠</div>
                        </div>
                    </div>
                    <span class="text-sm text-gray-500 px-4 py-2 bg-gray-50 rounded-lg">点击注册</span>
                </a>
            </div>

            <!-- Gate.io -->
            <div class="bg-white/80 rounded-lg shadow-sm p-4">
                <a 
                    :href="affLinks.gate"
                    target="_blank"
                    class="w-full flex items-center justify-between hover:bg-gray-50/50 transition-colors rounded-lg"
                >
                    <div class="flex items-center">
                        <img src="/gate.png" alt="Gate.io" class="w-12 h-12 mr-4">
                        <div>
                            <div class="flex items-center">
                                <span class="font-medium">芝麻 Gate.io</span>
                                <span class="ml-2 text-sm text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded">小币种多</span>
                            </div>
                            <div class="text-sm text-gray-500 mt-1">最高享30%返佣，小币种丰富</div>
                        </div>
                    </div>
                    <span class="text-sm text-gray-500 px-4 py-2 bg-gray-50 rounded-lg">点击注册</span>
                </a>
            </div>

            <!-- WeeX -->
            <div class="bg-white/80 rounded-lg shadow-sm p-4">
                <a 
                    :href="affLinks.weex"
                    target="_blank"
                    class="w-full flex items-center justify-between hover:bg-gray-50/50 transition-colors rounded-lg"
                >
                    <div class="flex items-center">
                        <img src="/weex.png" alt="WeeX" class="w-12 h-12 mr-4">
                        <div>
                            <div class="flex items-center">
                                <span class="font-medium">WeeX</span>
                                <span class="ml-2 text-sm text-purple-600 bg-purple-50 px-2 py-0.5 rounded">手续费低</span>
                            </div>
                            <div class="text-sm text-gray-500 mt-1">超低手续费，新用户专享优惠</div>
                        </div>
                    </div>
                    <span class="text-sm text-gray-500 px-4 py-2 bg-gray-50 rounded-lg">点击注册</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
// 推广链接配置
const affLinks = {
    binance: "https://accounts.marketwebb.ac/register?ref=UWLPVKF8",
    okx: "https://okx.com/join/66715646",
    gate: "https://www.gt-io.best/signup/VLJAULLEAA?ref_type=103",
    weex: "https://support.u-hw.com/zh-CN/register?vipCode=w1nq"
}

import { ref } from 'vue'

// 控制详情展开状态
const detailsOpen = ref({
    binance: false,
    okx: false,
    gate: false,
    weex: false
})

// 切换详情显示状态
const toggleDetails = (exchange) => {
    detailsOpen.value[exchange] = !detailsOpen.value[exchange]
}
</script>

<style scoped>
.shadow-sm {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

/* 修改卡片悬浮效果 */
.bg-white\/80 {
    transition: all 0.3s ease;
}

.bg-white\/80:hover {
    background-color: rgba(255, 255, 255, 0.95);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 修改按钮悬浮效果 */
.text-gray-500.px-4.py-2.bg-gray-50 {
    transition: all 0.3s ease;
}

a:hover .text-gray-500.px-4.py-2.bg-gray-50 {
    background-color: #2563eb;
    color: white;
}

/* 保留原有的渐变动画效果 */
a {
    position: relative;
    overflow: hidden;
}

a::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
    );
    transition: 0.5s;
}

a:hover::after {
    left: 100%;
}
</style>