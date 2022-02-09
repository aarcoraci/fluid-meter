import { random } from '../../../utils/MathUtils';

class BubblesLayer {
  bubbles: BubbleParticle[] = [];
  total = 22;
  averageSpeed = 50;
  speedDeviation = 12;
  current = 0;
  swing = 0;
  averageSize = 4;
  // spawning limits
  minX = 0;
  maxX = 0;
  minY = 0;
  maxY = 0;
  // max y position
  yThreshold = 0;

  getBubble(): BubbleParticle {
    const x = random(this.minX, this.maxX);
    const y = random(this.minY, this.maxY);
    const r = random(this.averageSize, this.averageSize * 2) / 2;
    const velY = random(
      this.averageSpeed - this.speedDeviation,
      this.averageSpeed + this.speedDeviation
    );

    // lifespan is calculated in based on how long the particles will reach surface (y threshold)
    const totalDistance = y - this.yThreshold;
    const particleLife = totalDistance / velY;

    return new BubbleParticle(x, y, r, velY, particleLife);
  }

  resetBubble(bubble: BubbleParticle) {
    this.bubbles = this.bubbles.filter((b) => b !== bubble);
    this.bubbles.push(this.getBubble());
  }

  reset(): void {
    this.bubbles = [];
    for (let i = 0; i < this.total; i++) {
      this.bubbles.push(this.getBubble());
    }
  }
}

class BubbleParticle {
  x = 0;
  y = 0;
  r = 0;
  velY = 0;
  lifespan = 0;

  currentRadius = 0;
  currentLifespan = 0;

  opacityThreshold = 0;
  currentOpacity = 1;
  opacityDecayingSpeed = 0;

  constructor(x: number, y: number, r: number, velY: number, lifespan: number) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.velY = velY;
    this.lifespan = lifespan;
    this.currentLifespan = lifespan;
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

  update(elapsed: number) {
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

export { BubblesLayer };
