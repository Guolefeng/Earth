import React, { useState, useEffect, useRef } from 'react'
import ReactQuill from 'react-quill'
import { message } from 'antd'

interface IProps {
    initValue?: string;
    onChange?: Function;
    readonly?: boolean;
    maxlegnth?: number;
}

const RichTextEditor = (props: IProps) => {
    const { initValue = '', onChange, readonly, maxlegnth = 200 } = props
    const [value, setValue] = useState(initValue)
    const quillRef = useRef<any>({})

    useEffect(() => {
        setValue(initValue)
    }, [initValue])

    const onQuillChange = (value: string) => {
        setValue(value)
        onChange && onChange(value)
    }

    const onKeyDown = (e: any) => {
        const unprivilegedEditor = quillRef.current.getEditor();
        if (unprivilegedEditor.getLength() > maxlegnth) {
            message.warning(`超过最大长度${maxlegnth}, 无法继续输入`)
            e.preventDefault()
        }
    }

    // How to disable images when pasting https://github.com/quilljs/quill/issues/1108#issuecomment-259934504
    return (
        <ReactQuill
            ref={quillRef}
            theme="snow"
            formats={[
                'background',
                'bold',
                'color',
                'font',
                'code',
                'italic',
                'link',
                'size',
                'strike',
                'script',
                'underline',
                'blockquote',
                'header',
                'indent',
                'list',
                'align',
                'direction',
                'code-block',
                'formula'
            ]}
            value={value}
            onChange={onQuillChange}
            onKeyDown={onKeyDown}
            readOnly={readonly}
        />
    )
}

export default RichTextEditor