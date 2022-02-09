/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CircularFluidMeter } from './meters/CircularFluidMeter/CircularFluidMeter';
import './style.css';

const app = document.querySelector<HTMLDivElement>('#app')!;
new CircularFluidMeter(app);
