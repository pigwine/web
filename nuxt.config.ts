// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/content', '@nuxtjs/tailwindcss', 'nuxt-icon'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
 
})
