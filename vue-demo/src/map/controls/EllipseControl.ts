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
            name: "普通圆",
            lonlat: [117.24836695079108, 31.80350062543469],
            color: "#ff00ff",
            alpha: 0.5,
            duration: 5000,
            count: 3,
            semiMajorAxis: 200,
            semiMinorAxis: 200,
        });
        this.addEllipse({
            id: "rippletest1", // 保证id唯一
            name: "波纹圆",
            lonlat: [117.25498627652985, 31.803580603902574],
            color: "#ff0000",
            duration: 5000,
            count: 3,
            semiMajorAxis: 200,
            semiMinorAxis: 200,
            materialType: "ripple",
        });
        this.addEllipse({
            id: "rippletest2", // 保证id唯一
            name: "扫描圆",
            lonlat: [117.24046867241277, 31.80331270117943],
            color: "#00ff00",
            duration: 2000,
            count: 3,
            semiMajorAxis: 200,
            semiMinorAxis: 200,
            materialType: "scanline",
        });
        this.addEllipse({
            id: "rippletest3", // 保证id唯一
            name: "扩散圆",
            lonlat: [117.24775989484296, 31.797059873641267],
            color: "#ffff00",
            duration: 2000,
            count: 3,
            semiMajorAxis: 200,
            semiMinorAxis: 200,
            materialType: "diffuse",
        });
        this.addEllipse({
            id: "rippletest4", // 保证id唯一
            name: "消隐圆",
            lonlat: [117.25505370419305, 31.797501859677975],
            color: "#ffff00",
            duration: 2000,
            count: 3,
            semiMajorAxis: 200,
            semiMinorAxis: 200,
            materialType: "fade",
        });
        this.addEllipse({
            id: "rippletest5", // 保证id唯一
            name: "模糊圆",
            lonlat: [117.24023808340459, 31.797327350655795],
            color: "#ffff00",
            duration: 2000,
            count: 3,
            semiMajorAxis: 200,
            semiMinorAxis: 200,
            materialType: "blur",
        });
        this.addEllipse({
            id: "rippletest6", // 保证id唯一
            name: "螺旋圆",
            lonlat: [117.23437864459233, 31.803138610537314],
            color: "#ffff00",
            duration: 2000,
            count: 3,
            semiMajorAxis: 200,
            semiMinorAxis: 200,
            materialType: "spiral",
        });
        this.addEllipse({
            id: "rippletest7", // 保证id唯一
            name: "多彩圆",
            lonlat: [117.23488749835536, 31.797737464064628],
            color: "#ffff00",
            duration: 2000,
            count: 3,
            semiMajorAxis: 200,
            semiMinorAxis: 200,
            materialType: "colorful",
        });
        this.addEllipse({
            id: "rippletest8", // 保证id唯一
            name: "多彩圆",
            lonlat: [117.22707734735657, 31.803071125747948],
            color: "#ffff00",
            duration: 2000,
            count: 3,
            semiMajorAxis: 200,
            semiMinorAxis: 200,
            materialType: "pulse",
        });
        this.addEllipse({
            id: "rippletest9", // 保证id唯一
            name: "线雷达",
            lonlat: [117.2276250388573, 31.79723103064145],
            color: "#ffff00",
            duration: 2000,
            count: 3,
            semiMajorAxis: 200,
            semiMinorAxis: 200,
            materialType: "radarline",
        });
        this.addEllipse({
            id: "rippletest10", // 保证id唯一
            name: "波纹雷达圆",
            lonlat: [117.21943624292743, 31.803552187112814],
            color: "#ffff00",
            duration: 2000,
            count: 3,
            semiMajorAxis: 200,
            semiMinorAxis: 200,
            materialType: "radarwave",
        });
        this.addEllipse({
            id: "rippletest11", // 保证id唯一
            name: "雷达扫描圆",
            lonlat: [117.2200498777303, 31.797953090436913],
            color: "#ffff00",
            duration: 2000,
            count: 3,
            semiMajorAxis: 200,
            semiMinorAxis: 200,
            materialType: "radarscan",
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
