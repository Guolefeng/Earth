import axios from 'axios'
import { getCookie, deleteCookie, deleteLocalStorage } from './functions'
import { debounce } from 'lodash'
import { Modal } from '@arco-design/web-vue'
// import axios, { AxiosRequestConfig, Method } from 'axios'

axios.defaults.baseURL = '/api'

const debounce401 = debounce(() => {
    Modal.warning({
        title: '登录超时，请重新登录',
        content: '',
        onOk: () => {
            deleteLocalStorage('user')
            deleteCookie('token')
            window.location.href = '/login'
        }
    })
}, 2000, { leading: true, trailing: false })

// axios 实例
const instance = axios.create({
    responseType: 'json',
})

// 移除重复请求
// const removePending = (config: AxiosRequestConfig) => {
//     for (const key in pending) {
//         const item: number = +key
//         const list: PendingType = pending[key]
//         // 当前请求在数组中存在时执行函数体
//         if (list.url === config.url && list.method === config.method && JSON.stringify(list.params) === JSON.stringify(config.params) && JSON.stringify(list.data) === JSON.stringify(config.data)) {
//             // 执行取消操作
//             list.cancel('操作太频繁，请稍后再试')
//             // 从数组中移除记录
//             pending.splice(item, 1)
//         }
//     }
// }

// 请求拦截器
instance.interceptors.request.use(
    (config: any) => {
        // 每次发送请求之前判断cookie中的token是否存在
        const token = getCookie('token')
        if (token) {
            config.headers.Authorization = token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
instance.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        if (response.status === 200) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    // 服务器状态码不是2开头的的情况
    // 跟后台开发人员协商好统一的错误状态码 自行扩展
    error => {
        if (error?.response?.status) {
            switch (error.response.status) {
                // 401: 未登录
                case 401:
                    // 未登录则跳转登录页面，并携带当前页面的路径
                    // 在登录成功后返回当前页面，这一步需要在登录页操作。
                    debounce401()
                    break
                // 403：无权限
                case 403:
                    break
                // 404请求不存在
                case 404:
                    break
                case 500:
                    break
                // 其他错误，直接抛出错误提示
                default:
            }
            return Promise.reject(error?.response)
        }
    }
)


export default instance