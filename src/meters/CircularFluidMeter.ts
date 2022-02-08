import { BaseMeter } from '../base/BaseMeter';
import {
  FluidLayer,
  FluidLayerConfiguration,
  FluidLayerHelper,
  Speed
} from '../base/FluidLayer';

type CircularFluidMeterConfig = {
  initialProgress: number;
  borderWidth: number;
  padding: number;
  backgroundColor: string;
  fluidConfiguration: FluidLayerConfiguration;
};

class CircularFluidMeter extends BaseMeter {
  private _fluidConfiguration: FluidLayerConfiguration;
  private _layers?: [FluidLayer, FluidLayer];

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
      padding: 25,
      backgroundColor: '#00fff0',
      fluidConfiguration: {
        color: '#ff0000',
        waveSpeed: Speed.FAST,
        horizontalSpeed: Speed.NORMAL
      },
      initialProgress: 45
    }
  ) {
    super(container);
    this._borderWidth = config.borderWidth;
    this._padding = config.padding;
    this._progress = config.initialProgress;
    this._backgroundColor = config.backgroundColor;
    this._fluidConfiguration = config.fluidConfiguration;

    this.calculateDrawingValues();
  }

  protected draw(): void {
    this.clear();
    this._context.save();
    this._context.arc(
      this._width / 2,
      this._height / 2,
      this.calculateCircleRadius() / 2 - this._borderWidth,
      0,
      Math.PI * 2
    );
    this._context.clip();
    this.drawBackground();
    if (this._layers) {
      this.drawLayer(this._layers[0]);
      this.drawLayer(this._layers[1]);
    }
    // clip any "fluid" outside the meter
    this._context.restore();
    // can draw in whole canvas again
    this.drawForeground();
  }

  private clear() {
    this._context.clearRect(0, 0, this._width, this._height);
  }

  private calculateDrawingValues(): void {
    this._layers = FluidLayerHelper.buildFluidLayersFromConfiguration(
      this._fluidConfiguration,
      this.calculateCircleRadius()
    );
  }

  private drawLayer(layer: FluidLayer) {
    // calculate wave angle
    let angle = layer.angle + layer.waveSpeed * this._elapsed;
    if (angle > Math.PI * 2) {
      angle = angle - Math.PI * 2;
    }

    layer.angle = angle;

    // calculate horizontal position
    layer.horizontalPosition += layer.horizontalSpeed * this._elapsed;

    let x = 0;
    let y = 0;
    const amplitude = layer.waveAmplitude * Math.sin(layer.angle);

    const meterBottom =
      this._height -
      (this._height - this.calculateCircleRadius()) / 2 -
      this._borderWidth;
    const fluidAmount =
      (this._progress *
        (this.calculateCircleRadius() - this._borderWidth * 2)) /
      100;

    // if (this._progress < fillPercentage) {
    //   currentFillPercentage += 15 * dt;
    // } else if (this._progress > fillPercentage) {
    //   currentFillPercentage -= 15 * dt;
    // }

    const initialHeight = meterBottom - fluidAmount;

    this._context.save();
    this._context.beginPath();

    this._context.lineTo(0, initialHeight);

    while (x < this._width) {
      y =
        initialHeight +
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
      this.calculateCircleRadius() / 2 - this._borderWidth,
      0,
      2 * Math.PI
    );
    this._context.closePath();
    this._context.fill();
    this._context.restore();
  }

  private drawForeground(): void {
    this._context.lineWidth = this._borderWidth;
    this._context.save();
    this._context.strokeStyle = '#0000ff';
    this._context.beginPath();
    this._context.arc(
      this._width / 2,
      this._height / 2,
      this.calculateCircleRadius() / 2 - this._borderWidth / 2,
      0,
      2 * Math.PI
    );
    this._context.closePath();
    this._context.stroke();
    this._context.restore();
  }

  private calculateCircleRadius(): number {
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
