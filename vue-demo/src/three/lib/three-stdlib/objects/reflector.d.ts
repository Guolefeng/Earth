import { Mesh, PerspectiveCamera, ShaderMaterial, WebGLRenderTarget, Object3D, BufferGeometry } from "three";
import { ReflectorOptions } from "three-stdlib";
export interface ReflectorConfig extends ReflectorOptions {
    ignoreObjects: Object3D[];
}
/**
 * Improved version of STDLIB.Reflector.
 * 1. Add ignoreObjects.
 */
declare class Reflector extends Mesh {
    ignoreObjects: Object3D[];
    isReflector: boolean;
    camera: PerspectiveCamera;
    material: ShaderMaterial;
    getRenderTarget: () => WebGLRenderTarget;
    dispose: () => void;
    constructor(geometry: BufferGeometry, options?: Partial<ReflectorConfig>);
}
export { Reflector };
