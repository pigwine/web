// 认证工具函数
import axios from 'axios'

// 设置axios默认配置
const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || 'http://148.135.56.176:8080'
axios.defaults.baseURL = API_BASE_URL
console.log('认证API基础URL:', API_BASE_URL)

// 设置axios默认headers
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 检查用户是否已登录
export function isAuthenticated(): boolean {
  return !!localStorage.getItem('token')
}

// 获取当前用户信息
export function getCurrentUser(): any {
  const userStr = localStorage.getItem('user')
  if (!userStr) return null
  
  try {
    return JSON.parse(userStr)
  } catch (e) {
    console.error('解析用户信息失败:', e)
    return null
  }
}

// 保存用户信息
export function saveUserInfo(userData: {
  token: string;
  user_id: number;
  username: string;
  nickname?: string;
}): void {
  localStorage.setItem('token', userData.token)
  localStorage.setItem('user', JSON.stringify({
    id: userData.user_id,
    username: userData.username,
    nickname: userData.nickname || userData.username
  }))
}

// 登录
export async function login(username: string, password: string): Promise<any> {
  try {
    const response = await axios.post('/api/login', { username, password })
    
    if (response.data.code === 200) {
      saveUserInfo(response.data.data)
      return response.data.data
    } else {
      throw new Error(response.data.message || '登录失败')
    }
  } catch (err: any) {
    console.error('登录错误:', err)
    throw new Error(err.response?.data?.message || '登录失败，请稍后再试')
  }
}

// 注册
export async function register(userData: {
  username: string;
  password: string;
  nickname?: string;
}): Promise<any> {
  try {
    // 使用与测试页面相同的请求配置
    const response = await axios({
      method: 'post',
      url: '/api/register',
      data: userData,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    if (response.data.code === 200) {
      return response.data.data
    } else {
      throw new Error(response.data.message || '注册失败')
    }
  } catch (err: any) {
    console.error('注册错误:', err)
    throw new Error(err.response?.data?.message || '注册失败，请稍后再试')
  }
}

// 登出
export function logout(): void {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  // 可以在这里添加其他清理逻辑
}

// 检查token是否有效（可选，需要后端支持）
export async function validateToken(): Promise<boolean> {
  if (!isAuthenticated()) return false
  
  try {
    const response = await axios.get('/api/validate-token')
    return response.data.code === 200
  } catch (e) {
    console.error('验证token失败:', e)
    // 如果验证失败，清除无效token
    logout()
    return false
  }
} 