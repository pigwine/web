import { AQI_LEVELS } from './constants'

// 获取空气质量等级
export function getAqiLevel(aqi) {
  const levels = Object.keys(AQI_LEVELS)
    .map(Number)
    .sort((a, b) => a - b)
  
  for (const level of levels) {
    if (aqi <= level) {
      return AQI_LEVELS[level]
    }
  }
  return AQI_LEVELS[300]
}

// 格式化温度
export function formatTemperature(temp) {
  return Math.round(temp) + '°'
}

// 格式化时间
export function formatTime(timestamp) {
  const date = new Date(timestamp * 1000)
  return date.getHours().toString().padStart(2, '0') + ':00'
} 