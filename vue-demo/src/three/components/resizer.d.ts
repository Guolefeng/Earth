import * as THREE from "three";
import { Component } from "./component";
import { Base } from "../base/base";
import type { EffectComposer } from "three-stdlib";
export interface ResizerConfig {
    autoAdaptMobile: boolean;
}
declare class Resizer extends Component {
    enabled: boolean;
    autoAdaptMobile: boolean;
    constructor(base: Base, config?: Partial<ResizerConfig>);
    get aspect(): number;
    resizeRenderer(renderer: THREE.WebGLRenderer): void;
    resizeComposer(composer: EffectComposer): void;
    resizeCamera(camera: THREE.Camera): void;
    resize(): void;
    listenForResize(): void;
    enable(): void;
    disable(): void;
    adaptMobile(): void;
}
export { Resizer };
