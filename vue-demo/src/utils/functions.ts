import Cookies from 'js-cookie'

// 字符串 trim
export const trimTransform = (value: string | null | undefined) => {
    return value ? value.trim() : ''
}

// 字符串中所有空格
export const spaceTransform = (value: string | null | undefined) => {
    return value ? value.replace(/\s/g, '') : ''
}

interface ICookieOptionProps {
    expires?: number | Date;
    path?: string;
    domain?: string;
}

// 设置cookie
export const setCookie = (name: string, value: string, option: ICookieOptionProps = { path: '/' }) => {
    Cookies.set(name, value, option)
}

// 获取cookie
export const getCookie = (name: string) => {
    return Cookies.get(name)
}

// 删除cookie
export const deleteCookie = (name: string, option: ICookieOptionProps = { path: '/' }) => {
    Cookies.remove(name, option)
}

// 设置localStorage
export const setLocalStorage = (name: string, value: string) => {
    window.localStorage.setItem(name, value)
}

// 获取localStorage
export const getLocalStorage = (name: string) => {
    return window.localStorage.getItem(name)
}

// 删除localStorage
export const deleteLocalStorage = (name: string) => {
    window.localStorage.removeItem(name)
}

// 删除空属性值
export const removeEmpertyProperty = (obj: any) => {
    Object.keys(obj).forEach((key: string) => {
        if (obj[key] === '' || obj[key] === undefined || obj[key] === null || obj[key] === 'null') {
            delete obj[key]
        }
    })
    return obj
}

// 字符串是否是url地址
export const isURL = (url: string) => {
    const strRegex = '^((https|http|ftp)://)?'//(https或http或ftp):// 可有可无
        + '(([\\w_!~*\'()\\.&=+$%-]+: )?[\\w_!~*\'()\\.&=+$%-]+@)?' //ftp的user@ 可有可无
        + '(([0-9]{1,3}\\.){3}[0-9]{1,3}' // IP形式的URL- 3位数字.3位数字.3位数字.3位数字
        + '|' // 允许IP和DOMAIN（域名）
        + '(localhost)|'    //匹配localhost
        + '([\\w_!~*\'()-]+\\.)*' // 域名- 至少一个[英文或数字_!~*\'()-]加上.
        + '\\w+\\.' // 一级域名 -英文或数字 加上.
        + '[a-zA-Z]{1,6})' // 顶级域名- 1-6位英文
        + '(:[0-9]{1,5})?' // 端口- :80 ,1-5位数字
        + '((/?)|' // url无参数结尾 - 斜杆或这没有
        + '(/[\\w_!~*\'()\\.;?:@&=+$,%#-/]+)+/?)$';//请求参数结尾- 英文或数字和[]内的各种字符
    const re = new RegExp(strRegex, 'i'); // 大小写不敏感
    return re.test(encodeURI(url))
}

// 生成唯一id
export const uuid = () => Date.now().toString(36) + Math.random().toString(36).substring(2)