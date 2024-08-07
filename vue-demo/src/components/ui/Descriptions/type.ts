export interface IData {
    [prop: string]: string | number | boolean;
}

export interface IRowConfig {
    // el-descriptions-item属性(可选，全部属性参考：https://element-plus.org/zh-CN/component/descriptions.html#descriptionsitem-api)
    label?: string;
    span?: number;
    width?: string | number;
    minWidth?: string | number;
    align?: 'left' | 'center' | 'right';
    labelAlign?: 'left' | 'center' | 'right';
    className?: string;
    labelClassName?: string;
}

export interface IRow {
    label: string;
    prop: string;
    slot?: string;
    config?: IRowConfig;
}

export interface IConfig {
    // el-descriptions属性(可选，全部属性参考：https://element-plus.org/zh-CN/component/descriptions.html#descriptions-api)
    border?: boolean;
    column?: number;
    direction?: 'horizontal' | 'vertical';
    size?: '' | 'large' | 'default' | 'small';
    title?: string;
    extra?: string;
}
