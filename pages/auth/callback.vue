<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      <p class="mt-4 text-gray-600">{{ status }}</p>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const { $supabase } = useNuxtApp()
const status = ref('正在处理登录...')

onMounted(async () => {
  try {
    // 清除 URL 中的 hash 部分（包含 token）
    if (window.location.hash) {
      // 获取当前会话
      const { data: { session }, error } = await $supabase.auth.getSession()
      if (error) throw error
      
      if (session) {
        // 使用 replaceState 清除 URL 中的 hash
        window.history.replaceState(null, '', window.location.pathname)
        status.value = '登录成功，正在跳转...'
        
        // 延迟跳转以显示成功消息
        setTimeout(() => {
          router.push('/')
        }, 1000)
      } else {
        throw new Error('未获取到会话信息')
      }
    }
  } catch (error) {
    console.error('处理认证回调时出错:', error)
    status.value = '登录失败，正在返回...'
    setTimeout(() => {
      router.push('/login')
    }, 1000)
  }
})
</script> 