<script setup lang="ts">defineProps<{error:{statusCode?:number;message?:string}}>()</script>
<template><main class="empty-state"><p>KAIMAFIND</p><h1>{{error.statusCode===404?'这一页还未写下。':'页面暂时无法打开。'}}</h1><p>{{error.statusCode===404?'可以从作品导览继续探索。':'请稍后重试。'}}</p><button @click="clearError({redirect:'/zh'})">返回作品导览</button></main></template>
