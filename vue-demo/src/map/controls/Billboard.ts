import * as Cesium from "cesium";
import { getMapInstance } from "../instance";

export interface BillboardData {
    id: string;
    lonlat: [number, number];
    symbols: string[];
    name?: string;
    width?: number;
    height?: number;
    data?: any;
}

export class Billboard {
    params: BillboardData;
    viewer: Cesium.Viewer;
    billboardCollection: Cesium.BillboardCollection;
    billboard: Cesium.Billboard;
    symbolIndex: number = 0;
    interval: number;
    tween: Function;

    constructor(data: BillboardData) {
        this.params = data;
        this.viewer = getMapInstance();
        this.billboardCollection = new Cesium.BillboardCollection({
            scene: this.viewer.scene,
        });
        this.billboard = this.createBillboard();

        this.tween = this._tween.bind(this);
        this.interval = setInterval(this.tween, 300);
    }

    createBillboard() {
        const { width = 256, height = 256, symbols = [], lonlat } = this.params;
        return this.billboardCollection.add({
            show: true,
            image: symbols[this.symbolIndex],
            position: Cesium.Cartesian3.fromDegrees(lonlat[0], lonlat[1]),
            width,
            height,
            pixelOffset: new Cesium.Cartesian2(0, 0), // default: (0, 0)
            eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // default
            verticalOrigin: Cesium.VerticalOrigin.CENTER, // default: CENTER
            scale: 1.0, // default: 1.0
            color: Cesium.Color.WHITE, // default: WHITE
            rotation: Cesium.Math.TWO_PI, // default: 0.0
            alignedAxis: Cesium.Cartesian3.ZERO, // default
            scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 8.0e6, 0.1),
            heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
        });
    }

    _tween() {
        const { symbols } = this.params;
        if (this.symbolIndex === symbols.length - 1) {
            this.symbolIndex = 0;
        } else {
            this.symbolIndex++;
        }
        this.billboard.image = symbols[this.symbolIndex];
    }

    tick() {}

    destroy() {
        if (
            this.billboardCollection &&
            !this.billboardCollection.isDestroyed()
        ) {
            this.billboardCollection.destroy();
        }

        this.billboard = null;

        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}
