#!/bin/bash

# 创建 docs 目录（如果不存在）
mkdir -p docs

# 生成导航站点结构文档
cat > docs/navigation.md << 'EOL'
# AI 导航站点结构

## 顶部导航栏
- Logo
- 搜索框
- 主题切换（暗/亮）

## 主要分类
### 聊天 AI
- ChatGPT
- Claude
- Gemini

### 编程助手
- GitHub Copilot
- Amazon CodeWhisperer
- Cursor

### 图像创作
- Midjourney
- DALL·E
- Stable Diffusion

### 视频制作
- Runway
- Pika
- HeyGen

### 语音合成
- ElevenLabs
- Coqui
- Murf

## 使用场景
- 办公效率
- 内容创作
- 代码开发
- 设计创意
- 学习教育

## 特色功能
- 免费工具
- 新品上线
- 热门推荐
- 本月精选

## 底部信息
- 关于本站
- 更新日志
- 联系方式
EOL

# 生成组件结构文档
cat > docs/components.md << 'EOL'
# 组件结构

## UI 组件
- CardDemo.vue - AI 模型展示卡片
- SearchBar.vue - 搜索组件
- CategoryTabs.vue - 分类标签
- AIToolDetail.vue - 工具详情

## 布局组件
- Header.vue - 头部导航
- Footer.vue - 页脚
- Container.vue - 内容容器

## 功能组件
- ToolCard.vue - 工具卡片
- ToolList.vue - 工具列表
- CategoryList.vue - 分类列表
EOL

# 生成目录结构文档
cat > docs/directory.md << 'EOL'
# 项目目录结构

</code_block_to_apply_changes_from> 