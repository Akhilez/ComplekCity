class UIManager {
  constructor(game) {
    this.game = game;
    this.sketch = game.sketch;
  }

  setupSketch() {
    this.game.cityBuilder.build(this.sketch);
  }

  display() {

  }

}
