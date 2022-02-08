import { BaseMeter } from '../base/BaseMeter';
import { FluidLayer, FluidLayerConfiguration } from '../base/FluidLayer';

type CircularFluidMeterConfig = {
  borderWidth: number;
  padding: number;
  backgroundColor: string;
  backgroundLayer: FluidLayerConfiguration;
};

class CircularFluidMeter extends BaseMeter {
  private _backgroundLayer: FluidLayer;
  private _backgroundLayerConfiguration: FluidLayerConfiguration;
  // protected _foregroundLayer: FluidLayer;

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
      backgroundColor: '#00ff00',
      backgroundLayer: {
        color: '#ff0000',
        horizontalSpeed: 45,
        angularSpeed: Math.PI,
        maxAmplitude: '10%',
        frequency: 40,
        initialHeight: 0
      }
    }
  ) {
    super(container);
    this._borderWidth = config.borderWidth;
    this._padding = config.padding;
    this._backgroundColor = config.backgroundColor;
    this._backgroundLayerConfiguration = config.backgroundLayer;
    // init
    this._backgroundLayer = {
      angle: 0,
      waveSpeed: 0,
      horizontalPosition: 0,
      waveAmplitude: 0,
      horizontalSpeed: 0
    };
    // calculation
    this.calculateDrawingValues();
  }

  protected draw(): void {
    this.clear();
    this._context.save();
    this._context.arc(
      this._width / 2,
      this._height / 2,
      this.getMeterRadius() / 2 - this._borderWidth,
      0,
      Math.PI * 2
    );
    this._context.clip();
    this.drawBackground();
    this.drawLayer(this._backgroundLayer, this._backgroundLayerConfiguration);
    // clip any "fluid" outside the meter
    this._context.restore();
    // can draw in whole canvas again
    this.drawForeground();
  }

  private clear() {
    this._context.clearRect(0, 0, this._width, this._height);
  }

  private calculateDrawingValues(): void {
    this._backgroundLayer.waveAmplitude = this.calculateWaveAmplitude(
      this._backgroundLayerConfiguration
    );
    this._backgroundLayer.horizontalSpeed = this.calculateHorizontalSpeed(
      this._backgroundLayerConfiguration
    );
    this._backgroundLayer.waveSpeed = this.calculateWaveSpeed(
      this._backgroundLayer,
      this._backgroundLayerConfiguration
    );
  }

  private calculateHorizontalSpeed(
    layerConfiguration: FluidLayerConfiguration
  ): number {
    let result = 0;
    if (typeof layerConfiguration.horizontalSpeed === 'number') {
      result = layerConfiguration.horizontalSpeed;
    } else if (typeof layerConfiguration.horizontalSpeed === 'string') {
      const percentage = parseFloat(layerConfiguration.horizontalSpeed);
      result = (percentage / 100) * this._width;
    }

    return result;
  }

  private calculateWaveAmplitude(
    layerConfiguration: FluidLayerConfiguration
  ): number {
    let result = 0;

    if (typeof layerConfiguration.maxAmplitude == 'number') {
      result = layerConfiguration.maxAmplitude;
    } else if (typeof layerConfiguration.maxAmplitude == 'string') {
      const percentage = parseFloat(layerConfiguration.maxAmplitude);
      if (this._height > this._width) {
        result = (percentage / 2 / 100) * (this._width * 0.15 - this._padding);
      } else {
        result = (percentage / 2 / 100) * (this._height * 0.15 - this._padding);
      }
    }
    return result;
  }

  private calculateWaveSpeed(
    layer: FluidLayer,
    layerConfiguration: FluidLayerConfiguration
  ): number {
    let result = 0;
    if (typeof layerConfiguration.angularSpeed === 'number') {
      result = layerConfiguration.angularSpeed;
    } else if (typeof layerConfiguration.angularSpeed === 'string') {
      const percentage = parseFloat(layerConfiguration.angularSpeed);
      result = ((percentage / 100) * layer.waveAmplitude * Math.PI) / 180;
    }

    return result;
  }

  private drawLayer(
    layer: FluidLayer,
    layerConfiguration: FluidLayerConfiguration
  ) {
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
      (this._height - this.getMeterRadius()) / 2 -
      this._borderWidth;
    const fluidAmount =
      (this._progress * (this.getMeterRadius() - this._borderWidth * 2)) / 100;

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
        amplitude *
          Math.sin(
            (x + layer.horizontalPosition) / layerConfiguration.frequency
          );
      this._context.lineTo(x, y);
      x++;
    }

    this._context.lineTo(x, this._height);
    this._context.lineTo(0, this._height);
    this._context.closePath();

    this._context.fillStyle = layerConfiguration.color;
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

  private drawForeground(): void {
    this._context.lineWidth = this._borderWidth;
    this._context.save();
    this._context.strokeStyle = '#0000ff';
    this._context.beginPath();
    this._context.arc(
      this._width / 2,
      this._height / 2,
      this.getMeterRadius() / 2 - this._borderWidth / 2,
      0,
      2 * Math.PI
    );
    this._context.closePath();
    this._context.stroke();
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
