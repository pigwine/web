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
      <ContentDoc>
        <template v-slot:not-found>
          <NuxtErrorBoundary>
            <error-component :error="{
              statusCode: 404,
              message: '页面未找到'
            }" />
          </NuxtErrorBoundary>
        </template>
        <template #default="{ doc }">
          {{ doc }}
        </template>
      </ContentDoc>
    </main>
  </template>

  <script setup>
  import { useRouter } from '#app'
  const router = useRouter()

  // 检查路由是否存在于pages目录中
  const route = useRoute()
  const pageExists = router.hasRoute(route.path)

  if (!pageExists) {
    throw createError({
      statusCode: 404,
      message: '页面未找到'
    })
  }
  </script>