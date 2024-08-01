import * as Cesium from "cesium";
import {
    // loaclTerrainProviderPromise,
    // localCiaImageryLayer,
    viewerOption,
} from "./config";
import { updateBaseMap } from "../effect";

let cesiumViewer: Cesium.Viewer;

function initMapInstance() {
    if (cesiumViewer) {
        return;
    }

    Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1NGFkNmRmNC05NmFkLTRmMDktYTFkMS0yNTE0NjNmOWEwYjMiLCJpZCI6NjA1MDAsImlhdCI6MTYyNTEyMDcyNn0.S14rriO-ggk-vKvkUa3wONp0zSAOEUBBx8tZJRrPzqY";

    const elem = document.createElement("div");
    elem.style.cssText = `position: absolute; width: 100%; height: 100%; visibility: hidden`;
    document.body.appendChild(elem);

    // init viewer
    // loaclTerrainProviderPromise.then((res) => {
    //     cesiumViewer.terrainProvider = res;
    // });
    cesiumViewer = new Cesium.Viewer(elem, viewerOption);
    // cesiumViewer.imageryLayers.add(localCiaImageryLayer);
    cesiumViewer.scene.globe.depthTestAgainstTerrain = true;
    // 去除版权信息
    // @ts-ignore
    // cesiumViewer.cesiumWidget.creditContainer.style.display = "none";
    // 增加太阳光照
    cesiumViewer.scene.globe.enableLighting = true;
    // 显示帧速
    cesiumViewer.scene.debugShowFramesPerSecond = true;
    // 修改默认相机位置
    cesiumViewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(116.39, 39.91, 20000000.0), // 俯瞰中国地图
        // destination: Cesium.Cartesian3.fromDegrees(116.39, 39.91, 15000.0), // 天安门广场
    });
    // 修改homeButton的默认返回位置
    cesiumViewer.homeButton.viewModel.command.beforeExecute.addEventListener(
        function (commandInfo: any) {
            cesiumViewer.camera.flyTo({
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
    // 关闭大气层显示
    // cesiumViewer.scene.skyAtmosphere.show = false;

    // 添加OSM bulidings
    // cesiumViewer.scene.primitives.add(Cesium.createOsmBuildingsAsync());
    // 添加瓦片坐标信息
    // cesiumViewer.imageryLayers.addImageryProvider(
    //     new Cesium.TileCoordinatesImageryProvider()
    // );
    // 修改地图
    updateBaseMap(cesiumViewer);
    // 测试用
    window.Cesium = Cesium;
    window.CesiumViewer = cesiumViewer;
}

/**
 * 获取地图实例。
 * 如果地图实例尚未初始化，则先初始化地图实例。
 *
 * @returns 返回地图实例。cesium下是Cesium.Viewer
 */
export function getMapInstance() {
    if (!cesiumViewer) {
        initMapInstance();
    }

    return cesiumViewer;
}
