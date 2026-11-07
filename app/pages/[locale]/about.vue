<script setup lang="ts">
const { locale, t } = usePortfolio()
useSeoMeta({ title: () => t('关于 — KaimaFind', 'About — KaimaFind') })
</script>

<template>
  <div>
    <SiteHeader :locale="locale" active="about" />
    <main id="main" class="about-simple">
      <h1>{{ t('关于', 'About') }}</h1>
      <div class="about-simple-content">
        <p>KaimaFind</p>
        <p>{{ t('这里整理项目、作品和过程中的记录。', 'Projects, work, and notes from the process.') }}</p>
        <a href="https://x.com/adoma1314" target="_blank" rel="noopener noreferrer">X ↗</a>
      </div>
    </main>
    <SiteFooter :locale="locale" />
  </div>
</template>
