import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import { DraggableModal, Icon } from '@/components/purecomponents'
import IconLib from './icons'

interface IProps {
    title?: string;
    visible?: boolean;
    value?: string;
    onChange?: Function;
    onCancel?: Function;
}

const IconSelectorModal = (props: IProps) => {
    const { title = '选择Icon', visible, value, onChange, onCancel } = props
    const [selected, setSelected] = useState(value)

    useEffect(() => {
        setSelected(value)
    }, [value])

    const onSelect = (type: string) => {
        onChange?.(type)
    }

    const handleCancel = () => {
        onCancel?.()
    }

    return (
        <DraggableModal
            title={title}
            width={600}
            visible={visible}
            footer={null}
            onCancel={handleCancel}
        >
            <div className="iconSelector">
                <Row gutter={[16, 24]}>
                    {IconLib.map((type: string, i: number) => (
                        <Col key={i} span={2}>
                            <div className={`iconSelector-item ${selected === type ? 'iconSelector-active' : ''}`} onClick={() => onSelect(type)}>
                                <Icon type={type} className="iconSelector-icon" />
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </DraggableModal>
    )
}

export default IconSelectorModal