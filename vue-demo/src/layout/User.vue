<script setup lang="ts">
import useUserStore from "@/stores/modules/user";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();

const onLogout = () => {
    router.push("/logout");
};
</script>

<template>
    <el-popover width="224">
        <template #reference>
            <span class="user" />
        </template>
        <div class="user-info">
            <span class="user" />
            <div class="user-name">{{ userStore.userName }}</div>
            <el-button @click="onLogout" type="primary">退出</el-button>
        </div>
    </el-popover>
</template>

<style scoped lang="less">
.user {
    display: inline-block;
    width: 40px;
    height: 40px;
    background-image: url("@/assets/icons/user.svg");
    background-size: cover;
    &-info {
        .fc();
        flex-direction: column;
        width: 200px;
        button {
            width: 100%;
        }
    }
    &-name {
        width: 100%;
        text-align: center;
        margin: 16px 0;
        font-size: 14px;
    }
}
</style>
