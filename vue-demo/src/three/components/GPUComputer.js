import * as THREE from "three";
import { Component } from "./component";
import { GPUComputationRenderer, } from "three/examples/jsm/misc/GPUComputationRenderer.js";
import { UniformInjector } from "./uniformInjector";
/**
 * An encapsuled class for `GPUComputationRenderer`
 */
class GPUComputer extends Component {
    gpu;
    uj;
    constructor(base, config = {}) {
        super(base);
        const { width = 128, height = 128 } = config;
        // gpu
        const gpu = new GPUComputationRenderer(width, height, base.renderer);
        this.gpu = gpu;
        const uj = new UniformInjector(this.base);
        this.uj = uj;
    }
    createTexture() {
        return this.gpu.createTexture();
    }
    createVariable(name, computeShader, texture, uniforms) {
        const variable = this.gpu.addVariable(name, computeShader, texture);
        variable.wrapS = THREE.RepeatWrapping;
        variable.wrapT = THREE.RepeatWrapping;
        variable.material.uniforms = {
            ...variable.material.uniforms,
            ...this.uj.shadertoyUniforms,
            ...uniforms,
        };
        return variable;
    }
    setVariableDependencies(variable, dependencies) {
        this.gpu.setVariableDependencies(variable, dependencies);
    }
    init() {
        this.gpu.init();
    }
    update(time) {
        const variables = this.gpu.variables;
        if (variables) {
            variables.forEach((variable) => {
                this.uj.injectShadertoyUniforms(variable.material.uniforms);
            });
        }
        this.gpu.compute();
    }
    getVariableRt(variable) {
        return this.gpu.getCurrentRenderTarget(variable).texture;
    }
}
export { GPUComputer };
