"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Speed = exports.FluidLayerHelper = void 0;
const ColorUtils_1 = require("../../../utils/ColorUtils");
var Speed;
(function (Speed) {
    Speed[Speed["SLOW"] = 0] = "SLOW";
    Speed[Speed["NORMAL"] = 1] = "NORMAL";
    Speed[Speed["FAST"] = 2] = "FAST";
})(Speed || (Speed = {}));
exports.Speed = Speed;
class FluidLayerSettings {
}
Object.defineProperty(FluidLayerSettings, "ANGULAR_SPEED_NORMAL", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Math.PI / 2
});
Object.defineProperty(FluidLayerSettings, "ANGULAR_SPEED_FAST", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Math.PI
});
Object.defineProperty(FluidLayerSettings, "ANGULAR_SPEED_SLOW", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Math.PI / 4
});
Object.defineProperty(FluidLayerSettings, "HORIZONTAL_SPEED_NORMAL", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 55
});
Object.defineProperty(FluidLayerSettings, "HORIZONTAL_SPEED_FAST", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 155
});
Object.defineProperty(FluidLayerSettings, "HORIZONTAL_SPEED_SLOW", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 25
});
class FluidLayerHelper {
    static buildFluidLayersFromConfiguration(configuration, meterDiameter) {
        // determine values
        let waveSpeed = FluidLayerSettings.ANGULAR_SPEED_NORMAL;
        let horizontalSpeed = FluidLayerSettings.HORIZONTAL_SPEED_NORMAL;
        const frequency = this.calculateFrequency(meterDiameter);
        switch (configuration.horizontalSpeed) {
            case Speed.FAST:
                horizontalSpeed = FluidLayerSettings.HORIZONTAL_SPEED_FAST;
                break;
            case Speed.SLOW:
                horizontalSpeed = FluidLayerSettings.HORIZONTAL_SPEED_SLOW;
                break;
            default:
                horizontalSpeed = FluidLayerSettings.HORIZONTAL_SPEED_NORMAL;
                break;
        }
        switch (configuration.waveSpeed) {
            case Speed.FAST:
                waveSpeed = FluidLayerSettings.ANGULAR_SPEED_FAST;
                break;
            case Speed.SLOW:
                waveSpeed = FluidLayerSettings.ANGULAR_SPEED_SLOW;
                break;
            default:
                waveSpeed = FluidLayerSettings.ANGULAR_SPEED_NORMAL;
                break;
        }
        const backgroundColor = ColorUtils_1.ColorUtils.pSBC(-0.75, configuration.color || '#ffffff');
        const waveAmplitude = this.calculateWaveAmplitude(meterDiameter);
        const foreGroundLayer = {
            angle: 0,
            horizontalPosition: 0,
            color: configuration.color || '#ffffff',
            frequency: frequency,
            waveAmplitude: waveAmplitude,
            horizontalSpeed: horizontalSpeed,
            waveSpeed: waveSpeed
        };
        const backgroundLayer = {
            angle: 0,
            horizontalPosition: 0,
            color: backgroundColor
                ? backgroundColor
                : configuration.color || '#ffffff',
            frequency: frequency,
            waveAmplitude: waveAmplitude,
            horizontalSpeed: -horizontalSpeed,
            waveSpeed: waveSpeed
        };
        return [backgroundLayer, foreGroundLayer];
    }
    static calculateWaveAmplitude(meterDiameter) {
        return meterDiameter * 0.021;
    }
    static calculateFrequency(meterDiameter) {
        return meterDiameter / 11;
    }
}
exports.FluidLayerHelper = FluidLayerHelper;
//# sourceMappingURL=FluidLayer.js.map