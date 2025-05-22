# OCR系统文件结构与功能说明

## 核心功能文件

### 认证相关

| 文件路径 | 功能描述 |
|---------|--------|
| `utils/auth.ts` | 认证工具函数，包含登录、注册、token管理等功能 |
| `pages/ocr-login.vue` | OCR系统登录页面 |
| `pages/ocr-register.vue` | OCR系统注册页面 |

### OCR功能相关

| 文件路径 | 功能描述 |
|---------|--------|
| `pages/ocr.vue` | OCR文本识别与分析主页面 |
| `utils/ocr-api.ts` | OCR API调用工具函数 |

### 错题管理相关

| 文件路径 | 功能描述 |
|---------|--------|
| `pages/error-questions.vue` | 错题列表页面 |
| `pages/error-questions/[id].vue` | 错题详情页面 |

## 组件文件

| 文件路径 | 功能描述 |
|---------|--------|
| `components/OcrUploader.vue` | 图片上传组件 |
| `components/OcrErrorQuestionSaver.vue` | 错题保存表单组件 |
| `components/OcrErrorQuestionList.vue` | 错题列表展示组件 |
| `components/OcrErrorQuestionFilter.vue` | 错题筛选组件 |
| `components/OcrErrorQuestionDetail.vue` | 错题详情展示组件 |

## 功能流程

### 用户认证流程

1. 用户访问OCR页面
2. 用户可以选择登录或注册
3. 登录/注册成功后，系统保存token和用户信息到localStorage
4. 用户可以在任何页面查看自己的登录状态和进行登出操作

### OCR识别流程

1. 用户上传图片
2. 系统进行OCR文字识别
3. 系统分析识别出的文本内容
4. 用户可以查看分析结果
5. 已登录用户可以保存错题到错题本

### 错题管理流程

1. 已登录用户可以查看自己的错题列表
2. 用户可以按学科、关键词等筛选错题
3. 用户可以查看错题详情
4. 用户可以删除错题

## API接口说明

| 接口路径 | 方法 | 功能描述 |
|---------|-----|--------|
| `/api/login` | POST | 用户登录 |
| `/api/register` | POST | 用户注册 |
| `/api/validate-token` | GET | 验证token有效性 |
| `/api/upload` | POST | 上传图片进行OCR识别 |
| `/api/analyze` | POST | 分析识别出的文本内容 |
| `/api/error-questions` | GET | 获取错题列表 |
| `/api/error-questions` | POST | 保存错题 |
| `/api/error-questions/:id` | GET | 获取错题详情 |
| `/api/error-questions/:id` | DELETE | 删除错题 |

## 用户界面流程

### 未登录状态

- 用户可以访问OCR识别页面并使用OCR功能
- 尝试保存错题时会提示登录
- 访问错题列表或详情页会显示登录提示，但不会强制跳转

### 已登录状态

- 用户可以在顶部导航栏看到自己的用户名
- 可以在OCR页面保存错题
- 可以访问和管理错题本

## 后续开发计划

1. 添加用户个人资料页面
2. 实现错题分享功能
3. 添加错题统计分析功能
4. 优化OCR识别准确率
5. 添加批量导入导出功能 