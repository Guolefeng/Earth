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

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord.xy / iResolution.y;
    uv=(uv-.5)*2.;
    uv.x*=iResolution.x/iResolution.y;
    float d = sdCircle(uv,.5);
    d = sin(d * 40.);
    float mask=smoothstep(0.,.02,d);
    vec3 c = vec3(mask);
    fragColor = vec4(c, 1.);
}