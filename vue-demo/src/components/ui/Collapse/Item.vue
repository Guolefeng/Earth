<script setup lang="ts">
import { onMounted, ref } from "vue";
import { CaretRight } from "@element-plus/icons-vue";

const props = withDefaults(
    defineProps<{
        label?: string; // 名称
        defaultOpen?: boolean; // 默认展开
    }>(),
    {
        label: "名称",
        defaultOpen: false,
    }
);

const contRef = ref(null);
const isOpen = ref(false);

const onClick = () => {
    const content = contRef.value;
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
    isOpen.value = !isOpen.value;
};
onMounted(() => {
    if (props.defaultOpen) {
        onClick();
    }
});
</script>

<template>
    <div class="uicoll">
        <div class="uicoll-header" @click="onClick">
            <span>
                <CaretRight :class="['uicoll-icon', isOpen ? 'isOpen' : '']" />
                <span>{{ label }}</span>
            </span>
            <span>
                <slot name="headerRight"></slot>
            </span>
        </div>
        <div ref="contRef" class="uicoll-cont-wrapper">
            <div class="uicoll-cont">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style>
.uicoll {
    width: 100%;
    margin-bottom: 4px;
}
.uicoll:last-child {
    margin-bottom: 0;
}
.uicoll-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
    font-size: var(--fs-14);
    cursor: pointer;
    /* border-radius: 2px; */
    background-color: var(--body-bg-light);
    color: var(--el-text-active);
}
.uicoll-icon {
    margin-right: 8px;
    width: var(--fs-14);
    transform: rotateZ(0deg);
    transition: transform 0.2s ease-out;
}
.uicoll-icon.isOpen {
    transform: rotateZ(90deg);
}
.uicoll-cont-wrapper {
    max-height: 0;
    transition: max-height 0.2s ease-out;
    background-color: var(--body-bg);
    overflow: hidden;
}
.uicoll-cont {
    padding: 6px 10px;
}
</style>
