<script setup lang="ts">
import { ref, watch, computed } from 'vue'

const props = defineProps<{
  subjects: string[];
  searchText: string;
  selectedSubject: string;
}>()

const emit = defineEmits(['update:searchText', 'update:selectedSubject', 'reset'])

const localSearchText = ref(props.searchText)
const localSelectedSubject = ref(props.selectedSubject)

// 处理学科列表，确保格式正确
const formattedSubjects = computed(() => {
  return props.subjects.map(subject => {
    // 如果是JSON字符串，尝试解析
    if (typeof subject === 'string') {
      try {
        const parsed = JSON.parse(subject);
        if (parsed && typeof parsed === 'object') {
          return parsed.String || '未分类';
        }
      } catch (e) {
        // 如果不是JSON，直接返回原文本
        return subject === 'undefined' ? '未分类' : subject;
      }
    }
    
    // 如果是对象，提取String字段
    if (typeof subject === 'object' && subject !== null) {
      return (subject as any).String || '未分类';
    }
    
    return subject === 'undefined' || !subject ? '未分类' : subject;
  }).filter((value, index, self) => self.indexOf(value) === index); // 去重
});

// 同步本地状态和父组件状态
watch(() => props.searchText, (newVal) => {
  localSearchText.value = newVal
})

watch(() => props.selectedSubject, (newVal) => {
  localSelectedSubject.value = newVal
})

// 当本地状态变化时通知父组件
watch(localSearchText, (newVal) => {
  emit('update:searchText', newVal)
})

watch(localSelectedSubject, (newVal) => {
  emit('update:selectedSubject', newVal)
})

// 重置筛选
function resetFilters() {
  localSearchText.value = ''
  localSelectedSubject.value = ''
  emit('reset')
}
</script>

<template>
  <div class="bg-white rounded-lg border shadow-sm p-6">
    <div class="flex flex-col md:flex-row gap-4">
      <div class="flex-1">
        <label class="block text-sm font-medium mb-1">关键词搜索</label>
        <input 
          v-model="localSearchText"
          type="text"
          placeholder="搜索题目内容"
          class="w-full border rounded-md px-3 py-2"
        />
      </div>
      
      <div class="md:w-48">
        <label class="block text-sm font-medium mb-1">学科</label>
        <select
          v-model="localSelectedSubject"
          class="w-full border rounded-md px-3 py-2"
        >
          <option value="">全部</option>
          <option v-for="subject in formattedSubjects" :key="subject" :value="subject">
            {{ subject }}
          </option>
        </select>
      </div>
      
      <div class="md:flex-none md:self-end">
        <button
          @click="resetFilters"
          class="w-full md:w-auto px-4 py-2 border rounded-md hover:bg-gray-50"
        >
          重置筛选
        </button>
      </div>
    </div>
  </div>
</template> 