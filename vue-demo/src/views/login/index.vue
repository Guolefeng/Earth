<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { authApi } from "@/api";
import { setCookie, isURL } from "@/utils/functions";
import useUserStore from "@/store/user";
import { encrypt } from "@/utils/encrypt";
import { ElMessage } from "element-plus";

const formRef = ref();
const route = useRoute();
const router = useRouter();
const loading = ref(false);
const userStore = useUserStore();

const form = reactive({
    account: "admin",
    password: "123456",
});

const onLogin = () => {
    formRef.value.validate(async (valid: boolean, fields: any) => {
        console.log("====", fields);
        if (!valid) {
            return;
        }
        router.push("/");
        return;
        loading.value = true;
        const redirect: string = (route.query.redirect as string) || "/portal";
        const targetUrl = isURL(redirect)
            ? redirect
            : `${window.location.origin}${redirect}`;
        authApi
            .login({
                account: form.account,
                password: await encrypt(form.password),
                targetUrl,
            })
            .then((res: any) => {
                const { code, data, msg } = res;
                if (code === "0" && data) {
                    const { accessToken, user, redirectUrl } = data;
                    setCookie("token", accessToken);
                    userStore.$patch(user);
                    window.location.href = redirectUrl;
                } else {
                    ElMessage.warning(msg);
                }
                loading.value = false;
            })
            .catch(() => {
                loading.value = false;
            });
    });
};
</script>

<template>
    <main v-loading="loading" class="login">
        <div class="form">
            <div class="title">欢迎登录系统</div>
            <el-form ref="formRef" :model="form">
                <el-form-item
                    label="账号"
                    :rules="[{ required: true, message: '请输入账号' }]"
                >
                    <el-input
                        v-model="form.account"
                        placeholder="请输入用户名"
                        allow-clear
                    />
                </el-form-item>
                <el-form-item
                    label="密码"
                    :rules="[{ required: true, message: '请输入密码' }]"
                >
                    <el-input
                        v-model="form.password"
                        type="password"
                        placeholder="请输入密码"
                        allow-clear
                        show-password
                    />
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="onLogin">登录</el-button>
        </div>
    </main>
</template>

<style scoped lang="less">
.login {
    .fc();
    width: 100%;
    height: 100%;
    background: url("@/assets/images/login-bj.png") no-repeat;
    background-position: center;
    background-size: cover;
}
.form {
    padding: 30px;
    width: 400px;
    border: 1px solid @border-color;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 2px;
    color: #fff;
}
.title {
    text-align: center;
    margin-bottom: 30px;
    font-size: 24px;
    font-weight: 600;
    color: #000;
    letter-spacing: 0.1em;
}
button {
    width: 100%;
}
</style>
