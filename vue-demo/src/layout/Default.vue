<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import userComponent from "./User.vue";
import NavTab from "./NavTab.vue";
import Aside from "./Aside.vue";
import { globalConfig } from "@/config";

const router = useRouter();

const onBackHome = () => {
    router.push("/portal");
};
</script>

<template>
    <el-container class="layout">
        <el-header class="header">
            <span class="header-item">
                <span
                    :style="{ backgroundImage: `url(${globalConfig.logo})` }"
                    class="logo"
                />
                <span class="title" @click="onBackHome">{{
                    globalConfig.title
                }}</span>
                <span class="ct"><ui-change-theme /></span>
            </span>
            <userComponent />
        </el-header>
        <el-container class="layout-body">
            <el-aside class="layout-aside">
                <Aside></Aside>
            </el-aside>
            <el-main class="layout-main">
                <NavTab />
                <el-card class="layout-main-content">
                    <router-view v-slot="{ Component }">
                        <!-- <component :is="Component" /> -->
                        <transition name="fade-transform" mode="out-in">
                            <component :is="Component" />
                        </transition>
                    </router-view>
                </el-card>
            </el-main>
        </el-container>
    </el-container>
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
    ul {
        flex: 1;
        justify-content: center;
    }
}
.title {
    flex-shrink: 0;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
}
.logo {
    display: inline-block;
    flex-shrink: 0;
    margin-right: 8px;
    width: 30px;
    height: 30px;
    background-size: cover;
}
.ct {
    margin-left: 8px;
}
.layout-body {
    height: calc(100% - 60px);
}
.layout-aside {
    display: flex;
    flex-direction: column;
    width: 10vw;
    height: 100%;
}
.layout-main {
    --el-main-padding: 20px;
}
.layout-main-content {
    height: calc(100% - 40px);
    width: 100%;
    overflow: auto;
}
</style>
