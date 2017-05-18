/**
 * @author Rikkokiri
 */

var gameW;
var gameH;
var cX; // X-coordinate of the center of the canvas
var cY; // Y-coordinate of the center of the canvas

var oneSquare = 0;
var squareColor = 0xffffff;
var explosionSize = 300;
var littleSquares;

var littleSquaresSquarePositions;
var squareGoalPositions;
var spaceySquarePositions = [];

/*
 * Prepare for the animation sequence by defining some regularly used values
 * and build some of the needed shapes
 */
function prepareOneSquareAnimation(gameWidth, gameHeight){
  gameW = gameWidth;
  gameH = gameHeight;
  cX = gameWidth / 2;
  cY = gameHeight / 2;

  // Briefly set oneSquare to state it will be in when little squares are added to animation
  // Create the little squares based on this information
  oneSquare = new Square(0, 0, explosionSize, squareColor);
  oneSquare.centerOn(cX, cY);
  createLittleSquares(oneSquare);

  calculateGoalPositionsForLittleSquares(gameWidth, gameHeight);
  calculateSpaceySquarePositions(oneSquare);

  // Make oneSquare disappear (make it tiny);
  oneSquare.setSize(1);

}

function oneSquareSequence(phase, graphics){

  if(phase <= 2){
    if(oneSquare.sidelength == 1){
      // Pretend that the sidelength starts from 0
      oneSquare.setSize(oneSquare.sidelength - 1 + (phase + 1) * 20);
    }
    else {
      oneSquare.setSize(oneSquare.sidelength + (phase + 1) * 20);
    }
  }
  if(phase === 3){
    // oneSquare.rotateAroundCenter(-45);
    oneSquare.moveLeft(this.game.width * 0.35);
    oneSquare.setSize(200)
  }
  if(phase === 4){
    // oneSquare.rotateAroundCenter(90);
    oneSquare.moveRight(this.game.width * 0.7);
    oneSquare.setSize(240)
  }
  if(phase === 5){
    // oneSquare.rotateAroundCenter(-45);
    oneSquare.moveLeft(this.game.width * 0.35);
    oneSquare.setSize(300);
  }
  if(phase === 6){
    oneSquare.setColor(0x000000);
  }
  if(phase === 7){
    restoreOneSquareColor();
  }

}

/**
 * Create little squares that will form the bigger square (oneSquare) before
 * spreading out like flies (or something). TODO DOCUMENTATION
 */
function createLittleSquares(biggerSquare){

  var littlesize = biggerSquare.sidelength / 10;
  var startingY = biggerSquare.getPoint(0).y;
  var startingX = biggerSquare.getPoint(0).x;

  var endingY = biggerSquare.getPoint(2).y - littlesize;
  var endingX = biggerSquare.getPoint(2).x - littlesize;

  littleSquaresSquarePositions = [];
  littleSquares = [];

  for(var y = startingY; y <= endingY; y += littlesize){

    var row = (y - startingY) / littlesize;

    if(littleSquares[row] === undefined){
      littleSquares[row] = [];
    }

    if(littleSquaresSquarePositions[row] === undefined){
      littleSquaresSquarePositions[row] = [];
    }

    for(var x = startingX; x <= endingX; x += littlesize){
      // function Square (upperLeftX, upperLeftY, sidelength, color, linewidth, fill);
      littleSquaresSquarePositions[row].push(new Phaser.Point(x, y));
      littleSquares[row].push(new Square(x, y, littlesize, squareColor, 0, true));
    }

  }
}

/**
 * Calculate positions for little squares that they will be in a square formation but
 * there will be some space between them.
 */
function calculateSpaceySquarePositions(biggerSquare){

  var littlesize = littleSquares[0][0].sidelength;

  var sizeAddiotion = littleSquares[0].length * (0.4 * littlesize);

  var interval = (biggerSquare.sidelength + sizeAddiotion) / 10;
  var startingY = biggerSquare.getPoint(0).y - (sizeAddiotion / 2);
  var startingX = biggerSquare.getPoint(0).x - (sizeAddiotion / 2);

  var endingY = biggerSquare.getPoint(2).y + (sizeAddiotion / 2);
  var endingX = biggerSquare.getPoint(2).x + (sizeAddiotion / 2);

  if(spaceySquarePositions === undefined){
    spaceySquarePositions = [];
  }

  for(var y = startingY; y <= endingY; y += interval){

    var row = (y - startingY) / interval;

    if(spaceySquarePositions[row] === undefined){
      spaceySquarePositions[row] = [];
    }

    for(var x = startingX; x <= endingX; x += interval){
      spaceySquarePositions[row].push(new Phaser.Point(x, y));
    }
  }
}

/**
 * Restore OneSquare's colour to it's original, pre-defined color.
 */
function restoreOneSquareColor(){
  oneSquare.setColor(squareColor);
}


/**
 *
 */
function calculateGoalPositionsForLittleSquares(gameWidth, gameHeight){

   var xInterval = gameWidth / littleSquares[0].length;
   var yInterval = gameHeight / littleSquares.length;

   var numberOfRows = littleSquares.length;
   var numberOfCols = littleSquares[0].length;

   squareGoalPositions = [];

   for(var row = 0; row < numberOfRows; row++){

     if(squareGoalPositions[row] === undefined){
       squareGoalPositions[row] = [];
     }

     for(var col = 0; col < numberOfCols; col++){

       // Calculate x coordinate
       var xCoord = 0.5 * xInterval + col * xInterval;

       // Calculate y coordinate
       var yCoord = 0.5 * yInterval + row * yInterval;

       // Save coordinates for square
       squareGoalPositions[row][col] = new Phaser.Point(xCoord, yCoord);

     }
   }
}

/**
 * Move little squares to new positions stored in a 2D array newPositions
 *
 * @param {} newPositions - 2D array of new positions (Phaser.Point)
 */
function moveLittleSquares(newPositions){

  var numberOfRows = littleSquares.length;
  var numberOfCols = littleSquares[0].length;

  for(var row = 0; row < numberOfRows; row++){
    for(var col = 0; col < numberOfCols; col++){

      var point = newPositions[row][col];
      littleSquares[row][col].centerOn(point.x, point.y);

    }
  }
}

function littleSquaresToSquareFormation(){
  moveLittleSquares(littleSquaresSquarePositions);
}

function spreadOutFormation(){
  moveLittleSquares(squareGoalPositions);
}

function spaceySquareFormation(){
  moveLittleSquares(spaceySquarePositions);
}

function littleSquaresExplosionRandom(){

    var numberOfRows = littleSquares.length;
    var numberOfCols = littleSquares[0].length;

    for(var row = 0; row < numberOfRows; row++){
      for(var col = 0; col < numberOfCols; col++){

        var distance = 100 * Math.random() + 100;
        var angle = 360 * Math.random();
        littleSquares[row][col].moveDistanceInAngle(distance, angle);
      }
    }

}

function littleSquaresExplosion(){

    var numberOfRows = littleSquares.length;
    var numberOfCols = littleSquares[0].length;

    for(var row = 0; row < numberOfRows; row++){
      for(var col = 0; col < numberOfCols; col++){

        var distance = 100 * Math.random() + 100;
        var angle = 360 * Math.random();
        littleSquares[row][col].moveDistanceInAngle(distance, angle);
      }
    }

}


/**
 *
 */
function drawLittleSquares(graphics){
  drawGrid(graphics, littleSquares);
}

/**
 *
 */
function calculateIncrementalMovePoints(numberOfPoints){

}

/**
 * Move squares
 */
