import NormalLayout from '@/layouts/normalLayout'
import MainLayout from '@/layouts/mainLayout'

import HomePage from '@/pages/Home'
import Login from '@/pages/Login'

let normalRoutes = [{
    exact: true,
    path: '/login',
    component: Login,
}]

let mainRoutes = [{
    exact: true,
    path: '/',
    component: HomePage,
}]


normalRoutes = normalRoutes.map((r: any) => ({ ...r, layout: NormalLayout }))
mainRoutes = mainRoutes.map((r: any) => ({ ...r, layout: MainLayout }))

export default {
    normalRoutes,
    mainRoutes,
    combineRoutes: [...normalRoutes, ...mainRoutes],
}
