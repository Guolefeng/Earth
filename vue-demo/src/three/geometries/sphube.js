import { ParametricGeometry } from "three/examples/jsm/geometries/ParametricGeometry.js";
import { sphubeFunction } from "../utils/parametric";
/**
 * A [Sphube](https://arxiv.org/pdf/1604.02174.pdf) geometry
 */
class SphubeGeometry extends ParametricGeometry {
    constructor(slices, stacks) {
        super(sphubeFunction, slices, stacks);
    }
}
export { SphubeGeometry };
