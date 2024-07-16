<script setup lang="ts">
    import { ref, watch } from 'vue'
    import { RouterView } from 'vue-router'
    import { useRouter } from 'vue-router'
    import { IconUserGroup, IconMenuFold, IconMenuUnfold } from '@arco-design/web-vue/es/icon'
    import viewTag from './components/viewTag.vue'

    const menus = [{
        name: 'f1管理',
        key: '/test1/test1-1/f1',
        icon: IconUserGroup,
    }, {
        name: 'f2管理',
        key: '/test1/test1-1/f2',
        icon: IconUserGroup,
    }]

    const selectedMenuKeys = ref<string[]>([])
    const router = useRouter()
    const collapsed = ref(false)

    const onClickMenuItem = (key: string) => {
        selectedMenuKeys.value = [key]
        router.push(key)
    }

    watch(
        () => router.currentRoute.value,
        (newVal: any) => {
            selectedMenuKeys.value = newVal.matched.map((r: any) => r.path)
        },
        { immediate: true }
    )
</script>

<template>
    <a-layout class="layout">
        <a-layout-sider
            collapsible
            :collapsed="collapsed"
            @collapse="(e: boolean) => collapsed = e"
        >
            <template #trigger="{ collapsed }">
                <IconMenuUnfold v-if="collapsed" />
                <IconMenuFold v-else />
            </template>
            <a-menu
                :selected-keys="selectedMenuKeys"
                @menuItemClick="onClickMenuItem"
            >
                <a-menu-item v-for="m in menus" :key="m.key">
                    <template #icon>
                        <component :is="m.icon"></component>
                    </template>
                    {{ m.name }}
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout-content>
            <view-tag />
            <div class="layout-cont">
                <router-view v-slot="{ Component, route: routeInner }">
                    <transition name="fade" mode="out-in" appear>
                        <component :is="Component" :key="routeInner.fullPath" />
                    </transition>
                </router-view>
            </div>
        </a-layout-content>
    </a-layout>
</template>

<style scoped lang="less">
    .layout {
        height: 100%;
        &-cont {
            position: relative;
            margin: 0 16px 16px;
            height: calc(100% - 64px);
            .webkit-scrollbar();
            overflow: auto;
            background: #fff;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            border: 1px solid #e5e6eb;
            border-top: none;
        }
    }
</style>