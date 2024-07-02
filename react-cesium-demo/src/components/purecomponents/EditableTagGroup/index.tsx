import React, { useState, useEffect, useRef } from 'react'
import { Tag, Input, Tooltip } from 'antd';
import Icon from '@/components/purecomponents/Icon'

interface IProps {
    onChange?: Function;
    initValue?: Array<string>
}

const EditableTagGroup = (props: IProps) => {
    const { initValue, onChange } = props
    const [tags, setTags] = useState<any>(initValue || [])
    const [inputVisible, setInputVisible] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [editInputIndex, setEditInputIndex] = useState(-1)
    const [editInputValue, setEditInputValue] = useState('')
    const input = useRef<any>(null)
    const editInput = useRef<any>(null)

    useEffect(() => {
        setTags(initValue)
    }, [initValue])

    useEffect(() => {
        if (inputVisible) {
            input?.current?.focus()
        }
    }, [inputVisible])

    const handleClose = (removedTag: string) => {
        const newTags = tags.filter((tag: string) => tag !== removedTag)
        setTags(newTags)
        onChange && onChange(newTags)
    }

    const showInput = () => {
        setInputVisible(true)
    }

    const handleInputChange = (e: any) => {
        setInputValue(e.target.value)
    }

    const handleInputConfirm = () => {
        let tmpTags:string[] = []
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tmpTags = [...tags, inputValue]
            setTags(tmpTags)
            setInputVisible(false)
            setInputValue('')
            onChange && onChange(tmpTags)
        }
    }

    const handleEditInputChange = (e: any) => {
        setEditInputValue(e.target.value)
    }

    const handleEditInputConfirm = () => {
        const newTags: string[] = [...tags]
        newTags[editInputIndex] = editInputValue
        setTags(newTags)
        setEditInputValue('')
        setEditInputIndex(-1)
        onChange && onChange(newTags)
    }

    return (
        <div className="etg">
            {tags.map((tag: string, index: number) => {
                if (editInputIndex === index) {
                    return (
                        <Input
                            ref={editInput}
                            key={tag}
                            size="small"
                            className="tag-input"
                            value={editInputValue}
                            onChange={handleEditInputChange}
                            onBlur={handleEditInputConfirm}
                            onPressEnter={handleEditInputConfirm}
                        />
                    )
                }
                const isLongTag = tag.length > 20;
                const tagElem = (
                    <Tag
                        className="edit-tag"
                        key={tag}
                        closable
                        onClose={() => handleClose(tag)}
                    >
                        <span
                            onDoubleClick={e => {
                                setEditInputValue(tag)
                                setEditInputIndex(index)
                                editInput?.current?.focus()
                                e.preventDefault()
                            }}
                        >
                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                        </span>
                    </Tag>
                )
                return isLongTag
                    ? (
                        <Tooltip title={tag} key={tag}>
                            {tagElem}
                        </Tooltip>
                    )
                    : tagElem
            })}
            {inputVisible && (
                <Input
                    ref={input}
                    type="text"
                    size="small"
                    className="tag-input"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                />
            )}
            {!inputVisible && (
                <Tag className="site-tag-plus" onClick={showInput}>
                    <Icon type="PlusOutlined" /> 添加标签
                </Tag>
            )}
        </div>
    )
}

export default EditableTagGroup
