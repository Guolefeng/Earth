<script setup lang="ts">
    /** 公共退出页面，统一处理退出逻辑 */
    import { useRouter } from 'vue-router'
    import { authApi } from '@/api'
    import { deleteCookie, deleteLocalStorage } from '@/utils/functions'

    const router = useRouter()
</script>

<template>
    <div></div>
</template>

<style lang="scss" scoped>
</style>
