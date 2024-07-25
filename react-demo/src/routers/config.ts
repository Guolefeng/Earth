import NormalLayout from "@/layouts/normalLayout";
import MainLayout from "@/layouts/mainLayout";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Test from "@/pages/Test";

let normalRoutes = [
    {
        exact: true,
        path: "/login",
        element: Login,
    },
];

let mainRoutes = [
    {
        exact: true,
        path: "/",
        element: Home,
    },
    {
        exact: true,
        path: "/test",
        element: Test,
    },
];

normalRoutes = normalRoutes.map((r: any) => ({ ...r, layout: NormalLayout }));
mainRoutes = mainRoutes.map((r: any) => ({ ...r, layout: MainLayout }));

const routeConfig = {
    normalRoutes,
    mainRoutes,
    combineRoutes: [...normalRoutes, ...mainRoutes],
};

export default routeConfig;
