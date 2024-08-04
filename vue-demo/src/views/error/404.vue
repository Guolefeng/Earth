<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();
const back = () => {
    router.push("/portal");
};
</script>

<template>
    <div class="content">
        <el-result
            icon="error"
            title="404"
            sub-title="对不起，您正在寻找的页面不存在。"
        >
            <template #extra>
                <el-button type="primary" @click="back">返回</el-button>
            </template>
        </el-result>
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
