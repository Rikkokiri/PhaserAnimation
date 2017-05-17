/**
 * @author Rikkokiri
 */

var gameW;
var gameH;
var cX; // X-coordinate of the center of the canvas
var cY; // Y-coordinate of the center of the canvas

var oneSquare = 0;
var squareColor = 0xffffff;
var explosionSize;
var littleSquares;

/*
 * Prepare for the animation sequence by defining some regularly used values
 * and build some of the needed shapes
 */
function prepareOneSquareAnimation(gameWidth, gameHeight){
  gameW = gameWidth;
  gameH = gameHeight;
  cX = gameWidth / 2;
  cY = gameHeight / 2;

  oneSquare = new Square(0, 0, 50, squareColor);
  oneSquare.centerOn(cX, cY);
}

/**
 * Create little squares that will form the bigger square (oneSquare) before
 * spreading out like flies (or something). TODO DOCUMENTATION
 */
function createLittleSquares(oneSquare){

  var littlesize = oneSquare.sidelength / 10;
  var startingY = oneSquare.getPoint(0).y;
  var startingX = oneSquare.getPoint(0).x;

  var endingY = oneSquare.getPoint(1).y - littlesize;
  var endingX = oneSquare.getPoint(1).x - littlesize;

  littleSquares = [];

  for(var y = startingY; y < endingY; y += littlesize){

    var row = (y - startingY) % littlesize;
    (littleSquares[row] === undefined) ? littleSquares = [];

    for(var x = startingX; x < endingX; x += littlesize){
      // function Square (upperLeftX, upperLeftY, sidelength, color, linewidth, fill);
      littleSquares[row].push(new Square(x, y, littlesize, squareColor, 0, true));
    }
  }
}

/*
 *
 */
function expandTheSquare(amount){
  
}
