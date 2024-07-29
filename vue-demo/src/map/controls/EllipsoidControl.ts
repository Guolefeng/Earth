import * as Cesium from "cesium";
import { getMapInstance } from "../instance";
import { Ellipsoid } from "./Ellipsoid";
import type { EllipsoidParams } from "./Ellipsoid";

export class EllipsoidControl {
    collection: Cesium.PrimitiveCollection;
    viewer: Cesium.Viewer;
    walls: { [key: string]: Ellipsoid } = {};
    tick: () => void;

    constructor() {
        this.tick = this._tick.bind(this);
        this.collection = new Cesium.PrimitiveCollection();
        this.viewer = getMapInstance();
        this.viewer.scene.primitives.add(this.collection);

        this.add({
            id: "walltest",
            lonlat: [112.397428, 32.90923],
            radii: [100000.0, 100000.0, 100000.0],
            // rotation: [30, 60, 120],
            color: "#00ff00",
        });
    }

    add(ellipsoidPrams: EllipsoidParams) {
        const ellipsoid = new Ellipsoid(ellipsoidPrams);
        this.collection.add(ellipsoid.primitive);
        this.walls[ellipsoidPrams.id] = ellipsoid;
        return ellipsoid;
    }

    remove(ellipsoid: Ellipsoid) {
        this.collection.remove(ellipsoid.primitive);
        delete this.walls[ellipsoid.params.id];
    }

    _tick() {
        for (const wallId in this.walls) {
            const ellipsoid = this.walls[wallId];
            ellipsoid.tick();
        }
    }

    destroy() {
        this.viewer.scene.primitives.remove(this.collection);
    }
}
