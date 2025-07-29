import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user'; // 假设您使用 Pinia 的 store
import axios from 'axios'
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

axios.defaults.timeout = 5000;

// axios.defaults.baseURL = "http://192.168.43.14:8080"
axios.defaults.baseURL = "http://localhost:8080"; // mockURL
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

// http 请求拦截器
axios.interceptors.request.use(
    
    (config: InternalAxiosRequestConfig) => {
        // 在发送请求之前做些什么
		// 每次发送请求之前判断store中是否存在token        
		// 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
		// 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
        const store = useUserStore();

        const { token } = storeToRefs(store);

        // 将请求数据转换为 JSON 字符串
        config.data = JSON.stringify(config.data);

        // JWT 方案 插入 HEADER
        if (token.value) {
            config.headers.Authorization = token.value;
        }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

// http 响应拦截器
axios.interceptors.response.use(
    (response: AxiosResponse) => {
        const store = useUserStore();

        // 如果返回的状态码为 200，说明接口请求成功，可以正常拿到数据
        if (response.status === 200) {
            // 校验 token 是否失效
            if (response.data.code && (response.data.code === 700 || response.data.code === 701 || response.data.code === 702)) {
                uni.showToast({
                    icon: 'error',
                    title: response.data.msg,
                    duration: 2000
                });
                console.log('[http.ts]' + response.data.code + response.data.msg);
                store.reLogin();
            }
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

export default axios;

// 封装 get 方法，返回 promise 对象
export function get(url: string, params: Record<string, any> = {}): Promise<any> {
    return new Promise((resolve, reject) => {
        axios.get(url, { params })
            .then((response: { data: any; }) => {
                resolve(response.data);
            })
            .catch((err: any) => {
                reject(err);
            });
    });
}

// 封装 post 请求
export function post(url: string, data: Record<string, any> = {}): Promise<any> {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then((response: { data: any; }) => {
                resolve(response.data);
            })
            .catch((err: any) => {
                reject(err);
            });
    });
}

// 封装 getAwait 方法，返回 async 方法
export async function getAwait(url: string, params: Record<string, any> = {}): Promise<any> {
    const res = await axios.get(url, { params });
    return res.data;
}

// 封装 postAwait 方法，返回 async 方法
export async function postAwait(url: string, data: Record<string, any> = {}): Promise<any> {
    const res = await axios.post(url, data);
    return res.data;
}
