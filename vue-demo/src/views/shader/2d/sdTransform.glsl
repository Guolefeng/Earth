
// 混合函数 它接受 3 个参数：
// 前 2 个参数x和y分别对应 2 个值，
// 最后一个参数t代表混合程度，
// 如果t为 0，则值就等于x；
// 如果t为 1，则值就等于y，
// 如果t为 0 到 1 内的值，则值就等于x与y之间逐渐变化的值。
#define mix(x,y,t) x * (1. - t) + y * t

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
    float d=mix(d1,d2,abs(sin(iTime)));
    float c=smoothstep(0.,.02,d);
    fragColor=vec4(vec3(c),1.);
}
