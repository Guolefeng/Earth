<script setup lang="ts">
interface IData {
    [prop: string]: string | number | boolean;
}

interface IRowConfig {
    // el-descriptions-item属性(可选，全部属性参考：https://element-plus.org/zh-CN/component/descriptions.html#descriptionsitem-api)
    label?: string;
    span?: number;
    width?: string | number;
    minWidth?: string | number;
    align?: 'left' | 'center' | 'right';
    labelAlign?: 'left' | 'center' | 'right';
    className?: string;
    labelClassName?: string;
}

interface IRow {
    label: string;
    prop: string;
    slot?: string;
    config?: IRowConfig;
}

interface IConfig {
    // el-descriptions属性(可选，全部属性参考：https://element-plus.org/zh-CN/component/descriptions.html#descriptions-api)
    border?: boolean;
    column?: number;
    direction?: 'horizontal' | 'vertical';
    size?: '' | 'large' | 'default' | 'small';
    title?: string;
    extra?: string;
}

withDefaults(
    defineProps<{
        data?: IData; // 数据源
        list?: IRow[]; // 配置列表
        config?: IConfig; // 属性配置
    }>(),
    {
        value: '',
        list: () => [],
        config: () => ({})
    }
);
</script>

<template>
    <el-descriptions v-bind="config">
        <el-descriptions-item
            v-for="item in list"
            :key="item.prop"
            :label="item.label"
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
