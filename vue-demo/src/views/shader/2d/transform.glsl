// 小知识点：
// 在Shader中，值的显示范围只会是[0,1]之间，
// 也就是说，小于 0 的负数实际显示的值还是 0（黑色），
// 大于 1 的数实际显示的值还是 1（白色）。

// SDF函数，符号距离函数，用于计算点到形状的距离
// 它的前面还有个“符号”，
// 是因为在形状外的距离为正数（“+”号），
// 在形状内的距离为负数（“-”号），
// 边界处的值恰好为 0
// 2d图形的SDF函数 https://iquilezles.org/articles/distfunctions2d/

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

mat2 rotation2d(float angle){
    float s=sin(angle);
    float c=cos(angle);

    return mat2(
        c,-s,
        s,c
    );
}

// 旋转
vec2 rotate(vec2 v,float angle){
    return rotation2d(angle)*v;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    // 常量，代表180度
    const float PI = 3.14159265359;
    vec2 uv = fragCoord.xy / iResolution.xy;
    // fragColor = vec4(uv, 0.5 + 0.5 * cos(iTime), 1.0);
    // fragColor = vec4(uv.x, 0., 0., 1.);
    // 修改原点到屏幕中心，uv居中处理
    uv = (uv - 0.5) * 2.0;
    // uv坐标的值，适应画布的比例
    uv.x *= iResolution.x / iResolution.y;
    // uv.x += .2;
    // uv.y += .4;
    // 右上方平移
    // uv -= vec2(.5, .3);
    // 放大2倍
    // uv /= vec2(2., 2.);
    // 翻转Y轴
    // uv.y *= -1.;
    // 旋转90度
    uv = rotate(uv, iTime);
    float d = sdEquilateralTriangle(uv, .5);
    // d -= 0.5;
    // 在Shader的编写中，我们应当尽量避免使用if语句，为什么呢？
    // 因为GPU是并行处理结果的，而if语句会让处理器进行分支切换这一操作，
    // 处理多个分支会降低并行处理的性能。
    // if (d > 0.) {
    //     c = 1.;
    // } else {
    //     c = 0.;
    // }
    // 使用内置的step函数优化if语句, 但是发现图形的周围有锯齿
    // c = step(0., d);
    // 使用内置的smoothstep函数优化if语句，可以消除锯齿
    // float c = smoothstep(0., 0.02, d);
    // float c = .25 / d;
    // c = pow(c, 1.6);
    float c = smoothstep(0.,.02,d);
    fragColor = vec4(vec3(c), 1.);
    // fragColor = vec4(vec3(d), 1.);
    // fragColor = vec4(uv, 0., 1.);
}