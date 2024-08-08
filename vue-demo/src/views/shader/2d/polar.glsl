// 极坐标

// 笛卡尔坐标转极坐标
vec2 cart2polar(vec2 uv){
    float phi=atan(uv.y,uv.x);
    float r=length(uv);
    return vec2(phi,r);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord.xy / iResolution.xy;
    uv=(uv-.5)*2.;
    uv.x*=iResolution.x/iResolution.y;
    uv=cart2polar(uv);
    // 放射形
    // float c = sin(uv.x * 12.);
    // fragColor = vec4(vec3(c), 1.);
    // 螺旋形
    float c=sin(uv.y*20.+uv.x);
    fragColor=vec4(vec3(c),1.);

    // fragColor = vec4(uv, 0., 1.);
}