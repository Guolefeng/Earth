import { useEffect } from 'react'

const AddEntites = () => {
    useEffect(() => {
        const { viewer, Cesium } = window
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
        var czml = [{
            "id" : "document",
            "name" : "box",
            "version" : "1.0"
        },{
            "id" : "shape2",
            "name" : "Red box with black outline",
            "position" : {
                "cartographicDegrees" : [116.39, 40, 0]
            },
            "box" : {
                "dimensions" : {
                    "cartesian": [400.0, 300.0, 200]
                },
                "material" : {
                    "solidColor" : {
                        "color" : {
                            "rgba" : [255, 0, 0, 200]
                        }
                    }
                },
                "outline" : true,
                "outlineColor" : {
                    "rgba" : [0, 0, 0, 255]
                }
            }
        }];

        let dataSource
        Cesium.CzmlDataSource.load(czml).then((source) => {
            dataSource = source
            viewer.dataSources.add(dataSource);
            viewer.flyTo(dataSource);
        });

        return () => {
            if (Cesium.defined(dataSource)) {
                viewer.dataSources.remove(dataSource)
            }
        }
    }, [])
    return null
}

export default AddEntites