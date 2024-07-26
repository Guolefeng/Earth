/**
 * @file cesium版IXSystem和SceneService共用的viewer实例
 */

import {
    Viewer,
    ScreenSpaceEventHandler,
    ScreenSpaceEventType,
    Math,
    Cartesian3,
    SceneTransforms,
} from "cesium";
import {
    loaclTerrainProviderPromise,
    localCiaImageryLayer,
    viewerOption,
} from "./viewerHelper";

let cesiumViewer: Viewer;

function initMapInstance() {
    if (cesiumViewer) {
        return;
    }

    const elem = document.createElement("div");
    elem.style.cssText = `position: absolute; width: 100%; height: 100%; visibility: hidden`;
    document.body.appendChild(elem);

    // init viewer
    loaclTerrainProviderPromise.then((res) => {
        cesiumViewer.terrainProvider = res;
    });
    cesiumViewer = new Viewer(elem, viewerOption);
    cesiumViewer.imageryLayers.add(localCiaImageryLayer);
    // 把地形检测关掉，会引起一些形变和不必要的穿透
    // cesiumViewer.scene.globe.depthTestAgainstTerrain = true;
    const cesiumScreenSpaceEventHandler = new ScreenSpaceEventHandler(
        cesiumViewer.canvas
    );
    cesiumScreenSpaceEventHandler.setInputAction(
        cesiumPickPositionEvent,
        ScreenSpaceEventType.MOUSE_MOVE
    );
    // cesiumViewer.camera.viewBoundingSphere(
    //     new BoundingSphere(Cartesian3.fromDegrees(114, 30), 10000)
    //   );
    cesiumViewer.scene.debugShowFramesPerSecond = true;
}

function cesiumPickPositionEvent(event: ScreenSpaceEventHandler.MotionEvent) {
    if (event.endPosition) {
        const ray: any = cesiumViewer.camera.getPickRay(event.endPosition);
        const earthPosition = cesiumViewer.scene.globe.pick(
            ray,
            cesiumViewer.scene
        );
        if (earthPosition) {
            // 换算经纬高
            const position = toCartographicDegrees(earthPosition);
            // console.log(position);
        }
    }
}

function toCartographicDegrees(position: Cartesian3) {
    const ellipsoid = cesiumViewer.scene.globe.ellipsoid;
    const cartographic = ellipsoid.cartesianToCartographic(position);
    const lat = Math.toDegrees(cartographic.latitude);
    const lng = Math.toDegrees(cartographic.longitude);
    const alt = cartographic.height;
    return {
        lat,
        lng,
        alt,
    };
}

export function Cartesian3toCoordinates(position: Cartesian3) {
    return cesiumViewer.scene.cartesianToCanvasCoordinates(position);
    // return SceneTransforms.wgs84ToWindowCoordinates(
    //     cesiumViewer.scene,
    //     position
    // );
}

/**
 * 获取地图实例，cesium下是Cesium.Viewer
 * @returns
 */
export function getMapInstance() {
    if (!cesiumViewer) {
        initMapInstance();
    }

    return cesiumViewer;
}
