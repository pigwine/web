<template>
  <div class="slide-container">
    <div class="slide-header">
      <div class="slide-number">01-3</div>
      <div class="slide-title">价格分析 <span class="subtitle-text">: 降价梯度与用户付费意愿对比</span></div>
    </div>
    
    <div class="charts-container">
      <div class="chart-section">
        <div class="chart-header">
          <div class="chart-icon"></div>
          <div class="chart-title">01 降价梯度分析</div>
          <div class="chart-subtitle">: 不同产品类别的降价策略效果</div>
        </div>
        
        <div class="chart-content">
          <div class="stair-chart">
            <div class="stair-container">
              <div class="stair green-stair"></div>
              <div class="stair white-stair"></div>
              <div class="stair gray-stair"></div>
              <div class="stair green-bottom-stair"></div>
            </div>
            
            <div class="data-cards">
              <div class="data-card">
                <div class="card-dot">
                  <div class="dot-circle"></div>
                </div>
                <div class="card-content">
                  <div class="card-icon money-icon"></div>
                  <div class="card-text">
                    <div class="card-title">01 高端产品</div>
                    <div class="card-value">降价5%，销量提升12%</div>
                  </div>
                </div>
              </div>
              
              <div class="data-card">
                <div class="card-dot">
                  <div class="dot-circle"></div>
                </div>
                <div class="card-content">
                  <div class="card-icon bank-icon"></div>
                  <div class="card-text">
                    <div class="card-title">02 中端产品</div>
                    <div class="card-value">降价10%，销量提升25%</div>
                  </div>
                </div>
              </div>
              
              <div class="data-card">
                <div class="card-dot">
                  <div class="dot-circle"></div>
                </div>
                <div class="card-content">
                  <div class="card-icon chart-icon"></div>
                  <div class="card-text">
                    <div class="card-title">03 入门产品</div>
                    <div class="card-value">降价15%，销量提升40%</div>
                  </div>
                </div>
              </div>
              
              <div class="data-card">
                <div class="card-dot">
                  <div class="dot-circle"></div>
                </div>
                <div class="card-content">
                  <div class="card-icon scale-icon"></div>
                  <div class="card-text">
                    <div class="card-title">04 促销产品</div>
                    <div class="card-value">降价20%，销量提升60%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="chart-section">
        <div class="chart-header">
          <div class="chart-icon"></div>
          <div class="chart-title">02 用户付费意愿分析</div>
          <div class="chart-subtitle">: 价格变化与用户购买意愿背离度</div>
        </div>
        
        <div class="chart-content">
          <div class="bar-chart">
            <div class="y-axis">
              <div class="y-label">100%</div>
              <div class="y-label">80%</div>
              <div class="y-label">60%</div>
              <div class="y-label">40%</div>
              <div class="y-label">20%</div>
              <div class="y-label">0%</div>
              <div class="y-label">-20%</div>
              <div class="y-label">-40%</div>
            </div>
            
            <div class="chart-grid">
              <div class="grid-line"></div>
              <div class="grid-line"></div>
              <div class="grid-line"></div>
              <div class="grid-line"></div>
              <div class="grid-line center-line"></div>
              <div class="grid-line"></div>
              <div class="grid-line"></div>
            </div>
            
            <div class="x-axis">
              <div class="x-label">高端产品</div>
              <div class="x-label">中端产品</div>
              <div class="x-label">入门产品</div>
              <div class="x-label">促销产品</div>
            </div>
            
            <div class="bar-groups">
              <div class="bar-group">
                <div class="price-bar" style="height: 5%"></div>
                <div class="willingness-bar positive" style="height: 15%"></div>
              </div>
              
              <div class="bar-group">
                <div class="price-bar" style="height: 10%"></div>
                <div class="willingness-bar positive" style="height: 15%"></div>
              </div>
              
              <div class="bar-group">
                <div class="price-bar" style="height: 15%"></div>
                <div class="willingness-bar negative" style="height: 10%"></div>
              </div>
              
              <div class="bar-group">
                <div class="price-bar" style="height: 20%"></div>
                <div class="willingness-bar negative" style="height: 15%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="chart-legend">
      <div class="legend-item">
        <div class="legend-color price"></div>
        <div class="legend-text">降价幅度</div>
      </div>
      <div class="legend-item">
        <div class="legend-color willingness"></div>
        <div class="legend-text">付费意愿变化</div>
      </div>
    </div>
    
    <div class="conclusions-container">
      <div class="conclusion-item">
        <div class="conclusion-number">01 结论</div>
        <div class="conclusion-text">高端产品降价幅度小，但用户付费意愿提升显著，背离度为正。</div>
      </div>
      
      <div class="conclusion-item">
        <div class="conclusion-number">02 结论</div>
        <div class="conclusion-text">促销产品降价幅度大，但用户付费意愿反而下降，背离度为负。</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // 添加动画类
  setTimeout(() => {
    const stairs = document.querySelectorAll('.stair')
    stairs.forEach((stair, index) => {
      setTimeout(() => {
        stair.classList.add('animate-in')
      }, index * 200)
    })
    
    const dataCards = document.querySelectorAll('.data-card')
    dataCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate-in')
      }, 800 + index * 200)
    })
    
    const priceBars = document.querySelectorAll('.price-bar')
    priceBars.forEach((bar, index) => {
      setTimeout(() => {
        bar.classList.add('animate-in')
      }, 800 + index * 150)
    })
    
    const willingnessBars = document.querySelectorAll('.willingness-bar')
    willingnessBars.forEach((bar, index) => {
      setTimeout(() => {
        bar.classList.add('animate-in')
      }, 1200 + index * 150)
    })
    
    const conclusions = document.querySelectorAll('.conclusion-item')
    conclusions.forEach((conclusion, index) => {
      setTimeout(() => {
        conclusion.classList.add('animate-in')
      }, 2000 + index * 200)
    })
  }, 500)
})
</script>

