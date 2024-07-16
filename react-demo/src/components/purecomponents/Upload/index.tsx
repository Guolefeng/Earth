import React, { memo, useState, useEffect, ReactNode } from 'react'
import { Upload, Button, message } from 'antd'
import Icon from '@/components/purecomponents/Icon'
import DraggableModal from '@/components/purecomponents/DraggableModal'
import _ from 'lodash'
import { getFileBase64, minioFileDownloadUrl } from '@/utils/util'
import { baseApi } from '@/api'
import axios from 'axios'

const CancelToken = axios.CancelToken

interface IUploadFilesProps {
    /**
     * 初始值 {fileId, fileName} 或 [{fileId, fileName}, ...] 或 JSON串
     * fileName可有可无
     */
    value?: any;
    /**
     * 接受上传的文件类型 https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
     */
    accept?: string;
    /**
     * 上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card
     * @default picture-card
     */
    listType?: 'text' | 'picture' | 'picture-card';
    /**
     * 上传图标
     */
    iconType?: string;
    /**
     * 是否支持多选文件，ie10+ 支持。开启后按住 ctrl 可选择多个文件
     * @default false
     */
    multiple?: boolean;
    /**
     * 上传文字说明
     */
    uploadTitle?: string | ReactNode;
    /**
     * 是否禁用
     * @default false
     */
    disabled?: boolean;
    /**
     * 文件类型  用于默认预览
     */
    fileType?: 'video' | 'image';
    /**
     * 限制上传数量。当为 1 时，始终用最新上传的文件代替当前文件
     * @default 0
     */
    maxCount?: number;
    /**
     * 限制文件大小
     */
    fileSizeLimit?: number;
    /**
     * 回调方法  data 为数组 []
     * 被设置了 name 属性的 Form.Item 包装的控件，表单控件会自动添加 value（或 valuePropName 指定的其他属性）onChange（或 trigger 指定的其他属性），数据同步将被 Form 接管
     */
    onChange?: (data: any[]) => void;
    /**
     * 是否稍后上传，true = 稍后上传   false = 立即上传
     * @default false
     */
    uploadLater?: boolean;
    /**
     * 自定义上传列表
     */
    itemRender?: any;
    /**
     * Upload组件 其他属性
     */
    [propsName: string]: any;
}

// 初始值转换
const getDefaultFileList = (info: any): any => {
    if (Array.isArray(info)) {
        return _.reduce(info, (pre: any[], val: any, index: number) => {
            if (val?.originFileObj && val.originFileObj instanceof File) {
                pre.push(val)
            } else {
                const { fileId, fileName } = val || {}
                if (fileId) {
                    pre.push({
                        fileId,
                        fileName,
                        uid: fileId,
                        name: fileName,
                        thumbUrl: minioFileDownloadUrl(fileId, fileName),
                        url: minioFileDownloadUrl(fileId, fileName),
                    })
                }
            }
            return pre
        }, [])
    } else if (typeof info === 'string') {
        if (info === null || info === '' || info === undefined) {
            return []
        }
        try {
            let jsonObj = JSON.parse(info)
            if (jsonObj) {
                return getDefaultFileList(jsonObj)
            }
        } catch (e) {
            console.log(e)
        }
    } else if (info && info?.fileId) {
        const { fileId, fileName } = info
        return [{
            fileId,
            fileName,
            uid: fileId,
            name: fileName,
            thumbUrl: minioFileDownloadUrl(fileId, fileName),
            url: minioFileDownloadUrl(fileId, fileName),
        }]
    }
    return []
}

