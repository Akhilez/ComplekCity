class Citizen {

  constructor(game) {
    this.game = game;

    this.diameter = 5;

    this.maxVelocity = 10;

    this.location = randomCanvasVector(game);
    this.velocity = game.sketch.createVector(0.0, 0.0);
    this.acceleration = randVec();
    this.drag = 0.01;

    this.initState();

  }

  initState() {
    this.location = this.getRandomLocation();
    //this.acceleration = randVec();
  }

  getRandomLocation() {
    let numBlocks = this.game.cityBuilder.blocks.length;
    let randomX = Math.round(this.game.sketch.random(0, numBlocks - 1));
    let randomY = Math.round(this.game.sketch.random(0, numBlocks - 1));
    if (this.game.cityBuilder.blocks[randomX][randomY] == null)
      return this.getRandomLocation();
    let cx = this.game.cityBuilder.blocks[randomX][randomY].cx;
    let cy = this.game.cityBuilder.blocks[randomX][randomY].cy;
    return this.game.sketch.createVector(cx, cy);
  }

  setVelocity(velocity) {
    this.velocity = velocity;
    this.velocity.limit(this.maxVelocity);
    this.velocity.mult(1 - this.drag);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.game.cityBuilder.checkBounds(this);

    this.setVelocity(p5.Vector.add(this.velocity, this.acceleration));
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  display() {
    this.game.sketch.noStroke();
    this.game.sketch.fill(0, 17, 255);
    this.game.sketch.ellipse(this.location.x, this.location.y, this.diameter);
  }

  flipVelocityX() {
    this.velocity.x *= -1;
  }

  flipVelocityY() {
    this.velocity.y *= -1;
  }

}
