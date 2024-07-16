import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { useRecoilValue } from 'recoil'
import { getDict } from '@/store/selector'
import { SelectorInitValue } from '@/constants/interfaces'

const { Option } = Select

interface IProps {
    dictId: string;
    filterLabel?: string; // 通过label过滤字典项
    onChange?: Function;
    initValue?: SelectorInitValue;
    disabled?: boolean;
    placeholder?: string;
    [propsName: string]: any;
}

const DictTypeSelector = (props: IProps) => {
    const { dictId, filterLabel, onChange, initValue, disabled, placeholder, ..._props } = props
    const list = useRecoilValue(getDict(dictId))
    const [value, setValue] = useState(initValue)

    useEffect(() => {
        setValue(initValue)
    }, [initValue])

    const onTypeChange = (e: any) => {
        setValue(e)
        onChange?.(e)
    }

    let resList = list || []

    if (filterLabel) {
        resList = list.filter((e: any) => (e.label === filterLabel))
    }

    return (
        <Select
            showSearch
            placeholder={placeholder}
            optionFilterProp="children"
            value={value}
            onChange={onTypeChange}
            filterOption={(input, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            allowClear
            disabled={disabled}
            {..._props}
        >
            {resList.map((e: any) => (<Option key={e.dictValueCode} value={e.dictValueCode}>{e.dictValue}</Option>))}
        </Select>
    )
}

export default DictTypeSelector