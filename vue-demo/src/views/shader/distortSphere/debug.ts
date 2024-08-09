import * as Dat from "lil-gui";

interface IOptions {
    id: string;
    show?: boolean;
}

export default class Debug {
    ui: Dat.GUI;
    active: boolean;

    constructor(options: IOptions) {
        const { id, show } = options;

        this.active = show;
        if (this.active) {
            this.ui = new Dat.GUI({
                container: document.querySelector(id),
                width: 160,
            });
        }
    }

    destory() {
        this.ui?.destroy();
    }
}
