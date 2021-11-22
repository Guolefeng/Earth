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
            // }),
            // 全球矢量地图服务 (不好使)
            // imageryProvider : new Cesium.WebMapTileServiceImageryProvider({
            //     url: "http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles",
            //     layer: "tdtVecBasicLayer",
            //     style: "default",
            //     format: "image/jpeg",
            //     tileMatrixSetID: "GoogleMapsCompatible",
            //     show: false
            // }),
            // 全球影像地图服务 (不好使)
            // imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
            //     url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles",
            //     layer: "tdtBasicLayer",
            //     style: "default",
            //     format: "image/jpeg",
            //     tileMatrixSetID: "GoogleMapsCompatible",
            //     show: false
            // }),
            // 全球影像中文注记服务 (不好使)
            // imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
            //     url: "http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg",
            //     layer: "tdtAnnoLayer",
            //     style: "default",
            //     format: "image/jpeg",
            //     tileMatrixSetID: "GoogleMapsCompatible",
            //     show: false
            // }),
            // 全球矢量中文注记服务 (不好使)
            // imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
            //     url: "http://t0.tianditu.com/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg",
            //     layer: "tdtAnnoLayer",
            //     style: "default",
            //     format: "image/jpeg",
            //     tileMatrixSetID: "GoogleMapsCompatible"
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

        // Override behavior of home button
        viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function(commandInfo) {
            // Fly to custom position
            viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(116.39, 39.91, 20000000.0),
                // destination: Cesium.Cartesian3.fromDegrees(116.39, 39.91, 15000.0), // 天安门广场
            })

            // Tell the home button not to do anything
            commandInfo.cancel = true;
        });

        // 关闭大气层显示
        // viewer.scene.skyAtmosphere.show = false;

        window.viewer = viewer;
    }, [])
    return (
        <div id="earth" className="earth" />
    )
}

export default Earth;
