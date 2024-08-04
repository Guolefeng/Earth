import type { FormItemRule } from "element-plus";

export interface IOption {
    label: string;
    value: string | number;
}

export type IType =
    | "el-input"
    | "el-input-number"
    | "el-select"
    | "el-select-v2"
    | "el-option"
    | "el-date-picker"
    | "el-time-picker"
    | "el-switch"
    | "el-checkbox-group"
    | "el-checkbox"
    | "el-radio-group"
    | "el-radio"
    | "el-cascader"
    | "el-color-picker"
    | "el-rate"
    | "el-slider"
    | "el-tree-select"
    | "el-time-select"
    | "select-options"
    | "checkbox-options"
    | "radio-options";

export interface IConfig {
    [prop: string]: any;
}

export interface ILayout {
    span?: number;
    offset?: number;
    push?: number;
    pull?: number;
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    tag?: string;
}

export interface IFormItem {
    label: string;
    prop: string;
    type?: IType;
    options?: IOption[];
    rules?: FormItemRule[];
    slot?: string;
    config?: IConfig; // 对应type类型组件的属性
    layout?: ILayout;
    children?: {
        type?: IType;
        options?: IOption[];
        config?: IConfig; // 对应type类型组件的属性
    };
}

export interface IData {
    [prop: string]: string | number | boolean | string[] | number[];
}

export interface IFormConfig {
    // form属性 https://element-plus.org/zh-CN/component/form.html#form-api
    inline?: boolean;
    labelPosition?: "left" | "right";
    labelWidth?: string | number;
    labelSuffix?: string;
    size?: "large" | "default" | "small";
    disabled?: boolean;
    statusIcon?: boolean;
    [prop: string]: any;
}
