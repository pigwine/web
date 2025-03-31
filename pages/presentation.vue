<template>
  <div class="presentation-layout" :class="{ 'dark-mode': isDarkMode }">
    <!-- 左侧导航栏 -->
    <div class="sidebar" v-if="!isFullscreen">
      <div class="sidebar-header">
        <h2 class="sidebar-title">幻灯片导航</h2>
        <button @click="toggleTheme" class="theme-toggle">
          <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>
      </div>
      
      <div class="slide-thumbnails">
        <div 
          v-for="(slide, index) in slides" 
          :key="index"
          class="slide-thumbnail"
          :class="{ active: currentSlide === index }"
          @click="currentSlide = index"
        >
          <div class="thumbnail-number">{{ index + 1 }}</div>
          <div class="thumbnail-preview">幻灯片 {{ index + 1 }}</div>
        </div>
      </div>
      
      <div class="sidebar-footer">
        <button @click="enterFullscreen" class="fullscreen-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
          </svg>
          <span>全屏演示</span>
        </button>
      </div>
    </div>
    
    <!-- 右侧幻灯片展示区 -->
    <div class="content-area" :class="{ 'fullscreen-mode': isFullscreen }">
      <div class="slide-controls" v-if="!isFullscreen">
        <button @click="prevSlide" :disabled="currentSlide === 0" class="control-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <span class="slide-counter">{{ currentSlide + 1 }} / {{ slides.length }}</span>
        <button @click="nextSlide" :disabled="currentSlide === slides.length - 1" class="control-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
      
      <div class="slide-display">
        <div class="slide-container">
          <div class="slide-wrapper" ref="slideWrapper">
            <component :is="slides[currentSlide]" class="slide" :key="currentSlide" />
          </div>
        </div>
      </div>
      
      <!-- 全屏模式下的右上角退出按钮 -->
      <button v-if="isFullscreen" @click="exitFullscreen" class="exit-fullscreen-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 14h6m0 0v6m0-6l-7 7m17-11h-6m0 0V4m0 6l7-7"></path>
        </svg>
      </button>
      
      <!-- 全屏模式下的左下角退出按钮 -->
      <button v-if="isFullscreen" @click="exitFullscreen" class="exit-fullscreen-button-bottom-left">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
        </svg>
        <span>退出全屏</span>
      </button>
      
      <!-- 全屏模式下的导航指示器 -->
      <div v-if="isFullscreen" class="fullscreen-indicators">
        <span class="slide-counter-fullscreen">{{ currentSlide + 1 }} / {{ slides.length }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, markRaw, defineAsyncComponent } from 'vue'

// 状态
const currentSlide = ref(0)
const isDarkMode = ref(false)
const isFullscreen = ref(false)
const slideWrapper = ref(null)

// 加载幻灯片组件
const slides = [
  markRaw(defineAsyncComponent(() => import('../components/slides/Slide1.vue'))),
  markRaw(defineAsyncComponent(() => import('../components/slides/Slide2.vue'))),
  markRaw(defineAsyncComponent(() => import('../components/slides/Slide3.vue'))),
  markRaw(defineAsyncComponent(() => import('../components/slides/Slide4.vue'))),
  markRaw(defineAsyncComponent(() => import('../components/slides/Slide5.vue'))),
  markRaw(defineAsyncComponent(() => import('../components/slides/Slide6.vue'))),
  // 添加更多幻灯片
]

// 切换到下一张幻灯片
const nextSlide = () => {
  if (currentSlide.value < slides.length - 1) {
    currentSlide.value++
  }
}

// 切换到上一张幻灯片
const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

// 进入全屏模式
const enterFullscreen = () => {
  if (slideWrapper.value.requestFullscreen) {
    slideWrapper.value.requestFullscreen()
  } else if (slideWrapper.value.mozRequestFullScreen) {
    slideWrapper.value.mozRequestFullScreen()
  } else if (slideWrapper.value.webkitRequestFullscreen) {
    slideWrapper.value.webkitRequestFullscreen()
  } else if (slideWrapper.value.msRequestFullscreen) {
    slideWrapper.value.msRequestFullscreen()
  }
}

// 退出全屏模式
const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }
}

// 切换主题
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
}

// 键盘导航
const handleKeyDown = (event) => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft' || 
      event.key === 'ArrowUp' || event.key === 'ArrowDown' || 
      event.key === ' ' || event.key === 'Escape') {
    event.preventDefault()
  }
  
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown' || event.key === ' ') {
    nextSlide()
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    prevSlide()
  } else if (event.key === 'Escape' && isFullscreen.value) {
    exitFullscreen()
  }
}

// 监听全屏变化
const handleFullscreenChange = () => {
  isFullscreen.value = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)
}

