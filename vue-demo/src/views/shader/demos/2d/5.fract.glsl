// 等边三角形
float sdEquilateralTriangle(in vec2 p,in float r)
{
    const float k=sqrt(3.);
    p.x=abs(p.x)-r;
    p.y=p.y+r/k;
    if(p.x+k*p.y>0.)p=vec2(p.x-k*p.y,-k*p.x-p.y)/2.;
    p.x-=clamp(p.x,-2.*r,0.);
    return-length(p)*sign(p.y);
}

// 圆角
float opRound(in float d,in float r)
{
    return d-r;
}

// 镂空
float opOnion(in float d,in float r)
{
    return abs(d)-r;
}

void mainImage(out vec4 fragColor,in vec2 fragCoord){
    vec2 uv=fragCoord/iResolution.xy;

    uv = fract(uv * vec2(2.,2.));

    uv=(uv-.5)*2.;

    uv.x*=iResolution.x/iResolution.y;
    uv.y = abs(uv.y);

    float d=sdEquilateralTriangle(uv,.5);
    d = opRound(d,.1);
    d = opOnion(d,.05);
    float c=smoothstep(0.,.02,d);
    fragColor=vec4(vec3(c),1.);
    // fragColor=vec4(uv,0.,1.);
}
