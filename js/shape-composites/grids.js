/**
 * Draw a grid of any shapes that have function draw() to given graphics
 *
 * @param {} graphics - TODO
 * @param {} grid - TODO
 */
function drawGrid(graphics, grid) {

  for(var row = 0; row < grid.length; row++){
    for(var col = 0; col < grid[row].length; col++){

      if(grid[row][col] !== undefined){
        grid[row][col].draw(graphics);
      }

    }
  }
}

/**
 * @param {} grid -
 * @param {Number} rowSlideAmount - Negative number -> Even rows will slide left and odd rows right
 *                                  Positive number -> Odd rows will slide left and odd rows right
 */
function slideShapesSidewaysToDirections(grid, evenRowSlide){

  for(var row = 0; row < grid.length; row++){
    for(var col = 0; col < grid[row].length; col++){

      if(grid[row][col] !== undefined){

        // Even row
        if(row % 2 == 0){
          grid[row][col].moveRight(evenRowSlide);
        }
        // Odd row
        else {
          grid[row][col].moveRight(-1 * evenRowSlide);
        }

      }
    }
  }
}

/**
 * @param {} grid -
 * @param {Number} rowSlideAmount - Negative number -> Even rows will slide up and odd rows down
 *                                  Positive number -> Odd rows will slide up and odd rows down
 */
function slideShapesUpDownToDirections(grid, evenRowSlide){

  for(var row = 0; row < grid.length; row++){
    for(var col = 0; col < grid[row].length; col++){

      if(grid[row][col] !== undefined){

        // Even row
        if(row % 2 == 0){
          grid[row][col].moveDown(evenRowSlide);
        }
        // Odd row
        else {
          grid[row][col].moveDown(-1 * evenRowSlide);
        }

      }
    }
  }
}


/**
 * @param {} grid -
 * @param {Number} expandAmount -
 */
function expandShapes(grid, expandAmount){

  for(var row = 0; row < grid.length; row++){
    for(var col = 0; col < grid[row].length; col++){

      if(grid[row][col] !== undefined){
        grid[row][col].expand(expandAmount);
      }
    }
  }
}

/**
 * @param {} grid -
 * @param {Number} expandAmount -
 */
function setGridOneColor(grid, color){

  for(var row = 0; row < grid.length; row++){
    for(var col = 0; col < grid[row].length; col++){

      if(grid[row][col] !== undefined){
        grid[row][col].setColor(color);
      }
    }
  }
}
