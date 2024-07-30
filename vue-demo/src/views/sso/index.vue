<script setup lang="ts">
import { sso } from "./functions";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
    <div v-loading="true" class="box"></div>
</template>

<style lang="less" scoped>
.box {
    width: 100vw;
    height: 100vh;
}
</style>
