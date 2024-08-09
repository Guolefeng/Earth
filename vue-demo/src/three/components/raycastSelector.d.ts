import * as THREE from "three";
import { Component } from "./component";
import { Base } from "../base/base";
/**
 * An encapsuled class for `THREE.Raycaster`.
 *
 * Demo: https://kokomi-js.vercel.app/examples/#raycastSelector
 */
declare class RaycastSelector extends Component {
    raycaster: THREE.Raycaster;
    constructor(base: Base);
    getInterSects(targets?: THREE.Object3D<THREE.Object3DEventMap>[]): THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[];
    getFirstIntersect(targets?: THREE.Object3D<THREE.Object3DEventMap>[]): THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>> | null;
    onChooseIntersect(target: THREE.Object3D): THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>> | null;
    onChooseInclude(target: THREE.Object3D): THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>> | null;
}
export { RaycastSelector };
