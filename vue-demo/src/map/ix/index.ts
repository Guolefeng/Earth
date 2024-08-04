import * as Cesium from "cesium";
import { getMapInstance } from "../instance";
import {
    toCartographicDegrees,
    getCameraPosition,
    getMapScale,
    screenPositionToCameraPosition,
} from "../common";

// 高亮元素
const hightLighted: any = {
    feautre: undefined,
    originalColor: new Cesium.Color(),
};

export class IX {
    viewer: Cesium.Viewer;
    eventHandler: Cesium.ScreenSpaceEventHandler;
    removeCameraMoveStart: () => void;
    removeCameraMoveEnd: () => void;

    constructor() {
        this.viewer = getMapInstance();
        this.eventHandler = new Cesium.ScreenSpaceEventHandler(
            this.viewer.canvas
        );
    }

    listenMouseMove(cb: Function) {
        const { viewer, eventHandler } = this;
        eventHandler.setInputAction(
            (event: Cesium.ScreenSpaceEventHandler.MotionEvent) => {
                let position;
                if (event.endPosition) {
                    const ray = viewer.camera.getPickRay(event.endPosition);
                    const earthPosition = viewer.scene.globe.pick(
                        ray,
                        viewer.scene
                    );
                    if (earthPosition) {
                        position = toCartographicDegrees(viewer, earthPosition);
                    }
                }
                cb(position);
            },
            Cesium.ScreenSpaceEventType.MOUSE_MOVE
        );
    }

    listenLeftClick(cb: Function) {
        const { viewer, eventHandler } = this;
        eventHandler.setInputAction(
            (e: Cesium.ScreenSpaceEventHandler.PositionedEvent) => {
                const pick = viewer.scene.pick(e.position);
                const position = screenPositionToCameraPosition(
                    viewer,
                    e.position
                );
                cb(position, pick);

                // 清除之前的高亮元素
                if (Cesium.defined(hightLighted.feature)) {
                    hightLighted.feature.color = hightLighted.originalColor;
                    hightLighted.feature = undefined;
                }

                // 选择新要素
                if (!Cesium.defined(pick)) {
                    return;
                }

                // 存储选中要素的信息
                hightLighted.feature = pick;
                Cesium.Color.clone(pick.color, hightLighted.originalColor);
                // 高亮选中元素
                pick.color = Cesium.Color.YELLOW;
            },
            Cesium.ScreenSpaceEventType.LEFT_CLICK
        );
    }

    listenLeftDbClick(cb: Function) {
        const { viewer, eventHandler } = this;
        eventHandler.setInputAction(
            (e: Cesium.ScreenSpaceEventHandler.PositionedEvent) => {
                const pick = viewer.scene.pick(e.position);
                const position = screenPositionToCameraPosition(
                    viewer,
                    e.position
                );
                cb(position, pick);
            },
            Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
        );
    }

    listenRightClick(cb: Function) {
        const { viewer, eventHandler } = this;
        eventHandler.setInputAction(
            (e: Cesium.ScreenSpaceEventHandler.PositionedEvent) => {
                const pick = viewer.scene.pick(e.position);
                const position = screenPositionToCameraPosition(
                    viewer,
                    e.position
                );
                cb(position, pick);
            },
            Cesium.ScreenSpaceEventType.RIGHT_CLICK
        );
    }

    listenCameraMoveStart(cb: Function) {
        const { viewer } = this;
        this.removeCameraMoveStart = viewer.camera.moveStart.addEventListener(
            () => {
                const cameraInfo = getCameraPosition(viewer);
                const scale = getMapScale(viewer);
                cb(cameraInfo, scale, viewer);
            }
        );
    }

    listenCameraMoveEnd(cb: Function) {
        const { viewer } = this;
        this.removeCameraMoveEnd = viewer.camera.moveEnd.addEventListener(
            () => {
                const cameraInfo = getCameraPosition(viewer);
                const scale = getMapScale(viewer);
                cb(cameraInfo, scale, viewer);
            }
        );
    }

    destory() {
        this.eventHandler.removeInputAction(
            Cesium.ScreenSpaceEventType.MOUSE_MOVE
        );
        this.eventHandler.removeInputAction(
            Cesium.ScreenSpaceEventType.LEFT_CLICK
        );
        this.eventHandler.removeInputAction(
            Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
        );
        this.eventHandler.removeInputAction(
            Cesium.ScreenSpaceEventType.RIGHT_CLICK
        );
        this.removeCameraMoveStart?.();
        this.removeCameraMoveEnd?.();
        this.eventHandler = null;
    }
}
