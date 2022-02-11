"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const CircularFluidMeter_1 = require("./meters/CircularFluidMeter/CircularFluidMeter");
const FluidLayer_1 = require("./meters/CircularFluidMeter/Layers/FluidLayer");
const configurations = [];
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
const createMeter = (container, config) => {
    const meter = new CircularFluidMeter_1.CircularFluidMeter(container.querySelector('.meter'), config);
    const input = container.querySelector('input');
    const button = container.querySelector('button');
    button === null || button === void 0 ? void 0 : button.addEventListener('click', () => {
        const progress = Number(input === null || input === void 0 ? void 0 : input.value);
        if (isNaN(progress)) {
            alert('invalid progress. Number between 0 and 100');
            return;
        }
        meter.progress = progress;
    });
    return meter;
};
document.addEventListener('DOMContentLoaded', function () {
    createMeter(document.querySelector('#meter-1'), configurations[0]);
    const m2 = createMeter(document.querySelector('#meter-2'), configurations[1]);
    m2.textShadowColor = '#589100';
    m2.textShadowOpacity = 0.4;
    const m3 = createMeter(document.querySelector('#meter-3'), configurations[2]);
    m3.dropShadowColor = '#ff4500';
    createMeter(document.querySelector('#meter-4'), configurations[3]);
    createMeter(document.querySelector('#meter-5'), configurations[4]);
    createMeter(document.querySelector('#meter-6'), configurations[5]);
});
//# sourceMappingURL=main.js.map