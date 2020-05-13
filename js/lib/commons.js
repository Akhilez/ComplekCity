function shuffle(array) {
  let tmp, current, top = array.length;
  if (top) while (--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  return array;
}

function randomCanvasVector(game) {
  let sketch = game.sketch;
  let params = game.paramsInjector.params;
  return sketch.createVector(sketch.random(0, params.side), sketch.random(0, params.side));
}

function randVec() {
  return p5.Vector.random2D();
}
