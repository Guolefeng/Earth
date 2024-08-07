import { EffectComposer, RenderPass, ShaderPass } from "three-stdlib";
import { Component } from "../components/component";
import { UniformInjector } from "../components/uniformInjector";
const defaultVertexShader = /* glsl */ `
uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;

varying vec2 vUv;

void main(){
    vec3 p=position;
    gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);
    
    vUv=uv;
}
`;
const defaultFragmentShader = /* glsl */ `
uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;

uniform sampler2D tDiffuse;

varying vec2 vUv;

void main(){
    vec2 p=vUv;
    vec4 color=texture(tDiffuse,p);
    gl_FragColor=color;
}
`;
/**
 * With this, you can just provide your vertex and fragment shader to make a customized postprocessing effect.
 *
 * Demo: https://kokomi-playground.vercel.app/entries/#volumetricLight
 */
class CustomEffect extends Component {
    composer;
    customPass;
    uniformInjector;
    constructor(base, config = {}) {
        super(base);
        const { vertexShader = defaultVertexShader, fragmentShader = defaultFragmentShader, uniforms = {}, } = config;
        const composer = new EffectComposer(base.renderer);
        this.composer = composer;
        const renderPass = new RenderPass(base.scene, base.camera);
        composer.addPass(renderPass);
        const uniformInjector = new UniformInjector(base);
        this.uniformInjector = uniformInjector;
        const customPass = new ShaderPass({
            vertexShader,
            fragmentShader,
            uniforms: {
                ...{
                    tDiffuse: {
                        value: null,
                    },
                },
                ...uniformInjector.shadertoyUniforms,
                ...uniforms,
            },
        });
        this.customPass = customPass;
        customPass.renderToScreen = true;
        composer.addPass(customPass);
    }
    addExisting() {
        this.base.composer = this.composer;
    }
    update(time) {
        const uniforms = this.customPass.uniforms;
        this.uniformInjector.injectShadertoyUniforms(uniforms);
    }
}
export { CustomEffect };
