declare type FluidLayer = {
    waveAmplitude: number;
    waveSpeed: number;
    horizontalSpeed: number;
    horizontalPosition: number;
    angle: number;
    color: string;
    frequency: number;
};
declare type FluidLayerConfiguration = {
    color?: string;
    waveSpeed?: Speed;
    horizontalSpeed?: Speed;
};
declare enum Speed {
    SLOW = 0,
    NORMAL = 1,
    FAST = 2
}
declare abstract class FluidLayerHelper {
    static buildFluidLayersFromConfiguration(configuration: FluidLayerConfiguration, meterDiameter: number): [FluidLayer, FluidLayer];
    private static calculateWaveAmplitude;
    private static calculateFrequency;
}
export { FluidLayer, FluidLayerConfiguration, FluidLayerHelper, Speed };
