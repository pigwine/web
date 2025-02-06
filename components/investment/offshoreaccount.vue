<template>
    <div class="flex flex-col items-center justify-center py-12 px-4">
        <div class="max-w-4xl w-full">
            
            <!-- 投资路径列表 -->
            <div class="space-y-4">
                <!-- QDII基金路径 -->
                <div class="bg-white/80 rounded-lg shadow-sm">
                    <button 
                        class="w-full px-6 py-3 flex items-center justify-between"
                        @click="showQDII = !showQDII"
                    >
                        <div>
                            <span class="font-medium">路径一：QDII基金（最简单）</span>
                            <span class="ml-2 text-sm text-green-600">全程境内</span>
                        </div>
                        <span class="transform transition-transform" :class="{ 'rotate-180': showQDII }">▼</span>
                    </button>
                    <div v-show="showQDII" class="px-6 py-4 border-t">
                        <!-- QDII资金流向图 -->
                        <div class="mb-8">
                            <div class="font-medium mb-3">资金流向：</div>
                            <div class="p-0">
                                <svg class="w-full" viewBox="0 0 1000 240">
                                    <defs>
                                        <marker id="arrowhead" markerWidth="12" markerHeight="8" refX="11" refY="4" orient="auto">
                                            <polygon points="0 0, 12 4, 0 8" fill="#6B7280"/>
                                        </marker>
                                    </defs>
                                    <g fill="none" stroke="#6B7280" stroke-width="2">
                                        <!-- 调整矩形框位置，使其与文本对齐 -->
                                        <rect x="0" y="40" width="250" height="100" rx="8" fill="white" class="shadow-sm" stroke="#E5E7EB"/>
                                        <rect x="375" y="40" width="250" height="100" rx="8" fill="white" class="shadow-sm" stroke="#E5E7EB"/>
                                        <rect x="750" y="40" width="250" height="100" rx="8" fill="white" class="shadow-sm" stroke="#E5E7EB"/>
                                        
                                        <!-- 调整连接箭头 -->
                                        <line x1="250" y1="90" x2="375" y2="90" stroke-width="3" marker-end="url(#arrowhead)"/>
                                        <line x1="625" y1="90" x2="750" y2="90" stroke-width="3" marker-end="url(#arrowhead)"/>
                                    </g>
                                    
                                    <!-- 调整文字位置 -->
                                    <g fill="#374151" font-size="22" font-weight="500">
                                        <text x="125" y="100" text-anchor="middle" dominant-baseline="middle">支付宝/微信</text>
                                        <text x="500" y="100" text-anchor="middle" dominant-baseline="middle">基金账户</text>
                                        <text x="875" y="100" text-anchor="middle" dominant-baseline="middle">QDII基金</text>
                                    </g>
                                </svg>
                            </div>
                            <div class="mt-4 text-sm text-gray-600 space-y-2">
                                <div>• 基金账户：天天基金、蚂蚁财富、各大券商APP（华泰、中信等）</div>
                                <div>• QDII基金：易方达标普科技、华夏纳斯达克100等主流QDII基金</div>
                            </div>
                        </div>
                        
                        <div v-for="(section, index) in qdiiSections" :key="index" class="space-y-2 mb-4">
                            <div class="font-medium">{{ section.title }}：</div>
                            <ul class="text-sm space-y-1 text-gray-600">
                                <li v-for="item in section.items" :key="item" class="flex">
                                    • {{ item }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- 港股通路径 -->
                <div class="bg-white/80 rounded-lg shadow-sm">
                    <button 
                        class="w-full px-6 py-3 flex items-center justify-between"
                        @click="showHK = !showHK"
                    >
                        <div>
                            <span class="font-medium">路径二：港股通（性价比高）</span>
                            <span class="ml-2 text-sm text-yellow-600">境内开通</span>
                        </div>
                        <span class="transform transition-transform" :class="{ 'rotate-180': showHK }">▼</span>
                    </button>
                    <div v-show="showHK" class="px-6 py-4 border-t">
                        <!-- 港股通资金流向图 -->
                        <div class="mb-8">
                            <div class="font-medium mb-3">资金流向：</div>
                            <div class="p-0">
                                <svg class="w-full" viewBox="0 0 1000 240">
                                    <defs>
                                        <marker id="arrowhead2" markerWidth="12" markerHeight="8" refX="11" refY="4" orient="auto">
                                            <polygon points="0 0, 12 4, 0 8" fill="#6B7280"/>
                                        </marker>
                                    </defs>
                                    <g fill="none" stroke="#6B7280" stroke-width="2">
                                        <rect x="0" y="40" width="200" height="100" rx="8" fill="white" class="shadow-sm" stroke="#E5E7EB"/>
                                        <rect x="266" y="40" width="200" height="100" rx="8" fill="white" class="shadow-sm" stroke="#E5E7EB"/>
                                        <rect x="533" y="40" width="200" height="100" rx="8" fill="white" class="shadow-sm" stroke="#E5E7EB"/>
                                        <rect x="800" y="40" width="200" height="100" rx="8" fill="white" class="shadow-sm" stroke="#E5E7EB"/>
                                        
                                        <line x1="200" y1="90" x2="266" y2="90" stroke-width="3" marker-end="url(#arrowhead2)"/>
                                        <line x1="466" y1="90" x2="533" y2="90" stroke-width="3" marker-end="url(#arrowhead2)"/>
                                        <line x1="733" y1="90" x2="800" y2="90" stroke-width="3" marker-end="url(#arrowhead2)"/>
                                    </g>
                                    
                                    <g fill="#374151" font-size="22" font-weight="500">
                                        <text x="100" y="100" text-anchor="middle" dominant-baseline="middle">支付宝/微信</text>
                                        <text x="366" y="100" text-anchor="middle" dominant-baseline="middle">证券账户</text>
                                        <text x="633" y="100" text-anchor="middle" dominant-baseline="middle">换汇通道</text>
                                        <text x="900" y="100" text-anchor="middle" dominant-baseline="middle">港股市场</text>
                                    </g>
                                </svg>
                            </div>
                            <div class="mt-4 text-sm text-gray-600 space-y-2">
                                <div>• 证券账户：国内主流券商（中信、华泰、招商等）</div>
                                <div>• 换汇通道：券商提供的港股通专用换汇服务</div>
                                <div>• 港股市场：港交所上市公司股票（腾讯、阿里、美团等）</div>
                            </div>
                        </div>

                        <div v-for="(section, index) in hkSections" :key="index" class="space-y-2 mb-4">
                            <div class="font-medium">{{ section.title }}：</div>
                            <ul class="text-sm space-y-1 text-gray-600">
                                <li v-for="item in section.items" :key="item" class="flex">
                                    • {{ item }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- 离岸账户路径 -->
                <div class="bg-white/80 rounded-lg shadow-sm">
                    <button 
                        class="w-full px-6 py-3 flex items-center justify-between"
                        @click="showOffshore = !showOffshore"
                    >
                        <div>
                            <span class="font-medium">路径三：离岸账户（最灵活）</span>
                            <span class="ml-2 text-sm text-red-600">需要境外开户</span>
                        </div>
                        <span class="transform transition-transform" :class="{ 'rotate-180': showOffshore }">▼</span>
                    </button>
                    <div v-show="showOffshore" class="px-6 py-4 border-t">
                        <!-- 离岸账户资金流向图 -->
                        <div class="mb-8">
                            <div class="font-medium mb-3">资金流向：</div>
                            <div class="p-0">
                                <svg class="w-full" viewBox="0 0 1000 340">
                                    <defs>
                                        <marker id="arrowhead3" markerWidth="12" markerHeight="8" refX="11" refY="4" orient="auto">
                                            <polygon points="0 0, 12 4, 0 8" fill="#6B7280"/>
                                        </marker>
                                    </defs>
                                    <g fill="none" stroke="#6B7280" stroke-width="2">
                                        <rect x="0" y="40" width="250" height="100" rx="8" fill="white" class="shadow-sm" stroke="#E5E7EB"/>
                                        <rect x="375" y="40" width="250" height="100" rx="8" fill="white" class="shadow-sm" stroke="#E5E7EB"/>
                                        <rect x="750" y="40" width="250" height="100" rx="8" fill="white" class="shadow-sm" stroke="#E5E7EB"/>
                                        <rect x="525" y="200" width="250" height="100" rx="8" fill="white" class="shadow-sm" stroke="#E5E7EB"/>
                                        
                                        <line x1="250" y1="90" x2="375" y2="90" stroke-width="3" marker-end="url(#arrowhead3)"/>
                                        <line x1="625" y1="90" x2="750" y2="90" stroke-width="3" marker-end="url(#arrowhead3)"/>
                                        <line x1="875" y1="140" x2="775" y2="200" stroke-width="3" marker-end="url(#arrowhead3)"/>
                                    </g>
                                    
                                    <g fill="#374151" font-size="22" font-weight="500">
                                        <text x="125" y="100" text-anchor="middle" dominant-baseline="middle">支付宝/微信</text>
                                        <text x="500" y="100" text-anchor="middle" dominant-baseline="middle">换汇通道</text>
                                        <text x="875" y="100" text-anchor="middle" dominant-baseline="middle">离岸账户</text>
                                        <text x="650" y="260" text-anchor="middle" dominant-baseline="middle">全球投资</text>
                                    </g>
                                </svg>
                            </div>
                            <div class="mt-4 text-sm text-gray-600 space-y-2">
                                <div>• 换汇通道：汇丰银行、渣打银行等国际银行的换汇服务</div>
                                <div>• 离岸账户：香港/新加坡等地区的银行（如汇丰香港、星展银行等）</div>
                                <div>• 全球投资：国际券商（如富途、老虎证券）、境外基金平台等</div>
                            </div>
                        </div>

                        <div class="space-y-3">
                            <!-- 基本说明 -->
                            <div class="space-y-2">
                                <div class="font-medium">基本说明：</div>
                                <ul class="text-sm space-y-1 text-gray-600">
                                    <li>• 适合人群：需要全球资产配置的投资者</li>
                                    <li>• 投资门槛：一般10-50万港币起</li>
                                    <li>• 操作难度：★★★★☆（较难）</li>
                                </ul>
                            </div>

                            <!-- 开通条件 -->
                            <div class="space-y-2">
                                <div class="font-medium">开通条件：</div>
                                <ul class="text-sm space-y-1 text-gray-600">
                                    <li>• 有效护照、港澳通行证等身份证明</li>
                                    <li>• 资金证明（银行流水、资产证明）</li>
                                    <li>• 收入来源证明（工作证明等）</li>
                                    <li>• 亲访网点办理开户手续</li>
                                </ul>
                            </div>

                            <!-- 交易规则 -->
                            <div class="space-y-2">
                                <div class="font-medium">交易规则：</div>
                                <ul class="text-sm space-y-1 text-gray-600">
                                    <li>• 资金存管：国际银行托管</li>
                                    <li>• 币种支持：多币种自由兑换</li>
                                    <li>• 转账时效：一般T+1到账</li>
                                    <li>• 入金要求：需要完整资金来源说明</li>
                                </ul>
                            </div>

                            <!-- 费用说明 -->
                            <div class="space-y-2">
                                <div class="font-medium">费用说明：</div>
                                <ul class="text-sm space-y-1 text-gray-600">
                                    <li>• 账户管理费：200-500港币/月</li>
                                    <li>• 跨境汇款：150-300元/笔</li>
                                    <li>• 换汇点差：0.3%-0.8%</li>
                                    <li>• 最低余额要求：视银行而定</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 投资路径列表后，重要提示前 -->
            <div class="bg-white/80 rounded-lg p-6 shadow-sm mt-8">
                <!-- 添加参考文档链接和滚动按钮 -->
                <div class="mb-8 space-y-4">
                    <a 
                        href="https://www.hsbc.com.hk/content/dam/hsbc/hk/docs/international/remoteeep-guidance.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-block px-4 py-2 border border-gray-900 rounded-lg text-sm text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                    >
                        HSBC 香港远程开户指南 →
                    </a>
                    <div class="relative">
                        <!-- 按钮 -->
                        <button 
                            @click="toggleQRCode"
                            class="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                        >
                            联系获取帮助 {{ showQRCode ? '↑' : '↓' }}
                        </button>
                        
                        <!-- 二维码浮层 -->
                        <div 
                            v-if="showQRCode"
                            class="fixed left-[300px] top-[10%] z-50"
                            @click="toggleQRCode"
                        >
                            <img 
                                src="/wechat-qr2.jpg" 
                                alt="微信二维码" 
                                class="w-[160px] h-[160px] object-contain"
                            />
                        </div>
                    </div>
                </div>

                <!-- 原有的重要提示部分 -->
                <h2 class="text-xl font-bold mb-4">重要提示</h2>
                <div class="space-y-4">
                    <div class="space-y-2">
                        <div class="font-medium">换汇注意：</div>
                        <ul class="text-sm space-y-1 text-gray-600">
                            <li class="mb-3">
                                <div class="font-medium text-gray-700">• 分批换汇：建议5万美元额度分3-4次使用</div>
                                <div class="ml-3 mt-1 text-gray-500">原因：降低汇率波动风险，避免单笔大额交易引起银行额外审查</div>
                            </li>
                            <li class="mb-3">
                                <div class="font-medium text-gray-700">• 金额控制：建议单笔不超过2万美元，避免整数</div>
                                <div class="ml-3 mt-1 text-gray-500">原因：大额整数交易更容易触发银行系统审查</div>
                            </li>
                            <li class="mb-3">
                                <div class="font-medium text-gray-700">• 时间间隔：相邻操作建议间隔7-15天</div>
                                <div class="ml-3 mt-1 text-gray-500">原因：频繁交易可能被视为异常，适当间隔有助于降低合规风险</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const showQDII = ref(false)
const showHK = ref(false)
const showOffshore = ref(false)
const showQRCode = ref(false)

// QDII基金路径内容
const qdiiSections = [
    {
        title: '基本说明',
        items: [
            '适合人群：首次境外投资的个人投资者',
            '投资门槛：一般100元起投',
            '操作难度：★☆☆☆☆（最简单）'
        ]
    },
    {
        title: '主要优势',
        items: [
            '无需开通境外账户',
            '全程在境内操作',
            '投资门槛低',
            '交易便利，可在国内APP直接操作'
        ]
    },
    {
        title: '操作流程',
        items: [
            '开通基金账户（天天基金/券商APP）',
            '选择合适的QDII基金',
            '确认份额和费用',
            '完成申购'
        ]
    },
    {
        title: '费用说明',
        items: [
            '申购费：一般0.15%-1.5%',
            '赎回费：7天内1.5%，1年以上0.1%',
            '管理费：约1.5%/年',
            '托管费：约0.25%/年'
        ]
    }
]

// 港股通路径内容
const hkSections = [
    {
        title: '基本说明',
        items: [
            '适合人群：有一定投资经验的投资者',
            '投资门槛：账户资产50万以上',
            '操作难度：★★★☆☆（中等）'
        ]
    },
    {
        title: '开通条件',
        items: [
            'A股账户市值50万以上',
            '证券账户开通满6个月',
            '具备相应风险承受能力',
            '完成相关知识测评'
        ]
    },
    {
        title: '交易规则',
        items: [
            '交易时间：港股交易日9:30-16:00',
            '资金跨境：T+1日到账',
            '交易币种：港币',
            '每日额度限制'
        ]
    }
]

// 离岸账户路径内容
const offshoreSections = [
    {
        title: '离岸账户说明',
        items: [
            '定义：在香港/新加坡等地开设的非居民账户',
            '特点：资金可以多币种自由转换，全球汇款便利',
            '用途：投资、理财、资产配置、国际支付等'
        ]
    },
    {
        title: '开户要求',
        items: [
            '身份要求：有效护照、港澳通行证等',
            '资金要求：一般10-50万港币起（银行不同要求不同）',
            '地点要求：多数需要亲访网点办理',
            '材料要求：收入证明、资金来源证明等'
        ]
    },
    {
        title: '主要优势',
        items: [
            '资金灵活：多币种账户，汇率优惠',
            '投资便利：可直接对接海外券商、基金',
            '全球支付：支持SWIFT等国际结算系统',
            '服务完善：提供专业的离岸金融服务'
        ]
    },
    {
        title: '操作流程',
        isOrdered: true,
        items: [
            '预约开户（建议提前2-3周）',
            '准备开户材料（身份证明、资金证明等）',
            '亲访网点完成开户',
            '激活网银和各项功能',
            '办理境内外汇和转账'
        ]
    },
    {
        title: '费用说明',
        items: [
            '账户管理费：200-500港币/月（部分银行可免）',
            '最低存款要求：一般10-50万港币',
            '汇款手续费：一般每笔150-300港币',
            '换汇点差：通常优于境内银行'
        ]
    },
    {
        title: '特别提示',
        items: [
            '需要遵守境内外汇管理规定',
            '账户资金需要定期申报',
            '建议选择大型知名银行',
            '注意保持账户活跃度'
        ]
    }
]

const toggleQRCode = () => {
    showQRCode.value = !showQRCode.value
}
</script>

<style scoped>
/* 添加淡入淡出动画 */
.fixed {
    animation: fadeIn 0.2s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>