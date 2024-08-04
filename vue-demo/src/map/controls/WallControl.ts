import * as Cesium from "cesium";
import { getMapInstance } from "../instance";
import { Wall } from "./Wall";
import type { WallParams } from "./Wall";

export class WallControl {
    collection: Cesium.PrimitiveCollection;
    viewer: Cesium.Viewer;
    walls: { [key: string]: Wall } = {};
    tick: () => void;

    constructor() {
        this.tick = this._tick.bind(this);
        this.collection = new Cesium.PrimitiveCollection();
        this.viewer = getMapInstance();
        this.viewer.scene.primitives.add(this.collection);

        this.add({
            id: "walltest",
            positions: [
                117.26399099015006, 31.809544184948113, 117.26283053635193,
                31.801913277483507, 117.26536987050359, 31.801843483894416,
                117.2668453052015, 31.804504935250346, 117.26694233070945,
                31.809398560684265, 117.26399099015006, 31.809544184948113,
            ],
            color: "#ffff00",
            maxHeight: 50,
            duration: 2000,
            direction: 1,
        });
    }

    add(wallParams: WallParams) {
        const wall = new Wall(wallParams);
        this.collection.add(wall.primitive);
        this.walls[wallParams.id] = wall;
        return wall;
    }

    remove(wall: Wall) {
        this.collection.remove(wall.primitive);
        delete this.walls[wall.params.id];
    }

    _tick() {
        for (const wallId in this.walls) {
            const wall = this.walls[wallId];
            wall.tick();
        }
    }

    destroy() {
        this.viewer.scene.primitives.remove(this.collection);
    }
}
