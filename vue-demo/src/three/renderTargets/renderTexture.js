import * as THREE from "three";
import { Component } from "../components/component";
import { FBO } from "./fbo";
/**
 * You can render a scene into this texture.
 *
 * Demo: https://kokomi-js.vercel.app/examples/#renderTexture
 */
class RenderTexture extends Component {
    fbo;
    texture;
    rtScene;
    rtCamera;
    constructor(base, config = {}) {
        super(base);
        const { rtScene = new THREE.Scene(), rtCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100), fboOptions = {}, } = config;
        this.rtScene = rtScene;
        this.rtCamera = rtCamera;
        const fbo = new FBO(base, { ...config, options: fboOptions });
        this.fbo = fbo;
        const texture = fbo.rt.texture;
        this.texture = texture;
    }
    update() {
        this.base.renderer.setRenderTarget(this.fbo.rt);
        this.base.renderer.render(this.rtScene, this.rtCamera);
        this.base.renderer.setRenderTarget(null);
    }
    add(obj) {
        this.rtScene.add(obj);
    }
}
export { RenderTexture };
