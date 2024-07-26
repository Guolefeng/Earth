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
    <a-popover>
        <span class="user" />
        <template #content>
            <div class="user-info">
                <span class="user" />
                <div class="user-name">{{ userStore.userName }}</div>
                <a-button @click="onLogout" long>退出</a-button>
            </div>
        </template>
    </a-popover>
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
    }
    &-name {
        width: 100%;
        text-align: center;
        margin: 16px 0;
        font-size: 14px;
    }
}
</style>
