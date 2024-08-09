import * as kokomi from "@/three";
import * as THREE from "three";
import Debug from "./debug";
import resources from "./resources";
import vertShader from "./vert.glsl";
import fragShader from "./frag.glsl";

interface IOptions {
    onReady?: () => void;
}

// 扭曲的球体
export default class DistortSphere extends kokomi.Base {
    options: IOptions;
    debug: Debug;
    am: kokomi.AssetManager;
    uj: kokomi.UniformInjector;
    material: THREE.ShaderMaterial;

    constructor(id: string, options?: IOptions) {
        super(id);
        this.options = options || {};

        this.debug = new Debug({
            id,
            show: true,
        });

        this.am = new kokomi.AssetManager(this, resources);
        this.camera.position.set(0, 0, 5);
        new kokomi.OrbitControls(this);

        this.addWorld();
        this.update((time: number) => this.loop(time));
    }

    addWorld() {
        const { onReady } = this.options;

        this.am.on("ready", () => {
            const skybox = this.am.items["skybox"];
            skybox.mapping = THREE.EquirectangularReflectionMapping;
            this.scene.background = skybox;

            this.addObject();
            onReady?.();
        });
    }

    addObject() {
        const params = {
            uDistort: {
                value: 1,
            },
        };

        const geometry = new THREE.SphereGeometry(2, 64, 64);
        const material = new THREE.ShaderMaterial({
            vertexShader: vertShader,
            fragmentShader: fragShader,
        });
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);

        this.uj = new kokomi.UniformInjector(this);
        material.uniforms = {
            ...material.uniforms,
            ...this.uj.shadertoyUniforms,
            ...params,
        };

        this.material = material;

        if (this.debug.active) {
            const debugFolder = this.debug.ui.addFolder("扭曲球体");
            debugFolder
                .add(params.uDistort, "value")
                .min(0)
                .max(10)
                .step(0.01)
                .name("扭曲程度");
        }
    }

    loop(time: number) {
        this.uj?.injectShadertoyUniforms(this.material?.uniforms);
    }

    dispose() {
        this.destroy();
        this.debug.destory();
    }
}