// 调整幻灯片大小
const adjustSlideSize = () => {
  if (isFullscreen.value) return
  
  const contentArea = document.querySelector('.content-area')
  const wrapper = slideWrapper.value
  
  if (!contentArea || !wrapper) return
  
  // 获取可用空间（考虑内边距和控制按钮的高度）
  const controlsHeight = document.querySelector('.slide-controls')?.offsetHeight || 0
  const availableWidth = contentArea.clientWidth - 40 // 减去左右内边距
  const availableHeight = contentArea.clientHeight - 40 - controlsHeight // 减去上下内边距和控制按钮高度
  
  // 幻灯片原始尺寸
  const originalWidth = 960
  const originalHeight = 540
  
  // 计算缩放比例（取宽度和高度缩放比例的较小值）
  const widthRatio = availableWidth / originalWidth
  const heightRatio = availableHeight / originalHeight
  const scale = Math.min(widthRatio, heightRatio, 1) // 限制最大缩放为1
  
  // 应用缩放
  wrapper.style.transform = `scale(${scale})`
}

// 生命周期钩子
onMounted(() => {
  // 添加键盘事件监听
  window.addEventListener('keydown', handleKeyDown)
  
  // 添加全屏变化监听
  document.addEventListener('fullscreenchange', handleFullscreenChange)
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
  document.addEventListener('mozfullscreenchange', handleFullscreenChange)
  document.addEventListener('MSFullscreenChange', handleFullscreenChange)
  
  // 检测系统主题
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  isDarkMode.value = prefersDark

  // 添加窗口大小变化监听
  window.addEventListener('resize', adjustSlideSize)
  
  // 初始调整幻灯片大小
  setTimeout(adjustSlideSize, 100) // 延迟执行以确保DOM已完全渲染
})

onUnmounted(() => {
  // 移除事件监听
  window.removeEventListener('keydown', handleKeyDown)
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
  document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
  document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
  document.removeEventListener('MSFullscreenChange', handleFullscreenChange)
  window.removeEventListener('resize', adjustSlideSize)
})
</script>

<style scoped>
.presentation-layout {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #f5f5f5;
  color: #333;
}

.dark-mode {
  background-color: #1a1a1a;
  color: #f5f5f5;
}

/* 左侧导航栏 */
.sidebar {
  width: 250px;
  height: 100%;
  background-color: #ffffff;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.dark-mode .sidebar {
  background-color: #252525;
  border-right-color: #333;
}

.sidebar-header {
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dark-mode .sidebar-header {
  border-bottom-color: #333;
}

.sidebar-title {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
}

.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  padding: 5px;
  border-radius: 4px;
}

.theme-toggle:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.dark-mode .theme-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.slide-thumbnails {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.slide-thumbnail {
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.slide-thumbnail:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.dark-mode .slide-thumbnail:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.slide-thumbnail.active {
  background-color: rgba(0, 120, 212, 0.1);
}

.dark-mode .slide-thumbnail.active {
  background-color: rgba(0, 120, 212, 0.2);
}

.thumbnail-number {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  margin-right: 12px;
}

.dark-mode .thumbnail-number {
  background-color: #444;
}

.slide-thumbnail.active .thumbnail-number {
  background-color: #0078d4;
  color: white;
}

.thumbnail-preview {
  flex: 1;
  font-size: 14px;
}

.sidebar-footer {
  padding: 16px;
  border-top: 1px solid #e0e0e0;
}

.dark-mode .sidebar-footer {
  border-top-color: #333;
}

.fullscreen-button {
  width: 100%;
  padding: 10px;
  background-color: #0078d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
}

.fullscreen-button:hover {
  background-color: #006cbe;
}

/* 右侧内容区 */
.content-area {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f5f5f5;
  overflow: hidden;
}

.content-area.fullscreen-mode {
  padding: 0;
  background-color: #000;
}

.dark-mode .content-area {
  background-color: #1a1a1a;
}

.slide-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
}

.control-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #e0e0e0;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #333;
  transition: all 0.2s;
}

.dark-mode .control-button {
  background-color: #252525;
  border-color: #444;
  color: #f5f5f5;
}

.control-button:hover:not(:disabled) {
  background-color: #f0f0f0;
}

.dark-mode .control-button:hover:not(:disabled) {
  background-color: #333;
}

.control-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.slide-counter {
  font-size: 14px;
  margin: 0 10px;
}

.slide-display {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.slide-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.slide-wrapper {
  width: 960px;
  height: 540px;
  position: relative;
  background-color: #000000;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  transform-origin: center center;
}

.content-area.fullscreen-mode .slide-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.content-area.fullscreen-mode .slide-wrapper {
  width: 960px;
  height: 540px;
  transform: scale(1) !important;
  border-radius: 0;
  box-shadow: none;
}

.dark-mode .slide-wrapper {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.slide {
  width: 100%;
  height: 100%;
  background-color: #000000;
}

/* 全屏模式下的右上角退出按钮 */
.exit-fullscreen-button {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  transition: background-color 0.2s;
}

.exit-fullscreen-button:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

/* 全屏模式下的左下角退出按钮 */
.exit-fullscreen-button-bottom-left {
  position: absolute;
  bottom: 20px;
  left: 20px;
  height: 40px;
  padding: 0 15px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  z-index: 100;
  transition: background-color 0.2s;
  font-size: 14px;
}

.exit-fullscreen-button-bottom-left:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

/* 全屏模式下的导航指示器 */
.fullscreen-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  padding: 5px 15px;
  z-index: 100;
}

.slide-counter-fullscreen {
  color: white;
  font-size: 14px;
}
</style> 