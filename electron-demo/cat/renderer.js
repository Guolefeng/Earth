const Flower = require("./Flower");

let openSrc = "img/cat/body_open1.png";
let closeSrc = "img/cat/body_shut1.png";
const catbody = document.getElementById("catbody");

window.onGlobalKeyBoard = (type, value) => {
    const ele = document.querySelector(`li[code='${value}']`);

    // 键盘键按下
    if (1 === type) {
        // 张嘴
        if (catbody.src.concat("shut")) {
            catbody.src = openSrc;
        }

        // 随机生成花
        for (let i = 0; i < 2; i++) {
            const number = parseInt(Math.random() * 6 + "");
            document.body.appendChild(
                new Flower(`flower_${number + 1}.png`).img
            );
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
