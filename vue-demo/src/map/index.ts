import { Viewer } from "cesium";
import { getMapInstance } from "./instance";
import { WallControl } from "./controls/WallControl";
import { BlockSourcesControl } from "./controls/BlockSourcesControl";
import { BlockControl } from "./controls/BlockControl";

export default class CesiumMap {
    viewer: Viewer;
    wallControl: WallControl;
    blockSourcesControl: BlockSourcesControl;
    blockControl: BlockControl;
    tick: () => void;

    constructor() {
        this.viewer = getMapInstance();
        // 测试用
        window.CesiumMap = this;

        this.tick = this._tick.bind(this);

        this.wallControl = new WallControl();
        this.blockSourcesControl = new BlockSourcesControl();
        this.blockControl = new BlockControl();
        this.viewer.scene.preRender.addEventListener(this.tick);
    }

    /**
     * 将map elem挂载到某个元素下
     * @param elem
     */
    appendMapElementTo(elem: HTMLElement) {
        elem.appendChild(this.viewer.container);
        // @ts-ignore
        this.viewer.container.style.position = "relative";
        // @ts-ignore
        this.viewer.container.style.visibility = "visible";
    }

    /**
     * 循环tick
     */
    _tick() {
        this.wallControl.tick();
    }

    destroy() {
        this.viewer.scene.preRender.removeEventListener(this.tick);
        this.wallControl.destroy();
        this.wallControl = null;
        this.blockSourcesControl.destroy();
        this.blockSourcesControl = null;
        this.blockControl.destroy();
        this.blockControl = null;
    }
}
