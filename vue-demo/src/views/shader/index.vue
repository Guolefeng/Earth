<script setup lang="ts">
import { onMounted } from "vue";
import Experience from "./experience";

onMounted(() => {
    new Experience("#sketch");
});
</script>

<template>
    <main id="sketch" class="box"></main>
</template>

<style scoped>
.box {
    width: 60vw;
    height: 60vh;
}
</style>
