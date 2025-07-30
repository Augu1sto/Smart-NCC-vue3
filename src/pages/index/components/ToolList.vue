<!-- 校园生活工具集 -->
<template>
    <swiper :indicator-dots="true" class="swiper">
        <swiper-item>
            <view class="mygrid">
                <view
                    class="mygrid-item"
                    v-for="item in firstHalfSwiperList"
                    :key="item.id"
                    @click="choose(item.url)"
                >
                    <u-icon
                        :customStyle="{ paddingTop: 20 + 'rpx' }"
                        :name="item.name"
                        :size="30"
                    ></u-icon>
                    <text class="grid-text">{{ item.title }}</text>
                </view>
            </view>
        </swiper-item>
        <swiper-item>
            <view class="mygrid">
                <view
                    class="mygrid-item"
                    v-for="item in secondHalfSwiperList"
                    :key="item.id"
                    @click="choose(item.url)"
                >
                    <u-icon
                        :customStyle="{ paddingTop: 20 + 'rpx' }"
                        :name="item.name"
                        :size="30"
                    ></u-icon>
                    <text class="grid-text">{{ item.title }}</text>
                </view>
            </view>
        </swiper-item>
    </swiper>
</template>

<script setup lang="ts">
import { computed } from "vue";

const swiperList = [
    {
        id: 1,
        name: "chat",
        title: "基地论坛",
        url: "../bbs/index",
    },
    {
        id: 2,
        name: "order",
        title: "教室预约",
        url: "../reserve/index",
    },
    {
        id: 3,
        name: "edit-pen",
        title: "权益反馈",
        url: "../rights/index",
    },
    {
        id: 4,
        name: "car",
        title: "校车查询",
        url: "../bus/index",
    },
    {
        id: 5,
        name: "clock",
        title: "考勤记录",
        url: "../attendance/index",
    },
    {
        id: 6,
        name: "grid",
        title: "校园活动",
        url: "../activity/index",
    },
    {
        id: 7,
        name: "tags",
        title: "请假报备",
        url: "../leave/index",
    },
    {
        id: 8,
        name: "map",
        title: "校园地图",
        url: "../map/index",
    },
    {
        id: 9,
        name: "list-dot",
        title: "食堂菜单",
        url: "../food/index",
    },
];
// 转为响应式
// const swiperList = reactive(list);

// 计算属性
// 计算属性，过滤前6个
const firstHalfSwiperList = computed(() => swiperList.slice(0, 6));

// 计算属性，过滤剩下的
const secondHalfSwiperList = computed(() => swiperList.slice(6));

function choose(url: string): void {
    console.log(url);
    if (url) {
        uni.navigateTo({
            url: url,
        });
    } else {
        uni.showToast({
            title: "暂无页面",
            icon: "error",
        });
    }
}
</script>

<style lang="scss" scoped>
.swiper {
    height: 420rpx;
    width: 85%;
    margin: 20rpx auto;
}
.grid-text {
    font-size: 14px;
    color: #606266;
    padding: 10rpx 0 20rpx 0rpx;
    /* #ifndef APP-PLUS */
    box-sizing: border-box;
    /* #endif */
}

.mygrid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    // grid-gap: 20rpx;  为了swiper滑动时间隔相等，不用gap来设置
}

.mygrid-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 160rpx;
    background-image: linear-gradient(160deg, #f5f7fa, #e6e9ed);
    border-radius: 10rpx;
    margin: 10rpx; // 用margin代替grid-gap设置间隔
    background-color: white;
    box-shadow: 6rpx 6rpx 0rpx $highlight-color;
    color: white;
    border: 3rpx $theme-color solid;
}

.mygrid-item:hover {
    background-image: linear-gradient(160deg, #d3d6d8, #e3e5e7);
}
</style>
