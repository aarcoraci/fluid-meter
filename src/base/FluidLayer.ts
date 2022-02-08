type FluidLayer = {
  waveAmplitude: number;
  waveSpeed: number;
  horizontalPosition: number;
  angle: number;
};

type FluidLayerConfiguration = {
  color: string;
  angularSpeed: number;
  maxAmplitude: number | string;
  frequency: number;
  horizontalSpeed: number | string;
  initialHeight: number;
};

export { FluidLayer, FluidLayerConfiguration };
