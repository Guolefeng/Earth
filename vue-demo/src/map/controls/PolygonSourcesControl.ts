import * as Cesium from "cesium";
import { getMapInstance } from "../instance";
import { Polygon } from "./Polygon";
import type { PolygonParams } from "./Polygon";

interface IBlockParams extends PolygonParams {
    path: string;
}

interface IBlock {
    id: string;
    [key: string]: Cesium.Primitive | string;
}

export class BlockSourcesControl {
    collection: Cesium.PrimitiveCollection;
    viewer: Cesium.Viewer;
    blocks: { [key: string]: IBlock } = {};

    constructor() {
        this.collection = new Cesium.PrimitiveCollection();
        this.viewer = getMapInstance();
        this.viewer.scene.primitives.add(this.collection);

        this.add({
            id: "test",
            path: "./geojson/650000_full.json",
            alpha: 0.5,
            extrudedHeight: 10000,
        });
    }

    add(params: IBlockParams) {
        const { id, path, outline } = params;
        fetch(path)
            .then((res) => res.json())
            .then((data) => {
                const instances = [];
                const outlineInstances = [];
                const features = data.features;
                for (let i = 0, flen = features.length; i < flen; i++) {
                    for (
                        let j = 0,
                            clen = features[i].geometry.coordinates.length;
                        j < clen;
                        j++
                    ) {
                        const positions = features[i].geometry.coordinates[j]
                            .toString()
                            .split(",")
                            .map((s: string) => Number(s));
                        const color = Cesium.Color.fromRandom();
                        instances.push(
                            Polygon.prototype.createGeometryInstance({
                                ...params,
                                color: color.toCssHexString(),
                                positions,
                            })
                        );
                        if (outline) {
                            outlineInstances.push(
                                Polygon.prototype.createOutlineGeometryInstance(
                                    {
                                        ...params,
                                        // outlineColor: color.toCssHexString(),
                                        outlineColor: "#ff0000",
                                        positions,
                                    }
                                )
                            );
                        }
                    }
                }

                const primitive = this.createPrimitive(instances);
                this.collection.add(primitive);
                this.blocks[id] = {
                    id,
                    primitive,
                };
                if (outline) {
                    const primitiveOutline =
                        this.createPrimitive(outlineInstances);
                    this.collection.add(primitiveOutline);
                    this.blocks[id]["primitiveOutline"] = primitiveOutline;
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    createPrimitive(instances: Cesium.GeometryInstance[]) {
        return new Cesium.Primitive({
            geometryInstances: instances,
            appearance: new Cesium.PerInstanceColorAppearance({
                flat: true,
                translucent: true,
            }),
            asynchronous: false,
        });
    }

    remove(block: IBlock) {
        this.collection.remove(block.primitive);
        block.primitiveOutline &&
            this.collection.remove(block.primitiveOutline);
        delete this.blocks[block.id];
    }

    destroy() {
        this.viewer.scene.primitives.remove(this.collection);
    }
}
