#iChannel0 "https://s2.loli.net/2023/09/10/QozT59R6KsYmb3q.jpg"
// #iChannel0 "https://s2.loli.net/2023/09/10/63quVIA9xZLksDc.jpg"

highp float random(vec2 co)
{
    highp float a=12.9898;
    highp float b=78.233;
    highp float c=43758.5453;
    highp float dt=dot(co.xy,vec2(a,b));
    highp float sn=mod(dt,3.14);
    return fract(sin(sn)*c);
}


vec2 bulge(vec2 p){
    // vec2 center=vec2(.5);
    vec2 center=iMouse.xy/iResolution.xy;


    float radius=.9;
    float strength=1.1;

    p-=center;

    float d=length(p);
    d/=radius;
    float dPow=pow(d,2.);
    float dRev=strength/(dPow+1.);

    // p*=d;
    // p*=dPow;
    p*=dRev;

    p+=center;

    return p;
}


void mainImage ( out vec4 fragColor, in vec2 fragCoord ){
    vec2 uv = fragCoord.xy / iResolution.xy;
    // vec3 tex = texture(iChannel0, uv).rgb;
    // fragColor = vec4(tex, 1.0);

    // ============================ 染色
    // vec3 col=tex;
    // vec3 tintColor=vec3(.220,.380,.651);
    // col*=tintColor;
    // fragColor = vec4(col, 1.0);

    // ============================ RGB 位移
    // vec2 rUv = uv;
    // vec2 gUv = uv;
    // vec2 bUv = uv;
    // // 定义偏移量offset，对R通道和B通道分别应用不同大小（这里用了一正一负）的偏移量，G通道保持不变
    // // float offset = 0.001;
    // float noise=random(uv)*.5+.5;
    // vec2 offset=.005*vec2(cos(noise),sin(noise));
    // rUv += offset;
    // bUv -= offset;
    // // 用偏移过的UV采样 3 次纹理，最后的颜色分别取UV本身对应的通道值。
    // vec4 rTex = texture(iChannel0, rUv);
    // vec4 gTex = texture(iChannel0, gUv);
    // vec4 bTex = texture(iChannel0, bUv);
    // vec4 col = vec4(rTex.r, gTex.g, bTex.b, 1.0);
    // fragColor = col;

    // ============================ 膨胀
    // uv = bulge(uv);
    // vec3 tex = texture(iChannel0, uv).rgb;
    // fragColor = vec4(tex, 1.0);

    // ============================ 像素化
    // vec2 size=vec2(50.,50.);
    // uv =floor(uv*size)/size;
    // vec3 tex=texture(iChannel0,uv).xyz;
    // // float c=uv.x;
    // // // floor，这个函数的作用是向下取整，比如floor(114.514)就等于114.
    // // c = floor(c * 10.) / 10.;
    // fragColor=vec4(tex,1.);

    // ============================ 晕影
    vec3 tex=texture(iChannel0,uv).xyz;
    vec3 col = tex;
    vec2 p = uv;
    p -= .5;
    float d = length(p);
    // col = vec3(d);
    float c = smoothstep(.8, .4, d);
    col *= c;
    fragColor = vec4(col, 1.0);
}