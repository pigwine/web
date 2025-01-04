<!-- components/tools/ToolList.vue -->
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- 搜索框和标签选择器 -->
    <div class="relative mb-8">
      <input 
        v-model="searchQuery" 
        type="text"
        placeholder="搜索工具名称或标签..."
        class="w-full p-4 text-lg border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500"
        @focus="showTagSelector = true"
      />
      
      <!-- 标签选择器下拉面板 -->
      <div v-show="showTagSelector" 
           class="absolute z-10 left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-[300px] overflow-y-auto"
           @mouseenter="isHoveringTagSelector = true"
           @mouseleave="isHoveringTagSelector = false">
        <div class="p-4">
          <h3 class="text-lg font-medium text-gray-900 mb-3">选择标签筛选</h3>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="(count, tag) in tagCounts"
              :key="tag"
              @click="toggleTag(tag)"
              :class="[
                'px-3 py-1 rounded-full text-sm font-medium transition-colors',
                selectedTags.includes(tag)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ tag }} ({{ count }})
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 已选标签展示 -->
    <div v-if="selectedTags.length" class="mb-6 flex flex-wrap gap-2">
      <div v-for="tag in selectedTags" 
           :key="tag" 
           class="inline-flex items-center px-3 py-1 rounded-full bg-blue-600 text-white">
        {{ tag }}
        <button @click="removeTag(tag)" class="ml-2 focus:outline-none">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- 工具列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="tool in paginatedTools"
        :key="tool._path"
        class="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300"
      >
        <div class="p-6">
          <h3 class="text-2xl font-bold text-gray-900 mb-3">{{ tool.title }}</h3>
          <p class="text-lg text-gray-600 mb-4 line-clamp-2">{{ tool.description }}</p>
          <div class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="tag in tool.tags"
              :key="tag"
              class="px-3 py-1 text-base font-medium bg-blue-50 text-blue-600 rounded-full"
            >
              {{ tag }}
            </span>
          </div>
          <a
            :href="tool.url"
            target="_blank"
            class="inline-flex items-center text-lg text-blue-600 hover:text-blue-800 font-medium transition duration-200"
          >
            访问链接
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- 分页控制 -->
    <div class="mt-12">
      <!-- 页码信息 -->
      <div class="text-center mb-6">
        <p class="text-xl font-bold text-black">
          第 {{ currentPage }} 页 / 共 {{ totalPages }} 页
        </p>
        <p class="text-lg text-black mt-2">
          共 {{ filteredTools.length }} 个工具
          <span class="mx-2">·</span>
          当前显示第 {{ (currentPage - 1) * itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, filteredTools.length) }} 个
        </p>
      </div>

      <!-- 分页按钮 -->
      <div class="flex justify-center items-center space-x-4">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="px-6 py-3 text-lg font-medium rounded-lg border-2 border-gray-300 text-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          上一页
        </button>
        
        <div class="flex items-center space-x-2">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            :class="[
              'px-5 py-3 rounded-lg text-lg font-medium transition duration-200',
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'border-2 border-gray-300 text-black hover:bg-gray-50'
            ]"
          >
            {{ page }}
          </button>
        </div>

        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="px-6 py-3 text-lg font-medium rounded-lg border-2 border-gray-300 text-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          下一页
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

// 直接在 ToolList 组件中获取数据
const { data: tools } = await useAsyncData('tools', () => 
  queryContent('tools').find()
)

const searchQuery = ref('')
const selectedTags = ref([])
const showTagSelector = ref(false)
const isHoveringTagSelector = ref(false)

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
const toggleTag = (tag) => {
  const index = selectedTags.value.indexOf(tag)
  if (index === -1) {
    selectedTags.value.push(tag)
  } else {
    selectedTags.value.splice(index, 1)
  }
}

// 移除标签
const removeTag = (tag) => {
  const index = selectedTags.value.indexOf(tag)
  if (index !== -1) {
    selectedTags.value.splice(index, 1)
  }
}

// 处理输入框失焦事件
const handleBlur = () => {
  // 如果鼠标不在标签选择器上，则关闭标签选择器
  setTimeout(() => {
    if (!isHoveringTagSelector.value) {
      showTagSelector.value = false
    }
  }, 200)
}

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

// 添加点击外部关闭标签选择器
onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target
    if (!target.closest('.relative') && showTagSelector.value) {
      showTagSelector.value = false
    }
  })
})
</script>

<style scoped>
/* 添加滚动条样式 */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #CBD5E0 #EDF2F7;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #EDF2F7;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #CBD5E0;
  border-radius: 3px;
}
</style>