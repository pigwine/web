<script setup lang="ts">
import { demoItems } from '~/shared/demo'

const { locale, base, data, error, items, branches, t } = usePortfolio()
definePageMeta({ validate: route => ['zh', 'en'].includes(String(route.params.locale)) })
const publishedGallery = computed(() => items.value.filter(item => item.kind === 'work' || item.featured))
const showingStudy = computed(() => import.meta.dev && !publishedGallery.value.length && !error.value)
const gallery = computed(() => showingStudy.value ? demoItems(locale.value) : publishedGallery.value)
const selectedIndex = ref<number | null>(null)
const selectedItem = computed(() => selectedIndex.value === null ? null : gallery.value[selectedIndex.value])
function closeViewer() { selectedIndex.value = null }
function moveViewer(direction: number) {
  if (selectedIndex.value === null || !gallery.value.length) return
  selectedIndex.value = (selectedIndex.value + direction + gallery.value.length) % gallery.value.length
}
function onKeydown(event: KeyboardEvent) {
  if (selectedIndex.value === null) return
  if (event.key === 'Escape') closeViewer()
  if (event.key === 'ArrowLeft') moveViewer(-1)
  if (event.key === 'ArrowRight') moveViewer(1)
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
watch(selectedIndex, value => { document.body.style.overflow = value === null ? '' : 'hidden' })
onUnmounted(() => { document.body.style.overflow = '' })
useSeoMeta({ title: () => t('作品导览 — KaimaFind', 'Selected work — KaimaFind'), description: () => t('项目与作品的影像导览。', 'A visual index of projects and work.') })
useHead(() => ({ htmlAttrs: { lang: locale.value }, link: [{ rel: 'canonical', href: `https://kaimafind.com${base.value}/work` }] }))
</script>

<template>
  <div class="portfolio-page">
    <SiteHeader :locale="locale" active="work" />
    <main id="main" class="gallery-main">
      <header class="gallery-heading">
        <h1>{{ t('作品导览', 'Selected work') }}</h1>
        <span v-if="showingStudy" class="gallery-study-note">{{ t('视觉样稿 · 示例图片', 'Visual study · sample images') }}</span>
        <span class="gallery-count">{{ String(gallery.length).padStart(2, '0') }}</span>
      </header>
      <div v-if="error" class="empty-state" role="alert">{{ t('内容暂时无法加载，请稍后刷新。', 'Content is temporarily unavailable. Please refresh.') }}</div>
      <section v-else-if="gallery.length" class="gallery-wall" :aria-label="t('作品', 'Work')">
        <button v-for="(item, index) in gallery" :key="item.id" type="button" class="gallery-entry" :style="{ '--gallery-order': Math.min(index, 6) }" :aria-label="t(`放大查看：${item.translation.title}`, `View image: ${item.translation.title}`)" @click="selectedIndex = index">
          <figure>
            <div class="gallery-image" :class="{ 'gallery-image--type': !item.cover }">
              <img v-if="item.cover" :src="item.cover" :alt="item.translation.title" :loading="index < 2 ? 'eager' : 'lazy'" :fetchpriority="index === 0 ? 'high' : 'auto'">
              <span v-else>{{ item.translation.title }}</span>
              <span class="gallery-open" aria-hidden="true">＋</span>
            </div>
            <figcaption><span class="gallery-title">{{ item.translation.title }}</span><span class="gallery-meta">{{ branches.find(branch => branch.id === item.branchId)?.name[locale] }}<span aria-hidden="true"> / </span>{{ item.date.slice(0, 4) }}</span></figcaption>
          </figure>
        </button>
      </section>
      <p v-else class="gallery-empty">{{ t('尚无公开作品。', 'No published work yet.') }}</p>
    </main>
    <SiteFooter :locale="locale" :demo="data?.demo || showingStudy" />
    <div v-if="selectedItem" class="gallery-viewer" role="dialog" aria-modal="true" :aria-label="selectedItem.translation.title" @click.self="closeViewer">
      <div class="gallery-viewer-bar">
        <span>{{ String((selectedIndex ?? 0) + 1).padStart(2, '0') }} / {{ String(gallery.length).padStart(2, '0') }}</span>
        <button type="button" :aria-label="t('关闭', 'Close')" @click="closeViewer">×</button>
      </div>
      <div class="gallery-viewer-stage">
        <button type="button" class="gallery-viewer-nav" :aria-label="t('上一张', 'Previous image')" @click="moveViewer(-1)">←</button>
        <img v-if="selectedItem.cover" :src="selectedItem.cover" :alt="selectedItem.translation.title">
        <div v-else class="gallery-viewer-type">{{ selectedItem.translation.title }}</div>
        <button type="button" class="gallery-viewer-nav" :aria-label="t('下一张', 'Next image')" @click="moveViewer(1)">→</button>
      </div>
      <div class="gallery-viewer-foot">
        <span>{{ selectedItem.translation.title }}</span>
        <NuxtLink :to="`${base}/projects/${selectedItem.id}`" @click="closeViewer">{{ t('项目详情 ↗', 'View project ↗') }}</NuxtLink>
      </div>
    </div>
  </div>
</template>