<style scoped>
.slide-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 40px;
  background-color: #000;
  color: white;
  position: relative;
  overflow: hidden;
}

.slide-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.slide-number {
  font-size: 24px;
  font-weight: bold;
  margin-right: 15px;
}

.slide-title {
  font-size: 28px;
  font-weight: bold;
  color: #4AE290;
}

.subtitle-text {
  font-size: 20px;
  font-weight: normal;
  color: white;
}

.charts-container {
  display: flex;
  flex: 1;
  gap: 30px;
  margin-bottom: 30px;
}

.chart-section {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chart-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.chart-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #4AE290;
  margin-right: 10px;
}

.chart-title {
  font-size: 18px;
  font-weight: bold;
  margin-right: 5px;
}

.chart-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.chart-content {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 阶梯图表样式 */
.stair-chart {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.stair-container {
  width: 40%;
  height: 80%;
  position: relative;
  perspective: 800px;
}

.stair {
  position: absolute;
  width: 100%;
  left: 0;
  transform: translateZ(-50px) rotateX(15deg);
  transform-origin: center;
  opacity: 0;
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.stair.animate-in {
  opacity: 1;
  transform: translateZ(0) rotateX(15deg);
}

.green-stair {
  height: 25%;
  top: 0;
  background-color: #4AE290;
  border-radius: 5px 5px 0 0;
}

.white-stair {
  height: 25%;
  top: 25%;
  background-color: white;
}

.gray-stair {
  height: 25%;
  top: 50%;
  background-color: #888;
}

.green-bottom-stair {
  height: 25%;
  top: 75%;
  background-color: #4AE290;
  border-radius: 0 0 5px 5px;
}

.data-cards {
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5% 0;
}

.data-card {
  display: flex;
  align-items: center;
  opacity: 0;
  transform: translateX(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.data-card.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.card-dot {
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dot-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #4AE290;
}

.card-content {
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  border: 1px solid rgba(74, 226, 144, 0.3);
  flex: 1;
}

.card-icon {
  width: 24px;
  height: 24px;
  border-radius: 5px;
  background-color: #4AE290;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-text {
  flex: 1;
}

.card-title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 3px;
}

.card-value {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
}

/* 柱状图样式 */
.bar-chart {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0 40px;
}

.y-axis {
  position: absolute;
  left: 0;
  top: 10%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.y-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  transform: translateY(-50%);
}

.chart-grid {
  position: absolute;
  left: 40px;
  right: 40px;
  top: 10%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.grid-line {
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
}

.grid-line.center-line {
  background-color: rgba(255, 255, 255, 0.3);
}

.x-axis {
  position: absolute;
  left: 40px;
  right: 40px;
  bottom: 0;
  display: flex;
  justify-content: space-around;
}

.x-label {
  font-size: 12px;
  color: white;
  text-align: center;
}

.bar-groups {
  position: absolute;
  left: 40px;
  right: 40px;
  top: 10%;
  height: 80%;
  display: flex;
  justify-content: space-around;
}

.bar-group {
  width: 60px;
  height: 100%;
  position: relative;
}

.price-bar, .willingness-bar {
  position: absolute;
  width: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  transform: scaleY(0);
  transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.price-bar {
  left: 10px;
  bottom: 50%;
  transform-origin: bottom;
}

.willingness-bar {
  right: 10px;
  background-color: #4AE290;
}

.willingness-bar.positive {
  bottom: 50%;
  transform-origin: bottom;
}

.willingness-bar.negative {
  top: 50%;
  transform-origin: top;
}

.price-bar.animate-in, .willingness-bar.animate-in {
  transform: scaleY(1);
}

/* 新增独立的图例容器 */
.chart-legend {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 10px;
  margin-bottom: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
}

.legend-color {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border-radius: 3px;
}

.legend-color.price {
  background-color: rgba(255, 255, 255, 0.7);
}

.legend-color.willingness {
  background-color: #4AE290;
}

.legend-text {
  font-size: 14px;
  color: white;
}

/* 结论区域样式 */
.conclusions-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.conclusion-item {
  flex: 1;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  padding: 12px 15px;
  display: flex;
  align-items: center;
  border: 1px solid rgba(74, 226, 144, 0.3);
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.conclusion-item.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.conclusion-number {
  font-size: 14px;
  font-weight: bold;
  color: #4AE290;
  margin-right: 10px;
  white-space: nowrap;
}

.conclusion-text {
  font-size: 13px;
  color: white;
}

/* 响应式调整 */
@media (min-width: 1600px) {
  .slide-number {
    font-size: 28px;
  }
  
  .slide-title {
    font-size: 32px;
  }
  
  .subtitle-text {
    font-size: 24px;
  }
  
  .chart-title {
    font-size: 22px;
  }
  
  .chart-subtitle {
    font-size: 16px;
  }
  
  .card-title {
    font-size: 16px;
  }
  
  .card-value {
    font-size: 14px;
  }
  
  .x-label {
    font-size: 14px;
  }
  
  .conclusion-text {
    font-size: 15px;
  }
  
  .legend-text {
    font-size: 16px;
  }
}
</style> 