<script lang="ts" setup>
import { reactive, onMounted, watch } from "vue";
import type { IFormItem } from "@/components/ui/DynamicForm/type";

const props = withDefaults(
    defineProps<{
        visible?: boolean;
        data?: any;
        list?: IFormItem[];
    }>(),
    {
        visible: false,
    }
);
const emit = defineEmits<{
    (e: "ok", data: any): void;
    (e: "cancel"): void;
}>();

const state = reactive({
    formData: {},
});

const onOk = () => {
    emit("ok", state.formData);
};
const onClose = () => {
    emit("cancel");
};

watch(
    () => props.data,
    (val) => {
        if (!val) {
            return;
        }
        state.formData = val;
    },
    { immediate: true }
);
</script>

<template>
    <el-dialog
        :model-value="visible"
        :title="data ? '编辑' : '新增'"
        width="500"
        :before-close="onClose"
    >
        <ui-dynamic-form :data="state.formData" :list="list" />
        <template #footer>
            <div class="footer">
                <el-button @click="onClose">取消</el-button>
                <el-button type="primary" @click="onOk">确认</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<style scoped>
.footer {
}
</style>
