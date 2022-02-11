"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfig = void 0;
const FluidLayer_1 = require("./Layers/FluidLayer");
const defaultConfig = {
    initialProgress: 0,
    maxProgress: 100,
    borderWidth: 30,
    borderColor: '#75758b',
    padding: 30,
    backgroundColor: '#9f9fae',
    showProgress: true,
    showBubbles: true,
    bubbleColor: '#ffffff',
    textColor: '#ffffff',
    textDropShadow: true,
    textShadowOpacity: 1,
    textShadowColor: '#000000',
    fontFamily: 'Arial',
    fontSize: 30,
    use3D: true,
    dropShadow: true,
    dropShadowColor: '#000000',
    progressFormatter: (value) => Math.round(value).toString(),
    fluidConfiguration: {
        color: '#ff0000',
        waveSpeed: FluidLayer_1.Speed.NORMAL,
        horizontalSpeed: FluidLayer_1.Speed.NORMAL
    }
};
exports.defaultConfig = defaultConfig;
//# sourceMappingURL=CircularFluidMeterConfig.js.map