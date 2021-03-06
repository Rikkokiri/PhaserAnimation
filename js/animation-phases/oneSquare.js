/**
 * @author Rikkokiri
 */

var gameW;
var gameH;
var cX; // X-coordinate of the center of the canvas
var cY; // Y-coordinate of the center of the canvas

var oneSquare = 0;
var squareColor = 0xffffff;
var explosionSize = 200;
var littleSquares;

var littleSquaresSquarePositions;
var squareGoalPositions;

// Lower right
var explosionAngles =
[[45,   59.1,   98.4,   50.6,   90,    0,   5.625,  8.4375,   14.1,    45],
[14.1,  45,     61.9,   78.75,  90,    0,  11.25,  16.875,    45,      59.0],
[8.4,   16.9,   45,     67.5,   90,    0,   22.5,   45,       61.875,  98.4],
[5.6,   11.25,  22.5,   45,     90,    0,   45,     67.5,     78.75,   50.6],
[0,     0,      0,      0,      45,    0,   90.0,   90.0,     90.0,    90.0],
[90,    80,     75,     70,     0,     0,   0,      0,        0,       0],
[50.6,  78.7,   67.5,   45,     0,     90,  45,     22.5,     11.25,   5.6],
[98.4,  61.9,   45,     22.5,   0,     90,  67.5,   45,       16.9,    8.4],
[59.1,  45,     16.9,   11.25,  0,     90,  78.7,   61.9,     45,      14.1],
[45,    14.1,   8.4,    5.6,    0,     90,  50.6,   98.4,     59.1,    45]];

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

  squareGoalPositions = calculateGoalPositionsForLittleSquares(gameWidth, gameHeight);
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
    oneSquare.setSize(200);
  }
}

function oneSquareToOriginalSize(){
  oneSquare.setSize(explosionSize);
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
function calculateSpaceySquarePositions(biggerSquare, sizeAddition){

  var spaceySquarePositions = [];

  var littlesize = littleSquares[0][0].sidelength;

  var interval = (biggerSquare.sidelength + sizeAddition) / 10;
  var startingY = biggerSquare.getPoint(0).y - (sizeAddition / 2);
  var startingX = biggerSquare.getPoint(0).x - (sizeAddition / 2);

  var endingY = biggerSquare.getPoint(2).y + (sizeAddition / 2);
  var endingX = biggerSquare.getPoint(2).x + (sizeAddition / 2);

  var row = 0;

  for(var y = startingY; y <= endingY; y += interval){

    if(spaceySquarePositions[row] === undefined){
      spaceySquarePositions[row] = [];
    }

    for(var x = startingX; x <= endingX; x += interval){
      spaceySquarePositions[row].push(new Phaser.Point(x, y));
    }

    row++;
  }

  return spaceySquarePositions;
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

   var goalPoints = [];

   for(var row = 0; row < numberOfRows; row++){

     if(goalPoints[row] === undefined){
       goalPoints[row] = [];
     }

     for(var col = 0; col < numberOfCols; col++){

       // Calculate x coordinate
       var xCoord = 0.5 * xInterval + col * xInterval;

       // Calculate y coordinate
       var yCoord = 0.5 * yInterval + row * yInterval;

       // Save coordinates for square
       goalPoints[row][col] = new Phaser.Point(xCoord, yCoord);

     }
   }

   return goalPoints;
}

/**
 *
 */
function calculateGoalPositionsForLittleSquaresCenterpoints(gameWidth, gameHeight){

   var xInterval = gameWidth / littleSquares[0].length;
   var yInterval = gameHeight / littleSquares.length;

   var centeringAddition = littleSquares[0][0].sidelength / 2;

   var numberOfRows = littleSquares.length;
   var numberOfCols = littleSquares[0].length;

   var goalPoints = [];

   for(var row = 0; row < numberOfRows; row++){

     if(goalPoints[row] === undefined){
       goalPoints[row] = [];
     }

     for(var col = 0; col < numberOfCols; col++){

       // Calculate x coordinate
       var xCoord = 0.5 * xInterval + col * xInterval;

       // Calculate y coordinate
       var yCoord = 0.5 * yInterval + row * yInterval;

       // Save coordinates for square
       goalPoints[row][col] = new Phaser.Point(xCoord, yCoord);

     }
   }

   return goalPoints;
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

function spaceySquareFormation(sizeAddition){
  var positions = calculateSpaceySquarePositions(oneSquare, sizeAddition);
  moveLittleSquares(positions);
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

    // Upper section

    var anglematrix;

    for(var row = 0; row < numberOfRows; row++){
      for(var col = 0; col < numberOfCols; col++){


        var angle = getBaseAngle(row, col) + explosionAngles[row][col];
        var distanceMultiplier = Math.abs(row - 4.5) + Math.abs(col - 4.5);

        littleSquares[row][col].moveDistanceInAngle(distanceMultiplier + 50, angle);
      }
    }

}



function getBaseAngle(y, x){

  if(x >= 5){
    if(y >= 5){
      return 0;
    }
    else {
      return 270;
    }
  }
  else if(x < 5){
    if(y >= 5){
      return 90;
    }
    else {
      return 180;
    }
  }

}

function expandLittleSquares(amount){

  var numberOfRows = littleSquares.length;
  var numberOfCols = littleSquares[0].length;

  for(var row = 0; row < numberOfRows; row++){
    for(var col = 0; col < numberOfCols; col++){

      littleSquares[row][col].expand(amount);

    }
  }
}

/**
 *
 */
function drawLittleSquares(graphics){
  drawGrid(graphics, littleSquares);
}

function drawOneSquare(graphics){
  oneSquare.draw(graphics);
}


/**
 *
 */
function calculateIncrementalMoves(goalPoints, startingPoints, numberOfIncrementalPoints){

  var moves = [];

  for(var row = 0; row < startingPoints.length; row++){

    if(moves[row] === undefined){
      moves[row] = [];
    }

    for(var col = 0; col < startingPoints[row].length; col++){

        var angle = Phaser.Point.angle(goalPoints[row][col], startingPoints[row][col]);
        var angleInDegrees = angle * (180 / Math.PI);

        var entireDistance = Phaser.Point.distance(startingPoints[row][col], goalPoints[row][col], false);
        var moveDistance = entireDistance / numberOfIncrementalPoints;

        moves[row][col] = {angle: angleInDegrees, distance: moveDistance };
    }
  }

  return moves;
}

function moveSquaresInAngle(moves){

  var numberOfRows = littleSquares.length;
  var numberOfCols = littleSquares[0].length;

  for(var row = 0; row < numberOfRows; row++){
    for(var col = 0; col < numberOfCols; col++){

      var distance = moves[row][col].distance;
      var angle = moves[row][col].angle;

      littleSquares[row][col].moveDistanceInAngle(distance, angle);

    }
  }

}

function getLittleSquareCenters(){

  var numberOfRows = littleSquares.length;
  var numberOfCols = littleSquares[0].length;

  var centerPoints = [];

  for(var row = 0; row < numberOfRows; row++){

    if(centerPoints[row] === undefined){
      centerPoints[row] = [];
    }

    for(var col = 0; col < numberOfCols; col++){
      centerPoints[row][col] = littleSquares[row][col].center;
    }
  }

  return centerPoints;
}

// ==============================================
