import type { Base } from "../base/base";
export interface AnimatorConfig {
    autoRender: boolean;
}
declare class Animator {
    base: Base;
    tasks: any[];
    autoRender: boolean;
    constructor(base: Base, config?: Partial<AnimatorConfig>);
    add(fn: any): void;
    update(): void;
    tick(time?: number): void;
}
export { Animator };
