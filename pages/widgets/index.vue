<template>
  <WidgetLayout>
    <div class="widgets-grid">
      <WeatherWidget />
      <ClockWidget />
    </div>
  </WidgetLayout>
</template>

<script setup>
import WidgetLayout from '~/components/notion/layout/WidgetLayout.vue'
import WeatherWidget from '~/components/notion/widgets/WeatherWidget.vue'

// 国际化SEO配置
const { t, locale } = useI18n()

// 动态SEO配置 - 根据语言切换
useSeoMeta({
  title: t('seo.pages.widgets.title'),
  description: t('seo.pages.widgets.description'),
  keywords: t('seo.pages.widgets.keywords'),
  ogTitle: t('seo.pages.widgets.title'),
  ogDescription: t('seo.pages.widgets.description'),
  ogImage: '/og-widgets.jpg',
  ogUrl: () => locale.value === 'zh' ? 'https://kaimafind.com/zh/widgets' : 'https://kaimafind.com/widgets',
  ogLocale: () => locale.value === 'zh' ? 'zh_CN' : 'en_US',
  twitterCard: 'summary_large_image',
  twitterTitle: t('seo.pages.widgets.title'),
  twitterDescription: t('seo.pages.widgets.description'),
  twitterImage: '/og-widgets.jpg'
})
</script>

<style scoped>
.widgets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* 确保小组件有固定的最小高度 */
.widgets-grid > * {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .widgets-grid {
    grid-template-columns: 1fr;
    padding: 16px;
  }
}
</style>