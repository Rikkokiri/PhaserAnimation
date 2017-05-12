/**
*
*/

function AnimationState() {}

AnimationState.prototype = {

  /*
   *                C R E A T E
   * ============================================
   */
  create: function() {

    // Create the graphics objects and so on...
    this.createEssentials();


    introSquare = new SolidSquare(100, 100, 50, "0xffffff");

    // Prepare background etc. for the squareslide animation
    prepareSquareSlideAnimation(this.game.width, game.height);

    // For square reveal

    // Create the squares that will be moved to reveal the 6 x 8 checkered square grid
    revealSquareGrid = createRevealSquares(this.game.width, this.game.height, squaresInColumn);

    // Create the checkered 6 x 8 square grid
    checkeredGrid = createCheckeredHalfEmptyGrid(this.game.width, this.game.height, squaresInColumn, "0xffffff", true);


    // - - -  Finally... Music! - - -
    music = this.game.add.audio('sail');
    music.play();

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
      moveRevealSquares(this.game.width, game.height, squareSize, squareRevealMove, revealSquareGrid)
      squareRevealGoal += squareRevealMove;
    }
    else {
      delayCounter++;

      if(delayCounter >= 20){
        animationNumber = 5; //TODO Fix
        delayCounter = 0;
      }
    }

    drawSquareGrid(graphics, checkeredGrid);
    drawSquareGrid(graphics, revealSquareGrid);
  }

  // Prepare to pulse squares
  if(animationNumber == 5){
    this.game.stage.backgroundColor = "0xffffff";
    // checkeredGrid = createCheckeredHalfEmptyGrid(game.width, game.height, squaresInColumn, "0x000000", false);
    checkeredGrid = createOverflowingCheckeredHalfEmptyGrid(game.width, game.height, squaresInColumn, "0x000000", false, 100, 100);
    drawSquareGrid(graphics, checkeredGrid);

    pulseGoal = 1.2 * checkeredGrid[0][1].sidelength;
    returnGoal = checkeredGrid[0][1].sidelength;
    animationNumber = 6;
  }

  // Pulse squares
  if(animationNumber == 6){

    if(checkeredGrid[0][1].sidelength < pulseGoal && expanding){
      expandSquares(graphics, checkeredGrid, 1);
    }
    else {
      expanding = false;

      if(checkeredGrid[0][1].sidelength > returnGoal){
        shrinkSquares(graphics, checkeredGrid, 1);
      }
      else {
        // Move on to the next animation?
        this.game.stage.backgroundColor = "0x000000";
        checkeredGrid = createCheckeredHalfEmptyGrid(this.game.width, this.game.height, squaresInColumn, "0xffffff", true);
        animationNumber = 7;
      }
    }
    drawSquareGrid(graphics, checkeredGrid);
  }


  // Spin squares
  if(animationNumber == 7){

    spinSquaresTwoDirections(graphics, checkeredGrid, -1 * rotationAngle);

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
      spinSquaresTwoDirections(graphics, checkeredGrid, rotationAngle);
      // spinSquaresSameDirection(graphics, checkeredGrid, rotationAngle);
      rotationSum += Math.abs(rotationAngle);
    }
    else {
      drawSquareGrid(graphics, checkeredGrid);
    }
  }



}
