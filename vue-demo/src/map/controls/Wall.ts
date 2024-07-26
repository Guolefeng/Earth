import * as Cesium from "cesium";
import { clock } from "@/utils/clock";

export interface WallParams {
    id: string; // 唯一id
    positions: number[]; // 经纬度数组
    color: string; // 光墙颜色
    maxHeight?: number; // 光墙最高高度, 默认 100
    minHeight?: number; // 光墙最低高度, 默认 0
    duration?: number; // 动画持续时间, 默认 1000 ms
    direction?: 1 | 2 | 3 | 4; // 动画方向(1 - 向上，2 - 向下，3 - 水平逆时针，4 - 水平顺时针), 默认 1
    count?: number; // 颜色次数, 默认 3
}

export class Wall {
    params: WallParams;
    primitive: Cesium.Primitive;
    _time: number = new Date().getTime();

    constructor(wallData: WallParams) {
        this.params = wallData;
        this.primitive = this.createPrimitive();
    }

    createGeometry() {
        const { positions, maxHeight = 100, minHeight = 0 } = this.params;
        return new Cesium.WallGeometry({
            positions: Cesium.Cartesian3.fromDegreesArray(positions),
            maximumHeights: new Array(positions.length / 2).fill(maxHeight),
            minimumHeights: new Array(positions.length / 2).fill(minHeight),
            granularity: 1,
        });
    }

    createMaterial() {
        const { color, direction = 1, count = 3 } = this.params;
        return new Cesium.Material({
            fabric: {
                type: "DynamicWall",
                uniforms: {
                    color: Cesium.Color.fromCssColorString(color),
                    time: 0,
                    direction,
                    count,
                },
                source: `
                    czm_material czm_getMaterial(czm_materialInput materialInput)

                    {
                        czm_material material = czm_getDefaultMaterial(materialInput);
                        vec2 st = materialInput.st;
                        int d = int(direction);
                        float p = 1.0 / count;
                        if (d == 1) { // 向上
                            material.alpha = color.a * (1.0 - mod(st.t - time, p) / p);
                        } else if (d == 2) { // 向下
                            material.alpha = color.a * mod(st.t + time, p) / p;
                        } else if (d == 3) { // 水平逆时针
                            material.alpha = color.a * mod(st.s + time, p) / p;
                        } else if (d == 4) { // 水平顺时针
                            material.alpha = color.a * (1.0 - mod(st.s - time, p) / p);
                        }
                        material.diffuse = color.rgb;
                        return material;
                    }
                `,
            },
            translucent: function (material) {
                return true;
            },
        });
    }

    createPrimitive() {
        return new Cesium.Primitive({
            geometryInstances: new Cesium.GeometryInstance({
                id: this.params.id,
                geometry: this.createGeometry(),
            }),
            appearance: new Cesium.MaterialAppearance({
                material: this.createMaterial(),
            }),
            asynchronous: false,
        });
    }

    tick() {
        const { duration = 1000 } = this.params;
        const uniforms = this.primitive.appearance.material.uniforms;
        uniforms.time = ((clock.millis - this._time) % duration) / duration;
    }

    destrory() {}
}
