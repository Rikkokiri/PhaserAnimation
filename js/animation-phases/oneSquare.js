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
var littleSquares = [];

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
  oneSquare = new Square(0, 0, explosionSize, squareColor, 1, true);
  oneSquare.centerOn(cX, cY);
  createLittleSquares();

  // Make oneSquare disappear (make it tiny);
  oneSquare.setSize(1);

}

/**
 * Create little squares that will form the bigger square (oneSquare) before
 * spreading out like flies (or something). TODO DOCUMENTATION
 */
function createLittleSquares(){

  var littlesize = oneSquare.sidelength / 10;
  var startingY = oneSquare.getPoint(0).y;
  var startingX = oneSquare.getPoint(0).x;

  var endingY = oneSquare.getPoint(2).y - littlesize;
  var endingX = oneSquare.getPoint(2).x - littlesize;


  for(var y = startingY; y <= endingY; y += littlesize){

    var row = (y - startingY) % littlesize;
    console.log("Row:", row);

    if(littleSquares[row] === undefined){
      littleSquares[row] = [];
    }

    for(var x = startingX; x <= endingX; x += littlesize){
      // function Square (upperLeftX, upperLeftY, sidelength, color, linewidth, fill);
      littleSquares[row].push(new Square(x, y, littlesize, squareColor, 0, true));
    }
  }
  console.log("Squares created", littleSquares);
}

function restoreOneSquareColor(){
  oneSquare.setColor(squareColor);
}
