<template>
  <div>
    <h1 class="text-4xl font-bold mb-8 text-gray-800 text-center">Free Online Tools Collection</h1>
    <p class="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
      Discover 50+ carefully curated free online tools to boost your productivity.
      From PDF processing and icon downloads to AI-powered tools and design resources.
    </p>
    <ToolList />
  </div>
</template>

<script setup>
import ToolList from '~/components/tools/ToolList.vue'

// 国际化SEO配置
const { t, locale } = useI18n()

// 动态SEO配置 - 根据语言切换
useSeoMeta({
  title: t('seo.pages.tools.title'),
  description: t('seo.pages.tools.description'),
  keywords: t('seo.pages.tools.keywords'),
  ogTitle: t('seo.pages.tools.title'),
  ogDescription: t('seo.pages.tools.description'),
  ogImage: '/og-tools.jpg',
  ogUrl: () => locale.value === 'zh' ? 'https://kaimafind.com/zh/usefultool' : 'https://kaimafind.com/usefultool',
  ogLocale: () => locale.value === 'zh' ? 'zh_CN' : 'en_US',
  twitterCard: 'summary_large_image',
  twitterTitle: t('seo.pages.tools.title'),
  twitterDescription: t('seo.pages.tools.description'),
  twitterImage: '/og-tools.jpg'
})

// 结构化数据 - 需要安装 @nuxtjs/seo 模块
// useSchemaOrg([
//   {
//     '@type': 'CollectionPage',
//     name: 'Free Online Tools Collection',
//     description: 'Curated collection of 50+ free online tools for productivity, design, and development',
//     url: 'https://kaimafind.com/usefultool',
//     mainEntity: {
//       '@type': 'ItemList',
//       name: 'Online Tools',
//       description: 'Free online tools for various purposes',
//       numberOfItems: 50
//     }
//   },
//   {
//     '@type': 'WebApplication',
//     name: 'KaimaFind Tools',
//     applicationCategory: 'UtilityApplication',
//     operatingSystem: 'Web Browser',
//     offers: {
//       '@type': 'Offer',
//       price: '0',
//       priceCurrency: 'USD'
//     }
//   }
// ])
</script>