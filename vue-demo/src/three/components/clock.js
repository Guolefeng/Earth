import * as THREE from "three";
import { Component } from "./component";
/**
 * An encapsuled class for `THREE.Clock`.
 * You can get `elapsedTime` and `deltaTime` from it.
 */
class Clock extends Component {
    clock;
    deltaTime;
    elapsedTime;
    constructor(base) {
        super(base);
        const clock = new THREE.Clock();
        this.clock = clock;
        this.deltaTime = 0;
        this.elapsedTime = 0;
    }
    update(time) {
        const newElapsedTime = this.clock.getElapsedTime();
        const deltaTime = newElapsedTime - this.elapsedTime;
        this.deltaTime = deltaTime;
        this.elapsedTime = newElapsedTime;
        this.emit("tick");
    }
}
export { Clock };
