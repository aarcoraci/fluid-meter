import { BreakpointValueConfig } from '../../utils/ResponsiveUtils';
import { FluidLayerConfiguration, Speed } from './Layers/FluidLayer';

type CircularFluidMeterConfig = {
  initialProgress?: number;
  maxProgress?: number;
  borderWidth?: number | BreakpointValueConfig[];
  borderColor?: string;
  padding?: number;
  backgroundColor?: string;
  showProgress?: boolean;
  showBubbles?: boolean;
  bubbleColor?: string;
  textColor?: string;
  textDropShadow?: boolean;
  textShadowOpacity?: number;
  textShadowColor?: string;
  fluidConfiguration?: FluidLayerConfiguration;
  fontFamily?: string;
  fontSize?: number | BreakpointValueConfig[];
  use3D?: boolean;
  dropShadow?: boolean;
  dropShadowColor?: string;
  progressFormatter?: (value: number) => string;
};

const defaultConfig: Required<CircularFluidMeterConfig> = {
  initialProgress: 0,
  maxProgress: 100,
  borderWidth: 30,
  borderColor: '#75758b',
  padding: 30,
  backgroundColor: '#9f9fae',
  showProgress: true,
  showBubbles: true,
  bubbleColor: '#ffffff',
  textColor: '#ffffff',
  textDropShadow: true,
  textShadowOpacity: 1,
  textShadowColor: '#000000',
  fontFamily: 'Arial',
  fontSize: 30,
  use3D: true,
  dropShadow: true,
  dropShadowColor: '#000000',
  progressFormatter: (value: number) => Math.round(value).toString(),
  fluidConfiguration: {
    color: '#ff0000',
    waveSpeed: Speed.NORMAL,
    horizontalSpeed: Speed.NORMAL
  }
};

export { CircularFluidMeterConfig, defaultConfig };
