<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps<{
  text: string;
}>()

const emit = defineEmits(['questionSaved', 'error'])

// 解析出的题目列表
const questions = ref<Array<{
  id?: number;
  text: string;
  answer?: string;
  options?: string[];
  explanation?: string;
}>>([])

// 解析识别文本中的题目
function parseQuestions(text: string) {
  if (!text) return []
  
  // 匹配题目的正则表达式
  const questionRegex = /(\d+[\.\、\s]+)([^\n]+(?:\n(?!\d+[\.\、\s]+)[^\n]+)*)/g
  const answerSectionRegex = /答案[:：]/i
  
  // 提取题目部分和答案部分
  const parts = text.split(answerSectionRegex)
  const questionsText = parts[0]
  const answersText = parts.length > 1 ? parts[1] : ''
  
  // 提取答案
  const answerMap = new Map()
  if (answersText) {
    const answerRegex = /第?(\d+)题[:：]?\s*([A-Z]|[^\d\n]+)/g
    let answerMatch
    while ((answerMatch = answerRegex.exec(answersText)) !== null) {
      const questionNum = parseInt(answerMatch[1])
      const answer = answerMatch[2].trim()
      answerMap.set(questionNum, answer)
    }
  }
  
  // 提取题目
  const parsedQuestions = []
  let match
  while ((match = questionRegex.exec(questionsText)) !== null) {
    const numberPart = match[1].trim()
    const questionNumber = parseInt(numberPart)
    const questionText = match[2].trim()
    
    // 提取选项
    const options: string[] = []
    const optionRegex = /([A-D])[\.\s]+([^\n]+)/g
    let optionMatch
    while ((optionMatch = optionRegex.exec(questionText)) !== null) {
      const optionLetter = optionMatch[1]
      const optionText = optionMatch[2].trim()
      options.push(`${optionLetter}. ${optionText}`)  // 保留选项标号
    }
    
    parsedQuestions.push({
      id: questionNumber,
      text: questionText,
      options: options.length > 0 ? options : undefined,
      answer: answerMap.get(questionNumber)
    })
  }
  
  return parsedQuestions
}

// 监听文本变化
watch(() => props.text, (newText) => {
  questions.value = parseQuestions(newText)
}, { immediate: true })

// 处理题目保存成功
function handleQuestionSaved(result: any, index: number) {
  emit('questionSaved', result, index)
}

// 处理错误
function handleError(error: any) {
  emit('error', error)
}
</script>

<template>
  <div>
    <!-- 题目列表 -->
    <div v-if="questions.length > 0" class="space-y-2">
      <OcrRecognizedQuestionItem
        v-for="(question, index) in questions"
        :key="index"
        :question="question"
        :index="index"
        @saved="(result) => handleQuestionSaved(result, index)"
        @error="handleError"
      />
    </div>
    
    <!-- 未识别到题目时的提示 -->
    <div v-else class="text-gray-500 italic">
      未能自动识别题目，请检查文本格式或手动分析
    </div>
  </div>
</template> 