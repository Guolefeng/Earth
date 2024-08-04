import * as Cesium from "cesium";
import { clock } from "@/utils/clock";

export interface EllipseParams {
    id: string;
    lonlat: any[];
    name?: string;
    count?: number;
    duration?: number;
    color?: string;
    alpha?: number;
    semiMajorAxis?: number;
    semiMinorAxis?: number;
    gradient?: number;
    materialType?:
        | "color"
        | "ripple"
        | "diffuse"
        | "fade"
        | "blur"
        | "spiral"
        | "colorful"
        | "pulse"
        | "scanline"
        | "radarline"
        | "radarwave"
        | "radarscan";
}

const DEFAULT_DURATION = 1000;

export class Ellipse {
    params: EllipseParams;
    primitive: Cesium.Primitive;
    _time: number = new Date().getTime();

    constructor(data: EllipseParams) {
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

    // 波纹圆
    createRippleMaterial() {
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

    // 扩散圆
    createDiffuseMaterial() {
        const { color, count, gradient = 1 } = this.params;
        return new Cesium.Material({
            fabric: {
                type: "CircleScan",
                uniforms: {
                    color: Cesium.Color.fromCssColorString(color),
                    time: 0,
                },
                source: `
                    uniform vec4 color;
                    uniform float time;

                    vec3 circlePing(float r, float innerTail,  float frontierBorder, float timeResetSeconds,  float radarPingSpeed,  float fadeDistance){
                        float circle;
                        circle += smoothstep(time - innerTail, time, r) * smoothstep(time + frontierBorder,time, r);
                        circle *= smoothstep(fadeDistance, 0.0, r);
                        return vec3(circle);
                    }

                    czm_material czm_getMaterial(czm_materialInput materialInput)
                    {
                        czm_material material = czm_getDefaultMaterial(materialInput);
                        vec2 st = materialInput.st * 2.0  - 1.0 ;
                        vec2 center = vec2(0.);
                        vec3 flagColor;
                        float r = length(st - center) / 4.;
                        flagColor += circlePing(r, 0.25, 0.025, 4.0, 0.3, 1.0) * color.rgb;
                        material.alpha = length(flagColor);
                        material.diffuse = flagColor.rgb;
                        return material;
                    }
                `,
            },
            translucent: function (material) {
                return true;
            },
        });
    }

    // 颜色圆
    createColorMaterial() {
        const { color, alpha = 1 } = this.params;
        return new Cesium.Material({
            fabric: {
                type: "ColorEllipse",
                uniforms: {
                    color: Cesium.Color.fromCssColorString(color),
                    alpha,
                },
                source: `
                    czm_material czm_getMaterial(czm_materialInput materialInput)
                    {
                        czm_material material = czm_getDefaultMaterial(materialInput);
                        material.alpha = alpha;
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

    // 消隐圆
    createFadeMaterial() {
        const { color } = this.params;
        return new Cesium.Material({
            fabric: {
                type: "FadeEllipse",
                uniforms: {
                    color: Cesium.Color.fromCssColorString(color),
                    time: 0,
                },
                source: `
                    uniform vec4 color;
                    uniform float time;

                    czm_material czm_getMaterial(czm_materialInput materialInput)
                    {
                        czm_material material = czm_getDefaultMaterial(materialInput);
                        material.diffuse = 1.5 * color.rgb;
                        vec2 st = materialInput.st;
                        float dis = distance(st, vec2(0.5, 0.5));
                        if (dis > time * 0.5) {
                            material.alpha = color.a;
                        } else {
                            discard;
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

    // 模糊圆
    createBlurMaterial() {
        const { color } = this.params;
        return new Cesium.Material({
            fabric: {
                type: "BlurEllipse",
                uniforms: {
                    color: Cesium.Color.fromCssColorString(color),
                    time: 0,
                },
                source: `
                    uniform vec4 color;
                    uniform float time;
                    czm_material czm_getMaterial(czm_materialInput materialInput)
                    {
                        czm_material material = czm_getDefaultMaterial(materialInput);
                        vec2 st = materialInput.st ;
                        vec2 center = vec2(0.5);
                        float r = 0.5 + sin(time) / 3.0;
                        float dis = distance(st, center);
                        float a = 0.0;
                        if(dis < r) {
                            a = 1.0 - smoothstep(0.0, r, dis);
                        }
                        material.alpha = pow(a, 10.0) ;
                        material.diffuse = color.rgb * a * 3.0;
                        return material;
                    }
                `,
            },
            translucent: function (material) {
                return true;
            },
        });
    }

    // 螺旋圆
    createSpiralMaterial() {
        const { color } = this.params;
        return new Cesium.Material({
            fabric: {
                type: "SpiralEllipse",
                uniforms: {
                    color: Cesium.Color.fromCssColorString(color),
                    time: 0,
                },
                source: `
                    uniform vec4 color;
                    uniform float time;
                    #define PI 3.14159265359

                    vec2 rotate2D (vec2 _st, float _angle) {
                        _st =  mat2(cos(_angle), -sin(_angle), sin(_angle), cos(_angle)) * _st;
                        return _st;
                    }

                    czm_material czm_getMaterial(czm_materialInput materialInput){
                        czm_material material = czm_getDefaultMaterial(materialInput);
                        vec2 st = materialInput.st * 2.0 - 1.0;
                        st *= 1.6;
                        float r = length(st);
                        float w = .3;
                        st = rotate2D(st, (r * PI * 6. - time * 2.));
                        float a = smoothstep(-w, .2, st.x) * smoothstep(w, .2, st.x);
                        float b = abs(1. / (sin(pow(r, 2.) * 2. - time * 1.3) * 6.)) * .4;
                        material.alpha = a * b ;
                        material.diffuse = color.rgb * a * b  * 3.0;
                        return material;
                    }
                `,
            },
            translucent: function (material) {
                return true;
            },
        });
    }

    // 多彩圆
    createColorfulMaterial() {
        const { color } = this.params;
        return new Cesium.Material({
            fabric: {
                type: "ColorfulEllipse",
                uniforms: {
                    color: Cesium.Color.fromCssColorString(color),
                    time: 0,
                },
                source: `
                    uniform vec4 color;
                    uniform float time;

                    czm_material czm_getMaterial(czm_materialInput materialInput){
                        czm_material material = czm_getDefaultMaterial(materialInput);
                        vec2 st = materialInput.st  * 2.0 - 1.0;
                        float radius = length(st);
                        float angle = atan(st.y / st.x);
                        float radius1 = sin(time * 2.0) + sin(40.0 * angle + time) * 0.01;
                        float radius2 = cos(time * 3.0);
                        vec3 fragColor = 0.2 + 0.5 * cos(time + color.rgb + vec3(0, 2, 4));
                        float inten1 = 1.0 - sqrt(abs(radius1 - radius));
                        float inten2 = 1.0 - sqrt(abs(radius2 - radius));
                        material.alpha = pow(inten1 + inten2 , 5.0);
                        material.diffuse = fragColor * (inten1 + inten2);
                        return material;
                    }
                `,
            },
            translucent: function (material) {
                return true;
            },
        });
    }

    // 脉冲圆
    createPulseMaterial() {
        const { color } = this.params;
        return new Cesium.Material({
            fabric: {
                type: "PluseEllipse",
                uniforms: {
                    color: Cesium.Color.fromCssColorString(color),
                    time: 0,
                },
                source: `
                    uniform vec4 color;
                    uniform float time;

                    czm_material czm_getMaterial(czm_materialInput materialInput)
                    {
                        czm_material material = czm_getDefaultMaterial(materialInput);
                        vec2 st = materialInput.st * 2.0 - 1.0;
                        float r = length(st) * 1.2;
                        float a = pow(r, 2.0);
                        float b = sin(r * 0.8 - 1.6);
                        float c = sin(r - 0.010);
                        float s = sin(a - time * 2.0 + b) * c;
                        float d = abs(1.0 / (s * 10.8)) - 0.01;
                        material.alpha = pow(d, 10.0);
                        material.diffuse = color.rgb * d;
                        return material;
                    }
                `,
            },
            translucent: function (material) {
                return true;
            },
        });
    }

    // 线圈发光圆
    createScanlineMaterial() {
        const { color } = this.params;
        return new Cesium.Material({
            fabric: {
                type: "WaveEllipse",
                uniforms: {
                    color: Cesium.Color.fromCssColorString(color),
                    time: 0,
                },
                source: `
                    uniform vec4 color;
                    uniform float time;
                    float circle(vec2 uv, float r, float blur) {
                        float d = length(uv) * 1.0; /* 2.0 */
                        float c = smoothstep(r+blur, r, d);
                        return c;
                    }
                    czm_material czm_getMaterial(czm_materialInput materialInput)
                    {
                        czm_material material = czm_getDefaultMaterial(materialInput);
                        vec2 st = materialInput.st - 0.5;
                        material.diffuse = 2.8 * color.rgb;
                        material.emission = vec3(0);
                        float s = 0.3;
                        float radius1 = smoothstep(.0, s, time) * 0.5;
                        float alpha1 = circle(st, radius1, 0.01) * circle(st, radius1, -0.01);
                        float alpha2 = circle(st, radius1, 0.01 - radius1) * circle(st, radius1, 0.01);
                        float radius2 = 0.5 + smoothstep(s, 1.0, time) * 0.5;
                        float alpha3 = circle(st, radius1, radius2 + 0.01 - radius1) * circle(st, radius1, -0.01);
                        material.alpha = smoothstep(1.0, s, time) * (alpha1 + alpha2*0.1 + alpha3*0.1);
                        material.alpha *= color.a;
                        return material;
                    }
                `,
            },
            translucent: function (material) {
                return true;
            },
        });
    }

    // 雷达线
    createRadarlineMaterial() {
        const { color, duration = DEFAULT_DURATION } = this.params;
        return new Cesium.Material({
            fabric: {
                type: "RadarlineEllipse",
                uniforms: {
                    color: Cesium.Color.fromCssColorString(color),
                    // speed: 10,
                    time: 0,
                    duration,
                },
                source: `
                    uniform vec4 color;
                    uniform float time;
                    uniform float duration;

                    #define PI 3.14159265359

                    czm_material czm_getMaterial(czm_materialInput materialInput)
                    {
                        czm_material material = czm_getDefaultMaterial(materialInput);
                        float t = time * PI * 4.0 / duration * 1000.0;
                        vec2 st = materialInput.st * 2.0 - 1.0;
                        vec3 col = vec3(0.0);
                        vec2 p = vec2(sin(t), cos(t));
                        float d = length(st - dot(p, st) * p);
                        if (dot(st, p) < 0.) {
                            d = length(st);
                        }
                        col = .006 / d * color.rgb;
                        if(distance(st, vec2(0)) > 0.99 ){
                            col = color.rgb;
                        }
                        material.alpha = pow(length(col), 2.0);
                        material.diffuse = col * 3.0;
                        return material;
                    }
                `,
            },
            translucent: function (material) {
                return true;
            },
        });
    }

    // 波纹雷达
    createRadarWaveMaterial() {
        const { color, duration = DEFAULT_DURATION } = this.params;
        return new Cesium.Material({
            fabric: {
                type: "RadarlineEllipse",
                uniforms: {
                    color: Cesium.Color.fromCssColorString(color),
                    speed: 10,
                },
                source: `
                    uniform vec4 color;
                    uniform float speed;

                    #define PI 3.14159265359

                    float rand(vec2 co){
                        return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
                    }

                    czm_material czm_getMaterial(czm_materialInput materialInput)
                    {
                        czm_material material = czm_getDefaultMaterial(materialInput);
                        vec2 st = materialInput.st;
                        vec2 pos = st - vec2(0.5);
                        float time = czm_frameNumber * speed / 1000.0 ;
                        float r = length(pos);
                        float t = atan(pos.y, pos.x) - time * 2.5;
                        float a = (atan(sin(t), cos(t)) + PI) / (2.0 * PI);
                        float ta = 0.5;
                        float v = smoothstep(ta - 0.05, ta + 0.05, a) * smoothstep(ta + 0.05, ta - 0.05, a);
                        vec3 flagColor = color.rgb * v;
                        float blink = pow(sin(time * 1.5) * 0.5 + 0.5, 0.8);
                        flagColor = color.rgb * pow(a, 8.0*(.2 + blink)) * (sin(r * 500.0) * .5 + .5);
                        flagColor = flagColor * pow(r, 0.4);
                        material.alpha = length(flagColor) * 1.3;
                        material.diffuse = flagColor * 3.0;
                        return material;
                    }
                `,
            },
            translucent: function (material) {
                return true;
            },
        });
    }

    // 雷达扫描
    createRadarScanMaterial() {
        const { color, duration = DEFAULT_DURATION } = this.params;
        return new Cesium.Material({
            fabric: {
                type: "RadarlineEllipse",
                uniforms: {
                    color: Cesium.Color.fromCssColorString(color),
                    time: 0,
                    duration,
                },
                source: `
                    uniform vec4 color;
                    uniform float speed;
                    uniform float time;
                    uniform float duration;

                    #define PI 3.14159265359

                    czm_material czm_getMaterial(czm_materialInput materialInput)
                    {
                        czm_material material = czm_getDefaultMaterial(materialInput);
                        vec2 st = materialInput.st;
                        vec2 scrPt = st * 2.0 - 1.0;
                        // float time = czm_frameNumber * speed / 1000.0;
                        vec3 col = vec3(0.0);
                        mat2 rot;
                        float theta = -time * (PI * 4.0 / duration) * 1000.0;
                        float cosTheta, sinTheta;
                        cosTheta = cos(theta);
                        sinTheta = sin(theta);
                        rot[0][0] = cosTheta;
                        rot[0][1] = -sinTheta;
                        rot[1][0] = sinTheta;
                        rot[1][1] = cosTheta;
                        vec2 scrPtRot = rot * scrPt;
                        float angle = 1.0 - (atan(scrPtRot.y, scrPtRot.x) / 6.2831 + 0.5);
                        float falloff = length(scrPtRot);
                        material.alpha = pow(length(col + vec3(.5)), 5.0);
                        material.diffuse = (0.5 +  pow(angle, 2.0) * falloff) * color.rgb;
                        return material;
                    }
                `,
            },
            translucent: function (material) {
                return true;
            },
        });
    }

    createMaterial() {
        const { materialType = "color" } = this.params;
        return {
            color: this.createColorMaterial(),
            ripple: this.createRippleMaterial(),
            diffuse: this.createDiffuseMaterial(),
            fade: this.createFadeMaterial(),
            blur: this.createBlurMaterial(),
            spiral: this.createSpiralMaterial(),
            colorful: this.createColorfulMaterial(),
            pulse: this.createPulseMaterial(),
            scanline: this.createScanlineMaterial(),
            radarline: this.createRadarlineMaterial(),
            radarwave: this.createRadarWaveMaterial(),
            radarscan: this.createRadarScanMaterial(),
        }[materialType];
    }

    createPrimitive() {
        const { id } = this.params;
        return new Cesium.Primitive({
            geometryInstances: new Cesium.GeometryInstance({
                id: id,
                geometry: this.createGeometry(),
            }),
            appearance: new Cesium.MaterialAppearance({
                material: this.createMaterial(),
                renderState: {
                    depthTest: {
                        enabled: false,
                    },
                },
            }),
            asynchronous: false,
        });
    }

    tick() {
        const { duration = DEFAULT_DURATION } = this.params;
        const uniforms = this.primitive.appearance.material.uniforms;
        uniforms.time = ((clock.millis - this._time) % duration) / duration;
    }

    destrory() {}
}
