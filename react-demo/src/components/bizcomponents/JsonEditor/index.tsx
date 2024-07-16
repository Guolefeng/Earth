import React, { useEffect, useRef, memo, forwardRef, useImperativeHandle } from 'react'
import JSONEditor from 'jsoneditor'

interface IProps {
    refInstance: any;
    initJson?: any;
    onChange?: Function;
    onErrorChange?: Function;
}

let editor: any

const JsonEditor = (props: IProps) => {
    const { refInstance, initJson = {}, onChange, onErrorChange } = props
    const jsonEditorRef = useRef<any>(null)

    useImperativeHandle(refInstance, () => ({
        setValue,
    }))

    useEffect(() => {
        const container = jsonEditorRef?.current
        if (container) {
            editor = new JSONEditor(container, {
                mode: 'code',
                modes: ['code', 'text', 'tree'],
                onChange: () => {
                    let jsonData = null
                    let err = null
                    try {
                        jsonData = editor.get()
                    } catch (error) {
                        err = error
                    }
                    onChange && onChange(jsonData)
                    onErrorChange && onErrorChange(err)
                },
            })

            // 初始化 json
            editor.set(initJson)
        }
    }, [])

    const setValue = (val: any) => {
        if (editor) {
            editor.set(val)
        }
    }

    return <div ref={jsonEditorRef} className="jsoneditor"></div>
}

// export default JsonEditor

export default memo(forwardRef((props: any, ref: any) => <JsonEditor {...props} refInstance={ref} />))