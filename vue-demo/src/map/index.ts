import { Viewer } from "cesium";
import { getMapInstance } from "./instance";
import { WallControl } from "./controls/WallControl";
import { BlockSourcesControl } from "./controls/BlockSourcesControl";
import { BlockControl } from "./controls/BlockControl";
import { RippleControl } from "./controls/RippleControl";
import { BillboardControl } from "./controls/BillboardControl";
import { EllipsoidControl } from "./controls/EllipsoidControl";

export default class CesiumMap {
    viewer: Viewer;
    wallControl: WallControl;
    blockSourcesControl: BlockSourcesControl;
    blockControl: BlockControl;
    rippleControl: RippleControl;
    billboardControl: BillboardControl;
    ellipsoidControl: EllipsoidControl;
    tick: () => void;

    constructor() {
        this.viewer = getMapInstance();

        window.CesiumMap = this;

        this.tick = this._tick.bind(this);

        this.wallControl = new WallControl();
        this.blockSourcesControl = new BlockSourcesControl();
        this.blockControl = new BlockControl();
        this.rippleControl = new RippleControl();
        this.billboardControl = new BillboardControl();
        this.ellipsoidControl = new EllipsoidControl();

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
        this.rippleControl.tick();
    }

    destroy() {
        this.viewer.scene.preRender.removeEventListener(this.tick);
        this.wallControl.destroy();
        this.wallControl = null;
        this.blockSourcesControl.destroy();
        this.blockSourcesControl = null;
        this.blockControl.destroy();
        this.blockControl = null;
        this.rippleControl.destroy();
        this.rippleControl = null;
        this.billboardControl.destroy();
        this.billboardControl = null;
        this.ellipsoidControl.destroy();
        this.ellipsoidControl = null;
    }
}
