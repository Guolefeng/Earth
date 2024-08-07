import * as CANNON from "cannon-es";
import { Component } from "./component";
/**
 * kokomi.js uses [cannon.js](https://github.com/pmndrs/cannon-es) for physics.
 * Just create mesh and body, and add it to base's physics!
 */
class Physics extends Component {
    world;
    meshPhysicsObjects;
    constructor(base) {
        super(base);
        const world = new CANNON.World();
        world.gravity.set(0, -9.82, 0);
        this.world = world;
        this.meshPhysicsObjects = [];
    }
    // 添加物体
    add({ mesh, body, copyPosition = true, copyQuaternion = true }) {
        const obj = new MeshPhysicsObject(
            mesh,
            body,
            copyPosition,
            copyQuaternion
        );
        this.base.physics.world.addBody(body);
        this.meshPhysicsObjects.push(obj);
    }
    // 帧
    tick() {
        const world = this.world;
        const deltaTime = this.base.clock.deltaTime;
        world.step(1 / 60, deltaTime, 3);
    }
    // 同步物理和渲染
    sync() {
        this.meshPhysicsObjects.forEach((obj) => {
            const { mesh, body, copyPosition, copyQuaternion } = obj;
            if (copyPosition) {
                mesh.position.copy(body.position);
            }
            if (copyQuaternion) {
                mesh.quaternion.copy(body.quaternion);
            }
        });
    }
    update(time) {
        this.sync();
        this.tick();
    }
}
class MeshPhysicsObject {
    mesh;
    body;
    copyPosition;
    copyQuaternion;
    constructor(mesh, body, copyPosition = true, copyQuaternion = true) {
        this.mesh = mesh;
        this.body = body;
        this.copyPosition = copyPosition;
        this.copyQuaternion = copyQuaternion;
    }
}
export { Physics, MeshPhysicsObject };
