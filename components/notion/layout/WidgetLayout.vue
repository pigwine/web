<template>
  <div class="widget-canvas" :class="{ 'dark-mode': isDarkMode, 'embedded': isEmbedded }" ref="canvasRef">
    <!-- 简洁的顶部工具栏 - 只保留锁定按钮 -->
    <div class="canvas-toolbar">
      <div class="toolbar-actions">
        <!-- 锁定/解锁按钮 -->
        <button class="toolbar-button lock-toggle" @click="toggleLock" :title="isLocked ? '解锁位置移动' : '锁定位置移动'">
          <span v-if="isLocked">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </span>
          <span v-else>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
    
    <!-- 自适应画布区域 -->
    <div class="adaptive-canvas">
      <!-- 组件 -->
      <div 
        v-for="widget in widgets" 
        :key="widget.id"
        class="widget-item"
        :class="{ 'position-locked': isLocked }"
        :style="{
          width: widget.width + 'px',
          height: widget.height + 'px',
          left: widget.x + 'px',
          top: widget.y + 'px'
        }"
        @mousedown.stop="handleWidgetMouseDown($event, widget)"
        :data-widget-id="widget.id"
        ref="widgetRefs"
      >
        <div 
          class="widget-content" 
          :style="{ 
            objectFit: widget.displayMode === 'cover' ? 'cover' : 'contain',
            height: '100%',
            width: '100%'
          }"
        >
          <component 
            :is="getComponent(widget.componentName)" 
            @mounted="(dimensions) => onWidgetMounted(dimensions, widget)"
            @resize="(dimensions) => onWidgetResize(dimensions, widget)"
            :style="{ height: '100%', width: '100%' }"
          />
        </div>
        
        <!-- 调整大小的手柄 - 仅在未锁定时显示 -->
        <template v-if="!isLocked">
          <div class="resize-handle resize-e" @mousedown.stop="startResize($event, widget, 'e')"></div>
          <div class="resize-handle resize-s" @mousedown.stop="startResize($event, widget, 's')"></div>
          <div class="resize-handle resize-se" @mousedown.stop="startResize($event, widget, 'se')"></div>
        </template>
        
        <!-- 复制按钮 - 悬浮时显示 -->
        <div class="copy-button" @click.stop="copyEmbedUrl(widget)" title="复制嵌入链接">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </div>
        
        <!-- 锁定状态指示 - 仅在锁定且悬浮时显示 -->
        <div class="position-lock-indicator" v-if="isLocked">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
      </div>
      
      <!-- 复制成功提示 -->
      <div class="copy-toast" :class="{ 'show': showCopyToast }">
        已复制嵌入链接到剪贴板
      </div>
      
      <!-- 锁定状态提示 -->
      <div class="lock-toast" :class="{ 'show': showLockToast }">
        {{ lockToastMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch, defineAsyncComponent, markRaw } from 'vue'

// 组件状态
const isDarkMode = ref(false)
const isLocked = ref(false)
const isEmbedded = ref(false)
const widgets = ref([])
const activeWidget = ref(null)
const resizeDirection = ref(null)
const initialMousePosition = ref({ x: 0, y: 0 })
const initialWidgetDimensions = ref({ width: 0, height: 0, x: 0, y: 0 })
const canvasRef = ref(null)
const widgetRefs = ref([])
const showCopyToast = ref(false)
const showLockToast = ref(false)
const lockToastMessage = ref('')
const isDragging = ref(false)

// 检查是否为嵌入模式
onMounted(() => {
  // 检测是否为嵌入环境
  try {
    isEmbedded.value = window.self !== window.top
  } catch (e) {
    isEmbedded.value = true
  }
  
  // 从localStorage加载widgets
  loadWidgets()
  
  // 从URL参数获取主题模式
  const urlParams = new URLSearchParams(window.location.search)
  const theme = urlParams.get('theme')
  if (theme === 'dark') {
    isDarkMode.value = true
  } else if (theme === 'light') {
    isDarkMode.value = false
  } else {
    // 检测系统主题
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDarkMode.value = prefersDark
  }
  
  // 添加事件监听器
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
  
  // 如果是嵌入模式，只显示指定的widget
  if (isEmbedded.value) {
    const widgetId = urlParams.get('widget')
    if (widgetId) {
      const widget = widgets.value.find(w => w.id === widgetId)
      if (widget) {
        widgets.value = [widget]
        // 重置位置到左上角
        widget.x = 0
        widget.y = 0
      }
    }
    
    // 嵌入模式下锁定位置
    isLocked.value = true
  }
  
  // 更新画布高度以适应所有组件
  nextTick(() => {
    updateCanvasHeight()
  })
})

// 更新画布高度
const updateCanvasHeight = () => {
  if (!canvasRef.value || widgets.value.length === 0) return
  
  // 计算所有组件的最大底部位置
  let maxBottom = 0
  widgets.value.forEach(widget => {
    const bottom = widget.y + widget.height
    if (bottom > maxBottom) {
      maxBottom = bottom
    }
  })
  
  // 设置画布最小高度，确保能容纳所有组件
  canvasRef.value.style.minHeight = `${maxBottom + 100}px`
}

// 从localStorage加载widgets
const loadWidgets = () => {
  try {
    const savedWidgets = localStorage.getItem('widgets')
    if (savedWidgets) {
      widgets.value = JSON.parse(savedWidgets)
    } else {
      // 默认添加时钟和天气组件
      initializeWidgets()
    }
  } catch (e) {
    console.error('加载widgets失败:', e)
    // 默认添加时钟和天气组件
    initializeWidgets()
  }
}

// 保存widgets到localStorage
const saveWidgets = () => {
  try {
    localStorage.setItem('widgets', JSON.stringify(widgets.value))
    // 更新画布高度
    nextTick(() => {
      updateCanvasHeight()
    })
  } catch (e) {
    console.error('保存widgets失败:', e)
  }
}

// 初始化小组件数据
const initializeWidgets = () => {
  widgets.value = [
    {
      id: 'weather',  // 使用简单的字符串ID
      componentName: 'WeatherWidget',
      x: 20,
      y: 20,
      width: 300,
      height: 200,
      displayMode: 'contain'
    },
    {
      id: 'clock',  // 使用简单的字符串ID
      componentName: 'ClockWidget',
      x: 340,
      y: 20,
      width: 300,
      height: 200,
      displayMode: 'contain'
    },
    {
      id: 'calendar',  // 使用简单的字符串ID
      componentName: 'CalendarWidget',
      x: 20,
      y: 240,
      width: 300,
      height: 200,
      displayMode: 'contain'
    }
  ]
}

// 获取组件
const getComponent = (componentName) => {
  return markRaw(defineAsyncComponent(() => 
    import(`../widgets/${componentName}.vue`)
  ))
}

// 处理组件挂载事件
const onWidgetMounted = (dimensions, widget) => {
  // 如果组件报告了它的尺寸
  if (dimensions && dimensions.width && dimensions.height) {
    // 自动调整widget大小以适应内容
    widget.width = Math.max(widget.width, dimensions.width)
    widget.height = Math.max(widget.height, dimensions.height)
    
    // 保存更新后的widget配置
    saveWidgets()
  }
}

// 处理组件调整大小事件
const onWidgetResize = (dimensions, widget) => {
  if (dimensions && dimensions.width && dimensions.height) {
    // 更新widget尺寸
    widget.width = Math.max(widget.width, dimensions.width)
    widget.height = Math.max(widget.height, dimensions.height)
    saveWidgets()
  }
}

// 处理widget鼠标按下事件
const handleWidgetMouseDown = (event, widget) => {
  // 检查是否处于锁定状态
  if (isLocked.value) return
  
  // 确保事件目标不是调整大小的手柄或复制按钮
  if (event.target.closest('.resize-handle') || event.target.closest('.copy-button')) {
    return
  }
  
  console.log('开始拖动组件:', widget.id)
  
  // 设置活动组件
  activeWidget.value = widget
  isDragging.value = true
  
  // 记录初始鼠标位置和组件尺寸
  initialMousePosition.value = {
    x: event.clientX,
    y: event.clientY
  }
  
  initialWidgetDimensions.value = {
    x: widget.x,
    y: widget.y,
    width: widget.width,
    height: widget.height
  }
  
  // 阻止默认行为和事件冒泡
  event.preventDefault()
  event.stopPropagation()
  
  // 添加全局事件监听器
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

// 处理鼠标移动
const handleMouseMove = (event) => {
  if (!activeWidget.value || !isDragging.value) return
  
  // 计算鼠标移动的距离
  const deltaX = event.clientX - initialMousePosition.value.x
  const deltaY = event.clientY - initialMousePosition.value.y
  
  // 计算新位置
  let newX = initialWidgetDimensions.value.x + deltaX
  let newY = initialWidgetDimensions.value.y + deltaY
  
  // 边界检查
  newX = Math.max(0, newX)
  newY = Math.max(0, newY)
  
  if (canvasRef.value) {
    const canvasWidth = canvasRef.value.clientWidth
    const canvasHeight = canvasRef.value.clientHeight
    
    const maxX = canvasWidth - activeWidget.value.width
    const maxY = canvasHeight - activeWidget.value.height
    
    newX = Math.min(newX, maxX > 0 ? maxX : 0)
    newY = Math.min(newY, maxY > 0 ? maxY : 0)
  }
  
  // 更新组件位置
  activeWidget.value.x = newX
  activeWidget.value.y = newY
  
  // 强制更新视图
  widgets.value = [...widgets.value]
  
  // 阻止默认行为和事件冒泡
  event.preventDefault()
  event.stopPropagation()
}

// 处理鼠标释放
const handleMouseUp = (event) => {
  if (!activeWidget.value) return
  
  console.log('结束拖动组件:', activeWidget.value.id)
  
  // 标记当前活动组件的ID
  const activeWidgetId = activeWidget.value.id
  
  // 清除状态
  isDragging.value = false
  activeWidget.value = null
  
  // 移除事件监听器
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
  
  // 保存更新后的位置
  saveWidgets()
  
  // 延迟执行位置调整，避免拖动结束时的跳跃
  setTimeout(() => {
    if (!isLocked.value) {
      adjustWidgetPositions(activeWidgetId)
    }
  }, 50)
  
  // 阻止默认行为和事件冒泡
  event.preventDefault()
  event.stopPropagation()
}

// 优化 adjustWidgetPositions 函数，减少不必要的调整
const adjustWidgetPositions = (currentWidgetId) => {
  if (isLocked.value) return // 锁定状态下不调整
  
  const currentWidget = widgets.value.find(w => w.id === currentWidgetId)
  if (!currentWidget) return
  
  const minDistance = 15 // 最小间距（像素）
  let adjustmentsMade = false
  
  // 创建组件位置的副本，以便批量更新
  const updatedPositions = {}
  
  // 检查并计算其他组件的新位置
  widgets.value.forEach(widget => {
    if (widget.id === currentWidgetId) return // 跳过当前调整的组件
    
    // 检查是否有重叠或距离过近
    const overlap = checkOverlap(currentWidget, widget, minDistance)
    
    if (overlap.hasOverlap) {
      adjustmentsMade = true
      
      // 根据重叠情况计算新位置
      let newX = widget.x
      let newY = widget.y
      
      if (overlap.direction === 'right') {
        newX = currentWidget.x + currentWidget.width + minDistance
      } else if (overlap.direction === 'bottom') {
        newY = currentWidget.y + currentWidget.height + minDistance
      } else if (overlap.direction === 'left') {
        newX = currentWidget.x - widget.width - minDistance
      } else if (overlap.direction === 'top') {
        newY = currentWidget.y - widget.height - minDistance
      }
      
      // 存储新位置
      updatedPositions[widget.id] = { x: newX, y: newY }
    }
  })
  
  // 批量应用位置更新，避免连锁反应
  if (adjustmentsMade) {
    Object.keys(updatedPositions).forEach(id => {
      const widget = widgets.value.find(w => w.id === id)
      if (widget) {
        widget.x = updatedPositions[id].x
        widget.y = updatedPositions[id].y
      }
    })
  }
}

// 优化重叠检测算法
const checkOverlap = (widget1, widget2, minDistance) => {
  // 计算两个组件的边界
  const w1Left = widget1.x
  const w1Right = widget1.x + widget1.width
  const w1Top = widget1.y
  const w1Bottom = widget1.y + widget1.height
  
  const w2Left = widget2.x
  const w2Right = widget2.x + widget2.width
  const w2Top = widget2.y
  const w2Bottom = widget2.y + widget2.height
  
  // 检查是否有重叠
  const hasHorizontalOverlap = (w1Left < w2Right) && (w1Right > w2Left)
  const hasVerticalOverlap = (w1Top < w2Bottom) && (w1Bottom > w2Top)
  
  // 如果没有任何重叠，快速返回
  if (!hasHorizontalOverlap || !hasVerticalOverlap) {
    return { hasOverlap: false }
  }
  
  // 计算各方向的重叠或距离
  const rightDist = w2Left - w1Right
  const leftDist = w1Left - w2Right
  const bottomDist = w2Top - w1Bottom
  const topDist = w1Top - w2Bottom
  
  // 找出最小移动距离的方向
  const distances = [
    { dir: 'right', dist: rightDist },
    { dir: 'left', dist: leftDist },
    { dir: 'bottom', dist: bottomDist },
    { dir: 'top', dist: topDist }
  ]
  
  // 按距离排序（负值表示重叠）
  distances.sort((a, b) => Math.abs(a.dist) - Math.abs(b.dist))
  
  // 返回移动距离最小的方向
  return { 
    hasOverlap: true, 
    direction: distances[0].dir,
    distance: distances[0].dist
  }
}

// 开始调整大小
const startResize = (event, widget, direction) => {
  event.preventDefault()
  event.stopPropagation()
  
  activeWidget.value = widget
  resizeDirection.value = direction
  
  // 记录初始鼠标位置和组件尺寸
  initialMousePosition.value = {
    x: event.clientX,
    y: event.clientY
  }
  
  initialWidgetDimensions.value = {
    x: widget.x,
    y: widget.y,
    width: widget.width,
    height: widget.height
  }
  
  // 添加调整大小的事件监听器
  document.addEventListener('mousemove', handleResizeMove)
  document.addEventListener('mouseup', handleResizeUp)
  
  // 添加活动调整类
  const widgetEl = event.target.closest('.widget-item')
  if (widgetEl) {
    widgetEl.classList.add('active-resize')
  }
}

// 修改 handleResizeMove 函数，优化调整大小的行为
const handleResizeMove = (event) => {
  if (!activeWidget.value || !resizeDirection.value) return
  
  const deltaX = event.clientX - initialMousePosition.value.x
  const deltaY = event.clientY - initialMousePosition.value.y
  
  let newWidth = initialWidgetDimensions.value.width
  let newHeight = initialWidgetDimensions.value.height
  
  // 根据调整方向计算新尺寸
  if (resizeDirection.value.includes('e')) {
    newWidth = Math.max(100, initialWidgetDimensions.value.width + deltaX)
  }
  
  if (resizeDirection.value.includes('s')) {
    newHeight = Math.max(100, initialWidgetDimensions.value.height + deltaY)
  }
  
  // 更新组件尺寸
  activeWidget.value.width = newWidth
  activeWidget.value.height = newHeight
}

// 修改 handleResizeUp 函数，优化调整大小结束的行为
const handleResizeUp = () => {
  if (activeWidget.value) {
    const activeWidgetId = activeWidget.value.id
    
    // 移除活动调整类
    document.querySelectorAll('.widget-item.active-resize').forEach(el => {
      el.classList.remove('active-resize')
    })
    
    // 清除状态
    activeWidget.value = null
    resizeDirection.value = null
    
    // 移除事件监听器
    document.removeEventListener('mousemove', handleResizeMove)
    document.removeEventListener('mouseup', handleResizeUp)
    
    // 延迟执行位置调整
    setTimeout(() => {
      if (!isLocked.value) {
        adjustWidgetPositions(activeWidgetId)
      }
    }, 50)
  }
}

// 切换锁定状态
const toggleLock = () => {
  isLocked.value = !isLocked.value
  
  // 显示提示
  lockToastMessage.value = isLocked.value ? '已锁定组件位置' : '已解锁组件位置'
  showLockToast.value = true
  setTimeout(() => {
    showLockToast.value = false
  }, 2000)
}

// 复制嵌入链接
const copyEmbedUrl = (widget) => {
  // 修改嵌入链接格式
  const baseUrl = window.location.origin
  // 创建专门的嵌入路径
  const embedUrl = `${baseUrl}/embed/widget/${widget.id}?theme=${isDarkMode.value ? 'dark' : 'light'}`
  
  navigator.clipboard.writeText(embedUrl)
    .then(() => {
      showCopyToast.value = true
      setTimeout(() => {
        showCopyToast.value = false
      }, 2000)
    })
    .catch(err => {
      console.error('复制失败:', err)
    })
}

// 清理
onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
})

