import * as Cesium from "cesium";

export interface EllipsoidParams {
    id: string; // 唯一id
    lonlat: [number, number]; // 经纬度
    radii: [number, number, number]; // x,y,z轴半径
    rotation?: [number, number, number]; // x,y,z轴旋转角度
    color?: string; // 颜色
    alpha?: number; // 透明度
    materialType?: "color" | "electronic" | "trail"; // 材质类型
}

export class Ellipsoid {
    params: EllipsoidParams;
    primitive: Cesium.Primitive;

    constructor(data: EllipsoidParams) {
        this.params = data;
        this.primitive = this.createPrimitive();
    }

    createGeometry() {
        const { radii } = this.params;
        return new Cesium.EllipsoidGeometry({
            vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
            radii: new Cesium.Cartesian3(radii[0], radii[1], radii[2]),
            // innerRadii: new Cesium.Cartesian3(
            //     radii[0] - 1,
            //     radii[1] - 1,
            //     radii[2] - 1
            // ),
            // minimumClock: 0,
            // maximumClock: Cesium.Math.TWO_PI,
            // minimumCone: 0,
            // maximumCone: Cesium.Math.PI,
        });
    }

    // 创建半球电弧球材质
    createElectronicMaterial() {
        const { color = "#ff0000" } = this.params;
        return new Cesium.Material({
            fabric: {
                type: "electronicEllipsoid",
                uniforms: {
                    color: Cesium.Color.fromCssColorString(color),
                    speed: 5.0,
                },
                source: `
                    #define pi 3.1415926535
                    #define PI2RAD 0.01745329252
                    #define TWO_PI (2. * PI)
                    
                    float rands(float p){
                        return fract(sin(p) * 10000.0);
                    }
                    
                    float noise(vec2 p){
                        float time = fract(czm_frameNumber * speed / 1000.0);
                        float t = time / 20000.0;
                        if(t > 1.0) t -= floor(t);
                        return rands(p.x * 14. + p.y * sin(t) * 0.5);
                    }
                    
                    vec2 sw(vec2 p){
                        return vec2(floor(p.x), floor(p.y));
                    }
                    
                    vec2 se(vec2 p){
                        return vec2(ceil(p.x), floor(p.y));
                    }
                    
                    vec2 nw(vec2 p){
                        return vec2(floor(p.x), ceil(p.y));
                    }
                    
                    vec2 ne(vec2 p){
                        return vec2(ceil(p.x), ceil(p.y));
                    }
                    
                    float smoothNoise(vec2 p){
                        vec2 inter = smoothstep(0.0, 1.0, fract(p));
                        float s = mix(noise(sw(p)), noise(se(p)), inter.x);
                        float n = mix(noise(nw(p)), noise(ne(p)), inter.x);
                        return mix(s, n, inter.y);
                    }
                    
                    float fbm(vec2 p){
                        float z = 2.0;
                        float rz = 0.0;
                        vec2 bp = p;
                        for(float i = 1.0; i < 6.0; i++){
                            rz += abs((smoothNoise(p) - 0.5)* 2.0) / z;
                            z *= 2.0;
                            p *= 2.0;
                        }
                        return rz;
                    }
                    
                    czm_material czm_getMaterial(czm_materialInput materialInput)
                    {
                        czm_material material = czm_getDefaultMaterial(materialInput);
                        vec2 st = materialInput.st;
                        vec2 st2 = materialInput.st;
                        float time = fract(czm_frameNumber * speed / 1000.0);
                        if (st.t < 0.5) {
                            discard;
                        }
                        st *= 4.;
                        float rz = fbm(st);
                        st /= exp(mod( time * 2.0, pi));
                        rz *= pow(15., 0.9);
                        vec4 temp = vec4(0);
                        temp = mix(color / rz, vec4(color.rgb, 0.1), 0.2);
                        if (st2.s < 0.05) {
                            temp = mix(vec4(color.rgb, 0.1), temp, st2.s / 0.05);
                        }
                        if (st2.s > 0.95){
                            temp = mix(temp, vec4(color.rgb, 0.1), (st2.s - 0.95) / 0.05);
                        }
                        material.diffuse = temp.rgb;
                        material.alpha = temp.a * 2.0;
                        return material;
                    }
                `,
            },
            translucent: function (material) {
                return true;
            },
        });
    }

    // 创建半球轨迹球材质
    createTrailMaterial() {
        const { color = "#ff0000" } = this.params;
        return new Cesium.Material({
            fabric: {
                type: "electronicEllipsoid",
                uniforms: {
                    color: Cesium.Color.fromCssColorString(color),
                    speed: 5.0,
                },
                source: `
                    uniform vec4 color;
                    uniform float speed;
                    czm_material czm_getMaterial(czm_materialInput materialInput) {
                        czm_material material = czm_getDefaultMaterial(materialInput);
                        vec2 st = materialInput.st;
                        if (st.t < 0.5) {
                            discard;
                        }
                        float time = fract(czm_frameNumber * speed / 1000.0);
                        float alpha = abs(smoothstep(0.5, 1., fract(-st.t - time))) + .1;
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

    // 创建半球颜色材质
    createColorMaterial() {
        const { color = "#ff0000", alpha = 1.0 } = this.params;
        return new Cesium.Material({
            fabric: {
                type: "electronicEllipsoid",
                uniforms: {
                    color: Cesium.Color.fromCssColorString(color),
                    alpha,
                },
                source: `
                    czm_material czm_getMaterial(czm_materialInput materialInput) {
                        czm_material material = czm_getDefaultMaterial(materialInput);
                        vec2 st = materialInput.st;
                        if (st.t < 0.5) {
                            discard;
                        }
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

    createMaterial() {
        const { materialType = "color" } = this.params;
        return {
            electronic: this.createElectronicMaterial(),
            trail: this.createTrailMaterial(),
            color: this.createColorMaterial(),
        }[materialType];
    }

    createPrimitive() {
        const { id, lonlat, rotation = [0, 0, 0] } = this.params;
        return new Cesium.Primitive({
            geometryInstances: new Cesium.GeometryInstance({
                id,
                geometry: this.createGeometry(),
                modelMatrix: Cesium.Matrix4.multiplyByMatrix3(
                    Cesium.Matrix4.multiplyByTranslation(
                        Cesium.Transforms.eastNorthUpToFixedFrame(
                            Cesium.Cartesian3.fromDegrees(lonlat[0], lonlat[1])
                        ),
                        new Cesium.Cartesian3(0.0, 0.0, 0.0),
                        new Cesium.Matrix4()
                    ),
                    Cesium.Matrix3.fromHeadingPitchRoll(
                        new Cesium.HeadingPitchRoll(
                            Cesium.Math.toRadians(rotation[0]),
                            Cesium.Math.toRadians(rotation[1]),
                            Cesium.Math.toRadians(rotation[2])
                        )
                    ),
                    new Cesium.Matrix4()
                ),
            }),
            appearance: new Cesium.MaterialAppearance({
                material: this.createMaterial(),
                renderState: {
                    depthTest: {
                        enabled: true,
                    },
                },
            }),
            asynchronous: false,
        });
    }

    tick() {}

    destrory() {}
}
