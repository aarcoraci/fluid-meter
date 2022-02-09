declare type BreakpointValueConfig = {
    resolution: number;
    value: number;
};
declare const getResponsiveValue: (screenWidth: number, responsiveConfigs: BreakpointValueConfig[]) => number;
export { BreakpointValueConfig, getResponsiveValue };
