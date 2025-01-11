<!-- components/tools/ToolList.vue -->
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- 搜索和标签部分 -->
    <div class="mb-16">
      <!-- 搜索框容器 -->
      <div class="w-full min-w-[300px] max-w-xl relative search-container mx-auto">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="点击搜索"
          class="w-full px-4 py-2 pl-10 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-200/50 transition-all duration-300"
          @click.stop="toggleTagSelector"
        />
        <svg
          class="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <!-- 热门标签容器 - 添加最小宽度 -->
        <div
          v-show="showTagSelector"
          class="tag-selector absolute left-0 right-0 top-full mt-1 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200/50 shadow-lg p-4 z-10 min-w-[300px]"
          @click.stop
        >
          <div class="flex justify-between items-center mb-3">
            <div class="text-sm text-gray-500">热门标签</div>
            <button 
              @click.stop="showFullTagList = !showFullTagList"
              class="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              {{ showFullTagList ? '收起' : '查看全部' }}
              <span class="inline-block transition-transform duration-200" 
                :class="showFullTagList ? 'rotate-180' : ''">
                ▼
              </span>
            </button>
          </div>
          
          <div class="flex flex-wrap gap-2">
            <button
              v-for="tag in (showFullTagList ? allTags : topTags)"
              :key="tag.name"
              @click.stop="toggleTag(tag.name)"
              class="px-3 py-1 rounded-full text-sm font-medium transition-all duration-200"
              :class="selectedTags.includes(tag.name)
                ? 'bg-blue-600/90 text-white hover:bg-blue-700/90'
                : 'bg-gray-100/80 text-gray-700 hover:bg-gray-200/80'"
            >
              {{ tag.name }} ({{ tag.count }})
            </button>
          </div>
        </div>
      </div>

      <!-- 已选标签 -->
      <div 
        v-if="selectedTags.length > 0" 
        class="flex flex-wrap gap-2 justify-center mt-4 w-full min-w-[300px] max-w-xl mx-auto"
      >
        <span
          v-for="tag in selectedTags"
          :key="tag"
          class="px-3 py-1 bg-blue-100/80 text-blue-600 rounded-full text-sm font-medium flex items-center gap-1 transition-all duration-200 hover:bg-blue-200/80"
        >
          {{ tag }}
          <button
            @click="removeTag(tag)"
            class="hover:text-blue-800 transition-colors duration-200"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </span>
      </div>
    </div>

    <!-- 工具列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="tool in paginatedTools"
        :key="tool._path"
        class="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col h-full"
      >
        <!-- 预览图片 -->
        <div class="preview-card rounded-t-xl overflow-hidden">
          <a :href="tool.url" target="_blank" rel="noopener noreferrer" 
             class="block relative preview-aspect">
            <img 
              :src="getPreviewImage(tool.url)"
              :alt="tool.title"
              class="w-full h-full object-cover"
              @error="handleImageError"
            />
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
            <div class="absolute bottom-3 left-3 text-white text-sm">
              {{ getDomain(tool.url) }}
            </div>
          </a>
        </div>

        <!-- 工具信息 -->
        <div class="p-6 flex-grow">
          <h3 class="text-2xl font-bold text-gray-900 mb-3">{{ tool.title }}</h3>
          <p class="text-lg text-gray-600 mb-4 line-clamp-2">{{ tool.description }}</p>
          <div class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="tag in tool.tags"
              :key="tag"
              class="px-3 py-1 text-sm font-medium bg-blue-50 text-blue-600 rounded-full"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- 底部按钮 -->
        <div class="p-6 pt-0 mt-auto">
          <a
            :href="tool.url"
            target="_blank"
            class="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>访问链接</span>
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- 分页控件和统计 -->
    <div v-if="totalPages > 1" class="mt-8">
      <!-- 分页统计信息 -->
      <div class="text-center mb-4 text-gray-600">
        第 {{ currentPage }}/{{ totalPages }} 页，共 {{ filteredTools.length }} 个工具
      </div>
      
      <!-- 分页按钮 -->
      <div class="flex justify-center space-x-2">
        <!-- 上一页按钮 -->
        <button
          @click="currentPage > 1 && (currentPage--)"
          :disabled="currentPage === 1"
          class="px-4 py-2 rounded-lg transition-colors"
          :class="currentPage === 1 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
        >
          上一页
        </button>
        
        <!-- 页码按钮 -->
        <button
          v-for="page in totalPages"
          :key="page"
          @click="currentPage = page"
          class="px-4 py-2 rounded-lg transition-colors"
          :class="page === currentPage 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
        >
          {{ page }}
        </button>
        
        <!-- 下一页按钮 -->
        <button
          @click="currentPage < totalPages && (currentPage++)"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 rounded-lg transition-colors"
          :class="currentPage === totalPages 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
        >
          下一页
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

// 直接在 ToolList 组件中获取数据
const { data: tools } = await useAsyncData('tools', () => 
  queryContent('tools').find()
)

const searchQuery = ref('')
const selectedTags = ref([])
const showTagSelector = ref(false)
const showFullTagList = ref(false)

// 存储收藏状态的 ref
const favoriteTools = ref(new Set())

// 初始化收藏状态
onMounted(() => {
  // 从 localStorage 读取收藏数据
  const savedFavorites = JSON.parse(localStorage.getItem('favoriteTools') || '[]')
  favoriteTools.value = new Set(savedFavorites)
  
  // 更新工具列表的收藏状态
  if (tools.value) {
    tools.value.forEach(tool => {
      tool.isFavorite = favoriteTools.value.has(tool._path)
    })
  }
})

