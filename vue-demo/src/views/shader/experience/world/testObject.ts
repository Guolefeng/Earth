import * as kokomi from "kokomi.js";
import * as THREE from "three";

import testObjectVertShader from "../shader/testObject/vert.glsl";
import testObjectFragShader from "../shader/testObject/frag.glsl";

export default class TestObject extends kokomi.Component {
    mesh: THREE.Mesh;
    uj: kokomi.UniformInjector;
    material: THREE.ShaderMaterial;

    constructor(base: kokomi.Base) {
        super(base);

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
        };

        this.material = material;
    }

    addExisting() {
        this.container.add(this.mesh);
    }

    update() {
        this.uj.injectShadertoyUniforms(this.material.uniforms);
    }
}
