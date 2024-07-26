import * as Cesium from "cesium";
import { getMapInstance } from "../instance";
import { Block } from "./Block";
import type { BlockParams } from "./Block";

export class BlockControl {
    collection: Cesium.PrimitiveCollection;
    viewer: Cesium.Viewer;
    blocks: { [key: string]: Block } = {};

    constructor() {
        this.collection = new Cesium.PrimitiveCollection();
        this.viewer = getMapInstance();
        this.viewer.scene.primitives.add(this.collection);

        [
            [
                99.0370857, 35.5491857, 99.9498331, 32.8952392, 103.5807667,
                26.1209562, 107.2308621, 28.2356585, 105.4612797, 37.5740191,
            ],
            [
                93.8922893, 33.1375102, 94.5354935, 33.5645853, 95.4444824,
                33.6726055, 96.5768134, 32.8390939, 97.011378, 32.0043192,
                97.1469899, 30.9214427, 96.2222952, 30.1011564, 94.6613538,
                30.3466824, 93.6121243, 31.2025611, 93.2147125, 31.8803461,
            ],
        ].forEach((p, i) => {
            this.add({
                id: "blocktest" + i,
                color: "#ff0000",
                positions: p,
                outline: true,
                outlineColor: "#00ff00",
                alpha: 0.5,
                extrudedHeight: 10000,
                isSmooth: true,
            });
        });
    }

    add(blockParams: BlockParams) {
        const block = new Block(blockParams);
        this.collection.add(block.primitive);
        block.primitiveOutline && this.collection.add(block.primitiveOutline);
        this.blocks[blockParams.id] = block;
        return block;
    }

    remove(block: Block) {
        this.collection.remove(block.primitive);
        block.primitiveOutline &&
            this.collection.remove(block.primitiveOutline);
        delete this.blocks[block.params.id];
    }

    _tick() {}

    destroy() {
        if (this.collection && !this.collection.isDestroyed()) {
            this.collection.destroy();
            this.collection = null;
        }
    }
}
