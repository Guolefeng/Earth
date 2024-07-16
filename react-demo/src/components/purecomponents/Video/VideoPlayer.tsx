/**
 * 视频播放器
 * 支持修改播放速度、画中画、下载等功能
 * react-player demo: https://cookpete.com/react-player
 * react-player 文档: https://github.com/CookPete/react-player
 */

import React from 'react'
import ReactPlayer from 'react-player/file'

interface IProgress {
    played: number;         // 0 - 1 已播放进度
    playedSeconds: number;  // 已播放多少秒
    loaded: number;         // 0 - 1 已加载进度
    loadedSeconds: number;  // 已加载多少秒
}

interface IProps {
    /**
     * 视频地址
     * 支持格式：map4、webm、ogv、mp3、HLS(m3u8)、DASH(mpd)
     */
    url: string;
    /**
     * 暂停或播放视频
     */
    playing?: boolean;
    /**
     * 是否循环播放
     */
    loop?: boolean;
    /**
     * 是现实原生视频播放按钮栏
     */
    controls?: boolean;
    /**
     * 视频音量
     */
    volume?: number;
    /**
     * 视频宽度
     */
    width?: string;
    /**
     * 视频高度
     */
    height?: string;
    /**
     * 视频根节点样式
     */
    style?: any;
    /**
     * 播放加载进度回调
     */
    onProgress?: (progress: IProgress) => {};
    /**
     * 其他属性参考 https://github.com/CookPete/react-player
     */
    [propsName: string]: any;
}

const VideoPlayer = (props: IProps) => {
    const {
        url,
        playing = true,
        loop,
        controls = true,
        volume,
        width = '640px',
        height = '360px',
        style,
        onProgress,
        ...otherProps
    } = props

    return (
        <ReactPlayer
            url={url}
            playing={playing}
            controls={controls}
            loop={loop}
            volume={volume}
            width={width}
            height={height}
            style={style}
            onProgress={onProgress}
            {...otherProps}
        />
    )
}

export default VideoPlayer