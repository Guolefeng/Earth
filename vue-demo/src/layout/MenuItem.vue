<script lang="ts" setup>
interface ItemData {
    index: string;
    name: string;
    path?: string;
    children?: ItemData[];
}
interface Prop {
    itemData: ItemData;
}
const props = defineProps<Prop>();
</script>

<template>
    <el-sub-menu v-if="itemData.children?.length" :index="itemData.index">
        <template #title>
            <span>{{ itemData.name }}</span>
        </template>
        <menu-item
            v-for="(item, index) in itemData.children"
            :item-data="item"
            :key="index"
        ></menu-item>
    </el-sub-menu>
    <el-menu-item v-else :index="itemData.index">
        <span>{{ itemData.name }}</span>
    </el-menu-item>
</template>

<style scoped></style>
