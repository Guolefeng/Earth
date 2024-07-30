import * as Cesium from "cesium";

/**
 * 将Cartesian3坐标转换为经纬度和高度（以度为单位）
 *
 * @param viewer Cesium的Viewer对象，用于获取椭球体
 * @param position Cesium的Cartesian3对象，表示空间中的位置
 * @returns 包含经度、纬度和高度的对象，经纬度以度为单位
 */
export function toCartographicDegrees(
    viewer: Cesium.Viewer,
    position: Cesium.Cartesian3
) {
    const ellipsoid = viewer.scene.globe.ellipsoid;
    const cartographic = ellipsoid.cartesianToCartographic(position);
    const lat = Cesium.Math.toDegrees(cartographic.latitude);
    const lng = Cesium.Math.toDegrees(cartographic.longitude);
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
export function cartesian3toCoordinates(
    viewer: Cesium.Viewer,
    position: Cesium.Cartesian3
) {
    return viewer.scene.cartesianToCanvasCoordinates(position);
    // return SceneTransforms.wgs84ToWindowCoordinates(
    //     viewer.scene,
    //     position
    // );
}

/**
 * 设置Cesium3DTileset的高度
 *
 * @param tilesets Cesium3DTileset对象
 * @param height 高度值，默认为0
 */
export function set3dtilesHeight(
    tilesets: Cesium.Cesium3DTileset,
    height: number = 0
) {
    const boundingSphere = tilesets.boundingSphere;
    const cartographic = Cesium.Cartographic.fromCartesian(
        boundingSphere.center
    );
    const surface = Cesium.Cartesian3.fromRadians(
        cartographic.longitude,
        cartographic.latitude,
        0.0
    );
    const offset = Cesium.Cartesian3.fromRadians(
        cartographic.longitude,
        cartographic.latitude,
        height
    );
    const translation = Cesium.Cartesian3.subtract(
        offset,
        surface,
        new Cesium.Cartesian3()
    );
    tilesets.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
}

/**
 * 更新Cesium 3D Tileset的矩阵变换
 *
 * @param tilesets Cesium 3D Tileset对象
 * @param params 变换参数对象，包含tx、ty、tz、rx、ry、rz等属性
 * @param params.tx 平移 模型中心X轴坐标（经度，单位：十进制度），默认为0
 * @param params.ty 平移 模型中心Y轴坐标（纬度，单位：十进制度），默认为0
 * @param params.tz 平移 模型中心Z轴坐标（高程，单位：米），默认为0
 * @param params.rx X轴（经度）方向旋转角度（单位：度），默认为0
 * @param params.ry Y轴（纬度）方向旋转角度（单位：度），默认为0
 * @param params.rz Z轴（高程）方向旋转角度（单位：度），默认为0
 */
export function update3dtilesMaxtrix(
    tilesets: Cesium.Cesium3DTileset,
    params: { [key: string]: number } = {
        tx: 0,
        ty: 0,
        tz: 0,
        rx: 0,
        ry: 0,
        rz: 0,
    }
) {
    // 旋转
    const mx = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(params.rx));
    const my = Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(params.ry));
    const mz = Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(params.rz));
    const rotationX = Cesium.Matrix4.fromRotationTranslation(mx);
    const rotationY = Cesium.Matrix4.fromRotationTranslation(my);
    const rotationZ = Cesium.Matrix4.fromRotationTranslation(mz);
    // 平移
    const position = Cesium.Cartesian3.fromDegrees(
        params.tx,
        params.ty,
        params.tz
    );
    const m = Cesium.Transforms.eastNorthUpToFixedFrame(position);
    //旋转、平移矩阵相乘
    Cesium.Matrix4.multiply(m, rotationX, m);
    Cesium.Matrix4.multiply(m, rotationY, m);
    Cesium.Matrix4.multiply(m, rotationZ, m);
    //赋值给tileset
    // @ts-ignore
    tilesets._root.transform = m;
}
