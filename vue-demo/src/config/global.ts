/**
 * 全局配置文件
 */
export default {
    // 系统标题
    title: "Demo",
    // 系统logo
    logo: "./assets/logo.svg",
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
            index: "/canvas",
            name: "canvas",
        },
        {
            index: "/svg",
            name: "svg",
        },
        {
            index: "/three",
            name: "three",
        },
        {
            index: "/shader",
            name: "shader",
        },
        {
            name: "增删改查",
            index: "/curd",
        },
        {
            name: "动态表单",
            index: "/form",
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
    // 导航页应用列表
    portalApps: [
        {
            name: "demo",
            path: "/home",
            img: "",
            description:
                "浏览器端系统，后台管理模版，包含一些自己测试的组件，点击跳转到对应页面，欢迎体验!",
        },
        {
            name: "map",
            path: "/map",
            img: "",
            description:
                "浏览器端系统，Gis可视化大屏，包含Cesium实现的gis效果，以及一些测试效果展示，点击跳转到对应页面，欢迎体验!",
        },
        {
            name: "打字跟随",
            path: "https://github.com/Guolefeng/cat",
            img: "./assets/screenrecording.gif",
            description:
                "桌面端系统，支持windows与macos，具体是用Electron实现的一个暹罗猫（我家小猫）同步跟随键盘每一个按键打字，同时张嘴吐小花花，每隔5s会眨眼一次，可拖拽修改位置。点击跳转github，欢迎下载体验!",
            download: [
                {
                    name: "windows 无需安装可直接运行包",
                    url: "https://le-zi.cn/cat-win32-x64.zip",
                },
                {
                    name: "windows 安装包",
                    url: "https://le-zi.cn/cat-1.0.0-setup.zip",
                },
                {
                    name: "macos 安装包",
                    url: "https://le-zi.cn/cat-1.0.0-full.zip",
                },
            ],
        },
        {
            name: "peer",
            path: "https://peer.guolefeng.com",
            img: "./assets/peer.png",
            description:
                "手机浏览器端系统，peer是一个公益项目，计划于2022年的99公益日（9月9日）通过h5的形式帮忙做下宣传，通过测试题引导大家去做些捐款等。这个公益机构是在湖南和贵州县城中学做学习空间和寒假夏令营活动的。点击会跳转到项目地址，或者扫码直接浏览，手机端效果更佳，欢迎体验!",
        },
    ],
};
