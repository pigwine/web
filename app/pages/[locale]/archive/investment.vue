<script setup>
import Offshore from '../../../../components/investment/offshoreaccount.vue'
import Web3 from '../../../../components/investment/web3.vue'
const {locale,t}=usePortfolio();useSeoMeta({title:'历史投资资料 — KaimaFind',robots:'noindex, follow'})
</script>
<template><div><SiteHeader :locale="locale"/><main id="main" class="project-page legacy-article"><div class="project-heading"><h1>{{t('历史投资资料','Archived finance notes')}}</h1><p class="project-summary">{{t('旧站资料存档，尚未重新核实其中的时效性信息。','An archive from the previous site. Time-sensitive information has not been reverified.')}}</p></div><Offshore/><Web3/></main><SiteFooter :locale="locale"/></div></template>
<style scoped>.legacy-article{max-width:900px;margin:60px auto;padding:0 24px}.legacy-article :deep(h2){font-size:26px;margin:35px 0 20px}.legacy-article :deep(h3){font-size:20px;margin:25px 0 15px}.legacy-article :deep(p),.legacy-article :deep(li){line-height:1.8;margin-bottom:12px}.legacy-article :deep(img){max-height:180px;object-fit:contain}.legacy-article :deep(a){text-decoration:underline}.legacy-article :deep(button){border:1px solid #aaa;margin:10px 0}.legacy-article :deep(svg){width:24px;height:24px}.legacy-article :deep(.fixed){position:fixed;inset:10%;background:#f3f3f0;overflow:auto;padding:30px;z-index:10}</style>
