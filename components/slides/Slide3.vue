<template>
    <div class="slide-container">
      <!-- 顶部品牌logo -->
      <div class="brands-header">
        <div v-for="(brand, index) in brands" 
             :key="brand.name"
             class="brand-item" 
             :class="{ active: activeIndex === index }" 
             @click="setActive(index)">
          <img :src="brand.logo" :alt="brand.name" class="brand-logo">
        </div>
      </div>
  
      <!-- 图片和描述展示区域 -->
      <div class="image-container">
        <transition-group name="fade">
          <div v-for="(brand, index) in brands"
               :key="brand.name"
               v-show="activeIndex === index"
               class="slide-content">
            <img :src="brand.image" 
                 :alt="brand.name" 
                 class="main-image">
            <div class="content-overlay">
              <div class="overlay-content">
                <img :src="brand.logo" :alt="brand.name" class="overlay-logo">
                <p class="description">{{ brand.description }}</p>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  
  const brands = [
    {
      name: 'Trip.com',
      logo: '/Trip.com.svg',
      image: '/brands/trip-com.jpg',
      description: 'Trip.com is an international one-stop travel service provider available in 24 languages across 39 countries and regions in 29 local currencies on 48 sites. Trip.com has an extensive hotel and flight network consisting of more than 1.2 million hotels and flights from over 480 airlines covering 2,600 airports in 200 countries and regions around the globe.'
    },
    {
      name: 'Ctrip',
      logo: '/Ctrip.svg',
      image: '/brands/ctrip.jpg',
      description: 'Founded in 1999, Ctrip is a leading provider of travel services including accommodation reservation, transportation ticketing, packaged tours and corporate travel management in China. It is the largest online travel agency in China and one of the largest travel service providers in the world.'
    },
    {
      name: 'Skyscanner',
      logo: '/Skyscanner.svg',
      image: '/brands/skyscanner.jpg',
      description: 'Founded in 2003, Skyscanner is a leading global travel marketplace. Available in over 30 languages and used by millions of travelers across 52 countries, Skyscanner helps people find the best travel options for flights, hotels and car hire every month.'
    },
    {
      name: 'Qunar',
      logo: '/QunarCN.svg',
      image: '/brands/qunar.jpg',
      description: 'Founded in 2005, Qunar is China\'s leading travel search engine. It provides real-time searches for flights, hotels, and vacation packages, helping Chinese travelers find the best travel options through its comprehensive search capabilities and innovative technology.'
    }
  ]
  
  const activeIndex = ref(0)
  let autoplayInterval = null
  
  const setActive = (index) => {
    activeIndex.value = index
    resetAutoplay()
  }
  
  const nextSlide = () => {
    activeIndex.value = (activeIndex.value + 1) % brands.length
  }
  
  const resetAutoplay = () => {
    clearInterval(autoplayInterval)
    autoplayInterval = setInterval(nextSlide, 5000)
  }
  
  onMounted(() => {
    resetAutoplay()
  })
  
  onBeforeUnmount(() => {
    clearInterval(autoplayInterval)
  })
  </script>
  
  <style>
  .slide-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #000;
    color: white;
    padding: 20px;
  }
  
  .brands-header {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
    margin-bottom: 30px;
  }
  
  .brand-item {
    cursor: pointer;
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }
  
  .brand-item:hover {
    opacity: 0.8;
  }
  
  .brand-item.active {
    opacity: 1;
  }
  
  .brand-logo {
    height: 40px;
    filter: brightness(0) invert(1);
  }
  
  .image-container {
    width: 100%;
    height: 500px;
    margin: 20px 0;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
  }
  
  .slide-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .main-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  
  .content-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 40px 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
    color: white;
  }
  
  .overlay-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 40px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .overlay-logo {
    height: 40px;
    margin-bottom: 20px;
    filter: brightness(0) invert(1);
  }
  
  .description {
    font-size: 1rem;
    line-height: 1.6;
    opacity: 0.9;
    margin: 0;
    text-align: left;
  }
  
  /* 淡入淡出动画 */
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
  }
  </style>