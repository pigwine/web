<template>
  <div class="embed-container" :class="{ 'dark-mode': isDarkMode }">
    <component 
      :is="widgetComponent" 
      v-if="widgetComponent"
      class="embedded-widget"
    />
    <div v-else class="widget-not-found">
      小组件未找到
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const widgetId = route.params.id
const isDarkMode = ref(false)
const widgetComponent = ref(null)

// 组件映射表
const widgetComponents = {
  'weather': defineAsyncComponent(() => import('~/components/notion/widgets/WeatherWidget.vue')),
  'clock': defineAsyncComponent(() => import('~/components/notion/widgets/ClockWidget.vue')),
  'calendar': defineAsyncComponent(() => import('~/components/notion/widgets/CalendarWidget.vue')),
  // 添加更多组件...
}

onMounted(() => {
  // 从URL参数获取主题设置
  const urlParams = new URLSearchParams(window.location.search)
  const theme = urlParams.get('theme')
  isDarkMode.value = theme === 'dark'
  
  // 根据ID加载对应的组件
  if (widgetId && widgetComponents[widgetId]) {
    widgetComponent.value = widgetComponents[widgetId]
  }
})
</script>

<style scoped>
.embed-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

.dark-mode {
  background-color: #121212;
  color: #eee;
}

.embedded-widget {
  width: 100%;
  height: 100%;
  border: none;
  box-shadow: none;
}

.widget-not-found {
  font-size: 16px;
  color: #666;
  text-align: center;
}

.dark-mode .widget-not-found {
  color: #aaa;
}
</style> 