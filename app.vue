<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <div class="fixed bottom-0 left-0 right-0 flex justify-center gap-8 p-4">
      <div @click="() => navigateTo('https://www.instagram.com/nanjingsifang', {external: true})"
           class="cursor-pointer">
        <UIcon name="i-simple-icons-instagram" class="w-8 h-8 text-black"/>
      </div>

      <div @click="() => navigateTo('https://www.xiaohongshu.com/explore', {external: true})"
           class="cursor-pointer">
        <UIcon name="i-simple-icons-xiaohongshu" class="w-8 h-8 text-black"/>
      </div>

      <div @click="() => navigateTo('https://twitter.com/nanjingsifang', {external: true})"
           class="cursor-pointer">
        <UIcon name="i-simple-icons-twitter" class="w-8 h-8 text-black"/>
      </div>
    </div>
  </div>
</template>
