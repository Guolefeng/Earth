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

/**
 * 更新Cesium Viewer的底图着色器
 *
 * @param viewer Cesium Viewer对象
 */
export function updateBaseMap(viewer: Cesium.Viewer) {
    // 设置2个变量，用来判断是否进行颜色的翻转和过滤
    const invertColor = true;
    const filterRGB = [0, 50, 100]; // [255,255,255] = > [0,50,100]
    // 更改底图着色器
    const baseFragmentShader =
        // @ts-ignore
        viewer.scene.globe._surfaceShaderSet.baseFragmentShaderSource.sources;
    // 循环修改着色器
    for (let i = 0; i < baseFragmentShader.length; i++) {
        const strS =
            "color = czm_saturation(color, textureSaturation);\n#endif\n";
        let strT =
            "color = czm_saturation(color, textureSaturation);\n#endif\n";
        if (invertColor) {
            strT += `
                color.r = 1.0 - color.r;
                color.g = 1.0 - color.g;
                color.b = 1.0 - color.b;
            `;
        }
        if (filterRGB) {
            strT += `
                color.r = color.r*${filterRGB[0]}.0/255.0;
                color.g = color.g*${filterRGB[1]}.0/255.0;
                color.b = color.b*${filterRGB[2]}.0/255.0;
            `;
        }

        baseFragmentShader[i] = baseFragmentShader[i].replace(strS, strT);
    }
}
