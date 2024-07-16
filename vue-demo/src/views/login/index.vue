<script setup lang="ts">
    import { reactive, ref } from 'vue'
    import { useRoute } from 'vue-router'
    import { authApi } from '@/api'
    import { setCookie, isURL } from '@/utils/functions'
    import useUserStore from '@/stores/modules/user'
    import { encrypt } from '@/utils/encrypt'
    import { Message } from '@arco-design/web-vue'

    const formRef = ref()
    const route = useRoute()
    const loading = ref(false)
    const userStore = useUserStore()

    const form = reactive({
        account: '',
        password: '',
    })

    const onLogin = () => {
        formRef.value.validate(async (err: any) => {
            if (!!err) { return }
            loading.value = true
            const redirect: string = (route.query.redirect as string) || '/portal'
            const targetUrl = isURL(redirect)
                ? redirect
                : `${window.location.origin}${redirect}`
            authApi.login({
                account: form.account,
                password: await encrypt(form.password),
                targetUrl,
            }).then((res: any) => {
                const { code, data, msg } = res
                if (code === '0' && data) {
                    const { accessToken, user, redirectUrl } = data
                    setCookie('bcpToken', accessToken)
                    userStore.$patch(user)
                    window.location.href = redirectUrl
                } else {
                    Message.warning(msg)
                }
                loading.value = false
            }).catch(() => {
                loading.value = false
            })
        })
    }
</script>

<template>
    <a-spin :loading="loading" class="loading">
        <main class="login">
            <div class="form">
                <div class="title">欢迎登录系统</div>
                <a-form ref="formRef" :model="form">
                    <a-form-item field="account" label="账号" :rules="[{ required: true, message: '请输入账号' }]">
                        <a-input v-model="form.account" placeholder="请输入用户名" allow-clear />
                    </a-form-item>
                    <a-form-item field="password" label="密码" :rules="[{ required: true, message: '请输入密码' }]">
                        <a-input-password v-model="form.password" placeholder="请输入密码" allow-clear />
                    </a-form-item>
                </a-form>
                <a-button type="primary" size="large" long class="btn" @click="onLogin">登录</a-button>
            </div>
        </main>
    </a-spin>
</template>

<style scoped lang="less">
    .login {
        .fc();
        width: 100%;
        height: 100%;
        background: url("@/assets/images/login-bj.png") no-repeat;
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
    .btn {
        margin-top: 20px;
    }
</style>