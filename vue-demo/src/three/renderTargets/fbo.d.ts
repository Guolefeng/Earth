import * as THREE from "three";
import type { Base } from "../base/base";
import { Component } from "../components/component";
export interface FBOConfig {
    width: number;
    height: number;
    samples: number;
    depth: boolean;
    options: THREE.RenderTargetOptions;
}
declare class FBO extends Component {
    width?: number;
    height?: number;
    rt: THREE.WebGLRenderTarget;
    constructor(base: Base, config?: Partial<FBOConfig>);
    get actualWidth(): number;
    get actualHeight(): number;
}
export { FBO };
