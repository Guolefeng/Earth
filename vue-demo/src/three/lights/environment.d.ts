import * as THREE from "three";
import { Component } from "../components/component";
import { Base } from "../base/base";
export interface EnvironmentConfig {
    resolution: number;
    near: number;
    far: number;
    scene: THREE.Scene;
    options: THREE.RenderTargetOptions;
    textureType: THREE.TextureDataType;
    ignoreObjects: THREE.Object3D[];
}
declare class Environment extends Component {
    fbo: THREE.WebGLCubeRenderTarget;
    cubeCamera: THREE.CubeCamera;
    virtualScene: THREE.Scene;
    ignoreObjects: THREE.Object3D[];
    constructor(base: Base, config?: Partial<EnvironmentConfig>);
    update(): void;
    add(obj: THREE.Object3D): void;
    get texture(): THREE.CubeTexture;
}
export { Environment };
