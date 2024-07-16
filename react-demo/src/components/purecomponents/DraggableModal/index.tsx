import React, { useEffect, useRef } from 'react'
import { Modal } from 'antd'
import Draggable from '@/components/purecomponents/Draggable'

type getContainerFunc = () => HTMLElement
type IGetContainer = string | HTMLElement | getContainerFunc | false

interface IProps {
    title?: string;
    width?: number;
    visible?: boolean;
    style?: React.CSSProperties;
    footer?: Array<React.ReactElement> | null;
    destroyOnClose?: boolean;
    onOk?: (e: React.MouseEvent<HTMLElement>) => void;
    onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
    children?: React.ReactNode;
    wrapClassName?: string;
    className?: string;
    getContainer?: IGetContainer;
    forceRender?: boolean;
    zIndex?: number;
    closable?: boolean;
    centered?:boolean;
}

const DraggableModal = (props: IProps) => {
    const {
        title, width, visible, style, footer, destroyOnClose, zIndex,
        onOk, onCancel, children, wrapClassName, className,
        getContainer = false, forceRender = true, closable, centered = true
    } = props
    const ref = useRef<any>({})

    useEffect(() => {
        if (visible && ref?.current?.style) {
            // 每次打开弹窗时，重置弹窗拖拽位置
            ref.current.style.transform = ''
        }
    }, [visible])

    const onTransformChange = (transformStr: string) => {
        ref.current.style.transform = transformStr
    }

    const modalRender = (node: React.ReactNode) => (<div ref={ref}>{node}</div>)

    return (
        <Modal
            title={<Draggable onTransformChange={onTransformChange}><div>{title || '弹窗标题'}</div></Draggable>}
            width={width}
            visible={visible}
            style={style}
            footer={footer}
            destroyOnClose={destroyOnClose}
            onOk={onOk}
            onCancel={onCancel}
            modalRender={modalRender}
            wrapClassName={wrapClassName}
            className={className}
            getContainer={getContainer}
            forceRender={forceRender}
            zIndex={zIndex}
            closable={closable}
            centered={centered}
        >
            {children}
        </Modal>
    )
}

export default DraggableModal