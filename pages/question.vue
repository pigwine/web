<template>
    <div class="question-homepage flex flex-col items-center justify-center min-h-screen">
      <div class="max-w-2xl mx-auto text-center">
        <h1 class="text-2xl font-bold mb-4">问题主页</h1>
        <p class="mb-3">欢迎来到问题主页！在这里，您可以查看和提交问题。</p>
        <p class="mb-4">我们鼓励用户提出问题并分享知识。请根据您的需求选择相应的选项。</p>
        <ul class="space-y-2">
          <li>查看问题列表</li>
          <li>提交新问题</li>
          <li>搜索问题</li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  name: 'QuestionHomepage',
}
</script>

<style scoped>
.question-homepage {
  padding: 20px;
  font-family: Arial, sans-serif;
}
</style>