/**
 * 漫游控件
 * 相机位置：W：向前；S：向后；D：向右；A：向左；Q：升高；E：降低；
 * 相机姿态：↑：抬头；↓：低头；←：左转；→：右转；0：顺时针；.：逆时针
 * 缩放：+：放大，-：缩小；
 */
import * as Cesium from "cesium";
import { getMapInstance } from "../instance";

// 键盘事件映射
const keyMap: { [key: number]: string } = {
    // 相机位置
    87: "moveForward",
    83: "moveBackward",
    68: "moveRight",
    65: "moveLeft",
    81: "moveUp",
    69: "moveDown",
    // 相机姿态
    38: "lookUp",
    40: "lookDown",
    37: "lookLeft",
    39: "lookRight",
    96: "twistLeft",
    110: "twistRight",
    // 缩放
    107: "zoomIn",
    109: "zoomOut",
};

// 定义事件组
const flags: { [key: string]: boolean } = {
    // 相机位置
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    moveUp: false,
    moveDown: false,
    // 相机姿态
    lookUp: false,
    lookDown: false,
    lookLeft: false,
    lookRight: false,
    twistLeft: false,
    twistRight: false,
    // 缩放
    zoomIn: false,
    zoomOut: false,
};

export class RoamControl {
    viewer: Cesium.Viewer;
    removeTickListener: () => void;

    constructor() {
        this.viewer = getMapInstance();
    }

    start() {
        const { viewer } = this;
        // 添加键盘监听事件
        document.addEventListener("keydown", this.keyDown, false);
        document.addEventListener("keyup", this.keyUp, false);
        // 为每一帧添加监听事件
        this.removeTickListener = viewer.clock.onTick.addEventListener(() => {
            this.render(viewer);
        });
    }

    keyDown(event: any) {
        const flagName = keyMap[event.keyCode];
        if (typeof flagName !== "undefined") {
            flags[flagName] = true;
        }
    }

    keyUp(event: any) {
        let flagName = keyMap[event.keyCode];
        if (typeof flagName !== "undefined") {
            flags[flagName] = false;
        }
    }

    render(viewer: Cesium.Viewer) {
        const camera = viewer.camera;
        const ellipsoid = viewer.scene.globe.ellipsoid;
        const cameraHeight = ellipsoid.cartesianToCartographic(
            camera.position
        ).height;

        // 根据相机高度设置移动距离，比默认距离移动效果更好
        const moveRate = cameraHeight / 20.0;

        if (flags.moveForward) {
            camera.moveForward(moveRate);
        }
        if (flags.moveBackward) {
            camera.moveBackward(moveRate);
        }
        if (flags.moveLeft) {
            camera.moveLeft(moveRate);
        }
        if (flags.moveRight) {
            camera.moveRight(moveRate);
        }
        if (flags.moveUp) {
            camera.moveUp(moveRate);
        }
        if (flags.moveDown) {
            camera.moveDown(moveRate);
        }
        if (flags.lookUp) {
            camera.lookUp();
        }
        if (flags.lookDown) {
            camera.lookDown();
        }
        if (flags.lookLeft) {
            camera.lookLeft();
        }
        if (flags.lookRight) {
            camera.lookRight();
        }
        if (flags.twistLeft) {
            camera.twistLeft();
        }
        if (flags.twistRight) {
            camera.twistRight();
        }
        // 根据相机高度设置缩放参数
        if (flags.zoomIn) {
            camera.zoomIn(cameraHeight / 2);
        }
        if (flags.zoomOut) {
            camera.zoomOut(cameraHeight / 2);
        }
    }

    end() {
        document.removeEventListener("keydown", this.keyDown);
        document.removeEventListener("keyup", this.keyUp);
        this.removeTickListener?.();
    }

    destroy() {
        this.end();
    }
}
