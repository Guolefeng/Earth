import { createApp } from "vue";
import store from "./stores";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import "cesium/Build/Cesium/Widgets/widgets.css";
import "./styles/base.less";
import "element-plus/dist/index.css";

const app = createApp(App);

app.use(store);
app.use(router);
app.use(ElementPlus, { locale: zhCn });
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.mount("#app");
