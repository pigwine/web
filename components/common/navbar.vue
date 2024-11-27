<template>
    <header class="fixed top-0 left-0 right-0 z-50">
      <div class="container mx-auto flex justify-center items-center p-4">
        <nav>
          <ul class="flex divide-x divide-gray-300/30 backdrop-blur-sm bg-white/30 rounded-full px-4 shadow-sm">
            <li>
              <NuxtLink to="/" class="text-black hover:text-black-600 px-4">home</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/waitlist" class="text-black hover:text-black-600 px-4">WAITLIST</NuxtLink>
            </li>
        
            <li>
              <NuxtLink to="/question" class="text-black hover:text-black-600 px-4">Q&A</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/news" class="text-black hover:text-black-600 px-4">news</NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  </template>
  
  <script setup>
  // 这里可以添加任何需要的逻辑
  </script>
  
  <style scoped>
  /* 可以根据需要添加样式 */
  </style>