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

import { useUserStore } from "@/store/user";

const userStore = useUserStore();


const whiteList = ['/pages/login/login', '/pages/index/index', '/pages/loading','/'];
const list = ["navigateTo", "redirectTo", "switchTab"];

function hasPermission(url: string) {
	// 在白名单中或有token，直接跳转
	if (whiteList.indexOf(url) !== -1 || userStore.hasLogin ) {
		return true;
	}
	return false;
}

list.forEach((item) => {
	uni.addInterceptor(item, {
		// 页面跳转前进行拦截, invoke根据返回值进行判断是否继续执行跳转

		invoke(e) {
			if (!hasPermission(e.url)) {
				
				// 将用户的目标路径保存下来
        // 这样可以实现 用户登录之后，直接跳转到目标页面
				// uni.setStorageSync("URL", e.url)

				uni.reLaunch({
					url: "/pages/login/login",
				});
				
				return false;
			}
			return true;
		}
	});
});

(function checkURL() {
  let path = location.pathname; // 例如 /pages/user/profile
  if (!whiteList.includes(path) && !userStore.hasLogin) {
    // 直接替换地址，禁止回退到非法页面
    location.replace('/pages/login/login');
  }
})();

// 挂载应用
app.mount("#app");