// 计算所有标签的出现次数
const tagCounts = computed(() => {
  if (!tools.value) return {}
  const counts = {}
  tools.value.forEach(tool => {
    tool.tags?.forEach(tag => {
      counts[tag] = (counts[tag] || 0) + 1
    })
  })
  return counts
})

// 标签切换功能
const toggleTag = (tagName) => {
  const index = selectedTags.value.indexOf(tagName)
  if (index === -1) {
    selectedTags.value.push(tagName)
  } else {
    selectedTags.value.splice(index, 1)
  }
  // 选择标签后保持标签选择器显示
  showTagSelector.value = true
}

// 移除标签
const removeTag = (tag) => {
  const index = selectedTags.value.indexOf(tag)
  if (index !== -1) {
    selectedTags.value.splice(index, 1)
  }
}

// 修改搜索监听，只处理搜索逻辑
watch(searchQuery, (newValue) => {
  // 只在这里处理搜索逻辑
  currentPage.value = 1
})

// 改进的搜索过滤功能
const filteredTools = computed(() => {
  if (!tools.value) return []
  
  let filtered = tools.value
  
  // 应用标签筛选
  if (selectedTags.value.length > 0) {
    filtered = filtered.filter(tool => 
      selectedTags.value.every(tag => tool.tags?.includes(tag))
    )
  }
  
  // 应用搜索查询
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(tool => 
      tool.title?.toLowerCase().includes(query) ||
      tool.description?.toLowerCase().includes(query) ||
      tool.tags?.some(tag => tag.toLowerCase().includes(query))
    )
  }
  
  return filtered
})

// 分页相关
const itemsPerPage = 9 // 每页显示9个工具
const currentPage = ref(1)

// 计算总页数
const totalPages = computed(() => {
  return Math.ceil(filteredTools.value.length / itemsPerPage)
})

// 获取当前页的工具
const paginatedTools = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredTools.value.slice(start, end)
})

// 监听筛选条件变化，重置页码
watch([searchQuery, selectedTags], () => {
  currentPage.value = 1
})

// 切换标签选择器的显示状态
const toggleTagSelector = () => {
  showTagSelector.value = !showTagSelector.value
}

// 点击外部关闭标签选择器
const handleClickOutside = (event) => {
  const searchContainer = document.querySelector('.search-container')
  if (searchContainer && !searchContainer.contains(event.target)) {
    showTagSelector.value = false
  }
}

// 添加点击外部关闭的事件监听
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 获取预览图的函数
const getPreviewImage = (url) => {
  // 方案1：使用 Microlink（免费版）
  return `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`
  
  // 方案2：使用 Page.REST API（每月有免费额度）
  // return `https://api.page.rest/v1/pages/${encodeURIComponent(url)}/screenshot?width=1200`
  
  // 方案3：使用 Urlbox（需要 API key）
  // return `https://api.urlbox.io/v1/APIKEY/png?url=${encodeURIComponent(url)}&width=1200&height=630`
}

// 处理图片加载失败
const handleImageError = (e) => {
  // 如果第一个服务失败，可以尝试其他服务
  const target = e.target
  const currentSrc = target.src
  
  if (currentSrc.includes('microlink')) {
    // 尝试使用备用服务
    target.src = `https://api.page.rest/v1/pages/${encodeURIComponent(tool.url)}/screenshot?width=1200`
  } else {
    // 最后使用默认图片
    target.src = '/images/fallback-preview.jpg'
  }
}

// 获取域名的函数
const getDomain = (url) => {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return url
  }
}

// 切换收藏状态
const toggleFavorite = (tool) => {
  tool.isFavorite = !tool.isFavorite
  
  if (tool.isFavorite) {
    favoriteTools.value.add(tool._path)
  } else {
    favoriteTools.value.delete(tool._path)
  }
  
  // 保存到 localStorage
  localStorage.setItem('favoriteTools', JSON.stringify([...favoriteTools.value]))
}

// 监听工具列表变化，更新收藏状态
watch(() => tools.value, (newTools) => {
  if (newTools) {
    newTools.forEach(tool => {
      tool.isFavorite = favoriteTools.value.has(tool._path)
    })
  }
}, { immediate: true })

// 计算所有标签
const allTags = computed(() => {
  return Object.entries(tagCounts.value)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
})

// 计算前10个热门标签
const topTags = computed(() => {
  return allTags.value.slice(0, 10)
})

// 直接选择标签
const selectTag = (tag) => {
  if (!selectedTags.value.includes(tag)) {
    selectedTags.value.push(tag)
  }
}
</script>

<style scoped>
.preview-aspect {
  aspect-ratio: 16/9;
}

.preview-card img {
  transition: transform 0.3s ease;
}

.preview-card:hover img {
  transform: scale(1.05);
}

/* 添加过渡效果 */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* 可选：添加模糊效果的过渡 */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.tag-selector {
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
}

.tag-selector[v-show="false"] {
  opacity: 0;
  transform: translateY(-10px);
  pointer-events: none;
}

.tag-selector[v-show="true"] {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

/* 确保容器在小屏幕上也保持最小宽度 */
.search-container {
  min-width: 300px;
  margin: 0 auto;
}

/* 标签选择器的样式 */
.tag-selector {
  min-width: 300px;
  max-width: 100%;
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
}

/* 响应式调整 */
@media (max-width: 640px) {
  .search-container,
  .tag-selector {
    min-width: 280px; /* 在更小的屏幕上稍微减小最小宽度 */
  }
}
</style>