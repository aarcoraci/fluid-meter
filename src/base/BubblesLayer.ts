import { random } from '../utils/MathUtils';

class BubblesLayer {
  bubbles: Bubble[] = [];
  total = 22;
  averageSpeed = 40;
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

  getBubble(): Bubble {
    return {
      r: random(this.averageSize, this.averageSize * 2) / 2,
      x: random(this.minX, this.maxX),
      y: random(this.minY, this.maxY),
      velY: random(
        this.averageSpeed - this.speedDeviation,
        this.averageSpeed + this.speedDeviation
      )
    };
  }
  resetBubble(bubble: Bubble) {
    bubble.r = random(this.averageSize, this.averageSize * 2) / 2;
    bubble.x = random(this.minX, this.maxX);
    bubble.y = random(this.minY, this.maxY);
    bubble.velY = random(
      this.averageSpeed - this.speedDeviation,
      this.averageSpeed + this.speedDeviation
    );
  }

  reset(): void {
    this.bubbles = [];
    for (let i = 0; i < this.total; i++) {
      this.bubbles.push(this.getBubble());
    }
  }
}

type Bubble = {
  x: number;
  y: number;
  r: number;
  velY: number;
};

export { BubblesLayer };
