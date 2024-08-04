<script setup lang="ts">
    import { IOption, IConfig } from './type';
    defineProps<{
        options: IOption[],
        config: IConfig,
    }>()
</script>

<template>
    <el-option
        v-for="(o, oi) in options"
        :key="oi"
        :value="o.value"
        :label="o.label"
        v-bind="config"
    />
</template>