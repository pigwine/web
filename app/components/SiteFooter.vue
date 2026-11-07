<script setup lang="ts">defineProps<{locale:'zh'|'en';demo?:boolean}>()</script>
<template><footer class="site-footer"><span>KAIMAFIND © {{new Date().getFullYear()}}</span><span v-if="demo">{{locale==='zh'?'视觉样稿 · 图片为示例素材，非本人作品':'Visual study · Sample imagery, not original work'}}</span><NuxtLink to="/admin">{{locale==='zh'?'内容后台':'Studio'}}</NuxtLink></footer></template>
