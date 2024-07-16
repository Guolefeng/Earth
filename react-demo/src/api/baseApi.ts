import generateApi from '@/utils/generateApi'

const baseApi = {
    getDictBatch: {
        url: '/dict/batch',
        method: 'GET',
    },
    uploadFile: {
        url: '/file/upload',
        method: 'POST',
        timeout: 10 * 60 * 1000, // timeout = 10min
    }
}

export default generateApi(baseApi)