class UIManager {
  constructor(game) {
    this.game = game;
    this.sketch = game.sketch;
    this.params = game.paramsInjector.params;
  }

  setupSketch() {
    this.sketch.frameRate(this.params.fps);

    let canvas = this.sketch.createCanvas(this.params.side, this.params.side);
    canvas.parent('sketch-holder');

  }

  display() {
    this.game.cityBuilder.renderBlocks();
  }

}
