import * as THREE from "three";
import { Component } from "../components/component";
import { OrbitControls } from "../controls";
/**
 * A viewer for viewing panoramas.
 */
class Viewer extends Component {
    camera;
    orbitControls;
    panoramas;
    currentPanorama;
    constructor(base, config = {}) {
        super(base);
        const { fov = 60 } = config;
        const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.set(0, 0, 1);
        base.camera = camera;
        base.interactionManager.camera = camera;
        this.camera = camera;
        const orbitControls = new OrbitControls(base);
        this.orbitControls = orbitControls;
        this.panoramas = [];
        this.currentPanorama = null;
    }
    add(panorama) {
        panorama.addExisting();
        this.panoramas.push(panorama);
        panorama.onEnter(0);
        this.currentPanorama = panorama;
    }
    setPanorama(panorama, duration = 0.5) {
        if (panorama === this.currentPanorama) {
            return;
        }
        const otherPanoramas = this.panoramas.filter((item) => item !== this.currentPanorama);
        otherPanoramas.forEach((item) => {
            item.onLeave(0);
        });
        this.currentPanorama?.onLeave(duration);
        panorama?.onEnter(duration);
        this.currentPanorama = panorama;
    }
}
export { Viewer };
