import generateApi from '@/utils/generateApi'

const authApi = {
    // 登录
    login: {
        url: '/login',
        method: 'POST',
    },
    // 注册
    register: {
        url: 'register',
        method: 'POST'
    },
}

export default generateApi(authApi)