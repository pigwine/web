<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="prose prose-lg max-w-none">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">{{ t('seo.pages.terms.title') }}</h1>

      <div class="bg-amber-50 border-l-4 border-amber-400 p-4 mb-8">
        <p class="text-amber-800">
          <strong>{{ t('terms.lastUpdated') }}:</strong> {{ t('terms.updateDate') }}
        </p>
      </div>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ t('terms.acceptance.title') }}</h2>
        <p class="text-gray-600 leading-relaxed">{{ t('terms.acceptance.content') }}</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ t('terms.services.title') }}</h2>
        <p class="text-gray-600 leading-relaxed mb-4">{{ t('terms.services.intro') }}</p>
        <ul class="list-disc list-inside text-gray-600 space-y-2">
          <li>{{ t('terms.services.list.0') }}</li>
          <li>{{ t('terms.services.list.1') }}</li>
          <li>{{ t('terms.services.list.2') }}</li>
          <li>{{ t('terms.services.list.3') }}</li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ t('terms.userResponsibilities.title') }}</h2>
        <p class="text-gray-600 leading-relaxed mb-4">{{ t('terms.userResponsibilities.intro') }}</p>
        <ul class="list-disc list-inside text-gray-600 space-y-2">
          <li>{{ t('terms.userResponsibilities.list.0') }}</li>
          <li>{{ t('terms.userResponsibilities.list.1') }}</li>
          <li>{{ t('terms.userResponsibilities.list.2') }}</li>
          <li>{{ t('terms.userResponsibilities.list.3') }}</li>
          <li>{{ t('terms.userResponsibilities.list.4') }}</li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ t('terms.prohibited.title') }}</h2>
        <p class="text-gray-600 leading-relaxed mb-4">{{ t('terms.prohibited.intro') }}</p>
        <ul class="list-disc list-inside text-gray-600 space-y-2">
          <li>{{ t('terms.prohibited.list.0') }}</li>
          <li>{{ t('terms.prohibited.list.1') }}</li>
          <li>{{ t('terms.prohibited.list.2') }}</li>
          <li>{{ t('terms.prohibited.list.3') }}</li>
          <li>{{ t('terms.prohibited.list.4') }}</li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ t('terms.intellectual.title') }}</h2>
        <p class="text-gray-600 leading-relaxed">{{ t('terms.intellectual.content') }}</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ t('terms.disclaimer.title') }}</h2>
        <p class="text-gray-600 leading-relaxed mb-4">{{ t('terms.disclaimer.content') }}</p>
        <div class="bg-red-50 border border-red-200 rounded-lg p-4">
          <p class="text-red-800 font-medium">{{ t('terms.disclaimer.warning') }}</p>
        </div>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ t('terms.limitation.title') }}</h2>
        <p class="text-gray-600 leading-relaxed">{{ t('terms.limitation.content') }}</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ t('terms.changes.title') }}</h2>
        <p class="text-gray-600 leading-relaxed">{{ t('terms.changes.content') }}</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ t('terms.contact.title') }}</h2>
        <p class="text-gray-600 leading-relaxed">{{ t('terms.contact.content') }}</p>
        <p class="text-gray-600 mt-2">
          <strong>{{ t('terms.contact.email') }}:</strong>
          <a href="mailto:legal@kaimafind.com" class="text-blue-600 hover:text-blue-800">legal@kaimafind.com</a>
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
// 国际化和SEO配置
const { t, locale } = useI18n()



// 动态SEO配置
useSeoMeta({
  title: t('seo.pages.terms.title'),
  description: t('seo.pages.terms.description'),
  keywords: t('seo.pages.terms.keywords'),
  ogTitle: t('seo.pages.terms.title'),
  ogDescription: t('seo.pages.terms.description'),
  ogUrl: () => locale.value === 'zh' ? 'https://kaimafind.com/zh/terms' : 'https://kaimafind.com/terms',
  ogLocale: () => locale.value === 'zh' ? 'zh_CN' : 'en_US'
})
</script>

<style scoped>
.prose h1 {
  border-bottom: 3px solid #3B82F6;
  padding-bottom: 0.5rem;
}

.prose h2 {
  color: #1F2937;
  margin-top: 2rem;
}

.prose ul li {
  margin-bottom: 0.5rem;
}
</style>
