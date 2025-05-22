// 为 Window 添加 dataLayer 类型
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

export default defineNuxtPlugin(() => {
  // 获取运行时配置
  const runtimeConfig = useRuntimeConfig()
  const id = runtimeConfig.public.googleAnalytics?.id
  
  // 判断是否启用Google Analytics
  const isDev = process.env.NODE_ENV !== 'production'
  if (isDev) {
    console.log('开发环境下不加载Google Analytics')
    return {
      provide: {
        gtag: (event: string, action: string, params?: object) => {
          console.log('GA事件(开发环境):', event, action, params)
        }
      }
    }
  }
  
  // 添加错误处理，防止因网络问题导致页面加载失败
  try {
    // 添加 Google Analytics 脚本
    const script = document.createElement('script')
    script.async = true
    script.defer = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
    
    // 添加超时和错误处理
    script.onerror = () => {
      console.warn('Google Analytics 加载失败，可能是网络问题或广告拦截器')
    }
    
    // 设置超时，防止长时间阻塞
    const timeout = setTimeout(() => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
      console.warn('Google Analytics 加载超时')
    }, 5000)
    
    script.onload = () => {
      clearTimeout(timeout)
    }
    
    document.head.appendChild(script)

    // 初始化 gtag
    window.dataLayer = window.dataLayer || []
    window.gtag = function(...args) {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', id, {
      send_page_view: false // 初始化时不发送页面浏览事件，等路由变化时发送
    })
  } catch (error) {
    console.warn('Google Analytics 初始化失败:', error)
  }
  
  // 提供 useGtag 组合式函数
  return {
    provide: {
      gtag: (event: string, action: string, params?: object) => {
        try {
          if (window.gtag) {
            window.gtag(event, action, params)
          }
        } catch (error) {
          console.warn('Google Analytics 事件发送失败:', error)
        }
      }
    }
  }
}) 