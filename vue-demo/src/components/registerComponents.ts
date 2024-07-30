import type { App } from "vue";
import * as UIComponent from "./ui";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

/**
 * 注册通用的全局组件
 * @param app
 */
export function registerUIComponents(app: App) {
    app.component("lz-dynamic-form", UIComponent.DynamicForm);
    app.component("lz-change-theme", UIComponent.ChangeTheme);
    app.component("lz-collapse-item", UIComponent.CollapseItem);
    app.component("lz-descriptions", UIComponent.Descriptions);
    app.component("lz-menu", UIComponent.Menu);
    app.component("lz-search-input", UIComponent.SearchInput);
    app.component("lz-table", UIComponent.Table);
    app.component("lz-tag", UIComponent.Tag);
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component);
    }
}
