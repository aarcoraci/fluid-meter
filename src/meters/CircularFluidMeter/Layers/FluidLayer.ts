import { ColorUtils } from '../../../utils/ColorUtils';

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
  color?: string;
  waveSpeed?: Speed;
  horizontalSpeed?: Speed;
};

enum Speed {
  SLOW = 0,
  NORMAL = 1,
  FAST = 2
}

abstract class FluidLayerSettings {
  static readonly ANGULAR_SPEED_NORMAL = Math.PI / 2;
  static readonly ANGULAR_SPEED_FAST = Math.PI;
  static readonly ANGULAR_SPEED_SLOW = Math.PI / 4;

  static readonly HORIZONTAL_SPEED_NORMAL = 55;
  static readonly HORIZONTAL_SPEED_FAST = 155;
  static readonly HORIZONTAL_SPEED_SLOW = 25;
}

abstract class FluidLayerHelper {
  static buildFluidLayersFromConfiguration(
    configuration: FluidLayerConfiguration,
    meterDiameter: number
  ): [FluidLayer, FluidLayer] {
    // determine values
    let waveSpeed = FluidLayerSettings.ANGULAR_SPEED_NORMAL;
    let horizontalSpeed = FluidLayerSettings.HORIZONTAL_SPEED_NORMAL;
    const frequency = this.calculateFrequency(meterDiameter);

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

    const backgroundColor = ColorUtils.pSBC(
      -0.75,
      configuration.color || '#ffffff'
    );
    const waveAmplitude = this.calculateWaveAmplitude(meterDiameter);

    const foreGroundLayer: FluidLayer = {
      angle: 0,
      horizontalPosition: 0,
      color: configuration.color || '#ffffff',
      frequency: frequency,
      waveAmplitude: waveAmplitude,
      horizontalSpeed: horizontalSpeed,
      waveSpeed: waveSpeed
    };

    const backgroundLayer: FluidLayer = {
      angle: 0,
      horizontalPosition: 0,
      color: backgroundColor
        ? backgroundColor
        : configuration.color || '#ffffff',
      frequency: frequency,
      waveAmplitude: waveAmplitude,
      horizontalSpeed: -horizontalSpeed,
      waveSpeed: waveSpeed
    };
    return [backgroundLayer, foreGroundLayer];
  }

  private static calculateWaveAmplitude(meterDiameter: number): number {
    return meterDiameter * 0.021;
  }
  private static calculateFrequency(meterDiameter: number): number {
    return meterDiameter / 11;
  }
}

export { FluidLayer, FluidLayerConfiguration, FluidLayerHelper, Speed };
