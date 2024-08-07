import generateApi from "@/utils/generateApi";

const api = {
    // 新增
    create: {
        url: "/create",
        method: "POST",
    },
    // 查询
    read: {
        url: "/read",
        method: "GET",
    },
    // 修改
    update: {
        url: "/update",
        method: "POST",
    },
    // 删除
    delete: {
        url: "/delete",
        method: "DELETE",
    },
};

export default generateApi(api);
