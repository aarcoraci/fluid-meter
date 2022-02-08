import { BaseMeter } from '../base/BaseMeter';
import { FluidLayer } from '../base/FluidLayer';

type CircularFluidMeterConfig = {
  borderWidth: number;
  padding: number;
  backgroundColor: string;
  backgroundLayer: FluidLayer;
};

class CircularFluidMeter extends BaseMeter {
  private _backgroundLayer: FluidLayer;
  // protected _foregroundLayer: FluidLayer;
  private _backgroundWaveAmplitude = 0;

  private _progress = 50;
  public get progress() {
    return this._progress;
  }
  public set progress(progress: number) {
    this._progress = progress;
  }

  private _borderWidth = 25;
  public get borderWidth() {
    return this._borderWidth;
  }
  public set borderWidth(borderWidth: number) {
    this._borderWidth = borderWidth;
    this.calculateDrawingValues();
  }

  private _padding = 15;
  public get meterPadding() {
    return this._padding;
  }
  public set meterPadding(padding: number) {
    this._padding = padding;
    this.calculateDrawingValues();
  }

  private _backgroundColor = '';
  public get backgroundColor() {
    return this._backgroundColor;
  }
  public set backgroundColor(color: string) {
    this._backgroundColor = color;
  }

  constructor(
    container: HTMLElement,
    config: CircularFluidMeterConfig = {
      borderWidth: 25,
      padding: 15,
      backgroundColor: '#00ff00',
      backgroundLayer: {
        color: '#ff0000',
        angle: 0,
        horizontalPosition: 0,
        angularSpeed: 140,
        maxAmplitude: 15,
        frequency: 40,
        horizontalSpeed: 150,
        initialHeight: 0
      }
    }
  ) {
    super(container);
    this._borderWidth = config.borderWidth;
    this._padding = config.padding;
    this._backgroundColor = config.backgroundColor;
    this._backgroundLayer = config.backgroundLayer;
    // calculation
    this.calculateDrawingValues();
  }

  protected draw(): void {
    this.clear();
    this.drawBackground();
    this.drawLayer(this._backgroundLayer);
  }

  private clear() {
    this._context.clearRect(0, 0, this._width, this._height);
  }

  private calculateDrawingValues(): void {
    this._backgroundWaveAmplitude = this.calculateWaveAmplitude(
      this._backgroundLayer
    );
  }

  private calculateWaveAmplitude(layer: FluidLayer): number {
    let result = 0;

    if (typeof layer.maxAmplitude == 'number') {
      result = layer.maxAmplitude;
    } else if (typeof layer.maxAmplitude == 'string') {
      const percentage = parseFloat(layer.maxAmplitude);
      result = (percentage / 2 / 100) * (this._height - this._padding * 2);
    }

    return result;
  }

  private drawLayer(layer: FluidLayer) {
    // calculate wave angle
    if (layer.angularSpeed > 0) {
      layer.angle += layer.angularSpeed * this._elapsed;
      layer.angle = layer.angle < 0 ? layer.angle + 360 : layer.angle;
    }

    // calculate horizontal position
    layer.horizontalPosition += layer.horizontalSpeed * this._elapsed;
    if (layer.horizontalSpeed > 0) {
      layer.horizontalPosition > Math.pow(2, 53) ? 0 : layer.horizontalPosition;
    } else if (layer.horizontalPosition < 0) {
      layer.horizontalPosition < -1 * Math.pow(2, 53)
        ? 0
        : layer.horizontalPosition;
    }

    let x = 0;
    let y = 0;
    const amplitude =
      this._backgroundWaveAmplitude * Math.sin((layer.angle * Math.PI) / 180);

    const meterBottom =
      this._height -
      (this._height - this.getMeterRadius()) / 2 -
      this._borderWidth;
    const fluidAmount =
      (this._progress * (this.getMeterRadius() - this._borderWidth * 2)) / 100;

    // if (this._progress < fillPercentage) {
    //   currentFillPercentage += 15 * dt;
    // } else if (this._progress > fillPercentage) {
    //   currentFillPercentage -= 15 * dt;
    // }

    layer.initialHeight = meterBottom - fluidAmount;

    this._context.save();
    this._context.beginPath();

    this._context.lineTo(0, layer.initialHeight);

    while (x < this._width) {
      y =
        layer.initialHeight +
        amplitude * Math.sin((x + layer.horizontalPosition) / layer.frequency);
      this._context.lineTo(x, y);
      x++;
    }

    this._context.lineTo(x, this._height);
    this._context.lineTo(0, this._height);
    this._context.closePath();

    this._context.fillStyle = layer.color;
    this._context.fill();
    this._context.restore();
  }

  private drawBackground(): void {
    this._context.save();
    this._context.fillStyle = this.backgroundColor;
    this._context.beginPath();
    this._context.arc(
      this._width / 2,
      this._height / 2,
      this.getMeterRadius() / 2 - this._borderWidth,
      0,
      2 * Math.PI
    );
    this._context.closePath();
    this._context.fill();
    this._context.restore();
  }

  private getMeterRadius(): number {
    if (this._width > this._height) {
      return this._height - this._padding;
    } else {
      return this._width - this._padding;
    }
  }

  protected override resize(): void {
    super.resize();
    this.calculateDrawingValues();
  }
}

export { CircularFluidMeter, CircularFluidMeterConfig };
