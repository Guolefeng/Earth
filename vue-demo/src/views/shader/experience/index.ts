import * as kokomi from "@/three";
import World from "./world";
import Debug from "./debug";
import resources from "./resources";

export default class Experience extends kokomi.Base {
    world: World;
    debug: Debug;
    am: kokomi.AssetManager;

    constructor(id: string) {
        super(id);
        // @ts-ignore
        window.experience = this;

        this.debug = new Debug({
            id,
            show: true,
        });

        this.am = new kokomi.AssetManager(this, resources);
        this.camera.position.set(0, 0, 5);
        new kokomi.OrbitControls(this);

        this.world = new World(this);
    }

    dispose() {
        this.destroy();
        this.debug.destory();
    }
}
