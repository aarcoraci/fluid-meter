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
  borderColor: '#dadada',
  backgroundColor: '#dadada',
  showBubbles: true,
  borderWidth: 22,
  dropShadow: false,
  padding: 0,
  fontSize: 65,
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

const mainContainer = document.querySelector<HTMLDListElement>('.meters');
configurations.forEach((configuration) => {
  // create the DOM elements
  const meterContainer = <HTMLDivElement>document.createElement('div');
  meterContainer.classList.add('meter-container');

  mainContainer!.appendChild(meterContainer);

  const meterHTMLElement = <HTMLDivElement>document.createElement('div');
  meterHTMLElement.classList.add('meter');

  meterContainer.appendChild(meterHTMLElement);

  const meter = new CircularFluidMeter(meterHTMLElement, configuration);

  const controlsContainer = <HTMLDivElement>document.createElement('div');
  controlsContainer.classList.add('controls');

  const input = <HTMLInputElement>document.createElement('input');
  input.setAttribute('type', 'number');
  input.setAttribute('placeholder', 'change progress');

  const button = <HTMLButtonElement>document.createElement('button');
  button.innerHTML = 'set';

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

  controlsContainer.appendChild(input);
  controlsContainer.appendChild(button);

  meterContainer.appendChild(controlsContainer);
});
