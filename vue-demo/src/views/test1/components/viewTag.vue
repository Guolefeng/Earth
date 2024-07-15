<script setup lang="ts">
    import { ref, onMounted, watch, reactive } from 'vue'
    import { useRouter } from 'vue-router'
    import { cloneDeep } from 'lodash'
    import useViewTagStore from '@/stores/modules/firstViewtag'

    const state = reactive({
        activeKey: '',
    })
    const router = useRouter()
    const viewTagStore = useViewTagStore()

    const onChange = (key: any) => {
        router.push(key)
    }

    const onDelete = (key: string | number) => {
        const newMap = cloneDeep(viewTagStore.viewtag)
        delete newMap[key]
        viewTagStore.viewtag = newMap
        const { href }: any = router.currentRoute.value
        if (href === key) {
            router.push(newMap[Object.keys(newMap)[0]].href)
        }
    }

    onMounted(() => {
    })

    watch(
        () => router.currentRoute.value,
        (newVal: any) => {
            const { meta, name, href, query } = newVal
            if (!meta.viewtag || !href.includes('/test1')) { return }
            const queryname = query.name
            state.activeKey = href
            viewTagStore.viewtag[href] = {
                ...newVal,
                name: queryname ? `${name}-${queryname}` : name,
            }
        },
        { immediate: true }
    )
</script>

<template>
    <div class="viewtag">
        <a-tabs
            type="card-gutter"
            hide-content
            v-model:active-key="state.activeKey"
            editable
            @change="onChange"
            @delete="onDelete"
        >
            <a-tab-pane
                v-for="(value, key, index) of viewTagStore.viewtag"
                :key="key"
                :title="value.name"
                :closable="index !== 0"
            />
        </a-tabs>
    </div>
</template>

<style scoped lang="less">
    .viewtag {
        width: calc(100% - @mid-span * 2);
        margin: @mid-span @mid-span 0 @mid-span;
        :deep(.arco-tabs-nav-type-card-gutter .arco-tabs-tab-active) {
            background-color: #fff;
        }
    }
</style>