"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircularFluidMeter = void 0;
const BaseMeter_1 = require("../../base/BaseMeter");
const BubblesLayer_1 = require("./Layers/BubblesLayer");
const FluidLayer_1 = require("./Layers/FluidLayer");
const ColorUtils_1 = require("../../utils/ColorUtils");
const CircularFluidMeterConfig_1 = require("./CircularFluidMeterConfig");
const ResponsiveUtils_1 = require("../../utils/ResponsiveUtils");
const MathUtils_1 = require("../../utils/MathUtils");
class CircularFluidMeter extends BaseMeter_1.BaseMeter {
    constructor(container, config) {
        super(container);
        Object.defineProperty(this, "_fluidConfiguration", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_layers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_bubbles", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new BubblesLayer_1.BubblesLayer()
        });
        Object.defineProperty(this, "_meterDiameter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_targetProgress", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_progress", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_maxProgress", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // computed value used to animate the variation of fluid when the progress changes
        Object.defineProperty(this, "_progressStepSpeed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_calculatedBorderWidth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_borderWidth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_borderColor", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: '#ff00ff'
        });
        Object.defineProperty(this, "_padding", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 15
        });
        Object.defineProperty(this, "_backgroundColor", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: '#ff00ff'
        });
        Object.defineProperty(this, "_textColor", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "_fontFamily", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'Arial'
        });
        Object.defineProperty(this, "_calculatedFontSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_fontSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_textDropShadow", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "_textShadowOpacity", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_textShadowColor", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_showProgress", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "_showBubbles", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "_bubbleColor", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: '#ffffff'
        });
        Object.defineProperty(this, "_use3D", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "_dropShadow", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "_dropShadowColor", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_progressFormatter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (value) => `${value}%`
        });
        const computedConfig = Object.assign(Object.assign({}, CircularFluidMeterConfig_1.defaultConfig), config);
        this._progress = computedConfig.initialProgress;
        this._maxProgress = computedConfig.maxProgress;
        this._borderWidth = computedConfig.borderWidth;
        this._borderColor = computedConfig.borderColor;
        this._padding = computedConfig.padding;
        this._targetProgress = this._progress;
        this._backgroundColor = computedConfig.backgroundColor;
        this._fluidConfiguration = computedConfig.fluidConfiguration;
        this._textColor = computedConfig.textColor;
        this._textDropShadow = computedConfig.textDropShadow;
        this._textShadowColor = computedConfig.textShadowColor;
        this._textShadowOpacity = computedConfig.textShadowOpacity;
        this._showProgress = computedConfig.showProgress;
        this._fontFamily = computedConfig.fontFamily;
        this._fontSize = computedConfig.fontSize;
        this._showBubbles = computedConfig.showBubbles;
        this._bubbleColor = computedConfig.bubbleColor;
        this._use3D = computedConfig.use3D;
        this._dropShadow = computedConfig.dropShadow;
        this._dropShadowColor = computedConfig.dropShadowColor;
        this._progressFormatter = computedConfig.progressFormatter;
        this.calculateDrawingValues();
    }
    get progress() {
        return this._progress;
    }
    set progress(value) {
        this._targetProgress = (0, MathUtils_1.clamp)(value, 0, this._maxProgress);
    }
    get maxProgress() {
        return this._maxProgress;
    }
    get borderWidth() {
        return this._borderWidth;
    }
    set borderWidth(borderWidth) {
        this._borderWidth = borderWidth;
        this.calculateDrawingValues();
    }
    get borderColor() {
        return this._borderColor;
    }
    set borderColor(color) {
        this._borderColor = color;
    }
    get meterPadding() {
        return this._padding;
    }
    set meterPadding(padding) {
        this._padding = padding;
        this.calculateDrawingValues();
    }
    get backgroundColor() {
        return this._backgroundColor;
    }
    set backgroundColor(color) {
        this._backgroundColor = color;
    }
    get textColor() {
        return this._textColor;
    }
    set textColor(color) {
        this._textColor = color;
    }
    get fontFamily() {
        return this._fontFamily;
    }
    set fontFamily(family) {
        this._fontFamily = family;
    }
    get fontSize() {
        return this._fontSize;
    }
    set fontSize(size) {
        this._fontSize = size;
    }
    get textDropShadow() {
        return this._textDropShadow;
    }
    set textDropShadow(dropShadow) {
        this._textDropShadow = dropShadow;
    }
    get textShadowOpacity() {
        return this._textShadowOpacity;
    }
    set textShadowOpacity(alphaLevel) {
        this._textShadowOpacity = (0, MathUtils_1.clamp)(alphaLevel, 0, 1);
    }
    get textShadowColor() {
        return this._textShadowColor;
    }
    set textShadowColor(color) {
        this._textShadowColor = color;
    }
    get showProgress() {
        return this._showProgress;
    }
    set showProgress(show) {
        this._showProgress = show;
    }
    get showBubbles() {
        return this._showBubbles;
    }
    set showBubbles(show) {
        this._showBubbles = show;
    }
    get bubbleColor() {
        return this._bubbleColor;
    }
    set bubbleColor(color) {
        this._bubbleColor = color;
    }
    get use3D() {
        return this._use3D;
    }
    set use3D(show) {
        this._use3D = show;
    }
    get dropShadow() {
        return this._dropShadow;
    }
    set dropShadow(drop) {
        this._dropShadow = drop;
    }
    get dropShadowColor() {
        return this._dropShadowColor;
    }
    set dropShadowColor(color) {
        this._dropShadowColor = color;
    }
    set progressFormatter(formatter) {
        this._progressFormatter = formatter;
    }
    draw() {
        this.clear();
        if (this._meterDiameter <= 0 || !this._width || !this._height) {
            return;
        }
        if (this._dropShadow) {
            this._context.save();
            this._context.beginPath();
            this._context.shadowColor = this._dropShadowColor;
            this._context.shadowBlur = 10;
            this._context.shadowOffsetY = 5;
            this._context.arc(this._width / 2, this._height / 2, this._meterDiameter / 2 - 1, 0, 2 * Math.PI);
            this._context.closePath();
            this._context.fill();
            this._context.restore();
        }
        this.drawBackground();
        // #region clip
        this._context.save();
        this._context.arc(this._width / 2, this._height / 2, this._meterDiameter / 2 - this._calculatedBorderWidth, 0, Math.PI * 2);
        this._context.clip();
        // #endregion
        if (this._layers) {
            this.drawLayer(this._layers[0], false);
            this.drawLayer(this._layers[1]);
        }
        if (this._showBubbles) {
            this._bubbles.updateBubbleCount();
            this.drawBubbles();
        }
        if (this._showProgress) {
            this.drawText();
        }
        // restore clip
        this._context.restore();
        // can draw in whole canvas again
        this.drawForeground();
    }
    clear() {
        this._context.clearRect(0, 0, this._width, this._height);
    }
    /**
     * calculates the values required to correctly draw all components.
     * should be called on init and on resize or when some key value
     * changes such as border width or padding
     */
    calculateDrawingValues() {
        this._meterDiameter = this.calculateMeterDiameter();
        this._layers = FluidLayer_1.FluidLayerHelper.buildFluidLayersFromConfiguration(this._fluidConfiguration, this._meterDiameter);
        // other computed values
        this._progressStepSpeed = this._maxProgress / 6;
        // responsive (if required)
        const screenWidth = window.innerWidth;
        if (typeof this._borderWidth == 'number') {
            this._calculatedBorderWidth = this._borderWidth;
        }
        else {
            this._calculatedBorderWidth = (0, ResponsiveUtils_1.getResponsiveValue)(screenWidth, this._borderWidth);
        }
        if (typeof this._fontSize == 'number') {
            this._calculatedFontSize = this._fontSize;
        }
        else {
            this._calculatedFontSize = (0, ResponsiveUtils_1.getResponsiveValue)(screenWidth, this._fontSize);
        }
        // values for the bubble layer
        this.updateBubbleLayer();
        this._bubbles.reset();
    }
    updateBubbleLayer() {
        const meterBottomLimit = this.getMeterBottomLimit();
        let yThreshold = this.getFluidLevel();
        if (this._layers) {
            yThreshold += this._layers[0].waveAmplitude;
        }
        let minY = meterBottomLimit * 0.85;
        if (minY < yThreshold) {
            minY = yThreshold;
        }
        const maxY = meterBottomLimit;
        const minX = this._width / 2 - this._meterDiameter / 2;
        const maxX = this._width / 2 + this._meterDiameter / 2;
        this._bubbles.minY = minY;
        this._bubbles.maxY = maxY;
        this._bubbles.minX = minX;
        this._bubbles.maxX = maxX;
        this._bubbles.yThreshold = yThreshold;
        this._bubbles.averageSize = this._meterDiameter * 0.006;
        this._bubbles.averageSpeed = (this._meterDiameter * 2) / 14; // should take X seconds to go from bottom to top
        this._bubbles.speedDeviation = this._bubbles.averageSpeed * 0.25;
        // calculate the amount of bubbles depending on the fill percentage
        let maxBubbles = this._width * 0.1;
        if (this._progress < this._maxProgress * 0.5 &&
            this._progress >= this._maxProgress * 0.25) {
            maxBubbles = maxBubbles * 0.5;
        }
        else if (this._progress < this._maxProgress * 0.25 &&
            this._progress >= this._maxProgress * 0.12) {
            maxBubbles = maxBubbles * 0.18;
        }
        else if (this._progress < this._maxProgress * 0.12) {
            maxBubbles = maxBubbles * 0.04;
        }
        this._bubbles.total = maxBubbles;
    }
    // bottom limit where fluid gets drawn
    getMeterBottomLimit() {
        return (this._height -
            (this._height - this._meterDiameter) / 2 -
            this._calculatedBorderWidth);
    }
    // returns the line where the fluid makes waves
    getFluidLevel() {
        let waveAmplitudeCalculation = 0;
        if (this._layers) {
            waveAmplitudeCalculation = this._layers[0].waveAmplitude / 2;
        }
        const meterFillPercentage = ((this._meterDiameter -
            waveAmplitudeCalculation -
            this._calculatedBorderWidth * 2) *
            this._progress) /
            this._maxProgress;
        return this.getMeterBottomLimit() - meterFillPercentage;
    }
    updateProgress() {
        if (this._progress === this._targetProgress) {
            return;
        }
        if (this._progress < this._targetProgress) {
            this._progress += this._progressStepSpeed * this._elapsed;
            if (this._progress > this._targetProgress) {
                this._progress = this._targetProgress;
            }
        }
        else if (this._progress > this._targetProgress) {
            this._progress -= this._progressStepSpeed * this._elapsed;
            if (this._progress < this._targetProgress) {
                this._progress = this._targetProgress;
            }
        }
        this.updateBubbleLayer();
    }
    /**
     * draws a fluid layer
     * @param layer layer to draw
     * @param canUse3d will add gradients and details to give an impression of depth
     */
    drawLayer(layer, canUse3d = true) {
        // calculate wave angle
        let angle = layer.angle + layer.waveSpeed * this._elapsed;
        if (angle > Math.PI * 2) {
            angle = angle - Math.PI * 2;
        }
        layer.angle = angle;
        // calculate horizontal position
        layer.horizontalPosition += layer.horizontalSpeed * this._elapsed;
        let x = 0;
        let y = 0;
        const amplitude = layer.waveAmplitude * Math.sin(layer.angle);
        const meterBottom = this.getMeterBottomLimit();
        const fluidAmount = this.getFluidLevel();
        this.updateProgress();
        this._context.save();
        this._context.beginPath();
        this._context.lineTo(0, fluidAmount);
        while (x < this._width) {
            y =
                fluidAmount +
                    amplitude * Math.sin((x + layer.horizontalPosition) / layer.frequency);
            this._context.lineTo(x, y);
            x++;
        }
        this._context.lineTo(x, this._height);
        this._context.lineTo(0, this._height);
        this._context.closePath();
        if (this._use3D && canUse3d) {
            const x1 = this._width / 2;
            const y1 = meterBottom;
            const r1 = this._meterDiameter * 0.05;
            const gradientBackgroundFill = this._context.createRadialGradient(x1, y1, r1, x1, y1, this._meterDiameter * 0.65);
            const startColor = layer.color;
            const endColor = ColorUtils_1.ColorUtils.pSBC(-0.8, layer.color);
            gradientBackgroundFill.addColorStop(0, startColor);
            if (endColor) {
                gradientBackgroundFill.addColorStop(1, endColor);
            }
            this._context.fillStyle = gradientBackgroundFill;
        }
        else {
            this._context.fillStyle = layer.color;
        }
        this._context.fill();
        this._context.restore();
    }
    drawText() {
        const text = this._progressFormatter(this._progress);
        this._context.save();
        this._context.font = `${this._calculatedFontSize}px ${this._fontFamily}`;
        this._context.fillStyle = this._textColor;
        this._context.textAlign = 'center';
        this._context.textBaseline = 'middle';
        if (this._textDropShadow) {
            this._context.save();
            this._context.shadowColor = this._textShadowColor;
            this._context.shadowBlur = 7;
            this._context.globalAlpha = this._textShadowOpacity;
            this._context.fillText(text, this._width / 2, this._height / 2);
            this._context.restore();
        }
        this._context.fillText(text, this._width / 2, this._height / 2);
        this._context.restore();
    }
    drawBackground() {
        this._context.save();
        this._context.beginPath();
        this._context.arc(this._width / 2, this._height / 2, this._meterDiameter / 2 - this._calculatedBorderWidth, 0, 2 * Math.PI);
        this._context.closePath();
        if (this._use3D) {
            const x1 = this._width / 2;
            const y1 = this._height / 2;
            const r1 = this._meterDiameter * 0.1;
            const gradientBackgroundFill = this._context.createRadialGradient(x1, y1, r1, x1, y1, this._meterDiameter * 0.75);
            const startColor = this._backgroundColor;
            const endColor = ColorUtils_1.ColorUtils.pSBC(-0.8, this.backgroundColor);
            gradientBackgroundFill.addColorStop(0, startColor);
            if (endColor) {
                gradientBackgroundFill.addColorStop(0.9, endColor);
            }
            this._context.fillStyle = gradientBackgroundFill;
        }
        else {
            this._context.fillStyle = this.backgroundColor;
        }
        this._context.fill();
        this._context.restore();
    }
    drawForeground() {
        this._context.save();
        this._context.lineWidth = this._calculatedBorderWidth;
        this._context.strokeStyle = this._borderColor;
        this._context.beginPath();
        this._context.arc(this._width / 2, this._height / 2, this._meterDiameter / 2 - this._calculatedBorderWidth / 2, 0, 2 * Math.PI);
        this._context.closePath();
        this._context.stroke();
        // inner border
        const innerBorderColor = ColorUtils_1.ColorUtils.pSBC(-0.35, this._borderColor);
        const innerBorderWidth = this._calculatedBorderWidth * 0.25;
        this._context.lineWidth = innerBorderWidth;
        this._context.strokeStyle = innerBorderColor || this._borderColor;
        this._context.beginPath();
        this._context.arc(this._width / 2, this._height / 2, this._meterDiameter / 2 -
            this._calculatedBorderWidth * 0.85 -
            innerBorderWidth / 2, 0, 2 * Math.PI);
        this._context.closePath();
        this._context.stroke();
        // outer border
        const outerBorderColor = ColorUtils_1.ColorUtils.pSBC(0.05, this._borderColor);
        const outerBorderWidth = this._calculatedBorderWidth * 0.15;
        this._context.lineWidth = outerBorderWidth;
        this._context.strokeStyle = outerBorderColor || this._borderColor;
        this._context.beginPath();
        this._context.arc(this._width / 2, this._height / 2, this._meterDiameter / 2 - outerBorderWidth / 2, 0, 2 * Math.PI);
        this._context.closePath();
        this._context.stroke();
        this._context.restore();
        // details
        if (this._use3D) {
            this._context.save();
            this._context.shadowColor = '#ffffff';
            this._context.shadowBlur = 17;
            const availableSurface = this._meterDiameter - this._calculatedBorderWidth;
            let x = this._width / 2 - availableSurface / 4.5;
            let y = this._height / 2 - availableSurface / 5.27;
            let size = availableSurface * 0.045;
            const shineTop = new Path2D();
            shineTop.arc(-this._width * 2, y, size, 0, 2 * Math.PI);
            this._context.shadowOffsetX = this._width * 2 + x;
            this._context.globalAlpha = 0.7;
            this._context.fill(shineTop);
            this._context.restore();
            this._context.save();
            this._context.shadowColor = '#ffffff';
            this._context.shadowBlur = 11;
            x = this._width / 2 + availableSurface / 5;
            y = this._height / 2 + availableSurface / 4;
            size = availableSurface * 0.025;
            const shineBottom = new Path2D();
            shineBottom.arc(-this._width * 2, y, size, 0, 2 * Math.PI);
            this._context.shadowOffsetX = this._width * 2 + x;
            this._context.globalAlpha = 0.45;
            this._context.fill(shineBottom);
            this._context.restore();
        }
    }
    drawBubbles() {
        this._context.save();
        this._bubbles.bubbles.forEach((bubble) => {
            bubble.update(this._elapsed);
            if (bubble.isDead || bubble.y < this._bubbles.yThreshold) {
                this._bubbles.resetBubble(bubble);
            }
            this._context.beginPath();
            this._context.strokeStyle = this._bubbleColor;
            this._context.arc(bubble.x - bubble.currentRadius / 2, bubble.y - bubble.currentRadius / 2, bubble.currentRadius, 0, 2 * Math.PI);
            this._context.filter = `opacity(${bubble.currentOpacity})`;
            this._context.stroke();
            this._context.closePath();
        });
        this._context.restore();
    }
    calculateMeterDiameter() {
        if (this._width >= this._height) {
            return this._height - this._padding;
        }
        else {
            return this._width - this._padding;
        }
    }
    resize() {
        super.resize();
        this.calculateDrawingValues();
        this._bubbles.reset();
    }
}
exports.CircularFluidMeter = CircularFluidMeter;
//# sourceMappingURL=CircularFluidMeter.js.map