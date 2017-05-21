// ===================== CREATE DIFFERENT ROUNDED SQUARE GRIDS =====================

/**
 * Create a checkered grid
 *
 * Even rows start with color1
 * Odd rows start with color 2
 */
function createFullCheckeredRoundedSquareGrid(gameWidth, gameHeight, squaresInColumn, color1, color2, cornerradius){

  squareSize = gameHeight / squaresInColumn;
  squaresOnRow = gameWidth / squareSize;
  numberOfSquares = (squaresOnRow) * squaresInColumn;

  var grid = [];

  var firstColor;
  var secondColor;

  for(var y = 0; y <= gameHeight - squareSize; y += squareSize){

    var row = y / squareSize;

    if(grid[row] === undefined) {
      grid[row] = [];
    }

    // Even rows start with color1
    if(row % 2 === 0) {
      firstColor = color1;
      secondColor = color2;
    }
    // Odd rows start with color 2
    else {
        firstColor = color2;
        secondColor = color1;
    }

    // Create
    for(var x = 0; x <= gameWidth - squareSize; x += squareSize){

      var cell = x / squareSize;

      // Determine the color of the square
      if(cell % 2 == 0){
        // function Square (upperLeftX, upperLeftY, sidelength, color) {
        grid[row][cell] = new RoundedSquare(x, y, squareSize, cornerradius, firstColor);
      }
      else {
        grid[row][cell] = new RoundedSquare(x, y, squareSize, cornerradius, secondColor);
      }
    }
  }

  // Return the finished grid
  return grid;
}

/**
 * TODO Documentation!
 *
 */
function createCheckeredHalfEmptyRoundedSquareGrid(gameWidth, gameHeight, squaresInColumn, color, startsFromCorner, cornerradius){

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
          grid[row].push(new RoundedSquare(x, y, squareSize, cornerradius, color));
        }
        else {
          grid[row + 1].push(new RoundedSquare(x, y + squareSize, squareSize, cornerradius, color));
        }
      }

      // Rows starting with an empty space
      for(var x = squareSize; x <= gameWidth - squareSize; x += 2 * squareSize) {
        if(startsFromCorner){
          grid[row + 1].push(new RoundedSquare(x, y + squareSize, squareSize, cornerradius, color));
        }
        else {
          grid[row].push(new RoundedSquare(x, y, squareSize, cornerradius, color));
        }
      }

    }

    return grid;
}

// ==================== =============================
