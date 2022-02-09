"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const CircularFluidMeter_1 = require("./meters/CircularFluidMeter/CircularFluidMeter");
const FluidLayer_1 = require("./meters/CircularFluidMeter/Layers/FluidLayer");
require("./style.css");
const configurations = [];
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
        horizontalSpeed: FluidLayer_1.Speed.FAST,
        waveSpeed: FluidLayer_1.Speed.FAST
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
        horizontalSpeed: FluidLayer_1.Speed.SLOW,
        waveSpeed: FluidLayer_1.Speed.SLOW
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
        horizontalSpeed: FluidLayer_1.Speed.FAST,
        waveSpeed: FluidLayer_1.Speed.FAST
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
const mainContainer = document.querySelector('.meters');
configurations.forEach((configuration) => {
    // create the DOM elements
    const meterContainer = document.createElement('div');
    meterContainer.classList.add('meter-container');
    mainContainer.appendChild(meterContainer);
    const meterHTMLElement = document.createElement('div');
    meterHTMLElement.classList.add('meter');
    meterContainer.appendChild(meterHTMLElement);
    const meter = new CircularFluidMeter_1.CircularFluidMeter(meterHTMLElement, configuration);
    const controlsContainer = document.createElement('div');
    controlsContainer.classList.add('controls');
    const input = document.createElement('input');
    input.setAttribute('type', 'number');
    input.setAttribute('placeholder', 'change progress');
    const button = document.createElement('button');
    button.innerHTML = 'set';
    button === null || button === void 0 ? void 0 : button.addEventListener('click', () => {
        const progress = Number(input === null || input === void 0 ? void 0 : input.value);
        if (progress) {
            if (isNaN(progress)) {
                alert('invalid progress. Number between 0 and 100');
                return;
            }
            if (progress < 0 || progress > 100) {
                alert('invalid progress. Number between 0 and 100');
                return;
            }
            meter.progress = progress;
        }
    });
    controlsContainer.appendChild(input);
    controlsContainer.appendChild(button);
    meterContainer.appendChild(controlsContainer);
});
//# sourceMappingURL=main.js.map