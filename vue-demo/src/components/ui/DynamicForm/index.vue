<script setup lang="ts">
import { ref, onMounted, computed, defineExpose, watch } from "vue";
import type { FormInstance } from "element-plus";
import type { IFormItem, IData, IFormConfig } from "./type";
import { componentMap } from "./componentMap";
import { ElCascader } from "element-plus";

const props = withDefaults(
    defineProps<{
        data: IData; // 表单值
        list: IFormItem[]; // 表单配置项
        config?: IFormConfig; // 表单属性
    }>(),
    {
        data: () => ({}),
        list: () => [],
        config: () => ({
            labelPosition: "right",
            labelWidth: "auto",
            disabled: false,
        }),
    }
);

const formRef = ref<FormInstance>();
const dataValue = ref<any>({});

defineExpose({
    formRef,
    dataValue,
});

// const submitForm = async (formEl: FormInstance | undefined) => {
//     if (!formEl) return
//     await formEl.validate((valid, fields) => {
//         if (valid) {
//             console.log('submit!')
//         } else {
//             console.log('error submit!', fields)
//         }
//     })
// }

// const resetForm = (formEl: FormInstance | undefined) => {
//     if (!formEl) return
//     formEl.resetFields()
// }

watch(
    () => props.data,
    (newVal) => {
        dataValue.value = newVal;
    }
);
</script>

<template>
    <slot
        name="header"
        :formRef="formRef"
        :list="list"
        :data="dataValue"
        :config="config"
    />
    <el-form
        ref="formRef"
        :model="dataValue"
        label-position="right"
        label-width="auto"
        v-bind="config"
    >
        <el-row>
            <el-col v-for="(item, i) in list" :key="i" v-bind="item.layout">
                <el-form-item
                    :label="item.label"
                    :prop="item.prop"
                    :rules="item.rules"
                    :key="i"
                >
                    <template v-if="item.slot">
                        <slot
                            :name="item.slot"
                            :item="item"
                            :formRef="formRef"
                            :data="dataValue"
                        />
                    </template>
                    <template v-else>
                        <!-- TODO el-cascader 组件单独处理下，否则下拉选择框中不显示label，还未查明啥原因，后续没问题后再删除 -->
                        <component
                            v-if="item.type === 'el-cascader'"
                            :is="ElCascader"
                            v-model="dataValue[item.prop]"
                            v-bind="item.config"
                        />
                        <component
                            v-else-if="item.type === 'el-select'"
                            :is="'ElSelect'"
                            v-model="dataValue[item.prop]"
                            v-bind="item.config"
                        >
                            <el-option
                                v-for="i in item.options"
                                :key="i.value"
                                :label="i.label"
                                :value="i.value"
                            />
                        </component>
                        <component
                            v-else-if="item.type"
                            :is="componentMap[item.type]"
                            v-model="dataValue[item.prop]"
                            v-bind="item.config"
                        >
                            <component
                                v-if="item.children?.type"
                                :is="componentMap[item.children.type]"
                                :options="item.children.options"
                                :config="item.children.config"
                            />
                        </component>
                    </template>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
    <slot
        name="footer"
        :formRef="formRef"
        :list="list"
        :data="dataValue"
        :config="config"
    />
</template>

<style scoped></style>
