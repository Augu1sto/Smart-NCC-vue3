<template>
    <view class="picbox">
        <u-swiper 
            class="pickItem" 
            :list="lazyPicList" 
            keyName="displayImage" 
            showTitle 
            indicator 
            indicatorMode="line"
            circular 
            @change="onSwiperChange" 
            @click="clickPic">
        </u-swiper>
    </view>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';

const props = defineProps({
    lazyLoad: {
        type: Boolean,
        default: false, // 默认不启用懒加载
    }
});

const picList = [
    {
        image: '/static/0.png',
        title: '关于召开武汉大学国家网络安全学院第五次研究生代表大会的通知',
    },
    {
        image: '/static/1.png',
        title: '武汉大学毕业预热文艺晚会向你发送了一封邀请函'
    },
    {
        image: '/static/pic1.png',
        title: '关于召开武汉大学国家网络安全学院第五次研究生代表大会的通知'
    }, {
        image: '/static/pic0.png',
        title: '测试-lazy-load-pic'
    }, {
        image: '/static/pic2.png',
        title: '测试-lazy-load-pic2'
    }
];

const picUrl = [
    '',
    '/pages/activity/activityDetail?id=cf8aFFB0-7DE2-DAE4-7dE1-25aB9f9eFbF3',
    '',
    '',
    ''
];

// lazy-load逻辑
const lazyPicList = reactive(
    picList.map((item) => ({
        ...item,
        displayImage: props.lazyLoad ? '' : item.image, // 根据是否懒加载决定初始值
        loaded: !props.lazyLoad, // 如果不懒加载，直接标记为已加载
    }))
);

const placeholder = '/static/0.png';
const preloadRange = 1; // 当前页±1页会预加载
let allImagesLoaded = false; // 标志位，判断是否所有图片已加载

const updateVisibleImages = (currentIndex: number) => {
    if (!props.lazyLoad || allImagesLoaded) return; // 如果不懒加载或所有图片已加载，直接返回

    let loadedCount = 0; // 记录已加载图片的数量
    lazyPicList.forEach((item, index) => {
        // 判断是否需要加载当前索引的图片
        if (
            Math.abs(index - currentIndex) <= preloadRange ||
            (currentIndex === 0 && index === lazyPicList.length - 1) // 特殊处理：第0张图片时加载最后一张
        ) {
            if (!item.loaded) {
                item.displayImage = item.image;
                item.loaded = true;
            }
        } else if (!item.loaded) {
            item.displayImage = placeholder;
        }

        if (item.loaded) {
            loadedCount++;
        }
    });

    // 如果已加载图片数量等于总图片数量，设置标志位
    if (loadedCount === lazyPicList.length) {
        allImagesLoaded = true;
    }
};

// 默认加载第0页附近的图
if (props.lazyLoad) {
    updateVisibleImages(0);
}

const onSwiperChange = (current: any) => {
    if (props.lazyLoad) {
        updateVisibleImages(current.current);
    }
};

function choose(url: string) {
    console.log(url);
    if (url) {
        uni.navigateTo({
            url: url
        });
    } else {
        uni.showToast({
            title: '暂无页面',
            icon: "error"
        });
    }
}

function clickPic(index: number) {
    console.log(index);
    console.log(picUrl[index]);
    choose(picUrl[index]);
}

</script>

<style lang="scss">
.picbox {
    width: 90%;
    margin: 5rpx auto;
    border: 10rpx solid white;
    border-radius: 10rpx;
}
</style>