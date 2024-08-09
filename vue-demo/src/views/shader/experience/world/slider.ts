import * as kokomi from "@/three";
import vertShader from "./vert.glsl";
import fragShader from "./frag.glsl";

export default class Slider extends kokomi.Component {
    ig: kokomi.InfiniteGallery;
    ws: kokomi.WheelScroller;
    dd: kokomi.DragDetecter;
    params = {
        uDistortX: {
            value: 1,
        },
        uDistortZ: {
            value: 1,
        },
    };

    constructor(base: kokomi.Base) {
        super(base);

        const debug = this.base.debug;
        if (debug.active) {
            const debugFolder = debug.ui.addFolder("图册");
            debugFolder
                .add(this.params.uDistortX, "value")
                .min(0)
                .max(10)
                .step(0.01)
                .name("X轴扭曲");
            debugFolder
                .add(this.params.uDistortZ, "value")
                .min(0)
                .max(10)
                .step(0.01)
                .name("Z轴扭曲");
        }

        const list = document.querySelectorAll(".gallery-item");
        this.ig = new kokomi.InfiniteGallery(this.base, {
            elList: Array.from(list) as HTMLImageElement[],
            direction: "horizontal",
            gap: 128,
            vertexShader: vertShader,
            fragmentShader: fragShader,
            uniforms: {
                uVelocity: {
                    value: 0,
                },
                uOpacity: {
                    value: 1,
                },
                uProgress: {
                    value: 0,
                },
                ...this.params,
            },
            materialParams: {
                transparent: true,
            },
        });
        this.ws = new kokomi.WheelScroller();
        this.ws.listenForScroll();
        this.dd = new kokomi.DragDetecter(this.base);
        this.dd.detectDrag();
        this.dd.on("drag", (delta: any) => {
            this.ws.scroll.target -= delta[this.ig.dimensionType] * 2;
        });
    }

    async addExisting() {
        this.ig.addExisting();
        await this.ig.checkImagesLoaded();
    }

    update() {
        this.ws.syncScroll();
        const { current, delta } = this.ws.scroll;
        this.ig.sync(current);

        this.ig.iterate((maku: any) => {
            maku.mesh.material.uniforms.uVelocity.value = delta;

            maku.mesh.material.uniforms.uDistortX.value =
                this.params.uDistortX.value;
            maku.mesh.material.uniforms.uDistortZ.value =
                this.params.uDistortZ.value;
        });
    }
}
