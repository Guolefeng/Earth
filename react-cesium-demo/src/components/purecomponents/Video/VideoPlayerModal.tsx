import React from 'react'
import { Modal } from 'antd'
import Video from './VideoPlayer'

interface IProps {
    url: string;
    visible?: boolean;
    width?: number | string;
    onClose?: Function;
    /**
     * 其他属性参考 https://ant.design/components/modal-cn/
     */
    [propsName: string]: any;
}

const VideoPlayerModal = (props: IProps) => {
    const { url, visible, width, onClose = () => {}, ...otherProps } = props

    return (
        <Modal
            visible={visible}
            title={null}
            footer={null}
            width={width || '730px'}
            bodyStyle={{ backgroundColor: '#0707079e', borderRadius: '4px' }}
            onCancel={() => onClose?.()}
            mask={false}
            maskClosable={false}
            {...otherProps}
        >
            <Video
                url={url}
                playing={visible}
                style={{ margin: '20px', borderRadius: '4px', overflow: 'hidden' }}
            />
        </Modal>
    )
}

export default VideoPlayerModal
