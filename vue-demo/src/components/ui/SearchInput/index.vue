<script setup lang="ts">
import { ref, watch } from "vue";
import { Search } from "@element-plus/icons-vue";

const props = withDefaults(
    defineProps<{
        value?: string;
        config?: { [prop: string]: any }; // 属性(可选，全部属性参考：https://element-plus.org/zh-CN/component/input.html#api)
    }>(),
    {
        value: "",
        config: () => ({
            placeholder: "请输入",
            clearable: false,
            disabled: false,
        }),
    }
);

const valueRef = ref("");

const emit = defineEmits<{
    (e: "search", value: string): void;
}>();

const onChange = (val: string) => {
    valueRef.value = val;
};

const onSearch = () => {
    emit("search", valueRef.value);
};

watch(
    () => props.value,
    (val) => {
        valueRef.value = val;
    }
);
</script>

<template>
    <el-input
        v-model="valueRef"
        allow-clear
        v-bind="config"
        @input="onChange"
        @keyup.enter="onSearch"
    >
        <template #append>
            <el-button :icon="Search" @click="onSearch" />
        </template>
    </el-input>
</template>

<style></style>
