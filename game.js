const Board = require('./board.js');
const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const Game = function(reader) {
  this.board = new Board();
  this.reader = reader;
  this.currentMove = 'X';
  this.grid = this.board.grid;
};


let board = new Board();
board.print();

Game.prototype.getInput = function(callback, completionCallback) {
  this.print();

  this.reader.question('Choose a cell (in x, y format) to move to:\n', response => {
    const row = parseInt(response[0]);
    const col = parseInt(response[response.length - 1]);

    callback(row, col, this.currentMove);
    // this,run();
  });
};

Game.prototype.isValidMove = function(row, col) {
  if (row < 0 || col < 0)
    return false;
  else if (row >= this.grid.length || col >= this.grid[0].length)
    return false;
  else if (this.grid[row][col] !== ' ')
    return false;
  else
    return true;
};

Game.prototype.placeMove = function(row, col, symbol) {
  if (this.isValidMove(row, col)) {
    this.grid[row][col] = symbol;
    this.nextMarker();
    return true;
  }
  else {
    return false;
  }
};

Game.prototype.checkGrid = function(grid) {
  return grid.some( (row) => row.filter(el => el === row[0]).length === 1 && row[0] !== ' ');
};

Game.prototype.nextMarker = function () {
  this.currentMove === 'X' ? this.currentMove = 'O' : this.currentMove = 'X';
};

Game.prototype.isWon = function() {
  if (this.checkGrid(this.grid))
    return true;
  else if (this.checkGrid(this.grid.transpose))
    return true;
  else if (this.checkGrid(this.board.diagonals))
    return true;
  else
    return false;
};

const myGame = new Game(reader);
myGame.placeMove(1, 1, 'X');
