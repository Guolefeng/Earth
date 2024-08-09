import { Scroller } from "maku.js";
export interface Scroll {
    current: number;
    target: number;
    ease: number;
    last: number;
    delta: number;
    direction: "up" | "down" | "";
}
declare const NormalScroller: typeof Scroller;
/**
 * A scroller to detect `wheel` event.
 *
 * Demo: https://kokomi-playground.vercel.app/entries/#textureRecursion
 */
declare class WheelScroller {
    scroll: Scroll;
    enabled: boolean;
    constructor();
    enable(): void;
    disable(): void;
    listenForScroll(): void;
    syncScroll(): void;
}
export { NormalScroller, WheelScroller };
