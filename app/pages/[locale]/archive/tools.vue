<script setup lang="ts">
import tools from '~/data/legacy-tools.json'
const {locale,t}=usePortfolio();const search=ref('');const filtered=computed(()=>tools.filter(x=>(x.title+x.description).toLowerCase().includes(search.value.toLowerCase())));useSeoMeta({title:'历史工具收藏 — KaimaFind'})
</script>
<template><div><SiteHeader :locale="locale"/><main id="main" class="project-page"><div class="project-heading"><h1>{{t('历史工具收藏','Collected tools')}}</h1><p class="project-summary">{{t('从旧站保留的资源目录，非个人原创作品。','Resources preserved from the previous site, not original portfolio works.')}}</p></div><label>{{t('查找工具','Find a tool')}}<input v-model="search"></label><div class="timeline-list"><a v-for="tool in filtered" :key="tool.id" :href="tool.url" target="_blank" rel="noopener noreferrer"><div><h2>{{tool.title}}</h2><p>{{tool.description}}</p></div><span>↗</span></a></div></main><SiteFooter :locale="locale"/></div></template>
