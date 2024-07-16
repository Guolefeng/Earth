import generateApi from '@/utils/generateApi'

const api = {
    getDictBatch: {
        url: '/list',
        method: 'POST',
    },
}

export default generateApi(api)