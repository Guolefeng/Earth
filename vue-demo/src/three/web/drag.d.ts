import type { Base } from "../base/base";
import { Component } from "../components/component";
export interface DragDetecterConfig {
    isCursorChanged: boolean;
}
/**
 * A detecter to detect `drag` event.
 */
declare class DragDetecter extends Component {
    isDragging: boolean;
    isCursorChanged: boolean;
    enabled: boolean;
    constructor(base: Base, config?: Partial<DragDetecterConfig>);
    detectDrag(): void;
    enable(): void;
    disable(): void;
    changeCursorGrab(): void;
    changeCursorGrabbing(): void;
    resetCursor(): void;
    endDrag(): void;
}
export { DragDetecter };
