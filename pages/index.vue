<template>
  <BoxContainer class="mt-[-70px]">
    <BoxDescribe />
  </BoxContainer>
</template>

<script setup>
// SEO配置 - 首页英文优化
useSeoMeta({
  title: 'KaimaFind - Free Online Tools & Investment Guide Platform',
  description: 'Discover the best free online tools and professional investment guides. Access PDF tools, icon resources, AI tools, offshore banking guides, Web3 investment strategies and productivity tools.',
  keywords: 'online tools, free tools, PDF tools, investment guide, offshore banking, Web3 investment, crypto investment, AI tools, icon download, productivity tools, financial tools',
  ogTitle: 'KaimaFind - Free Online Tools & Investment Guide Platform',
  ogDescription: 'Discover the best free online tools and professional investment guides. Access PDF tools, icon resources, AI tools, offshore banking guides, Web3 investment strategies and productivity tools.',
  ogImage: '/og-image.jpg',
  ogUrl: 'https://kaimafind.com',
  twitterCard: 'summary_large_image',
  twitterTitle: 'KaimaFind - Free Online Tools & Investment Guide Platform',
  twitterDescription: 'Discover the best free online tools and professional investment guides. Access PDF tools, icon resources, AI tools, offshore banking guides, Web3 investment strategies and productivity tools.',
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