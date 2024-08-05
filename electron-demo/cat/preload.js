const electron = require("@electron/remote");
const win = electron.getCurrentWindow();

window.addEventListener("DOMContentLoaded", () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) element.innerText = text;
    };

    for (const dependency of ["chrome", "node", "electron"]) {
        replaceText(`${dependency}-version`, process.versions[dependency]);
    }
});

// 鼠标按下还是抬起
let dragging = false;
let startX = 0;
let startY = 0;
const width = win.getBounds().width;
const height = win.getBounds().height;
window.addEventListener("mousedown", (e) => {
    dragging = true;
    const { pageX, pageY } = e;
    startX = pageX;
    startY = pageY;
});
// 鼠标抬起禁止拖拽
window.addEventListener("mouseup", () => {
    dragging = false;
});
// 设置拖拽功能
window.addEventListener("mousemove", (e) => {
    if (dragging) {
        const { pageX, pageY } = e;
        const pos = win.getPosition();
        pos[0] = pos[0] + pageX - startX;
        pos[1] = pos[1] + pageY - startY;
        win.setBounds({
            x: pos[0],
            y: pos[1],
            width,
            height,
        });
    }
});
// 设置指定区域的鼠标点击不穿透
window.addEventListener("mousemove", (e) => {
    const el = document.getElementById("imgAvatar");
    let flag = e.target === el;
    if (!flag) {
        win.setIgnoreMouseEvents(true, { forward: true });
    } else {
        win.setIgnoreMouseEvents(false);
    }
});
