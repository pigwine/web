// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  plugins: [
    '~/plugins/supabase.ts'
  ],
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/content', '@nuxtjs/tailwindcss', 'nuxt-icon'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  routeRules: {
    '/auth/callback': { ssr: false }  // 禁用此页面的服务器端渲染
  }
})
