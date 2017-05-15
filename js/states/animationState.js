/**
*
*/

function AnimationState() {}

var centerX;
var centerY;

// For timing the animations
var startTime = 0;

var animationNumber = 0;

var delayCounter = 0;
var delayNeeded = true;


var twoSquares = [];

// ------- For sliding squares ----------
var background;

// ------- For square reveal ----------
var revealSquareGrid;
var squaresInColumn = 6;
var squareSize;
var numberOfSquares;
var squaresOnRow;

var checkeredGrid;
var squareRevealMove = 5;
var squareRevealGoal = 0;

// ------- For "pulsing" the squares ----------
var pulseGoal;
var returnGoal;
var expanding = true;

// ------- For spinning squares ----------
// Reuse the checkeredGrid
var rotationSum = 0;
var rotationAngle = 1;

AnimationState.prototype = {

  /*
   *                C R E A T E
   * ============================================
   */
  create: function() {

    // Create the this.graphics objects and so on...
    this.createEssentials();


    introSquare = new SolidSquare(0, 0, 50, "0xffffff");
    introSquare.centerOn(centerX, centerY);

    // Prepare background etc. for the squareslide animation
    // prepareSquareSlideAnimation(this.game.width, this.game.height);

    // For square reveal

    // Create the squares that will be moved to reveal the 6 x 8 checkered square grid
    revealSquareGrid = createRevealSquares(this.game.width, this.game.height, squaresInColumn);

    // Create the checkered 6 x 8 square grid
    checkeredGrid = createCheckeredHalfEmptyGrid(this.game.width, this.game.height, squaresInColumn, "0xffffff", true);



    prepareSquareSlideAnimation(this.game.width, this.game.height, this.graphics);

    // - - -  Finally... Music! - - -
    music = this.game.add.audio('sail');
    music.play();

    //
    var startTime = this.game.time.now;

  },

  createEssentials: function() {

    this.graphics = this.game.add.graphics(0,0);
    centerX = this.game.width / 2;
    centerY = this.game.height / 2;

  }

}

/*
 *                U P D A T E
 * ============================================
 */
