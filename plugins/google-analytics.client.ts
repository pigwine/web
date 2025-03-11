// 为 Window 添加 dataLayer 类型
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

export default defineNuxtPlugin(() => {
  const id = 'G-7XQQDM99W4'  // 更新为正确的跟踪 ID
  
  // 添加 Google Analytics 脚本
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  document.head.appendChild(script)

  // 初始化 gtag
  window.dataLayer = window.dataLayer || []
  window.gtag = function(...args) {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', id)
  
  // 提供 useGtag 组合式函数
  return {
    provide: {
      gtag: (event: string, action: string, params?: object) => {
        window.gtag(event, action, params)
      }
    }
  }
}) 