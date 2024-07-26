<script setup lang="ts">
import { onMounted } from "vue";
import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

Cesium.Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1NGFkNmRmNC05NmFkLTRmMDktYTFkMS0yNTE0NjNmOWEwYjMiLCJpZCI6NjA1MDAsImlhdCI6MTYyNTEyMDcyNn0.S14rriO-ggk-vKvkUa3wONp0zSAOEUBBx8tZJRrPzqY";

onMounted(() => {
    const viewer = new Cesium.Viewer(
        document.getElementById("map") as Element,
        {
            animation: false, // 是否创建动画小器件，左下角仪表
            baseLayerPicker: true, // 是否显示图层选择器
            fullscreenButton: true, // 是否显示全屏按钮
            vrButton: true, //  用于切换 VR 模式的单个按钮小部件。
            geocoder: true, //  // 是否显示geocoder小器件，右上角查询按钮
            homeButton: true, // 是否显示Home按钮
            infoBox: true, // 是否显示信息框
            sceneModePicker: true, // 是否显示3D/2D选择器
            selectionIndicator: true, // 是否显示选取指示器组件
            timeline: false, // 是否显示时间轴
            navigationHelpButton: true, // 是否显示右上角的帮助按钮
            navigationInstructionsInitiallyVisible: true,
            scene3DOnly: false, // 如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
            shouldAnimate: false, //  初始化是否开始动画
            clockViewModel: undefined, //  一个视图模型，它为用户界面提供 Clock
            selectedImageryProviderViewModel: undefined, // 当前图像图层的显示模型，仅baseLayerPicker设为true有意义
            selectedTerrainProviderViewModel: undefined, // 当前地形图层的显示模型，仅baseLayerPicker设为true有意义
            skyBox: new Cesium.SkyBox({
                sources: {
                    positiveX: "./skyBox/00h+00.jpg",
                    negativeX: "./skyBox/12h+00.jpg",
                    positiveY: "./skyBox/06h+00.jpg",
                    negativeY: "./skyBox/18h+00.jpg",
                    positiveZ: "./skyBox/06h+90.jpg",
                    negativeZ: "./skyBox/06h-90.jpg",
                },
            }), // 用于渲染星空的SkyBox对象
            skyAtmosphere: new Cesium.SkyAtmosphere(), //  围绕提供的椭球体边缘绘制的大气
            fullscreenElement: document.body, // 全屏时渲染的HTML元素,
            useDefaultRenderLoop: true, // 如果需要控制渲染循环，则设为true
            targetFrameRate: undefined, // 使用默认render loop时的帧率
            showRenderLoopErrors: false, // 如果设为true，将在一个HTML面板中显示错误信息
            automaticallyTrackDataSourceClocks: false, // 自动追踪最近添加的数据源的时钟设置
            contextOptions: {}, // 传递给Scene对象的上下文参数（scene.options）
            sceneMode: Cesium.SceneMode.SCENE3D, // 初始场景模式
            mapProjection: new Cesium.WebMercatorProjection(), // 地图投影体系
            globe: undefined, //  在场景中渲染的地球仪，包括其地形 ( Globe#terrainProvider ) 和图像图层 ( Globe#imageryLayers )
            orderIndependentTranslucency: true,
            dataSources: new Cesium.DataSourceCollection(), // 需要进行可视化的数据源的集合
            projectionPicker: undefined, // ProjectionPicker 是用于在透视和正交投影之间切换的单按钮小部件。
            // imageryProviderViewModels: Cesium.createDefaultImageryProviderViewModels(), // 图层选择器,可供BaseLayerPicker选择的图像图层ProviderViewModel数组
            // terrainProviderViewModels: Cesium.createDefaultTerrainProviderViewModels(), // 地形选择器,可供BaseLayerPicker选择的地形图层ProviderViewModel数组
            // imageryProvider: new Cesium.OpenStreetMapImageryProvider({
            //   credit: "",
            //   url: "Custom url",
            // }), // 图像图层提供者，仅baseLayerPicker设为false有意义
            terrainProvider: new Cesium.EllipsoidTerrainProvider(), //地形图层提供者，仅baseLayerPicker设为false有意义
        }
    );

    // 去除版权信息
    // @ts-ignore
    viewer.cesiumWidget.creditContainer.style.display = "none";
    // 增加太阳光照
    viewer.scene.globe.enableLighting = true;
    // 显示帧速
    viewer.scene.debugShowFramesPerSecond = true;
    // 修改默认相机位置
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(116.39, 39.91, 20000000.0),
        // destination: Cesium.Cartesian3.fromDegrees(116.39, 39.91, 15000.0), // 天安门广场
    });
    // 修改homeButton的默认返回位置
    viewer.homeButton.viewModel.command.beforeExecute.addEventListener(
        function (commandInfo: any) {
            // Fly to custom position
            viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(
                    116.39,
                    39.91,
                    20000000.0
                ),
                // destination: Cesium.Cartesian3.fromDegrees(116.39, 39.91, 15000.0), // 天安门广场
            });

            // Tell the home button not to do anything
            commandInfo.cancel = true;
        }
    );
    // 昼夜交替效果
    // updateLighting(viewer);
});

/**
 * @description: 昼夜交替效果
 * @param {*} _viewer
 * @return {*}
 */
function updateLighting(_viewer: Cesium.Viewer) {
    // OSM标准风格地图
    const dayLayer = _viewer.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
            url: "https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png",
            subdomains: ["a", "b", "c", "d"],
        })
    );

    // OSM暗色系地图
    const nightLayer = _viewer.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
            url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
            subdomains: ["a", "b", "c", "d"],
        })
    );
    // 启用光照
    _viewer.scene.globe.enableLighting = true;
    _viewer.clock.shouldAnimate = true;
    _viewer.clock.multiplier = 5000;
    nightLayer.dayAlpha = 0.0;
}
</script>

<template>
    <div id="map"></div>
</template>

<style scoped lang="less">
#map {
    width: 100%;
    height: 100%;
}
</style>
