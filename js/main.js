let ball;
let environment;

function setup() {
  createCanvas(640, 480);
  ball = new Ball();
  environment = new BasicEnvironment();
}

function draw() {
  environment.applyForces(ball);
  ball.update();

  environment.display();
  ball.display();
}
