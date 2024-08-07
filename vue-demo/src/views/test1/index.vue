<script setup lang="ts">
import { testApi } from "@/api";
</script>

<template>
    <biz-crudpage
        :api="testApi"
        :tableList="[
            {
                label: '名称',
                prop: 'name',
            },
            {
                label: '年龄',
                prop: 'age',
            },
            {
                label: '性别',
                prop: 'gender',
            },
            {
                label: '地址',
                prop: 'address',
            },
            {
                label: '描述',
                prop: 'description',
            },
        ]"
        :viewList="[
            {
                label: '名称',
                prop: 'name',
            },
            {
                label: '描述',
                prop: 'description',
            },
        ]"
        :editList="[
            {
                label: '名称',
                prop: 'name',
                type: 'el-input',
                rules: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                config: {
                    placeholder: '请输入',
                },
            },
            {
                label: '描述',
                prop: 'description',
                type: 'el-input',
                config: {
                    type: 'textarea',
                    placeholder: '请输入',
                },
            },
        ]"
    />
</template>

<style></style>
