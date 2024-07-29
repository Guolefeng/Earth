import * as Cesium from "cesium";
import { getMapInstance } from "../instance";
import { Billboard } from "./Billboard";
import type { BillboardData } from "./Billboard";

export class BillboardControl {
    collection: Cesium.PrimitiveCollection;
    viewer: Cesium.Viewer;
    billboards: { [key: string]: Billboard } = {};
    tick: () => void;

    constructor() {
        this.tick = this._tick.bind(this);
        this.collection = new Cesium.PrimitiveCollection();
        this.viewer = getMapInstance();
        this.viewer.scene.primitives.add(this.collection);

        this.add({
            id: "testbillboard0",
            symbols: [
                "/effect/fire/1.png",
                "/effect/fire/2.png",
                "/effect/fire/3.png",
                "/effect/fire/4.png",
                "/effect/fire/5.png",
                "/effect/fire/6.png",
                "/effect/fire/7.png",
                "/effect/fire/8.png",
            ],
            lonlat: [110.397428, 32.90923],
            name: "test",
            data: {},
        });
        this.add({
            id: "testbillboard1",
            symbols: [
                "/effect/tornado/1.png",
                "/effect/tornado/2.png",
                "/effect/tornado/3.png",
                "/effect/tornado/4.png",
                "/effect/tornado/5.png",
                "/effect/tornado/6.png",
                "/effect/tornado/7.png",
                "/effect/tornado/8.png",
                "/effect/tornado/9.png",
                "/effect/tornado/10.png",
                "/effect/tornado/11.png",
                "/effect/tornado/12.png",
                "/effect/tornado/13.png",
                "/effect/tornado/14.png",
                "/effect/tornado/15.png",
                "/effect/tornado/16.png",
                "/effect/tornado/17.png",
                "/effect/tornado/18.png",
            ],
            lonlat: [116.397428, 32.90923],
            name: "test",
            data: {},
        });
    }

    add(billboardParams: BillboardData) {
        const b = new Billboard(billboardParams);
        this.collection.add(b.billboardCollection);
        this.billboards[billboardParams.id] = b;
        return b;
    }

    remove(billboard: Billboard) {
        this.collection.remove(billboard.billboardCollection);
        delete this.billboards[billboard.params.id];
    }

    _tick() {}

    destroy() {
        this.viewer.scene.primitives.remove(this.collection);
    }
}
