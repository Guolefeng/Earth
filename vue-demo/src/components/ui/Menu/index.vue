<script setup lang="ts">
import { ref } from "vue";
import { ArrowRightBold } from "@element-plus/icons-vue";

interface MenuItem {
    key: string;
    label: string;
    children?: MenuItem[];
}

const props = withDefaults(
    defineProps<{
        list?: MenuItem[]; // 菜单列表
        selectedKey?: string; // 选中项的key
        activeKeys?: string[]; // 高亮的key
    }>(),
    {
        list: () => [],
        selectedKey: "",
    }
);

const emit = defineEmits<{
    (e: "select", value: MenuItem, event: Event): void;
}>();

const expandKeys = ref([]);

const onSelect = (m: MenuItem, e: Event) => {
    emit("select", m, e);
    e.stopPropagation();
};
</script>

<template>
    <div class="uimenu">
        <div
            v-for="m in list"
            :key="m.key"
            :class="[
                'uimenu-item',
                selectedKey === m.key ? 'active' : '',
                activeKeys && activeKeys.indexOf(m.key) >= 0
                    ? 'active-item'
                    : '',
            ]"
            @click="(e) => onSelect(m, e)"
            @mouseenter="() => expandKeys.push(m.key)"
            @mouseleave="() => expandKeys.splice(expandKeys.indexOf(m.key), 1)"
        >
            <span class="uimenu-label">{{ m.label }}</span>
            <span v-if="m.children" class="uimenu-expandicon">
                <ArrowRightBold v-if="Boolean(m.children)" />
            </span>
            <div
                v-if="Boolean(m.children)"
                :class="[
                    'uimenu-children',
                    expandKeys.includes(m.key) ? 'active' : '',
                ]"
            >
                <Menu
                    :list="m.children"
                    :selectedKey="selectedKey"
                    @select="(m: MenuItem, e: Event) => onSelect(m, e)"
                />
            </div>
        </div>
    </div>
</template>

<style>
.uimenu {
    position: relative;
    display: inline-block;
    border: 1px solid var(--el-border-color);
    white-space: nowrap;
}
.uimenu-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 26px;
    cursor: pointer;
    border-bottom: 1px solid var(--el-border-color);
    background: #1f272d;
}
.uimenu-item:last-child {
    border-bottom: none;
}
.uimenu-item:hover {
    background-color: var(--body-bg-lighter);
}
.uimenu-item.active {
    background-color: var(--body-bg-lighter);
}
.uimenu-label {
    color: var(--el-text-color-regular);
    font-size: var(--fs-16);
    flex-shrink: 0;
}
.uimenu-expandicon {
    margin-left: 46px;
    width: var(--fs-14);
    color: var(--el-text-color-regular);
    flex-shrink: 0;
}
.uimenu-children {
    position: absolute;
    top: 0px;
    right: 0;
    opacity: 0;
    transform: translate(100%, -0.5px) scale(0);
    transform-origin: top left;
    transition: opacity 0.2s, transform 0.2s;
}
.uimenu-children.active {
    opacity: 1;
    transform: translate(100%, -0.5px) scale(1);
}
</style>
