/**
 * @author Rikkokiri
 * May 2017
 */

// ===================== CREATE DIFFERENT CIRCLE GRIDS =====================

/**
 * FULL CHECKERED GRID
 */
function createFullCheckeredCircleGrid(gameWidth, gameHeight, circlesInColumn, color1, color2){

  var circleSize = gameHeight / circlesInColumn;
  var circlesOnRow = gameWidth / circleSize;
  var numberOfCircles = circlesOnRow * circlesInColumn;

  var grid = [];


}

/**
 * HALF-EMPTY GRID
 */
function createHalfEmptyCircleGrid(gameWidth, gameHeight, circlesInColumn, color, startsFromCorner){

  var circleSize = gameHeight / circlesInColumn;
  var circlesOnRow = gameWidth / circleSize;
  var numberOfCircles = circlesOnRow * circlesInColumn;

  var grid = [];

  for(var y = circleSize / 2; y < gameHeight - circleSize / 2; y += 2 * circleSize){

    var row = (y - circleSize / 2) / circleSize;

    if(grid[row] === undefined){
      grid[row] = [];
    }

    if(grid[row + 1] === undefined){
      grid[row + 1] = [];
    }

    // Rows starting with a circle
    for( var x = circleSize / 2; x <= gameWidth - circleSize / 2; x += 2 * circleSize ){
      if(startsFromCorner){
        grid[row].push(new Circle(x, y, circleSize, color));
      }
      else {
        grid[row + 1].push(new Circle(x, y + circleSize, circleSize, color));
      }
    }


    // Rows starting with an empty space
    for( var x = 1.5 * circleSize; x <= gameWidth - circleSize / 2; x += 2 * circleSize ){
      if(startsFromCorner){
        grid[row + 1].push(new Circle(x, y + circleSize, circleSize, color));
      }
      else {
        grid[row].push(new Circle(x, y, circleSize, color));
      }
    }

  }

  return grid;
}


// ==================== OVERFLOWING VERSIONS OF THE GRIDS ====================


/**
 * OVERFLOWING HALF-EMPTY GRID
 */
function createOverflowingHalfEmptyCircleGrid(gameWidth, gameHeight, circlesInColumn, color, startsFromCorner, overflowX, overflowY){

  var circleSize = gameHeight / circlesInColumn;
  var circlesOnRow = gameWidth / circleSize;
  var numberOfCircles = circlesOnRow * circlesInColumn;

  var grid = [];

  for(var y = circleSize / 2 - overflowY; y < gameHeight - circleSize / 2 + overflowY; y += 2 * circleSize){

    var row = (y - circleSize / 2 + overflowY) / circleSize;

    if(grid[row] === undefined){
      grid[row] = [];
    }

    if(grid[row + 1] === undefined){
      grid[row + 1] = [];
    }

    // Rows starting with a circle
    for( var x = circleSize / 2 - overflowX; x <= gameWidth - circleSize / 2 + overflowX; x += 2 * circleSize ){
      if(startsFromCorner){
        grid[row].push(new Circle(x, y, circleSize, color));
      }
      else {
        grid[row + 1].push(new Circle(x, y + circleSize, circleSize, color));
      }
    }


    // Rows starting with an empty space
    for( var x = 1.5 * circleSize - overflowX; x <= gameWidth - circleSize / 2 + overflowX; x += 2 * circleSize ){
      if(startsFromCorner){
        grid[row + 1].push(new Circle(x, y + circleSize, circleSize, color));
      }
      else {
        grid[row].push(new Circle(x, y, circleSize, color));
      }
    }

  }

  return grid;
}








/*
 * Shrink the circles
 */
function shrinkCircles(graphics, grid, amount){

  for(var row = 0; row < grid.length; row++){
     for(var index = 0; index < grid[row].length; index++){
       grid[row][index].shrink(amount);
     }
  }
}

 /*
  * Expand the circles
  */
function expandCircles(graphics, grid, amount){

  for(var row = 0; row < grid.length; row++){
      for(var index = 0; index < grid[row].length; index++){
        grid[row][index].expand(amount);
      }
  }
}
