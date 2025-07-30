// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import axios from "@/utils/http";
import { loginByToken } from "@/composables/useAuth";
import uviewPlus, { setConfig } from 'uview-plus'
import './mock/index.js';
// 创建 Vue 应用实例
const app = createApp(App);
const pinia = createPinia();

// 注册 Pinia 和 uView 插件
app.use(pinia);
app.use(uviewPlus);

// 创建一个启动 Promise，供全局监听启动流程
const launched = new Promise<void>(async (resolve, reject) => {
  try {
    // 启动阶段：尝试使用 token 登录（可选）
    await loginByToken(axios);

    // 如果无异常，则认为初始化成功
    resolve();
  } catch (error) {
    // 若过程中发生错误，可选择记录或终止加载流程
    console.error("[main.ts] 应用初始化失败：", error);
    reject(error);
  }
});

// 提供 $onLaunched 和 $axios 给所有组件使用（如 loading.vue）
app.provide("$onLaunched", launched);
app.provide("$axios", axios);

// 挂载应用
app.mount("#app");

