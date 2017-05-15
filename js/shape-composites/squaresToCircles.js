/**
 * TODO Documentation!
 *
 */
function createRoundedSquareGrid(gameWidth, gameHeight, squaresInColumn, color, startsFromCorner){

    squareSize = gameHeight / squaresInColumn;
    squaresOnRow = gameWidth / squareSize;
    numberOfSquares = (squaresOnRow) * squaresInColumn;

    var grid = [];

    for(var y = 0; y <= gameHeight - squareSize; y += 2 * squareSize) {

      var row = y / squareSize;

      if(grid[row] === undefined){
        grid[row] = [];
      }

      if(grid[row + 1] === undefined){
        grid[row + 1] = [];
      }

      // Rows starting with a square
      for(var x = 0; x <= gameWidth-squareSize; x += 2 * squareSize){
        if(startsFromCorner){
          grid[row].push(new Phaser.RoundedRectangle(x, y, squareSize, squareSize, radius));
        }
        else {
          grid[row + 1].push(new SolidSquare(x, y + squareSize, squareSize, color));
        }
      }

      // Rows starting with an empty space
      for(var x = squareSize; x <= gameWidth - squareSize; x += 2 * squareSize) {
        if(startsFromCorner){
          grid[row + 1].push(new SolidSquare(x, y + squareSize, squareSize, color));
        }
        else {
          grid[row].push(new SolidSquare(x, y, squareSize, color));
        }
      }

    }

    return grid;
}
