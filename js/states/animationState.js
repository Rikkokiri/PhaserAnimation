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

  // Flash colours on the beat
  if(animationNumber == 0){
    delayCounter++;

    if(delayCounter >= 24 && delayCounter < 48){

      // TODO Maybe flash something else?

      this.game.stage.backgroundColor = "0xffffff";
      // introSquare.drawSquare(this.graphics);
    }

    if(delayCounter >= 48){
      this.game.stage.backgroundColor = "0x000000";

      // Prepare for next phase
      introSquare.centerOn(centerX, centerY);
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

  if(animationNumber == 2){

    if(delayCounter % 30 == 0){

      // introSquare.expand(delayCounter);
      introSquare.expand(delayCounter);

      if(delayCounter >= 150){
        console.log("Expanding complete");
        animationNumber = 3;
      }

      // Square color
      if((delayCounter / 30) % 2 == 0){
        introSquare.setColor("0xff0000");
      }
      else {
        introSquare.setColor("0xffffff");
      }

    }

    introSquare.drawSquare(this.graphics);

    delayCounter++;
  }


  if(animationNumber == 3){

    // ???

  }

  // // "Lift" the background to go from blank background to two recntangles
  // if(animationNumber == 0){
  //
  //   //When lifting the background has finished, move to the next animation
  //   if(liftBackground(centerY, 20)){
  //     animationNumber = 1;
  //   }
  // }
  //
  // // Create two
  // if(animationNumber == 1){
  //   drawPolygonShape(background, bgColor);
  //   createTwoSquares(this.game.width/2);
  //   animationNumber = 2;
  //   // TODO Apply delay?
  // }
  //
  // //
  // if(animationNumber == 2){
  //   drawPolygonShape(background, bgColor);
  //
  //   if(twoSquaresSlidingFromTheRight(centerX, 10)){
  //       animationNumber = 3;
  //       delayCounter = 0;
  //   }
  // }
  //
  // // Go from two recntangles to four recntangles
  // if(animationNumber == 3){
  //   drawPolygonShape(background, bgColor);
  //   drawPolygonShape(twoSquares[0], "0x000000");
  //   drawPolygonShape(twoSquares[1], "0xffffff");
  //
  //   delayCounter++;
  //
  //   if(delayCounter >= 20){
  //     animationNumber = 4;
  //     delayCounter = 0;
  //   }
  // }


  if(animationNumber == 4){
    if(squareRevealGoal < squareSize){
      moveRevealSquares(this.game.width, this.game.height, squareSize, squareRevealMove, revealSquareGrid)
      squareRevealGoal += squareRevealMove;
    }
    else {
      delayCounter++;

      if(delayCounter >= 20){
        animationNumber = 5; //TODO Fix
        delayCounter = 0;
      }
    }

    drawSquareGrid(this.graphics, checkeredGrid);
    drawSquareGrid(this.graphics, revealSquareGrid);
  }

  // Prepare to pulse squares
  if(animationNumber == 5){
    this.game.stage.backgroundColor = "0xffffff";
    // checkeredGrid = createCheckeredHalfEmptyGrid(game.width, game.height, squaresInColumn, "0x000000", false);
    checkeredGrid = createOverflowingCheckeredHalfEmptyGrid(this.game.width, this.game.height, squaresInColumn, "0x000000", false, 100, 100);
    drawSquareGrid(this.graphics, checkeredGrid);

    pulseGoal = 1.2 * checkeredGrid[0][1].sidelength;
    returnGoal = checkeredGrid[0][1].sidelength;
    animationNumber = 6;
  }

  // Pulse squares
  if(animationNumber == 6){

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
        animationNumber = 7;
      }
    }
    drawSquareGrid(this.graphics, checkeredGrid);
  }


  // Spin squares
  if(animationNumber == 7){

    spinSquaresTwoDirections(this.graphics, checkeredGrid, -1 * rotationAngle);

    if(rotationSum < 179){
      rotationSum += Math.abs(rotationAngle);
    }
    else {
        checkeredGrid = createCheckeredHalfEmptyGrid(this.game.width, this.game.height, squaresInColumn, "0x000000", false);
        this.game.stage.backgroundColor = 0xffffff;
        rotationSum = 0;
        animationNumber = 8;
    }


  }

  if(animationNumber == 8){

    if(rotationSum < 120){
      spinSquaresTwoDirections(this.graphics, checkeredGrid, rotationAngle);
      // spinSquaresSameDirection(graphics, checkeredGrid, rotationAngle);
      rotationSum += Math.abs(rotationAngle);
    }
    else {
      drawSquareGrid(this.graphics, checkeredGrid);
    }
  }



}
