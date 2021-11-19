import React, { useEffect } from 'react';
import './index.css';
import * as Cesium  from "cesium/Cesium";
import 'cesium/Widgets/widgets.css';

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1NGFkNmRmNC05NmFkLTRmMDktYTFkMS0yNTE0NjNmOWEwYjMiLCJpZCI6NjA1MDAsImlhdCI6MTYyNTEyMDcyNn0.S14rriO-ggk-vKvkUa3wONp0zSAOEUBBx8tZJRrPzqY';
window.Cesium = Cesium;

const Earth = () => {
    useEffect(() => {
        const viewer = new Cesium.Viewer(document.getElementById('earth'), {
            animation: false, // 是否创建动画小器件， 左下角仪表
            timeline: false, // 是否显示时间线控件
            fullscreenButton: false, // 右下角全屏按钮
            terrainProvider: Cesium.createWorldTerrain({
                requestVertexNormals: true,
                requestWaterMask: true,
            }),
            // skyBox: new Cesium.SkyBox({
            //     sources: {
            //         positiveX: 'stars/TychoSkymapII.t3_08192x04096_80_px.jpg',
            //         negativeX: 'stars/TychoSkymapII.t3_08192x04096_80_mx.jpg',
            //         positiveY: 'stars/TychoSkymapII.t3_08192x04096_80_py.jpg',
            //         negativeY: 'stars/TychoSkymapII.t3_08192x04096_80_my.jpg',
            //         positiveZ: 'stars/TychoSkymapII.t3_08192x04096_80_pz.jpg',
            //         negativeZ: 'stars/TychoSkymapII.t3_08192x04096_80_mz.jpg'
            //     }
            // })
        });
        // 使用天地图影像
        viewer.imageryLayers.addImageryProvider(
            new Cesium.UrlTemplateImageryProvider({
                url: 'https://t{s}.tianditu.gov.cn/DataServer?T=ibo_w&x={x}&y={y}&l={z}&tk=78c0c5a1844ab8a716f09bc9113d909d',
                subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
                layer: 'tdtIboLayer',
                style: 'default',
                format: 'image/png',
                tileMatrixSetID: 'GoogleMapsCompatible'
            })
        )
        viewer.imageryLayers.addImageryProvider(
            new Cesium.UrlTemplateImageryProvider({
                url: 'https://t{s}.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=78c0c5a1844ab8a716f09bc9113d909d',
                subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
                layer: 'tdtCiaLayer',
                style: 'default',
                format: 'image/png',
                tileMatrixSetID: 'GoogleMapsCompatible'
            })
        )
        // viewer.scene.globe.enableLighting = true;
        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(116.39, 39.91, 20000000.0),
            // destination: Cesium.Cartesian3.fromDegrees(116.39, 39.91, 15000.0), // 天安门广场
        })
        // 显示帧速
        viewer.scene.debugShowFramesPerSecond = true;

        //Add basic drag and drop functionality
        viewer.extend(Cesium.viewerDragDropMixin);
        // Show a pop-up alert if we encounter an error when processing a dropped file
        viewer.dropError.addEventListener((dropHandler, name, error) => {
            console.log('Cesium viewer drop error: ', error);
            window.alert(error);
        })

        window.viewer = viewer;
    }, [])
    return (
        <div id="earth" className="earth" />
    )
}

export default Earth;
