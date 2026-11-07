<script setup lang="ts">
const { locale, base, data, error, items, t } = usePortfolio()
const route = useRoute()
const focus = computed(() => String(route.query.focus || ''))
definePageMeta({ validate: route => ['zh', 'en'].includes(String(route.params.locale)) })
useSeoMeta({ title: () => t('项目全览 — KaimaFind', 'Project canvas — KaimaFind'), description: () => t('沿时间展开的项目、进程与作品。', 'Projects, progress and work across time.') })
useHead(() => ({ htmlAttrs: { lang: locale.value }, link: [{ rel: 'canonical', href: `https://kaimafind.com${base.value}` }] }))
</script>

<template>
  <div class="home-canvas-page">
    <SiteHeader :locale="locale" active="map" />
    <main id="main" class="home-canvas-main">
      <h1 class="sr-only">{{ t('项目全览', 'Project canvas') }}</h1>
      <div v-if="error" class="empty-state" role="alert">{{ t('内容暂时无法加载，请稍后刷新。', 'Content is temporarily unavailable. Please refresh.') }}</div>
      <section v-else class="home-flow-section" :aria-label="t('项目主线流程图', 'Project timeline diagram')">
        <ClientOnly><LifeCanvas :items="items" :branches="data?.branches || []" :locale="locale" :focus="focus" show-branches /></ClientOnly>
      </section>
    </main>
    <SiteFooter :locale="locale" :demo="data?.demo" />
  </div>
</template>
