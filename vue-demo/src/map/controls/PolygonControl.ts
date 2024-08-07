import * as Cesium from "cesium";
import { getMapInstance } from "../instance";
import { Polygon } from "./Polygon";
import type { PolygonParams } from "./Polygon";

export class PolygonControl {
    collection: Cesium.PrimitiveCollection;
    viewer: Cesium.Viewer;
    polygons: { [key: string]: Polygon } = {};
    tick: () => void;

    constructor() {
        this.tick = this._tick.bind(this);
        this.collection = new Cesium.PrimitiveCollection();
        this.viewer = getMapInstance();
        this.viewer.scene.primitives.add(this.collection);

        [
            [
                117.28110536376984, 31.77516342062378, 117.2811921616697,
                31.76905808043115, 117.28578825639237, 31.769107924260883,
                117.28598569212468, 31.77511739402206,
            ],
            [
                117.2860865410118, 31.785266338247247, 117.28620746794086,
                31.769287573783807, 117.29625865002052, 31.769571521131006,
                117.29655929665867, 31.785567607580564,
            ],
            [
                117.28104511168337, 31.785322768534172, 117.28112423945734,
                31.77564222242857, 117.285554696302, 31.775614772586827,
                117.2856189143652, 31.785281217151187,
            ],
            [
                117.28109132754209, 31.76880315181833, 117.28095648933085,
                31.75844681641697, 117.29651533654916, 31.758438526280166,
                117.29656351056884, 31.768987388941927,
            ],
        ].forEach((p, i) => {
            this.add({
                id: "blocktest" + i,
                color: Cesium.Color.fromRandom().toCssHexString(),
                positions: p,
                outline: false,
                outlineColor: "#00ff00",
                alpha: 0.5,
                extrudedHeight: 100,
                isSmooth: true,
            });
        });
    }

    add(polygonParams: PolygonParams) {
        const polygon = new Polygon(polygonParams);
        this.collection.add(polygon.primitive);
        polygon.primitiveOutline &&
            this.collection.add(polygon.primitiveOutline);
        this.polygons[polygonParams.id] = polygon;
        return polygon;
    }

    remove(polygon: Polygon) {
        this.collection.remove(polygon.primitive);
        polygon.primitiveOutline &&
            this.collection.remove(polygon.primitiveOutline);
        delete this.polygons[polygon.params.id];
    }

    _tick() {
        for (const id in this.polygons) {
            const p = this.polygons[id];
            p.tick();
        }
    }

    destroy() {
        this.viewer.scene.primitives.remove(this.collection);
    }
}
