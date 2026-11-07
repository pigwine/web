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
        <a class="about-social-icon" href="https://x.com/adoma1314" target="_blank" rel="noopener noreferrer" :aria-label="t('X（原 Twitter）', 'X (Twitter)')" title="X / Twitter"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.83L0 1.153h7.594l5.24 6.932zM17.61 20.646h2.04L6.486 3.24H4.298z"/></svg></a>
      </div>
    </main>
    <SiteFooter :locale="locale" />
  </div>
</template>
