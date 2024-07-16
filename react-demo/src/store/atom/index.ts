import { atom } from 'recoil'
import { getLocalStorage } from '@/utils/util'

// 用户信息
export const userInfo = atom({
    key: 'userInfo',
    default: getLocalStorage('userInfo')
        ? JSON.parse(getLocalStorage('userInfo') || '{}')
        : {
            code: '',
            account: '',
            userName: '',
            userImage: '',
            userEmail: null,
            userMobile: null,
            accessToken: null
        },
})

// 字典库
export const dict = atom({
    key: 'dict',
    default: {}
})

// 未经处理的过的（后端返回的）字典数组
// [{ id: xx, pid: xx, dictId: xx, dictName: xx, dictValueCode: xx, dictValue: xx, dictSort: xx, createTime: xx, updateTime: xx}]
export const rawdict = atom({
    key: 'rawdict',
    default: [],
})
