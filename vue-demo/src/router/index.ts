import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/login",
            name: "登录",
            component: () => import("@/views/login/index.vue"),
            meta: {},
        },
        {
            path: "/logout",
            name: "退出",
            component: () => import("@/views/logout/index.vue"),
            meta: {},
        },
        {
            path: "/portal",
            name: "portal",
            component: () => import("@/views/portal/index.vue"),
            meta: {},
        },
        {
            path: "/map",
            name: "map",
            component: () => import("@/views/map/index.vue"),
            meta: {},
        },
        {
            path: "/sso",
            name: "sso",
            component: () => import("@/views/sso/index.vue"),
            meta: {},
        },
        {
            path: "/",
            name: "首页",
            component: () => import("@/layout/Default.vue"),
            children: [
                {
                    path: "home",
                    name: "首页",
                    component: () => import("@/views/home/index.vue"),
                    meta: {
                        viewtag: true,
                    },
                },
                {
                    path: "test1",
                    name: "测试1",
                    component: () => import("@/views/test1/index.vue"),
                    meta: {
                        viewtag: true,
                    },
                },
                {
                    path: "/test2",
                    name: "测试2",
                    component: () => import("@/views/test2/index.vue"),
                    meta: {
                        viewtag: true,
                    },
                },
                {
                    path: "/test3",
                    name: "测试3",
                    component: () => import("@/views/test3/index.vue"),
                    meta: {
                        viewtag: true,
                    },
                },
            ],
        },
        {
            path: "/",
            redirect: "/home",
        },
        {
            path: "/:pathMatch(.*)*",
            name: "notFound",
            component: () => import("@/views/error/404.vue"),
        },
    ],
});

router.beforeEach((to, from, next) => {
    console.log("路由守卫from：", from);
    console.log("路由守卫to：", to);
    next();
});

export default router;
