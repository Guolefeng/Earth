<script setup lang="ts">
import type { IData, IRow, IConfig } from "./type";

withDefaults(
    defineProps<{
        data?: IData; // 数据源
        list?: IRow[]; // 配置列表
        config?: IConfig; // 属性配置
    }>(),
    {
        value: "",
        list: () => [],
        config: () => ({}),
    }
);
</script>

<template>
    <el-descriptions v-bind="config">
        <el-descriptions-item
            v-for="item in list"
            :key="item.prop"
            :label="item.label"
            :span="24"
            v-bind="item.config"
        >
            <template v-if="item.slot">
                <slot
                    :name="item.slot"
                    :item="item"
                    :value="data?.[item.prop]"
                    :data="data"
                />
            </template>
            <template v-else>
                {{ data?.[item.prop] }}
            </template>
        </el-descriptions-item>
    </el-descriptions>
</template>

<style scoped></style>
