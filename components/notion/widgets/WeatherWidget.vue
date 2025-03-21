<template>
  <div class="weather-widget" :class="{ 'dark-mode': isDarkMode }" ref="widgetRef">
    <!-- 加载状态 -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>正在获取天气数据...</p>
    </div>
    
    <!-- 错误消息 -->
    <div v-else-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    
    <!-- 天气内容 -->
    <div v-else class="weather-container">
      <!-- 主要天气信息 -->
      <div class="weather-main">
        <div class="location-info">
          <h2>{{ weatherData.location }}</h2>
          <p class="weather-description">{{ weatherData.now.text }}</p>
        </div>
        <div class="current-temp">
          <div class="temp">{{ computedWeatherData.currentTemp }}</div>
          <div class="high-low">
            <span>{{ computedWeatherData.feelsLike }}</span>
            <span>{{ computedWeatherData.tempRange }}</span>
          </div>
        </div>
      </div>
      
      <!-- 小时预报 -->
      <div v-if="formattedHourlyData.length" class="hourly-forecast">
        <div class="hour-item" v-for="(hour, index) in formattedHourlyData" :key="index">
          <div class="hour-time">{{ hour.time }}</div>
          <div class="hour-icon" v-html="hour.icon"></div>
          <div class="hour-temp">{{ hour.temp }}</div>
        </div>
      </div>
      
      <!-- 详细信息 -->
      <div class="weather-details">
        <div class="detail-row">
          <div class="detail-item">
            <div class="detail-label">湿度</div>
            <div class="detail-value">{{ computedWeatherData.humidity }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">风向</div>
            <div class="detail-value">{{ computedWeatherData.wind }}</div>
          </div>
        </div>
        <div class="detail-row">
          <div class="detail-item">
            <div class="detail-label">能见度</div>
            <div class="detail-value">{{ computedWeatherData.visibility }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">气压</div>
            <div class="detail-value">{{ computedWeatherData.pressure }}</div>
          </div>
        </div>
        <div class="detail-row">
          <div class="detail-item">
            <div class="detail-label">降水量</div>
            <div class="detail-value">{{ computedWeatherData.precipitation }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">云量</div>
            <div class="detail-value">{{ computedWeatherData.cloudCover }}</div>
          </div>
        </div>
      </div>
      
      <!-- 每日预报 -->
      <div v-if="formattedDailyData.length" class="daily-forecast">
        <div class="day-item" v-for="(day, index) in formattedDailyData" :key="index">
          <div class="day-name">{{ day.date }}</div>
          <div class="day-icon" v-html="day.icon"></div>
          <div class="day-temp">
            <span class="day-high">{{ day.tempMax }}</span>
            <span class="day-low">{{ day.tempMin }}</span>
          </div>
        </div>
      </div>
      
      <!-- 数据来源 -->
      <div class="data-source" v-if="formattedUpdateTime">
        <span>数据更新: {{ formattedUpdateTime }}</span>
        <span v-if="weatherData.refer?.sources">
          来源: {{ weatherData.refer.sources.join(', ') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

// 发送组件尺寸到父组件
const emit = defineEmits(['mounted'])

// 和风天气 API 配置
const WEATHER_API_BASE = 'https://devapi.qweather.com/v7'
const GEO_API_BASE = 'https://geoapi.qweather.com/v2'
const WEATHER_API_KEY = '1a1f7341b03745bd87567a091a82d7e8'

// 状态管理
const isLoading = ref(true)
const errorMessage = ref('')
const isDarkMode = ref(false)
const weatherData = ref({
  location: '获取位置中...',
  now: {
    obsTime: '',
    temp: '--',
    feelsLike: '--',
    icon: '999',
    text: '未知',
    wind360: '',
    windDir: '未知',
    windScale: '0',
    windSpeed: '0',
    humidity: '0',
    precip: '0',
    pressure: '1000',
    vis: '0',
    cloud: '0',
    dew: '0'
  },
  hourly: [],
  daily: [],
  updateTime: '',
  refer: {
    sources: [],
    license: []
  }
})

const hourlyForecast = ref([])
const dailyForecast = ref([])

// AQI文本和百分比计算
const aqiText = computed(() => {
  if (weatherData.value.now.aqi <= 50) return '优'
  if (weatherData.value.now.aqi <= 100) return '良'
  if (weatherData.value.now.aqi <= 150) return '轻度污染'
  if (weatherData.value.now.aqi <= 200) return '中度污染'
  if (weatherData.value.now.aqi <= 300) return '重度污染'
  return '严重污染'
})

const aqiPercentage = computed(() => {
  return Math.min(weatherData.value.now.aqi / 3, 100)
})

// 获取用户位置
const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('浏览器不支持地理位置功能'))
      return
    }

    const options = {
      enableHighAccuracy: true, // 高精度
      timeout: 5000,           // 超时时间
      maximumAge: 0           // 不使用缓存
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        console.log('完整的位置信息:', position)
        
        const coords = position.coords
        // 获取更多位置信息
        const latitude = coords.latitude
        const longitude = coords.longitude
        const accuracy = coords.accuracy
        
        // 如果浏览器支持，可能还会提供以下信息
        const altitude = coords.altitude
        const altitudeAccuracy = coords.altitudeAccuracy
        const heading = coords.heading
        const speed = coords.speed

        resolve({
          latitude,
          longitude,
          accuracy,
          // 其他可用信息
          altitude,
          altitudeAccuracy,
          heading,
          speed
        })
      },
      (error) => {
        console.error('获取位置失败:', error)
        switch(error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error('用户拒绝了位置请求'))
            break
          case error.POSITION_UNAVAILABLE:
            reject(new Error('位置信息不可用'))
            break
          case error.TIMEOUT:
            reject(new Error('获取位置超时'))
            break
          default:
            reject(new Error('获取位置时发生未知错误'))
        }
      },
      options
    )
  })
}

