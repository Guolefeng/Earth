void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord.xy / iResolution.xy;
    uv.y += sin(uv.x * 6.) * .4;
    uv = fract(uv * 16.);
    vec3 c=vec3(step(.5,uv.y));
    fragColor=vec4(c,1.);
}