import * as Cesium from "cesium";

/**
 * @description: 昼夜交替效果
 * @param {*} viewer
 * @return {*}
 */
export function updateLighting(viewer: Cesium.Viewer) {
    // OSM标准风格地图
    const dayLayer = viewer.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
            url: "https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png",
            subdomains: ["a", "b", "c", "d"],
        })
    );

    // OSM暗色系地图
    const nightLayer = viewer.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
            url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
            subdomains: ["a", "b", "c", "d"],
        })
    );
    // 启用光照
    viewer.scene.globe.enableLighting = true;
    viewer.clock.shouldAnimate = true;
    viewer.clock.multiplier = 5000;
    nightLayer.dayAlpha = 0.0;
}
