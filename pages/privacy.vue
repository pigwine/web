<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="prose prose-lg max-w-none">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">{{ t('seo.pages.privacy.title') }}</h1>

      <div class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
        <p class="text-blue-800">
          <strong>{{ t('privacy.lastUpdated') }}:</strong> {{ t('privacy.updateDate') }}
        </p>
      </div>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ t('privacy.introduction.title') }}</h2>
        <p class="text-gray-600 leading-relaxed mb-4">{{ t('privacy.introduction.content') }}</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ t('privacy.dataCollection.title') }}</h2>
        <p class="text-gray-600 leading-relaxed mb-4">{{ t('privacy.dataCollection.intro') }}</p>
        <ul class="list-disc list-inside text-gray-600 space-y-2">
          <li>{{ t('privacy.dataCollection.items.0') }}</li>
          <li>{{ t('privacy.dataCollection.items.1') }}</li>
          <li>{{ t('privacy.dataCollection.items.2') }}</li>
          <li>{{ t('privacy.dataCollection.items.3') }}</li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ t('privacy.dataUsage.title') }}</h2>
        <p class="text-gray-600 leading-relaxed mb-4">{{ t('privacy.dataUsage.intro') }}</p>
        <ul class="list-disc list-inside text-gray-600 space-y-2">
          <li>{{ t('privacy.dataUsage.items.0') }}</li>
          <li>{{ t('privacy.dataUsage.items.1') }}</li>
          <li>{{ t('privacy.dataUsage.items.2') }}</li>
          <li>{{ t('privacy.dataUsage.items.3') }}</li>
          <li>{{ t('privacy.dataUsage.items.4') }}</li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ t('privacy.cookies.title') }}</h2>
        <p class="text-gray-600 leading-relaxed mb-4">{{ t('privacy.cookies.content') }}</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ t('privacy.thirdParty.title') }}</h2>
        <p class="text-gray-600 leading-relaxed mb-4">{{ t('privacy.thirdParty.intro') }}</p>
        <ul class="list-disc list-inside text-gray-600 space-y-2">
          <li>
            <strong>{{ t('privacy.thirdParty.services.0.name') }}:</strong> {{ t('privacy.thirdParty.services.0.purpose') }}
          </li>
          <li>
            <strong>{{ t('privacy.thirdParty.services.1.name') }}:</strong> {{ t('privacy.thirdParty.services.1.purpose') }}
          </li>
          <li>
            <strong>{{ t('privacy.thirdParty.services.2.name') }}:</strong> {{ t('privacy.thirdParty.services.2.purpose') }}
          </li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ t('privacy.userRights.title') }}</h2>
        <p class="text-gray-600 leading-relaxed mb-4">{{ t('privacy.userRights.intro') }}</p>
        <ul class="list-disc list-inside text-gray-600 space-y-2">
          <li>{{ t('privacy.userRights.rights.0') }}</li>
          <li>{{ t('privacy.userRights.rights.1') }}</li>
          <li>{{ t('privacy.userRights.rights.2') }}</li>
          <li>{{ t('privacy.userRights.rights.3') }}</li>
          <li>{{ t('privacy.userRights.rights.4') }}</li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ t('privacy.contact.title') }}</h2>
        <p class="text-gray-600 leading-relaxed">{{ t('privacy.contact.content') }}</p>
        <p class="text-gray-600 mt-2">
          <strong>{{ t('privacy.contact.email') }}:</strong>
          <a href="mailto:privacy@kaimafind.com" class="text-blue-600 hover:text-blue-800">privacy@kaimafind.com</a>
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
  title: t('seo.pages.privacy.title'),
  description: t('seo.pages.privacy.description'),
  keywords: t('seo.pages.privacy.keywords'),
  ogTitle: t('seo.pages.privacy.title'),
  ogDescription: t('seo.pages.privacy.description'),
  ogUrl: () => locale.value === 'zh' ? 'https://kaimafind.com/zh/privacy' : 'https://kaimafind.com/privacy',
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
