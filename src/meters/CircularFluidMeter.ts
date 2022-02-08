import { BaseMeter } from '../base/BaseMeter';
import { BubblesLayer } from '../base/BubblesLayer';
import {
  FluidLayer,
  FluidLayerConfiguration,
  FluidLayerHelper,
  Speed
} from '../base/FluidLayer';

type CircularFluidMeterConfig = {
  initialProgress?: number;
  borderWidth?: number;
  padding?: number;
  backgroundColor?: string;
  showProgress?: boolean;
  showBubbles?: boolean;
  textColor?: string;
  fluidConfiguration: FluidLayerConfiguration;
  fontFamily?: string;
  fontSize?: number;
  progressFormatter?: (value: string) => string;
};

class CircularFluidMeter extends BaseMeter {
  private _fluidConfiguration: FluidLayerConfiguration;
  private _layers?: [FluidLayer, FluidLayer];
  private _bubbles = new BubblesLayer();

  private _progress = 33;
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

  private _backgroundColor = '#c9c9c9';
  public get backgroundColor() {
    return this._backgroundColor;
  }
  public set backgroundColor(color: string) {
    this._backgroundColor = color;
  }

  private _textColor = '';
  public get textColor() {
    return this._textColor;
  }
  public set textColor(color: string) {
    this._textColor = color;
  }

  private _fontFamily = 'Arial';
  public get fontFamily() {
    return this._fontFamily;
  }
  public set fontFamily(family: string) {
    this._fontFamily = family;
  }

  private _fontSize = 16;
  public get fontSize() {
    return this._fontSize;
  }
  public set fontSize(size: number) {
    this._fontSize = size;
  }

  private _showProgress = true;
  public get showProgress() {
    return this._showProgress;
  }
  public set showProgress(show: boolean) {
    this._showProgress = show;
  }

  private _showBubbles = true;
  public get showBubbles() {
    return this._showBubbles;
  }
  public set showBubbles(show: boolean) {
    this._showBubbles = show;
  }

  private _progressFormatter = (value: string): string => `${value}%`;
  public setProgressFormatter(formatter: (value: string) => string) {
    this._progressFormatter = formatter;
  }

  constructor(
    container: HTMLElement,
    config: CircularFluidMeterConfig = {
      fontSize: 100,
      fluidConfiguration: {
        color: '#ff0000',
        waveSpeed: Speed.FAST,
        horizontalSpeed: Speed.NORMAL
      }
    }
  ) {
    super(container);
    this._borderWidth = config.borderWidth || this._borderWidth;
    this._padding = config.padding || this._padding;
    this._progress = config.initialProgress || this.progress;
    this._backgroundColor = config.backgroundColor || this._backgroundColor;
    this._fluidConfiguration = config.fluidConfiguration;
    this._textColor = config.textColor || this._textColor;
    this._showProgress = config.showProgress || this._showProgress;
    this._fontFamily = config.fontFamily || this._fontFamily;
    this._fontSize = config.fontSize || this._fontSize;
    this._showBubbles = config.showBubbles || this._showBubbles;
    this._progressFormatter =
      config.progressFormatter || this._progressFormatter;

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
    this.drawBubbles();
    if (this._showProgress) {
      this.drawText();
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
    const meterRadius = this.calculateCircleRadius();
    this._layers = FluidLayerHelper.buildFluidLayersFromConfiguration(
      this._fluidConfiguration,
      meterRadius
    );
    // values for the bubble layer
    const meterBottomLimit = this.getMeterBottomLimit();
    const minY = meterBottomLimit * 0.85;
    const maxY = meterBottomLimit;

    const yThreshold =
      maxY -
      this.getFluidLevel() +
      this._layers[0].waveAmplitude +
      this._bubbles.averageSize * 2;

    const minX = this._width / 2 - meterRadius;
    const maxX = this._width / 2 + meterRadius;

    this._bubbles.minY = minY;
    this._bubbles.maxY = maxY;
    this._bubbles.minX = minX;
    this._bubbles.maxX = maxX;
    this._bubbles.yThreshold = yThreshold;
    this._bubbles.averageSize = meterRadius * 0.01;
    this._bubbles.reset();
  }

  // bottom limit where fluid gets drawn
  private getMeterBottomLimit(): number {
    return (
      this._height -
      (this._height - this.calculateCircleRadius()) / 2 -
      this._borderWidth
    );
  }

  // returns the line where the fluit makes waves
  private getFluidLevel(): number {
    return (
      (this._progress *
        (this.calculateCircleRadius() - this._borderWidth * 2)) /
      100
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

    const meterBottom = this.getMeterBottomLimit();
    const fluidAmount = this.getFluidLevel();

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

  private drawText(): void {
    const text = this._progressFormatter(this._progress.toString());

    this._context.save();
    this._context.font = `${this._fontSize}px ${this._fontFamily}`;

    this._context.fillStyle = this._textColor;
    this._context.textAlign = 'center';
    this._context.textBaseline = 'middle';
    this._context.filter = 'drop-shadow(0px 0px 5px rgba(0,0,0,0.4))';
    this._context.fillText(text, this._width / 2, this._height / 2);
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
    this._context.save();
    this._context.lineWidth = this._borderWidth;
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

  private drawBubbles() {
    this._context.save();
    this._bubbles.bubbles.forEach((bubble) => {
      bubble.y -= bubble.velY * this._elapsed;

      if (bubble.y <= this._bubbles.yThreshold) {
        this._bubbles.resetBubble(bubble);
      }

      this._context.beginPath();
      this._context.strokeStyle = 'white';
      this._context.arc(
        bubble.x - bubble.r / 2,
        bubble.y - bubble.r / 2,
        bubble.r,
        0,
        2 * Math.PI
      );
      this._context.stroke();
      this._context.closePath();
    });
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
    this._bubbles.reset();
  }
}

export { CircularFluidMeter, CircularFluidMeterConfig };
