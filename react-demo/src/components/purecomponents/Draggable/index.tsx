import React, { useRef, useEffect } from 'react'

interface IProps {
    children: React.ReactElement;
    onTransformChange?: Function;
}

const Draggable = (props: IProps) => {
    const { children, onTransformChange } = props
    const ref = useRef<any>({})
    const position = {
        startX: 0,
        startY: 0,
        dx: 0,
        dy: 0,
        tx: 0,
        ty: 0,
    }

    useEffect(() => {
        document.addEventListener('mouseup', mouseUp)
        return () => {
            document.removeEventListener('mouseup', mouseUp)
        }
    })

    const updateTransform = (transformStr: string, tx: number, ty: number) => {
        if (onTransformChange) {
            onTransformChange(transformStr, tx, ty)
            return
        }
        ref.current.style.transform = transformStr
    }

    const mouseMove = (e: any) => {
        const tx = e.pageX - position.startX
        const ty = e.pageY - position.startY
        updateTransform(`translate(${tx}px,${ty}px)`, tx, ty)
        position.dx = tx
        position.dy = ty
    }

    const mouseUp = (e: any) => {
        document.removeEventListener('mousemove', mouseMove)
    }

    const mouseDown = (e: any) => {
        if (e.button !== 0) {
            // 只允许左键，右键问题在于不选择conextmenu就不会触发mouseup事件
            return
        }
        document.addEventListener('mousemove', mouseMove)
        position.startX = e.pageX - position.dx
        position.startY = e.pageY - position.dy
    }

    const newStyle = { ...children.props.style, cursor: 'move', userSelect: 'none' }

    return React.cloneElement(React.Children.only(children), {
        ref: ref,
        style: newStyle,
        onMouseDown: mouseDown,
    })
}

export default Draggable