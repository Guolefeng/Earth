<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Setting } from "@element-plus/icons-vue";
interface ICommon {
    [prop: string]: any;
}
interface ConfigCommon {
    show: boolean;
    operateColumn: boolean;
    [prop: string]: any;
}
interface IOpItem {
    label?: string; // 描述
    config?: ICommon; // 属性配置
    click?: (row: any, e: Event) => void; // 点击事件
    visible?: boolean | ((row: any, op: IOpItem) => boolean); // 是否显示
    disabled?: boolean | ((row: any, op: IOpItem) => boolean); // 是否禁用
}
interface IItem {
    label: string; // 描述
    prop?: string; // 属性名
    slot?: string; // 插槽名
    config?: ICommon; // 属性配置 https://element-plus.org/zh-CN/component/table.html#table-column-api
}

const props = withDefaults(
    defineProps<{
        data?: ICommon[]; // 数据源
        list?: IItem[]; // 配置列表
        config?: ICommon; // 表格配置 https://element-plus.org/zh-CN/component/table.html#table-api
        operationLabel?: string; // 操作列标题
        operationConfig?: ICommon; // 操作列属性配置 https://element-plus.org/zh-CN/component/table.html#table-column-api
        operations?: IOpItem[]; // 操作配置
        paginationVisible?: boolean; // 分页是否可见
        paginationConfig?: ICommon; // 分页配置 https://element-plus.org/zh-CN/component/pagination.html#api
        pageSize?: number; // 每页条数
        pageIndex?: number; // 当前页码
        total?: number; // 总条目数
        selectionVisible?: boolean; // 多选框是否可见
        selectionConfig?: ICommon; // 多选框属性配置 https://element-plus.org/zh-CN/component/table.html#table-column-api
        loading?: boolean; // 是否显示加载中
        indexVisible?: boolean; // 序号列是否可见
        indexConfig?: ICommon; // 序号列属性配置 https://element-plus.org/zh-CN/component/table.html#table-column-api
        configControls?: ConfigCommon;
    }>(),
    {
        data: () => [],
        list: () => [],
        config: () => ({}),
        operationLabel: "操作",
        operations: () => [],
        operationConfig: () => ({}),
        paginationVisible: false,
        paginationConfig: () => ({}),
        pageSize: 10,
        pageIndex: 1,
        total: 0,
        selectionVisible: false,
        selectionConfig: () => ({}),
        loading: false,
        indexVisible: false,
        indexConfig: () => ({}),
        configControls: () => ({ show: true, operateColumn: true }),
    }
);

const totalNumber = props.list.length || 0;

const emit = defineEmits<{
    (e: "paginationChange", currentPage: number, pageSize: number): void;
    (e: "selectChange", selection: any[]): void;
    (e: "sortChange", data: any): void;
    (
        e: "cellClick",
        row: any,
        column: any,
        cell: HTMLTableCellElement,
        event: Event
    ): void;
    (e: "rowClick", row: any, column: any, event: Event): void;
}>();

const getOpVisible = (row: any, op: IOpItem) => {
    if (op.hasOwnProperty("visible")) {
        if (typeof op.visible === "function") {
            return op.visible(row, op);
        } else {
            return op.visible;
        }
    } else {
        return true;
    }
};

const getOpDisabled = (row: any, op: IOpItem) => {
    if (op.hasOwnProperty("disabled")) {
        if (typeof op.disabled === "function") {
            return op.disabled(row, op);
        } else {
            return op.disabled;
        }
    } else {
        return false;
    }
};

const onSelectChange = (selection: any[]) => {
    emit("selectChange", selection);
};

const onSortChange = (data: { column: any; prop: string; order: any }) => {
    emit("sortChange", data);
};

const onCellClick = (
    row: any,
    column: any,
    cell: HTMLTableCellElement,
    event: Event
) => {
    emit("cellClick", row, column, cell, event);
};

const onRowClick = (row: any, column: any, event: Event) => {
    emit("rowClick", row, column, event);
};

const onPageSizeChange = (size: number) => {
    emit("paginationChange", props.pageIndex, size);
};

const onPageIndexChange = (index: number) => {
    emit("paginationChange", index, props.pageSize);
};

