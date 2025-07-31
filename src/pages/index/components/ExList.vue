<template>
    <view class="exurls">
        <view class="title">
            <p class="titletext">外链直达</p>
        </view>
        <view class="exurls-box">
            <view class="exitem" v-for="(listItem, listIndex) in exurlList" :key="listIndex" @click="openUrl(listItem)">
                <!-- <view class="url-box" :style="{backgroundImage: 'url('++')'}"> -->
                <view>
                    <image class="url-box" :src="listItem.image" mode="scaleToFill" loading="lazy"></image>
                </view>
                <text class="grid-text">{{ listItem.title }}</text>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
const exurlList = [
    {
        image: '/static/expic1.png',
        title: '武汉大学信息门户',
        url: 'https://cas.whu.edu.cn/authserver/login'

    },
    {
        image: '/static/expic2.png',
        title: '华中科技大学信息门户',
        url: 'https://pass.hust.edu.cn/cas/login'
    }
];

function openUrl(item) {
    console.log(item.url);
    uni.navigateTo({
        url: '/pages/index/webView?url=' + item.url + '&title=' + item.title,
    })
}

</script>

<style lang="scss">
.exurls {
    margin: 60rpx auto;
    width: 90%;
}

.exurls-box {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
}

.exitem {
    gap: 10px;
    text-align: center;
}

.exitem:active {
    filter: brightness(80%);
}

.url-box {
    height: 30px;
    width: 150px;
    border: white 2px solid;
    border-radius: 3px;
}

.title {
    margin-bottom: 20rpx;
}

.titletext {
    font-size: 18px;
    font-weight: bold;
}

.titletext::before {
    content: "▮";
    color: $theme-color;
}
</style>