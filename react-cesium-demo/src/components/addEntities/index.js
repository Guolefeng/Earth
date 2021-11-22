import React, { useEffect } from 'react'
import './index.css'
import { Button } from 'antd'
import GLTFModel from '../../assets/model/castle.gltf'
import Icon from '../../assets/imgs/icon.png'
import Tileset from '../../assets/model/Tileset/tileset.json'

const AddEntites = () => {
    const { viewer, Cesium } = window
    useEffect(() => {
        // 通过Entity添加形状
        // viewer.entities.add({
        //     name: 'red box',
        //     position: new Cesium.Cartesian3.fromDegrees(116.39, 39.91, 15000.0),
        //     box: {
        //         dimensions: new Cesium.Cartesian3(40000.0, 30000.0, 50000.0),
        //         material: Cesium.Color.RED.withAlpha(0.5),
        //         outline: true,
        //         outlineColor: Cesium.Color.BLACK,
        //     }
        // })
        // viewer.zoomTo(viewer.entities)

        // 通过CZML添加
        // var czml = [{
        //     "id" : "document",
        //     "name" : "box",
        //     "version" : "1.0"
        // },{
        //     "id" : "shape2",
        //     "name" : "Red box with black outline",
        //     "position" : {
        //         "cartographicDegrees" : [116.39, 40, 0]
        //     },
        //     "box" : {
        //         "dimensions" : {
        //             "cartesian": [400.0, 300.0, 200]
        //         },
        //         "material" : {
        //             "solidColor" : {
        //                 "color" : {
        //                     "rgba" : [255, 0, 0, 200]
        //                 }
        //             }
        //         },
        //         "outline" : true,
        //         "outlineColor" : {
        //             "rgba" : [0, 0, 0, 255]
        //         }
        //     }
        // }];

        // let dataSource
        // Cesium.CzmlDataSource.load(czml).then((source) => {
        //     dataSource = source
        //     viewer.dataSources.add(dataSource);
        //     viewer.flyTo(dataSource);
        // });

        // return () => {
        //     if (Cesium.defined(dataSource)) {
        //         viewer.dataSources.remove(dataSource)
        //     }
        // }
    }, [])

    const genEntity = (opt) => new Cesium.Entity(opt)

    function computeCircle(radius) {
        var positions = [];
        for (var i = 0; i < 360; i++) {
            var radians = Cesium.Math.toRadians(i);
            positions.push(
                new Cesium.Cartesian2(
                    radius * Math.cos(radians),
                    radius * Math.sin(radians)
                )
            );
        }
        return positions;
    }

    let curEntity
    const onBtnClick = (type) => {
        if (curEntity) {
            viewer.entities.remove(curEntity)
            curEntity = null
        }

        switch (type) {
            case 0:
                curEntity = genEntity({
                    position: new Cesium.Cartesian3.fromDegrees(116.39, 39.91, 50.0),
                    label: {
                        text: 'Oh My lezi',
                        font: '14pt monospace',
                        fillColor: Cesium.Color.RED,
                        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                        outlineWidth: 2,
                        outlineColor: Cesium.Color.RED,
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                        showBackground: true,
                        backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.8),
                        pixelOffset: new Cesium.Cartesian2(0, -9)
                    }
                })
                break;
            case 1:
                curEntity = genEntity({
                    position: new Cesium.Cartesian3.fromDegrees(116.39, 39.91, 50.0),
                    model: {
                        uri: GLTFModel,
                    },
                })
                break;
            case 2:
                curEntity = genEntity({
                    position: new Cesium.Cartesian3.fromDegrees(117.39, 39.91, 1000.0),
                    billboard: {
                        image: Icon,
                        width: 342,
                        height: 362,
                    },
                })
                break;
            case 3:
                curEntity = genEntity({
                    position: new Cesium.Cartesian3.fromDegrees(116.39, 39.91, 50.0),
                    plane: {
                        dimensions: new Cesium.Cartesian2(500000.0, 500000.0),
                        fill: true,
                        material: Cesium.Color.DARKGREY.withAlpha(0.5),
                        // plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_X, 0.0),
                        plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_Y, 0.0),
                        // plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_Z, 0.0),
                    }
                })
                break;
            case 4:
                curEntity = genEntity({
                    position: new Cesium.Cartesian3.fromDegrees(116.39, 34.91, 50),
                    point: {
                        color: Cesium.Color.WHITE,
                        outlineColor: Cesium.Color.RED,
                        outlineWidth: 100,
                        pixelSize: 100,
                    },
                })
                break;
            case 5:
                curEntity = genEntity({
                    position: new Cesium.Cartesian3.fromDegrees(116.39, 39.91, 50),
                    polygon: {
                        hierarchy: Cesium.Cartesian3.fromDegreesArray([
                            -115.0,
                            37.0,
                            -115.0,
                            32.0,
                            -107.0,
                            33.0,
                            -102.0,
                            31.0,
                            -102.0,
                            35.0,
                        ]),
                        material: Cesium.Color.RED,
                    },
                })
                break;
            case 6:
                curEntity = genEntity({
                    polyline: {
                        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
                            -75,
                            38,
                            250000,
                            -125,
                            38,
                            250000,
                        ]),
                        width: 5,
                        material: new Cesium.PolylineDashMaterialProperty({
                            color: Cesium.Color.BLUE,
                            gapColor: Cesium.Color.YELLOW,
                            dashLength: 8.0,
                            dashPattern: parseInt("110000001111", 2),
                            // dashPattern: parseInt("1010101010101010", 2),
                        }),
                    },
                })
                break;
            case 7:
                curEntity = genEntity({
                    polylineVolume: {
                        positions: Cesium.Cartesian3.fromDegreesArray([
                            -85.0,
                            32.0,
                            -85.0,
                            36.0,
                            -89.0,
                            36.0,
                        ]),
                        shape: computeCircle(60000.0),
                        material: Cesium.Color.RED,
                    },
                })
                break;
            case 8:
                curEntity = genEntity({
                    rectangle: {
                        coordinates: Cesium.Rectangle.fromDegrees(
                            -110.0,
                            30.0,
                            -100.0,
                            40.0
                        ),
                        material: Cesium.Color.GREEN.withAlpha(0.5),
                        rotation: Cesium.Math.toRadians(45),
                        extrudedHeight: 300000.0,
                        height: 100000.0,
                        outline: true, // height must be set for outline to display
                        outlineColor: Cesium.Color.BLACK,
                    },
                })
                break;
            case 9:
                curEntity = genEntity({
                    position: new Cesium.Cartesian3.fromDegrees(116.39, 39.91, 50),
                    tileset: {
                        uri: Tileset,
                    },
                })
                break;
            case 10:
                curEntity = genEntity({
                    wall: {
                        positions: Cesium.Cartesian3.fromDegreesArray([
                            -115.0,
                            50.0,
                            -112.5,
                            50.0,
                            -110.0,
                            50.0,
                            -107.5,
                            50.0,
                            -105.0,
                            50.0,
                            -102.5,
                            50.0,
                            -100.0,
                            50.0,
                            -97.5,
                            50.0,
                            -95.0,
                            50.0,
                            -92.5,
                            50.0,
                            -90.0,
                            50.0,
                        ]),
                        maximumHeights: [
                            100000,
                            200000,
                            100000,
                            200000,
                            100000,
                            200000,
                            100000,
                            200000,
                            100000,
                            200000,
                            100000,
                        ],
                        minimumHeights: [
                            0,
                            100000,
                            0,
                            100000,
                            0,
                            100000,
                            0,
                            100000,
                            0,
                            100000,
                            0,
                        ],
                        material: Cesium.Color.BLUE.withAlpha(0.5),
                        outline: true,
                        outlineColor: Cesium.Color.BLACK,
                    },
                })
                break;
            case 11:
                curEntity = genEntity({
                    name: 'red box',
                    position: new Cesium.Cartesian3.fromDegrees(116.39, 39.91, 15000.0),
                    box: {
                        dimensions: new Cesium.Cartesian3(40000.0, 30000.0, 50000.0),
                        material: Cesium.Color.DARKGREY.withAlpha(0.5),
                        outline: true,
                        outlineColor: Cesium.Color.BLACK,
                    }
                })
                break;
            default:
                break;
        }

        if (curEntity) {
            viewer.entities.add(curEntity)
            viewer.flyTo(curEntity)
        }
    }
    return <div className='ae'>
        <Button onClick={() => onBtnClick(0)}>label</Button>
        <Button onClick={() => onBtnClick(1)}>model</Button>
        <Button onClick={() => onBtnClick(2)}>billboard</Button>
        <Button onClick={() => onBtnClick(3)}>plane</Button>
        <Button onClick={() => onBtnClick(4)}>point</Button>
        <Button onClick={() => onBtnClick(5)}>polygon</Button>
        <Button onClick={() => onBtnClick(6)}>polyline</Button>
        <Button onClick={() => onBtnClick(7)}>polylineVolume</Button>
        <Button onClick={() => onBtnClick(8)}>rectangle</Button>
        {/* <Button onClick={() => onBtnClick(9)}>tileset</Button> */}
        <Button onClick={() => onBtnClick(10)}>wall</Button>
        <Button onClick={() => onBtnClick(11)}>box</Button>
    </div>
}

export default AddEntites