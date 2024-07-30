<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import { View, Edit, Delete } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import EditDialog from "./EditDialog.vue";
import ViewDialog from "./ViewDialog.vue";

const editViaible = ref(false);
const viewViaible = ref(false);
const tagData = reactive([
    {
        name: "test1",
        description: "这个人不好说",
        age: 10,
        gender: "男",
        address: "测试地址",
    },
    {
        name: "test1",
        description: "这个人不好说",
        age: 10,
        gender: "男",
        address: "测试地址",
    },
    {
        name: "test1",
        description: "这个人不好说",
        age: 10,
        gender: "男",
        address: "测试地址",
    },
    {
        name: "test1",
        description: "这个人不好说",
        age: 10,
        gender: "男",
        address: "测试地址",
    },
    {
        name: "test1",
        description: "这个人不好说",
        age: 10,
        gender: "男",
        address: "测试地址",
    },
]);
const selectedRow = ref(null);

const tagConfig = [
    {
        label: "名称",
        prop: "name",
    },
    {
        label: "年龄",
        prop: "age",
    },
    {
        label: "性别",
        prop: "gender",
    },
    {
        label: "地址",
        prop: "address",
    },
    {
        label: "描述",
        prop: "description",
    },
];
const operations = [
    {
        label: "查看",
        config: { icon: View, link: true, type: "primary" },
        click: (row: any) => {
            selectedRow.value = row;
            viewViaible.value = true;
        },
    },
    {
        label: "编辑",
        config: { icon: Edit, link: true, type: "primary" },
        click: (row: any) => {
            selectedRow.value = row;
            editViaible.value = true;
        },
    },
    {
        label: "删除",
        config: { icon: Delete, link: true, type: "danger" },
        click: (row: any) => {
            ElMessageBox.confirm(`确认删除${row.name}`, "提示", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {})
                .catch(() => {});
        },
    },
];
const page = reactive({
    size: 10,
    index: 1,
    total: 1000,
});

const onEditOk = (data: any) => {
    console.log("===", data);
    onEditCancel();
};

const onEditCancel = () => {
    editViaible.value = false;
    selectedRow.value = null;
};

const onViewClose = () => {
    viewViaible.value = false;
    selectedRow.value = null;
};

onMounted(() => {
    // tagApi.getTree().then((res: any) => {
    //     console.log('===', res);
    // });
});
</script>

<template>
    <div class="bqmodule tag">
        <div class="tag-header">
            <el-button type="primary" @click="editViaible = true"
                >新增</el-button
            >
        </div>
        <lz-table
            :data="tagData"
            :list="tagConfig"
            :operations="operations"
            paginationVisible
            :pageSize="page.size"
            :pageIndex="page.index"
            :total="page.total"
        >
        </lz-table>
        <EditDialog
            :visible="editViaible"
            :data="selectedRow"
            @ok="onEditOk"
            @cancel="onEditCancel"
        />
        <ViewDialog
            :visible="viewViaible"
            :data="selectedRow"
            @close="onViewClose"
        />
    </div>
</template>

<style scoped>
.tag-header {
    display: flex;
    align-items: center;
    /* justify-content: end; */
    margin-bottom: 20px;
}
</style>
