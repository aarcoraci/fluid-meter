declare class BubblesLayer {
    bubbles: BubbleParticle[];
    total: number;
    averageSpeed: number;
    speedDeviation: number;
    current: number;
    swing: number;
    averageSize: number;
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    yThreshold: number;
    getBubble(): BubbleParticle;
    resetBubble(bubble: BubbleParticle): void;
    updateBubbleCount(): void;
    reset(): void;
}
declare class BubbleParticle {
    x: number;
    y: number;
    r: number;
    velY: number;
    lifespan: number;
    currentRadius: number;
    currentLifespan: number;
    opacityThreshold: number;
    currentOpacity: number;
    opacityDecayingSpeed: number;
    constructor(x: number, y: number, r: number, velY: number, lifespan: number, opacity?: number);
    get isDead(): boolean;
    update(elapsed: number): void;
}
export { BubblesLayer };
