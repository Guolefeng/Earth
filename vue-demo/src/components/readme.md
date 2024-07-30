## UI 组件

组件

### 设计规范

### 属性

```ts
interface IData {}
interface IConfig {}
interface IItem {}
const props = withDefaults(
    defineProps<{
        value?: string; // 基本类型值
        data?: IData; // 引用类型值
        config?: IConfig; // 属性配置
        list?: IItem[]; // 列表配置
    }>(),
    {
        value: "",
        data: () => ({}),
        list: () => [],
        config: () => ({}),
    }
);
```

### 事件

```ts
const emit = defineEmits<{
    (e: "change", value: string): void;
}>();
```

### FAQ
