const electron = require("@electron/remote");
const workAreaSize = electron.screen.getPrimaryDisplay().workAreaSize;

class Flower {
    constructor(url) {
        this._img = document.createElement("img");
        this._img.src = `img/flower/${url}`;
        this._img.width = Math.random() * 40 + 5;
        this.x = 87;
        this.y = 145;
        this.rotaion = 0;
        this.speedX = Math.random() * 6 + 5;
        this.speedY = Math.random() * 6 + 9;
        this.speedRotation =
            (Math.random() + 1) * (Math.random() > 0.5 ? 1 : -1);
        this.move();
    }

    get img() {
        return this._img;
    }

    move() {
        this.speedX = this.speedX - 0.1 > 1 ? this.speedX - 0.1 : this.speedX;
        this.x += this.speedX;
        this.speedY = this.speedY - 0.3 > 1 ? this.speedY - 0.5 : this.speedY;
        if (this.x > workAreaSize.width / 4) {
            this.speedY = -(Math.random() * 2);
        }
        this.y += this.speedY;
        this.rotaion += this.speedRotation;
        this.img.style.transform = `translate(-${this.x}px, -${this.y}px) rotate(${this.rotaion}deg)`;
        if (
            this.y <= 50 ||
            Math.abs(this.x + 50) >= workAreaSize.width * 0.5 ||
            Math.abs(this.y + 50) >= workAreaSize.height * 0.5
        ) {
            if (this._img.parentNode) {
                this._img.parentNode.removeChild(this._img);
            }
        } else {
            // 以屏幕刷新频率执行
            requestAnimationFrame(() => {
                this.move();
            });
        }
    }
}

module.exports = Flower;
