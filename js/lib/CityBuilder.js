class CityBuilder {
  constructor(game) {
    this.game = game;
    this.params = game.paramsInjector.params;
  }

  build(sketch) {
    /*
    1. create a grid matrix. where each cell is the intersection.
    2. Now, each cell will have some properties
    3. Draw this matrix onto canvas.
     */

    this.matrix = this.createMatrix();

  }

  createMatrix() {
    // let roadWidth = this.params.side / this.params.rows;
    let nRoads = 1 / this.params.rows;
    let nClosures = nRoads * nRoads * this.params.roadClosures;
    let intersectionMatrix = this._getIntersectionsMatrix(nRoads);
    this.removeRandomRoads(intersectionMatrix, nRoads, nClosures);
    this.attachConnections(intersectionMatrix);
    return intersectionMatrix;
  }

  removeRandomRoads(matrix, nRoads, nClosures) {
    let indices = [];
    for (let i = 0; i < nRoads; ++i) indices[i] = i;
    let randomX = shuffle(indices);
    let randomY = shuffle(indices);
    for (let i = 0; i < nClosures; i++)
      matrix[randomX[i]][randomY[i]] = null;
  }

  attachConnections(matrix) {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        matrix[i][j].connections.top = (i === 0) ? null : matrix[i - 1][j];
        matrix[i][j].connections.bottom = (i === matrix.length - 1) ? null : matrix[i + 1][j];
        matrix[i][j].connections.left = (j === 0) ? null : matrix[i][j - 1];
        matrix[i][j].connections.right = (j === matrix.length - 1) ? null : matrix[i][j + 1];
      }
    }
  }

  _getIntersectionsMatrix(rows) {
    let matrix = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < rows; j++)
        row.push(new Intersection(i, j));
      matrix.push(row);
    }
    return matrix;
  }

}

class Intersection {
  constructor(x, y) {

    this.x = x;
    this.y = y;

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
