export interface ICommon {
    [prop: string]: any;
}
export interface ConfigCommon {
    show: boolean;
    operateColumn: boolean;
    [prop: string]: any;
}
export interface IOpItem {
    label?: string; // 描述
    config?: ICommon; // 属性配置
    click?: (row: any, e: Event) => void; // 点击事件
    visible?: boolean | ((row: any, op: IOpItem) => boolean); // 是否显示
    disabled?: boolean | ((row: any, op: IOpItem) => boolean); // 是否禁用
}
export interface IItem {
    label: string; // 描述
    prop?: string; // 属性名
    slot?: string; // 插槽名
    config?: ICommon; // 属性配置 https://element-plus.org/zh-CN/component/table.html#table-column-api
}
