import { BaseMeter } from '../../base/BaseMeter';
import { CircularFluidMeterConfig } from './CircularFluidMeterConfig';
import { BreakpointValueConfig } from '../../utils/ResponsiveUtils';
declare class CircularFluidMeter extends BaseMeter {
    private _fluidConfiguration;
    private _layers?;
    private _bubbles;
    private _meterDiameter;
    private _targetProgress;
    private _progress;
    get progress(): number;
    set progress(value: number);
    private _maxProgress;
    get maxProgress(): number;
    private _progressStepSpeed;
    private _calculatedBorderWidth;
    private _borderWidth;
    get borderWidth(): number | BreakpointValueConfig[];
    set borderWidth(borderWidth: number | BreakpointValueConfig[]);
    private _borderColor;
    get borderColor(): string;
    set borderColor(color: string);
    private _padding;
    get meterPadding(): number;
    set meterPadding(padding: number);
    private _backgroundColor;
    get backgroundColor(): string;
    set backgroundColor(color: string);
    private _textColor;
    get textColor(): string;
    set textColor(color: string);
    private _fontFamily;
    get fontFamily(): string;
    set fontFamily(family: string);
    private _calculatedFontSize;
    private _fontSize;
    get fontSize(): number | BreakpointValueConfig[];
    set fontSize(size: number | BreakpointValueConfig[]);
    private _textDropShadow;
    get textDropShadow(): boolean;
    set textDropShadow(dropShadow: boolean);
    private _textShadowOpacity;
    get textShadowOpacity(): number;
    set textShadowOpacity(alphaLevel: number);
    private _textShadowColor;
    get textShadowColor(): string;
    set textShadowColor(color: string);
    private _showProgress;
    get showProgress(): boolean;
    set showProgress(show: boolean);
    private _showBubbles;
    get showBubbles(): boolean;
    set showBubbles(show: boolean);
    private _bubbleColor;
    get bubbleColor(): string;
    set bubbleColor(color: string);
    private _use3D;
    get use3D(): boolean;
    set use3D(show: boolean);
    private _dropShadow;
    get dropShadow(): boolean;
    set dropShadow(drop: boolean);
    private _dropShadowColor;
    get dropShadowColor(): string;
    set dropShadowColor(color: string);
    private _progressFormatter;
    set progressFormatter(formatter: (value: number) => string);
    constructor(container: HTMLElement, config?: CircularFluidMeterConfig);
    protected draw(): void;
    private clear;
    /**
     * calculates the values required to correctly draw all components.
     * should be called on init and on resize or when some key value
     * changes such as border width or padding
     */
    private calculateDrawingValues;
    private updateBubbleLayer;
    private getMeterBottomLimit;
    private getFluidLevel;
    private updateProgress;
    /**
     * draws a fluid layer
     * @param layer layer to draw
     * @param canUse3d will add gradients and details to give an impression of depth
     */
    private drawLayer;
    private drawText;
    private drawBackground;
    private drawForeground;
    private drawBubbles;
    private calculateMeterDiameter;
    protected resize(): void;
}
export { CircularFluidMeter };
