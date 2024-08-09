import { Component } from "../components/component";
import { FBO } from "./fbo";
class DoubleFBO extends Component {
    readFBO;
    writeFBO;
    constructor(base, options = {}) {
        super(base);
        const readFBO = new FBO(this.base, options);
        this.readFBO = readFBO;
        const writeFBO = new FBO(this.base, options);
        this.writeFBO = writeFBO;
    }
    swap() {
        [this.readFBO, this.writeFBO] = [this.writeFBO, this.readFBO];
    }
}
export { DoubleFBO };
