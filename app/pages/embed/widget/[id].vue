<script setup>
import Clock from '../../../components/legacy/Clock.vue'
const route=useRoute();useSeoMeta({robots:'noindex, nofollow',title:'KaimaFind Widget'})
</script>
<template><main class="widget-embed"><Clock v-if="route.params.id==='clock'"/><div v-else class="empty-state"><h1>天气组件暂未启用</h1><p>天气服务正在迁移，时钟组件可以继续使用。</p><NuxtLink to="/embed/widget/clock">打开时钟</NuxtLink></div></main></template>
<style scoped>.widget-embed{min-height:100vh;display:grid;place-items:center}</style>
