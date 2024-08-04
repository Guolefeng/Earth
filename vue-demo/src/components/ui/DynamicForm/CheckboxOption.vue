<script setup lang="ts">
    import { IOption, IConfig } from './type';
    defineProps<{
        options: IOption[],
        config: IConfig,
    }>()
</script>


<template>
    <el-checkbox
        v-for="(o, oi) in options"
        :key="oi"
        :value="o.value"
        v-bind="config"
    >{{ o.label }}</el-checkbox>
</template>