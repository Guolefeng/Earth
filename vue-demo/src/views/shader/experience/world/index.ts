import * as kokomi from "@/three";
import * as THREE from "three";
import TestObject from "./testObject";

export default class World extends kokomi.Component {
    testObject: TestObject;
    constructor(base: kokomi.Base) {
        super(base);

        // @ts-ignore
        this.base.am.on("ready", () => {
            document.querySelector(".loader-screen")?.classList.add("hollow");
            // @ts-ignore
            const skybox = this.base.am.items["skybox"];
            skybox.mapping = THREE.EquirectangularReflectionMapping;
            this.base.scene.background = skybox;

            this.testObject = new TestObject(this.base);
            this.testObject.addExisting();
        });
    }
}
