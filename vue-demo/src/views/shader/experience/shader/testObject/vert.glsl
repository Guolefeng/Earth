#include "/node_modules/lygia/generative/cnoise.glsl"

uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;

varying vec2 vUv;

vec3 distort(vec3 p){
    float noise=cnoise(p+iTime);
    p+=noise*normal*.3;
    return p;
}

void main() {
    // // mvp矩阵 三维世界的物体如何通过相机投射到二维平面的过程
    // // 模型
    // vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    // // 视图
    // vec4 viewPosition = viewMatrix * modelPosition;
    // // 投影
    // vec4 projectedPosition = projectionMatrix * viewPosition;
    // gl_Position = projectedPosition;

    vec3 p = position;
    p=distort(p);
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(p, 1.0);
    vUv = uv;
}