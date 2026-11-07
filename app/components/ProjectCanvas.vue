<script setup lang="ts">
import type { Branch, Locale, PublicItem } from '~/shared/content'

const props = defineProps<{ items: PublicItem[]; branches: Branch[]; locale: Locale }>()
const base = computed(() => `/${props.locale}`)
const label = (zh: string, en: string) => props.locale === 'zh' ? zh : en
const branchName = (item: PublicItem) => props.branches.find(branch => branch.id === item.branchId)?.name[props.locale] || ''
const groups = computed(() => {
  const known = new Set(props.items.map(item => item.id))
  return props.items
    .filter(item => !item.projectId || !known.has(item.projectId))
    .sort((a, b) => a.date.localeCompare(b.date) || a.order - b.order)
    .map(root => ({
      root,
      children: props.items
        .filter(item => item.projectId === root.id)
        .sort((a, b) => a.date.localeCompare(b.date) || a.order - b.order)
    }))
})
</script>

<template>
  <div class="project-canvas" :aria-label="label('项目发展画布', 'Project canvas')">
    <section v-for="(group, index) in groups" :id="`project-${group.root.id}`" :key="group.root.id" class="canvas-project">
      <div class="canvas-spine" aria-hidden="true"><span class="canvas-spine-dot" /></div>
      <div class="canvas-project-main">
        <div class="canvas-project-meta"><time>{{ group.root.date }}</time><span>{{ branchName(group.root) }}</span><span>{{ String(index + 1).padStart(2, '0') }} / {{ String(groups.length).padStart(2, '0') }}</span></div>
        <NuxtLink :to="`${base}/projects/${group.root.id}`" class="canvas-project-link">
          <div v-if="group.root.cover" class="canvas-project-image"><img :src="group.root.cover" :alt="group.root.translation.title" loading="lazy"></div>
          <div class="canvas-project-copy"><h2>{{ group.root.translation.title }}</h2><p>{{ group.root.translation.summary }}</p><span class="canvas-read">{{ label('阅读项目', 'Read project') }} <span aria-hidden="true">↗</span></span></div>
        </NuxtLink>
      </div>
      <div v-if="group.children.length" class="canvas-project-branches">
        <p class="canvas-branch-heading">{{ label('项目进程与作品', 'Progress & work') }}</p>
        <ol>
          <li v-for="child in group.children" :key="child.id">
            <NuxtLink :to="`${base}/projects/${child.id}`">
              <time>{{ child.date }}</time><div><span class="canvas-child-type">{{ child.kind === 'work' ? label('作品', 'Work') : label('记录', 'Progress') }}</span><h3>{{ child.translation.title }}</h3><p v-if="child.translation.summary">{{ child.translation.summary }}</p></div><span aria-hidden="true">↗</span>
            </NuxtLink>
          </li>
        </ol>
      </div>
    </section>
  </div>
</template>
