# 双语内容生成标准文档

## 📋 目录
- [内容分级标准](#内容分级标准)
- [文件组织结构](#文件组织结构)
- [命名规范](#命名规范)
- [更新流程](#更新流程)
- [实际示例](#实际示例)
- [质量检查](#质量检查)

---

## 🎯 内容分级标准

### 🔥 一级内容（必须双语）
**特征：** 用户每次访问都会看到，直接影响用户体验

**包含内容：**
- 导航菜单项
- 按钮文字（登录、注册、搜索、保存等）
- 表单标签（邮箱、密码、确认密码等）
- 错误提示信息
- 成功提示信息
- 加载状态文字

**翻译要求：**
- ✅ 必须准确翻译
- ✅ 保持简洁明了
- ✅ 符合用户习惯
- ✅ 及时更新

### ⭐ 二级内容（重要双语）
**特征：** 影响用户理解和SEO效果

**包含内容：**
- 页面主标题
- 页面描述文字
- 功能介绍
- 分类名称
- 重要说明文字

**翻译要求：**
- ✅ 准确传达含义
- ✅ 考虑SEO关键词
- ✅ 保持专业性
- 🟡 可以适当本地化

### 📄 三级内容（选择性双语）
**特征：** 详细内容，可根据用户需求决定

**包含内容：**
- 工具详细说明
- 技术文档
- 使用教程
- 外部链接描述
- 版权信息

**翻译要求：**
- 🟡 根据用户反馈决定
- 🟡 可以保持英文为主
- 🟡 重点内容优先翻译

---

## 📁 文件组织结构

```
locales/
├── en.json                 # 英文主文件
├── zh.json                 # 中文主文件
├── common/                 # 通用内容
│   ├── buttons.json       # 按钮文字
│   ├── forms.json         # 表单相关
│   ├── messages.json      # 提示信息
│   └── navigation.json    # 导航相关
├── pages/                  # 页面专用内容
│   ├── home.json          # 首页内容
│   ├── tools.json         # 工具页面
│   ├── investment.json    # 投资页面
│   └── auth.json          # 登录注册
└── components/            # 组件专用内容
    ├── tool-card.json     # 工具卡片
    ├── search.json        # 搜索组件
    └── footer.json        # 页脚组件
```

---

## 🏷️ 命名规范

### 键名规范
```json
{
  "section": {
    "subsection": {
      "element": "翻译内容"
    }
  }
}
```

### 命名示例
```json
{
  "nav": {
    "main": {
      "home": "首页",
      "tools": "工具",
      "investment": "投资"
    },
    "user": {
      "login": "登录",
      "register": "注册",
      "logout": "退出"
    }
  },
  "buttons": {
    "actions": {
      "save": "保存",
      "cancel": "取消",
      "confirm": "确认"
    },
    "navigation": {
      "back": "返回",
      "next": "下一步",
      "previous": "上一步"
    }
  }
}
```

### 特殊情况命名
```json
{
  "forms": {
    "labels": {
      "email": "邮箱地址",
      "password": "密码",
      "confirmPassword": "确认密码"
    },
    "placeholders": {
      "emailPlaceholder": "请输入邮箱地址",
      "passwordPlaceholder": "请输入密码"
    },
    "validation": {
      "emailRequired": "邮箱地址不能为空",
      "passwordTooShort": "密码长度至少6位"
    }
  }
}
```

---

## 🔄 更新流程

### 新增内容流程
1. **评估优先级**
   ```
   问题清单：
   - 这个内容用户会经常看到吗？
   - 是否影响用户操作？
   - 对SEO有帮助吗？
   - 翻译工作量大吗？
   ```

2. **添加到语言文件**
   ```json
   // locales/en.json
   {
     "tools": {
       "search": {
         "placeholder": "Search tools...",
         "button": "Search",
         "noResults": "No tools found"
       }
     }
   }
   
   // locales/zh.json
   {
     "tools": {
       "search": {
         "placeholder": "搜索工具...",
         "button": "搜索",
         "noResults": "未找到工具"
       }
     }
   }
   ```

3. **在组件中使用**
   ```vue
   <template>
     <input 
       :placeholder="t('tools.search.placeholder')"
       v-model="searchQuery"
     />
     <button @click="search">
       {{ t('tools.search.button') }}
     </button>
   </template>
   
   <script setup>
   const { t } = useI18n()
   </script>
   ```

### 更新现有内容流程
1. **识别静态文本**
   ```vue
   <!-- 原来 -->
   <button>搜索工具</button>
   
   <!-- 改为 -->
   <button>{{ t('tools.search.button') }}</button>
   ```

2. **添加翻译键值**
3. **测试两种语言**
4. **更新文档记录**

---

## 💡 实际示例

### 示例1：工具页面搜索功能
```vue
<!-- components/tools/SearchBar.vue -->
<template>
  <div class="search-container">
    <input 
      v-model="searchQuery"
      :placeholder="t('tools.search.placeholder')"
      class="search-input"
    />
    <button 
      @click="handleSearch"
      class="search-button"
    >
      {{ t('tools.search.button') }}
    </button>
    
    <div v-if="noResults" class="no-results">
      {{ t('tools.search.noResults') }}
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n()
const searchQuery = ref('')
const noResults = ref(false)

const handleSearch = () => {
  // 搜索逻辑
}
</script>
```

### 示例2：表单验证
```vue
<!-- components/auth/LoginForm.vue -->
<template>
  <form @submit="handleLogin">
    <div class="form-group">
      <label>{{ t('auth.forms.email.label') }}</label>
      <input 
        v-model="email"
        :placeholder="t('auth.forms.email.placeholder')"
        type="email"
        required
      />
      <span v-if="emailError" class="error">
        {{ t('auth.forms.email.required') }}
      </span>
    </div>
    
    <button type="submit">
      {{ loading ? t('common.loading') : t('auth.forms.submit') }}
    </button>
  </form>
</template>
```

### 示例3：页面标题和SEO
```vue
<!-- pages/tools/index.vue -->
<script setup>
const { t } = useI18n()

// SEO设置
useHead({
  title: t('pages.tools.title'),
  meta: [
    {
      name: 'description',
      content: t('pages.tools.description')
    }
  ]
})
</script>

<template>
  <div>
    <h1>{{ t('pages.tools.heading') }}</h1>
    <p>{{ t('pages.tools.subtitle') }}</p>
  </div>
</template>
```

---

## ✅ 质量检查清单

### 翻译质量检查
- [ ] 翻译准确，无语法错误
- [ ] 符合目标用户的语言习惯
- [ ] 保持与界面风格一致
- [ ] 长度适合界面显示
- [ ] 考虑了文化差异

### 技术实现检查
- [ ] 所有静态文本都使用t()函数
- [ ] 键名遵循命名规范
- [ ] 两种语言都能正常显示
- [ ] 语言切换功能正常
- [ ] 没有遗漏的翻译项

### SEO优化检查
- [ ] 页面标题已双语化
- [ ] meta描述已双语化
- [ ] URL结构支持多语言
- [ ] hreflang标签正确设置

---

## 📊 内容优先级决策矩阵

| 内容类型 | 用户频率 | SEO影响 | 翻译难度 | 优先级 |
|---------|---------|---------|---------|--------|
| 导航菜单 | 高 | 高 | 低 | 🔥 立即 |
| 按钮文字 | 高 | 中 | 低 | 🔥 立即 |
| 页面标题 | 高 | 高 | 中 | ⭐ 重要 |
| 功能说明 | 中 | 高 | 中 | ⭐ 重要 |
| 工具介绍 | 中 | 中 | 高 | 📄 可选 |
| 技术文档 | 低 | 低 | 高 | 📄 可选 |

---

## 🔄 维护和更新

### 定期检查（每月）
1. 检查新增内容是否需要翻译
2. 根据用户反馈调整翻译质量
3. 更新优先级列表
4. 检查翻译的一致性

### 数据驱动决策
- 监控中文用户的页面停留时间
- 跟踪语言切换的使用频率
- 收集用户对翻译质量的反馈
- 分析哪些页面需要优先翻译

---

*最后更新：2024年12月*
*版本：v1.0*
