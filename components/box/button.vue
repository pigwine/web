<template>
  <div class="flex flex-col items-center justify-center">
    <UButton
      label="立即申请加入"
      size="lg"
      @click="handleClick"
      class="text-lg"
    />
  </div>
</template>

<script setup>
const handleClick = () => {
  window.open('https://x.com/nanjingsifang', '_blank')
}
</script>

<style scoped>
</style> 