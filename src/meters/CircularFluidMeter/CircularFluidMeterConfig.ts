import { BreakpointValueConfig } from '../../utils/ResponsiveUtils';
import { FluidLayerConfiguration, Speed } from './Layers/FluidLayer';

type CircularFluidMeterConfig = {
  initialProgress?: number;
  borderWidth?: number | BreakpointValueConfig[];
  borderColor?: string;
  padding?: number;
  backgroundColor?: string;
  showProgress?: boolean;
  showBubbles?: boolean;
  bubbleColor?: string;
  textColor?: string;
  textDropShadow?: boolean;
  fluidConfiguration?: FluidLayerConfiguration;
  fontFamily?: string;
  fontSize?: number | BreakpointValueConfig[];
  use3D?: boolean;
  dropShadow?: boolean;
  progressFormatter?: (value: number) => string;
};

const defaultConfig: Required<CircularFluidMeterConfig> = {
  initialProgress: 0,
  borderWidth: [
    { resolution: 0, value: 10 },
    { resolution: 768, value: 15 },
    { resolution: 1440, value: 30 }
  ],
  borderColor: '#75758b',
  padding: 30,
  backgroundColor: '#9f9fae',
  showProgress: true,
  showBubbles: true,
  bubbleColor: '#ffffff',
  textColor: '#ffffff',
  textDropShadow: true,
  fontFamily: 'Arial',
  fontSize: [
    { resolution: 0, value: 13 },
    { resolution: 320, value: 30 },
    { resolution: 718, value: 90 },
    { resolution: 1440, value: 95 }
  ],
  use3D: true,
  dropShadow: true,
  progressFormatter: (value: number) => Math.round(value).toString(),
  fluidConfiguration: {
    color: '#ff0000',
    waveSpeed: Speed.NORMAL,
    horizontalSpeed: Speed.NORMAL
  }
};

export { CircularFluidMeterConfig, defaultConfig };
