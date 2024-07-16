import React from 'react'

interface IProps {
    vertical?: boolean;
    text?: string | JSX.Element;
}

const CustomCollapse = (props: IProps) => {
    const { vertical, text = '暂无数据' } = props;
    return (
        <div className={`empty ${vertical ? 'empty-vertical' : ''}`}>
            <span className="empty-img" />
            <span className="empty-text">{text}</span>
        </div>
    )
}

export default CustomCollapse