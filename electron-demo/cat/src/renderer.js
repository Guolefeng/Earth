const Flower = require("./src/Flower");
let openSrc = "img/cat/body_open.png";
let closeSrc = "img/cat/body_shut.png";
const catbody = document.getElementById("catbody");
// 爪子宽、高、距离猫身x/y间距
const w = 30;
const h = 20;
const disX = 87;
const disY = 90;
const container = document.getElementById("zr");

// 绘制猫爪
const getPoints = (sp, ep, gap = 3) => {
    return [
        [sp.x - gap, sp.y + gap],
        [sp.x - gap, sp.y - gap],
        [sp.x + gap, sp.y - gap],
        [ep.x + gap, ep.y - gap],
        [ep.x - gap, ep.y + gap],
    ];
};

const getStartPoint = (e) => {
    return {
        x: e.offsetLeft + e.clientWidth / 2,
        y: e.offsetTop + e.clientHeight / 2,
    };
};

let startPosition = {
    x: container.clientWidth - w - disX,
    y: container.clientHeight - h - disY,
};
let endPosition = {
    x: container.clientWidth - disX,
    y: container.clientHeight - disY,
};
let defaultPoints = getPoints(startPosition, endPosition);
var zr = zrender.init(container);
var p = new zrender.Polygon({
    shape: {
        points: defaultPoints,
        smooth: 0.5,
    },
    style: {
        fill: "#000",
    },
});
zr.add(p);

window.addEventListener("resize", () => {
    zr.resize();
    startPosition = {
        x: container.clientWidth - w - disX,
        y: container.clientHeight - h - disY,
    };
    endPosition = {
        x: container.clientWidth - disX,
        y: container.clientHeight - disY,
    };
    let defaultPoints = getPoints(startPosition, endPosition);
    p.attr({
        shape: {
            points: defaultPoints,
        },
    });
});

// 绘制猫爪

window.onGlobalKeyBoard = (type, keyCode) => {
    const ele = document.querySelector(`li[code='${keyCode}']`);

    // 键盘键按下
    if (1 === type) {
        // 张嘴
        if (catbody.src.concat("shut")) {
            catbody.src = openSrc;
        }

        // 随机生成花
        for (let i = 0; i < 2; i++) {
            const number = parseInt(Math.random() * 6 + "");
            document.body.appendChild(new Flower(`${number + 1}.png`).img);
        }

        // 键盘按键同步 按下状态
        if (ele) {
            ele.classList.add("active");
            const sp = getStartPoint(ele);
            p.attr({
                shape: {
                    points: getPoints(sp, endPosition),
                },
            });
        }
    }

    // 键盘键抬起
    if (2 === type) {
        // 闭嘴
        if (catbody.src.concat("open")) {
            catbody.src = closeSrc;
        }
        // 键盘按钮同步 恢复默认状态
        if (ele) {
            ele.classList.remove("active");
            p.attr({
                shape: {
                    points: defaultPoints,
                },
            });
        }
    }
};
