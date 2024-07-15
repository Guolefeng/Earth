<script lang="ts" setup>
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const back = () => {
        router.push('/portal')
    }
</script>

<template>
    <div class="content">
        <a-result class="result" status="403" subtitle="对不起，您暂无权限，请联系管理员">
            <template #extra>
                <a-space>
                    <a-button key="back" type="primary" @click="back">返回</a-button>
                </a-space>
            </template>
        </a-result>
    </div>
</template>

<style scoped lang="less">
.content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}
</style>
