/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CircularFluidMeter } from './meters/CircularFluidMeter/CircularFluidMeter';
import './style.css';

const app = document.querySelector<HTMLDivElement>('#app')!;
const meter = new CircularFluidMeter(app);

const button1 = document.querySelector<HTMLButtonElement>('#update-button-1');
const button2 = document.querySelector<HTMLButtonElement>('#update-button-2');
button1?.addEventListener('click', () => {
  meter.targetProgress = 10;
});

button2?.addEventListener('click', () => {
  meter.targetProgress = 75;
});
