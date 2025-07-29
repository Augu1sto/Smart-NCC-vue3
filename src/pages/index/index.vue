<template>
	<view class="container">
	  <text>{{ message }}</text>
    hello!
	</view>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  // 定义响应式数据
  const message = ref('Hello World from index.vue!')
  </script>
  
  <style scoped>
  .container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
  }
  text {
	font-size: 24px;
	color: #333;
  }
  </style>
  