// 获取城市信息
const getCityInfo = async (longitude, latitude) => {
  try {
    const location = `${longitude},${latitude}`
    const url = `${GEO_API_BASE}/city/lookup?location=${location}&key=${WEATHER_API_KEY}`
    
    console.log('正在请求城市信息:', url)
    
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`)
    }

    const data = await response.json()
    console.log('城市查询返回数据:', data)

    if (data.code === '200' && data.location && data.location.length > 0) {
      const cityInfo = data.location[0]
      // 返回地区名称，优先使用区县名称
      return cityInfo.name || cityInfo.adm2 || cityInfo.adm1 || '当前位置'
    }
    
    return '当前位置'
  } catch (error) {
    console.error('获取城市信息失败:', error)
    return '当前位置'
  }
}

// 获取天气数据
const getWeatherByCoords = async (latitude, longitude) => {
  try {
    // 获取城市信息
    const cityName = await getCityInfo(longitude, latitude)
    weatherData.value.location = cityName

    // 确保经纬度最多只有两位小数
    const lat = parseFloat(latitude.toFixed(2))
    const lon = parseFloat(longitude.toFixed(2))
    
    console.log(`正在使用坐标获取天气数据: 纬度 ${lat}, 经度 ${lon}`)
    
    // 获取实时天气
    const realTimeRes = await fetch(
      `${WEATHER_API_BASE}/weather/now?location=${lon},${lat}&key=${WEATHER_API_KEY}`
    )
    
    if (!realTimeRes.ok) {
      console.error(`实时天气API响应错误: ${realTimeRes.status} ${realTimeRes.statusText}`)
      throw new Error(`实时天气API响应错误: ${realTimeRes.status}`)
    }
    
    const realTimeData = await realTimeRes.json()
    console.log('实时天气数据:', realTimeData)
    
    if (realTimeData.code === '200') {
      // 更新天气数据
      weatherData.value = {
        ...weatherData.value,
        now: realTimeData.now,
        updateTime: realTimeData.updateTime,
        refer: realTimeData.refer
      }
      
      // 获取每小时预报
      try {
        const hourlyRes = await fetch(
          `${WEATHER_API_BASE}/weather/24h?location=${lon},${lat}&key=${WEATHER_API_KEY}`
        )
        
        if (hourlyRes.ok) {
          const hourlyData = await hourlyRes.json()
          console.log('每小时预报数据:', hourlyData)
          
          if (hourlyData.code === '200') {
            weatherData.value.hourly = hourlyData.hourly
          }
        }
      } catch (hourlyErr) {
        console.error('获取每小时预报失败:', hourlyErr)
      }
      
      // 获取7天预报
      try {
        const dailyRes = await fetch(
          `${WEATHER_API_BASE}/weather/7d?location=${lon},${lat}&key=${WEATHER_API_KEY}`
        )
        
        if (dailyRes.ok) {
          const dailyData = await dailyRes.json()
          console.log('每日预报数据:', dailyData)
          
          if (dailyData.code === '200') {
            weatherData.value.daily = dailyData.daily
          }
        }
      } catch (dailyErr) {
        console.error('获取每日预报失败:', dailyErr)
      }
      
      // 获取空气质量
      try {
        const aqiRes = await fetch(
          `${WEATHER_API_BASE}/air/now?location=${lon},${lat}&key=${WEATHER_API_KEY}`
        )
        
        if (aqiRes.ok) {
          const aqiData = await aqiRes.json()
          console.log('空气质量数据:', aqiData)
          
          if (aqiData.code === '200') {
            weatherData.value.air = aqiData.now
          }
        }
      } catch (aqiErr) {
        console.error('获取空气质量数据失败:', aqiErr)
      }
      
      isLoading.value = false
    } else {
      throw new Error(`天气API返回错误代码: ${realTimeData.code}`)
    }
  } catch (err) {
    console.error('获取天气数据失败:', err)
    errorMessage.value = '获取天气数据失败，请稍后再试'
    isLoading.value = false
  }
}

// 获取默认天气（北京）
const getDefaultWeather = async () => {
  try {
    // 北京的坐标
    await getWeatherByCoords(39.92, 116.41)
  } catch (err) {
    console.error('获取默认天气失败:', err)
    errorMessage.value = '无法获取天气数据'
    isLoading.value = false
  }
}

// 根据天气描述获取天气状况
const getWeatherCondition = (text) => {
  if (!text) return 'cloudy'
  
  // 晴天
  if (text.includes('晴') || text.includes('sunny') || text.includes('clear')) {
    return 'sunny'
  }
  
  // 雨天
  if (text.includes('雨') || text.includes('rain') || text.includes('drizzle') || text.includes('shower')) {
    return 'rainy'
  }
  
  // 默认多云
  return 'cloudy'
}

// 获取天气图标
const getWeatherIcon = (condition) => {
  const icons = {
    'sunny': '<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="5" fill="currentColor"/><path fill="currentColor" d="M12,2V4M12,20V22M4,12H2M6.34,6.34L4.93,4.93M17.66,6.34L19.07,4.93M22,12H20M17.66,17.66L19.07,19.07M6.34,17.66L4.93,19.07"/></svg>',
    'cloudy': '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M19,18H6A4,4 0 0,1 2,14A4,4 0 0,1 6,10H6.71C7.37,7.69 9.5,6 12,6A5.5,5.5 0 0,1 17.5,11.5V12H19A3,3 0 0,1 22,15A3,3 0 0,1 19,18Z"/></svg>',
    'rainy': '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M9,12C9.53,12.14 9.85,12.69 9.71,13.22L8.41,18.05C8.27,18.59 7.72,18.9 7.19,18.76C6.65,18.62 6.34,18.07 6.5,17.54L7.78,12.71C7.93,12.17 8.47,11.86 9,12M13,12C13.53,12.14 13.85,12.69 13.71,13.22L11.64,20.95C11.5,21.5 10.95,21.8 10.41,21.66C9.88,21.5 9.56,20.97 9.7,20.43L11.78,12.71C11.93,12.17 12.47,11.86 13,12M17,12C17.53,12.14 17.85,12.69 17.71,13.22L16.41,18.05C16.27,18.59 15.72,18.9 15.19,18.76C14.65,18.62 14.34,18.07 14.5,17.54L15.78,12.71C15.93,12.17 16.47,11.86 17,12M17,10V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11C3,12.11 3.6,13.08 4.5,13.6V13.59C5,13.87 5.14,14.5 4.87,14.96C4.59,15.43 4,15.6 3.5,15.32V15.33C2,14.47 1,12.85 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12C23,13.5 22.2,14.77 21,15.46V15.46C20.5,15.73 19.91,15.57 19.63,15.09C19.36,14.61 19.5,14 20,13.72V13.73C20.6,13.39 21,12.74 21,12A2,2 0 0,0 19,10H17Z"/></svg>'
  }
  
  return icons[condition] || icons['cloudy']
}

// 切换主题
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
}

// 设置默认天气数据
const setDefaultWeatherData = () => {
  weatherData.value = {
    location: '未知位置',
    now: {
      obsTime: '',
      temp: '--',
      feelsLike: '--',
      icon: '999',
      text: '无法获取实时天气数据',
      wind360: '',
      windDir: '未知',
      windScale: '0',
      windSpeed: '0',
      humidity: '0',
      precip: '0',
      pressure: '1000',
      vis: '0',
      cloud: '0',
      dew: '0'
    },
    hourly: [],
    daily: [],
    updateTime: new Date().toISOString(),
    refer: {
      sources: [],
      license: []
    }
  }

  hourlyForecast.value = Array(24).fill(null).map((_, i) => ({
    time: `${i}:00`,
    temp: 15,
    condition: 'cloudy'
  }))

  dailyForecast.value = ['周一', '周二', '周三', '周四', '周五'].map(day => ({
    name: day,
    high: 18,
    low: 12,
    condition: 'cloudy'
  }))
}

// 检测系统深色模式
const checkSystemDarkMode = () => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDarkMode.value = true
  }
  
  // 监听系统主题变化
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    isDarkMode.value = event.matches
  })
}

// 格式化时间 (将 "2020-06-30T21:40+08:00" 转换为 "21:40")
const formatTime = (timeString) => {
  try {
    return timeString.split('T')[1].substring(0, 5)
  } catch (e) {
    return timeString
  }
}

// 格式化日期 (将 "2020-06-30" 转换为 "周二")
const formatDay = (dateString) => {
  try {
    const date = new Date(dateString)
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return weekdays[date.getDay()]
  } catch (e) {
    return dateString
  }
}

// 格式化日期时间 (将 "2020-06-30T22:00+08:00" 转换为 "06-30 22:00")
const formatDateTime = (dateTimeString) => {
  try {
    const parts = dateTimeString.split('T')
    const date = parts[0].substring(5) // 取 "06-30"
    const time = parts[1].substring(0, 5) // 取 "22:00"
    return `${date} ${time}`
  } catch (e) {
    return dateTimeString
  }
}

// 可以添加一些计算属性来处理数据转换
const computedWeatherData = computed(() => {
  return {
    // 当前温度
    currentTemp: `${weatherData.value.now.temp}°`,
    // 体感温度
    feelsLike: `体感 ${weatherData.value.now.feelsLike}°`,
    // 当日温度范围
    tempRange: weatherData.value.daily && weatherData.value.daily.length > 0 
      ? `高 ${weatherData.value.daily[0].tempMax}° 低 ${weatherData.value.daily[0].tempMin}°`
      : '',
    // 湿度
    humidity: `${weatherData.value.now.humidity}%`,
    // 风向和风力
    wind: `${weatherData.value.now.windDir} ${weatherData.value.now.windScale}级`,
    // 能见度
    visibility: `${weatherData.value.now.vis} km`,
    // 气压
    pressure: `${weatherData.value.now.pressure} hPa`,
    // 降水量
    precipitation: `${weatherData.value.now.precip} mm`,
    // 云量
    cloudCover: `${weatherData.value.now.cloud}%`
  }
})

// 小时预报数据处理
const formattedHourlyData = computed(() => {
  return weatherData.value.hourly?.map(hour => ({
    time: formatTime(hour.fxTime),
    temp: `${hour.temp}°`,
    icon: getWeatherIcon(hour.icon, hour.text),
    text: hour.text
  })) || []
})

// 每日预报数据处理
const formattedDailyData = computed(() => {
  return weatherData.value.daily?.map(day => ({
    date: formatDay(day.fxDate),
    icon: getWeatherIcon(day.iconDay, day.textDay),
    tempMax: `${day.tempMax}°`,
    tempMin: `${day.tempMin}°`,
    text: day.textDay
  })) || []
})

// 更新时间格式化
const formattedUpdateTime = computed(() => {
  return weatherData.value.updateTime 
    ? formatDateTime(weatherData.value.updateTime)
    : ''
})

onMounted(async () => {
  // 通知父组件初始尺寸
  emit('mounted', {
    width: 320,
    height: 480
  })

  // 检测系统深色模式
  checkSystemDarkMode()
  
  try {
    const locationInfo = await getUserLocation()
    console.log('获取到的位置信息:', locationInfo)
    
    // 直接使用 "当前位置" 作为显示名称
    weatherData.value.location = '当前位置'
    
    // 获取天气数据
    await getWeatherByCoords(locationInfo.latitude, locationInfo.longitude)
  } catch (error) {
    console.error('位置获取失败:', error)
    errorMessage.value = '无法获取位置信息'
    await getDefaultWeather()
  }
})

// 组件卸载
onUnmounted(() => {
  // 清理事件监听器
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', () => {})
  }
})
</script>

<style scoped>
/* 关键修复：确保组件填满整个可用空间 */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.weather-widget {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: #333;
  background-color: #f7f7f7;
  border-radius: 16px;
  padding: 20px;
  width: 100%;
  height: 100%;
  min-height: 100vh; /* 确保至少填满视口高度 */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.weather-widget.dark-mode {
  background: linear-gradient(to bottom, #1c1c1e, #2c2c2e);
  color: #f5f5f7;
}

.weather-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* 主要天气信息 */
.weather-main {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.dark-mode .weather-main {
  border-bottom-color: rgba(255, 255, 255, 0.05);
}

.location-info h2 {
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  background: linear-gradient(135deg, #333, #666);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.dark-mode .location-info h2 {
  background: linear-gradient(135deg, #fff, #aaa);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.weather-description {
  margin: 8px 0 0;
  font-size: 15px;
  color: #666;
  max-width: 220px;
  line-height: 1.4;
}

.dark-mode .weather-description {
  color: #aaa;
}

.current-temp {
  text-align: right;
}

.temp {
  font-size: 56px;
  font-weight: 200;
  line-height: 1;
  background: linear-gradient(135deg, #333, #666);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.dark-mode .temp {
  background: linear-gradient(135deg, #fff, #aaa);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.high-low {
  margin-top: 8px;
  font-size: 15px;
  color: #666;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.dark-mode .high-low {
  color: #aaa;
}

/* 小时预报 */
.hourly-forecast-container {
  overflow-x: auto;
  margin: 0 -24px; /* 扩展到容器边缘 */
  padding: 0 24px;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

.hourly-forecast-container::-webkit-scrollbar {
  height: 4px;
}

.hourly-forecast-container::-webkit-scrollbar-track {
  background: transparent;
}

.hourly-forecast-container::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

.dark-mode .hourly-forecast-container::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
}

.hourly-forecast {
  display: flex;
  gap: 20px;
  padding: 8px 0 16px;
  min-width: max-content; /* 确保内容不会被压缩 */
}

.hour-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 50px;
  position: relative;
}

.hour-item:not(:last-child)::after {
  content: '';
  position: absolute;
  right: -10px;
  top: 50%;
  height: 70%;
  width: 1px;
  background: rgba(0, 0, 0, 0.05);
  transform: translateY(-50%);
}

.dark-mode .hour-item:not(:last-child)::after {
  background: rgba(255, 255, 255, 0.05);
}

.hour-time {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  font-weight: 500;
}

.dark-mode .hour-time {
  color: #aaa;
}

.hour-icon {
  margin: 6px 0;
  color: #0070f3;
  height: 28px;
  display: flex;
  align-items: center;
}

.dark-mode .hour-icon {
  color: #3694ff;
}

.hour-temp {
  font-size: 16px;
  font-weight: 600;
}

/* 详细信息 */
.weather-details {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.dark-mode .weather-details {
  background: rgba(30, 30, 32, 0.5);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.detail-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.detail-row:last-child {
  margin-bottom: 0;
}

.detail-item {
  width: 48%;
}

.detail-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  font-weight: 500;
}

.dark-mode .detail-label {
  color: #aaa;
}

.detail-value {
  font-size: 18px;
  font-weight: 600;
}

.aqi-indicator {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.aqi-bar {
  height: 6px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
  overflow: hidden;
}

.dark-mode .aqi-bar {
  background: rgba(255, 255, 255, 0.1);
}

.aqi-level {
  height: 100%;
  background: linear-gradient(to right, #4cd964, #ffcc00, #ff3b30);
  border-radius: 3px;
  transition: width 0.5s ease;
}

.aqi-text {
  font-size: 16px;
  font-weight: 600;
}

/* 每日预报 */
.daily-forecast {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 16px;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

.daily-forecast::-webkit-scrollbar {
  height: 4px;
}

.daily-forecast::-webkit-scrollbar-track {
  background: transparent;
}

.daily-forecast::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

.dark-mode .daily-forecast::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
}

.day-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 50px;
  position: relative;
}

.day-item:not(:last-child)::after {
  content: '';
  position: absolute;
  right: -10px;
  top: 50%;
  height: 70%;
  width: 1px;
  background: rgba(0, 0, 0, 0.05);
  transform: translateY(-50%);
}

.dark-mode .day-item:not(:last-child)::after {
  background: rgba(255, 255, 255, 0.05);
}

.day-name {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  font-weight: 500;
}

.dark-mode .day-name {
  color: #aaa;
}

.day-icon {
  margin: 6px 0;
  color: #0070f3;
  height: 28px;
  display: flex;
  align-items: center;
}

.dark-mode .day-icon {
  color: #3694ff;
}

.day-temp {
  font-size: 16px;
  font-weight: 600;
  display: flex;
  gap: 8px;
}

.day-high {
  color: #333;
}

.dark-mode .day-high {
  color: #fff;
}

.day-low {
  color: #666;
}

.dark-mode .day-low {
  color: #aaa;
}

/* 加载状态 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: #0070f3;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 错误消息 */
.error-message {
  color: #ff3b30;
  text-align: center;
  margin-top: 20px;
}

/* 数据来源 */
.data-source {
  text-align: right;
  font-size: 12px;
  color: #666;
}

.dark-mode .data-source {
  color: #aaa;
}

</style>