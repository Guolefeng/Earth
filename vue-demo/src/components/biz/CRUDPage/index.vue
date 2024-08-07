<script setup lang="ts">
/**
 * 增删改查业务组件
 */
import { reactive, onMounted, ref } from "vue";
import { View, Edit, Delete } from "@element-plus/icons-vue";
import { ElMessageBox, ElMessage } from "element-plus";
import EditDialog from "./EditDialog.vue";
import ViewDialog from "./ViewDialog.vue";
import type { IItem } from "@/components/ui/Table/type";
import type { IRow } from "@/components/ui/Descriptions/type";
import type { IFormItem } from "@/components/ui/DynamicForm/type";
import type { CancelToken } from "axios";

type apiFunction = (
    body?: any,
    params?: any,
    header?: any,
    cancelToken?: CancelToken
) => Promise<any>;

const props = withDefaults(
    defineProps<{
        api?: {
            // key为增删改查方法名，value为api函数
            // create: apiFunction;
            // read: apiFunction;
            // update: apiFunction;
            // delete: apiFunction;
            [key: string]: apiFunction;
        };
        tableList?: IItem[];
        tablePage?: {
            size: number;
            index: number;
        };
        viewList?: IRow[];
        editList?: IFormItem[];
    }>(),
    {
        tableList: () => [],
        tablePage: () => ({
            size: 10,
            index: 1,
        }),
        viewList: () => [],
        editList: () => [],
    }
);

const loading = ref(false);
const editViaible = ref(false);
const viewViaible = ref(false);
const tableData = ref([
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
                .then(() => {
                    onDelete(row);
                })
                .catch(() => {});
        },
    },
];
const page = reactive({
    size: props.tablePage.size,
    index: props.tablePage.index,
    total: 0,
});

const onEditOk = (data: any) => {
    if (selectedRow.value) {
        onUpdate(data);
    } else {
        onCreate(data);
    }
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

const onCreate = (params: any) => {
    if (!props.api?.create) {
        return;
    }
    loading.value = true;
    props.api
        .create(params)
        .then((res) => {
            const { code, data } = res;
            if (code === "0") {
                onRead();
                ElMessage.success("新增成功");
            }
            loading.value = false;
        })
        .catch(() => {
            loading.value = false;
        });
};

const onRead = () => {
    if (!props.api?.read) {
        return;
    }
    loading.value = true;
    props.api
        .read()
        .then((res) => {
            const { code, data } = res;
            if (code === "0") {
                tableData.value = data?.list || [];
                page.total = data?.total || 0;
            }
            loading.value = false;
        })
        .catch(() => {
            loading.value = false;
        });
};

const onUpdate = (params: any) => {
    if (!props.api?.update) {
        return;
    }
    loading.value = true;
    props.api
        .update(params)
        .then((res) => {
            const { code, data } = res;
            if (code === "0") {
                onRead();
                ElMessage.success("修改成功");
            }
            loading.value = false;
        })
        .catch(() => {
            loading.value = false;
        });
};

const onDelete = (params: any) => {
    if (!props.api?.delete) {
        return;
    }
    loading.value = true;
    props.api
        .delete(params)
        .then((res) => {
            const { code, data } = res;
            if (code === "0") {
                onRead();
                ElMessage.success("删除成功");
            }
            loading.value = false;
        })
        .catch(() => {
            loading.value = false;
        });
};

onMounted(() => {
    // onRead();
});
</script>

<template>
    <div v-loading="loading">
        <div class="crud-header">
            <el-button type="primary" @click="editViaible = true">
                新增
            </el-button>
        </div>
        <ui-table
            :data="tableData"
            :list="tableList"
            :operations="operations"
            paginationVisible
            :pageSize="page.size"
            :pageIndex="page.index"
            :total="page.total"
        >
        </ui-table>
        <EditDialog
            :visible="editViaible"
            :data="selectedRow"
            :list="editList"
            @ok="onEditOk"
            @cancel="onEditCancel"
        />
        <ViewDialog
            :visible="viewViaible"
            :data="selectedRow"
            :list="viewList"
            @close="onViewClose"
        />
    </div>
</template>

<style>
.crud-header {
    display: flex;
    align-items: center;
    /* justify-content: end; */
    margin-bottom: 20px;
}
</style>
