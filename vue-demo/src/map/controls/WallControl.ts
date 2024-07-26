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
                99.0370857, 35.5491857, 99.9498331, 32.8952392, 103.5807667,
                26.1209562, 107.2308621, 28.2356585, 105.4612797, 37.5740191,
                99.0370857, 35.5491857,
            ],
            color: "#ffff00",
            maxHeight: 100000,
            duration: 1000,
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
        if (this.collection && !this.collection.isDestroyed()) {
            this.collection.destroy();
            // this.collection = null;
        }
    }
}
