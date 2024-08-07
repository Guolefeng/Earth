//
// Description : Array and textureless GLSL 2D/3D/4D simplex
//               noise functions.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : ijm
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
     return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

// 自然的Simplex噪声
float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

// Permutations
  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients: 7x7 points over a square, mapped onto an octahedron.
// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
}

#pragma glslify: export(snoise)


// FBM全称是Fractal Brownian Motion，中译是“分形布朗运动”，
// 它是将多个具有不同频率和振幅的噪声的结果值相叠加而产生结果的一种随机过程。
// 它主要被用于构造自然界的云层、山脉、地貌等不规则的形体。
float fbm(vec3 p){
    float value=0.; // 结果值
    float amplitude=1.; // 振幅
    float frequency=1.; // 频率
    float lacunarity=2.; // 空隙
    float persistance=.5; // 持续度 衰减
    float scale=1.; // 缩放程度
    int octaves=2; // 音度

    for(int i=0;i<octaves;i++){
        float noiseVal=snoise(p*frequency*scale);

        value+=amplitude*noiseVal;
        frequency*=lacunarity;
        amplitude*=persistance;
    }

    return value;
}


#iChannel0 "https://s2.loli.net/2023/09/10/QozT59R6KsYmb3q.jpg"
#iChannel1 "https://s2.loli.net/2023/09/10/Jb8mIhZMBElPiuC.jpg"

vec4 getFromColor(vec2 uv){
    return texture(iChannel0,uv);
}

vec4 getToColor(vec2 uv){
    return texture(iChannel1,uv);
}

// remap，该函数的功能是将一个值的值域重新映射到另一个值域上。
float remap(float a,float b,float c,float d,float t)
{
    return clamp((t-a)/(b-a),0.,1.)*(d-c)+c;
}


// 消融效果
vec4 dissolve(vec2 uv){
    float progress=iMouse.x/iResolution.x;
    float ratio=iResolution.x/iResolution.y;

    vec4 col=getFromColor(uv);
    vec4 col1=getToColor(uv);

    vec2 p = uv;
    p -= .5;
    p.x *= ratio;
    float noise = fbm(vec3(p, 0.));
    // noise=(noise*.5)+.5;
    noise=remap(-1.,1.,0.,1.,noise);

    // 消融时增加一圈亮边
    float edgeWidth=.1;
    vec3 edgeColor=vec3(0.835,0.694,0.051);
    // 混合度是噪声与位置的差
    float edge=1.-smoothstep(0.,edgeWidth,noise-progress);
    // 然后将遮罩输出到画布上看看
    // col.rgb=vec3(edge);
    // col.rgb=mix(col.rgb,edgeColor,edge);
    col.rgb=mix(col.rgb,edgeColor,edge*step(.0001,progress));

    // 用smoothstep函数将progress与noise相比较，progress从左侧开始是 0，
    // 小于noise时，pr会返回 1，鼠标从左侧慢慢右移时，
    // progress会慢慢变大，pr也会慢慢变成小于 1 的值。
    float pr=smoothstep(progress-.01,progress,noise);
    col.rgb=mix(col.rgb,col1.rgb,1.-pr);
    return col;
}

void mainImage(out vec4 fragColor,in vec2 fragCoord){
    vec2 uv=fragCoord/iResolution.xy;

    vec4 col=dissolve(uv);

    fragColor=col;
}
