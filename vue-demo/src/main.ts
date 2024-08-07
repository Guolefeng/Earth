import { createApp } from "vue";
import store from "./store";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { registerUIComponents } from "./components/registerComponents";
import notify from "./plugins/notify";
import "virtual:svg-icons-register";
import "./styles/base.less";

const app = createApp(App);

app.use(notify);
app.use(store);
app.use(router);
app.use(ElementPlus, { locale: zhCn });
registerUIComponents(app);
app.mount("#app");
