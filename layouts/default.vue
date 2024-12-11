<!-- 
  默认布局组件
  用途：提供全站统一的页面布局结构
  包含：导航栏、主内容区、页脚
-->
<template>
  <div>
    <img src="/background.jpg" class="bg-image" />
    <CommonNavbar />
    <slot />
    <CommonFooter />
  </div>
</template>

<style scoped>
.bg-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  object-fit: cover;
}
</style>