<script setup lang="ts">
import zh from '~/data/legacy-zh.json'
import en from '~/data/legacy-en.json'
const {locale,t}=usePortfolio();useSeoMeta({title:'Terms — KaimaFind',robots:'noindex, follow'})
</script>
<template><div><SiteHeader :locale="locale"/><main id="main" class="project-page"><div class="project-heading"><h1>{{t('使用条款存档','Archived terms')}}</h1><p>{{t('旧站文档，正式切换前将按新站实际功能更新。','Previous-site document, to be updated before production cutover.')}}</p></div><div class="reading-column"><LegacyText :value="locale==='zh'?zh.terms:en.terms"/></div></main><SiteFooter :locale="locale"/></div></template>
