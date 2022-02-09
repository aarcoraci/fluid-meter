abstract class BaseMeter {
  protected _container: HTMLElement;
  protected _canvas: HTMLCanvasElement;
  protected _context: CanvasRenderingContext2D;
  protected _width = 0;
  protected _height = 0;

  private _time = 0;
  protected _elapsed = 0;

  private _animationRequestId = 0;

  // references
  private _updateBind: () => void;
  private _resizeBind: () => void;

  constructor(container: HTMLElement) {
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
    } else {
      throw 'unable to get 2d context';
    }

    this._container.appendChild(this._canvas);

    // setup references
    this._updateBind = this.update.bind(this);
    this._resizeBind = this.resize.bind(this);

    this._animationRequestId = requestAnimationFrame(this._updateBind);
    window.addEventListener('resize', this._resizeBind);
  }

  protected update(): void {
    const now = new Date().getTime();
    this._elapsed = (now - (this._time || now)) / 1000;
    this._time = now;
    this._animationRequestId = requestAnimationFrame(this._updateBind);
    this.draw();
  }

  protected abstract draw(): void;

  protected resize(): void {
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

  public dispose(): void {
    cancelAnimationFrame(this._animationRequestId);
    window.removeEventListener('resize', this._resizeBind);
  }
}

export { BaseMeter };
