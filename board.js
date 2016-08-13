Number.prototype.times = function(fn, ctx){
  if (!fn) return;
  var scope = ctx || null;
  for (var _x = 0, _xx = ~~this.valueOf(); _x < _xx; _x++) {
    fn.call(scope, _x, _xx);
  }
  return this.valueOf();
};

let transpose = function (arr) {
  let newMatrix = [];
  for (var i = 0; i < arr.length; i++) {
    let newRow = [];
    for (var j = 0; j < arr.length; j++) {
        newRow.push(arr[j][i]);
    }
    newMatrix.push(newRow);
  }
  return newMatrix;
};

const Board = function() {
  this.grid = [];
  (3).times( () => this.grid.push([' ',' ',' ']));
};

Board.prototype.print = function() {
  this.grid.forEach(row => console.log(JSON.stringify(row)));
};

Board.prototype.transpose = function() {
  return transpose(this.grid);
};

Board.prototype.diagonals = function() {
  const diagonalArr = [[], []];
  [0, 1, 2].forEach((el) => {
    let firstDiags = [];
    let secondDiags = [];
    firstDiags.push(this.grid[el][el]);
    secondDiags.push(this.grid[el][2 - el]);
    diagonalArr[0].concat(firstDiags);
    diagonalArr[1].concat(secondDiags);
  });
  return diagonalArr;
};

let board = new Board();
console.log(board.diagonals());



module.exports = Board;