// 点击修改可展示列
const triggerSettingColumn = () => {
    dropdownVisible.value = !dropdownVisible.value;
};

const dropdownVisible = ref(false);
// const visibleColumnsProps = ref(new Set(props.list?.map((item) => item.prop)));
const visibleColumns = ref(props.list?.map((item) => item.prop));

const isColumnVisible = (item: any, index: any) => {
    return new Set(visibleColumns.value).has(item.prop);
};
const isColumnVisibleFunc = () => {
    let _list =
        props.configControls && props.configControls.show
            ? props.list?.filter((item, index) => isColumnVisible(item, index))
            : props.list;

    return _list;
};

const loaded = ref(false);

onMounted(() => {
    loaded.value = true;
});
</script>

<template>
    <el-table
        v-if="loaded"
        :data="data"
        v-bind="config"
        v-loading="loading"
        @selection-change="onSelectChange"
        @sort-change="onSortChange"
        @cell-click="onCellClick"
        @row-click="onRowClick"
    >
        <!-- 多选列 -->
        <el-table-column
            v-if="selectionVisible"
            type="selection"
            width="55"
            v-bind="selectionConfig"
        />

        <!-- 序号列 -->
        <el-table-column
            v-if="indexVisible"
            label="序号"
            type="index"
            width="80"
            align="center"
            v-bind="indexConfig"
        />

        <!-- 配置列 -->
        <el-table-column
            v-for="(item, i) in isColumnVisibleFunc()"
            :key="i"
            align="center"
            show-overflow-tooltip
            v-bind="item.config"
            :label="item.label"
            :prop="item.prop"
        >
            <template v-if="item.slot" #default="{ row, $index }">
                <slot :name="item.slot" :item="row" :index="$index" />
            </template>
        </el-table-column>

        <!-- 操作列 -->
        <el-table-column
            v-if="operations.length"
            align="center"
            v-bind="operationConfig"
            :label="operationLabel"
        >
            <template #header>
                <div
                    style="
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    "
                >
                    操作

                    <el-dropdown
                        class="column-dropdown"
                        teleported
                        popper-class="uitable-config-poper"
                        v-if="props.configControls && props.configControls.show"
                    >
                        <Setting
                            style="
                                width: 18px;
                                margin-left: 5px;
                                cursor: pointer;
                            "
                            @click="triggerSettingColumn"
                        />
                        <template #dropdown>
                            <el-checkbox-group
                                v-model="visibleColumns"
                                class="config-table-column"
                            >
                                <el-checkbox
                                    v-for="(item, i) in list"
                                    :key="i"
                                    :label="item.label"
                                    :value="item.prop"
                                />
                            </el-checkbox-group>
                        </template>
                    </el-dropdown>
                </div>
            </template>
            <template #default="{ row }">
                <template v-for="(op, i) in operations" :key="i">
                    <el-tooltip
                        v-if="getOpVisible(row, op)"
                        placement="top"
                        :content="op.label"
                        :disabled="!Boolean(op.config?.icon)"
                    >
                        <el-button
                            @click="(e: Event) => op.click?.(row, e)"
                            :disabled="getOpDisabled(row, op)"
                            v-bind="op.config"
                        >
                            {{ Boolean(op.config?.icon) ? "" : op.label }}
                        </el-button>
                    </el-tooltip>
                </template>
            </template>
        </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div v-if="paginationVisible" class="uitable-pagination">
        <el-pagination
            size="small"
            background
            layout="total, sizes, prev, pager, next, jumper"
            v-bind="paginationConfig"
            :page-size="pageSize"
            @update:page-size="onPageSizeChange"
            :current-page="pageIndex"
            @update:current-page="onPageIndexChange"
            :total="totalNumber"
        />
    </div>
</template>

<style>
.uitable-pagination {
    margin-top: 10px;
    display: flex;
    justify-content: end;
}
.config-table-column.el-checkbox-group label {
    margin-right: 0;
}
.config-table-column.el-checkbox-group label {
    width: 100%;
}
.config-table-column.el-checkbox-group {
    width: 155px;
    box-sizing: content-box;
    padding: 10px;
}
</style>
