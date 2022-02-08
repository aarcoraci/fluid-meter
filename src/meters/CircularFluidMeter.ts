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
      padding: 15,
      backgroundColor: '#00ff00',
      backgroundLayer: {
        color: '#ff0000',
        horizontalSpeed: '199%',
        angularSpeed: 140,
        maxAmplitude: '15%',
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
      horizontalPosition: 0,
      waveAmplitude: 0,
      waveSpeed: 0
    };
    // calculation
    this.calculateDrawingValues();
  }

  protected draw(): void {
    this.clear();
    this.drawBackground();
    this.drawLayer(this._backgroundLayer, this._backgroundLayerConfiguration);
  }

  private clear() {
    this._context.clearRect(0, 0, this._width, this._height);
  }

  private calculateDrawingValues(): void {
    this._backgroundLayer.waveAmplitude = this.calculateWaveAmplitude(
      this._backgroundLayerConfiguration
    );
    this._backgroundLayer.waveSpeed = this.calculateWaveSpeed(
      this._backgroundLayerConfiguration
    );
  }

  private calculateWaveSpeed(
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
        result = (percentage / 2 / 100) * (this._width - this._padding * 2);
      } else {
        result = (percentage / 2 / 100) * (this._height - this._padding * 2);
      }
    }

    return result;
  }

  private drawLayer(
    layer: FluidLayer,
    layerConfiguration: FluidLayerConfiguration
  ) {
    // calculate wave angle
    if (layerConfiguration.angularSpeed > 0) {
      layer.angle += layerConfiguration.angularSpeed * this._elapsed;
      layer.angle = layer.angle < 0 ? layer.angle + 360 : layer.angle;
    }

    // calculate horizontal position
    layer.horizontalPosition += layer.waveSpeed * this._elapsed;
    // if (layer.horizontalSpeed > 0) {
    //   horizontalPosition =
    //     horizontalPosition > Math.pow(2, 53) ? 0 : horizontalPosition;
    // } else if (horizontalPosition < 0) {
    //   layer.horizontalPosition < -1 * Math.pow(2, 53)
    //     ? 0
    //     : layer.horizontalPosition;
    // }

    let x = 0;
    let y = 0;
    const amplitude =
      layer.waveAmplitude * Math.sin((layer.angle * Math.PI) / 180);

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
