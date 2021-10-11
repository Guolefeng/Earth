import React, { useEffect } from 'react';
import './index.css';
import * as Cesium  from "cesium/Cesium";
import 'cesium/Widgets/widgets.css';

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1NGFkNmRmNC05NmFkLTRmMDktYTFkMS0yNTE0NjNmOWEwYjMiLCJpZCI6NjA1MDAsImlhdCI6MTYyNTEyMDcyNn0.S14rriO-ggk-vKvkUa3wONp0zSAOEUBBx8tZJRrPzqY';

const Earth = () => {
    useEffect(() => {
        const viewer = new Cesium.Viewer(document.getElementById('earth'), {
            animation: false, // 是否创建动画小器件， 左下角仪表
            timeline: false, // 是否显示时间线控件
            fullscreenButton: false, // 右下角全屏按钮
        });
        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(116.39, 39.91, 20000000.0),
            // destination: Cesium.Cartesian3.fromDegrees(116.39, 39.91, 15000.0), // 天安门广场
        })
    }, [])
    return (
        <div id="earth" className="earth" />
    )
}

export default Earth;
