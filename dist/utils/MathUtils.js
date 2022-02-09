"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = exports.clamp = void 0;
const clamp = (number, min, max) => {
    return Math.min(Math.max(number, min), max);
};
exports.clamp = clamp;
const random = (min, max) => {
    const delta = max - min;
    return max === min ? min : Math.random() * delta + min;
};
exports.random = random;
//# sourceMappingURL=MathUtils.js.map