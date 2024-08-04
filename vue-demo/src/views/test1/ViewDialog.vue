<script lang="ts" setup>
withDefaults(
    defineProps<{
        visible?: boolean;
        data?: any;
    }>(),
    {
        visible: false,
    }
);
const emit = defineEmits<{
    (e: "close"): void;
}>();

const handleClose = () => {
    emit("close");
};
</script>

<template>
    <el-dialog
        :model-value="visible"
        title="查看"
        width="500"
        :before-close="handleClose"
    >
        <lz-descriptions
            :data="data"
            :list="[
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
        />
    </el-dialog>
</template>

<style></style>
