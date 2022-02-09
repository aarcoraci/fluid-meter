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
  private _meterDiameter = 0;

  private _targetProgress: number;
  public get targetProgress() {
    return this._targetProgress;
  }
  public set targetProgress(value: number) {
    this._targetProgress = value;
  }

  private _progress: number;
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

  private _borderColor = '#ff00ff';
  public get borderColor() {
    return this._borderColor;
  }
  public set borderColor(color: string) {
    this._borderColor = color;
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

  private _textDropShadow = true;
  public get textDropShadow() {
    return this._textDropShadow;
  }
  public set textDropShadow(dropShadow: boolean) {
    this._textDropShadow = dropShadow;
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

  private _progressFormatter = (value: number): string => `${value}%`;
  public setProgressFormatter(formatter: (value: number) => string) {
    this._progressFormatter = formatter;
  }

  constructor(container: HTMLElement, config?: CircularFluidMeterConfig) {
    super(container);
    const computedConfig: Required<CircularFluidMeterConfig> = {
      ...defaultConfig,
      ...config
    };

    this._borderWidth = computedConfig.borderWidth;
    this._borderColor = computedConfig.borderColor;
    this._padding = computedConfig.padding;
    this._progress = computedConfig.initialProgress;
    this._targetProgress = this._progress;
    this._backgroundColor = computedConfig.backgroundColor;
    this._fluidConfiguration = computedConfig.fluidConfiguration;
    this._textColor = computedConfig.textColor;
    this._textDropShadow = computedConfig.textDropShadow;
    this._showProgress = computedConfig.showProgress;
    this._fontFamily = computedConfig.fontFamily;
    this._fontSize = computedConfig.fontSize;
    this._showBubbles = computedConfig.showBubbles;
    this._bubbleColor = computedConfig.bubbleColor;
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
        this._meterDiameter / 2,
        0,
        2 * Math.PI
      );
      this._context.closePath();
      this._context.fill();
      this._context.restore();
    }

    this.drawBackground();

    // #region clip
    this._context.save();
    this._context.arc(
      this._width / 2,
      this._height / 2,
      this._meterDiameter / 2 - this._calculatedBorderWidth,
      0,
      Math.PI * 2
    );
    this._context.clip();
    // #endregion

    if (this._layers) {
      this.drawLayer(this._layers[0], false);
      this.drawLayer(this._layers[1]);
    }
    if (this._showBubbles) {
      this.drawBubbles();
    }
    if (this._showProgress) {
      this.drawText();
    }

    // restore clip
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
    this._meterDiameter = this.calculateMeterDiameter();

    this._layers = FluidLayerHelper.buildFluidLayersFromConfiguration(
      this._fluidConfiguration,
      this._meterDiameter
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
    this.updateBubbleLayer();
    this._bubbles.reset();
  }

  private updateBubbleLayer() {
    const meterBottomLimit = this.getMeterBottomLimit();

    let yThreshold = this.getFluidLevel();
    if (this._layers) {
      yThreshold += this._layers[0].waveAmplitude;
    }

    let minY = meterBottomLimit * 0.85;
    if (minY < yThreshold) {
      minY = yThreshold;
    }
    const maxY = meterBottomLimit;

    const minX = this._width / 2 - this._meterDiameter / 2;
    const maxX = this._width / 2 + this._meterDiameter / 2;

    this._bubbles.minY = minY;
    this._bubbles.maxY = maxY;
    this._bubbles.minX = minX;
    this._bubbles.maxX = maxX;
    this._bubbles.yThreshold = yThreshold;
    this._bubbles.averageSize = this._meterDiameter * 0.006;
    this._bubbles.averageSpeed = (this._meterDiameter * 2) / 14; // should take X seconds to go from bottom to top
    this._bubbles.speedDeviation = this._bubbles.averageSpeed * 0.25;
  }

  // bottom limit where fluid gets drawn
  private getMeterBottomLimit(): number {
    return this._height - (this._height - this._meterDiameter) / 2;
  }

  // returns the line where the fluid makes waves
  private getFluidLevel(): number {
    const meterFillPercentage = (this._meterDiameter * this._progress) / 100;
    return this.getMeterBottomLimit() - meterFillPercentage;
  }

  private drawLayer(layer: FluidLayer, canUse3d = true) {
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

    if (this._progress < this._targetProgress) {
      this.progress += 15 * this._elapsed;
      this.updateBubbleLayer();
    } else if (this._progress > this._targetProgress) {
      this.progress -= 15 * this._elapsed;
      this.updateBubbleLayer();
    }

    this._context.save();
    this._context.beginPath();

    this._context.lineTo(0, fluidAmount);

    while (x < this._width) {
      y =
        fluidAmount +
        amplitude * Math.sin((x + layer.horizontalPosition) / layer.frequency);
      this._context.lineTo(x, y);

      x++;
    }

    this._context.lineTo(x, this._height);
    this._context.lineTo(0, this._height);
    this._context.closePath();

    if (this._use3D && canUse3d) {
      const x1 = this._width / 2;
      const y1 = meterBottom;
      const r1 = this._meterDiameter * 0.01;
      const gradientBackgroundFill = this._context.createRadialGradient(
        x1,
        y1,
        r1,
        x1,
        y1,
        this._meterDiameter * 0.45
      );
      const startColor = layer.color;
      const endColor = ColorUtils.pSBC(-0.8, layer.color);

      gradientBackgroundFill.addColorStop(0, startColor);
      if (endColor) {
        gradientBackgroundFill.addColorStop(1, endColor);
      }
      this._context.fillStyle = gradientBackgroundFill;
    } else {
      this._context.fillStyle = layer.color;
    }

    this._context.fill();
    this._context.restore();
  }

  private drawText(): void {
    const text = this._progressFormatter(this._progress);

    this._context.save();
    this._context.font = `${this._calculatedFontSize}px ${this._fontFamily}`;

    this._context.fillStyle = this._textColor;
    this._context.textAlign = 'center';
    this._context.textBaseline = 'middle';
    if (this._textDropShadow) {
      this._context.filter = 'drop-shadow(0px 0px 5px rgba(0,0,0,0.4))';
    }
    this._context.fillText(text, this._width / 2, this._height / 2);
    this._context.restore();
  }

  private drawBackground(): void {
    this._context.save();
    this._context.beginPath();
    this._context.arc(
      this._width / 2,
      this._height / 2,
      this._meterDiameter / 2 - this._calculatedBorderWidth,
      0,
      2 * Math.PI
    );
    this._context.closePath();

    if (this._use3D) {
      const x1 = this._width / 2;
      const y1 = this._height / 2;
      const r1 = this._meterDiameter * 0.1;
      const gradientBackgroundFill = this._context.createRadialGradient(
        x1,
        y1,
        r1,
        x1,
        y1,
        this._meterDiameter * 0.75
      );
      const startColor = this._backgroundColor;
      const endColor = ColorUtils.pSBC(-0.8, this.backgroundColor);

      gradientBackgroundFill.addColorStop(0, startColor);
      if (endColor) {
        gradientBackgroundFill.addColorStop(0.9, endColor);
      }
      this._context.fillStyle = gradientBackgroundFill;
    } else {
      this._context.fillStyle = this.backgroundColor;
    }

    this._context.fill();
    this._context.restore();
  }

  private drawForeground(): void {
    this._context.save();
    this._context.lineWidth = this._calculatedBorderWidth;
    this._context.strokeStyle = this._borderColor;
    this._context.beginPath();
    this._context.arc(
      this._width / 2,
      this._height / 2,
      this._meterDiameter / 2 - this._calculatedBorderWidth / 2,
      0,
      2 * Math.PI
    );
    this._context.closePath();
    this._context.stroke();

    // inner border
    const innerBorderColor = ColorUtils.pSBC(-0.35, this._borderColor);
    this._context.lineWidth = this._calculatedBorderWidth * 0.25;
    this._context.strokeStyle = innerBorderColor || this._borderColor;
    this._context.beginPath();
    this._context.arc(
      this._width / 2,
      this._height / 2,
      this._meterDiameter / 2 - this._calculatedBorderWidth * 0.85,
      0,
      2 * Math.PI
    );
    this._context.closePath();
    this._context.stroke();

    // outer border
    const outerBorderColor = ColorUtils.pSBC(0.05, this._borderColor);
    const outerBorderWidth = this._calculatedBorderWidth * 0.15;
    this._context.lineWidth = outerBorderWidth;
    this._context.strokeStyle = outerBorderColor || this._borderColor;
    this._context.beginPath();
    this._context.arc(
      this._width / 2,
      this._height / 2,
      this._meterDiameter / 2 - outerBorderWidth / 2,
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
      let x = this._width / 2 - this._meterDiameter / 6;
      let y = this._height / 2 - this._meterDiameter / 6;
      let size = this._meterDiameter * 0.095;
      this._context.fillStyle = 'white';
      this._context.beginPath();
      this._context.arc(x, y, size, 0, 2 * Math.PI);
      this._context.closePath();
      this._context.fill();
      this._context.restore();

      this._context.save();
      this._context.filter = 'blur(8px)  opacity(0.39)';
      x = this._width / 2 + this._meterDiameter / 4.3;
      y = this._height / 2 + this._meterDiameter / 4.3;
      size = this._meterDiameter * 0.045;
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
      if (bubble.isDead || bubble.y < this._bubbles.yThreshold) {
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

  private calculateMeterDiameter(): number {
    if (this._width >= this._height) {
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
