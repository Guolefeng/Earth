const Flower = require("./src/Flower");
let openSrc = "img/cat/body_open.png";
let closeSrc = "img/cat/body_shut.png";
const catbody = document.getElementById("catbody");
const container = document.getElementById("zr");
const zr = zrender.init(container);

// 爪子宽、高、左右腿距离猫身x/y间距
const w = 5;
const h = 15;
const leftDisX = 130;
const leftDisY = 100;
const rightDisX = 80;
const rightDisY = 100;
// 绘制猫爪
const getLeftPoints = (sp, ep, gap = 3) => {
    return [
        [sp.x - gap, sp.y - gap],
        [sp.x - gap, sp.y + gap],
        [sp.x + gap, sp.y + gap],
        [ep.x + gap, ep.y + gap],
        [ep.x + gap, ep.y - gap],
        [ep.x - gap, ep.y - gap],
    ];
};

const getRightPoints = (sp, ep, gap = 3) => {
    return [
        [sp.x - gap, sp.y + gap],
        [sp.x + gap, sp.y + gap],
        [sp.x + gap, sp.y - gap],
        [ep.x + gap, ep.y - gap],
        [ep.x - gap, ep.y - gap],
        [ep.x - gap, ep.y + gap],
    ];
};

const getStartPoint = (e) => {
    return {
        x: e.offsetLeft + e.clientWidth / 2,
        y: e.offsetTop + e.clientHeight / 2,
    };
};

const getGradientColor = () => {
    var gradient = new zrender.LinearGradient(0, 0, 1, 1);
    gradient.addColorStop(0, "#8d8d8c");
    gradient.addColorStop(1, "#000");
    return gradient;
};

// 左腿开始点位
let leftLeg_sp = {
    x: container.clientWidth - w - leftDisX,
    y: container.clientHeight + h - leftDisY,
};
// 左腿结束点位
let leftLeg_ep = {
    x: container.clientWidth - leftDisX,
    y: container.clientHeight - leftDisY,
};
// 左腿默认点位
let leftLeg_dp = getLeftPoints(leftLeg_sp, leftLeg_ep);

const leftLeg = new zrender.Polygon({
    shape: {
        points: leftLeg_dp,
        smooth: 0.5,
    },
    style: {
        fill: getGradientColor(),
    },
});
zr.add(leftLeg);

// 右腿开始点位
let rightLeg_sp = {
    x: container.clientWidth + w - rightDisX,
    y: container.clientHeight + h - rightDisY,
};
// 右腿结束点位
let rightLeg_ep = {
    x: container.clientWidth - rightDisX,
    y: container.clientHeight - rightDisY,
};
// 右腿默认点位
let rightLeg_dp = getRightPoints(rightLeg_sp, rightLeg_ep);

const rightLeg = new zrender.Polygon({
    shape: {
        points: rightLeg_dp,
        smooth: 0.5,
    },
    style: {
        fill: getGradientColor(),
    },
});
zr.add(rightLeg);

window.addEventListener("resize", () => {
    zr.resize();
    leftLeg_sp = {
        x: container.clientWidth - w - leftDisX,
        y: container.clientHeight + h - leftDisY,
    };
    leftLeg_ep = {
        x: container.clientWidth - leftDisX,
        y: container.clientHeight - leftDisY,
    };
    leftLeg_dp = getLeftPoints(leftLeg_sp, leftLeg_ep);
    leftLeg.attr({
        shape: {
            points: leftLeg_dp,
        },
    });

    rightLeg_sp = {
        x: container.clientWidth - w - rightDisX,
        y: container.clientHeight + h - rightDisY,
    };
    rightLeg_ep = {
        x: container.clientWidth - rightDisX,
        y: container.clientHeight - rightDisY,
    };
    rightLeg_dp = getRightPoints(rightLeg_sp, rightLeg_ep);
    rightLeg.attr({
        shape: {
            points: rightLeg_dp,
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
            if (ele.getAttribute("type") === "left") {
                leftLeg.attr({
                    shape: {
                        points: getLeftPoints(sp, leftLeg_ep),
                    },
                });
            } else if (ele.getAttribute("type") === "right") {
                rightLeg.attr({
                    shape: {
                        points: getRightPoints(sp, rightLeg_ep),
                    },
                });
            } else {
                leftLeg.attr({
                    shape: {
                        points: getLeftPoints(sp, leftLeg_ep),
                    },
                });
                rightLeg.attr({
                    shape: {
                        points: getRightPoints(sp, rightLeg_ep),
                    },
                });
            }
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
            if (ele.getAttribute("type") === "left") {
                leftLeg.attr({
                    shape: {
                        points: leftLeg_dp,
                    },
                });
            } else if (ele.getAttribute("type") === "right") {
                rightLeg.attr({
                    shape: {
                        points: rightLeg_dp,
                    },
                });
            } else {
                leftLeg.attr({
                    shape: {
                        points: leftLeg_dp,
                    },
                });
                rightLeg.attr({
                    shape: {
                        points: rightLeg_dp,
                    },
                });
            }
        }
    }
};
