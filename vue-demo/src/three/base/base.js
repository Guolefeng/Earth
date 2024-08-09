import * as THREE from "three";
import { InteractionManager } from "three.interactive";
import {
    Animator,
    Clock,
    Physics,
    Resizer,
    IMouse,
    Keyboard,
} from "../components";
import { downloadBlob } from "../utils";

class Base {
    camera;
    scene;
    renderer;
    container;
    animator;
    interactionManager;
    composer;
    clock;
    iMouse;
    physics;
    resizer;
    keyboard;
    constructor(sel = "", config = {}) {
        const { gl = {}, autoAdaptMobile = false, autoRender = true } = config;
        this.container = document.querySelector(sel);
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;
        const camera = new THREE.PerspectiveCamera(70, w / h, 0.01, 100);
        camera.position.z = 1;
        this.camera = camera;
        const scene = new THREE.Scene();
        this.scene = scene;
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            ...gl,
        });
        renderer.setSize(w, h);
        renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
        this.renderer = renderer;

        this.container?.appendChild(renderer.domElement);

        const animator = new Animator(this, {
            autoRender,
        });
        this.animator = animator;
        const interactionManager = new InteractionManager(
            this.renderer,
            this.camera,
            this.renderer.domElement
        );
        this.interactionManager = interactionManager;
        this.composer = null;
        const clock = new Clock(this);
        this.clock = clock;
        const iMouse = new IMouse(this);
        this.iMouse = iMouse;
        const physics = new Physics(this);
        this.physics = physics;
        const resizer = new Resizer(this, {
            autoAdaptMobile,
        });
        this.resizer = resizer;
        const keyboard = new Keyboard();
        this.keyboard = keyboard;
        this.init();
        this.addEventListeners();
    }
    addEventListeners() {
        // resize
        this.resizer.listenForResize();
        // mouse
        this.iMouse.listenForMouse();
        // keyboard
        this.keyboard.listenForKey();
    }
    update(fn) {
        this.animator.add(fn);
    }
    init() {
        this.update(() => {
            this.interactionManager.update();
        });
        this.animator.update();
    }
    render() {
        if (this.composer) {
            this.composer.render();
        } else {
            this.renderer.render(this.scene, this.camera);
        }
    }
    async saveScreenshot(name = `screenshot.png`) {
        this.render();
        const blob = await new Promise((resolve) => {
            this.renderer.domElement.toBlob(resolve, "image/png");
        });
        if (blob) {
            downloadBlob(blob, name);
        }
    }
    destroy() {
        // scene
        this.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.geometry?.dispose();
                Object.values(child.material).forEach((value) => {
                    if (value && typeof value.dispose === "function") {
                        value.dispose();
                    }
                });
            }
        });
        // renderer
        this.renderer.dispose();
        // container
        this.container?.removeChild(this.renderer.domElement);
    }
}
export { Base };
