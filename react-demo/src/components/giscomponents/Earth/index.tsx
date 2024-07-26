import React, { useEffect, useRef, useState } from "react";
import "./index.less";
import * as Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";
import { Button } from "antd";
import Polyline from "./polyline";
import DrawEntity from "./drawEntity";
import DataSource from "./dataSource";
import WallDiffuse from "./wallDiffuse";

window.Cesium = Cesium;

const opMap: any = {
    0: <DrawEntity />,
    1: <DataSource />,
    2: <Polyline />,
    3: <WallDiffuse />,
};

Cesium.Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1NGFkNmRmNC05NmFkLTRmMDktYTFkMS0yNTE0NjNmOWEwYjMiLCJpZCI6NjA1MDAsImlhdCI6MTYyNTEyMDcyNn0.S14rriO-ggk-vKvkUa3wONp0zSAOEUBBx8tZJRrPzqY";

const Earth = () => {
    const [type, setType] = useState(""); // point line polygon object
    const [entity, setEntity] = useState(null);
    const typeRef = useRef("");

    useEffect(() => {
        const container = document.getElementById("earth");
        const viewer = new Cesium.Viewer(container, {
            animation: false, // 是否创建动画小器件， 左下角仪表
            timeline: false, // 是否显示时间线控件
            fullscreenButton: false, // 右下角全屏按钮
            terrainProvider: Cesium.createWorldTerrain({
                // requestVertexNormals: true,
                requestWaterMask: true,
            }),
        });

        // viewer.scene.globe.enableLighting = true;
        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(
                116.39,
                39.91,
                20000000.0
            ),
            // destination: Cesium.Cartesian3.fromDegrees(116.39, 39.91, 15000.0), // 天安门广场
        });
        // 显示帧速
        viewer.scene.debugShowFramesPerSecond = true;

        // Add basic drag and drop functionality
        viewer.extend(Cesium.viewerDragDropMixin);
        // Show a pop-up alert if we encounter an error when processing a dropped file
        viewer.dropError.addEventListener(
            (dropHandler: any, name: any, error: any) => {
                console.log("Cesium viewer drop error: ", error);
                window.alert(error);
            }
        );

        // 修改homeButton的默认返回位置
        viewer.homeButton.viewModel.command.beforeExecute.addEventListener(
            function (commandInfo: any) {
                // Fly to custom position
                viewer.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(
                        116.39,
                        39.91,
                        20000000.0
                    ),
                    // destination: Cesium.Cartesian3.fromDegrees(116.39, 39.91, 15000.0), // 天安门广场
                });

                // Tell the home button not to do anything
                commandInfo.cancel = true;
            }
        );

        // 关闭大气层显示
        // viewer.scene.skyAtmosphere.show = false;

        // 添加OSM bulidings
        viewer.scene.primitives.add(Cesium.createOsmBuildings());
        // 添加瓦片坐标信息
        // viewer.imageryLayers.addImageryProvider(
        //     new Cesium.TileCoordinatesImageryProvider()
        // );
        // 不显示底图
        // viewer.imageryLayers.get(0).show = false;

        // 添加相机监听事件
        viewer.camera.moveEnd.addEventListener(() => {
            refreshViewRectangle(viewer);
        });

        // 自定义背景色
        // viewer.scene.skyBox.show = false;
        // viewer.scene.backgroundColor = Cesium.Color.GREEN;

        window.viewer = viewer;

        point();
    }, []);

    // 获取当前地图中心的经纬度
    function getCenterPosition(viewer: any) {
        let centerResult = viewer.camera.pickEllipsoid(
            new Cesium.Cartesian2(
                viewer.canvas.clientWidth / 2,
                viewer.canvas.clientHeight / 2
            )
        );
        let curPosition =
            Cesium.Ellipsoid.WGS84.cartesianToCartographic(centerResult);
        let curLongitude = (curPosition.longitude * 180) / Math.PI;
        let curLatitude = (curPosition.latitude * 180) / Math.PI;
        return {
            lon: curLongitude,
            lat: curLatitude,
        };
    }

    // 获取当前地图瓦片级别
    function tileLevel(viewer: any) {
        let tiles = new Set();
        let tilesToRender = viewer.scene.globe._surface._tilesToRender;
        if (Cesium.defined(tilesToRender)) {
            for (let i = 0; i < tilesToRender.length; i++) {
                tiles.add(tilesToRender[i].level);
            }
            console.log("当前地图瓦片级别为:");
            console.log(tiles);
        }
    }

    /**
     * @description: 获取当前可视矩形范围
     * @param {*} _viewer
     * @return {*}
     */
    function refreshViewRectangle(_viewer: any) {
        let rectangle = _viewer.camera.computeViewRectangle();
        console.log("当前可视范围矩形为：");
        console.log(rectangle);
    }

    /**
     * @description: 场景导出
     * @param {*} _viewer
     * @return {*}
     */
    function saveToImage(_viewer: any) {
        // 不写会导出为黑图
        _viewer.render();

        let canvas = _viewer.scene.canvas;
        let image = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");

        let link = document.createElement("a");
        let blob = dataURLtoBlob(image);
        let objurl = URL.createObjectURL(blob);
        link.download = "scene.png";
        link.href = objurl;
        link.click();
    }

    function dataURLtoBlob(dataurl: any) {
        let arr = dataurl.split(",");
        let mime = arr[0].match(/:(.*?);/)[1];
        let bstr = atob(arr[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {
            type: mime,
        });
    }

    const point = () => {
        const { Cesium, viewer } = window;
        viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
            Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
        );

        function drawPoint(worldPosition: any) {
            const point = viewer.entities.add({
                position: worldPosition,
                point: {
                    color: Cesium.Color.RED,
                    pixelSize: 50,
                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                    // disableDepthTestDistance: Number.POSITIVE_INFINITY,
                },
            });
            return point;
        }

        function drawLine(positionData: any) {
            const shape = viewer.entities.add({
                polyline: {
                    positions: positionData,
                    clampToGround: true,
                    width: 3,
                },
            });
            return shape;
        }

        function drawPolygon(positionData: any) {
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

        let activeShapePoints: any = [];
        let activeShape: any;
        let floatingPoint: any;
        function terminateShape() {
            activeShapePoints.pop();
            switch (typeRef.current) {
                case "line":
                    drawLine(activeShapePoints);
                    break;
                case "polygon":
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
        handler.setInputAction(function (e: any) {
            const scene = viewer.scene;
            const ellipsoid = scene.globe.ellipsoid;
            // 笛卡尔坐标
            const cartesian = scene.pickPosition(e.position);
            if (cartesian) {
                const cartographic =
                    ellipsoid.cartesianToCartographic(cartesian);
                const lon = Cesium.Math.toDegrees(
                    cartographic.longitude
                ).toFixed(7);
                const lat = Cesium.Math.toDegrees(
                    cartographic.latitude
                ).toFixed(7);
                // 地理高度
                const height = (cartographic.height + 1).toFixed(2);
                // 相机高度
                const cameraHeight =
                    viewer.camera.positionCartographic.height.toFixed(0);
                // 方向 (围绕Z轴旋转)
                const heading = Cesium.Math.toDegrees(
                    viewer.camera.heading
                ).toFixed(2);
                // 倾斜角度 (围绕Y轴旋转)
                const pitch = Cesium.Math.toDegrees(
                    viewer.camera.pitch
                ).toFixed(2);
                // 围绕X轴旋转
                const roll = Cesium.Math.toDegrees(viewer.camera.roll).toFixed(
                    2
                );
                console.log("坐标与相机角度：", {
                    longitude: lon,
                    latitude: lat,
                    height: height,
                    cameraHeight: cameraHeight,
                    orientation: {
                        heading,
                        pitch,
                        roll,
                    },
                });
            }

            // console.log('屏幕坐标：', e);

            // console.log('世界坐标（笛卡尔坐标）：', viewer.scene.camera.pickEllipsoid(e.position, viewer.scene.globe.ellipsoid))

            // const ray = viewer.camera.getPickRay(e.position);
            // const position = viewer.scene.globe.pick(ray, viewer.scene);
            // console.log('地标坐标：', position)

            // console.log('场景坐标：', viewer.scene.pickPosition(e.position));

            // 拾取Entity
            const pick = viewer.scene.pick(e.position);
            setEntity(pick);
            if (pick) {
                console.log("拾取entity: ", pick);
            }

            // 绘制点、线、面、体
            const ray = viewer.camera.getPickRay(e.position);
            const earthPosition = viewer.scene.globe.pick(ray, viewer.scene);

            if (Cesium.defined(earthPosition)) {
                switch (typeRef.current) {
                    case "point":
                        drawPoint(earthPosition);
                        break;
                    case "line":
                        if (activeShapePoints.length === 0) {
                            floatingPoint = drawPoint(earthPosition);
                            activeShapePoints.push(earthPosition);
                            const dynamicPositions =
                                new Cesium.CallbackProperty(function () {
                                    return activeShapePoints;
                                }, false);
                            activeShape = drawLine(dynamicPositions);
                        }
                        activeShapePoints.push(earthPosition);
                        break;
                    case "polygon":
                        if (activeShapePoints.length === 0) {
                            floatingPoint = drawPoint(earthPosition);
                            activeShapePoints.push(earthPosition);
                            const dynamicPositions =
                                new Cesium.CallbackProperty(function () {
                                    return new Cesium.PolygonHierarchy(
                                        activeShapePoints
                                    );
                                }, false);
                            activeShape = drawPolygon(dynamicPositions);
                        }
                        activeShapePoints.push(earthPosition);
                        break;
                    default:
                        break;
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        handler.setInputAction(function (event: any) {
            terminateShape();
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

        handler.setInputAction(function (event: any) {
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
    };

    const onClick = (t: any) => {
        const newVal = t === type ? "" : t;
        setType(newVal);
        typeRef.current = newVal;
    };

    return (
        <div id="earth" className="earth">
            {opMap[type]}
            <div className="earth-left">
                <Button onClick={() => onClick("point")}>
                    {type === "point" ? "取消" : ""}绘制点
                </Button>
                <Button onClick={() => onClick("line")}>
                    {type === "line" ? "取消" : ""}绘制线
                </Button>
                <Button onClick={() => onClick("polygon")}>
                    {type === "polygon" ? "取消" : ""}绘制面
                </Button>
                <Button onClick={() => onClick("object")}>
                    {type === "object" ? "取消" : ""}绘制体
                </Button>
                <Button onClick={() => onClick("0")}>
                    {type === "0" ? "取消" : ""}绘制entity
                </Button>
                <Button onClick={() => onClick("1")}>
                    {type === "1" ? "取消" : ""}绘制 cn geojson
                </Button>
                <Button onClick={() => onClick("2")}>
                    {type === "2" ? "取消" : ""}绘制 polyline
                </Button>
                <Button onClick={() => onClick("3")}>
                    {type === "3" ? "取消" : ""}绘制 wall
                </Button>
            </div>
            {entity ? <div className="earth-right">right</div> : null}
        </div>
    );
};

export default Earth;
