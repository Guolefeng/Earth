import * as THREE from "three";
import { FullScreenQuad } from "three-stdlib";
import { Component } from "../components/component";
import { Base } from "../base/base";
import { FBO } from "../renderTargets";
import { getBound } from "../utils";
export interface CausticsConfig {
    lightSource: THREE.Vector3;
    intensity: number;
    normalMaterial: THREE.MeshNormalMaterial;
    ior: number;
    chromaticAberration: number;
    samples: number;
    saturation: number;
    noiseIntensity: number;
    scaleCorrection: number;
}
/**
 * Reference: https://blog.maximeheckel.com/posts/caustics-in-webgl/
 */
declare class Caustics extends Component {
    group: THREE.Group;
    scene: THREE.Scene;
    lightSource: THREE.Vector3;
    intensity: number;
    normalMaterial: THREE.MeshNormalMaterial;
    ior: number;
    chromaticAberration: number;
    samples: number;
    saturation: number;
    noiseIntensity: number;
    scaleCorrection: number;
    material: THREE.ShaderMaterial;
    causticsPlane: THREE.Mesh;
    normalFBO: FBO;
    normalCamera: THREE.PerspectiveCamera;
    causticsFBO: FBO;
    causticsComputeMaterial: THREE.ShaderMaterial;
    causticsQuad: FullScreenQuad;
    bound: ReturnType<typeof getBound>;
    constructor(base: Base, config?: Partial<CausticsConfig>);
    addExisting(): void;
    add(...object: THREE.Object3D[]): void;
    adjustPlane(): void;
    update(): void;
}
export { Caustics };
