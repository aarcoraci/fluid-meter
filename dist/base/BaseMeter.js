"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseMeter = void 0;
class BaseMeter {
    constructor(container) {
        Object.defineProperty(this, "_container", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_canvas", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_context", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_width", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_height", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_time", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_elapsed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_animationRequestId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        // references
        Object.defineProperty(this, "_updateBind", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_resizeBind", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._container = container;
        const size = this._container.getBoundingClientRect();
        this._width = Math.floor(size.width);
        this._height = Math.floor(size.height);
        this._canvas = document.createElement('canvas');
        this._canvas.width = this._width;
        this._canvas.height = this._height;
        const currentContext = this._canvas.getContext('2d');
        if (currentContext) {
            this._context = currentContext;
        }
        else {
            throw 'unable to get 2d context';
        }
        this._container.appendChild(this._canvas);
        // setup references
        this._updateBind = this.update.bind(this);
        this._resizeBind = this.resize.bind(this);
        this._animationRequestId = requestAnimationFrame(this._updateBind);
        window.addEventListener('resize', this._resizeBind);
    }
    update() {
        const now = new Date().getTime();
        this._elapsed = (now - (this._time || now)) / 1000;
        this._time = now;
        this._animationRequestId = requestAnimationFrame(this._updateBind);
        this.draw();
    }
    resize() {
        if (this._container !== undefined) {
            const size = this._container.getBoundingClientRect();
            const width = Math.floor(size.width);
            const height = Math.floor(size.height);
            this._width = width;
            this._height = height;
            this._canvas.width = width;
            this._canvas.height = height;
        }
    }
    dispose() {
        cancelAnimationFrame(this._animationRequestId);
        window.removeEventListener('resize', this._resizeBind);
    }
}
exports.BaseMeter = BaseMeter;
//# sourceMappingURL=BaseMeter.js.map