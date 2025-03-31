<template>
  <div class="slide-container">
    <div class="slide-header">
      <div class="neon-sign">
        <div class="neon-circle"></div>
        <div class="neon-text">工作成果</div>
      </div>
    </div>
    
    <div class="content-container">
      <div class="content-row">
        <div class="image-container">
          <img src="/ShanghaiH5.jpg" alt="办公楼" class="content-image" />
          <div class="dashed-line horizontal right"></div>
        </div>
        
        <div class="card green-bg">
          <div class="card-title">成果一</div>
          <div class="divider"></div>
          <div class="card-subtitle">第一项成果的简要描述</div>
          <div class="card-content">
            通过对酒店价格的合理调整，提高了旅游业态的整体收益，实现了营收同比增长15%。
          </div>
          <div class="search-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="black"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div class="dashed-line vertical center"></div>
      
      <div class="content-row">
        <div class="card white-bg">
          <div class="card-title">成果二</div>
          <div class="divider black-bg"></div>
          <div class="card-subtitle">第二项成果的简要描述</div>
          <div class="card-content">
            通过客户拜访和业态升级，建立了更稳固的合作关系，客户满意度提升了20%。
          </div>
          <div class="search-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="black"/>
            </svg>
          </div>
        </div>
        
        <div class="dashed-line horizontal left"></div>
        
        <div class="image-container">
          <img src="/InterviewNotesBanner.jpg" alt="会议室" class="content-image" />
        </div>
      </div>
    </div>
    
    <div class="footer">
      <div class="emphasis-container">
        <div class="emphasis-title">Emphasize</div>
        <div class="emphasis-divider"></div>
        <div class="emphasis-content">
          实习期间对于两个主要项目的参与，使我深入了解了 <span class="highlight">旅游行业的运营模式</span> 和 <span class="highlight">客户服务的重要性</span>。
          这些经验对我的职业发展非常有帮助。<span class="highlight">团队合作</span> 是我学到的最重要的技能。
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

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
        neonText.style.textShadow = `0 0 ${5 * intensity}px #4AE290, 0 0 ${10 * intensity}px #4AE290`
      }
      
      // 初始设置
      randomFlicker()
      
      // 定期闪烁
      setInterval(randomFlicker, 2000)
    }
  }
  
  flickerAnimation()
})
</script>

<style scoped>
.slide-container {
  width: 100%;
  height: 100%;
  background-color: #000;
  color: white;
  padding: 30px 40px;
  font-family: 'Arial', sans-serif;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.slide-header {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  flex-shrink: 0;
}

.neon-sign {
  display: flex;
  align-items: center;
  gap: 15px;
}

.neon-circle {
  width: 20px;
  height: 20px;
  background-color: #4AE290;
  border-radius: 50%;
  box-shadow: 0 0 10px #4AE290, 0 0 20px #4AE290;
}

.neon-text {
  font-size: 32px;
  font-weight: bold;
  color: #4AE290;
  text-shadow: 0 0 5px #4AE290, 0 0 10px #4AE290;
}

.content-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex: 1;
  max-width: 800px;
  margin: 0 auto;
}

.content-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  position: relative;
}

.image-container {
  width: 220px;
  height: 160px;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
}

.content-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card {
  border-radius: 15px;
  padding: 15px;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 160px;
  width: 220px;
}

.green-bg {
  background-color: #4AE290;
  color: black;
}

.white-bg {
  background-color: white;
  color: black;
}

.divider {
  width: 40px;
  height: 2px;
  background-color: white;
  margin: 5px 0 10px 0;
}

.black-bg {
  background-color: black;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
}

.card-subtitle {
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: bold;
}

.card-content {
  font-size: 13px;
  line-height: 1.4;
  flex-grow: 1;
  margin-right: 30px;
}

.search-icon {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  background-color: black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.white-bg .search-icon {
  background-color: #4AE290;
}

.search-icon svg {
  width: 14px;
  height: 14px;
  fill: white;
}

.dashed-line {
  position: absolute;
  border: 1px dashed rgba(255, 255, 255, 0.5);
}

.dashed-line.horizontal {
  width: 20px;
  height: 0;
  top: 50%;
}

.dashed-line.horizontal.right {
  right: -20px;
}

.dashed-line.horizontal.left {
  left: -20px;
}

.dashed-line.vertical {
  width: 0;
  height: 20px;
}

.dashed-line.vertical.center {
  left: 50%;
  height: 20px;
}

.footer {
  margin-top: auto;
  flex-shrink: 0;
}

.emphasis-container {
  background-color: #1A1A1A;
  border-radius: 15px;
  padding: 12px 15px;
  display: flex;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

.emphasis-title {
  font-size: 16px;
  font-weight: bold;
  color: #4AE290;
  margin-right: 15px;
  white-space: nowrap;
}

.emphasis-divider {
  width: 2px;
  height: 24px;
  background-color: #333;
  margin-right: 15px;
}

.emphasis-content {
  font-size: 13px;
  line-height: 1.4;
  flex: 1;
}

.highlight {
  color: #4AE290;
  font-weight: bold;
}
</style> 