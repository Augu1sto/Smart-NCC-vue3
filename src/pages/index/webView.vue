<template>
    <view class="container">
        <view class="info">
            <p class="instruction">请手动复制以下链接到浏览器中打开：</p>
            <view class="link" style="user-select: text;">{{ url }}</view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad, onReady } from '@dcloudio/uni-app';

const title = ref('外部链接');
const url = ref('');

onLoad((res) => {
    const params = res || {url: '', title: ''};
    url.value = params.url;
    title.value = params.title;
});

// 设置导航栏标题
onReady(() => {
    uni.setNavigationBarTitle({
        title: title.value
    });
});
</script>

<style>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
}

.info {
    max-width: 90%;
}

.instruction {
    font-size: 16px;
    color: #333;
    margin-bottom: 10px;
}

.link {
    font-size: 14px;
    color: #333;
    word-wrap: break-word;
    word-break: break-all;
    user-select: text; /* 确保文字可选择 */
}
</style>