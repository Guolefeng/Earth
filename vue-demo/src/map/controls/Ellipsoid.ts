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
        const {
            id,
            positions = [],
            color,
            alpha = 1,
            isSmooth,
            extrudedHeight,
        } = params;
        return new Cesium.GeometryInstance({
            id: id,
            geometry: new Cesium.PolygonGeometry({
                polygonHierarchy: new Cesium.PolygonHierarchy(
                    isSmooth
                        ? this.smoothPositions
                        : Cesium.Cartesian3.fromDegreesArray(positions)
                ),
                extrudedHeight: extrudedHeight,
            }),
            attributes: {
                color: color
                    ? Cesium.ColorGeometryInstanceAttribute.fromColor(
                          Cesium.Color.fromCssColorString(color).withAlpha(
                              alpha
                          )
                      )
                    : undefined,
            },
        });
    }

    createPrimitive() {
        return new Cesium.Primitive({
            geometryInstances: this.createGeometryInstance(),
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
