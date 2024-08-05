const { app, BrowserWindow } = require("electron");
const path = require("path");
const { uIOhook } = require("uiohook-napi");
const electron = require("electron");
const remote = require("@electron/remote/main");
// 初始化
remote.initialize();

const createWindow = () => {
    const area = electron.screen.getPrimaryDisplay().workAreaSize;
    console.log(process.platform);
    let cusX = area.width;
    let cusY = area.height;
    // 当不是mac系统时，屏幕位置使用下面的计算方式，默认为mac系统的计算方式
    if (process.platform && process.platform !== "darwin") {
        cusX = area.width - area.width * 0.5;
        cusY = area.height - area.height * 0.5;
    }
    const win = new BrowserWindow({
        x: cusX,
        y: cusY,
        width: area.width * 0.5,
        height: area.height * 0.5,
        frame: false, // 无边框
        transparent: true, // 透明度
        alwaysOnTop: true, // 窗口置顶
        resizable: false, // 是否可以改变大小
        movable: true, // 是否可以移动
        webPreferences: {
            preload: path.join(__dirname, "src/preload.js"),
            nodeIntegration: true, // 是否使用nodejs 的特性
            contextIsolation: false, // 上下文隔离
        },
        // 禁用窗口阴影，否则在mac系统选中时会有图片的阴影
        hasShadow: false,
    });
    // 允许窗口的 webcontents 访问
    remote.enable(win.webContents);

    // 设置鼠标忽略事件
    // win.setIgnoreMouseEvents(true);

    // 处理mac系统下，在全屏模式下，应用无法置顶的问题。
    if (process.platform === "darwin") {
        app.dock.show();
        win.setAlwaysOnTop(true, "floating", 1);
        win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
        win.setFullScreenable(false);
    }

    win.loadFile("index.html");

    // 监听系统键盘事件
    uIOhook.on("keydown", (e) => {
        // 按下
        win.webContents.executeJavaScript(`
            if (window.onGlobalKeyBoard) {
                window.onGlobalKeyBoard(1, ${e.keycode})
            }
        `);
    });
    uIOhook.on("keyup", (e) => {
        // 抬起
        win.webContents.executeJavaScript(`
            if (window.onGlobalKeyBoard) {
                window.onGlobalKeyBoard(2, ${e.keycode})
            }
        `);
    });
    uIOhook.start();

    // 打开开发者工具
    // win.openDevTools();
};

app.whenReady().then(() => {
    createWindow();
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
