import React, { useState, useEffect } from 'react'
import { Select } from 'antd'

const { Option } = Select

interface IProps {
    onChange?: Function;
    initValue?: string;
    disabled?: boolean;
    keyField?: any;
    titleField?: any;
    placeholder?:string;
    list?:any;
    width?: number;
}

// 选择器   Select
const CustomSelector = (props: IProps) => {
    const {
        onChange,
        initValue,
        disabled,
        keyField,
        titleField,
        placeholder,
        list,
        width
    } = props
    const [value, setValue] = useState(initValue)

    useEffect(() => {
        setValue(initValue)
        handleChange(initValue)
    }, [initValue])

    const handleChange = (e: any) => {
        setValue(e)
        onChange && onChange(e)
    }

    return (
        <Select
            showSearch
            placeholder={placeholder || '请选择'}
            optionFilterProp="children"
            value={value}
            onChange={handleChange}
            filterOption={(input, option: any) => {
                return option?.children?.props?.children?.props?.children?.at()?.props?.children?.toLowerCase()?.indexOf(input.toLowerCase()) >= 0
            }}
            allowClear
            disabled={disabled}
            style={{ width: width }}
        >
            {list.map((e: any) => {
                return (
                    <Option key={e[keyField]} value={e[keyField]}>
                        {e[titleField]}
                    </Option>
                )
            })}
        </Select>
    )
}

export default CustomSelector