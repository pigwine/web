export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  srcDir: 'app/',
  css: ['~/assets/css/main.css'],
  devtools: { enabled: false },
  typescript: { strict: true },
  runtimeConfig: { accessTeam: '', accessAudience: '', adminEmail: '', localAdmin: false, public: { siteUrl: 'https://kaimafind.com' } },
  nitro: { experimental: { wasm: true }, devStorage: { data: { driver: 'fs', base: process.env.KAIMAFIND_DATA_DIR || './.data/content' } } },
  app: { head: { title: 'KaimaFind — A life in progress', meta: [{ name: 'theme-color', content: '#f3f3f0' }], link: [{ rel: 'icon', href: '/favicon.ico' }] } }
})
