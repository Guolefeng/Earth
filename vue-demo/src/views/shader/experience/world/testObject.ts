import * as THREE from "three";
import * as kokomi from "@/three";

import testObjectVertShader from "../shader/testObject/vert.glsl";
import testObjectFragShader from "../shader/testObject/frag.glsl";

export default class TestObject extends kokomi.Component {
    mesh: THREE.Mesh;
    uj: kokomi.UniformInjector;
    material: THREE.ShaderMaterial;

    constructor(base: kokomi.Base) {
        super(base);

        const params = {
            uDistort: {
                value: 1,
            },
        };

        const geometry = new THREE.SphereGeometry(2, 64, 64);
        // const material = new THREE.MeshBasicMaterial({
        //     color: "#ffffff",
        // });
        // const geometry = new THREE.PlaneGeometry(4, 4);
        const material = new THREE.ShaderMaterial({
            vertexShader: testObjectVertShader,
            fragmentShader: testObjectFragShader,
        });
        this.mesh = new THREE.Mesh(geometry, material);

        this.uj = new kokomi.UniformInjector(this.base);
        material.uniforms = {
            ...material.uniforms,
            ...this.uj.shadertoyUniforms,
            ...params,
        };

        this.material = material;

        // @ts-ignore
        const debug = this.base.debug;
        if (debug.active) {
            const debugFolder = debug.ui.addFolder("testObject");
            debugFolder
                .add(params.uDistort, "value")
                .min(0)
                .max(10)
                .step(0.01)
                .name("distort");
        }
    }

    addExisting() {
        this.container.add(this.mesh);
    }

    update() {
        this.uj.injectShadertoyUniforms(this.material.uniforms);
    }
}
