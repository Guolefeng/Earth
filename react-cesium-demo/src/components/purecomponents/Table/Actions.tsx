import React, { memo } from 'react'
import { Button, Tooltip } from 'antd';
import { Icon } from '@/components/purecomponents'
import _ from 'lodash'

const Actions = (props: any) => {
    const { data = [], extra, selectedRows = [] } = props

    const getBtnDisabled = (disabled: any) => {
        if (typeof disabled === 'boolean') {
            return disabled
        } else if (typeof disabled === 'function') {
            if (!selectedRows.length) {
                return true
            }
            return disabled(selectedRows)
        }
        return false
    }

    const _data = _.filter(data, (item: any) => item.visible === true || !item.hasOwnProperty('visible'))

    if (_data.length || extra) {
        return <div className="app-actions">
            {
                _.map(_data, (item: any) => {
                    const icon = <Icon type={item.icon} />
                    const disabled = getBtnDisabled(item.disabled)
                    if (item?.tip) {
                        return (
                            <Button
                                key={item.id}
                                disabled={disabled}
                                type={item.buttonType || 'default'}
                                icon={icon}
                                onClick={() => item.click && item.click(item.id, selectedRows)}
                            >
                                {item.name}
                                <Tooltip title={item?.tip}><Icon type="InfoCircleOutlined" /></Tooltip>
                            </Button>
                        )
                    }
                    return (
                        <Button
                            key={item.id}
                            disabled={disabled}
                            type={item.buttonType || 'default'}
                            icon={icon}
                            onClick={() => item.click && item.click(item.id, selectedRows)}
                        >{item.name}</Button>
                    )
                })
            }
            {extra}
        </div>
    }
    return null
}

export default memo(Actions)