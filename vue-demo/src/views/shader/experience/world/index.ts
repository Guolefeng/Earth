import * as kokomi from "kokomi.js";
import TestObject from "./testObject";

export default class World extends kokomi.Component {
    testObject: TestObject;
    constructor(base: kokomi.Base) {
        super(base);
        this.testObject = new TestObject(base);
        this.testObject.addExisting();
    }
}
