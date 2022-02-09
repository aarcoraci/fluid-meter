"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponsiveValue = void 0;
const getResponsiveValue = (screenWidth, responsiveConfigs) => {
    var _a, _b;
    if (!responsiveConfigs.length) {
        return 0;
    }
    const breakPoint = (_b = (_a = responsiveConfigs
        .filter((c) => c.resolution <= screenWidth)) === null || _a === void 0 ? void 0 : _a.sort(breakPointCompare)) === null || _b === void 0 ? void 0 : _b[0];
    if (!breakPoint) {
        const minValue = responsiveConfigs.sort(breakPointCompare).reverse()[0];
        return minValue ? minValue.value : 0;
    }
    else {
        return breakPoint.value;
    }
};
exports.getResponsiveValue = getResponsiveValue;
const breakPointCompare = (b1, b2) => {
    if (b1.resolution < b2.resolution) {
        return 1;
    }
    if (b1.resolution > b2.resolution) {
        return -1;
    }
    return 0;
};
//# sourceMappingURL=ResponsiveUtils.js.map