import { selectorFamily } from "recoil";
import { dict } from "../atom";

// 字典库
export const getDict = selectorFamily({
    key: "getDict",
    get:
        (type: string) =>
        ({ get }) => {
            const dicts: { [key: string]: any } = get(dict);
            return dicts[type] || [];
        },
});
