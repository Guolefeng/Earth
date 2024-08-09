import * as THREE from "three";
import {
    DRACOLoader,
    EXRLoader,
    // FBXLoader,
    FontLoader,
    GLTFLoader,
    KTX2Loader,
    OBJLoader,
    RGBELoader,
    SVGLoader,
    MeshoptDecoder,
} from "three-stdlib";
import { FBXLoader } from "../lib";
import { Component } from "./component";
import { loadVideoTexture } from "../utils";
/**
 * This class can handle the preloads of assets (gltfModel, texture, cubeTexture, font, etc).
 * You can just write a simple js file to config your assets without caring about various loaders.
 */
class AssetManager extends Component {
    config;
    resourceList;
    items;
    toLoad;
    loaded;
    loaders;
    constructor(base, list, config = {}) {
        super(base);
        const {
            useDracoLoader = false,
            useMeshoptDecoder = false,
            dracoDecoderPath = "https://www.gstatic.com/draco/versioned/decoders/1.4.3/",
            ktx2TranscoderPath = "https://unpkg.com/three/examples/jsm/libs/basis/",
        } = config;
        this.config = {
            useDracoLoader,
            useMeshoptDecoder,
            dracoDecoderPath,
            ktx2TranscoderPath,
        };
        this.resourceList = list;
        this.items = {};
        this.toLoad = list.length;
        this.loaded = 0;
        this.loaders = {};
        this.setLoaders();
        if (useDracoLoader) {
            this.setDracoLoader();
        }
        if (useMeshoptDecoder) {
            this.setMeshoptDecoder();
        }
        this.setKTX2Loader();
        this.startLoading();
    }
    // 设置加载器
    setLoaders() {
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.textureLoader = new THREE.TextureLoader();
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
        this.loaders.fontLoader = new FontLoader();
        // @ts-ignore
        this.loaders.fbxLoader = new FBXLoader();
        this.loaders.audioLoader = new THREE.AudioLoader();
        this.loaders.objLoader = new OBJLoader();
        this.loaders.hdrTextureLoader = new RGBELoader();
        this.loaders.svgLoader = new SVGLoader();
        this.loaders.exrLoader = new EXRLoader();
        this.loaders.ktx2Loader = new KTX2Loader();
    }
    // 设置draco加载器
    setDracoLoader() {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath(this.config.dracoDecoderPath);
        this.loaders.gltfLoader?.setDRACOLoader(dracoLoader);
    }
    // 设置meshopt解码器
    setMeshoptDecoder() {
        const meshoptDecoder = MeshoptDecoder();
        this.loaders.gltfLoader?.setMeshoptDecoder(meshoptDecoder);
    }
    // 设置ktx2转码器
    setKTX2Loader() {
        this.loaders.ktx2Loader
            ?.setTranscoderPath(this.config.ktx2TranscoderPath)
            ?.detectSupport(this.base.renderer);
        if (this.loaders.ktx2Loader) {
            this.loaders.gltfLoader?.setKTX2Loader(this.loaders.ktx2Loader);
        }
    }
    // 开始加载
    startLoading() {
        for (const resource of this.resourceList) {
            if (resource.type === "gltfModel") {
                this.loaders.gltfLoader?.load(resource.path, (file) => {
                    this.resourceLoaded(resource, file);
                });
            } else if (resource.type === "texture") {
                this.loaders.textureLoader?.load(resource.path, (file) => {
                    this.resourceLoaded(resource, file);
                });
            } else if (resource.type === "cubeTexture") {
                this.loaders.cubeTextureLoader?.load(resource.path, (file) => {
                    this.resourceLoaded(resource, file);
                });
            } else if (resource.type === "font") {
                this.loaders.fontLoader?.load(resource.path, (file) => {
                    this.resourceLoaded(resource, file);
                });
            } else if (resource.type === "fbxModel") {
                // @ts-ignore
                this.loaders.fbxLoader?.load(resource.path, (file) => {
                    this.resourceLoaded(resource, file);
                });
            } else if (resource.type === "audio") {
                this.loaders.audioLoader?.load(resource.path, (file) => {
                    this.resourceLoaded(resource, file);
                });
            } else if (resource.type === "objModel") {
                this.loaders.objLoader?.load(resource.path, (file) => {
                    this.resourceLoaded(resource, file);
                });
            } else if (resource.type === "hdrTexture") {
                this.loaders.hdrTextureLoader?.load(resource.path, (file) => {
                    this.resourceLoaded(resource, file);
                });
            } else if (resource.type === "svg") {
                this.loaders.svgLoader?.load(resource.path, (file) => {
                    this.resourceLoaded(resource, file);
                });
            } else if (resource.type === "exrTexture") {
                this.loaders.exrLoader?.load(resource.path, (file) => {
                    this.resourceLoaded(resource, file);
                });
            } else if (resource.type === "video") {
                loadVideoTexture(resource.path).then((file) => {
                    this.resourceLoaded(resource, file);
                });
            } else if (resource.type === "ktx2Texture") {
                this.loaders.ktx2Loader?.load(resource.path, (file) => {
                    this.resourceLoaded(resource, file);
                });
            }
        }
    }
    // 加载完单个素材
    resourceLoaded(resource, file) {
        this.items[resource.name] = file;
        this.loaded += 1;
        if (this.isLoaded) {
            this.emit("ready");
        }
    }
    // 加载进度
    get loadProgress() {
        return this.loaded / this.toLoad;
    }
    // 是否加载完毕
    get isLoaded() {
        return this.loaded === this.toLoad;
    }
}
export { AssetManager };