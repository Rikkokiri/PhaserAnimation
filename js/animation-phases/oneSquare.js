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

var squareGoalPositions = [];

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

  // Make oneSquare disappear (make it tiny);
  oneSquare.setSize(1);

}

function oneSquareSequence(phase){
  
  if(phase <= 2){
    oneSquare.setSize(oneSquare.sidelength + ((delayCounter / 30) + 1) * 25);
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

  littleSquares = [];

  for(var y = startingY; y <= endingY; y += littlesize){

    var row = (y - startingY) / littlesize;

    if(littleSquares[row] === undefined){
      littleSquares[row] = [];
    }

    for(var x = startingX; x <= endingX; x += littlesize){
      // function Square (upperLeftX, upperLeftY, sidelength, color, linewidth, fill);
      littleSquares[row].push(new Square(x, y, littlesize, squareColor, 0, true));
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

function moveLittleSquares(){

  var numberOfRows = littleSquares.length;
  var numberOfCols = littleSquares[0].length;

  console.log("numberOfRows", numberOfRows);
  console.log("numberOfCols", numberOfCols);

  for(var row = 0; row < numberOfRows; row++){
    for(var col = 0; col < numberOfCols; col++){

      var point = squareGoalPositions[row][col];
      littleSquares[row][col].centerOn(point.x, point.y);

    }
  }

}

function calculateExplosionPoints(){


    var numberOfRows = littleSquares.length;
    var numberOfCols = littleSquares[0].length;

    for(var row = 0; row < numberOfRows; row++){
      for(var col = 0; col < numberOfCols; col++){

        //


      }
    }

}

// /**
//  *
//  */
// function drawLittleSquares(graphics){
//
//   for(var row = 0; row < littleSquares.length; row++){
//     for(var col = 0; col < littleSquares[row].length; col++){
//
//       littleSquares[row][col].draw(graphics);
//
//     }
//   }
// }

/**
 *
 */
function calculateIncrementalMovePoints(numberOfPoints){

}

/**
 * Move squares
 */
