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

            <!-- 重要提示 -->
            <div class="bg-white/80 rounded-lg p-6 shadow-sm mt-8">
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
</script>