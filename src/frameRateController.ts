export class FrameRateController {
  private timeStamp: number = 0;
  private frameTimer: number = 0;
  private frameInterval: number = 0;
  shouldRender = true;

  constructor(fps: number) {
    this.frameInterval = 1000 / fps;
  }
  setFrameRate(fps: number) {
    this.frameInterval = 1000 / fps;
  }
  update(timeStamp: number) {
    const deltaTime = timeStamp - this.timeStamp;
    if (deltaTime > 17) {
      // console.error(deltaTime);
    }
    this.timeStamp = timeStamp;
    if (this.frameTimer < this.frameInterval) {
      this.shouldRender = false;
      this.frameTimer += deltaTime;
    } else {
      this.shouldRender = true;
      this.frameTimer = this.frameInterval - this.frameTimer;
    }
  }
}
