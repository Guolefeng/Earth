<script setup lang="ts">
import { ref, watch, onMounted, watchEffect, reactive, computed } from "vue";
import { RouterView, useRouter } from "vue-router";
import { intersection, isEmpty } from "lodash";
import useUserStore from "@/stores/modules/user";
import userComponent from "@/components/user.vue";
import type { IMenu } from "@/types";
import { menu as menusConfig } from "@/config";
import { IconHome } from "@arco-design/web-vue/es/icon";

const selectedMenuKeys = ref<string[]>([]);
const router = useRouter();
const userStore = useUserStore();
const loading = ref(false);

const menus: any = computed(() => {
    return menusConfig;
});

const onClickMenuItem = (key: string) => {
    selectedMenuKeys.value = [key];
    router.push(key);
};

const onBackHome = () => {
    router.push("/portal");
};

watchEffect(() => {
    if (menus.value.length) {
        if (
            isEmpty(selectedMenuKeys.value) ||
            intersection(
                selectedMenuKeys.value,
                menus.value.map((m: any) => m.key)
            ).length
        ) {
            return;
        }
        const defaultKey = menus.value[0].key;
        onClickMenuItem(defaultKey);
    } else {
        router.push("/home/403");
    }
});

watch(
    () => router.currentRoute.value,
    (newVal: any) => {
        selectedMenuKeys.value = newVal.matched.map((r: any) => r.path);
    },
    { immediate: true }
);
</script>

<template>
    <a-spin :loading="loading" class="loading">
        <a-layout class="layout">
            <a-layout-header class="header">
                <span class="header-item">
                    <span class="logo" />
                    <span class="title">测试中心</span>
                    <a-tooltip content="返回主页">
                        <icon-home class="home" @click="onBackHome" />
                    </a-tooltip>
                </span>
                <a-menu
                    mode="horizontal"
                    :selected-keys="selectedMenuKeys"
                    @menuItemClick="onClickMenuItem"
                >
                    <a-menu-item v-for="m in menus" :key="m.key">
                        {{ m.name }}
                    </a-menu-item>
                </a-menu>
                <userComponent />
            </a-layout-header>
            <a-layout-content class="cont">
                <router-view v-slot="{ Component }">
                    <component :is="Component" />
                    <!-- <transition name="fade-transform" mode="out-in">
                    </transition> -->
                </router-view>
            </a-layout-content>
        </a-layout>
    </a-spin>
</template>

<style scoped lang="less">
.layout {
    flex: unset;
    width: 100%;
    height: 100%;
}
.header {
    .fsb();
    padding: 0 20px;
    height: 60px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.08);
    z-index: 1;
    &-item {
        .fvc();
    }
}
.title {
    flex-shrink: 0;
    font-size: 20px;
    font-weight: 600;
}
.logo {
    display: inline-block;
    flex-shrink: 0;
    margin-right: 8px;
    width: 30px;
    height: 30px;
    background-image: url("@/assets/icons/logo.svg");
    background-size: cover;
}
.home {
    padding: 4px;
    margin-top: 2px;
    margin-left: 8px;
    font-size: 30px;
    cursor: pointer;
    color: @theme-color;
    border: 1px solid transparent;
    border-radius: 4px;
    transition: all 0.3s;
}
.home:hover {
    background: @background-color;
}
.cont {
    height: calc(100% - 60px);
    background: @background-color;
}
.arco-menu-horizontal {
    flex: 1;
    text-align: center;
}
</style>
