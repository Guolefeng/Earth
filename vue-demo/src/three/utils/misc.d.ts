import * as THREE from "three";
declare const enableSRGBColorSpace: (renderer: THREE.WebGLRenderer) => void;
declare const optimizeModelRender: (renderer: THREE.WebGLRenderer) => void;
declare const enableRealisticRender: (renderer: THREE.WebGLRenderer) => void;
declare const beautifyRender: (renderer: THREE.WebGLRenderer) => void;
declare const enableShadow: (renderer: THREE.WebGLRenderer) => void;
declare const getEnvmapFromHDRTexture: (renderer: THREE.WebGLRenderer, texture: THREE.Texture) => THREE.Texture;
declare const getEnvmapFromScene: (renderer: THREE.WebGLRenderer, scene: THREE.Scene) => THREE.Texture;
declare const getBaryCoord: (bufferGeometry: THREE.BufferGeometry) => void;
declare const sampleParticlesPositionFromMesh: (geometry: THREE.BufferGeometry, count?: number) => Float32Array;
declare const flatModel: (model: THREE.Object3D) => THREE.Object3D[];
declare const printModel: (modelParts: THREE.Object3D[], modelName?: string) => string;
declare const getViewport: (camera: THREE.Camera) => {
    width: number;
    height: number;
};
declare const getPositionCentroids: (geometry: THREE.BufferGeometry, attrName?: string, centroidName?: string) => Float32Array;
export interface CreatePolygonShapeConfig {
    scale: number;
}
declare const createPolygonShape: (points: THREE.Vector2[], config?: Partial<CreatePolygonShapeConfig>) => THREE.Shape;
declare const calcPerspectiveScreenSize: (targetZ: number | undefined, camera: THREE.PerspectiveCamera, aspect: number) => {
    width: number;
    height: number;
};
declare const downloadBlob: (blob: Blob, name: string) => void;
declare const getBound: (object: THREE.Object3D, precise?: boolean) => {
    boundingBox: THREE.Box3;
    center: THREE.Vector3;
    boundingSphere: THREE.Sphere;
    width: number;
    height: number;
    depth: number;
};
declare const getBoundsVertices: (bounds: THREE.Box3) => THREE.Vector3[];
declare const smoothNormal: (mesh: THREE.Mesh) => void;
declare const fixShapeGeometryUV: (mesh: THREE.Mesh) => void;
declare const saveString: (text: string, filename: string) => void;
declare const saveArrayBuffer: (buffer: ArrayBuffer, filename: string) => void;
declare const exportGLTF: (input: THREE.Object3D | THREE.Object3D[], { filename, trs, onlyVisible, binary, maxTextureSize, }?: {
    filename?: string | undefined;
    trs?: boolean | undefined;
    onlyVisible?: boolean | undefined;
    binary?: boolean | undefined;
    maxTextureSize?: number | undefined;
}) => void;
export { enableSRGBColorSpace, optimizeModelRender, enableRealisticRender, beautifyRender, enableShadow, getEnvmapFromHDRTexture, getEnvmapFromScene, getBaryCoord, sampleParticlesPositionFromMesh, flatModel, printModel, getViewport, getPositionCentroids, createPolygonShape, calcPerspectiveScreenSize, downloadBlob, getBound, getBoundsVertices, smoothNormal, fixShapeGeometryUV, saveString, saveArrayBuffer, exportGLTF, };
