/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import './index.less';
import * as Cesium from 'cesium/Cesium'
import 'cesium/Widgets/widgets.css'
import { Button } from 'antd'

console.log('cechk', Cesium)
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1NGFkNmRmNC05NmFkLTRmMDktYTFkMS0yNTE0NjNmOWEwYjMiLCJpZCI6NjA1MDAsImlhdCI6MTYyNTEyMDcyNn0.S14rriO-ggk-vKvkUa3wONp0zSAOEUBBx8tZJRrPzqY';
window.Cesium = Cesium;

const Earth = () => {
    const [type, setType] = useState(''); // point line polygon object
    const [entity, setEntity] = useState(null);
    const typeRef = useRef('');

    useEffect(() => {
        const container = document.getElementById('earth');
        const viewer = new Cesium.Viewer(container, {
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

        // Add basic drag and drop functionality
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

        point();
    }, [])

    const point = () => {
        const { Cesium, viewer } = window
        viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
            Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
        );

        function drawPoint(worldPosition) {
            const point = viewer.entities.add({
                position: worldPosition,
                point: {
                    color: Cesium.Color.RED,
                    pixelSize: 50,
                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                    disableDepthTestDistance: Number.POSITIVE_INFINITY,
                },
            });
            return point;
        }

        function drawLine(positionData) {
            const shape = viewer.entities.add({
                polyline: {
                    positions: positionData,
                    clampToGround: true,
                    width: 3,
                },
            });
            return shape;
        }

        function drawPolygon(positionData) {
            const shape = viewer.entities.add({
                polygon: {
                    hierarchy: positionData,
                    material: new Cesium.ColorMaterialProperty(
                        Cesium.Color.WHITE.withAlpha(0.7)
                    ),
                },
            });
            return shape;
        }


        let activeShapePoints = [];
        let activeShape;
        let floatingPoint;
        function terminateShape() {
            activeShapePoints.pop();
            switch (typeRef.current) {
                case 'line':
                    drawLine(activeShapePoints);
                    break;
                case 'polygon':
                    drawPolygon(activeShapePoints);
                    break;
                default:
                    break;
            }
            viewer.entities.remove(floatingPoint);
            viewer.entities.remove(activeShape);
            floatingPoint = undefined;
            activeShape = undefined;
            activeShapePoints = [];
        }

        const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        handler.setInputAction(function(e) {
            const scene = viewer.scene;
            const ellipsoid = scene.globe.ellipsoid;
            // 笛卡尔坐标
            const cartesian = scene.pickPosition(e.position);
            if (cartesian) {
                const cartographic = ellipsoid.cartesianToCartographic(cartesian);
                const lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(7);
                const lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(7);
                // 地理高度
                const height = (cartographic.height + 1).toFixed(2);
                // 相机高度
                const cameraHeight = viewer.camera.positionCartographic.height.toFixed(0);
                // 方向 (围绕Z轴旋转)
                const heading = Cesium.Math.toDegrees(viewer.camera.heading).toFixed(2);
                // 倾斜角度 (围绕Y轴旋转)
                const pitch = Cesium.Math.toDegrees(viewer.camera.pitch).toFixed(2);
                // 围绕X轴旋转
                const roll = Cesium.Math.toDegrees(viewer.camera.roll).toFixed(2);
                console.log('坐标与相机角度：', {
                    longitude: lon,
                    latitude: lat,
                    height: height,
                    cameraHeight: cameraHeight,
                    orientation: {
                        heading,
                        pitch,
                        roll,
                    }
                })
            }

            // console.log('屏幕坐标：', e);

            // console.log('世界坐标（笛卡尔坐标）：', viewer.scene.camera.pickEllipsoid(e.position, viewer.scene.globe.ellipsoid))

            // const ray = viewer.camera.getPickRay(e.position);
            // const position = viewer.scene.globe.pick(ray, viewer.scene);
            // console.log('地标坐标：', position)

            // console.log('场景坐标：', viewer.scene.pickPosition(e.position));

            // 拾取Entity
            const pick =  viewer.scene.pick(e.position);
            setEntity(pick)
            if (pick) {
                console.log('拾取entity: ', pick);
            }

            // 绘制点、线、面、体
            const ray = viewer.camera.getPickRay(e.position);
            const earthPosition = viewer.scene.globe.pick(ray, viewer.scene);

            if (Cesium.defined(earthPosition)) {
                switch (typeRef.current) {
                    case 'point':
                        drawPoint(earthPosition);
                        break;
                    case 'line':
                        if (activeShapePoints.length === 0) {
                            floatingPoint = drawPoint(earthPosition);
                            activeShapePoints.push(earthPosition);
                            const dynamicPositions = new Cesium.CallbackProperty(function () {
                                return activeShapePoints;
                            }, false);
                            activeShape = drawLine(dynamicPositions);
                        }
                        activeShapePoints.push(earthPosition)
                        break;
                    case 'polygon':
                        if (activeShapePoints.length === 0) {
                            floatingPoint = drawPoint(earthPosition);
                            activeShapePoints.push(earthPosition);
                            const dynamicPositions = new Cesium.CallbackProperty(function () {
                                return new Cesium.PolygonHierarchy(activeShapePoints);
                            }, false);
                            activeShape = drawPolygon(dynamicPositions);
                        }
                        activeShapePoints.push(earthPosition)
                        break;
                    default:
                        break;
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        handler.setInputAction(function (event) {
            terminateShape();
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

        handler.setInputAction(function (event) {
            if (Cesium.defined(floatingPoint)) {
                const ray = viewer.camera.getPickRay(event.endPosition);
                const newPosition = viewer.scene.globe.pick(ray, viewer.scene);
                if (Cesium.defined(newPosition)) {
                    floatingPoint.position.setValue(newPosition);
                    activeShapePoints.pop();
                    activeShapePoints.push(newPosition);
                }
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    }

    const onClick = (t) => {
        const newVal = t === type ? '' : t;
        setType(newVal);
        typeRef.current = newVal;
    }
    return (
        <div id="earth" className="earth">
            <div className="earth-left">
                <Button onClick={() => onClick('point')}>{type === 'point' ? '取消' : ''}绘制点</Button>
                <Button onClick={() => onClick('line')}>{type === 'line' ? '取消' : ''}绘制线</Button>
                <Button onClick={() => onClick('polygon')}>{type === 'polygon' ? '取消' : ''}绘制面</Button>
                <Button onClick={() => onClick('object')}>{type === 'object' ? '取消' : ''}绘制体</Button>
            </div>
            {entity
                ? <div className="earth-right">right</div>
                : null
            }
        </div>
    )
}

export default Earth;
