import type { Base } from "../base/base";
import { Component } from "../components/component";
import { FBO, FBOConfig } from "./fbo";
export interface DoubleFBOConfig extends FBOConfig {
}
declare class DoubleFBO extends Component {
    readFBO: FBO;
    writeFBO: FBO;
    constructor(base: Base, options?: Partial<DoubleFBOConfig>);
    swap(): void;
}
export { DoubleFBO };
