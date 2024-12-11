<template>
  <div class="card bg-white">
    <div class="card-content">
      <div class="scene-container">
        <div class="scene">
          <div class="carousel-3d">
            <div 
              v-for="icon in icons" 
              :key="icon.position"
              :class="[
                'icon-container', 
                icon.containerClass,
                selectedIcon === icon ? 'selected' : ''
              ]"
              :style="getIconStyle(icon)"
              @click="handleIconClick(icon)"
            >
              <Icon 
                v-if="!icon.isText"
                :icon="icon.component"
                :class="icon.iconClass" 
              />
              <span v-else :class="icon.iconClass">
                {{ icon.component }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-6">
        <h3 class="text-lg font-semibold text-gray-800">
          {{ selectedIcon?.name || 'Select an AI Model' }}
        </h3>
        <p class="text-sm text-gray-600 mt-2">
          {{ selectedIcon?.description || 'Click on an AI model to learn more' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const selectedIcon = ref(null)
const rotationAngle = ref(0)

const icons = [
  { 
    component: 'simple-icons:openai',
    containerClass: 'h-20 w-20',
    iconClass: 'h-10 w-10 text-gray-800',
    name: 'GPT-4',
    description: 'OpenAI\'s most advanced AI model',
    position: 0,
    isText: false
  },
  { 
    component: 'ri:copilot-fill',
    containerClass: 'h-20 w-20',
    iconClass: 'h-10 w-10 text-gray-800',
    name: 'GitHub Copilot',
    description: 'Your AI programming companion',
    position: 1,
    isText: false
  },
  { 
    component: 'simple-icons:anthropic',
    containerClass: 'h-20 w-20',
    iconClass: 'h-10 w-10 text-gray-800',
    name: 'Claude',
    description: 'Anthropic\'s advanced AI assistant',
    position: 2,
    isText: false
  },
  { 
    component: 'xAI',
    containerClass: 'h-20 w-20',
    iconClass: 'text-2xl font-bold text-gray-800',
    name: 'xAI',
    description: 'Elon Musk\'s xAI assistant',
    position: 3,
    isText: true
  }
]

const getIconStyle = (icon) => {
  const baseAngle = (icon.position * 90 + rotationAngle.value) % 360
  const radian = (baseAngle * Math.PI) / 180
  const radius = 60

  const x = Math.sin(radian) * radius
  const z = Math.cos(radian) * 20
  
  const isCenter = Math.abs(x) < 10

  return {
    transform: `translateX(${x}px) translateZ(${z}px) scale(${isCenter ? 1.15 : 1})`,
    opacity: 1,
    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'absolute',
    top: '50%',
    marginTop: '-40px',
    boxShadow: isCenter 
      ? '0 0 20px rgba(72, 187, 120, 0.5), 0 0 40px rgba(72, 187, 120, 0.3), inset 0 0 10px rgba(72, 187, 120, 0.3)'
      : '0 2px 4px rgba(0, 0, 0, 0.05)',
    zIndex: isCenter ? 10 : 1
  }
}

const handleIconClick = (clickedIcon) => {
  if (selectedIcon.value === clickedIcon) return
  const currentPos = clickedIcon.position
  const rotationNeeded = -currentPos * 90
  rotationAngle.value = rotationNeeded
  selectedIcon.value = clickedIcon
}
</script>

<style scoped>
.card {
  max-width: 24rem;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 0.75rem;
  background-color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.card-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.scene-container {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.scene {
  position: relative;
  width: 200px;
  height: 80px;
  perspective: 800px;
  background-color: white;
}

.carousel-3d {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  cursor: pointer;
  transform-origin: center center;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes glow {
  0% {
    box-shadow: 0 0 20px rgba(72, 187, 120, 0.5),
                0 0 40px rgba(72, 187, 120, 0.3);
  }
  50% {
    box-shadow: 0 0 25px rgba(72, 187, 120, 0.6),
                0 0 50px rgba(72, 187, 120, 0.4);
  }
  100% {
    box-shadow: 0 0 20px rgba(72, 187, 120, 0.5),
                0 0 40px rgba(72, 187, 120, 0.3);
  }
}

.icon-container.selected {
  border-color: rgba(72, 187, 120, 0.5);
  animation: glow 2s infinite;
}

.icon-container:hover {
  box-shadow: 0 0 15px rgba(72, 187, 120, 0.4);
}
</style>
