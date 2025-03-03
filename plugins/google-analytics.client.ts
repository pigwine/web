// 为 Window 添加 dataLayer 类型
declare global {
  interface Window {
    dataLayer: any[]
  }
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  // 使用 @ts-ignore 忽略类型错误
  // @ts-ignore
  const id = config.public.googleAnalytics?.id
  
  if (id) {
    // 添加 Google Analytics 脚本
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
    document.head.appendChild(script)

    // 初始化 gtag
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    gtag('js', new Date())
    gtag('config', id)
  }
}) 