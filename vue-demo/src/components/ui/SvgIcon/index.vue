<script setup lang="ts">
defineProps<{
    name: string;
}>();
</script>

<template>
    <svg class="uisvgicon">
        <use :href="'#' + name"></use>
    </svg>
</template>

<style>
.uisvgicon {
    --size: 1em;
    vertical-align: top;
    width: var(--size);
    height: var(--size);
}
</style>
