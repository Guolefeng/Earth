import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

// 租户管理 浏览过的标签
const useViewTagStore = defineStore('firstViewtag', () => {
    const state = reactive({
        viewtag: {} as any,
    })

    return state
}, {
    // persist: true,
})

export default useViewTagStore