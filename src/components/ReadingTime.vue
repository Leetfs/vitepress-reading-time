<script setup lang="ts">
import { useData } from 'vitepress'

// 获取页面数据
// Retrieve page data
const { frontmatter } = useData()

// 计算阅读时间的函数
// Function to calculate the estimated reading time
function calculateReadingTime(wordCount: number) {
  const wordsPerMinute = 500 // 假设中文阅读速度为每分钟500字 (Assume a reading speed of 500 characters per minute for Chinese)
  return Math.ceil(wordCount / wordsPerMinute) // 计算预计阅读时间 (Calculate estimated reading time)
}

// 从 frontmatter 获取字数和计算阅读时间
// Get the word count from frontmatter and calculate the reading time
const wordCount = frontmatter.value.wordCount || 0
const readingTime = calculateReadingTime(wordCount)
</script>

<template>
  <div>
    <p>字数: {{ wordCount }} &nbsp; 预计阅读时间: {{ readingTime }} 分钟</p>
    <!-- Display word count and estimated reading time -->
  </div>
</template>

<style scoped>
/* 这里可以添加样式 */
/* Add styles here if needed */
</style>
