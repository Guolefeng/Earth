import React from 'react'
import { Collapse } from 'antd'
import Icon from '@/components/purecomponents/Icon'

const { Panel } = Collapse

interface IProps {
    panels: Array<any>;
    className?: string;
}

const CustomCollapse = (props: IProps) => {
    const { panels, className } = props;
    return (
        <Collapse
            bordered={false}
            defaultActiveKey={panels.map((e: any, i: number) => String(i))}
            expandIcon={({ isActive }) => <Icon type="CaretRightOutlined" style={{ transform: `rotateZ(${isActive ? 90 : 0}deg)` }} />}
            className={`collapse ${className || ''}`}
        >
            {panels.map((e: any, i: number) => (
                <Panel key={i} header={e.header} className={`collapse-panel ${e.className || ''}`}>
                    {e.content}
                </Panel>
            ))}
        </Collapse>
    )
}

export default CustomCollapse