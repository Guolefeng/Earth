import * as Cesium from "cesium";
import { clock } from "@/utils/clock";

export interface RippleParams {
    id: string;
    lonlat: any[];
    count?: number;
    duration?: number;
    color?: string;
    semiMajorAxis?: number;
    semiMinorAxis?: number;
    gradient?: number;
}

export class Ripple {
    params: RippleParams;
    primitive: Cesium.Primitive;
    _time: number = new Date().getTime();

    constructor(data: RippleParams) {
        this.params = data;
        this.primitive = this.createPrimitive();
    }

    createGeometry() {
        const { semiMajorAxis = 100000, semiMinorAxis = 100000 } = this.params;
        return new Cesium.EllipseGeometry({
            center: Cesium.Cartesian3.fromDegrees(
                this.params.lonlat[0],
                this.params.lonlat[1]
            ),
            semiMajorAxis,
            semiMinorAxis,
        });
    }

    createMaterial() {
        const { color, count, gradient = 1 } = this.params;
        return new Cesium.Material({
            fabric: {
                type: "Ripple",
                uniforms: {
                    color: Cesium.Color.fromCssColorString(color),
                    time: 0,
                    count,
                    gradient,
                },
                source: `
                    czm_material czm_getMaterial(czm_materialInput materialInput)

                    {
                        czm_material material = czm_getDefaultMaterial(materialInput);

                        material.diffuse = 1.5 * color.rgb;
                        vec2 st = materialInput.st;
                        float dis = distance(st, vec2(0.5, 0.5));
                        float per = fract(time);

                        if(dis > 0.5){
                            material.alpha = 0.0;
                            discard;
                        }
                        else {
                            float perDis = 0.5 / count;
                            float disNum;
                            float bl = .0;
                            for (int i = 0; i <= 10; i++) {
                                if (float(i) <= count) {
                                    disNum = perDis * float(i) - dis + per / count;
                                    if (disNum > 0.0) {
                                        if (disNum < perDis) {
                                            bl = 1.0 - disNum / perDis;
                                        }
                                        else if (disNum - perDis < perDis) {
                                            bl = 1.0 - abs(1.0 - disNum / perDis);
                                        }
                                        // material.alpha = color.a  * dis / per / 1.0;
                                        material.alpha = pow(bl, gradient);
                                    }
                                }
                            }
                        }
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
                material:
                    // Cesium.Material.fromType('Color'),
                    this.createMaterial(),
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
