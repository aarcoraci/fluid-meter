"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const CircularFluidMeter_1 = require("./meters/CircularFluidMeter/CircularFluidMeter");
require("./style.css");
const app = document.querySelector('#app');
const meter = new CircularFluidMeter_1.CircularFluidMeter(app);
const button1 = document.querySelector('#update-button-1');
const button2 = document.querySelector('#update-button-2');
button1 === null || button1 === void 0 ? void 0 : button1.addEventListener('click', () => {
    meter.targetProgress = 10;
});
button2 === null || button2 === void 0 ? void 0 : button2.addEventListener('click', () => {
    meter.targetProgress = 75;
});
//# sourceMappingURL=main.js.map