// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  plugins: [
    '~/plugins/supabase.ts',
    '~/plugins/google-analytics.client.ts'
  ],
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/content', '@nuxtjs/tailwindcss', 'nuxt-icon'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      script: [
        {
          // Google Analytics 脚本 - 使用正确的跟踪 ID
          children: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7XQQDM99W4');
          `,
          type: 'text/javascript'
        }
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
      }
    }
  }
})
