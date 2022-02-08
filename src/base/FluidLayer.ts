type FluidLayer = {
  waveAmplitude: number;
  waveSpeed: number;
  horizontalSpeed: number;
  horizontalPosition: number;
  angle: number;
};

type FluidLayerConfiguration = {
  color: string;
  angularSpeed: number;
  frequency: number;
  horizontalSpeed: number;
  initialHeight: number;
};

export { FluidLayer, FluidLayerConfiguration };
