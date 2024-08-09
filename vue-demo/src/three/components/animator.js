class Animator {
    base;
    tasks;
    autoRender;
    constructor(base, config = {}) {
        const { autoRender = true } = config;
        this.autoRender = autoRender;
        this.base = base;
        this.tasks = [];
    }
    add(fn) {
        this.tasks.push(fn);
    }
    update() {
        this.base.renderer.setAnimationLoop((time) => {
            this.tick(time);
        });
    }
    tick(time = 0) {
        this.tasks.forEach((task) => {
            task(time);
        });
        if (this.autoRender) {
            this.base.render();
        }
    }
}
export { Animator };
