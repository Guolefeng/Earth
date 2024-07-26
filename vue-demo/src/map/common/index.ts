import { Viewer, Cartesian3, Math } from "cesium";

/**
 * 将Cartesian3坐标转换为经纬度和高度（以度为单位）
 *
 * @param viewer Cesium的Viewer对象，用于获取椭球体
 * @param position Cesium的Cartesian3对象，表示空间中的位置
 * @returns 包含经度、纬度和高度的对象，经纬度以度为单位
 */
export function toCartographicDegrees(viewer: Viewer, position: Cartesian3) {
    const ellipsoid = viewer.scene.globe.ellipsoid;
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

/**
 * 将Cartesian3坐标转换为Canvas坐标。
 *
 * @param viewer Cesium的Viewer对象，用于获取Cesium的场景和视图状态。
 * @param position Cesium的Cartesian3对象，表示需要转换的坐标。
 * @returns 转换后的Canvas坐标，类型为Cesium.Cartesian2。
 *
 * 注意：此函数使用了Cesium的viewer.scene.cartesianToCanvasCoordinates方法来转换坐标，
 * 它将Cesium中的三维世界坐标转换为Canvas的二维屏幕坐标。
 * 如果需要转换为窗口坐标（如HTML元素中的像素坐标），
 * 可以考虑使用Cesium的SceneTransforms.wgs84ToWindowCoordinates方法，
 * 但这里使用的是Cartesian3到Canvas坐标的转换。
 */
export function cartesian3toCoordinates(viewer: Viewer, position: Cartesian3) {
    return viewer.scene.cartesianToCanvasCoordinates(position);
    // return SceneTransforms.wgs84ToWindowCoordinates(
    //     viewer.scene,
    //     position
    // );
}
