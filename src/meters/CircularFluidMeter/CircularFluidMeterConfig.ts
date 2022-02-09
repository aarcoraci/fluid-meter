import { FluidLayerConfiguration, Speed } from './Layers/FluidLayer';

type CircularFluidMeterConfig = {
  initialProgress?: number;
  borderWidth?: number;
  padding?: number;
  backgroundColor?: string;
  showProgress?: boolean;
  showBubbles?: boolean;
  textColor?: string;
  fluidConfiguration: FluidLayerConfiguration;
  fontFamily?: string;
  fontSize?: number;
  use3D?: boolean;
  progressFormatter?: (value: string) => string;
};

const defaultConfig: Required<CircularFluidMeterConfig> = {
  initialProgress: 33,
  borderWidth: 25,
  padding: 15,
  backgroundColor: '#c3c3c3',
  showProgress: true,
  showBubbles: true,
  textColor: '#ffffff',
  fontFamily: 'Arial',
  fontSize: 55,
  use3D: true,
  progressFormatter: (value: string) => value,
  fluidConfiguration: {
    color: '#ff0000',
    waveSpeed: Speed.NORMAL,
    horizontalSpeed: Speed.NORMAL
  }
};

export { CircularFluidMeterConfig, defaultConfig };
