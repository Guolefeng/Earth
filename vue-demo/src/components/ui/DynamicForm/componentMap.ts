import {
    ElInput,
    ElInputNumber,
    ElSelect,
    ElSelectV2,
    ElOption,
    ElDatePicker,
    ElTimePicker,
    ElSwitch,
    ElCheckboxGroup,
    ElCheckbox,
    ElRadioGroup,
    ElRadio,
    ElCascader,
    ElColorPicker,
    ElRate,
    ElSlider,
    ElTreeSelect,
    ElTimeSelect
} from 'element-plus';
import SelectOptions from './SelectOption.vue';
import CheckboxOptions from './CheckboxOption.vue';
import RadioOptions from './RadioOption.vue';

export const componentMap = {
    'el-input': ElInput,
    'el-input-number': ElInputNumber,
    'el-select': ElSelect,
    'el-select-v2': ElSelectV2,
    'el-option': ElOption,
    'el-date-picker': ElDatePicker,
    'el-time-picker': ElTimePicker,
    'el-switch': ElSwitch,
    'el-checkbox-group': ElCheckboxGroup,
    'el-checkbox': ElCheckbox,
    'el-radio-group': ElRadioGroup,
    'el-radio': ElRadio,
    'el-cascader': ElCascader,
    'el-color-picker': ElColorPicker,
    'el-rate': ElRate,
    'el-slider': ElSlider,
    'el-tree-select': ElTreeSelect,
    'el-time-select': ElTimeSelect,
    'select-options': SelectOptions,
    'checkbox-options': CheckboxOptions,
    'radio-options': RadioOptions
};
