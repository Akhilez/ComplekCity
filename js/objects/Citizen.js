class Citizen {

  constructor(game) {
    this.game = game;

    this.diameter = 10;

    this.maxVelocity = 10;

    this.location = game.sketch.createVector(width / 2, height / 2);
    this.velocity = game.sketch.createVector(0.0, 0.0);
    this.acceleration = game.sketch.Vector.random2D();
    this.drag = 0.01;

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
    this.setVelocity(p5.Vector.add(this.velocity, this.acceleration));
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  display() {
    this.game.sketch.ellipse(this.location.x, this.location.y, this.diameter);
  }

}
