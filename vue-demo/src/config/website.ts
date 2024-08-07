/**
 * 全局配置文件
 */
export default {
    // 系统标题
    title: "测试中心",
    // 系统logo
    logo: "./logo.svg",
    // 系统首页
    fistPage: {
        name: "导航页",
        path: "/portal",
    },
    // 登录页标题
    loginTitle: "欢迎登录系统",
    // 登录页按钮文字
    loginBtnText: "登录",
    // 退出按钮文字
    logoutBtnText: "退出",
    // 后端接口地址
    baseUrl: import.meta.env.VITE_APP_BASE_DOMIAN,
    // 菜单列表
    menuList: [
        {
            index: "/home",
            name: "首页",
        },
        {
            name: "增删改查",
            index: "/test1",
        },
        {
            name: "测试2",
            index: "test2",
            children: [
                {
                    index: "/test2",
                    name: "2-1",
                },
            ],
        },
        {
            name: "测试3",
            index: "test3",
            children: [
                {
                    index: "/test3",
                    name: "3-1",
                },
            ],
        },
    ],
};
