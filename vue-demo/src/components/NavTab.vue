<script setup lang="ts">
import { ref, onMounted, watch, reactive } from "vue";
import { useRouter } from "vue-router";
import useNavTabStore from "@/stores/modules/nav";

const state = reactive({
    activeKey: "",
});
const router = useRouter();
const navStore = useNavTabStore();

const onChange = (key: any) => {
    router.push(key);
};

const onDelete = (key: string | number) => {
    const newMap = navStore.viewtag;
    delete newMap[key];
    navStore.viewtag = newMap;
    const { href }: any = router.currentRoute.value;
    if (href === key) {
        router.push(newMap[Object.keys(newMap)[0]].href);
    }
};

onMounted(() => {});

watch(
    () => router.currentRoute.value,
    (newVal: any) => {
        const { meta, name, href, query } = newVal;
        if (!meta.viewtag) {
            return;
        }
        const queryname = query.name;
        state.activeKey = href;
        navStore.viewtag[href] = {
            ...newVal,
            name: queryname ? `${name}-${queryname}` : name,
        };
    },
    { immediate: true }
);
</script>

<template>
    <div class="viewtag">
        <el-tabs
            hide-content
            v-model="state.activeKey"
            type="card"
            @tab-change="onChange"
            @tab-remove="onDelete"
        >
            <el-tab-pane
                v-for="(value, key, index) of navStore.viewtag"
                :key="key"
                :label="value.name"
                :name="value.href"
                :closable="index !== 0"
            />
        </el-tabs>
    </div>
</template>

<style scoped lang="less">
.viewtag {
}
</style>
<style>
.viewtag .el-tabs__header {
    margin-bottom: 0;
}
</style>
