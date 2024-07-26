<script setup lang="ts">
import { onMounted, ref } from "vue";
import CesiumMap from "@/map";

const map = ref();

onMounted(() => {
    const m = new CesiumMap();
    m.appendMapElemTo(map.value);
});
</script>

<template>
    <div class="map" ref="map"></div>
</template>

<style scoped lang="less">
.map {
    width: 100%;
    height: 100%;
}
</style>