const UploadFiles = (props: IUploadFilesProps) => {
    const {
        value,
        accept,
        listType,
        iconType,
        multiple,
        uploadTitle,
        disabled,
        fileType,
        maxCount = 0,
        fileSizeLimit,
        onChange,
        uploadLater = false, // 是否稍后上传，true = 稍后上传 false = 立即上传
        itemRender,
        ...otherProps
    } = props || {}

    const [fileList, setFileList] = useState<any[]>([])
    const [previewVisible, setPreviewVisible] = useState(false)
    const [fileName, setFileName] = useState('')
    const [fileUrl, setFileUrl] = useState('')
    const [uploadCancel, setUploadCancel] = useState<any>({})

    useEffect(() => {
        setFileList(getDefaultFileList(value))
    }, [value])

    const fileUploadAction = (file: any, newFileList: any[]) => {
        let formData = new FormData()
        formData.append('file', file)
        baseApi.uploadFile(
            formData,
            null,
            new CancelToken(function excutor(c) {
                setUploadCancel({
                    ...uploadCancel,
                    [file?.uid || file?.name]: c,
                })
            })
        ).then((res: any) => {
            const { fileId, fileName, uploadUrl } = res?.data || {}
            delete uploadCancel[file?.uid || file?.name]
            if (fileId && fileName) {
                let list = [...newFileList, { fileId, fileName, uploadUrl }]
                onChange?.(list)
                setFileList([...newFileList, ...getDefaultFileList([{ fileId, fileName, uploadUrl }])])
            }
        })
    }

    const updateFileList = (list: any[]) => {
        setFileList(list)
        onChange?.(list)
    }

    const onUploadChange = (info: any) => {
        if (info?.file?.status === 'removed') {
            updateFileList(info?.fileList)
            // 中断请求
            let cancel = uploadCancel[info?.file?.uid || info?.file?.name]
            if (cancel) {
                cancel()
                delete uploadCancel[info?.file?.uid || info?.file?.name]
            }
        } else {
            if (fileSizeLimit && info?.file?.size > fileSizeLimit) {
                message.info(`请选择小于${fileSizeLimit / 1024 / 1024}M的文件`)
            } else if (accept) {
                let newFileList = [...fileList]
                const fileTypeArr = _.reduce(
                    accept.split(','),
                    (pre: any, value: string, index: number) => {
                        if (value) {
                            let val = value.trim()
                            val && pre.push(val)
                        }
                        return pre
                    },
                    []
                )
                let fileType = _.find(fileTypeArr, (item, index) => {
                    if (info?.file?.type === item || item === '*') {
                        return true
                    }
                    if (item.endsWith('*')) {
                        let list = item.split('*')
                        if (list.length) {
                            return _.includes(info?.file?.type, list[0])
                        }
                    }
                    return info?.file?.name?.endsWith(item)
                })
                if (!fileType) {
                    message.error('只支持上传的文件格式为: ' + accept)
                } else {
                    _.remove(newFileList, item => item.uid === info?.file?.uid)
                    let file = _.find(info?.fileList, item => item.uid === info?.file?.uid)
                    if (file) {
                        // 立刻上传
                        if (!uploadLater) {
                            fileUploadAction(file.originFileObj, newFileList)
                            return
                        } else {
                            newFileList.push(file)
                        }
                    }
                    updateFileList(newFileList)
                }
            } else {
                let list = [...fileList]
                _.remove(list, item => item.uid === info?.file?.uid)
                let file = _.find(info?.fileList, item => item.uid === info?.file?.uid)
                if (file) {
                    if (!uploadLater) {
                        fileUploadAction(file.originFileObj, list)
                        return
                    } else {
                        list.push(file)
                    }
                }
                updateFileList(list)
            }
        }
    }

    const onPreview = async (file: any) => {
        setPreviewVisible(true)
        setFileName(file?.name || file?.url?.substring(file?.url?.lastIndexOf('/') + 1))
        if (!file.url && !file.preview) {
            file.preview = await getFileBase64(file.originFileObj)
        }
        setFileUrl(file?.url || file?.preview)
    }

    const handleCancel = () => {
        setPreviewVisible(false)
    }

    const removeFile = (file: any, fileList: any) => {
        const listClone = _.cloneDeep(fileList)
        const i = _.findIndex(listClone, (e: any) => e.fileId === file.fileId)
        if (i > -1) {
            listClone.splice(i, 1)
            setFileList(listClone)
            onChange?.(listClone)
        }
    }

    const customItemRender = (originNode: any, file: any, fileList: any) => (
        <div className="upload-custom-list-item">
            <a target="_self" href={file.url} className="upload-custom-list-item-name">
                <Icon type="PaperClipOutlined" />{file.name}
            </a>
            {disabled
                ? null
                : <Icon className="upload-custom-list-item-action" type="DeleteOutlined" onClick={() => removeFile(file, fileList)} />
            }
        </div>
    )

    const _uploadProps = {
        accept: accept || '',
        listType: listType || 'picture-card',
        fileList: fileList,
        multiple: multiple || false,
        disabled: disabled,
        onChange: onUploadChange,
        beforeUpload: () => false,
        onPreview: listType === 'text' ? props.onPreview : onPreview,
        itemRender: itemRender ? itemRender : listType === 'text' ? customItemRender : undefined,
    }

    const uploadButton = listType && listType === 'text'
        ? <Button type="default">上传</Button>
        : <React.Fragment>
            <Icon type={iconType || 'PlusOutlined'} />
            <div className="ant-upload-text"></div>
        </React.Fragment>

    return <React.Fragment>
        <Upload {..._uploadProps} {...otherProps}>
            {(fileList?.length >= maxCount || disabled) ? null : uploadButton}
        </Upload>
        <div>{disabled ? null : uploadTitle}</div>
        <DraggableModal
            visible={previewVisible}
            title={fileName}
            footer={null}
            onCancel={handleCancel}
        >
            {
                fileType === 'video'
                    ? <video autoPlay controls={true} style={{ width: '100%' }} src={fileUrl} />
                    : <img alt="example" style={{ width: '100%' }} src={fileUrl} />
            }
        </DraggableModal>
    </React.Fragment>
}

export default memo(UploadFiles)