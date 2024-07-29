import * as Cesium from "cesium";

export interface EllipsoidParams {
    id: string; // 唯一id
    positions?: number[]; // 经纬度数组
    color?: string; // 地块颜色
}

export class Block {
    params: EllipsoidParams;
    primitive: Cesium.Primitive;
    primitiveOutline: Cesium.Primitive;
    smoothPositions: Cesium.Cartesian3[];

    constructor(data: EllipsoidParams) {
        this.params = data;
        this.primitive = this.createPrimitive();
    }

    createGeometryInstance() {
        const { id, positions = [], color } = this.params;
        // return new Cesium.GeometryInstance();
    }

    createPrimitive() {
        return new Cesium.Primitive({
            // geometryInstances: this.createGeometryInstance(),
            appearance: new Cesium.PerInstanceColorAppearance({
                flat: true,
                translucent: true,
            }),
            asynchronous: false,
        });
    }

    tick() {}

    destrory() {}
}