AnimationState.prototype.update = function() {

  this.graphics.clear();

  // Just wait for first two beats
  if(animationNumber == 0){
    // this.flashBackgroundColors(24, 0xffffff, 0x000000);  REMOVE
    delayCounter++;

    if(delayCounter >= 48){
      animationNumber = 1;
      delayCounter = 0;
    }
  }

  // Prepare for the next phase
  if(animationNumber == 1){
    delayCounter++;

    if(delayCounter >= 36){
      animationNumber = 2;
      delayCounter = 0;
    }

  }

  // TODO Roll in the name?

  if(animationNumber == 2){

    if(delayCounter % 30 == 0){

      // introSquare.expand(delayCounter);
      introSquare.expand(delayCounter);

      if(delayCounter >= 150){ // TODO Or 210?

        console.log("Expanding complete");
        this.game.stage.backgroundColor = "0xffffff"; // TODO Remove?
        delayCounter = 0;
        animationNumber = 3;
      }

      // Square color
      if((delayCounter / 30) % 2 == 0){
        // introSquare.setColor("0xff0000");
        introSquare.setColor("0xa50000");
      }
      else {
        introSquare.setColor("0xffffff");
      }

    }

    introSquare.draw(this.graphics);

    delayCounter++;
  }

  if(animationNumber == 3){
    // Maybe?
    // this.flashBackgroundColors(30, 0x000000, 0xffffff);
    //
    animationNumber = 4;
    delayCounter = 0;
    this.game.stage.backgroundColor = "0x000000"; // TODO Remove?
  }

  if(animationNumber == 4){
    delayCounter++;

    // This will just be a placeholder for a while
    // Wait for the part where the square sliding sequence starts

    // Song at 17.4 seconds at this point
    // Wait for 12.4 seconds?
    // 60 fps => counter 60 * 12 = 720
    if(delayCounter >= 810){
      animationNumber = 21;

      delayCounter = 0;
    }

  }

  // ---------- START SEQUENCE FROM ANIMATION NUMBER 22 ----------

  //Prepare for "lifting" the background
  if(animationNumber == 21){
    //SolidSquare (upperLeftX, upperLeftY, sidelength, color, linewidth, fill) {
    background = new SolidSquare(0, this.game.height, this.game.width, 0xffffff, 0, true);

    animationNumber = 22;
  }

  /* "Lift" the background to go from black background to two recntangles
   * From 17.4 s to 21.5 s in the song => delay 4.1 s = 246 frames
   */
  if(animationNumber == 22){
    delayCounter++;

    if(delayCounter >= 246){
      animationNumber = 23;
      delayCounter = 0;
    }

    if(background.square.points[0].y > centerY){
      background.moveUp(10);
    }

    background.draw(this.graphics);
  }

  // ------- THIS IS WHERE I LEFT OFF. THE NEXT PHASE DOESN'T WORK ------------

  // ----- WAIT ------

  // Create two
  if(animationNumber == 23){
    background.draw(this.graphics);
    createTwoSquares(this.game.width/2);
    animationNumber = 24;
    // TODO Apply delay?
  }

  //
  if(animationNumber == 24){
    background.draw(this.graphics);

    if(twoSquaresSlidingFromTheRight(centerX, 10)){
        animationNumber = 25;
        delayCounter = 0;
    }
  }

  // ----- WAIT ------

  // Go from two recntangles to four recntangles
  if(animationNumber == 25){
    background.draw(this.graphics);
    drawPolygonShape(twoSquares[0], "0x000000");
    drawPolygonShape(twoSquares[1], "0xffffff");

    delayCounter++;

    if(delayCounter >= 20){
      animationNumber = 26;
      delayCounter = 0;
    }
  }

  // ----- WAIT ------

  if(animationNumber == 26){
    if(squareRevealGoal < squareSize){
      moveRevealSquares(this.game.width, this.game.height, squareSize, squareRevealMove, revealSquareGrid)
      squareRevealGoal += squareRevealMove;
    }
    else {
      delayCounter++;

      if(delayCounter >= 20){
        animationNumber = 27; //TODO Fix
        delayCounter = 0;
      }
    }

    drawGrid(this.graphics, checkeredGrid);
    drawGrid(this.graphics, revealSquareGrid);
  }

  // Prepare to pulse squares
  if(animationNumber == 27){
    this.game.stage.backgroundColor = "0xffffff";
    // checkeredGrid = createCheckeredHalfEmptyGrid(game.width, game.height, squaresInColumn, "0x000000", false);
    checkeredGrid = createOverflowingCheckeredHalfEmptyGrid(this.game.width, this.game.height, squaresInColumn, "0x000000", false, 100, 100);
    drawGrid(this.graphics, checkeredGrid);

    pulseGoal = 1.2 * checkeredGrid[0][1].sidelength;
    returnGoal = checkeredGrid[0][1].sidelength;

    animationNumber = 28;
  }

  // Pulse squares
  if(animationNumber == 28){

    if(checkeredGrid[0][1].sidelength < pulseGoal && expanding){
      expandSquares(this.graphics, checkeredGrid, 1);
    }
    else {
      expanding = false;

      if(checkeredGrid[0][1].sidelength > returnGoal){
        shrinkSquares(this.graphics, checkeredGrid, 1);
      }
      else {
        // Move on to the next animation?
        this.game.stage.backgroundColor = "0x000000";
        checkeredGrid = createCheckeredHalfEmptyGrid(this.game.width, this.game.height, squaresInColumn, "0xffffff", true);
        animationNumber = 29;
      }
    }
    drawGrid(this.graphics, checkeredGrid);
  }


  // Spin squares
  if(animationNumber == 29){

    spinSquaresTwoDirections(this.graphics, checkeredGrid, -1 * rotationAngle);

    if(rotationSum < 179){
      rotationSum += Math.abs(rotationAngle);
    }
    else {
        checkeredGrid = createCheckeredHalfEmptyGrid(this.game.width, this.game.height, squaresInColumn, "0x000000", false);
        this.game.stage.backgroundColor = 0xffffff;
        rotationSum = 0;
        animationNumber = 30;
    }


  }

  if(animationNumber == 30){

    if(rotationSum < 120){
      spinSquaresTwoDirections(this.graphics, checkeredGrid, rotationAngle);
      // spinSquaresSameDirection(graphics, checkeredGrid, rotationAngle);
      rotationSum += Math.abs(rotationAngle);
    }
    else {
      drawGrid(this.graphics, checkeredGrid);
    }
  }

}


AnimationState.prototype.flashBackgroundColors = function(interval, firstColor, secondColor) {
  delayCounter++;

  if(delayCounter >= interval && delayCounter < 2 * interval){

    // TODO Maybe flash something else?

    this.game.stage.backgroundColor = firstColor;
    // introSquare.draw(this.graphics);
  }

  if(delayCounter >= 2 * interval){
    this.game.stage.backgroundColor = secondColor;

    // Prepare for next phase
    introSquare.centerOn(centerX, centerY);
    animationNumber++;
    delayCounter = 0;
    return;
  }
}
