<script setup lang="ts">
const {locale,base,data,error,items,branches,t}=usePortfolio();const route=useRoute()
const item=computed(()=>items.value.find(p=>p.id===route.params.id))
const progress=computed(()=>items.value.filter(p=>p.projectId===item.value?.id).sort((a,b)=>b.date.localeCompare(a.date)))
useSeoMeta({title:()=>item.value?`${item.value.translation.title} — KaimaFind`:t('内容暂未发布 — KaimaFind','Not published — KaimaFind'),description:()=>item.value?.translation.summary,robots:()=>data.value?.demo||!item.value?'noindex, nofollow':'index, follow'})
useHead(()=>({htmlAttrs:{lang:locale.value},link:[{rel:'canonical',href:`https://kaimafind.com${base.value}/projects/${route.params.id}`}]}))
</script>
<template><div><SiteHeader :locale="locale" active="work" /><main id="main" class="project-page">
 <NuxtLink :to="base" class="back-link">← {{t('返回项目全览','Back to project canvas')}}</NuxtLink>
 <template v-if="item">
  <div class="project-heading"><p class="project-meta">{{branches.find(b=>b.id===item!.branchId)?.name[locale]}} <span>{{item.date}}</span></p><h1>{{item.translation.title}}</h1><p class="project-summary">{{item.translation.summary}}</p></div>
  <figure v-if="item.cover" class="project-cover"><img :src="item.cover" :alt="item.translation.title"><figcaption v-if="item.sample">{{t('视觉样稿 · 示例素材，非本人作品','Visual study · Sample imagery, not original work')}}</figcaption></figure>
  <div class="reading-column"><BodyNode :node="item.translation.body" /><section v-if="item.media.length" class="attachment-list"><h2>{{t('作品与附件','Works & attachments')}}</h2><a v-for="media in item.media" :key="media" :href="media" target="_blank" rel="noopener">{{t('打开附件','Open attachment')}} ↗</a></section></div>
  <section v-if="progress.length" class="project-progress"><h2>{{t('沿途的记录','Along the way')}}</h2><NuxtLink v-for="p in progress" :key="p.id" :to="`${base}/projects/${p.id}`"><time>{{p.date}}</time><span>{{p.translation.title}}</span><span>↗</span></NuxtLink></section>
  <NuxtLink :to="`${base}?focus=${item.projectId || item.id}`" class="map-link">{{t('在项目画布中查看','Locate on the project canvas')}} ↗</NuxtLink>
 </template>
 <div v-else class="empty-state"><h1>{{t('这篇内容尚未以中文发布','This content is not published in English.')}}</h1><p v-if="error">{{t('暂时无法读取内容，请稍后重试。','Please try again later.')}}</p><NuxtLink :to="`/${locale==='zh'?'en':'zh'}/projects/${route.params.id}`">{{t('查看英文版本','Try the Chinese version')}}</NuxtLink></div>
 </main><SiteFooter :locale="locale" :demo="data?.demo" /></div></template>
