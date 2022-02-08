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
  angularSpeed: number;
  frequency: number;
  horizontalSpeed: number;
};

abstract class FluidLayerHelper {
  static buildFluidLayerFromConfiguration(
    configuration: FluidLayerConfiguration,
    meterRadius: number
  ): FluidLayer {
    const result: FluidLayer = {
      angle: 0,
      horizontalPosition: 0,
      color: configuration.color,
      frequency: configuration.frequency,
      waveAmplitude: this.calculateWaveAmplitude(meterRadius),
      horizontalSpeed: configuration.horizontalSpeed,
      waveSpeed: configuration.angularSpeed
    };
    return result;
  }

  private static calculateWaveAmplitude(meterRadius: number): number {
    return meterRadius * 0.025;
  }
}

export { FluidLayer, FluidLayerConfiguration, FluidLayerHelper };
