import { measureTextWidth } from "ol/render/canvas";

export function drawProducing(canvas: HTMLCanvasElement, percent: number) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const origin = [canvas.width / 2, canvas.height / 2];
    const r = canvas.width / 4;
    const progressWidth = r * 0.1;

    // 背景圆
    ctx.beginPath();
    ctx.arc(origin[0], origin[1], r, 0, 2 * Math.PI);
    ctx.lineWidth = r * 0.02;
    ctx.strokeStyle = "rgba(231,145,52,1)";
    ctx.stroke();
    const grd = ctx.createRadialGradient(
        origin[0],
        origin[1],
        0,
        origin[0],
        origin[1],
        canvas.height / 4
    );
    grd.addColorStop(0, "rgba(231,145,52,0)");
    grd.addColorStop(0.65, "rgba(231,145,52,0.2)");
    grd.addColorStop(1, "rgba(231,145,52,0.5)");
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.closePath();
    // 进度条
    ctx.beginPath();
    ctx.arc(
        origin[0],
        origin[1],
        r * 0.9,
        0 - Math.PI / 2,
        2 * Math.PI * percent - Math.PI / 2
    );
    ctx.lineWidth = progressWidth;
    ctx.strokeStyle = "rgba(255,159,55,1)";
    ctx.stroke();

    // 文字
    const text = "生产中...";
    const fs = r * 0.2;
    const fsBoxHeight = r * 0.35;
    const fsBoxBottom = r * 0.1;
    const font = fs + "px sans-serif";
    ctx.beginPath();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = font;
    const fsBoxWidth = measureTextWidth(font, text) + r * 0.8;
    ctx.rect(
        origin[0] - fsBoxWidth / 2,
        origin[1] - r - fsBoxBottom - fsBoxHeight,
        fsBoxWidth,
        fsBoxHeight
    );
    ctx.fillStyle = "rgba(55,43,26,0.5)";
    ctx.fill();
    ctx.strokeStyle = "rgba(241,151,53,1)";
    ctx.lineWidth = r * 0.015;
    ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.fillText(
        text,
        origin[0],
        origin[1] - r - fsBoxBottom - fsBoxHeight / 2
    );
    ctx.closePath();

    return canvas;
}

function handleImgs(imgs: string[], imgUrl: string) {
    if (imgUrl === "") {
        return imgs[0];
    } else {
        const index = imgs.findIndex((img) => img === imgUrl);
        if (index + 1 > imgs.length - 1) {
            return imgs[0];
        } else {
            return imgs[index + 1];
        }
    }
}
export function drawFix(imgUrl: string) {
    const imgs = [
        "/assets/effect/fix/1.png",
        "/assets/effect/fix/2.png",
        "/assets/effect/fix/3.png",
        "/assets/effect/fix/4.png",
        "/assets/effect/fix/5.png",
        "/assets/effect/fix/6.png",
        "/assets/effect/fix/7.png",
    ];
    return handleImgs(imgs, imgUrl);
}

export function drawExplosion(imgUrl: string) {
    const imgs = [
        "/assets/effect/explosion/1.png",
        "/assets/effect/explosion/2.png",
        "/assets/effect/explosion/3.png",
        "/assets/effect/explosion/4.png",
    ];
    return handleImgs(imgs, imgUrl);
}
