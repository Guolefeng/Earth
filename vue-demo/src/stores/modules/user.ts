import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
import type { IUser } from '@/types'

const useUserStore = defineStore('user', () => {
    const state = reactive<IUser>({
        id: "",
        account: "",
        tenantId: "",
        userName: "",
        userMobile: "",
        userType: 1,
    })

    return {
        ...toRefs(state)
    }
}, {
    persist: true,
})

export default useUserStore