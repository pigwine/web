<script setup lang="ts">
const { locale, base, data, error, items, branches, t } = usePortfolio()
definePageMeta({ validate: route => ['zh', 'en'].includes(String(route.params.locale)) })
const gallery = computed(() => items.value.filter(item => item.kind === 'work' || item.featured))
useSeoMeta({ title: () => t('作品导览 — KaimaFind', 'Selected work — KaimaFind'), description: () => t('项目与作品的影像导览。', 'A visual index of projects and work.') })
useHead(() => ({ htmlAttrs: { lang: locale.value }, link: [{ rel: 'canonical', href: `https://kaimafind.com${base.value}/work` }] }))
</script>

<template>
  <div class="portfolio-page">
    <SiteHeader :locale="locale" active="work" />
    <main id="main" class="gallery-main">
      <header class="gallery-heading"><h1>{{ t('作品导览', 'Selected work') }}</h1><span>{{ String(gallery.length).padStart(2, '0') }}</span></header>
      <div v-if="error" class="empty-state" role="alert">{{ t('内容暂时无法加载，请稍后刷新。', 'Content is temporarily unavailable. Please refresh.') }}</div>
      <section v-else-if="gallery.length" class="gallery-wall" :aria-label="t('作品', 'Work')">
        <NuxtLink v-for="(item, index) in gallery" :key="item.id" :to="`${base}/projects/${item.id}`" class="gallery-entry" :style="{ '--gallery-order': Math.min(index, 6) }">
          <figure>
            <div class="gallery-image" :class="{ 'gallery-image--type': !item.cover }">
              <img v-if="item.cover" :src="item.cover" :alt="item.translation.title" :loading="index < 2 ? 'eager' : 'lazy'" :fetchpriority="index === 0 ? 'high' : 'auto'">
              <span v-else>{{ item.translation.title }}</span>
              <span class="gallery-open" aria-hidden="true">↗</span>
            </div>
            <figcaption><span class="gallery-title">{{ item.translation.title }}</span><span class="gallery-meta">{{ branches.find(branch => branch.id === item.branchId)?.name[locale] }}<span aria-hidden="true"> / </span>{{ item.date.slice(0, 4) }}</span></figcaption>
          </figure>
        </NuxtLink>
      </section>
      <p v-else class="gallery-empty">{{ t('尚无公开作品。', 'No published work yet.') }}</p>
    </main>
    <SiteFooter :locale="locale" :demo="data?.demo" />
  </div>
</template>
