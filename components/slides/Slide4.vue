<template>
  <div class="slide-container">
    <div class="slide-header">
      <div class="slide-number">02</div>
      <div class="slide-title">工作职责</div>
    </div>
    
    <div class="content-grid">
      <div class="grid-item">
        <div class="item-number">1</div>
        <div class="icon-circle">
          <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.01 15.38C18.78 15.38 17.59 15.18 16.48 14.82C16.13 14.7 15.74 14.79 15.47 15.06L13.9 17.03C11.07 15.68 8.42 13.13 7.01 10.2L8.96 8.54C9.23 8.26 9.31 7.87 9.2 7.52C8.83 6.41 8.64 5.22 8.64 3.99C8.64 3.45 8.19 3 7.65 3H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21C20.72 21 21 20.37 21 19.82V16.37C21 15.83 20.55 15.38 20.01 15.38Z" fill="white"/>
          </svg>
        </div>
        
        <div class="item-title">日常旅游业态住宿排查</div>
        
        <div class="item-description">
          日常旅游业态住宿排查，维护价格合理状态，来保证营收合理最大化。
        </div>
      </div>
      
      <div class="grid-item white-bg">
        <div class="item-number">2</div>
        <div class="icon-circle green-bg">
          <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11Z" fill="black"/>
            <path d="M8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11Z" fill="black"/>
            <path d="M8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13Z" fill="black"/>
            <path d="M16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z" fill="black"/>
          </svg>
        </div>
        
        <div class="item-title black-text">拜访客户</div>
       
        <div class="item-description black-text">
          进行酒店业态环比升级，增加携程产品力，进行合规性常规性拜访。
        </div>
      </div>
      
      <div class="grid-item">
        <div class="item-number">3</div>
        <div class="icon-circle">
          <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 19V21H2V19H22Z" fill="white"/>
            <path d="M4 15H20V17H4V15Z" fill="white"/>
            <path d="M5 10C3.9 10 3 10.9 3 12V13H5V12H19V13H21V12C21 10.9 20.1 10 19 10H5Z" fill="white"/>
            <path d="M7 3H17V9H7V3Z" fill="white"/>
          </svg>
        </div>
        
        <div class="item-title">组织酒店培训</div>
      
        <div class="item-description">
          组织签约酒店行业内部培训，进行共享行业最新资讯和服务业态升级。
        </div>
      </div>
      
      <div class="grid-item white-bg">
        <div class="item-number">4</div>
        <div class="icon-circle green-bg">
          <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="black"/>
          </svg>
        </div>
        
        <div class="item-title black-text">携程内部产品库存服务复盘</div>
       
        <div class="item-description black-text">
          携程内部产品库存服务复盘，员工内部学习设立环比目标。
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 无需特殊逻辑
</script>

<style scoped>
.slide-container {
  width: 100%;
  height: 100%;
  background-color: #000;
  color: white;
  padding: 40px;
  font-family: 'Arial', sans-serif;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></svg>');
  background-size: 300px;
  background-repeat: repeat;
}

.slide-header {
  margin-bottom: 30px;
  flex-shrink: 0;
}

.slide-number {
  font-size: 24px;
  color: #4AE290;
  margin-bottom: 10px;
}

.slide-title {
  font-size: 40px;
  font-weight: bold;
  color: #4AE290;
  text-align: center;
  margin-top: 10px;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  flex: 1;
  align-items: stretch;
}

.grid-item {
  background-color: #4AE290;
  border-radius: 15px;
  padding: 20px;
  position: relative;
  color: black;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  overflow: hidden;
}

.grid-item:hover {
  transform: translateY(-5px);
}

.white-bg {
  background-color: white;
}

.item-number {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: black;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  z-index: 2;
}

.icon-circle {
  width: 80px;
  height: 80px;
  background-color: black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
}

.green-bg {
  background-color: #4AE290;
}

.icon {
  width: 50px;
  height: 50px;
}

.item-title {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 15px;
}

.black-text {
  color: black;
}

.item-description {
  font-size: 14px;
  line-height: 1.4;
  text-align: center;
  flex-grow: 1;
}
</style> 