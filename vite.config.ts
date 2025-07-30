import { defineConfig } from "vite";
// import { nodePolyfills } from "vite-plugin-node-polyfills";
import uni from "@dcloudio/vite-plugin-uni";
import path from "path";

export default defineConfig({
    plugins: [
        // nodePolyfills({
        //     // 启用 polyfill 的模块
        //     protocolImports: true,
        // }),
        uni(),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "uview-plus/theme.scss";`,
            },
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(path.dirname(import.meta.url), "src"),
        },
    },
    // server: {
    //     proxy: {
    //         "/api": {
    //             target: "http://localhost:8080", // 后端服务器地址
    //             changeOrigin: true, // 修改请求头中的 Origin
    //             rewrite: (path) => path.replace(/^\/api/, ""), // 去掉 /api 前缀
    //         },
    //     },
    // },
});
