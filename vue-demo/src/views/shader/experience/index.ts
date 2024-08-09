import * as kokomi from "@/three";
import World from "./world";
import Debug from "./debug";
import resources from "./resources";
import Postprocessing from "./postProcessing";

export default class Experience extends kokomi.Base {
    world: World;
    debug: Debug;
    am: kokomi.AssetManager;

    constructor(id: string, options?: { onReady?: () => void }) {
        super(id);

        this.debug = new Debug({
            id,
            show: true,
        });

        this.am = new kokomi.AssetManager(this, resources);
        // this.camera.position.set(0, 0, 5);
        // new kokomi.OrbitControls(this);
        const screenCamera = new kokomi.ScreenCamera(this);
        screenCamera.addExisting();
        this.postprocessing = new Postprocessing(this);
        this.postprocessing.addExisting();

        this.world = new World(this, options);

        this.update(() => {
            this.postprocessing.ce.customPass.material.uniforms.uRGBShift.value =
                Math.abs(this.world.slider?.ws.scroll.delta) * 0.0004;
        });
    }

    dispose() {
        this.destroy();
        this.debug.destory();
    }
}
