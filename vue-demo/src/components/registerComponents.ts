import type { App } from "vue";
import * as UIComponent from "./ui";
import * as BizComponent from "./biz";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

/**
 * 注册通用的全局组件
 * @param app
 */
export function registerUIComponents(app: App) {
    app.component("ui-dynamic-form", UIComponent.DynamicForm);
    app.component("ui-change-theme", UIComponent.ChangeTheme);
    app.component("ui-collapse-item", UIComponent.CollapseItem);
    app.component("ui-descriptions", UIComponent.Descriptions);
    app.component("ui-menu", UIComponent.Menu);
    app.component("ui-search-input", UIComponent.SearchInput);
    app.component("ui-table", UIComponent.Table);
    app.component("ui-tag", UIComponent.Tag);
    app.component("ui-icon", UIComponent.SvgIcon);
    app.component("ui-textloading", UIComponent.TextLoading);
    app.component("biz-crudpage", BizComponent.CRUDPage);
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component);
    }
}
