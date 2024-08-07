<script lang="ts" setup>
import type { IRow } from "@/components/ui/Descriptions/type";

withDefaults(
    defineProps<{
        visible?: boolean;
        data?: any;
        list: IRow[];
    }>(),
    {
        visible: false,
        list: () => [],
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
        <ui-descriptions :data="data" :list="list" />
    </el-dialog>
</template>

<style></style>
