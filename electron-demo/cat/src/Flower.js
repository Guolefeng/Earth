const electron = require("@electron/remote");
const workAreaSize = electron.screen.getPrimaryDisplay().workAreaSize;

class Flower {
    img;
    requestId;

    constructor(url) {
        this.img = document.createElement("img");
        this.img.src = `img/flower/${url}`;
        this.img.width = Math.random() * 40 + 5;
        this.x = 87;
        this.y = 145;
        this.rotaion = 0;
        this.speedX = Math.random() * 6 + 5;
        this.speedY = Math.random() * 6 + 9;
        this.speedRotation =
            (Math.random() + 1) * (Math.random() > 0.5 ? 1 : -1);
        this.move();
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
            this.destory();
        } else {
            this.requestId = requestAnimationFrame(this.move.bind(this));
        }
    }

    destory() {
        this.img.parentNode.removeChild(this.img);
        this.requestId && cancelAnimationFrame(this.requestId);
    }
}

module.exports = Flower;
