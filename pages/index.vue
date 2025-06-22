<template>
  <BoxContainer class="mt-[-70px]">
    <BoxDescribe />
  </BoxContainer>
</template>

<script setup>
// 国际化SEO配置
const { t, locale } = useI18n()

// 动态SEO配置 - 根据语言切换
useSeoMeta({
  title: t('seo.pages.home.title'),
  description: t('seo.pages.home.description'),
  keywords: t('seo.pages.home.keywords'),
  ogTitle: t('seo.pages.home.title'),
  ogDescription: t('seo.pages.home.description'),
  ogImage: '/og-image.jpg',
  ogUrl: () => locale.value === 'zh' ? 'https://kaimafind.com/zh' : 'https://kaimafind.com',
  ogLocale: () => locale.value === 'zh' ? 'zh_CN' : 'en_US',
  twitterCard: 'summary_large_image',
  twitterTitle: t('seo.pages.home.title'),
  twitterDescription: t('seo.pages.home.description'),
  twitterImage: '/og-image.jpg'
})

// 结构化数据 - 暂时注释，等待安装schema.org模块
// useSchemaOrg([
//   {
//     '@type': 'WebSite',
//     name: 'KaimaFind',
//     url: 'https://kaimafind.com',
//     description: 'Free online tools and investment guide platform',
//     potentialAction: {
//       '@type': 'SearchAction',
//       target: 'https://kaimafind.com/usefultool?search={search_term_string}',
//       'query-input': 'required name=search_term_string'
//     }
//   },
//   {
//     '@type': 'Organization',
//     name: 'KaimaFind',
//     url: 'https://kaimafind.com',
//     logo: 'https://kaimafind.com/logo.png',
//     sameAs: []
//   }
// ])
</script>