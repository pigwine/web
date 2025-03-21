<template>
  <div class="flip-clock-widget" :class="{ 'dark-mode': isDarkMode, 'fullscreen-mode': isFullscreen, 'timer-mode': isTimerMode }" ref="clockWidget">
    <div class="clock-container">
      <!-- 翻页时钟/番茄钟 -->
      <div class="flip-clock">
        <!-- 第一个卡片：小时/番茄钟小时 -->
        <div class="flip-card-container">
          <div class="am-pm-indicator" v-if="!isTimerMode && !is24Hour">{{ isPM ? 'PM' : 'AM' }}</div>
          <div class="flip-card">
            <span class="flip-card-value">{{ isTimerMode ? '00' : formattedHours }}</span>
          </div>
        </div>
        
        <!-- 第二个卡片：分钟/番茄钟分钟 -->
        <div class="flip-card-container">
          <div class="flip-card">
            <span class="flip-card-value">{{ isTimerMode ? timerMinutes : formattedMinutes }}</span>
          </div>
        </div>
        
        <!-- 第三个卡片：秒钟/番茄钟秒钟 -->
        <div class="flip-card-container">
          <div class="flip-card">
            <span class="flip-card-value">{{ isTimerMode ? timerSecondsFormatted : formattedSeconds }}</span>
          </div>
        </div>
      </div>
      
      <!-- 控制按钮 -->
      <div class="controls-container">
        <!-- 设置按钮 - 始终显示 -->
        <button class="control-button settings-button" :class="{ 'active': showControls }" @click="toggleControls">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </button>
        
        <!-- 第二层级控制按钮 - 仅在showControls为true且非番茄钟模式时显示 -->
        <template v-if="showControls && !isTimerMode">
          <!-- 主题切换按钮 -->
          <button class="control-button" @click="toggleTheme">
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
          
          <!-- 全屏模式切换按钮 -->
          <button class="control-button" @click="toggleFullscreen">
            <svg v-if="isFullscreen" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
            </svg>
          </button>
          
          <!-- 番茄钟模式切换按钮 -->
          <button class="control-button" @click="toggleTimerMode">
            <!-- 番茄图标 -->
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 6.1c2.3 0.5 4 2.5 4 4.9 0 4-3.6 7-8 7s-8-3-8-7c0-2.4 1.8-4.4 4-4.9"></path>
              <path d="M12 2v4"></path>
              <path d="M10 4h4"></path>
            </svg>
          </button>
          
          <!-- 时间格式切换按钮 -->
          <button class="control-button" @click="toggleTimeFormat">
            <span class="hour-format">{{ is24Hour ? '24h' : '12h' }}</span>
          </button>
        </template>
        
        <!-- 第三层级 - 番茄钟控制按钮 - 仅在isTimerMode为true且showControls为true时显示 -->
        <template v-if="isTimerMode && showControls">
          <button class="control-button" @click="timerRunning ? pauseTimer() : startTimer()">
            <svg v-if="!timerRunning" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          </button>
          
          <button class="control-button" @click="resetTimer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 2v6h6"></path>
              <path d="M21 12A9 9 0 0 0 6 5.3L3 8"></path>
              <path d="M21 22v-6h-6"></path>
              <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"></path>
            </svg>
          </button>
          
          <button class="control-button" @click="setTimer(25 * 60)">
            <span>25</span>
          </button>
          
          <button class="control-button" @click="setTimer(5 * 60)">
            <span>5</span>
          </button>
          
          <!-- 返回时钟模式按钮 - 使用番茄图标 -->
          <button class="control-button" @click="toggleTimerMode">
            <!-- 番茄图标 -->
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 6.1c2.3 0.5 4 2.5 4 4.9 0 4-3.6 7-8 7s-8-3-8-7c0-2.4 1.8-4.4 4-4.9"></path>
              <path d="M12 2v4"></path>
              <path d="M10 4h4"></path>
            </svg>
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClockWidget',
  data() {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPM: false,
      is24Hour: true,
      isDarkMode: false,
      showControls: false,
      isTimerMode: false,
      timerSeconds: 0,
      timerRunning: false,
      timerInterval: null,
      isFullscreen: false,
      timerMs: '00'
    };
  },
  computed: {
    formattedHours() {
      if (this.is24Hour) {
        return this.hours < 10 ? `0${this.hours}` : `${this.hours}`;
      } else {
        let h = this.hours % 12;
        h = h === 0 ? 12 : h;
        return h < 10 ? `0${h}` : `${h}`;
      }
    },
    formattedMinutes() {
      return this.minutes < 10 ? `0${this.minutes}` : `${this.minutes}`;
    },
    formattedSeconds() {
      return this.seconds < 10 ? `0${this.seconds}` : `${this.seconds}`;
    },
    timerMinutes() {
      const mins = Math.floor(this.timerSeconds / 60);
      return mins < 10 ? `0${mins}` : `${mins}`;
    },
    timerSecondsFormatted() {
      const secs = this.timerSeconds % 60;
      return secs < 10 ? `0${secs}` : `${secs}`;
    }
  },
  mounted() {
    this.updateTime();
    setInterval(this.updateTime, 1000);
    
    // 检查本地存储中的主题设置
    const savedTheme = localStorage.getItem('clockTheme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
    } else {
      // 默认跟随系统主题
      this.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    // 检查本地存储中的时间格式设置
    const savedFormat = localStorage.getItem('clockFormat');
    if (savedFormat) {
      this.is24Hour = savedFormat === '24h';
    }
    
    // 监听ESC键退出全屏
    document.addEventListener('keydown', this.handleKeyDown);
  },
  beforeUnmount() {
    // 清除计时器
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    
    // 移除事件监听器
    document.removeEventListener('keydown', this.handleKeyDown);
  },
  methods: {
    updateTime() {
      const now = new Date();
      this.hours = now.getHours();
      this.minutes = now.getMinutes();
      this.seconds = now.getSeconds();
      this.isPM = this.hours >= 12;
    },
    toggleControls() {
      this.showControls = !this.showControls;
    },
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('clockTheme', this.isDarkMode ? 'dark' : 'light');
    },
    toggleTimeFormat() {
      this.is24Hour = !this.is24Hour;
      localStorage.setItem('clockFormat', this.is24Hour ? '24h' : '12h');
    },
    toggleTimerMode() {
      this.isTimerMode = !this.isTimerMode;
      
      if (this.isTimerMode) {
        this.timerSeconds = 25 * 60; // 默认25分钟
        this.timerMs = '00';
      } else {
        this.pauseTimer();
      }
    },
    startTimer() {
      if (this.timerRunning) return;
      
      this.timerRunning = true;
      this.timerInterval = setInterval(() => {
        if (this.timerSeconds > 0) {
          this.timerSeconds--;
        } else {
          this.pauseTimer();
          // 可以添加计时结束的提示音或通知
        }
      }, 1000);
    },
    pauseTimer() {
      this.timerRunning = false;
      clearInterval(this.timerInterval);
    },
    resetTimer() {
      this.pauseTimer();
      this.timerSeconds = 25 * 60; // 重置为25分钟
      this.timerMs = '00';
    },
    setTimer(seconds) {
      this.pauseTimer();
      this.timerSeconds = seconds;
      this.timerMs = '00';
    },
    toggleFullscreen() {
      if (!this.isFullscreen) {
        this.enterFullscreen();
      } else {
        this.exitFullscreen();
      }
    },
    enterFullscreen() {
      const elem = this.$refs.clockWidget;
      
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
      }
      
      this.isFullscreen = true;
    },
    exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Chrome, Safari & Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
      }
      
      this.isFullscreen = false;
    },
    handleKeyDown(e) {
      if (e.key === 'Escape' && this.isFullscreen) {
        this.exitFullscreen();
      }
    }
  }
};
</script>

