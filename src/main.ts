/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CircularFluidMeter } from './meters/CircularFluidMeter/CircularFluidMeter';
import { CircularFluidMeterConfig } from './meters/CircularFluidMeter/CircularFluidMeterConfig';
import { Speed } from './meters/CircularFluidMeter/Layers/FluidLayer';

const configurations: CircularFluidMeterConfig[] = [];

configurations.push({
  borderWidth: 22,
  initialProgress: 165,
  maxProgress: 250,
  backgroundColor: '#002d59',
  borderColor: '#3e4954',
  bubbleColor: '#6bcfff',
  fontFamily: 'Codystar',
  fontSize: 34,
  progressFormatter: (value) => {
    return `${value.toFixed(0)}cm²`;
  },
  fluidConfiguration: {
    color: '#1e90ff'
  }
});

configurations.push({
  borderColor: '#567656',
  initialProgress: 45,
  fontSize: 90,
  backgroundColor: '#2d3d2d',
  textColor: '#80cd32',
  fontFamily: 'Creepster',
  progressFormatter: (value) => {
    return value > 50 ? value.toFixed(1) + '!' : value.toFixed(1);
  },
  fluidConfiguration: {
    color: '#adff2f',
    horizontalSpeed: Speed.FAST,
    waveSpeed: Speed.FAST
  }
});

configurations.push({
  initialProgress: 66,
  borderColor: '#2a2a2a',
  backgroundColor: '#270100',
  showBubbles: false,
  borderWidth: 45,
  fontSize: 27,
  progressFormatter: (value) => {
    return value.toFixed(2) + '%';
  },
  fluidConfiguration: {
    color: '#ff4500',
    horizontalSpeed: Speed.SLOW,
    waveSpeed: Speed.SLOW
  }
});

configurations.push({
  initialProgress: 25,
  maxProgress: 500,
  borderColor: '#dadada',
  backgroundColor: '#dadada',
  showBubbles: true,
  borderWidth: 22,
  dropShadow: false,
  padding: 0,
  fontSize: 34,
  progressFormatter: (value) => {
    return `${value.toFixed(0)} / 500`;
  },
  fluidConfiguration: {
    color: '#800080'
  }
});

configurations.push({
  borderWidth: 22,
  initialProgress: 23.2,
  padding: 50,
  use3D: false,
  fontFamily: 'Shizuru',
  backgroundColor: '#002d59',
  borderColor: '#3e4954',
  bubbleColor: '#6bcfff',
  fontSize: 60,
  progressFormatter: (value) => {
    return value.toFixed(1) + '%';
  },
  fluidConfiguration: {
    color: '#1e90ff',
    horizontalSpeed: Speed.FAST,
    waveSpeed: Speed.FAST
  }
});

configurations.push({
  borderWidth: 22,
  initialProgress: 62,
  padding: 50,
  backgroundColor: '#208000',
  borderColor: '#800060',
  showProgress: false,
  showBubbles: false,
  dropShadow: false,
  use3D: false,
  fluidConfiguration: {
    color: '#f8f8ff'
  }
});

const createMeter = (
  container: HTMLDivElement,
  config: CircularFluidMeterConfig
): CircularFluidMeter => {
  const meter = new CircularFluidMeter(
    container.querySelector<HTMLDivElement>('.meter')!,
    config
  );
  const input = container.querySelector<HTMLInputElement>('input');
  const button = container.querySelector<HTMLButtonElement>('button');
  button?.addEventListener('click', () => {
    const progress = Number(input?.value);
    if (isNaN(progress)) {
      alert('invalid progress. Number between 0 and 100');
      return;
    }

    meter.progress = progress;
  });
  return meter;
};

document.addEventListener('DOMContentLoaded', function () {
  createMeter(
    document.querySelector<HTMLDivElement>('#meter-1')!,
    configurations[0]
  );
  const m2 = createMeter(
    document.querySelector<HTMLDivElement>('#meter-2')!,
    configurations[1]
  );
  m2.textShadowColor = '#589100';
  m2.textShadowOpacity = 0.4;

  const m3 = createMeter(
    document.querySelector<HTMLDivElement>('#meter-3')!,
    configurations[2]
  );
  m3.dropShadowColor = '#ff4500';
  createMeter(
    document.querySelector<HTMLDivElement>('#meter-4')!,
    configurations[3]
  );
  createMeter(
    document.querySelector<HTMLDivElement>('#meter-5')!,
    configurations[4]
  );
  createMeter(
    document.querySelector<HTMLDivElement>('#meter-6')!,
    configurations[5]
  );
});
