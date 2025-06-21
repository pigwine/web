  <!--
  这段代码实现了以下功能：
  1. 动态路由处理：[...slug].vue 文件用于处理所有未明确定义的路由
  2. 内容展示：使用 ContentDoc 组件来显示 Nuxt Content 的文档内容
  3. 404错误处理：
     - 如果找不到对应的内容文档，显示自定义的404错误组件
     - 如果路由在pages目录中不存在，抛出404错误
  -->
  <template>
    <main>
      <ContentDoc v-if="isContentRoute">
        <template v-slot:not-found>
          <div class="flex flex-col items-center justify-center min-h-[400px] text-center">
            <h1 class="text-4xl font-bold text-gray-800 mb-4">404</h1>
            <p class="text-lg text-gray-600 mb-6">Content not found</p>
            <NuxtLink to="/" class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Back to Home
            </NuxtLink>
          </div>
        </template>
        <template #default="{ doc }">
          {{ doc }}
        </template>
      </ContentDoc>
    </main>
  </template>

  <script setup>
  import { useRouter } from '#app'
  import { useRoute } from 'vue-router'
  import { computed } from 'vue'

  const router = useRouter()
  const route = useRoute()

  // 定义不需要内容处理的路由
  const excludeRoutes = ['/login', '/register']

  // 判断是否是内容路由
  const isContentRoute = computed(() => {
    return !excludeRoutes.includes(route.path)
  })

  // 检查路由是否存在
  const pageExists = router.hasRoute(route.path)

  // 如果路由不存在且不是内容路由，抛出404错误
  if (!pageExists && !isContentRoute.value) {
    throw createError({
      statusCode: 404,
      message: '页面未找到'
    })
  }
  </script>