import mitt from "mitt";
/**
 * By extending this class, you can make your components keep their own state and animation.
 */
class Component {
    base;
    emitter;
    container;
    constructor(base) {
        this.base = base;
        this.base?.update((time) => this.update(time));
        this.emitter = mitt();
        this.container = this.base?.scene;
    }
    // 将组件添加至当前场景或替换当前场景中已有的组件
    addExisting() {}
    // 动画帧
    update(time) {}
    // 监听事件
    on(type, handler) {
        this.emitter.on(type, handler);
    }
    // 移除事件
    off(type, handler) {
        this.emitter.off(type, handler);
    }
    // 触发事件
    emit(type, event = {}) {
        this.emitter.emit(type, event);
    }
}
export { Component };
