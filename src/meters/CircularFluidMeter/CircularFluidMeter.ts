import { BaseMeter } from '../../base/BaseMeter';
import { BubblesLayer } from './Layers/BubblesLayer';
import {
  FluidLayer,
  FluidLayerConfiguration,
  FluidLayerHelper
} from './Layers/FluidLayer';
import { ColorUtils } from '../../utils/ColorUtils';
import {
  CircularFluidMeterConfig,
  defaultConfig
} from './CircularFluidMeterConfig';
import {
  BreakpointValueConfig,
  getResponsiveValue
} from '../../utils/ResponsiveUtils';

class CircularFluidMeter extends BaseMeter {
  private _fluidConfiguration: FluidLayerConfiguration;
  private _layers?: [FluidLayer, FluidLayer];
  private _bubbles = new BubblesLayer();
  private _meterRadius = 0;

  private _progress = 33;
  public get progress() {
    return this._progress;
  }
  public set progress(progress: number) {
    this._progress = progress;
  }

  private _calculatedBorderWidth = 0;
  private _borderWidth: number | BreakpointValueConfig[];
  public get borderWidth() {
    return this._borderWidth;
  }
  public set borderWidth(borderWidth: number | BreakpointValueConfig[]) {
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

  private _backgroundColor = '#ff00ff';
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

  private _calculatedFontSize = 0;
  private _fontSize: number | BreakpointValueConfig[];
  public get fontSize() {
    return this._fontSize;
  }
  public set fontSize(size: number | BreakpointValueConfig[]) {
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

  private _bubbleColor = '#ffffff';
  public get bubbleColor() {
    return this._bubbleColor;
  }
  public set bubbleColor(color: string) {
    this._bubbleColor = color;
  }

  private _use3D = true;
  public get use3D() {
    return this._use3D;
  }
  public set use3D(show: boolean) {
    this._use3D = show;
  }

  private _dropShadow = true;
  public get dropShadow() {
    return this._dropShadow;
  }
  public set dropShadow(drop: boolean) {
    this._dropShadow = drop;
  }

  private _progressFormatter = (value: string): string => `${value}%`;
  public setProgressFormatter(formatter: (value: string) => string) {
    this._progressFormatter = formatter;
  }

  constructor(container: HTMLElement, config?: CircularFluidMeterConfig) {
    super(container);
    const computedConfig: Required<CircularFluidMeterConfig> = {
      ...defaultConfig,
      ...config
    };

    this._borderWidth = computedConfig.borderWidth;
    this._padding = computedConfig.padding;
    this._progress = computedConfig.initialProgress;
    this._backgroundColor = computedConfig.backgroundColor;
    this._fluidConfiguration = computedConfig.fluidConfiguration;
    this._textColor = computedConfig.textColor;
    this._showProgress = computedConfig.showProgress;
    this._fontFamily = computedConfig.fontFamily;
    this._fontSize = computedConfig.fontSize;
    this._showBubbles = computedConfig.showBubbles;
    this._use3D = computedConfig.use3D;
    this._dropShadow = computedConfig.dropShadow;
    this._progressFormatter = computedConfig.progressFormatter;

    this.calculateDrawingValues();
  }

  protected draw(): void {
    this.clear();

    if (this._dropShadow) {
      this._context.save();
      this._context.beginPath();
      this._context.filter = 'drop-shadow(0px 4px 6px rgba(0,0,0,0.45))';
      this._context.arc(
        this._width / 2,
        this._height / 2,
        this._meterRadius / 2,
        0,
        2 * Math.PI
      );
      this._context.closePath();
      this._context.fill();
      this._context.restore();
    }

    this._context.save();
    this._context.arc(
      this._width / 2,
      this._height / 2,
      this._meterRadius / 2 - this._calculatedBorderWidth,
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

  /**
   * calculates the values required to correctly draw all components.
   * should be called on init and on resize or when some key value
   * changes such as border width or padding
   */
  private calculateDrawingValues(): void {
    this._meterRadius = this.calculateCircleRadius();
    this._layers = FluidLayerHelper.buildFluidLayersFromConfiguration(
      this._fluidConfiguration,
      this._meterRadius
    );

    // responsive (if required)
    const screenWidth = window.innerWidth;
    if (typeof this._borderWidth == 'number') {
      this._calculatedBorderWidth = this._borderWidth;
    } else {
      this._calculatedBorderWidth = getResponsiveValue(
        screenWidth,
        this._borderWidth
      );
    }

    if (typeof this._fontSize == 'number') {
      this._calculatedFontSize = this._fontSize;
    } else {
      this._calculatedFontSize = getResponsiveValue(
        screenWidth,
        this._fontSize
      );
    }

    // values for the bubble layer
    const meterBottomLimit = this.getMeterBottomLimit();
    const minY = meterBottomLimit * 0.85;
    const maxY = meterBottomLimit;

    const yThreshold =
      maxY -
      this.getFluidLevel() +
      this._layers[0].waveAmplitude +
      this._bubbles.averageSize * 2;

    const minX = this._width / 2 - this._meterRadius;
    const maxX = this._width / 2 + this._meterRadius;

    this._bubbles.minY = minY;
    this._bubbles.maxY = maxY;
    this._bubbles.minX = minX;
    this._bubbles.maxX = maxX;
    this._bubbles.yThreshold = yThreshold;
    this._bubbles.averageSize = this._meterRadius * 0.01;
    this._bubbles.reset();
  }

  // bottom limit where fluid gets drawn
  private getMeterBottomLimit(): number {
    return (
      this._height -
      (this._height - this._meterRadius) / 2 -
      this._calculatedBorderWidth
    );
  }

  // returns the line where the fluid makes waves
  private getFluidLevel(): number {
    return (
      (this._progress * (this._meterRadius - this._calculatedBorderWidth * 2)) /
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
    this._context.font = `${this._calculatedFontSize}px ${this._fontFamily}`;

    this._context.fillStyle = this._textColor;
    this._context.textAlign = 'center';
    this._context.textBaseline = 'middle';
    this._context.filter = 'drop-shadow(0px 0px 5px rgba(0,0,0,0.4))';
    this._context.fillText(text, this._width / 2, this._height / 2);
    this._context.restore();
  }

  private drawBackground(): void {
    this._context.save();
    this._context.beginPath();
    this._context.arc(
      this._width / 2,
      this._height / 2,
      this._meterRadius / 2 - this._calculatedBorderWidth,
      0,
      2 * Math.PI
    );
    this._context.closePath();

    if (this._use3D) {
      const x1 = this._width / 2;
      const y1 = this._height / 2;
      const r1 = this._meterRadius * 0.1;
      const grd = this._context.createRadialGradient(
        x1,
        y1,
        r1,
        x1,
        y1,
        this._meterRadius
      );
      const startColor = this._backgroundColor;
      const endColor = ColorUtils.pSBC(-0.8, this.backgroundColor);

      grd.addColorStop(0, startColor);
      if (endColor) {
        grd.addColorStop(1, endColor);
      }
      this._context.fillStyle = grd;
    } else {
      this._context.fillStyle = this.backgroundColor;
      this._context.fill();
    }

    this._context.fill();
    this._context.restore();
  }

  private drawForeground(): void {
    this._context.save();
    this._context.lineWidth = this._calculatedBorderWidth;
    this._context.strokeStyle = '#0000ff';
    this._context.beginPath();
    this._context.arc(
      this._width / 2,
      this._height / 2,
      this._meterRadius / 2 - this._calculatedBorderWidth / 2,
      0,
      2 * Math.PI
    );
    this._context.closePath();
    this._context.stroke();
    this._context.restore();

    // details

    if (this._use3D) {
      this._context.save();
      this._context.filter = 'blur(10px) blur(15px) opacity(0.65)';
      let x = this._width / 2 - this._meterRadius / 6;
      let y = this._height / 2 - this._meterRadius / 6;
      let size = this._meterRadius * 0.095;
      this._context.fillStyle = 'white';
      this._context.beginPath();
      this._context.arc(x, y, size, 0, 2 * Math.PI);
      this._context.closePath();
      this._context.fill();
      this._context.restore();

      this._context.save();
      this._context.filter = 'blur(8px)  opacity(0.39)';
      x = this._width / 2 + this._meterRadius / 4.3;
      y = this._height / 2 + this._meterRadius / 4.3;
      size = this._meterRadius * 0.045;
      this._context.fillStyle = 'white';
      this._context.beginPath();
      this._context.arc(x, y, size, 0, 2 * Math.PI);
      this._context.closePath();
      this._context.fill();
      this._context.restore();
    }
  }

  private drawBubbles() {
    this._context.save();
    this._bubbles.bubbles.forEach((bubble) => {
      bubble.update(this._elapsed);
      if (bubble.isDead) {
        this._bubbles.resetBubble(bubble);
      }

      this._context.beginPath();
      this._context.strokeStyle = this._bubbleColor;
      this._context.arc(
        bubble.x - bubble.currentRadius / 2,
        bubble.y - bubble.currentRadius / 2,
        bubble.currentRadius,
        0,
        2 * Math.PI
      );
      this._context.filter = `opacity(${bubble.currentOpacity})`;
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

export { CircularFluidMeter };
