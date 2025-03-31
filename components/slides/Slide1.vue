<template>
  <div class="slide-container">
    <!-- 中央品牌内容 -->
    <div class="brand-container">
      <h1 class="brand-name">实习日记</h1>
      <div class="brand-divider"></div>
      <p class="brand-tagline">Overview of internships in trip.com</p>
    </div>
    
    <!-- 底部装饰元素 -->
    <div class="bottom-decoration">
      <div class="dot"></div>
      <div class="line"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>

<style scoped>
.slide-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #000000;
  color: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px;
  box-sizing: border-box;
}

/* 中央品牌内容 */
.brand-container {
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}

.brand-name {
  font-size: 80px;
  font-weight: 300;
  letter-spacing: 6px;
  margin: 0;
  line-height: 1;
  font-family: 'Times New Roman', serif;
}

.brand-divider {
  width: 80px;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.3);
  margin: 30px auto;
}

.brand-tagline {
  font-size: 24px;
  font-weight: 300;
  letter-spacing: 2px;
  word-spacing: 4px;
  opacity: 0.8;
  text-transform: uppercase;
  margin: 0;
}

/* 底部装饰 */
.bottom-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
}

.line {
  width: 40px;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.3);
  margin: 0 10px;
}
</style> 