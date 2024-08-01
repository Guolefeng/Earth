import { Viewer } from "cesium";
import { getMapInstance } from "./instance";
import { IX } from "./ix";
import { WallControl } from "./controls/WallControl";
import { BlockSourcesControl } from "./controls/PolygonSourcesControl";
import { PolygonControl } from "./controls/PolygonControl";
import { EllipseControl } from "./controls/EllipseControl";
import { BillboardControl } from "./controls/BillboardControl";
import { EllipsoidControl } from "./controls/EllipsoidControl";
import { TilesControl } from "./controls/TilesControl";
import { RoamControl } from "./controls/RoamControl";

export default class CesiumMap {
    viewer: Viewer;
    ix: IX;
    wallControl: WallControl;
    blockSourcesControl: BlockSourcesControl;
    polygonControl: PolygonControl;
    ellipseControl: EllipseControl;
    billboardControl: BillboardControl;
    ellipsoidControl: EllipsoidControl;
    tilesControl: TilesControl;
    roamControl: RoamControl;
    tick: () => void;

    constructor() {
        this.viewer = getMapInstance();

        window.CesiumMap = this;

        this.tick = this._tick.bind(this);

        this.ix = new IX();
        this.wallControl = new WallControl();
        this.blockSourcesControl = new BlockSourcesControl();
        this.polygonControl = new PolygonControl();
        this.ellipseControl = new EllipseControl();
        this.billboardControl = new BillboardControl();
        this.ellipsoidControl = new EllipsoidControl();
        this.tilesControl = new TilesControl();
        this.roamControl = new RoamControl();

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
        this.ellipseControl.tick();
        this.polygonControl.tick();
    }

    destroy() {
        this.viewer.scene.preRender.removeEventListener(this.tick);
        this.ix.destory();
        this.wallControl.destroy();
        this.wallControl = null;
        this.blockSourcesControl.destroy();
        this.blockSourcesControl = null;
        this.polygonControl.destroy();
        this.polygonControl = null;
        this.ellipseControl.destroy();
        this.ellipseControl = null;
        this.billboardControl.destroy();
        this.billboardControl = null;
        this.ellipsoidControl.destroy();
        this.ellipsoidControl = null;
        this.roamControl.destroy();
        this.roamControl = null;
    }
}
