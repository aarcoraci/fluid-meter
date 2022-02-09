declare abstract class BaseMeter {
    protected _container: HTMLElement;
    protected _canvas: HTMLCanvasElement;
    protected _context: CanvasRenderingContext2D;
    protected _width: number;
    protected _height: number;
    private _time;
    protected _elapsed: number;
    private _animationRequestId;
    private _updateBind;
    private _resizeBind;
    constructor(container: HTMLElement);
    protected update(): void;
    protected abstract draw(): void;
    protected resize(): void;
    dispose(): void;
}
export { BaseMeter };
