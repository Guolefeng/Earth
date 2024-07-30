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
                    config: {
                        span: 24,
                    },
                },
                {
                    label: '描述',
                    prop: 'description',
                    config: {
                        span: 24,
                    },
                },
            ]"
        />
    </el-dialog>
</template>

<style></style>
