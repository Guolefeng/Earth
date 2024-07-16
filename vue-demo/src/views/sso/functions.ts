import { authApi } from '@/api'
import { setCookie, setLocalStorage } from '@/utils/functions'

const jsonp = (url: string, params: any) => {
    if (!url) throw new Error('url is necessary')

    const callback = 'jsonpcallback'
    const JSONP = document.createElement('script')
    JSONP.setAttribute('type', 'text/javascript')

    const headEle = document.getElementsByTagName('head')[0]

    let ret = ''
    if (params) {
        if (typeof params === 'string') {
            ret = '&' + params
        } else if (typeof params === 'object') {
            for (const key in params) {
                ret += '&' + key + '=' + encodeURIComponent(params[key])
            }
        }
        ret += '&_time=' + Date.now()
    }

    JSONP.src = `${url}?callback=${callback}${ret}`

    function remove() {
        headEle.removeChild(JSONP)
        // @ts-ignore
        delete window[callback]
    }

    return new Promise((resolve, reject) => {
        // @ts-ignore
        window[callback] = (r: any) => {
            resolve(r)
            remove()
        }
        JSONP.onerror = function (r: any) {
            reject(r)
            remove()
        }
        headEle.appendChild(JSONP)
    })
}

const sso = (url: string, params: any) => new Promise((resolve, reject) => {
    jsonp(url, params).then((res: any) => {
        const _res = JSON.parse(res)
        const { data: ticket } = _res
        if (ticket) {
            resolve(_res)
        } else {
            reject(_res)
        }
    }).catch((err: any) => {
        reject(err)
    })
})

export { jsonp, sso }
