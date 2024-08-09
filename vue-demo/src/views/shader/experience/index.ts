import * as kokomi from "kokomi.js";
import World from "./world";

export default class Experience extends kokomi.Base {
    world: World;

    constructor(id: string) {
        super(id);
        // @ts-ignore
        window.experience = this;

        this.camera.position.set(0, 0, 5);
        new kokomi.OrbitControls(this);

        this.world = new World(this);
    }
}