<style scoped>
.flip-clock-widget {
  --main-bg: #fff;
  --card-bg: #333;
  --card-text: #fff;
  --card-shadow: rgba(0, 0, 0, 0.2);
  --button-bg: #f5f5f5;
  --button-hover: #e0e0e0;
  --button-active: #d0d0d0;
  --button-text: #333;
  
  font-family: 'Arial', sans-serif;
  background-color: var(--main-bg);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.dark-mode {
  --main-bg: #121212;
  --card-bg: #222;
  --card-text: #eee;
  --card-shadow: rgba(0, 0, 0, 0.4);
  --button-bg: #333;
  --button-hover: #444;
  --button-active: #555;
  --button-text: #eee;
}

.fullscreen-mode {
  width: 100vw;
  height: 100vh;
  max-width: none;
  border-radius: 0;
  padding: 40px;
}

.fullscreen-mode .flip-clock {
  transform: scale(1.5);
  margin: 40px 0;
}

.clock-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.flip-clock {
  display: flex;
  gap: 10px;
  transition: transform 0.3s ease;
}

.flip-card-container {
  position: relative;
}

.am-pm-indicator {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 18px;
  font-weight: 600;
  color: var(--card-text);
  opacity: 0.8;
  z-index: 2;
}

.flip-card {
  width: 100px;
  height: 140px;
  background: var(--card-bg);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 15px var(--card-shadow);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dark-mode .flip-card {
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.flip-card-value {
  font-size: 80px;
  font-weight: 800;
  color: var(--card-text);
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

/* 控制按钮容器 */
.controls-container {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  justify-content: center;
  transition: all 0.3s ease;
}

.control-button {
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background: var(--button-bg);
  color: var(--button-text);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 8px var(--card-shadow);
  transition: transform 0.2s ease, background 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dark-mode .control-button {
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.control-button:hover {
  transform: translateY(-2px);
  background: var(--button-hover);
}

.control-button span {
  font-size: 16px;
  font-weight: 600;
  color: var(--button-text);
}

.hour-format {
  font-size: 14px;
  font-weight: 600;
}

/* 设置按钮特殊样式 */
.settings-button {
  position: relative;
}

.settings-button.active {
  background: var(--button-active);
}
</style>