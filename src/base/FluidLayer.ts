import { ColorUtils } from '../utils/ColorUtils';

type FluidLayer = {
  waveAmplitude: number;
  waveSpeed: number;
  horizontalSpeed: number;
  horizontalPosition: number;
  angle: number;
  color: string;
  frequency: number;
};

type FluidLayerConfiguration = {
  color: string;
  waveSpeed: Speed;
  horizontalSpeed: Speed;
};

enum Speed {
  NORMAL,
  FAST,
  SLOW
}

abstract class FluidLayerSettings {
  static readonly ANGULAR_SPEED_NORMAL = Math.PI / 2;
  static readonly ANGULAR_SPEED_FAST = Math.PI;
  static readonly ANGULAR_SPEED_SLOW = Math.PI / 4;

  static readonly FREQUENCY_NORMAL = 55;

  static readonly HORIZONTAL_SPEED_NORMAL = 55;
  static readonly HORIZONTAL_SPEED_FAST = 155;
  static readonly HORIZONTAL_SPEED_SLOW = 25;
}

abstract class FluidLayerHelper {
  static buildFluidLayersFromConfiguration(
    configuration: FluidLayerConfiguration,
    meterRadius: number
  ): [FluidLayer, FluidLayer] {
    // determine values
    let waveSpeed = FluidLayerSettings.ANGULAR_SPEED_NORMAL;
    let horizontalSpeed = FluidLayerSettings.HORIZONTAL_SPEED_NORMAL;
    const frequency = FluidLayerSettings.FREQUENCY_NORMAL;

    switch (configuration.horizontalSpeed) {
      case Speed.FAST:
        horizontalSpeed = FluidLayerSettings.HORIZONTAL_SPEED_FAST;
        break;
      case Speed.SLOW:
        horizontalSpeed = FluidLayerSettings.HORIZONTAL_SPEED_SLOW;
        break;
      default:
        horizontalSpeed = FluidLayerSettings.HORIZONTAL_SPEED_NORMAL;
        break;
    }

    switch (configuration.waveSpeed) {
      case Speed.FAST:
        waveSpeed = FluidLayerSettings.ANGULAR_SPEED_FAST;
        break;
      case Speed.SLOW:
        waveSpeed = FluidLayerSettings.ANGULAR_SPEED_SLOW;
        break;
      default:
        waveSpeed = FluidLayerSettings.ANGULAR_SPEED_NORMAL;
        break;
    }

    const backgroundColor = ColorUtils.pSBC(-0.4, configuration.color);

    const foreGroundLayer: FluidLayer = {
      angle: 0,
      horizontalPosition: 0,
      color: configuration.color,
      frequency: frequency,
      waveAmplitude: this.calculateWaveAmplitude(meterRadius),
      horizontalSpeed: horizontalSpeed,
      waveSpeed: waveSpeed
    };

    const backgroundLayer: FluidLayer = {
      angle: 0,
      horizontalPosition: 0,
      color: backgroundColor ? backgroundColor : configuration.color,
      frequency: frequency,
      waveAmplitude: this.calculateWaveAmplitude(meterRadius),
      horizontalSpeed: -horizontalSpeed,
      waveSpeed: waveSpeed
    };
    return [backgroundLayer, foreGroundLayer];
  }

  private static calculateWaveAmplitude(meterRadius: number): number {
    return meterRadius * 0.021;
  }
}

export { FluidLayer, FluidLayerConfiguration, FluidLayerHelper, Speed };
