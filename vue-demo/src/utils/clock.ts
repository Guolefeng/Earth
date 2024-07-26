/**
 * @file 时间工具类
 */

class Clock {
    private _tick: () => void;
    /**
     * 当前帧对应的时间
     */
    private _millis = 0;
    /**
     * 当前帧距离上一帧的时间
     */
    private _ellapsedMillis = 0;

    constructor() {
        this._tick = () => {
            requestAnimationFrame(this._tick);
            const oldMillis = this._millis;
            this._millis = Date.now();
            this._ellapsedMillis = this._millis - oldMillis;
        };
        this._ticktock();
    }

    /**
     * 当前帧对应的时间（毫秒值）
     */
    get millis() {
        return this._millis;
    }

    /**
     * 当前帧距离上一帧的时间（毫秒值）
     */
    get ellapsedMillis() {
        return this._ellapsedMillis;
    }

    private _ticktock() {
        requestAnimationFrame(this._tick);
    }
}

/**
 * 全局时间工具
 */
export const clock = new Clock();
