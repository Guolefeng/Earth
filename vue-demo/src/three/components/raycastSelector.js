import * as THREE from "three";
import { Component } from "./component";
/**
 * An encapsuled class for `THREE.Raycaster`.
 */
class RaycastSelector extends Component {
    raycaster;
    constructor(base) {
        super(base);
        this.raycaster = new THREE.Raycaster();
    }
    // 获取点击物
    getInterSects(targets = this.container.children) {
        this.raycaster.setFromCamera(
            this.base.interactionManager.mouse,
            this.base.camera
        );
        const intersects = this.raycaster.intersectObjects(targets, true);
        return intersects;
    }
    // 获取第一个选中物
    getFirstIntersect(targets = this.container.children) {
        const intersects = this.getInterSects(targets);
        const intersect = intersects[0];
        if (!intersect || !intersect.face) {
            return null;
        }
        return intersect;
    }
    // 选中点击物时
    onChooseIntersect(target) {
        const intersect = this.getFirstIntersect();
        if (!intersect) {
            return null;
        }
        const object = intersect.object;
        return target === object ? intersect : null;
    }
    // 选中物包含某个点击物时
    onChooseInclude(target) {
        const targets = this.getInterSects();
        const includedTarget = targets.find((item) => item.object === target);
        return includedTarget ? includedTarget : null;
    }
}
export { RaycastSelector };
