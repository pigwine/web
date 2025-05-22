# 项目技术架构文档

## 基本信息

- **项目类型**: Nuxt 3 应用
- **兼容性日期**: 2024-04-03
- **前端框架**: Vue 3 (最新版)

## 核心技术栈

### 前端框架与库

| 技术 | 版本 | 用途 |
|------|------|------|
| Nuxt | 3.13.0 | 全栈框架 |
| Vue | 最新版 | 前端框架 |
| Vue Router | 最新版 | 路由管理 |
| Tailwind CSS | 3.4.15 | CSS 框架 |
| @nuxt/ui | 2.19.2 | UI 组件库 |
| @nuxt/content | 2.13.4 | 内容管理 |

### 后端与数据存储

| 技术 | 用途 |
|------|------|
| Supabase | 后端服务 (数据库、认证、存储) |

### 开发工具

| 技术 | 版本 | 用途 |
|------|------|
| TypeScript | 内置 | 类型安全 |
| PostCSS | 8.4.49 | CSS 处理器 |
| Autoprefixer | 10.4.20 | CSS 兼容性 |

### 集成服务

| 服务 | 用途 |
|------|------|
| Google Analytics | 网站分析 (ID: G-7XQQDM99W4) |
| Vercel Analytics | 性能监控 |

## 项目结构

```
项目根目录/
├── .nuxt/                  # Nuxt 构建文件
├── .output/                # 构建输出
├── components/             # 组件目录
│   ├── slides/             # 幻灯片相关组件
│   ├── notion/             # Notion 相关组件
│   ├── supabase/           # Supabase 相关组件
│   ├── investment/         # 投资相关组件
│   ├── books/              # 书籍相关组件
│   ├── tools/              # 工具相关组件
│   ├── common/             # 通用组件
│   ├── box/                # 盒子组件
│   └── ui/                 # UI 组件
├── pages/                  # 页面目录
│   ├── embed/              # 嵌入式页面
│   ├── widgets/            # 小部件页面
│   ├── auth/               # 认证相关页面
│   ├── news/               # 新闻相关页面
│   └── ... (各种页面文件)
├── layouts/                # 布局目录
├── plugins/                # 插件目录
│   ├── supabase.ts         # Supabase 插件
│   └── google-analytics.client.ts # Google Analytics 插件
├── public/                 # 公共资源
├── utils/                  # 工具函数
├── src/                    # 源代码
├── docs/                   # 文档
├── content/                # 内容
├── option/                 # 选项配置
├── scripts/                # 脚本
├── nuxt.config.ts          # Nuxt 配置
├── app.vue                 # 应用入口
├── error.vue               # 错误页面
├── tsconfig.json           # TypeScript 配置
├── package.json            # 包配置
├── tailwind.config.js      # Tailwind 配置
├── postcss.config.js       # PostCSS 配置
├── components.json         # 组件配置
├── .env                    # 环境变量
└── README.md               # 项目说明
```

## Supabase 集成

### 配置信息

- **Supabase URL**: https://qvclrjogqlwqaqkcjayq.supabase.co
- **Supabase Key**: 已配置在环境变量和插件中

### 功能实现

- **认证**: 通过 `components/supabase/Auth.vue` 组件实现
- **数据查询**: 通过 Supabase 客户端实现
- **插件配置**: 通过 `plugins/supabase.ts` 集成到 Nuxt 应用中

## 其他集成

### Google Analytics

- 配置在 `nuxt.config.ts` 中
- 使用客户端插件 `plugins/google-analytics.client.ts` 实现

### UI 框架

- 使用 Tailwind CSS 作为主要样式框架
- 使用 @nuxt/ui 提供额外组件
- 使用 nuxt-icon 提供图标支持

## 依赖管理

项目使用 npm 管理依赖，关键依赖包括：

- **核心包**: nuxt, vue, vue-router
- **UI 相关**: @nuxt/ui, @nuxtjs/tailwindcss, tailwindcss
- **后端服务**: @supabase/supabase-js
- **功能扩展**: @nuxt/content, html2canvas, reveal.js
- **图标支持**: @iconify/vue, nuxt-icon
- **分析工具**: @vercel/analytics

## 路由配置

- 使用 Nuxt 的文件系统路由
- 特殊路由规则:
  - `/auth/callback`: 禁用服务器端渲染

## 构建与部署

- **开发**: `npm run dev`
- **构建**: `npm run build`
- **生成静态站点**: `npm run generate`
- **预览**: `npm run preview`

## 注意事项

1. Supabase 凭证直接硬编码在代码和环境变量中，生产环境需要更安全的处理方式
2. 项目结构较为复杂，包含多个不同功能领域的组件
3. Google Analytics 配置需要考虑隐私政策合规性 