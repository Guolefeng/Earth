import { $request } from './request'
import { CancelToken } from 'axios'

const generateApi = (apiConfig: any = {}) => {
    const api: typeof apiConfig = {}

    Object.keys(apiConfig).forEach((key: string) => {
        const values = apiConfig[key]
        const { baseURL, headers = {}, method, url, responseType, timeout } = values
        api[key] = (body: any, params: any, header: any, cancelToken?: CancelToken) => {
            // restful风格参数拼接
            let _url = url
            let _params = Object.assign({}, params)
            params && Object.keys(params).forEach(k => {
                const reg = new RegExp(`{${k}}`, 'g')
                _url = _url.replace(reg, (r: any) => {
                    delete _params[k]
                    return params[k]
                })
            })
            const p = {
                baseURL,
                headers: { ...headers, ...header },
                method,
                url: _url,
                data: body,
                params: _params,
                responseType,
                timeout,
                cancelToken
            }
            return $request(p).then((res) => {
                return res
            })
        }
    })

    return api
}

export default generateApi