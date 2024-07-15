<script setup lang="ts">
    import { sso } from './functions'
    import { useRouter } from 'vue-router'

    const router = useRouter()
</script>

<template>
    <a-spin dot>
        <div class="box"></div>
    </a-spin>
</template>

<style lang="less" scoped>
    .box {
        width: 100vw;
        height: 100vh;
    }
</style>
