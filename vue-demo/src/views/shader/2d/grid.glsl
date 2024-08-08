#define mix(x,y,t) x * (1. - t) + y * t

float opUnion(float d1,float d2)
{
    return min(d1,d2);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord.xy / iResolution.xy;
    uv.x*=iResolution.x/iResolution.y;
    uv=fract(uv*16.);
    // vec3 c= vec3(step(.25,uv.x));
    // fragColor=vec4(c,1.);
    // vec3 c=vec3(step(.25,uv.y));
    // fragColor=vec4(c,1.);
    vec3 c=vec3(opUnion(step(.25,uv.x),step(.25,uv.y)));
    fragColor=vec4(c,1.);
}