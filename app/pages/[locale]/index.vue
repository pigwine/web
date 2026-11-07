<script setup lang="ts">
const { locale, base, data, error, items, t } = usePortfolio()
const route = useRoute()
definePageMeta({ validate: route => ['zh', 'en'].includes(String(route.params.locale)) })
useSeoMeta({ title: () => t('项目全览 — KaimaFind', 'Project canvas — KaimaFind'), description: () => t('沿时间展开的项目、进程与作品。', 'Projects, progress and work across time.') })
useHead(() => ({ htmlAttrs: { lang: locale.value }, link: [{ rel: 'canonical', href: `https://kaimafind.com${base.value}` }] }))
onMounted(() => {
  const focus = String(route.query.focus || '')
  if (focus) nextTick(() => document.getElementById(`project-${focus}`)?.scrollIntoView())
})
</script>

<template>
  <div class="home-canvas-page">
    <SiteHeader :locale="locale" active="map" />
    <main id="main">
      <section class="canvas-intro"><div><p>{{ t('一个人的项目档案', 'An archive of projects') }}</p><h1>{{ t('在时间里，持续展开。', 'A life in progress.') }}</h1></div><NuxtLink :to="`${base}/work`">{{ t('浏览作品导览', 'Browse selected work') }} <span aria-hidden="true">↗</span></NuxtLink></section>
      <div class="canvas-index"><span>{{ t('项目主线画布', 'Project timeline canvas') }}</span><span>{{ items.length }} {{ t('项公开记录', 'published entries') }}</span></div>
      <div v-if="error" class="empty-state" role="alert">{{ t('内容暂时无法加载，请稍后刷新。', 'Content is temporarily unavailable. Please refresh.') }}</div>
      <template v-else>
        <section class="home-flow-section" :aria-label="t('项目主线流程图', 'Project timeline diagram')">
          <ClientOnly><LifeCanvas v-if="items.length" :items="items" :branches="data?.branches || []" :locale="locale" /></ClientOnly>
          <div v-if="!items.length" class="home-flow-empty"><span class="home-flow-line" aria-hidden="true"><i /><i /><i /></span><div><h2>{{ t('主线从第一个项目开始。', 'The timeline begins with a project.') }}</h2><p>{{ t('发布项目后，它会出现在这张画布上；进展和作品会连接到所属项目。', 'Publish a project to place it on this canvas. Its progress and work will connect to it.') }}</p></div></div>
        </section>
        <div class="canvas-index canvas-list-index"><span>{{ t('项目汇总', 'Project index') }}</span><span>{{ t('按时间阅读', 'Read chronologically') }}</span></div>
        <ProjectCanvas :items="items" :branches="data?.branches || []" :locale="locale" />
      </template>
    </main>
    <SiteFooter :locale="locale" :demo="data?.demo" />
  </div>
</template>
