<script setup lang="ts">
const {locale,base,data,error,items,branches,t}=usePortfolio()
definePageMeta({validate:r=>['zh','en'].includes(String(r.params.locale))})
const selection=ref('selected');const view=ref('editorial')
const filtered=computed(()=>items.value.filter(p=>selection.value==='all'||p.featured))
useSeoMeta({title:()=>t('作品导览 — KaimaFind','Selected work — KaimaFind'),description:()=>t('按影像浏览项目与作品。','Browse projects and work through images.')})
useHead(()=>({htmlAttrs:{lang:locale.value},link:[{rel:'canonical',href:`https://kaimafind.com${base.value}/work`}]}))
</script>
<template>
 <div class="portfolio-page">
  <SiteHeader :locale="locale" active="work" />
  <main id="main">
   <section class="cover-intro"><div class="intro-note"><span>{{t('一个人的多种可能','Many ways to be.')}}</span><span>{{t('作品、探索，与生活。','Work, curiosity, and everything between.')}}</span></div><p class="issue-note">{{t('持续更新的个人档案','An ongoing personal archive')}}</p></section>
   <h1 class="masthead" aria-label="KaimaFind">KAIMAFIND</h1>
   <section class="portfolio-toolbar" aria-label="Portfolio filters">
    <div class="selection-tabs"><button :class="{selected:selection==='selected'}" @click="selection='selected'">{{t('精选','Selected')}} <sup>{{items.filter(p=>p.featured).length.toString().padStart(2,'0')}}</sup></button><button :class="{selected:selection==='all'}" @click="selection='all'">{{t('全部档案','All work')}}</button></div>
    <div class="view-switch"><button :aria-pressed="view==='editorial'" @click="view='editorial'" :aria-label="t('错落展示','Editorial view')">◫</button><button :aria-pressed="view==='grid'" @click="view='grid'" :aria-label="t('网格展示','Grid view')">▦</button></div>
   </section>
   <div v-if="error" class="empty-state" role="alert">{{t('内容暂时无法加载，请稍后刷新。','Content is temporarily unavailable. Please refresh.')}}</div>
   <section v-else class="editorial-gallery" :class="{'grid-gallery':view==='grid'}" :aria-label="t('作品','Selected work')">
    <NuxtLink v-for="(item,index) in filtered" :key="item.id" :to="`${base}/projects/${item.id}`" class="work-piece" :class="`piece-${index%6}`">
     <figure><div class="image-frame" :class="{'type-cover':!item.cover}"><img v-if="item.cover" :src="item.cover" :alt="item.translation.title" :loading="index<2?'eager':'lazy'" :fetchpriority="index===0?'high':'auto'" :width="800" :height="1000"><span v-else>{{item.translation.title}}</span><span class="image-open" aria-hidden="true">↗</span></div>
      <figcaption><div><span class="work-title">{{item.translation.title}}</span><span class="work-category">{{branches.find(b=>b.id===item.branchId)?.name[locale]}}</span></div><span class="work-year">{{item.date.slice(0,4)}}</span></figcaption>
     </figure>
    </NuxtLink>
   </section>
   <div v-if="!error&&!filtered.length" class="empty-state">{{t('这一页，留给下一次探索。','Room for the next exploration.')}}</div>
   <section class="closing-note"><span>{{t('不止一种身份，不止一条路径。','Not one thing. Not one direction.')}}</span><NuxtLink :to="base">{{t('返回项目全览','Explore the project canvas')}} ↗</NuxtLink></section>
  </main><SiteFooter :locale="locale" :demo="data?.demo" />
 </div>
</template>
