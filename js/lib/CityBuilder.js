class CityBuilder {
  constructor(game) {
    this.game = game;
    this.params = game.paramsInjector.params;
    this.sketch = game.sketch;

    this.blockSide = this.params.side * this.params.rows;
  }

  renderBlocks() {
    for (let i = 0; i < this.blocks.length; i++)
      for (let j = 0; j < this.blocks.length; j++)
        this.renderBlock(this.blocks[i][j]);
  }

  renderBlock(block) {
    if (block == null) return;

    let halfBlockSide = this.blockSide / 2;
    let topLeft = this.sketch.createVector(block.cx - halfBlockSide, block.cy - halfBlockSide);
    let topRight = this.sketch.createVector(block.cx + halfBlockSide, block.cy - halfBlockSide);
    let bottomLeft = this.sketch.createVector(block.cx - halfBlockSide, block.cy + halfBlockSide);
    let bottomRight = this.sketch.createVector(block.cx + halfBlockSide, block.cy + halfBlockSide);

    this.sketch.stroke(0);

    if (block.connections.left == null)
      this.sketch.line(topLeft.x, topLeft.y, bottomLeft.x, bottomLeft.y);

    if (block.connections.top == null)
      this.sketch.line(topLeft.x, topLeft.y, topRight.x, topRight.y);

    if (block.connections.right == null)
      this.sketch.line(topRight.x, topRight.y, bottomRight.x, bottomRight.y);

    if (block.connections.bottom == null)
      this.sketch.line(bottomLeft.x, bottomLeft.y, bottomRight.x, bottomRight.y);

  }

  build() {
    let nRoads = 1 / this.params.rows;
    let nClosures = nRoads * nRoads * this.params.roadClosures;
    this.blocks = this._getIntersectionsMatrix(nRoads);
    this.removeRandomRoads(this.blocks, nRoads, nClosures);
    this.attachConnections(this.blocks);
  }

  removeRandomRoads(matrix, nRoads, nClosures) {
    let randomX = [];
    let randomY = [];

    for (let i = 0; i < nRoads * 2; ++i) {
      randomX[i] = i % nRoads;
      randomY[i] = i % nRoads;
    }

    shuffle(randomX);
    shuffle(randomY);

    for (let i = 0; i < nClosures; i++)
      matrix[randomX[i]][randomY[i]] = null;

  }

  attachConnections(matrix) {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if (matrix[i][j] == null) continue;
        matrix[i][j].connections.top = (i === 0) ? null : matrix[i - 1][j];
        matrix[i][j].connections.bottom = (i === matrix.length - 1) ? null : matrix[i + 1][j];
        matrix[i][j].connections.left = (j === 0) ? null : matrix[i][j - 1];
        matrix[i][j].connections.right = (j === matrix.length - 1) ? null : matrix[i][j + 1];
      }
    }
  }

  _getIntersectionsMatrix(rows) {
    let halfBlockSide = this.blockSide / 2;
    let matrix = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < rows; j++)
        row.push(new Intersection(i, j, i * this.blockSide + halfBlockSide, j * this.blockSide + halfBlockSide));
      matrix.push(row);
    }
    return matrix;
  }

}

class Intersection {
  constructor(x, y, cx, cy) {

    this.x = x;
    this.y = y;

    this.cx = cx;
    this.cy = cy;

    this.connections = {left: null, right: null, top: null, bottom: null};

  }
}

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
