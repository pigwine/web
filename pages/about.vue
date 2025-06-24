<template>
  <div class="max-w-4xl mx-auto px-4 py-16">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">{{ t('about.title') }}</h1>
      <p class="text-xl text-gray-600 leading-relaxed">{{ t('about.description') }}</p>
    </div>
  </div>
</template>

<script setup>
// 国际化和SEO配置
const { t, locale } = useI18n()

// 动态SEO配置
useSeoMeta({
  title: t('seo.pages.about.title'),
  description: t('seo.pages.about.description'),
  keywords: t('seo.pages.about.keywords'),
  ogTitle: t('seo.pages.about.title'),
  ogDescription: t('seo.pages.about.description'),
  ogUrl: () => locale.value === 'zh' ? 'https://kaimafind.com/zh/about' : 'https://kaimafind.com/about',
  ogLocale: () => locale.value === 'zh' ? 'zh_CN' : 'en_US'
})
</script>
