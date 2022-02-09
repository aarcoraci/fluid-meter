import { BreakpointValueConfig } from '../../utils/ResponsiveUtils';
import { FluidLayerConfiguration, Speed } from './Layers/FluidLayer';

type CircularFluidMeterConfig = {
  initialProgress?: number;
  borderWidth?: number | BreakpointValueConfig[];
  padding?: number;
  backgroundColor?: string;
  showProgress?: boolean;
  showBubbles?: boolean;
  bubbleColor?: string;
  textColor?: string;
  fluidConfiguration: FluidLayerConfiguration;
  fontFamily?: string;
  fontSize?: number | BreakpointValueConfig[];
  use3D?: boolean;
  dropShadow?: boolean;
  progressFormatter?: (value: string) => string;
};

const defaultConfig: Required<CircularFluidMeterConfig> = {
  initialProgress: 50,
  borderWidth: [
    { resolution: 0, value: 10 },
    { resolution: 768, value: 15 },
    { resolution: 1440, value: 25 }
  ],
  padding: 30,
  backgroundColor: '#c3c3c3',
  showProgress: true,
  showBubbles: true,
  bubbleColor: '#ffffff',
  textColor: '#ffffff',
  fontFamily: 'Arial',
  fontSize: [
    { resolution: 0, value: 13 },
    { resolution: 320, value: 30 },
    { resolution: 718, value: 120 },
    { resolution: 1440, value: 150 }
  ],
  use3D: true,
  dropShadow: true,
  progressFormatter: (value: string) => value,
  fluidConfiguration: {
    color: '#ff0000',
    waveSpeed: Speed.NORMAL,
    horizontalSpeed: Speed.NORMAL
  }
};

export { CircularFluidMeterConfig, defaultConfig };
