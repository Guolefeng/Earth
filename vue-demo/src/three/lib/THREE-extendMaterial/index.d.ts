import * as THREE from "three";
declare function extend<T extends THREE.Material>(source: T, object: any): any;
declare namespace extend {
    var CustomMaterial: (object: any) => void;
}
declare class CustomMaterial extends THREE.ShaderMaterial {
    constructor(object: any);
    get specular(): any;
    set specular(value: any);
    get shininess(): any;
    set shininess(value: any);
    get reflectivity(): any;
    set reflectivity(value: any);
}
declare const extendMaterial: typeof extend;
declare function cloneUniform(src: any, dst?: {}): {};
declare function cloneUniforms(src: any, dst?: {}, notNull?: boolean, share?: boolean, mix?: boolean, link?: boolean): {};
declare function applyUniforms(instance: any, src: any, dst: any, defines: any): void;
declare function mapShader(name: any, type: any): any;
declare function patchShader(shader: any, object: any, uniformsMixer?: typeof applyUniforms, defines?: null): any;
export { CustomMaterial, patchShader, extendMaterial, cloneUniforms, cloneUniform, mapShader, };
