import * as THREE from "three";
import { Scroller } from "maku.js";
import { Component } from "../components/component";
import { UniformInjector } from "../components/uniformInjector";
import { TextMesh } from "../shapes";
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

varying vec2 vUv;

void main(){
    vec2 p=vUv;
    vec3 color=vec3(p,0.);
    gl_FragColor=vec4(color,1.);
}
`;
/**
 * An encapsuled class to sync `kokomi.TextMesh` with DOM.
 */
class Moji {
    el;
    textMesh;
    rect;
    constructor(el, textMesh) {
        this.el = el;
        this.textMesh = textMesh;
        const rect = el.getBoundingClientRect();
        this.rect = rect;
    }
    // 同步位置
    setPosition(deltaY = window.scrollY) {
        const { textMesh, rect } = this;
        const { mesh } = textMesh;
        const { x, y, height } = rect;
        const px = x - window.innerWidth / 2;
        const py = -(y + height / 2 - window.innerHeight / 2) + deltaY;
        mesh.position.set(px, py, 0);
    }
}
/**
 * An encapsuled class to sync multiple `kokomi.TextMesh` with DOM.
 */
class MojiGroup extends Component {
    elList;
    vertexShader;
    fragmentShader;
    uniforms;
    textMeshConfig;
    isScrollPositionSync;
    textMeshMaterial;
    mojis;
    scroller;
    uniformInjector;
    materialParams;
    useSelfScroller;
    constructor(base, config = {}) {
        super(base);
        const { elList = [...document.querySelectorAll(".webgl-text")], vertexShader = defaultVertexShader, fragmentShader = defaultFragmentShader, uniforms = {}, textMeshConfig = {}, isScrollPositionSync = true, scroller = null, materialParams = {}, } = config;
        this.elList = elList;
        this.vertexShader = vertexShader;
        this.fragmentShader = fragmentShader;
        this.uniforms = uniforms;
        this.textMeshConfig = textMeshConfig;
        this.isScrollPositionSync = isScrollPositionSync;
        this.textMeshMaterial = null;
        this.mojis = [];
        this.scroller = scroller;
        this.materialParams = materialParams;
        const uniformInjector = new UniformInjector(base);
        this.uniformInjector = uniformInjector;
        this.useSelfScroller = false;
        if (!scroller) {
            this.useSelfScroller = true;
        }
    }
    addExisting() {
        const { uniformInjector } = this;
        const textMeshMaterial = new THREE.ShaderMaterial({
            vertexShader: this.vertexShader,
            fragmentShader: this.fragmentShader,
            side: THREE.DoubleSide,
            uniforms: {
                ...{
                    uTextColor: {
                        value: new THREE.Color("black"),
                    },
                },
                ...uniformInjector.shadertoyUniforms,
                ...this.uniforms,
            },
            ...this.materialParams,
        });
        this.textMeshMaterial = textMeshMaterial;
        const mojis = this.elList.map((el, i) => {
            const tm = new TextMesh(this.base, el.innerText.trim());
            tm.mesh.material = textMeshMaterial.clone();
            tm.container = this.container;
            tm.addExisting();
            const styleFontSize = window
                .getComputedStyle(el, null)
                .getPropertyValue("font-size");
            const fontSize = parseFloat(styleFontSize);
            tm.mesh.fontSize = fontSize;
            const styleTextAlign = window
                .getComputedStyle(el, null)
                .getPropertyValue("text-align");
            const alignMap = {
                start: "left",
                end: "right",
                center: "center",
            };
            tm.mesh.anchorX = alignMap[styleTextAlign];
            const color = el.dataset["webglTextColor"] || "black";
            tm.mesh.material.uniforms.uTextColor.value = new THREE.Color(color);
            const font = el.dataset["webglFontUrl"] || "";
            if (font) {
                tm.mesh.font = font;
            }
            const fontWeight = el.dataset["webglFontWeight"] || "";
            if (fontWeight) {
                tm.mesh.fontWeight = fontWeight;
            }
            const letterSpacing = this.textMeshConfig.letterSpacing;
            if (letterSpacing) {
                tm.mesh.letterSpacing = letterSpacing;
            }
            const moji = new Moji(el, tm);
            return moji;
        });
        this.mojis = mojis;
        // Sync texts positions
        this.mojis.forEach((moji) => {
            moji.setPosition();
        });
        // scroller listen for scroll
        if (this.useSelfScroller) {
            const scroller = new Scroller();
            this.scroller = scroller;
            this.scroller.listenForScroll();
        }
        // handle resize
        this.base.resizer.on("resize", () => {
            mojis.forEach((moji) => {
                moji.rect = moji.el.getBoundingClientRect();
            });
        });
    }
    update() {
        const { scroller, mojis } = this;
        scroller?.syncScroll();
        mojis.forEach((moji) => {
            const material = moji.textMesh.mesh.material;
            const uniforms = material.uniforms;
            this.uniformInjector.injectShadertoyUniforms(uniforms);
            if (this.isScrollPositionSync) {
                if (moji.el.classList.contains("webgl-fixed")) {
                    // fixed element
                    moji.setPosition(0);
                }
                else {
                    // scroll element
                    moji.setPosition(scroller?.scroll.current);
                }
            }
        });
    }
}
export { Moji, MojiGroup };
