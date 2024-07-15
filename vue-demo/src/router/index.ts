import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/login',
        name: '登录',
        component: () => import('@/views/login/index.vue'),
        meta: {
        },
    },
    {
        path: '/logout',
        name: '退出',
        component: () => import('@/views/logout/index.vue'),
        meta: {
        },
    },
    {
        path: '/portal',
        name: 'protal',
        component: () => import('@/views/portal/index.vue'),
        meta: {
        },
    },
    {
        path: '/sso',
        name: 'sso',
        component: () => import('@/views/sso/index.vue'),
        meta: {
        },
    },
    {
      path: '/home',
      name: '首页',
      component: () => import('@/layout/defaultLayout.vue'),
      children: [{
        path: 'test1',
        name: 'test1',
        component: () => import('@/views/test1/index.vue'),
        meta: {},
        children: [{
            path: 'first1',
            name: 'first-1',
            component: () => import('@/views/test1/list/index.vue'),
            meta: {
                viewtag: true,
            },
        }],
      }],
    },
    {
        path: '/test1',
        name: '测试1',
        component: () => import('@/layout/defaultLayout.vue'),
        children: [{
            path: 'test1-1',
            name: 'test1-1',
            component: () => import('@/views/test1/index.vue'),
            meta: {},
            children: [{
                path: 'f1',
                name: 'f1',
                component: () => import('@/views/test1/f1/index.vue'),
                meta: {
                    viewtag: true,
                },
            }, {
                path: 'f2',
                name: 'f2',
                component: () => import('@/views/test1/f2/index.vue'),
                meta: {
                    viewtag: true,
                },
            }, {
                path: '/test1/test1-1',
                redirect: '/test1/test1-1/f1',
            }],
        }],
    },
    {
        path: '/test2',
        name: '测试2',
        component: () => import('@/views/test2/index.vue'),
    },
    {
        path: '/test3',
        name: '测试3',
        component: () => import('@/views/test3/index.vue'),
    },
    {
        path: '/',
        redirect: '/home/test1',
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: () => import('@/views/error/404.vue'),
    }
  ]
})

export default router