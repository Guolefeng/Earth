import * as Cesium from "cesium";

export interface PolygonParams {
    id: string; // 唯一id
    positions?: number[]; // 经纬度数组
    color?: string; // 地块颜色
    extrudedHeight?: number; // 地块厚度
    outline?: boolean; // 是否显示轮廓
    outlineColor?: string; // 轮廓颜色
    alpha?: number; // 透明度, 默认1
    isSmooth?: boolean; // 是否平滑
    interCount?: number; // 点与点之间插值次数, 默认10
}

export class Polygon {
    params: PolygonParams;
    primitive: Cesium.Primitive;
    primitiveOutline: Cesium.Primitive;
    smoothPositions: Cesium.Cartesian3[];
    // 递增高度, 用于动态变化高度
    increaseHeight: number = 0;

    constructor(data: PolygonParams) {
        this.params = data;
        if (this.params.isSmooth) {
            this.smoothPositions = this.getSmoothPositions(data.positions);
        }
        this.primitive = this.createPrimitive(
            this.createGeometryInstance(this.params)
        );
        if (this.params.outline) {
            this.primitiveOutline = this.createPrimitive(
                this.createOutlineGeometryInstance(this.params)
            );
        }
    }

    createGeometryInstance(params: PolygonParams) {
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
                extrudedHeight,
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

    createOutlineGeometryInstance(params: PolygonParams) {
        const {
            id,
            positions = [],
            isSmooth,
            extrudedHeight,
            outlineColor,
        } = params;
        return new Cesium.GeometryInstance({
            id: id ? id + "outline" : id,
            geometry: new Cesium.PolygonOutlineGeometry({
                polygonHierarchy: new Cesium.PolygonHierarchy(
                    isSmooth
                        ? this.smoothPositions
                        : Cesium.Cartesian3.fromDegreesArray(positions)
                ),
                extrudedHeight,
            }),
            attributes: {
                color: outlineColor
                    ? Cesium.ColorGeometryInstanceAttribute.fromColor(
                          Cesium.Color.fromCssColorString(outlineColor)
                      )
                    : undefined,
            },
        });
    }

    createPrimitive(instance: Cesium.GeometryInstance) {
        return new Cesium.Primitive({
            geometryInstances: instance,
            appearance: new Cesium.PerInstanceColorAppearance({
                flat: true,
                translucent: true,
                renderState: {
                    depthTest: {
                        enabled: false,
                    },
                },
            }),
            asynchronous: false,
        });
    }

    getSmoothPositions(ps: number[] = []) {
        if (ps.length < 2) {
            return [];
        }
        const { interCount = 10 } = this.params;
        ps = ps.concat([ps[0], ps[1]]);
        const points = Cesium.Cartesian3.fromDegreesArray(ps);
        const interpolatedPoints = [];
        for (let i = 0; i < points.length - 1; i++) {
            const startPoint = points[i];
            const endPoint = points[i + 1];
            for (let j = 0; j < interCount; j++) {
                interpolatedPoints.push(
                    Cesium.Cartesian3.lerp(
                        startPoint,
                        endPoint,
                        j / interCount,
                        new Cesium.Cartesian3()
                    )
                );
            }
        }
        const times = new Array(interpolatedPoints.length)
            .fill(0.0)
            .reduce((acc, cur, i) => {
                acc.push(i);
                return acc;
            }, []);
        const spline = Cesium.HermiteSpline.createNaturalCubic({
            points: interpolatedPoints,
            times,
        });
        const timeLen = times[times.length - 1] - times[0];
        const totalTimes =
            interpolatedPoints.length +
            (interpolatedPoints.length - 1) * interCount;
        const acc = timeLen / totalTimes;
        const positions: any[] = [];
        for (let i = 0; i <= timeLen; i += acc) {
            positions.push(spline.evaluate(i));
        }
        return positions;
    }

    tick() {}

    destrory() {}
}
