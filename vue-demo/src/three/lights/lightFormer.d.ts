import * as THREE from "three";
import { Component } from "../components/component";
import { Base } from "../base/base";
export type Form = "circle" | "ring" | "rect";
export interface LightFormerConfig {
    color: string;
    form: Form;
    intensity: number;
}
declare class LightFormer extends Component {
    material: THREE.MeshBasicMaterial;
    mesh: THREE.Mesh;
    constructor(base: Base, config?: Partial<LightFormerConfig>);
    addExisting(): void;
}
export { LightFormer };
