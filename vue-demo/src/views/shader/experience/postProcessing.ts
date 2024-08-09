import * as kokomi from "@/three";

import postprocessingFragmentShader from "./frag.glsl";

export default class Postprocessing extends kokomi.Component {
    ce: kokomi.CustomEffect;
    constructor(base: kokomi.Base) {
        super(base);

        this.ce = new kokomi.CustomEffect(this.base, {
            fragmentShader: postprocessingFragmentShader,
            uniforms: {
                uRGBShift: {
                    value: 0,
                },
            },
        });
    }
    addExisting() {
        this.ce.addExisting();
    }
}
