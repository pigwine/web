import axios from 'axios'

// 详细记录API配置信息
const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || 'http://148.135.56.176:8080'
console.log('API基础URL:', API_BASE_URL)

// 创建axios实例
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000, // 增加到120秒，因为OCR处理需要更长时间
  headers: {
    'Content-Type': 'multipart/form-data',
  }
})

// 详细的请求拦截器
apiClient.interceptors.request.use(config => {
  console.group('🚀 API请求详情')
  console.log('URL:', (config.baseURL || '') + (config.url || ''))
  console.log('方法:', config.method?.toUpperCase())
  console.log('超时设置:', config.timeout)
  console.log('请求头:', config.headers)
  
  // 添加授权token
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    console.log('授权: Bearer Token已添加')
  }
  
  if (config.data instanceof FormData) {
    console.log('请求类型: FormData')
    for (const pair of config.data.entries()) {
      if (pair[1] instanceof File) {
        const file = pair[1] as File
        console.log(`FormData字段 ${pair[0]}: 文件 "${file.name}" (${file.type}, ${file.size} 字节)`)
      } else {
        console.log(`FormData字段 ${pair[0]}: ${pair[1]}`)
      }
    }
  } else if (config.data) {
    console.log('请求数据:', config.data)
  }
  console.groupEnd()
  return config
}, error => {
  console.error('❌ 请求配置错误:', error)
  return Promise.reject(error)
})

// 详细的响应拦截器
apiClient.interceptors.response.use(
  response => {
    console.group('✅ API响应详情')
    console.log('状态:', response.status, response.statusText)
    console.log('响应头:', response.headers)
    console.log('响应数据:', response.data)
    console.groupEnd()
    return response
  },
  error => {
    console.group('❌ API错误详情')
    if (error.response) {
      // 服务器返回了错误状态码
      console.error('状态码:', error.response.status)
      console.error('响应头:', error.response.headers)
      console.error('响应数据:', error.response.data)
    } else if (error.request) {
      // 请求已发送但没有收到响应
      console.error('未收到响应。请求详情:', error.request)
      console.error('请求配置:', error.config)
      if (error.code === 'ECONNABORTED') {
        console.error('请求超时')
      }
    } else {
      // 请求配置有误
      console.error('请求配置错误:', error.message)
    }
    console.error('完整错误:', error)
    console.groupEnd()
    return Promise.reject(error)
  }
)

export async function recognizeText(file: File) {
  console.group('📝 OCR文本识别')
  console.log('开始处理文件:', file.name)
  console.log('文件类型:', file.type)
  console.log('文件大小:', file.size, '字节')
  
  const formData = new FormData()
  formData.append('file', file)
  
  try {
    console.log('发送识别请求...')
    console.time('识别请求耗时')
    const response = await apiClient.post('/api/upload', formData)
    console.timeEnd('识别请求耗时')
    
    console.log('识别请求成功，处理响应...')
    if (!response.data) {
      console.warn('警告: 响应缺少data字段')
    } else if (!response.data.text) {
      console.warn('警告: 响应缺少text字段', response.data)
    }
    
    console.log('识别完成!')
    console.groupEnd()
    return response.data
  } catch (error) {
    console.error('❌ OCR识别错误:', error)
    console.groupEnd()
    throw error
  }
}

export async function analyzeQuestion(text: string) {
  console.group('🔍 问题分析')
  console.log('开始分析文本:', text.slice(0, 100) + (text.length > 100 ? '...' : ''))
  console.log('文本长度:', text.length, '字符')
  
  try {
    console.log('发送分析请求...')
    console.time('分析请求耗时')
    const response = await apiClient.post('/api/analyze', { text })
    console.timeEnd('分析请求耗时')
    
    console.log('分析请求成功，处理响应...')
    if (!response.data) {
      console.warn('警告: 响应缺少data字段')
    }
    
    console.log('分析完成!')
    console.groupEnd()
    return response.data
  } catch (error) {
    console.error('❌ 问题分析错误:', error)
    console.groupEnd()
    throw error
  }
}

// 新增功能：保存错题
export async function saveErrorQuestion(data: {
  question_text: string;
  question_image?: string;
  options?: string[];
  correct_answer: string;
  student_answer?: string;
  analysis?: string;
  subject?: string;
  difficulty?: number;
  error_count?: number;
}) {
  console.group('💾 保存错题')
  console.log('错题数据:', data)
  
  try {
    // 处理数据，确保格式正确
    const processedData = {
      ...data,
      difficulty: parseInt(String(data.difficulty || 3), 10),
      error_count: parseInt(String(data.error_count || 1), 10),
      
      // 处理题目文本，如果是对象转为JSON字符串
      question_text: typeof data.question_text === 'object' 
        ? JSON.stringify(data.question_text) 
        : data.question_text,
        
      // 处理学科，如果是对象转为JSON字符串
      subject: typeof data.subject === 'object' 
        ? JSON.stringify(data.subject) 
        : data.subject || '未分类'
    };
    
    console.log('处理后的数据:', processedData)
    console.log('发送保存请求...')
    console.time('保存请求耗时')
    
    // 设置正确的 Content-Type
    const response = await axios({
      method: 'post',
      url: `${API_BASE_URL}/api/error-questions`,
      data: processedData,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : undefined
      }
    });
    
    console.timeEnd('保存请求耗时')
    
    console.log('保存请求成功，处理响应...')
    
    console.log('保存完成!')
    console.groupEnd()
    return response.data
  } catch (error) {
    console.error('❌ 错题保存错误:', error)
    console.groupEnd()
    throw error
  }
}

