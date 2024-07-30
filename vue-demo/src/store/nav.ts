import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";

// 浏览过的导航标签
const useNavTabStore = defineStore(
    "navtab",
    () => {
        const state = reactive({
            viewtag: {} as any,
        });

        return state;
    },
    {
        // persist: true,
    }
);

export default useNavTabStore;
