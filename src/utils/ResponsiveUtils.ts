type BreakpointValueConfig = {
  resolution: number;
  value: number;
};

const getResponsiveValue = (
  screenWidth: number,
  responsiveConfigs: BreakpointValueConfig[]
): number => {
  if (!responsiveConfigs.length) {
    return 0;
  }

  const breakPoint = responsiveConfigs
    .filter((c) => c.resolution <= screenWidth)
    ?.sort(breakPointCompare)?.[0];
  if (!breakPoint) {
    const minValue = responsiveConfigs.sort(breakPointCompare).reverse()[0];
    return minValue ? minValue.value : 0;
  } else {
    return breakPoint.value;
  }
};

const breakPointCompare = (
  b1: BreakpointValueConfig,
  b2: BreakpointValueConfig
) => {
  if (b1.resolution < b2.resolution) {
    return 1;
  }
  if (b1.resolution > b2.resolution) {
    return -1;
  }
  return 0;
};

export { BreakpointValueConfig, getResponsiveValue };
