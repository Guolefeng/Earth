import * as Cesium from "cesium";
import { getMapInstance } from "../instance";
import { Ripple } from "./Ripple";
import type { RippleParams } from "./Ripple";

export class RippleControl {
    collection: Cesium.PrimitiveCollection;
    viewer: Cesium.Viewer;
    ripples: { [key: string]: Ripple } = {};
    tick: () => void;

    constructor() {
        this.tick = this._tick.bind(this);
        this.collection = new Cesium.PrimitiveCollection();
        this.viewer = getMapInstance();
        this.viewer.scene.primitives.add(this.collection);

        this.addRipple({
            id: "rippletest", // 保证id唯一
            lonlat: [116.397428, 35.90923],
            color: "#ff0000",
            duration: 5000,
            count: 3,
        });
    }

    addRipple(rippleParams: RippleParams) {
        const ripple = new Ripple(rippleParams);
        this.collection.add(ripple.primitive);
        this.ripples[rippleParams.id] = ripple;
        return ripple;
    }

    removeRipple(ripple: Ripple) {
        this.collection.remove(ripple.primitive);
        delete this.ripples[ripple.params.id];
    }

    _tick() {
        for (const rippleId in this.ripples) {
            const ripple = this.ripples[rippleId];
            ripple.tick();
        }
    }

    destroy() {
        this.viewer.scene.primitives.remove(this.collection);
    }
}
