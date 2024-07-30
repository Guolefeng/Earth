<script lang="ts" setup>
import { watch, ref } from "vue";
import { useRoute } from "vue-router";
import MenuItemVue from "./MenuItem.vue";
import { menu } from "@/config/menu";

const route = useRoute();

const activeIndex = ref(route.path);

const onSelect = (index: string) => {
    activeIndex.value = index;
};

watch(
    () => route.path,
    (newVal: any) => {
        activeIndex.value = newVal;
    },
    { immediate: true }
);
</script>
<template>
    <div class="aside-main">
        <el-scrollbar>
            <el-menu :default-active="activeIndex" router @select="onSelect">
                <menu-item-vue
                    v-for="(item, index) in menu"
                    :item-data="item"
                    :key="index"
                ></menu-item-vue>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<style>
.aside-main {
    flex: 1 1 auto;
    overflow: auto;
    width: 100%;
    height: 100%;
}
.aside-main .el-scrollbar__view,
.aside-main .el-menu {
    height: 100%;
}
</style>
