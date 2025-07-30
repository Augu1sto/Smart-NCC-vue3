<template>
    <view class="main">
        <view class="header">
            <image
                src="@/static/banner.png"
                mode="widthFix"
                class="banner"
            ></image>
        </view>
        <view class="body">
            <tool-list></tool-list>
        </view>
    </view>
</template>

<script setup lang="ts">
import { onShow } from "@dcloudio/uni-app";
import ToolList from "./components/ToolList.vue";
import { useUserStore } from "@/store/user";

const userStore = useUserStore();
onShow(() => {
    if (userStore.hasLogin) {
        console.log("[index-tabbar]-userlogin");
        uni.setTabBarItem({
            index: 1,
            text: "用户中心",
        });
    } else {
        console.log("[index-tabbar]-visitor");
        uni.setTabBarItem({
            index: 1,
            text: "登录",
        });
    }
});
</script>

<style lang="scss" scoped>
.banner {
    width: 100%;
}
</style>
