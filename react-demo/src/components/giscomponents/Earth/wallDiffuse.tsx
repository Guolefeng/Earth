import React, { useEffect } from 'react';
import './material/wallDiffuse.js';

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

        const positions = [
            99.0370857, 35.5491857,
            99.9498331, 32.8952392,
            103.5807667, 26.1209562,
            107.2308621, 28.2356585,
            105.4612797, 37.5740191,
            99.0370857, 35.5491857,
        ]
        // 绘制墙体
        const wall1 = viewer.entities.add({
            name: '立体墙效果',
            wall: {
                positions: Cesium.Cartesian3.fromDegreesArray(positions),
                maximumHeights: new Array(positions.length / 2).fill(100000),
                minimumHeights: new Array(positions.length / 2).fill(50),
                // material: Cesium.Color.GREEN,
                // 扩散墙材质
                material: new Cesium.WallDiffuseMaterialProperty({
                    color: new Cesium.Color(1.0, 0.0, 0.0, 1.0),
                    duration: 1000,
                }),
                outline: false,
            }
        })
        list.push(wall1);

        viewer.zoomTo(viewer.entities);

        // viewer.clock.onTick.addEventListener(function(clock: any) {
        //     console.log('----------', clock);
        // })
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