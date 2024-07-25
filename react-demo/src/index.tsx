import React from "react";
import { createRoot } from "react-dom/client";
import "@/assets/styles/index.less";
import { ConfigProvider, Spin, message } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import { RecoilRoot } from "recoil";
import { DebugObserver } from "@/store/debug";
import Routers from "@/routers";
import "@/locales/index";

const { Suspense } = React;

message.config({
    maxCount: 1,
});

const container = document.getElementById("root");
const root = createRoot(container as HTMLElement);
// 装载
root.render(
    <Suspense fallback={<Spin size="large" />}>
        <ConfigProvider locale={zhCN}>
            <RecoilRoot>
                <DebugObserver />
                <Routers />
            </RecoilRoot>
        </ConfigProvider>
    </Suspense>
);
// 卸载
// root.unmount();
