class CityBuilder {
  constructor(game) {
    this.game = game;
    this.params = game.paramsInjector.params;
    this.sketch = game.sketch;

    this.blockSide = this.params.side * this.params.rows;

    this.blocks = [];
  }

  renderBlocks() {
    for (let i = 0; i < this.blocks.length; i++)
      for (let j = 0; j < this.blocks.length; j++)
        this.renderBlock(this.blocks[i][j]);
  }

  renderBlock(block) {

    if (block == null) return;

    let halfBlockSide = this.blockSide / 2;
    let oneThird = this.blockSide / 3;

    let x0 = block.cx - halfBlockSide;
    let x1 = x0 + oneThird;
    let x2 = x1 + oneThird;
    let x3 = x2 + oneThird;

    let y0 = block.cy - halfBlockSide;
    let y1 = y0 + oneThird;
    let y2 = y1 + oneThird;
    let y3 = y2 + oneThird;

    this.sketch.stroke(0);

    /*
        x0x1x2x3
    y0 |_|_|_|
    y1 |_|_|_|
    y2 |_|_|_|
    y3
     */

    if (block.connections.left == null) {
      // Left is blocked.
      this.sketch.line(x1, y1, x1, y2);
    } else {
      // Left is open.
      this.sketch.line(x0, y1, x1, y1);
      this.sketch.line(x0, y2, x1, y2);
    }

    if (block.connections.top == null) {
      // Top is blocked.
      this.sketch.line(x1, y1, x2, y1);
    } else {
      // Top is open.
      this.sketch.line(x1, y0, x1, y1);
      this.sketch.line(x2, y0, x2, y1);
    }

    if (block.connections.right == null) {
      // Right is blocked.
      this.sketch.line(x2, y1, x2, y2);
    } else {
      // Right is open.
      this.sketch.line(x2, y1, x3, y1);
      this.sketch.line(x2, y2, x3, y2);
    }

    if (block.connections.bottom == null) {
      // Bottom is blocked.
      this.sketch.line(x1, y2, x2, y2);
    } else {
      // Bottom is open.
      this.sketch.line(x1, y2, x1, y3);
      this.sketch.line(x2, y2, x2, y3);
    }

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

    for (let i = 0; i < nRoads * nRoads; ++i) {
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
        row.push(new CityBlock(j, i, j * this.blockSide + halfBlockSide, i * this.blockSide + halfBlockSide));
      matrix.push(row);
    }
    return matrix;
  }

  checkBounds(citizen) {

    let i = Math.floor(citizen.location.x / this.blockSide) - 1;
    let j = Math.floor(citizen.location.y / this.blockSide) - 1;

    if (i < 0 || j < 0) return;

    let block = this.blocks[i][j];

    if (block == null) {
      // console.log(`\nBlock c loc = ${i * this.blockSide + this.blockSide / 2}, ${j * this.blockSide + this.blockSide / 2}`);
      // console.log(`Location: ${citizen.location.x}, ${citizen.location.y}`);
      return;
    }

    let halfBlockSide = this.blockSide / 2;
    let oneThird = this.blockSide / 3;

    let x0 = block.cx - halfBlockSide;
    let x1 = x0 + oneThird;
    let x2 = x1 + oneThird;
    let x3 = x2 + oneThird;

    let y0 = block.cy - halfBlockSide;
    let y1 = y0 + oneThird;
    let y2 = y1 + oneThird;
    let y3 = y2 + oneThird;

    let loc = citizen.location;

    /*
        x0x1x2x3
    y0 |_|_|_|
    y1 |_|_|_|
    y2 |_|_|_|
    y3
     */

    // Block corners.
    if ((loc.x <= x1 || loc.x >= x2) && (loc.y <= y1 || loc.y >=y2)) {
      citizen.flipVelocityX();
    } else if ((loc.y >= y1 || loc.y <= y2) && (loc.x <= x1 || loc.x >= x2)) {
      citizen.flipVelocityY();
    }

    if (citizen.location.x <= x1 && block.connections.left == null) {
        citizen.flipVelocityX();
    }

  }

}

class CityBlock {
  constructor(x, y, cx, cy) {

    this.x = x;
    this.y = y;

    this.cx = cx;
    this.cy = cy;

    this.connections = {left: null, right: null, top: null, bottom: null};

  }
}
