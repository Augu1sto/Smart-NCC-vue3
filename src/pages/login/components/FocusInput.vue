<template>
    <u-form-item :prop="prop">
        <view
            :class="['label', modelValue || isFocused ? 'focused' : 'blured']"
        >
            <slot></slot>
        </view>
        <u-input
            border="bottom"
            v-model="inputValue"
            :type="type"
            :clearable="true"
            @focus="isFocused = true"
            @blur="isFocused = false"
        >
        </u-input>
    </u-form-item>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from "vue";

// 定义prop，接受父组件传来的数据
const props = defineProps<{
    modelValue: string;
    prop: string;
    type?: string;
}>();

// 定义emit，向父组件发送事件
const emit = defineEmits(["update:modelValue"]);

const isFocused = ref(false);
const inputValue = ref(props.modelValue);

// 监听变量变化，做同步或副作用处理watch(event, action)?
watch(
    () => props.modelValue,
    (val) => (inputValue.value = val)
);
watch(inputValue, (val) => emit("update:modelValue", val));
</script>

<style scoped>
.u-form-item {
    position: relative;
    margin-top: 10px;
}
.label {
    position: absolute;
    color: #999;
}
.focused {
    left: 0px;
    bottom: 40px;
    transition: all 50ms ease;
}
.blured {
    left: 10px;
    bottom: 20px;
    transition: all 50ms ease;
}
</style>
💡 重点：
