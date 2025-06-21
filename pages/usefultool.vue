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

// SEO配置 - 工具页面英文优化
useSeoMeta({
  title: 'Free Online Tools Collection - PDF, AI, Design & Productivity Tools',
  description: 'Access 50+ free online tools for PDF processing, icon downloads, AI assistance, design resources, and productivity enhancement. No registration required.',
  keywords: 'free online tools, PDF tools, AI tools, design tools, productivity tools, icon download, online converter, web tools, utility tools, developer tools',
  ogTitle: 'Free Online Tools Collection - PDF, AI, Design & Productivity Tools',
  ogDescription: 'Access 50+ free online tools for PDF processing, icon downloads, AI assistance, design resources, and productivity enhancement. No registration required.',
  ogImage: '/og-tools.jpg',
  ogUrl: 'https://kaimafind.com/usefultool',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Free Online Tools Collection - PDF, AI, Design & Productivity Tools',
  twitterDescription: 'Access 50+ free online tools for PDF processing, icon downloads, AI assistance, design resources, and productivity enhancement.',
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