// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  plugins: [
    '~/plugins/supabase.ts',
    '~/plugins/google-analytics.client.ts'
  ],
  devtools: { enabled: true },
  components: true,
  modules: ['@nuxt/ui', '@nuxt/content', '@nuxtjs/tailwindcss', 'nuxt-icon', '@pinia/nuxt'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      // 移除内联的GA脚本，使用插件加载
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'OCR系统 - 文本识别与分析' }
      ]
    }
  },
  routeRules: {
    '/auth/callback': { ssr: false }  // 禁用此页面的服务器端渲染
  },
  // 使用 runtimeConfig 配置 Google Analytics
  runtimeConfig: {
    public: {
      googleAnalytics: {
        id: 'G-7XQQDM99W4'  // 更新为正确的跟踪 ID
      },
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE || 'http://148.135.56.176:8080'
    }
  },
  // 修复WebSocket连接问题
  vite: {
    server: {
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 1815  // 修改为错误信息中显示的端口
      },
      watch: {
        usePolling: true,
        interval: 1000
      }
    }
  }
})
