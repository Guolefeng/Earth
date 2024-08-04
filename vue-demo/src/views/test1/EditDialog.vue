<script lang="ts" setup>
import { reactive, onMounted, watch } from "vue";

const props = withDefaults(
    defineProps<{
        visible?: boolean;
        data?: any;
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

const list = [
    {
        label: "名称",
        prop: "name",
        type: "el-input",
        rules: [{ required: true, message: "请输入名称", trigger: "blur" }],
        config: {
            placeholder: "请输入",
        },
    },
    {
        label: "描述",
        prop: "description",
        type: "el-input",
        config: {
            type: "textarea",
            placeholder: "请输入",
        },
    },
];

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
        <lz-dynamic-form :data="state.formData" :list="list" />
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
