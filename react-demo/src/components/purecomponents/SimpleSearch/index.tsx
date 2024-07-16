import React, { memo } from 'react'
import { Input, Row } from 'antd'

const { Search } = Input

type SizeType = 'small' | 'middle' | 'large' | undefined

interface ISimpleSearch {
    className?: string;
    placeholder?: any;
    /** 触发搜索方法 */
    onSearch: (value?: any) => void;
    size?: SizeType;
}

const SimpleSearch = (props: ISimpleSearch) => {
    const { className, placeholder, onSearch, size } = props
    return (<Row className={'simple-search' + (className ? ` ${className}` : '')}>
        <Search
            placeholder={placeholder}
            size={size || 'large'}
            onSearch={value => onSearch(value)}
            enterButton
            allowClear
        />
    </Row>)


}

export default memo(SimpleSearch)
