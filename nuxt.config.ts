// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  plugins: [
    '~/plugins/supabase.ts',
    '~/plugins/google-analytics.client.ts'
  ],
  devtools: { enabled: true },
  components: true,
  modules: ['@nuxt/ui', '@nuxt/content', '@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/i18n'],

  // Icon 配置优化
  icon: {
    serverBundle: {
      collections: ['heroicons', 'simple-icons'] // 只包含需要的图标集合
    }
  },

  // PostCSS 配置
  postcss: {
    plugins: {
      'postcss-nesting': {},
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      // 全局SEO配置 - 英文优先
      title: 'KaimaFind - Free Online Tools & Investment Guide Platform',
      titleTemplate: '%s | KaimaFind',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Discover the best free online tools and professional investment guides. PDF tools, icon resources, AI tools, offshore banking, Web3 investment strategies and more.' },
        { name: 'keywords', content: 'online tools, free tools, PDF tools, investment guide, offshore banking, Web3 investment, crypto investment, AI tools, icon download, productivity tools' },
        { name: 'author', content: 'KaimaFind' },
        { name: 'robots', content: 'index, follow' },
        { name: 'language', content: 'en' },

        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'KaimaFind - Free Online Tools & Investment Guide Platform' },
        { property: 'og:description', content: 'Discover the best free online tools and professional investment guides. PDF tools, icon resources, AI tools, offshore banking, Web3 investment strategies and more.' },
        { property: 'og:site_name', content: 'KaimaFind' },
        { property: 'og:locale', content: 'en_US' },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'KaimaFind - Free Online Tools & Investment Guide Platform' },
        { name: 'twitter:description', content: 'Discover the best free online tools and professional investment guides. PDF tools, icon resources, AI tools, offshore banking, Web3 investment strategies and more.' },

        // Additional SEO
        { name: 'theme-color', content: '#3B82F6' },
        { name: 'msapplication-TileColor', content: '#3B82F6' }
      ],
      link: [
        { rel: 'canonical', href: 'https://kaimafind.com' },
        { rel: 'alternate', hreflang: 'en', href: 'https://kaimafind.com' },
        { rel: 'alternate', hreflang: 'zh', href: 'https://kaimafind.com/zh' },
        { rel: 'alternate', hreflang: 'x-default', href: 'https://kaimafind.com' },

        // 网站图标配置
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icon-192.png' },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/icon-512.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },

        // PWA相关
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  },
  routeRules: {
    '/auth/callback': { ssr: false }  // 禁用此页面的服务器端渲染
  },

  // 国际化配置 - 使用内联方式避免路径问题
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json'
      },
      {
        code: 'zh',
        iso: 'zh-CN',
        name: '中文',
        file: 'zh.json'
      }
    ],
    defaultLocale: 'en',
    langDir: 'locales',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: true,
      fallbackLocale: 'en'
    }
  },
  // 使用 runtimeConfig 配置 Google Analytics
  runtimeConfig: {
    public: {
      googleAnalytics: {
        id: 'G-7XQQDM99W4'  // 更新为正确的跟踪 ID
      }
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
  },

  // 忽略弃用警告
  nitro: {
    experimental: {
      wasm: true
    }
  }
})