// 获取错题列表
export async function getErrorQuestions(params = {}) {
  console.group('📋 获取错题列表')
  console.log('查询参数:', params)
  
  try {
    console.log('发送查询请求...')
    console.time('查询请求耗时')
    const response = await apiClient.get('/api/error-questions', { params })
    console.timeEnd('查询请求耗时')
    
    // 转换API返回的数据结构为前端期望的格式
    const responseData = response.data;
    console.log('原始响应数据:', responseData);
    
    // 获取正确的数据列表
    const rawItems = responseData.data?.list || [];
    
    // 处理每个题目，解析JSON字符串或对象
    const items = rawItems.map((item: any) => {
      // 处理题目文本
      if (typeof item.question_text === 'string') {
        try {
          // 尝试解析JSON字符串
          const parsed = JSON.parse(item.question_text);
          if (parsed && typeof parsed === 'object') {
            item.question_text = parsed.String || JSON.stringify(parsed);
          }
        } catch (e) {
          // 如果解析失败，保持原样
        }
      } else if (typeof item.question_text === 'object' && item.question_text !== null) {
        item.question_text = item.question_text.String || JSON.stringify(item.question_text);
      }
      
      // 处理学科字段
      if (typeof item.subject === 'string') {
        try {
          // 尝试解析JSON字符串
          const parsed = JSON.parse(item.subject);
          if (parsed && typeof parsed === 'object') {
            item.subject = parsed.String || JSON.stringify(parsed);
          }
        } catch (e) {
          // 如果解析失败，保持原样
        }
      } else if (typeof item.subject === 'object' && item.subject !== null) {
        item.subject = item.subject.String || JSON.stringify(item.subject);
      }
      
      // 确保学科字段有值
      if (!item.subject || item.subject === 'undefined') {
        item.subject = '未分类';
      }
      
      // 确保难度字段是数字
      if (item.difficulty) {
        if (typeof item.difficulty === 'string') {
          try {
            item.difficulty = parseInt(item.difficulty, 10) || 3;
          } catch (e) {
            item.difficulty = 3;
          }
        } else if (typeof item.difficulty === 'object') {
          item.difficulty = 3;
        }
      } else {
        item.difficulty = 3;
      }
      
      return item;
    });
    
    // 提取所有不重复的学科
    const allSubjects = [...new Set(items.map((item: any) => item.subject).filter(Boolean))];
    
    const result = {
      items: items,
      total: responseData.data?.total || items.length,
      subjects: allSubjects.length > 0 ? allSubjects : ['未分类', '英语', '数学', '语文']
    };
    
    console.log('查询成功，返回数据条数:', result.items.length || 0)
    console.log('转换后的数据结构:', result)
    console.groupEnd()
    return result
  } catch (error) {
    console.error('❌ 获取错题列表错误:', error)
    console.groupEnd()
    throw error
  }
}

// 获取错题详情
export async function getErrorQuestionDetail(id: number) {
  console.group('🔎 获取错题详情')
  console.log('错题ID:', id)
  
  try {
    console.log('发送查询请求...')
    console.time('查询请求耗时')
    const response = await apiClient.get(`/api/error-questions/${id}`)
    console.timeEnd('查询请求耗时')
    
    // 转换API返回的数据结构为前端期望的格式
    const responseData = response.data;
    console.log('原始响应数据:', responseData);
    
    // 获取正确的数据
    let result = responseData.data || responseData;
    
    // 处理题目文本
    if (typeof result.question_text === 'string') {
      try {
        // 尝试解析JSON字符串
        const parsed = JSON.parse(result.question_text);
        if (parsed && typeof parsed === 'object') {
          result.question_text = parsed.String || JSON.stringify(parsed);
        }
      } catch (e) {
        // 如果解析失败，保持原样
      }
    } else if (typeof result.question_text === 'object' && result.question_text !== null) {
      result.question_text = result.question_text.String || JSON.stringify(result.question_text);
    }
    
    // 处理学科字段
    if (typeof result.subject === 'string') {
      try {
        // 尝试解析JSON字符串
        const parsed = JSON.parse(result.subject);
        if (parsed && typeof parsed === 'object') {
          result.subject = parsed.String || JSON.stringify(parsed);
        }
      } catch (e) {
        // 如果解析失败，保持原样
      }
    } else if (typeof result.subject === 'object' && result.subject !== null) {
      result.subject = result.subject.String || JSON.stringify(result.subject);
    }
    
    // 确保学科字段有值
    if (!result.subject || result.subject === 'undefined') {
      result.subject = '未分类';
    }
    
    // 确保难度字段是数字
    if (result.difficulty) {
      if (typeof result.difficulty === 'string') {
        try {
          result.difficulty = parseInt(result.difficulty, 10) || 3;
        } catch (e) {
          result.difficulty = 3;
        }
      } else if (typeof result.difficulty === 'object') {
        result.difficulty = 3;
      }
    } else {
      result.difficulty = 3;
    }
    
    console.log('查询成功')
    console.log('转换后的数据:', result)
    console.groupEnd()
    return result
  } catch (error) {
    console.error('❌ 获取错题详情错误:', error)
    console.groupEnd()
    throw error
  }
}

// 删除错题
export async function deleteErrorQuestion(id: number) {
  console.group('🗑️ 删除错题')
  console.log('错题ID:', id)
  
  try {
    console.log('发送删除请求...')
    console.time('删除请求耗时')
    const response = await apiClient.delete(`/api/error-questions/${id}`)
    console.timeEnd('删除请求耗时')
    
    console.log('删除成功')
    console.groupEnd()
    return response.data
  } catch (error) {
    console.error('❌ 删除错题错误:', error)
    console.groupEnd()
    throw error
  }
}