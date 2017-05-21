// ===================== CREATE DIFFERENT SQUARE GRIDS =====================

/**
 * Create a checkered grid
 *
 * Even rows start with color1
 * Odd rows start with color 2
 */
function createFullCheckeredGrid(gameWidth, gameHeight, squaresInColumn, color1, color2){

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
        grid[row][cell] = new Square(x, y, squareSize, firstColor);
      }
      else {
        grid[row][cell] = new Square(x, y, squareSize, secondColor);
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
function createCheckeredHalfEmptyGrid(gameWidth, gameHeight, squaresInColumn, color, startsFromCorner){

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
          grid[row].push(new Square(x, y, squareSize, color));
        }
        else {
          grid[row + 1].push(new Square(x, y + squareSize, squareSize, color));
        }
      }

      // Rows starting with an empty space
      for(var x = squareSize; x <= gameWidth - squareSize; x += 2 * squareSize) {
        if(startsFromCorner){
          grid[row + 1].push(new Square(x, y + squareSize, squareSize, color));
        }
        else {
          grid[row].push(new Square(x, y, squareSize, color));
        }
      }

    }

    return grid;
}

// ==================== OVERFLOWING VERSIONS OF THE GRIDS ====================

/**
 * TODO Documentation!
 *
 * @param {Number} gameWidth -
 * @param {Number} gameHeight -
 * @param {Number} squaresInColumn -
 * @param {String} color1 - Hex code representing a color
 * @param {String} color2 - Hex code representing a color
 * Color strings are not being validated. It is user's responsibility to provide valid hex codes.
 *
 * @param {Number} overflowX - Represents the amount of overflow on each side on X axis
 * @param {Number} overflowY - Represents the amount of overflow on each side on Y axis
 *
 */
function createOverflowingFullCheckeredGrid(gameWidth, gameHeight, squaresInColumn, color1, color2, overflowX, overflowY){

  squareSize = gameHeight / squaresInColumn;
  squaresOnRow = gameWidth / squareSize;
  numberOfSquares = (squaresOnRow) * squaresInColumn;

  var grid = [];

  var firstColor;
  var secondColor;

  for(var y = 0 - overflowY; y <= gameHeight - squareSize + overflowY; y += squareSize){

    var row = (y + overflowY) / squareSize;

    if(grid[row] === undefined) {
      grid[row] = [];
    }

    // Even rows start with color1
    if(row % 2 == 0){
      firstColor = color1;
      secondColor = color2;
    }
    // Odd rows start with color 2
    else {
        firstColor = color2;
        secondColor = color1;
    }

    // Create
    for(var x = 0 - overflowX; x <= gameWidth - squareSize + overflowX; x += squareSize){

      var cell = (x + overflowX) / squareSize;

      // Determine the color of the square
      if(cell % 2 == 0){
        // function Square (upperLeftX, upperLeftY, sidelength, color) {
        grid[row][cell] = new Square(x, y, squareSize, firstColor);
      }
      else {
        grid[row][cell] = new Square(x, y, squareSize, secondColor);
      }
    }

  }
  return grid;
}

/**
 * TODO Documentation!
 *
 */
function createOverflowingCheckeredHalfEmptyGrid(gameWidth, gameHeight, squaresInColumn, color, startsFromCorner, overflowX, overflowY){

    squareSize = gameHeight / squaresInColumn;
    squaresOnRow = gameWidth / squareSize;
    numberOfSquares = (squaresOnRow) * squaresInColumn;

    var grid = [];

    for(var y = 0 - overflowY; y <= gameHeight - squareSize + overflowY; y += 2 * squareSize) {

        var row = (y + overflowY) / squareSize;

        if(grid[row] === undefined){
            grid[row] = [];
        }

        if(grid[row + 1] === undefined){
          grid[row + 1] = [];
        }

        // Rows starting with a square
        for(var x = 0 - overflowX; x <= gameWidth - squareSize + overflowX; x += 2 * squareSize) {
            if(startsFromCorner){
              grid[row].push(new Square(x, y, squareSize, color));
            }
            else {
              grid[row + 1].push(new Square(x, y + squareSize, squareSize, color));
            }
        }

        // Rows starting with an empty space
        for(var x = squareSize - overflowX; x <= gameWidth - squareSize + overflowX; x += 2 * squareSize) {
            if(startsFromCorner) {
              grid[row + 1].push(new Square(x, y + squareSize, squareSize, color));
            }
            else {
              grid[row].push(new Square(x, y, squareSize, color));
            }
        }
    }

    return grid;
}



// ==================== SPIN SQUARES =====================

/*
 * Animate the squares spinning
 */
function spinSquaresSameDirection(graphics, grid, rotationAngle) {

    // First rotate each square
    for(var row = 0; row < grid.length; row++){
      for(var col = 0; col < grid[row].length; col++){

        grid[row][col].rotateAroundCenter(rotationAngle);

      }
    }
    // Draw the grid
    drawGrid(graphics, grid);
}

/*
 * TODO
 * TODO Give option to choose whether it's even rows or odd rows that spin clockwise
 */
function spinSquaresTwoDirections(graphics, grid, rotationAngle) {

    // First rotate each square
    for(var row = 0; row < grid.length; row++){
      for(var index = 0; index < grid[row].length; index++){

        var angle;

        if(row % 2 == 0){
          angle = rotationAngle;
        }
        else {
          angle = -1 * rotationAngle;
        }

        grid[row][index].rotateAroundCenter(angle);

      }
    }

    // Draw the grid
    drawGrid(graphics, grid);
}

/*
 * Shrink the squares
 */
function shrinkSquares(graphics, grid, amount){

   for(var row = 0; row < grid.length; row++){
     for(var index = 0; index < grid[row].length; index++){
       grid[row][index].shrink(amount);
     }
   }

   // Draw the grid
   drawGrid(graphics, grid);
}

 /*
  * Expand the squares
  */
function expandSquares(graphics, grid, amount){

    for(var row = 0; row < grid.length; row++){
      for(var index = 0; index < grid[row].length; index++){
        grid[row][index].expand(amount);
      }
    }

    // Draw the grid
    drawGrid(graphics, grid);
}
