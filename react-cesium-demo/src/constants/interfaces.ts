export type SelectorRawValue = string | number;

export interface SelectorLabeledValue {
    key?: string;
    value: SelectorRawValue;
    label: React.ReactNode;
}

export type SelectorInitValue = SelectorRawValue | SelectorRawValue[] | SelectorLabeledValue | SelectorLabeledValue[] | undefined
