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
            id: "eltest0",
            lonlat: [117.23973085489449, 31.776951357266306],
            radii: [300.0, 100.0, 100.0],
            // rotation: [30, 60, 120],
            color: "#00ff00",
            alpha: 0.5,
        });
        this.add({
            id: "eltest1",
            lonlat: [117.2389720639443, 31.76888877073932],
            radii: [500.0, 500.0, 500.0],
            // rotation: [30, 60, 120],
            color: "#00ff00",
            alpha: 0.5,
            materialType: "electronic",
        });
        this.add({
            id: "eltest2",
            lonlat: [117.24122365059718, 31.759571518656205],
            radii: [200.0, 200.0, 200.0],
            // rotation: [30, 60, 120],
            color: "#00ff00",
            alpha: 0.5,
            materialType: "trail",
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
