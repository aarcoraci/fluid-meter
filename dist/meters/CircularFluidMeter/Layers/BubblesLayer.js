"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BubblesLayer = void 0;
const MathUtils_1 = require("../../../utils/MathUtils");
class BubblesLayer {
    constructor() {
        Object.defineProperty(this, "bubbles", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "total", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 22
        });
        Object.defineProperty(this, "averageSpeed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 50
        });
        Object.defineProperty(this, "speedDeviation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 12
        });
        Object.defineProperty(this, "current", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "swing", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "averageSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 4
        });
        // spawning limits
        Object.defineProperty(this, "minX", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "maxX", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "minY", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "maxY", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        // max y position
        Object.defineProperty(this, "yThreshold", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
    }
    getBubble() {
        const x = (0, MathUtils_1.random)(this.minX, this.maxX);
        const y = (0, MathUtils_1.random)(this.minY, this.maxY);
        const r = (0, MathUtils_1.random)(this.averageSize * 0.5, this.averageSize * 1.5);
        const opacity = r < this.averageSize ? 0.5 : 1;
        const velY = (0, MathUtils_1.random)(this.averageSpeed - this.speedDeviation, this.averageSpeed + this.speedDeviation);
        // lifespan is calculated in based on how long the particles will reach surface (y threshold)
        const totalDistance = y - this.yThreshold;
        const particleLife = totalDistance / velY;
        return new BubbleParticle(x, y, r, velY, particleLife, opacity);
    }
    resetBubble(bubble) {
        this.bubbles = this.bubbles.filter((b) => b !== bubble);
        if (this.bubbles.length < this.total) {
            this.bubbles.push(this.getBubble());
        }
    }
    updateBubbleCount() {
        if (this.bubbles.length < this.total) {
            const missing = this.total - this.bubbles.length;
            for (let i = 0; i < missing; i++) {
                this.bubbles.push(this.getBubble());
            }
        }
    }
    reset() {
        this.bubbles = [];
        for (let i = 0; i < this.total; i++) {
            this.bubbles.push(this.getBubble());
        }
    }
}
exports.BubblesLayer = BubblesLayer;
class BubbleParticle {
    constructor(x, y, r, velY, lifespan, opacity = 1) {
        Object.defineProperty(this, "x", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "y", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "r", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "velY", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "lifespan", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "currentRadius", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "currentLifespan", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "opacityThreshold", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "currentOpacity", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
        Object.defineProperty(this, "opacityDecayingSpeed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        this.x = x;
        this.y = y;
        this.r = r;
        this.velY = velY;
        this.lifespan = lifespan;
        this.currentLifespan = lifespan;
        this.currentOpacity = opacity;
        /**
         *  calculate opacity decrease factor base on lifespan:
         * particles will fade out when they reach X% of their life
         */
        this.opacityThreshold = this.lifespan * 0.2;
        this.opacityDecayingSpeed = (100 / this.lifespan) * 0.2;
    }
    get isDead() {
        return this.currentLifespan <= 0;
    }
    update(elapsed) {
        this.y -= this.velY * elapsed;
        if (this.currentRadius < this.r) {
            this.currentRadius += 20 * elapsed;
        }
        if (this.currentLifespan < this.opacityThreshold) {
            this.currentOpacity -= this.opacityDecayingSpeed * elapsed;
            if (this.currentOpacity <= 0) {
                this.currentOpacity = 0;
            }
        }
        this.currentLifespan -= elapsed;
    }
}
//# sourceMappingURL=BubblesLayer.js.map