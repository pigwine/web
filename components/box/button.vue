<template>
  <div class="flex flex-col items-center justify-center">
    <UButton
      :label="label"
      :size="size"
      :variant="variant"
      color="primary"
      @click="$emit('click')"
      :class="[buttonClass, textSize]"
    />
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: 'lg',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  textSize: {
    type: String,
    default: 'text-lg'
  },
  buttonClass: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'default'
  }
})

defineEmits(['click'])
</script>

<style scoped>
</style> 
<!-- 使用示例 
<BoxButton 
  label="按钮文本"
  size="lg"
  variant="default"
  buttonClass="bg-blue-500 hover:bg-blue-600"
  textSize="text-lg"
  @click="handleClick"
/>-->