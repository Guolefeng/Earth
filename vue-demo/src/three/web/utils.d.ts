import * as THREE from "three";
export type HTMLAssetElement = HTMLImageElement | HTMLVideoElement;
declare const loadTextureFromImg: (el: HTMLImageElement | null) => THREE.Texture | null;
declare const loadCubemapFromImgs: (el: HTMLImageElement | null, els: HTMLImageElement[]) => THREE.CubeTexture | null;
declare const getUniformFromAsset: (el: HTMLAssetElement | null, name: string, parent?: HTMLElement | null) => {
    [x: string]: {
        value: THREE.Texture;
    } | {
        value: THREE.Vector2;
    };
};
export { loadTextureFromImg, loadCubemapFromImgs, getUniformFromAsset };
