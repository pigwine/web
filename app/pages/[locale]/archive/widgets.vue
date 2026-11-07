<script setup lang="ts">const {locale,t}=usePortfolio()</script>
<template><div><SiteHeader :locale="locale"/><main id="main" class="about-page"><h1>{{t('小组件','Widgets')}}</h1><p class="about-copy"><NuxtLink to="/embed/widget/clock">{{t('时钟与番茄计时器','Clock & focus timer')}} ↗</NuxtLink></p></main><SiteFooter :locale="locale"/></div></template>
