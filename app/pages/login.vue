<script setup lang="ts">
useSeoMeta({ title: '内容工作室登录 — KaimaFind', robots: 'noindex, nofollow' })
const password = ref('')
const error = ref('')
const busy = ref(false)
async function signIn() {
  if (busy.value) return
  busy.value = true
  error.value = ''
  try {
    await $fetch('/api/login', { method: 'POST', body: { password: password.value } })
    password.value = ''
    await navigateTo('/admin')
  } catch (cause: any) {
    error.value = cause?.data?.statusMessage || '无法登录，请重试。'
  } finally { busy.value = false }
}
</script>

<template>
  <main id="main" class="studio-login">
    <NuxtLink to="/zh" class="wordmark" aria-label="KaimaFind 首页">K.</NuxtLink>
    <form @submit.prevent="signIn">
      <p>KaimaFind Studio</p>
      <h1>进入内容工作室</h1>
      <label for="studio-password">管理员密码</label>
      <input id="studio-password" v-model="password" type="password" autocomplete="current-password" required autofocus>
      <p v-if="error" role="alert" class="login-error">{{ error }}</p>
      <button class="solid-button" type="submit" :disabled="busy">{{ busy ? '正在验证…' : '登录并开始编辑' }}</button>
    </form>
    <p class="login-help">密码保存在站点所有者的本机配置中。首次访问请从管理员处获取。</p>
  </main>
</template>
