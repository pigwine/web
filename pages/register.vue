<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="max-w-[350px] w-full p-10 rounded border border-gray-300 bg-white">
      <div class="text-center mb-8">
       
      </div>
      
      <form class="mt-6 space-y-5" @submit.prevent="handleRegister">
        <!-- 用户名 -->
        <div>
          <label class="block text-sm font-medium text-gray-700">用户名</label>
          <input 
            v-model="form.username"
            type="text"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            :class="{'border-red-500': errors.username}"
          />
          <p v-if="errors.username" class="mt-1 text-sm text-red-500">{{ errors.username }}</p>
        </div>

        <!-- 邮箱 -->
        <div>
          <label class="block text-sm font-medium text-gray-700">邮箱</label>
          <input 
            v-model="form.email"
            type="email"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            :class="{'border-red-500': errors.email}"
          />
          <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
        </div>

        <!-- 密码 -->
        <div>
          <label class="block text-sm font-medium text-gray-700">密码</label>
          <input 
            v-model="form.password"
            type="password"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            :class="{'border-red-500': errors.password}"
          />
          <p v-if="errors.password" class="mt-1 text-sm text-red-500">{{ errors.password }}</p>
        </div>

        <!-- 确认密码 -->
        <div>
          <label class="block text-sm font-medium text-gray-700">确认密码</label>
          <input 
            v-model="form.confirmPassword"
            type="password"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            :class="{'border-red-500': errors.confirmPassword}"
          />
          <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-500">{{ errors.confirmPassword }}</p>
        </div>

        <div>
          <button 
            type="submit"
            class="w-full py-2 px-4 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            注册
          </button>
        </div>

        <!-- 错误提示 -->
        <div v-if="globalError" class="text-center text-red-500 bg-red-50 rounded p-2 text-sm">
          {{ globalError }}
        </div>

        <!-- 登录链接 -->
        <div class="text-center text-sm">
          <NuxtLink to="/login" class="text-blue-600 hover:text-blue-800">
            已有账号？点击登录
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const form = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const errors = ref({});
const globalError = ref('');

// 验证规则
const validateForm = () => {
  errors.value = {};
  
  // 用户名验证
  if (form.value.username.length < 3) {
    errors.value.username = '用户名至少需要3个字符';
  }
  if (form.value.username.length > 20) {
    errors.value.username = '用户名不能超过20个字符';
  }

  // 邮箱验证
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.value.email)) {
    errors.value.email = '请输入有效的邮箱地址';
  }

  // 密码验证
  if (form.value.password.length < 6) {
    errors.value.password = '密码至少需要6个字符';
  }

  // 确认密码验证
  if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = '两次输入的密码不一致';
  }

  return Object.keys(errors.value).length === 0;
};

const handleRegister = async () => {
  try {
    // 清除之前的错误
    globalError.value = '';
    
    // 表单验证
    if (!validateForm()) {
      return;
    }

    // 发送注册请求
    const response = await fetch('http://localhost:8080/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: form.value.username,
        email: form.value.email,
        password: form.value.password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 400) {
        if (data.error.includes('username')) {
          errors.value.username = '用户名已存在';
        } else if (data.error.includes('email')) {
          errors.value.email = '邮箱已被使用';
        } else {
          globalError.value = data.error;
        }
      } else {
        throw new Error(data.message || '注册失败');
      }
      return;
    }

    // 注册成功
    alert('注册成功！');
    navigateTo('/login');
  } catch (error) {
    console.error('Registration error:', error);
    globalError.value = '服务器连接失败，请稍后重试';
  }
};
</script>