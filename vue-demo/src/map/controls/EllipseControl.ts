import * as Cesium from "cesium";
import { getMapInstance } from "../instance";
import { Ellipse } from "./Ellipse";
import type { EllipseParams } from "./Ellipse";

export class EllipseControl {
    collection: Cesium.PrimitiveCollection;
    viewer: Cesium.Viewer;
    ellipses: { [key: string]: Ellipse } = {};
    tick: () => void;

    constructor() {
        this.tick = this._tick.bind(this);
        this.collection = new Cesium.PrimitiveCollection();
        this.viewer = getMapInstance();
        this.viewer.scene.primitives.add(this.collection);

        this.addEllipse({
            id: "rippletest", // 保证id唯一
            lonlat: [117.24836695079108, 31.80350062543469],
            color: "#ff0000",
            duration: 5000,
            count: 3,
            semiMajorAxis: 200,
            semiMinorAxis: 200,
        });
    }

    addEllipse(rippleParams: EllipseParams) {
        const ripple = new Ellipse(rippleParams);
        this.collection.add(ripple.primitive);
        this.ellipses[rippleParams.id] = ripple;
        return ripple;
    }

    removeRipple(ripple: Ellipse) {
        this.collection.remove(ripple.primitive);
        delete this.ellipses[ripple.params.id];
    }

    _tick() {
        for (const rippleId in this.ellipses) {
            const ripple = this.ellipses[rippleId];
            ripple.tick();
        }
    }

    destroy() {
        this.viewer.scene.primitives.remove(this.collection);
    }
}
