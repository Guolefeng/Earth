import React, { useEffect } from 'react'

let entity:any;

const DrawEntity = () => {
    const { Cesium, viewer } = window;

    useEffect(() => {
        draw();
        return () => {
            clear();
        }
    }, [])

    const draw = () => {
        Cesium.Material.PulseLineType = 'PulseLine';
        Cesium.Material.PulseLineSource = `
            czm_material czm_getMaterial(czm_materialInput materialInput) {
                czm_material material = czm_getDefaultMaterial(materialInput);
                vec2 st = materialInput.st;
                float time = czm_frameNumber * 0.03;
                float alpha = abs(sin(time + st.s * 3.14));
                material.diffuse = color.rgb;
                material.alpha = alpha;
                return material;
            }
        `;
        Cesium.Material._materialCache.addMaterial(Cesium.Material.PulseLineType, {
            fabric: {
                type: Cesium.Material.PulseLineType,
                uniforms: {
                    color: new Cesium.Color(0.0, 1.0, 0.0, 1.0),
                },
                source: Cesium.Material.PulseLineSource,
            },
        });

        // 添加带有脉冲特效的线条
        let polyline = new Cesium.GeometryInstance({
            geometry: new Cesium.PolylineGeometry({
                positions: Cesium.Cartesian3.fromDegreesArray([
                    108.0, 31.0, 100.0, 36.0, 105.0, 39.0,
                ]),
                width: 5.0,
            }),
        });
        // 定义外观
        let polylineAppearance = new Cesium.PolylineMaterialAppearance({
            material: new Cesium.Material({
                fabric: {
                    type: Cesium.Material.PulseLineType,
                    uniforms: {
                        color: new Cesium.Color(0.0, 1.0, 0.0, 1.0),
                    },
                },
            })
        });
        // 创建Primitive
        let polylineGeometry = new Cesium.Primitive({
            geometryInstances: polyline,
            appearance: polylineAppearance,
        });

        viewer.scene.primitives.add(polylineGeometry);

        entity = polylineGeometry;
    }

    const clear = () => {
        entity && viewer.scene.primitives.remove(entity);
        // viewer.dataSources.removeAll();
    }

    return (
        <div></div>
    )
}

export default DrawEntity