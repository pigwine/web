<template>
  <div class="min-h-screen flex flex-col">
    <!-- 占位空间，让内容显示在footer上方 -->
    <div class="flex-grow"></div>

    <!-- 联系内容 - 在footer上方一点点 -->
    <div class="flex flex-col items-center space-y-8 pb-32">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">{{ t('footer.contact') }}</h1>

      <!-- 动画箭头 -->
      <div class="animate-bounce">
        <UIcon
          name="i-heroicons-chevron-down"
          class="w-16 h-16 text-blue-600 cursor-pointer hover:text-blue-700 transition-colors duration-200"
          @click="scrollToFooter"
        />
      </div>

      <p class="text-gray-600 text-center">{{ t('contact.instruction') }}</p>
    </div>
  </div>
</template>

<script setup>
// 国际化和SEO配置
const { t, locale } = useI18n()

// 滚动到页面底部footer
const scrollToFooter = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  })
}

// 动态SEO配置
useSeoMeta({
  title: t('seo.pages.contact.title'),
  description: t('seo.pages.contact.description'),
  keywords: t('seo.pages.contact.keywords'),
  ogTitle: t('seo.pages.contact.title'),
  ogDescription: t('seo.pages.contact.description'),
  ogUrl: () => locale.value === 'zh' ? 'https://kaimafind.com/zh/contact' : 'https://kaimafind.com/contact',
  ogLocale: () => locale.value === 'zh' ? 'zh_CN' : 'en_US'
})
</script>

<style scoped>
/* 自定义弹跳动画 */
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0,-15px,0);
  }
  70% {
    transform: translate3d(0,-7px,0);
  }
  90% {
    transform: translate3d(0,-2px,0);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}

/* 悬停效果 */
.animate-bounce:hover {
  animation-duration: 0.5s;
}
</style>
