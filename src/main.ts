/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CircularFluidMeter } from './meters/CircularFluidMeter/CircularFluidMeter';
import { CircularFluidMeterConfig } from './meters/CircularFluidMeter/CircularFluidMeterConfig';
import { Speed } from './meters/CircularFluidMeter/Layers/FluidLayer';

import './style.css';

const configurations: Partial<CircularFluidMeterConfig>[] = [];

configurations.push({
  borderWidth: 22,
  initialProgress: 75,
  backgroundColor: '#002d59',
  borderColor: '#3e4954',
  bubbleColor: '#6bcfff',
  fontSize: 60,
  fluidConfiguration: {
    color: '#1e90ff'
  }
});

configurations.push({
  borderColor: '#567656',
  initialProgress: 33,
  backgroundColor: '#2d3d2d',
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
    return value + '%';
  },
  fluidConfiguration: {
    color: '#ff4500',
    horizontalSpeed: Speed.SLOW,
    waveSpeed: Speed.SLOW
  }
});

const meterContainerElements =
  document.querySelectorAll<HTMLDivElement>('.meter-container');

let i = 0;
meterContainerElements.forEach((currentMeterContainer) => {
  const meterHTMLElement =
    currentMeterContainer.querySelector<HTMLDivElement>('.meter')!;
  const meter = new CircularFluidMeter(meterHTMLElement, configurations[i]);
  // controls
  const input = currentMeterContainer.querySelector<HTMLInputElement>('input');
  const button =
    currentMeterContainer.querySelector<HTMLButtonElement>('button');
  button?.addEventListener('click', () => {
    const progress = Number(input?.value);
    if (progress) {
      if (isNaN(progress)) {
        alert('invalid progress. Number between 0 and 100');
      }

      if (progress < 0 || progress > 100) {
        alert('invalid progress. Number between 0 and 100');
      }

      meter.targetProgress = progress;
    }
  });
  i++;
});
