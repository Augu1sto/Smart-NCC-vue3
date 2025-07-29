<template>
	<!-- 页面加载等待提示，可替换为你项目的样式 -->
	<view>
	  <up-loading-page></up-loading-page>
	</view>
  </template>
  
  <script setup lang="ts">
  import { onLoad } from '@dcloudio/uni-app';
  import { inject } from 'vue'
  import { useUserStore } from '@/store/user';
  
  // 注入 main.ts 提供的全局启动 Promise
  const $onLaunched = inject<Promise<void>>('$onLaunched');
  const userStore = useUserStore();
  
  /**
   * 页面加载时执行
   */
  onLoad(async () => {
	console.log("[Loading] 页面 onLoad 开始初始化");
  
	try {
	  // 等待 main.ts 中 loginByToken 完成（不管是否登录）
	  await $onLaunched;
	  console.log("[Loading] 初始化完成，判断跳转");
  
	  redirect();
	} catch (e) {
	  console.error("[Loading] 初始化失败", e);
	  redirect(); // 即使异常也尝试跳转
	}
  });
  
  /**
   * 根据登录状态进行页面跳转
   */
  function redirect() {
	if (userStore.hasLogin) {
	  console.log("[Loading] 已登录，跳转首页");
	  uni.switchTab({ url: "/pages/index/index" });
	} else {
	  console.log("[Loading] 未登录，跳转登录页");
	  uni.redirectTo({ url: "/pages/login/login" });
	}
  }
  </script>
  
  <style scoped>
  /* 你可以自定义 loading 样式 */
  </style>
  