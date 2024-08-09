import * as THREE from "three";
import { Component } from "../components/component";
import { HorizontalBlurShader, VerticalBlurShader } from "three-stdlib";
/**
 * Credit: https://github.com/mrdoob/three.js/blob/master/examples/webgl_shadow_contact.html
 */
class ContactShadows extends Component {
    frames;
    blur;
    smooth;
    shadowCamera;
    renderTarget;
    renderTargetBlur;
    blurPlane;
    depthMaterial;
    horizontalBlurMaterial;
    verticalBlurMaterial;
    count;
    group;
    mesh;
    constructor(base, config = {}) {
        super(base);
        let { scale = 10, frames = Infinity, opacity = 1, width = 1, height = 1, blur = 1, far = 10, resolution = 512, smooth = true, color = "#000000", depthWrite = false, } = config;
        this.frames = frames;
        this.blur = blur;
        this.smooth = smooth;
        width = width * (Array.isArray(scale) ? scale[0] : scale || 1);
        height = height * (Array.isArray(scale) ? scale[1] : scale || 1);
        const gl = this.base.renderer;
        const shadowCamera = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 0, far);
        this.shadowCamera = shadowCamera;
        const renderTarget = new THREE.WebGLRenderTarget(resolution, resolution);
        this.renderTarget = renderTarget;
        const renderTargetBlur = new THREE.WebGLRenderTarget(resolution, resolution);
        this.renderTargetBlur = renderTargetBlur;
        renderTargetBlur.texture.generateMipmaps =
            renderTarget.texture.generateMipmaps = false;
        const planeGeometry = new THREE.PlaneGeometry(width, height).rotateX(Math.PI / 2);
        const blurPlane = new THREE.Mesh(planeGeometry);
        this.blurPlane = blurPlane;
        const depthMaterial = new THREE.MeshDepthMaterial();
        this.depthMaterial = depthMaterial;
        depthMaterial.depthTest = depthMaterial.depthWrite = false;
        depthMaterial.onBeforeCompile = (shader) => {
            shader.uniforms = {
                ...shader.uniforms,
                ucolor: {
                    value: new THREE.Color(color),
                },
            };
            shader.fragmentShader = shader.fragmentShader.replace(`void main() {`, //
            `uniform vec3 ucolor;
         void main() {
        `);
            shader.fragmentShader = shader.fragmentShader.replace("vec4( vec3( 1.0 - fragCoordZ ), opacity );", 
            // Colorize the shadow, multiply by the falloff so that the center can remain darker
            "vec4( ucolor * fragCoordZ * 2.0, ( 1.0 - fragCoordZ ) * 1.0 );");
        };
        const horizontalBlurMaterial = new THREE.ShaderMaterial(HorizontalBlurShader);
        this.horizontalBlurMaterial = horizontalBlurMaterial;
        const verticalBlurMaterial = new THREE.ShaderMaterial(VerticalBlurShader);
        this.verticalBlurMaterial = verticalBlurMaterial;
        verticalBlurMaterial.depthTest = horizontalBlurMaterial.depthTest = false;
        this.count = 0;
        const group = new THREE.Group();
        this.group = group;
        group.rotation.x = Math.PI / 2;
        const planeMaterial = new THREE.MeshBasicMaterial({
            map: renderTarget.texture,
            transparent: true,
            opacity,
            depthWrite,
        });
        const mesh = new THREE.Mesh(planeGeometry, planeMaterial);
        this.mesh = mesh;
        mesh.scale.set(1, -1, 1);
        mesh.rotation.set(-Math.PI / 2, 0, 0);
    }
    addExisting() {
        this.group.add(this.mesh);
        this.group.add(this.shadowCamera);
        this.container.add(this.group);
    }
    blurShadows(blur) {
        const { shadowCamera, renderTarget, renderTargetBlur, blurPlane, horizontalBlurMaterial, verticalBlurMaterial, } = this;
        const gl = this.base.renderer;
        blurPlane.visible = true;
        blurPlane.material = horizontalBlurMaterial;
        horizontalBlurMaterial.uniforms.tDiffuse.value = renderTarget.texture;
        horizontalBlurMaterial.uniforms.h.value = (blur * 1) / 256;
        gl.setRenderTarget(renderTargetBlur);
        gl.render(blurPlane, shadowCamera);
        blurPlane.material = verticalBlurMaterial;
        verticalBlurMaterial.uniforms.tDiffuse.value = renderTargetBlur.texture;
        verticalBlurMaterial.uniforms.v.value = (blur * 1) / 256;
        gl.setRenderTarget(renderTarget);
        gl.render(blurPlane, shadowCamera);
        blurPlane.visible = false;
    }
    update(time) {
        let { shadowCamera, frames, blur, smooth, depthMaterial, renderTarget } = this;
        const scene = this.container;
        const gl = this.base.renderer;
        if (shadowCamera && (frames === Infinity || this.count < frames)) {
            const initialBackground = scene.background;
            scene.background = null;
            const initialOverrideMaterial = scene.overrideMaterial;
            scene.overrideMaterial = depthMaterial;
            gl.setRenderTarget(renderTarget);
            gl.render(scene, shadowCamera);
            scene.overrideMaterial = initialOverrideMaterial;
            this.blurShadows(blur);
            if (smooth) {
                this.blurShadows(blur * 0.4);
            }
            gl.setRenderTarget(null);
            scene.background = initialBackground;
            this.count += 1;
        }
    }
}
export { ContactShadows };
