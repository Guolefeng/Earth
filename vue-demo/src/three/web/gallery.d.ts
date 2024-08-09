import * as THREE from "three";
import { Maku, MakuGroup, Scroller } from "maku.js";
import { HTMLIVCElement, MakuConfig } from "maku.js/types/types";
import type { Base } from "../base/base";
import { Component } from "../components/component";
import { UniformInjector } from "../components/uniformInjector";
import { AllMaterialParams } from "../lib/THREE-CustomShaderMaterial";
export interface GalleryConfig {
    elList: HTMLIVCElement[];
    vertexShader: string;
    fragmentShader: string;
    uniforms: {
        [uniform: string]: THREE.IUniform<any>;
    };
    makuConfig: MakuConfig;
    isScrollPositionSync: boolean;
    scroller: Scroller;
    materialParams: AllMaterialParams;
    isRectAutoRefreshed: boolean;
}
/**
 * It's just an encapsuled class for [maku.js](https://github.com/alphardex/maku.js), which is a powerful bridge between HTML and WebGL.
 *
 * Demo: https://kokomi-playground.vercel.app/entries/#imageMouseWave
 */
declare class Gallery extends Component {
    elList: HTMLIVCElement[];
    vertexShader: string;
    fragmentShader: string;
    uniforms: {
        [uniform: string]: THREE.IUniform<any>;
    };
    makuConfig: MakuConfig;
    isScrollPositionSync: boolean;
    makuMaterial: THREE.ShaderMaterial | null;
    makuGroup: MakuGroup | null;
    scroller: Scroller | null;
    uniformInjector: UniformInjector;
    materialParams: AllMaterialParams;
    useSelfScroller: boolean;
    isRectAutoRefreshed: boolean;
    constructor(base: Base, config?: Partial<GalleryConfig>);
    addExisting(): Promise<void>;
    update(time: number): void;
    checkImagesLoaded(): Promise<unknown>;
    iterate(cb: (maku: Maku, i: number) => void): void;
}
export interface HorizontalGalleryConfig extends GalleryConfig {
    direction: "horizontal" | "vertical";
    gap: number;
    appendCount: number;
}
/**
 * An infinite gallery.
 *
 * Demo: https://kokomi-playground.vercel.app/entries/#leanSpeedGallery
 */
declare class InfiniteGallery extends Gallery {
    direction: "horizontal" | "vertical";
    gap: number;
    appendCount: number;
    constructor(base: Base, config?: Partial<HorizontalGalleryConfig>);
    get lengthType(): "clientWidth" | "clientHeight";
    get dimensionType(): "x" | "y";
    getImgLength(): number;
    getItemLength(): number;
    getTotalCount(): number;
    sync(current?: number): void;
    getSnapIndex(target?: number): number;
    snap(target?: number): number;
    getActiveIndex(target?: number): number;
}
export { Gallery, InfiniteGallery };
