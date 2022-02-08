type FluidLayer = {
  waveAmplitude: number;
  waveSpeed: number;
  horizontalSpeed: number;
  horizontalPosition: number;
  angle: number;
};

type FluidLayerConfiguration = {
  color: string;
  angularSpeed: number | string;
  maxAmplitude: number | string;
  frequency: number;
  horizontalSpeed: number | string;
  initialHeight: number;
};

export { FluidLayer, FluidLayerConfiguration };
