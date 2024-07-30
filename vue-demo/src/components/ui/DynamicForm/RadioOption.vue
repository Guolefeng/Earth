<script setup lang="ts">
    import { IOption, IConfig } from './type';
    defineProps<{
        options: IOption[],
        config: IConfig,
    }>()
</script>


<template>
    <el-radio
        v-for="(o, oi) in options"
        :key="oi"
        :value="o.value"
        v-bind="config"
    >{{ o.label }}</el-radio>
</template>