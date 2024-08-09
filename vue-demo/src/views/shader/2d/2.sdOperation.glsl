// SDF的布尔运算主要有 3 种：
// 并（Union）
float opUnion(float d1,float d2)
{
    return min(d1,d2);
}

// 交（Intersection）
float opIntersection(float d1,float d2)
{
    return max(d1,d2);
}

// 差（Subtraction）
float opSubtraction(float d1,float d2)
{
    return max(-d1,d2);
}
// SDF运算 还有另外一种版本：平滑版（smooth），
// 它能够产生一种更加有机（organic）的结果，
// 说的通俗点就是一种“黏稠”的感觉, 而不是“硬”的感觉。
// 第三个参数 k 是一个平滑度参数，值越大，结果越平滑。
// 称为“平滑度”（smoothness），
float opSmoothUnion(float d1,float d2,float k){
    float h=clamp(.5+.5*(d2-d1)/k,0.,1.);
    return mix(d2,d1,h)-k*h*(1.-h);
}

float opSmoothSubtraction(float d1,float d2,float k){
    float h=clamp(.5-.5*(d2+d1)/k,0.,1.);
    return mix(d2,-d1,h)+k*h*(1.-h);
}

float opSmoothIntersection(float d1,float d2,float k){
    float h=clamp(.5-.5*(d2-d1)/k,0.,1.);
    return mix(d2,d1,h)+k*h*(1.-h);
}

// 圆形
float sdCircle(vec2 p, float r)
{
    return length(p) - r;
}
// 方形
float sdBox(in vec2 p,in vec2 b)
{
    vec2 d = abs(p)-b;
    return length(max(d, 0.)) + min(max(d.x, d.y), 0.);
}


void mainImage(out vec4 fragColor,in vec2 fragCoord){
    vec2 uv=fragCoord/iResolution.xy;
    uv=(uv-.5)*2.;
    uv.x*=iResolution.x/iResolution.y;

    float d1=sdCircle(uv,.5);
    float d2=sdBox(uv,vec2(.6,.3));

    // 并
    // float d=opUnion(d1,d2);
    // 交
    // float d=opIntersection(d1,d2);
    // 差
    // float d=opSubtraction(d1,d2);

    // 并
    // float d=opSmoothUnion(d1,d2, .1);
    // 交
    // float d=opSmoothIntersection(d1,d2, .1);
    // 差
    // float d=opSmoothSubtraction(d1,d2, .1);
    float d=opSmoothSubtraction(d2,d1, .1);

    float c=smoothstep(0.,.02,d);
    fragColor=vec4(vec3(c),1.);
}
