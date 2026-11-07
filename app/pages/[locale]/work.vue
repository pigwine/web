<script setup lang="ts">
import { demoItems } from '~/shared/demo'
import type { Branch, PublicItem } from '~/shared/content'

const { locale, base, data, error, items, branches, t } = usePortfolio()
definePageMeta({ validate: route => ['zh', 'en'].includes(String(route.params.locale)) })
const publishedGallery = computed(() => items.value.filter(item => item.kind === 'work' || item.featured))
const showingStudy = computed(() => import.meta.dev && !publishedGallery.value.length && !error.value)
const gallery = computed(() => {
  if (!showingStudy.value) return publishedGallery.value
  const samples = demoItems(locale.value)
  const secondFrames = [
    ['career', 'city', '城市片段', 'City study'],
    ['finance', 'architecture', '空间片段', 'Space study'],
    ['media', 'flowers', '色彩片段', 'Colour study'],
    ['health', 'motion', '运动片段', 'Motion study'],
    ['learning', 'mountain', '风景片段', 'Landscape study']
  ]
  const studyFrames = [
    ...secondFrames.map(([branchId, image, zh, en]) => ({ branchId: branchId!, image: image!, zh: zh!, en: en! })),
    ...['career', 'finance', 'media', 'health', 'learning'].flatMap((branchId, index) => [
      { branchId, image: ['portrait', 'flowers', 'city', 'architecture', 'motion'][index]!, zh: '影像片段 02', en: 'Image study 02' },
      { branchId, image: ['mountain', 'motion', 'architecture', 'portrait', 'city'][index]!, zh: '影像片段 03', en: 'Image study 03' }
    ])
  ]
  return [...samples, ...studyFrames.map((frame, index) => ({
    ...samples[index % samples.length]!, id: `gallery-study-${frame.branchId}-${index}`, branchId: frame.branchId,
    cover: `/preview/${frame.image}.jpg`, order: samples.length + index,
    translation: { ...samples[index % samples.length]!.translation, title: locale.value === 'zh' ? frame.zh : frame.en }
  }))]
})
const galleryGroups = computed(() => {
  const branchMap = new Map(branches.value.map(branch => [branch.id, branch]))
  const rootId = (branchId: string) => {
    let branch = branchMap.get(branchId)
    const visited = new Set<string>()
    while (branch?.parentId && !visited.has(branch.id)) {
      visited.add(branch.id)
      branch = branchMap.get(branch.parentId)
    }
    return branch?.id ?? branchId
  }
  const roots = branches.value.filter(branch => !branch.parentId).sort((a, b) => a.order - b.order)
  return roots.map(branch => ({
    branch,
    entries: gallery.value.filter(item => rootId(item.branchId) === branch.id)
  })).filter(group => group.entries.length)
})
function branchLabel(item: PublicItem, root: Branch) {
  const branch = branches.value.find(entry => entry.id === item.branchId)
  return branch && branch.id !== root.id ? branch.name[locale.value] : item.kind === 'work' ? t('作品', 'Work') : t('项目', 'Project')
}
function scrollTrack(id: string, direction: number) {
  const track = document.getElementById(`gallery-track-${id}`)
  track?.scrollBy({ left: direction * Math.max(track.clientWidth * .76, 300), behavior: 'smooth' })
}
function onTrackWheel(event: WheelEvent) {
  const track = event.currentTarget as HTMLElement
  const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
  if (!delta || track.scrollWidth <= track.clientWidth + 2) return
  const end = track.scrollWidth - track.clientWidth
  if ((delta < 0 && track.scrollLeft <= 1) || (delta > 0 && track.scrollLeft >= end - 1)) return
  event.preventDefault()
  track.scrollLeft += delta
}
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
      <div v-else-if="gallery.length" class="gallery-presentation">
        <div class="gallery-sections">
        <section v-for="(group, groupIndex) in galleryGroups" :key="group.branch.id" class="gallery-group" :aria-label="group.branch.name[locale]">
          <div class="gallery-group-heading">
            <div><span class="gallery-group-index">{{ String(groupIndex + 1).padStart(2, '0') }}</span><h2>{{ group.branch.name[locale] }}</h2><span class="gallery-group-count">{{ group.entries.length }}</span></div>
            <div v-if="group.entries.length > 1" class="gallery-group-controls">
              <button type="button" :aria-label="t(`${group.branch.name[locale]}上一组`, `Scroll ${group.branch.name[locale]} back`)" @click="scrollTrack(group.branch.id, -1)">←</button>
              <button type="button" :aria-label="t(`${group.branch.name[locale]}下一组`, `Scroll ${group.branch.name[locale]} forward`)" @click="scrollTrack(group.branch.id, 1)">→</button>
            </div>
          </div>
          <div :id="`gallery-track-${group.branch.id}`" class="gallery-track" tabindex="0" :aria-label="t(`${group.branch.name[locale]}横向作品`, `${group.branch.name[locale]} horizontal gallery`)" @wheel="onTrackWheel">
            <button v-for="item in group.entries" :key="item.id" type="button" class="gallery-entry" :aria-label="t(`放大查看：${item.translation.title}`, `View image: ${item.translation.title}`)" @click="selectedIndex = gallery.findIndex(entry => entry.id === item.id)">
              <figure>
                <div class="gallery-image" :class="{ 'gallery-image--type': !item.cover }">
                  <img v-if="item.cover" :src="item.cover" :alt="item.translation.title" loading="lazy">
                  <span v-else>{{ item.translation.title }}</span>
                  <span class="gallery-open" aria-hidden="true">＋</span>
                </div>
                <figcaption><span class="gallery-title">{{ item.translation.title }}</span><span class="gallery-meta">{{ branchLabel(item, group.branch) }}<span aria-hidden="true"> / </span>{{ item.date.slice(0, 4) }}</span></figcaption>
              </figure>
            </button>
          </div>
        </section>
        </div>
      </div>
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
        <NuxtLink v-if="!selectedItem.sample" :to="`${base}/projects/${selectedItem.id}`" @click="closeViewer">{{ t('项目详情 ↗', 'View project ↗') }}</NuxtLink>
      </div>
    </div>
  </div>
</template>
