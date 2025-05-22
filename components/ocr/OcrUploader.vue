<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['file-selected'])
const fileInput = ref<HTMLInputElement | null>(null)
const dragActive = ref(false)
const selectedFile = ref<File | null>(null)
const isLoading = ref(false)

function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    selectedFile.value = input.files[0]
    emit('file-selected', selectedFile.value)
  }
}

function triggerFileInput() {
  fileInput.value?.click()
}
</script>

<template>
  <div class="w-full">
    <div
      @click="triggerFileInput"
      @dragenter="dragActive = true"
      @dragleave="dragActive = false"
      @dragover.prevent
      @drop.prevent="(e) => { 
        dragActive = false; 
        const file = e.dataTransfer?.files[0] || null; 
        selectedFile = file; 
        emit('file-selected', selectedFile) 
      }"
      :class="[
        'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all',
        dragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50',
      ]"
    >
      <div class="flex flex-col items-center justify-center space-y-3">
        <div class="rounded-full bg-primary/10 p-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
        </div>
        <div>
          <p class="text-base font-medium">
            点击或拖放图片到此处
          </p>
          <p class="text-sm text-gray-500 mt-1">
            支持 JPG, PNG, PDF 格式
          </p>
        </div>
      </div>
    </div>
    
    <input
      ref="fileInput"
      type="file"
      class="hidden"
      accept="image/jpeg,image/png,application/pdf"
      @change="handleFileChange"
    />
    
    <div v-if="selectedFile" class="mt-4">
      <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
        <div class="shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium text-gray-900 truncate">
            {{ selectedFile.name }}
          </p>
          <p class="text-xs text-gray-500">
            {{ (selectedFile.size / 1024).toFixed(2) }} KB
          </p>
        </div>
      </div>
    </div>
  </div>
</template> 