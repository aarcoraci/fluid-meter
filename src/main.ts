import { CircularFluidMeter } from './meters/CircularFluidMeter';
import './style.css';

const app = document.querySelector<HTMLDivElement>('#app')!;

const meter = new CircularFluidMeter(app);
