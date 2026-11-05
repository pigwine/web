<script setup lang="ts">
const {locale,base,data,items,branches,t}=usePortfolio();const route=useRoute()
const branch=ref('all');const search=ref('');const view=ref('canvas')
const filtered=computed(()=>items.value.filter(p=>(branch.value==='all'||p.branchId===branch.value||p.relatedBranches.includes(branch.value))&&(!search.value||`${p.translation.title} ${p.translation.summary} ${p.date}`.toLowerCase().includes(search.value.toLowerCase()))))
onMounted(()=>{if(matchMedia('(max-width: 700px)').matches)view.value='list'})
useSeoMeta({title:()=>t('人生地图 — KaimaFind','Life map — KaimaFind')})
</script>
<template><div><SiteHeader :locale="locale" active="map"/><main id="main" class="map-page"><div class="map-top"><div><p>{{t('在时间里，各自生长。','Different paths. One unfolding life.')}}</p><h1>{{t('人生地图','Life map')}}</h1></div><div class="map-tools"><label><span class="sr-only">{{t('搜索项目或年份','Search projects or years')}}</span><input v-model="search" :placeholder="t('搜索项目、年份…','Find a project, a year…')"></label><button @click="view=view==='canvas'?'list':'canvas'">{{view==='canvas'?t('列表视图','List view'):t('画布视图','Canvas view')}}</button></div></div>
 <nav class="branch-filter"><button :class="{selected:branch==='all'}" @click="branch='all'">{{t('全部','All')}}</button><button v-for="b in branches" :key="b.id" :class="{selected:branch===b.id}" @click="branch=b.id">{{b.name[locale]||b.name.zh}}</button></nav>
 <ClientOnly v-if="view==='canvas'&&filtered.length"><LifeCanvas :items="filtered" :branches="branches" :locale="locale" :focus="String(route.query.focus||'')"/><template #fallback><p>{{t('正在展开地图…','Opening the map…')}}</p></template></ClientOnly>
 <div v-if="view==='list'" class="timeline-list"><NuxtLink v-for="item in [...filtered].sort((a,b)=>b.date.localeCompare(a.date))" :key="item.id" :to="`${base}/projects/${item.id}`"><time>{{item.date}}</time><img v-if="item.cover" :src="item.cover" alt="" loading="lazy"><div><h2>{{item.translation.title}}</h2><p>{{item.translation.summary}}</p></div><span>↗</span></NuxtLink></div>
 <p v-if="!filtered.length" class="empty-state">{{t('这个方向还没有公开记录。','No published entries in this direction yet.')}}</p>
 <p v-if="filtered.length>150">{{t('画布显示前 150 项，请筛选主线或使用列表浏览全部。','The canvas shows 150 entries. Filter or use the list to browse all.')}}</p>
 </main><SiteFooter :locale="locale" :demo="data?.demo"/></div></template>
