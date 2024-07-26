import * as Cesium from 'cesium';

import {clock} from '@/util/clock';

export interface RippleParams {
    id: string; // 唯一id
    lonlat: any[];
    count: number; // 不超过10
    duration: number;
    color: string;
}

export class Ripple {
    params: RippleParams;
    primitive: Cesium.GroundPrimitive;
    radius: number = 100000;
    semiMajorAxis: number = 100000;
    semiMinorAxis: number = 100000;
    gradient: number = 1; // 透明度的幂次，越大越透明
    _time: number = new Date().getTime();
    constructor(rippleData: RippleParams) {
        this.params = rippleData;
        this.primitive = this.createPrimitive();
    }
    createGeometry() {
        return new Cesium.EllipseGeometry({
            center: Cesium.Cartesian3.fromDegrees(
                this.params.lonlat[0],
                this.params.lonlat[1]
            ),
            height: 100,
            semiMajorAxis: this.semiMajorAxis,
            semiMinorAxis: this.semiMinorAxis,
            rotation: 0
        });
    }
    createMaterial() {
        return new Cesium.Material({
            fabric: {
                type: 'Ripple',
                uniforms: {
                    color: Cesium.Color.fromCssColorString(this.params.color),
                    time: 0,
                    count: this.params.count,
                    gradient: this.gradient
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
                    `
            },
            translucent: function (material) {
                return true;
            }
        });
    }

    createPrimitive() {
        return new Cesium.GroundPrimitive({
            geometryInstances: new Cesium.GeometryInstance({
                id: this.params.id,
                geometry: this.createGeometry()
            }),
            appearance: new Cesium.MaterialAppearance({
                material:
                    // Cesium.Material.fromType('Color'),
                    this.createMaterial()
            }),
            asynchronous: false
        });
    }

    tick() {
        const uniforms = this.primitive.appearance.material.uniforms;
        uniforms.time =
            ((clock.millis - this._time) % this.params.duration) /
            this.params.duration;
    }

    destrory() {}
}
