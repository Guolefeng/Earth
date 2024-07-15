/*
* 登录与用户权限
*/
import generateApi from '@/utils/generateApi'

const authApi = {
    // 登录类型
    getType: {
        url: '/login_type',
        method: 'GET',
    },
    // 校验token接口
    checkToken: {
        url: '/token/checkout',
        method: 'GET',
    },
    // 登录
    login: {
        url: '/login',
        method: 'POST',
    },
    // 校验ticket
    checkTicket: {
        url: '/ticket/checkout',
        method: 'GET',
    },
    // 退出登录
    logout: {
        url: '/logout',
        method: 'POST',
    },
    // 注册
    register: {
        url: '/register',
        method: 'POST'
    },
    // 获取验证码
    getCaptcha: {
        url: '/captcha',
        method: 'GET',
        responseType: 'blob',
        headers: {
            'ContentType': 'image/jpeg;charset=UTF-8'
        }
    },
    // 校验验证码
    checkCaptcha: {
        url: '/captcha',
        method: 'POST'
    },
    // 获取当前用户密码加密方式
    getEncryptModel: {
        url: '/password/encrypt_model',
        method: 'GET',
    }
}

export default generateApi(authApi)