// 监听组件变化，更新画布高度
watch(widgets, () => {
  nextTick(() => {
    updateCanvasHeight()
  })
}, { deep: true })
</script>
<style scoped>
.widget-canvas {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  transition: background-color 0.3s ease;
  overflow: hidden;
}

.dark-mode {
  background-color: #1a1a1a;
  color: #eee;
}

.canvas-toolbar {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 100;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.dark-mode .canvas-toolbar {
  background-color: rgba(30, 30, 30, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.toolbar-actions {
  display: flex;
  gap: 10px;
}

.toolbar-button {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: #333;
}

.toolbar-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.dark-mode .toolbar-button {
  color: #ddd;
}

.dark-mode .toolbar-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.adaptive-canvas {
  position: relative;
  width: 100%;
  min-height: calc(100vh - 50px);
  padding: 20px;
}

.widget-item {
  position: absolute;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  user-select: none;
  will-change: transform; /* 优化性能 */
}

.dark-mode .widget-item {
  background-color: #2a2a2a;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.widget-item:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.dark-mode .widget-item:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
}

.widget-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* 调整大小的手柄 */
.resize-handle {
  position: absolute;
  background-color: transparent;
  z-index: 10;
}

.resize-e {
  top: 0;
  right: 0;
  width: 8px;
  height: 100%;
  cursor: e-resize;
}

.resize-s {
  bottom: 0;
  left: 0;
  width: 100%;
  height: 8px;
  cursor: s-resize;
}

.resize-se {
  bottom: 0;
  right: 0;
  width: 16px;
  height: 16px;
  cursor: se-resize;
}

/* 复制按钮 */
.copy-button {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 5;
  color: #333;
}

.widget-item:hover .copy-button {
  opacity: 1;
}

.dark-mode .copy-button {
  background-color: rgba(50, 50, 50, 0.8);
  color: #eee;
}

/* 锁定状态指示 */
.position-lock-indicator {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 5;
  color: #333;
}

.widget-item:hover .position-lock-indicator {
  opacity: 1;
}

.dark-mode .position-lock-indicator {
  background-color: rgba(50, 50, 50, 0.8);
  color: #eee;
}

/* 提示框 */
.copy-toast,
.lock-toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 1000;
}

.copy-toast.show,
.lock-toast.show {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}

/* 拖动时不使用过渡效果 */
.widget-item:active {
  transition: none !important;
}

/* 非活动状态的组件使用过渡效果 */
.widget-item:not(:active) {
  transition: left 0.2s ease, top 0.2s ease, width 0.2s ease, height 0.2s ease;
}

/* 活动调整状态 */
.widget-item.active-resize {
  z-index: 10;
  box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.5);
}
</style>
