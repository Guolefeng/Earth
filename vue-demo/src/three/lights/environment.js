import * as THREE from "three";
import { Component } from "../components/component";
class Environment extends Component {
    fbo;
    cubeCamera;
    virtualScene;
    ignoreObjects;
    constructor(base, config = {}) {
        super(base);
        const { resolution = 256, near = 1, far = 1000, scene = null, options = {}, textureType = THREE.HalfFloatType, ignoreObjects = [], } = config;
        this.ignoreObjects = ignoreObjects;
        const fbo = new THREE.WebGLCubeRenderTarget(resolution, options);
        fbo.texture.type = textureType;
        this.fbo = fbo;
        const cubeCamera = new THREE.CubeCamera(near, far, fbo);
        this.cubeCamera = cubeCamera;
        const virtualScene = scene || new THREE.Scene();
        this.virtualScene = virtualScene;
    }
    update() {
        this.ignoreObjects.forEach((item) => {
            item.visible = false;
        });
        this.cubeCamera.update(this.base.renderer, this.virtualScene);
        this.ignoreObjects.forEach((item) => {
            item.visible = true;
        });
    }
    add(obj) {
        this.virtualScene.add(obj);
    }
    get texture() {
        return this.fbo.texture;
    }
}
export { Environment };
