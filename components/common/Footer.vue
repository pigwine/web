<template>
        <footer
            class="flex flex-col items-center p-6 w-full transition-opacity duration-300 text-black relative border-t border-gray-200"
            :class="{ 'opacity-0': !showFooter }"
        >
            <!-- 法律页面链接 -->
            <div class="flex flex-wrap justify-center gap-4 mb-4 text-sm">
                <NuxtLink
                    :to="localePath('/privacy')"
                    class="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                    {{ t('footer.privacy') }}
                </NuxtLink>
                <span class="text-gray-400">|</span>
                <NuxtLink
                    :to="localePath('/terms')"
                    class="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                    {{ t('footer.terms') }}
                </NuxtLink>
                <span class="text-gray-400">|</span>
                <NuxtLink
                    :to="localePath('/about')"
                    class="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                    {{ t('footer.about') }}
                </NuxtLink>
                <span class="text-gray-400">|</span>
                <NuxtLink
                    :to="localePath('/contact')"
                    class="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                    {{ t('footer.contact') }}
                </NuxtLink>
            </div>

            <!-- 社交媒体图标 -->
            <div class="flex justify-center space-x-4 mb-4">
                <a href="https://x.com/adoma1314" target="_blank" rel="noopener noreferrer" class="social-link">
                    <UIcon name="i-simple-icons-twitter" class="w-6 h-6 opacity-80 hover:opacity-90 text-black" />
                </a>
                <a href="https://xiaohongshu.com" target="_blank" rel="noopener noreferrer" class="social-link">
                    <UIcon name="i-simple-icons-xiaohongshu" class="w-6 h-6 opacity-80 hover:opacity-90 text-black" />
                </a>
                <div class="relative group">
                    <UIcon
                        name="i-simple-icons-wechat"
                        class="w-6 h-6 opacity-80 group-hover:opacity-90 text-black cursor-pointer"
                    />
                    <!-- 二维码悬浮框 -->
                    <div class="fixed bottom-[80px] left-1/2 transform -translate-x-1/2 hidden group-hover:block z-50">
                        <img
                            src="/wechat-qr.jpg"
                            alt="微信二维码"
                            class="w-32 h-32 object-cover bg-white p-2 rounded-lg shadow-lg"
                        />
                        <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                            <div class="border-8 border-transparent border-t-white"></div>
                        </div>
                    </div>
                </div>
                <a href="https://www.bilibili.com/video/BV1Yb6iYcEYZ/?spm_id_from=333.1387.homepage.video_card.click&vd_source=de7880749695c9021fae930098f9a57b" target="_blank" rel="noopener noreferrer" class="social-link">
                    <UIcon name="i-simple-icons-bilibili" class="w-6 h-6 opacity-80 hover:opacity-90 text-black" />
                </a>
            </div>

            <!-- 版权信息 -->
            <div class="text-sm text-gray-500 text-center">
                <p>Copyright © 2025 KaimaFind. {{ t('footer.allRightsReserved') }}</p>
                <p class="mt-1 text-xs">{{ t('footer.description') }}</p>
            </div>
        </footer>
</template>

<script setup>
import { ref } from 'vue'

// 国际化支持
const { t } = useI18n()
const localePath = useLocalePath()

const showFooter = ref(true)
</script>

<style scoped>
/* 社交媒体链接悬停效果 */
.social-link {
    transition: transform 0.2s ease-in-out;
}

.social-link:hover {
    transform: translateY(-2px);
}

/* 确保悬浮框在其他元素之上 */
.group:hover .group-hover\:block {
    animation: fadeIn 0.2s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translate(-50%, 5px);
    }
    to {
        opacity: 1;
        transform: translate(-50%, 0);
    }
}

/* 响应式设计 */
@media (max-width: 640px) {
    .flex-wrap {
        flex-direction: column;
        gap: 0.5rem;
    }

    .flex-wrap span {
        display: none;
    }
}
</style>
