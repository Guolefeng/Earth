import React, { useEffect } from 'react'

let list:any[] = []

const DrawEntity = () => {
    const { Cesium, viewer } = window;

    useEffect(() => {
        draw();
        return () => {
            clear();
        }
    }, [])

    const draw = () => {
        list = []

        // point
        // const point = viewer.entities.add({
        //     name: 'Red box with black outline',
        //     position: Cesium.Cartesian3.fromDegrees(-107.0, 40.0, 300000.0),
        //     box: {
        //         dimensions: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
        //         material: Cesium.Color.RED.withAlpha(0.5),
        //         outline: true,
        //         outlineColor: Cesium.Color.BLACK
        //     }
        // });
        // list.push(point);

        // box
        const box = viewer.entities.add({
            name: 'Red box with black outline',
            position: Cesium.Cartesian3.fromDegrees(-107.0, 40.0, 300000.0),
            box: {
                dimensions: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
                material: Cesium.Color.RED.withAlpha(0.5),
                outline: true,
                outlineColor: Cesium.Color.BLACK
            }
        });
        list.push(box);

        // ellipse
        const greenCircle = viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(-111.0, 40.0, 150000.0),
            name: 'Green circle at height with outline',
            ellipse: {
                semiMinorAxis: 300000.0,
                semiMajorAxis: 300000.0,
                height: 200000.0,
                material: Cesium.Color.GREEN,
                outline: true, // height must be set for outline to display
            },
        });
        list.push(greenCircle);

        const redEllipse = viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(-103.0, 40.0),
            name: 'Red ellipse on surface',
            ellipse: {
                semiMinorAxis: 250000.0,
                semiMajorAxis: 400000.0,
                material: Cesium.Color.RED.withAlpha(0.5),
            },
        });
        list.push(redEllipse);

        const blueEllipse = viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(-95.0, 40.0, 100000.0),
            name: 'Blue translucent, rotated, and extruded ellipse with outline',
            ellipse: {
                semiMinorAxis: 150000.0,
                semiMajorAxis: 300000.0,
                extrudedHeight: 200000.0,
                rotation: Cesium.Math.toRadians(45),
                material: Cesium.Color.BLUE.withAlpha(0.5),
                outline: true,
            },
        });
        list.push(blueEllipse);
        // czml 方式添加
        // let czml = [{
        //     'id': 'document',
        //     'name': 'box',
        //     'version': '1.0'
        // }, {
        //     'id': 'shape2',
        //     'name': 'Red box with black outline',
        //     'position': {
        //         'cartographicDegrees': [-107.0, 40.0, 300000.0]
        //     },
        //     'box': {
        //         'dimensions': {
        //             'cartesian': [400000.0, 300000.0, 500000.0]
        //         },
        //         'material': {
        //             'solidColor': {
        //                 'color': {
        //                     'rgba': [255, 0, 0, 128]
        //                 }
        //             }
        //         },
        //         'outline': true,
        //         'outlineColor': {
        //             'rgba': [0, 0, 0, 255]
        //         }
        //     }
        // }];

        // let box = Cesium.CzmlDataSource.load(czml);
        // viewer.dataSources.add(box);
        // viewer.zoomTo(box);


        viewer.zoomTo(viewer.entities);
    }

    const clear = () => {
        list.forEach(e => {
            viewer.entities.remove(e);
        })
    }

    return (
        <div></div>
    )
}

export default DrawEntity