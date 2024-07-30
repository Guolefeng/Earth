// plugins/notify.js
import { ElMessage, ElNotification } from "element-plus";
import type { App } from "vue";

type PluginInstallFunction<Options> = Options extends unknown[]
    ? (app: App, ...options: Options) => any
    : (app: App, options: Options) => any;

export type Plugin<Options = any[]> =
    | (PluginInstallFunction<Options> & {
          install?: PluginInstallFunction<Options>;
      })
    | {
          install: PluginInstallFunction<Options>;
      };

const notify: Plugin = {
    install(app: App) {
        const notify = {
            success(message: string) {
                ElMessage({
                    message,
                    type: "success",
                });
            },
            error(message: string) {
                ElMessage({
                    message,
                    type: "error",
                });
            },
            warning(message: string) {
                ElMessage({
                    message,
                    type: "warning",
                });
            },
            info(message: string) {
                ElMessage({
                    message,
                    type: "info",
                });
            },
            notifySuccess(title: string, message?: string) {
                ElNotification({
                    title,
                    message,
                    type: "success",
                });
            },
            notifyError(title: string, message?: string) {
                ElNotification({
                    title,
                    message,
                    type: "error",
                });
            },
            notifyWarning(title: string, message?: string) {
                ElNotification({
                    title,
                    message,
                    type: "warning",
                });
            },
            notifyInfo(title: string, message?: string) {
                ElNotification({
                    title,
                    message,
                    type: "info",
                });
            },
        };

        // 使用 provide 注册全局方法
        app.provide("notify", notify);

        // 使用 config.globalProperties 注册全局属性
        app.config.globalProperties.$notify = notify;
    },
};

export default notify;
