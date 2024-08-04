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
    const lon = Cesium.Math.toDegrees(cartographic.longitude);
    const alt = cartographic.height;
    return {
        lon,
        lat,
        alt,
    };
}

/**
 * 将屏幕位置转换为相机位置信息
 *
 * @param viewer Cesium Viewer对象
 * @param position 屏幕上的二维位置
 * @returns 包含经纬度、高度、相机高度和相机方向的对象
 */
export function screenPositionToCameraPosition(
    viewer: Cesium.Viewer,
    position: Cesium.Cartesian2
) {
    const scene = viewer.scene;
    const ellipsoid = scene.globe.ellipsoid;
    // 笛卡尔坐标
    const cartesian = scene.pickPosition(position);
    if (cartesian) {
        const cartographic = ellipsoid.cartesianToCartographic(cartesian);
        const lon = Cesium.Math.toDegrees(cartographic.longitude);
        const lat = Cesium.Math.toDegrees(cartographic.latitude);
        // 地理高度
        const height = cartographic.height + 1;
        // 相机高度
        const cameraHeight = viewer.camera.positionCartographic.height;
        // 方向 (围绕Z轴旋转)
        const heading = Cesium.Math.toDegrees(viewer.camera.heading);
        // 倾斜角度 (围绕Y轴旋转)
        const pitch = Cesium.Math.toDegrees(viewer.camera.pitch);
        // 围绕X轴旋转
        const roll = Cesium.Math.toDegrees(viewer.camera.roll);
        return {
            longitude: lon,
            latitude: lat,
            height: height,
            cameraHeight: cameraHeight,
            orientation: {
                heading,
                pitch,
                roll,
            },
        };
    }
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
    // 获取瓦片中心点坐标
    const cartographic = Cesium.Cartographic.fromCartesian(
        boundingSphere.center
    );
    const surface = Cesium.Cartesian3.fromRadians(
        cartographic.longitude,
        cartographic.latitude,
        0.0
    );
    // 确定瓦片中心点移动前后的笛卡尔坐标（经纬度不变，只有高度值改变）
    const offset = Cesium.Cartesian3.fromRadians(
        cartographic.longitude,
        cartographic.latitude,
        height
    );
    // 计算偏移量
    const translation = Cesium.Cartesian3.subtract(
        offset,
        surface,
        new Cesium.Cartesian3()
    );
    // 建立转换矩阵
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
    // 旋转、平移矩阵相乘
    Cesium.Matrix4.multiply(m, rotationX, m);
    Cesium.Matrix4.multiply(m, rotationY, m);
    Cesium.Matrix4.multiply(m, rotationZ, m);
    // 赋值给tileset
    // @ts-ignore
    tilesets._root.transform = m;
}

/**
 * 将DataURL转换为Blob对象
 *
 * @param dataurl DataURL字符串
 * @returns 转换后的Blob对象
 */
export function dataURLtoBlob(dataurl: string) {
    let arr = dataurl.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
        type: mime,
    });
}

/**
 * 将Cesium Viewer的渲染结果保存为图片
 *
 * @param viewer Cesium Viewer对象
 * @param name string 图片名称，默认为scene.png
 */
export function saveToImage(viewer: Cesium.Viewer, name: string = "scene.png") {
    // 不写会导出为黑图
    viewer.render();

    const canvas = viewer.scene.canvas;
    const image = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

    const link = document.createElement("a");
    const blob = dataURLtoBlob(image);
    const objurl = URL.createObjectURL(blob);
    link.download = name;
    link.href = objurl;
    link.click();
}

/**
 * 获取Cesium Viewer的中心位置
 *
 * @param viewer Cesium Viewer对象
 * @returns 返回经纬度对象，包含lon（经度）和lat（纬度）属性
 */
export function getCenterPosition(viewer: Cesium.Viewer) {
    const center = viewer.camera.pickEllipsoid(
        new Cesium.Cartesian2(
            viewer.canvas.clientWidth / 2,
            viewer.canvas.clientHeight / 2
        )
    );
    const curPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(center);
    const lon = (curPosition.longitude * 180) / Math.PI;
    const lat = (curPosition.latitude * 180) / Math.PI;
    return { lon, lat };
}

/**
 * 获取Cesium Viewer当前地图瓦片的级别
 *
 * @param viewer Cesium Viewer实例
 * @returns 当前地图瓦片的级别集合
 */
export function tileLevel(viewer: Cesium.Viewer) {
    const tiles = new Set();
    // @ts-ignore
    const tilesToRender = viewer.scene.globe._surface._tilesToRender;
    if (Cesium.defined(tilesToRender)) {
        for (let i = 0; i < tilesToRender.length; i++) {
            tiles.add(tilesToRender[i].level);
        }
        console.log("当前地图瓦片级别为:");
        console.log(tiles);
    }
    return tiles;
}

/**
 * 获取相机位置信息
 *
 * @param viewer Cesium Viewer实例
 * @returns 包含相机位置信息的对象，包括经度、纬度、高度和相机姿态信息
 */
export function getCameraPosition(viewer: Cesium.Viewer) {
    // 获取 相机姿态信息
    const head = viewer.scene.camera.heading;
    const pitch = viewer.scene.camera.pitch;
    const roll = viewer.scene.camera.roll;
    const info = { head: head, pitch: pitch, roll: roll };
    // 获取位置 wgs84的地心坐标系，x,y坐标值以弧度来表示
    const position = viewer.scene.camera.positionCartographic;
    // 弧度转经纬度
    const longitude = Cesium.Math.toDegrees(position.longitude);
    const latitude = Cesium.Math.toDegrees(position.latitude);
    const height = position.height;
    return { lon: longitude, lat: latitude, h: height, mat: info };
}

/**
 * 获取Cesium地图的缩放级别
 *
 * @param viewer Cesium视图实例
 * @returns 返回地图的缩放级别
 */
export function getMapScale(viewer: Cesium.Viewer) {
    const geodesic = new Cesium.EllipsoidGeodesic();
    const scene = viewer.scene;
    const width = scene.canvas.clientWidth;
    const height = scene.canvas.clientHeight;
    const left = scene.camera.getPickRay(new Cesium.Cartesian2(0, height / 2));
    const right = scene.camera.getPickRay(
        new Cesium.Cartesian2(width, height / 2)
    );
    const globe = scene.globe;
    const leftPosition = globe.pick(left, scene);
    const rightPosition = globe.pick(right, scene);
    if (!leftPosition) return;
    const leftCartographic =
        globe.ellipsoid.cartesianToCartographic(leftPosition);
    const rightCartographic =
        globe.ellipsoid.cartesianToCartographic(rightPosition);
    geodesic.setEndPoints(leftCartographic, rightCartographic);
    //根据屏幕左侧到右侧的距离测算resolution
    const pixelDistance = geodesic.surfaceDistance;
    const resolution = pixelDistance / width;
    const scale = (resolution * 96) / 0.0254;
    return scale;
}
