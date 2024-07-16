import { CancelToken } from 'axios'
import instance from './interceptor'
import { message } from 'antd'

// 外部传入的baseUrl
const baseURL_DEFAULT: string | undefined = process.env.baseURL
// 自定义header头
const headers_DEFAULT: object = {
    ContentType: 'application/json;charset=UTF-8'
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'get' | 'post' | 'put' | 'delete'
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'

interface AxiosRequest {
    baseURL?: string;
    url: string;
    data?: any;
    params?: any;
    method?: Method;
    headers?: any;
    timeout?: number;
    responseType?: ResponseType;
    cancelToken?: CancelToken;
}

interface CustomResponse {
    // readonly code: number;
    // readonly msg: string;
    code: number | string;
    msg: string;
    data: any;
    origin?: any;
    error?: Error | null | undefined,
    headers?: any;
}

/**
* Axios通用请求
*/
export const $request = ({ baseURL, headers = {}, method, url, data, params, responseType, timeout, cancelToken }: AxiosRequest | any, restParams?: {}): Promise<CustomResponse> => {
    // restful风格参数拼接
    let _url = url
    restParams && Object.keys(restParams).forEach(k => {
        const reg = new RegExp(`{${k}}`, 'g')
        _url = _url.replace(reg, restParams[k])
    })

    return new Promise((resolve, reject) => {
        instance({
            baseURL: baseURL || baseURL_DEFAULT,
            headers: {
                ...headers_DEFAULT,
                ...headers,
            },
            method,
            url: _url,
            params,
            data,
            responseType,
            timeout: timeout || 20000,                // 默认20s
            cancelToken,
        }).then((res: any) => {
            if (responseType === 'arraybuffer' || responseType === 'stream') {
                let blob = new Blob([res.data], { type: res.headers['content-type'] })
                let link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = decodeURIComponent(res.headers['content-disposition'].split("utf-8''")[1])
                link.click()
                link.remove()
                resolve({ code: 0, msg: 'success', data: null })
                return
            }
            // 200:服务端业务处理正常结束 自定义扩展
            if (res?.status === 200) {
                if (res?.data?.code === '0') {
                    resolve({
                        code: res?.data?.code || 0,
                        msg: res?.data?.msg || 'success',
                        data: res?.data?.data,
                        headers: res.headers,
                    })
                } else if (res?.data?.subCode === '200') {
                    resolve({
                        code: res?.data?.subCode || 0,
                        msg: res?.data?.subMsg || 'success',
                        data: res?.data?.body
                    })
                } else if (res.headers['content-type'] === 'image/jpeg;charset=UTF-8') {
                    resolve({
                        code: '0',
                        msg: 'success',
                        data: res?.data,
                        headers: res.headers,
                    })
                } else {
                    message.error(res.data?.msg || (url + '请求失败'));
                    resolve({
                        code: res?.data?.code,
                        msg: res?.data?.msg || (url + '请求失败'),
                        data: res?.data?.data
                    })
                }
            } else {
                resolve({ code: res?.data?.code, msg: res?.data?.msg || (url + '请求失败'), data: null })
            }
        }).catch((err) => {
            const meg = err?.data?.msg || err?.message || (url + '请求失败')
            message.error(meg)
            // eslint-disable-next-line prefer-promise-reject-errors
            // reject({ status: false, message, data: null });
            // 统一resolve
            resolve({ code: err?.status, msg: meg, data: null, error: new Error(meg) })
        });
    });
}

/**
 * GET类型的网络请求
 */
export const $get = ({ baseURL, headers, url, data, params, responseType }: AxiosRequest) => {
    return $request({ baseURL, headers, method: 'GET', url, data, params, responseType })
}

/**
 * POST类型的网络请求
 */
export const $post = ({ baseURL, headers, url, data, params, responseType }: AxiosRequest) => {
    return $request({ baseURL, headers, method: 'POST', url, data, params, responseType })
}

/**
 * PUT类型的网络请求
 */
export const $put = ({ baseURL, headers, url, data, params, responseType }: AxiosRequest) => {
    return $request({ baseURL, headers, method: 'PUT', url, data, params, responseType })
}

/**
 * DELETE类型的网络请求
 */
export const $delete = ({ baseURL, headers, url, data, params, responseType }: AxiosRequest) => {
    return $request({ baseURL, headers, method: 'DELETE', url, data, params, responseType })
}