<script setup lang="ts">
const props=defineProps<{locale:'zh'|'en';active?:string}>()
const route=useRoute()
const alternate=computed(()=>route.fullPath.replace(/^\/(zh|en)/,props.locale==='zh'?'/en':'/zh'))
</script>
<template>
  <a class="skip-link" href="#main">{{ locale==='zh'?'跳到内容':'Skip to content' }}</a>
  <header class="site-header">
    <NuxtLink :to="'/'+locale" class="wordmark" aria-label="KaimaFind home">K<span class="wordmark-dot">.</span></NuxtLink>
    <nav class="main-nav" :aria-label="locale==='zh'?'主导航':'Main navigation'">
      <NuxtLink :to="'/'+locale" :class="{active:active==='work'}">{{ locale==='zh'?'作品导览':'Selected work' }}</NuxtLink>
      <NuxtLink :to="'/'+locale+'/map'" :class="{active:active==='map'}">{{ locale==='zh'?'人生地图':'Life map' }}</NuxtLink>
      <NuxtLink :to="'/'+locale+'/about'" :class="{active:active==='about'}">{{ locale==='zh'?'关于':'About' }}</NuxtLink>
    </nav>
    <NuxtLink :to="alternate" class="language-switch" :aria-label="locale==='zh'?'Switch to English':'切换中文'">{{locale==='zh'?'EN':'中文'}}</NuxtLink>
  </header>
</template>
