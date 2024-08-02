const Flower = require("./Flower");
const { getDirFileNum } = require("./util");

let openSrc = `img/skin/open1.png`;
let closeSrc = `img/skin/close1.png`;

const imgElement = document.getElementById("imgAvatar");

imgElement.addEventListener("mousedown", (ev) => {
    if (ev.button === 2) {
        const string = imgElement.src
            .substring(imgElement.src.length - 5, imgElement.src.length)
            .split(".")[0];
        let index = parseInt(string);
        if (index) {
            getDirFileNum(`${__dirname}/img/skin`).then((res) => {
                console.log(res);
                if (index < res / 2) {
                    index++;
                    openSrc = `img/skin/open${index}.png`;
                    closeSrc = `img/skin/close${index}.png`;
                } else {
                    openSrc = "img/skin/open1.png";
                    closeSrc = "img/skin/close1.png";
                }
                imgElement.src = closeSrc;
            });
        }
    }
});

window.onGlobalKeyBoard = (type, value) => {
    const ele = document.querySelector(`li[code='${value}']`);

    if (1 === type) {
        // 按下
        const imgElement = document.getElementById("imgAvatar");
        if (imgElement.src.concat("close")) {
            imgElement.src = openSrc;
            imgElement.offsetTop;
            imgElement.offsetLeft;
        }
        for (let i = 0; i < 2; i++) {
            const number = parseInt(Math.random() * 21 + "");
            document.body.appendChild(
                new Flower(`flower_${number + 1}.png`).img
            );
        }

        ele && ele.classList.add("active");
    }

    if (2 === type) {
        // 抬起
        const imgElement = document.getElementById("imgAvatar");
        if (imgElement.src.concat("open")) {
            imgElement.src = closeSrc;
        }
        ele && ele.classList.remove("active");
    }
};
