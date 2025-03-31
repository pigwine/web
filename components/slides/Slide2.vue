<template>
  <div class="slide-container">
    <div class="header">
      <div class="neon-sign">
        <div class="neon-circle"></div>
        <div class="neon-text">Contents</div>
      </div>
      <!-- 副标题已移除 -->
    </div>
    
    <div class="content-grid">
      <div class="grid-item" @click="setActive(0)" :class="{ active: activeIndex === 0 }">
        <div class="number"><span class="white">0</span><span class="green">1</span></div>
        <div class="title">集团构成</div>
        <div class="description">
          <div class="desc-item">· 公司简介</div>
          <div class="desc-item">· 组织架构</div>
          <div class="desc-item">· 业务范围</div>
        </div>
      </div>
      
      <div class="grid-item" @click="setActive(1)" :class="{ active: activeIndex === 1 }">
        <div class="number"><span class="white">0</span><span class="green">2</span></div>
        <div class="title">工作内容</div>
        <div class="description">
          <div class="desc-item">· 岗位职责</div>
          <div class="desc-item">· 日常工作</div>
          <div class="desc-item">· 技术栈</div>
        </div>
      </div>
      
      <div class="grid-item" @click="setActive(2)" :class="{ active: activeIndex === 2 }">
        <div class="number"><span class="white">0</span><span class="green">3</span></div>
        <div class="title">工作成果</div>
        <div class="description">
          <div class="desc-item">· 项目概述</div>
          <div class="desc-item">· 技术实现</div>
          <div class="desc-item">· 成果展示</div>
        </div>
      </div>
      
      <div class="grid-item" @click="setActive(3)" :class="{ active: activeIndex === 3 }">
        <div class="number"><span class="white">0</span><span class="green">4</span></div>
        <div class="title">联系方式</div>
        <div class="description">
          <div class="desc-item">· 个人信息</div>
          <div class="desc-item">· 联系方式</div>
          <div class="desc-item">· 社交媒体</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const activeIndex = ref(0)

const setActive = (index) => {
  activeIndex.value = index
}

onMounted(() => {
  // 添加闪烁效果
  const flickerAnimation = () => {
    const neonCircle = document.querySelector('.neon-circle')
    const neonText = document.querySelector('.neon-text')
    
    if (neonCircle && neonText) {
      // 随机闪烁效果
      const randomFlicker = () => {
        const intensity = 0.7 + Math.random() * 0.3
        neonCircle.style.opacity = intensity
        neonText.style.textShadow = `0 0 ${5 + Math.random() * 10}px #4AE290, 0 0 ${2 + Math.random() * 5}px #4AE290`
        
        setTimeout(randomFlicker, 100 + Math.random() * 1000)
      }
      
      randomFlicker()
    }
  }
  
  flickerAnimation()
})
</script>

<style>
.slide-container {
  width: 960px;
  height: 540px;
  background-color: #000;
  color: white;
  padding: 60px;
  font-family: 'Arial', sans-serif;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

.header {
  margin-bottom: 80px;
}

/* 霓虹灯标志样式 */
.neon-sign {
  display: flex;
  align-items: center;
}

.neon-circle {
  width: 24px;
  height: 24px;
  background-color: #4AE290;
  border-radius: 50%;
  margin-right: 16px;
  position: relative;
  top: -8px;
  box-shadow: 0 0 10px #4AE290, 0 0 20px #4AE290;
  animation: pulse 2s infinite;
}

.neon-text {
  font-size: 48px;
  font-weight: bold;
  color: white;
  text-shadow: 0 0 10px #4AE290, 0 0 20px #4AE290;
  animation: flicker 5s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 10px #4AE290, 0 0 20px #4AE290;
    opacity: 0.8;
  }
  50% {
    box-shadow: 0 0 15px #4AE290, 0 0 30px #4AE290, 0 0 40px #4AE290;
    opacity: 1;
  }
  100% {
    box-shadow: 0 0 10px #4AE290, 0 0 20px #4AE290;
    opacity: 0.8;
  }
}

@keyframes flicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    text-shadow: 0 0 10px #4AE290, 0 0 20px #4AE290, 0 0 30px #4AE290;
  }
  20%, 24%, 55% {
    text-shadow: none;
  }
}

/* 移除副标题样式 */
.subtitle {
  display: none;
}

.content-grid {
  display: flex;
  width: 840px;
  height: 320px;
}

.grid-item {
  width: 210px;
  height: 320px;
  border-right: 1px dashed rgba(255, 255, 255, 0.2);
  padding: 0 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.grid-item:last-child {
  border-right: none;
}

.grid-item:hover, .grid-item.active {
  transform: translateY(-10px);
}

.number {
  font-size: 120px;
  font-weight: bold;
  line-height: 1;
  margin-bottom: 20px;
  height: 120px;
}

.white {
  color: white;
}

.green {
  color: #4AE290;
}

.title {
  font-size: 36px;
  color: #4AE290;
  margin-bottom: 30px;
  position: relative;
  height: 60px;
}

.title::after {
  content: "";
  display: block;
  width: 40px;
  height: 4px;
  background-color: white;
  margin-top: 16px;
}

.description {
  font-size: 18px;
  height: 110px;
}

.desc-item {
  margin-bottom: 16px;
  line-height: 1.5;
}
</style>