/**
* @author Rikkokiri
*/

function AnimationState() {}

var centerX;
var centerY;

// For timing the animations
var startTime = 0;

var animationNumber = 0;

var delayCounter = 0;

var counter = 0;

// ------- For sliding squares ----------
var bg;
var twoRecs; // This will be an array

// ------- For square reveal part of sliding squares ----------
var revealSquareGrid;
var squaresInColumn = 6;
var squareSize;
var numberOfSquares;
var squaresOnRow;

var checkeredGrid;
var checkeredGridBlack;
var checkeredGridWhite;
var checkeredGridFull; // NOT YET USED?

var squareRevealGoal = 0;

// ------- For "pulsing" the squares ----------
var pulseGoal;
var shrinkGoal;
var returnGoal;
var expanding = true;

// -------- For little square animation --------
var littleSquareSizeAddition = 0;
var littleSquareMoves;

// -------- For repeating state 30 -------
var state30visited = 0;

// ------- For spinning squares ----------
// Reuse the checkeredGrid
var rotationSum = 0;
var rotationAngle = 1;

// ------- For spinning squares ----------
var roundedGrid;
var circleGrid;
var cornerradius = 1;

// ------- For credits ----------
var credit1;
var credit2;
var creditstyle;

var fadeInCredit1;
var fadeOutCredit1;
var fadeInCredit2;
var fadeOutCredit2;



AnimationState.prototype = {

  /*
   *                C R E A T E
   * ============================================
   */
  create: function() {

    // Create the this.graphics objects and so on...
    this.createEssentials();

    prepareIntroTexts(this.game);

    // For square reveal

    // Create the squares that will be moved to reveal the 6 x 8 checkered square grid
    revealSquareGrid = createRevealSquares(this.game.width, this.game.height, squaresInColumn);

    // Create the checkered 6 x 8 square grid
    checkeredGrid = createCheckeredHalfEmptyGrid(this.game.width, this.game.height, squaresInColumn, "0xffffff", true);

    // - - -  Finally... Music! - - -
    music = this.game.add.audio('sail');
    this.addMarkers();
    music.onFadeComplete.add(backToReadyState, this);

    // music.play("credits");
    // animationNumber = 49;

    music.play("animationSong");

  },

  /**
   * Define some essential variables and create the graphics object
   */
  createEssentials: function() {

    this.graphics = this.game.add.graphics(0,0);
    centerX = this.game.width / 2;
    centerY = this.game.height / 2;

  },

  /**
   * Add some markers to the audio. Mostly just for development purposes.
   *
   */
  addMarkers: function() {

    // addMarker(name, start, duration, volume, loop)

    music.addMarker("animationSong", 0.0, 65.8);

    // Lift the background
    music.addMarker("oneSquare", 5.3, 90);

    music.addMarker("teeth", 13.3, 90);
    music.addMarker("xxzz", 17.3, 60);
    music.addMarker("xxzz2", 21.3, 60);
    music.addMarker("PA", 25.3, 120);

    music.addMarker("circles", 43.85, 60);
    music.addMarker("credits", 50.6, 65.8-50.6);

  },


  /**
   * Prepare shapes for the animation where rectangle first raises from the bottom
   * of the screen and two rectangles then slide from the side.
   */
  prepareSlideAnimation: function() {

    // function Rec (upperLeftX, upperLeftY, height, width, color, linewidth, fill)
    bg = new Rec(0, this.game.height, this.game.height, this.game.width, 0xFFFFFF, 0, true);

    // Two rectangles that will slide from the side
    twoRecs = [];

    // Upper rectangle
    twoRecs[0] = new Rec(this.game.width, 0, (this.game.height / 2), this.game.width, 0xffffff, 0, true);

    // Lower rectangle
    twoRecs[1] = new Rec(this.game.width, (this.game.height / 2), (this.game.height / 2), this.game.width, 0x000000, 0, true);

  }

} // End create()

/*
 *                U P D A T E
 * ============================================
 */
AnimationState.prototype.update = function() {

  this.graphics.clear();

  /*
   * On first two beats display text "Rikkokiri presents"
   */
  if(animationNumber == 0){
    delayCounter++;

    if(delayCounter == 24 || delayCounter == 48){
      displayPresentsText(delayCounter / 24);
    }

    if(delayCounter >= 72){
      animationNumber = 1;
      delayCounter = -1;
    }
  }

  /*
   * With next six beats, display the "title"
   */
  if(animationNumber == 1){
    delayCounter++;
    removePresentsText();

    // Display the title
    if(delayCounter % 30 == 0){
      disPlayTitleMessage(delayCounter / 30);
    }

    if(delayCounter >= 240){
      removeTitle();
      delayCounter = 0;
      animationNumber = 7;
    }
  }

  /*
   * Bring the one white square in at 5.3 seconds
   * Prepare for the next phase
   */
  if(animationNumber == 7){

    delayCounter++;

    if(delayCounter >= 30){
      animationNumber = 8;
      prepareOneSquareAnimation(this.game.width, this.game.height);
      delayCounter = -1;
      drawOneSquare(this.graphics);
    }

  }

  /*
   * ONE SQUARE SEQUENCE
   */
  if(animationNumber == 8){
    delayCounter++;

    if(delayCounter % 30 == 0){
      oneSquareSequence(delayCounter / 30);
    }

    drawOneSquare(this.graphics);

    if(delayCounter >= 180){
      delayCounter = -1;
      animationNumber = 10;
      oneSquareToOriginalSize();
    }

  }

  // Square explosion!
  if(animationNumber == 10){
    delayCounter++;

    if(delayCounter >= 0 && delayCounter < 30){
      littleSquareSizeAddition = 200;
    }
    if(delayCounter >= 30){
      littleSquareSizeAddition = 0;
    }

    spaceySquareFormation(littleSquareSizeAddition);
    drawLittleSquares(this.graphics);

    if(delayCounter >= 60){
      animationNumber = 11;
      delayCounter = -1;
    }

  }


  /*
   * Prepare to move the little squares
   */
  if(animationNumber == 11){

    var goalPoints = calculateGoalPositionsForLittleSquares(this.game.width, this.game.height);
    var currentPositions = getLittleSquareCenters();
    littleSquareMoves = calculateIncrementalMoves(goalPoints, currentPositions, 4);
    animationNumber = 12;
    delayCounter = -1;

  }

  /*
   * Little squares
   * 180 + 30 frames
   * Has to end with white screen
   */
  if(animationNumber == 12){
    delayCounter++;

    if(delayCounter % 30 == 0){

      if(delayCounter <= 90){
        moveSquaresInAngle(littleSquareMoves);
      }

      // if(delayCounter == 60){
      //   spreadOutFormation();
      // }

      if(delayCounter >= 120 && delayCounter <= 180){
        expandLittleSquares(13);
      }
    }

    if(delayCounter == 210){
      delayCounter = 0;
      animationNumber = 18;
    }

    drawLittleSquares(this.graphics);

  }

  /*
   * Prepare for the "teeth" sequence
   */
  if(animationNumber == 18){
    createTeeth(this.game.width, this.game.height);
    this.game.stage.backgroundColor = "0xffffff";
    delayCounter = -1;
    animationNumber = 19;
  }

  /*
   * The teeth sequence will run from 13.3 s till 17.3 s and hence last 4 seconds
   * which equals to 240 frames (60 fps).
   */
  if(animationNumber == 19){
    delayCounter++;

    // Start doing something every half second
    if(delayCounter % 30 == 0){
      if(delayCounter <= 150){
        growTeeth(100);
      }
      if(delayCounter == 180 || delayCounter == 210){
        widenTeeth(11.5);
      }
    }

    drawTeeth(this.graphics);

    if(delayCounter >= 240){
      this.game.stage.backgroundColor = "0x000000";
      delayCounter = 0;
      animationNumber = 21;
    }

  }

  // ---------- START SEQUENCE FROM ANIMATION NUMBER 21 ----------

  //Prepare for square slide animation
  if(animationNumber == 21){
    this.prepareSlideAnimation();
    delayCounter = 0;
    animationNumber = 22;
  }

  /* "Lift" the background to go from black background to two recntangles
   * From 17.4 s to 21.5 s in the song => delay 4.1 s = 246 frames
   */
  if(animationNumber == 22){
    delayCounter++;

    if(delayCounter >= 246){
      animationNumber = 24;
      delayCounter = 0;
    }

    if(bg.getPoint(0).y > centerY){
      var left = bg.getPoint(0).y - centerY;

      if(left >= 4.5){
          bg.moveUp(4.5);
      }
      else {
        bg.moveUp(left);
      }
    }

    bg.draw(this.graphics);
  }

  // Bring the two rectangles from the side
  if(animationNumber == 24){
    delayCounter++;

    if(delayCounter >= 210){
      animationNumber = 26;
      delayCounter = 0;
    }

    if(twoRecs[0].getPoint(0).x > centerX){
      var left =twoRecs[0].getPoint(0).x - centerX;

      if(left >= 6){
        twoRecs[0].moveLeft(6);
        twoRecs[1].moveLeft(6);
      }
      else {
        twoRecs[0].moveLeft(left);
        twoRecs[1].moveLeft(left);
      }

    }

    bg.draw(this.graphics);
    twoRecs[0].draw(this.graphics);
    twoRecs[1].draw(this.graphics);
  }


  // ----- WAIT ------

  if(animationNumber == 26){
    delayCounter++;

    if(delayCounter >= 72){
      animationNumber = 27;
      delayCounter = 0;
    }

    if(squareRevealGoal < squareSize){
      squareRevealMove = 1.75;
      moveRevealSquares(this.game.width, this.game.height, squareSize, squareRevealMove, revealSquareGrid)
      squareRevealGoal += squareRevealMove;
    }

    drawGrid(this.graphics, checkeredGrid);
    drawGrid(this.graphics, revealSquareGrid);
  }

  // Prepare to pulse squares
  if(animationNumber == 27){

    this.game.stage.backgroundColor = "0xffffff";
    checkeredGridBlack = createOverflowingCheckeredHalfEmptyGrid(this.game.width, this.game.height, squaresInColumn, "0x000000", false, 100, 100);
    checkeredGridWhite = createOverflowingCheckeredHalfEmptyGrid(this.game.width, this.game.height, squaresInColumn, "0xFFFFFF", false, 100, 100);

    drawGrid(this.graphics, checkeredGridBlack);

    pulseGoal = 142.4;
    returnGoal = checkeredGridBlack[0][1].sidelength;

    delayCounter = 0;
    animationNumber = 28;
    var time = 0;
    var expandMove = 0;
  }

  // Pulse black squares
  if(animationNumber == 28 || animationNumber == 30){
    delayCounter++;

    (animationNumber == 28) ? time = 30 : time = 60;
    (animationNumber == 28) ? expandMove = 1 : expandMove = 2.5;

    if(checkeredGridBlack[0][1].sidelength < pulseGoal && expanding){
      expandSquares(this.graphics, checkeredGridBlack, expandMove);
    }
    else {
      expanding = false;

      if(checkeredGridBlack[0][1].sidelength > returnGoal && delayCounter >= time / 2){
        shrinkSquares(this.graphics, checkeredGridBlack, expandMove);
      }
      else if(delayCounter >= time){
        // Move on to the next animation?
        animationNumber++
        delayCounter = 0;
        expanding = true;
      }
    }
    this.game.stage.backgroundColor = "0xffffff";
    drawGrid(this.graphics, checkeredGridBlack);
  }

  // Pulse white squares
  if(animationNumber == 29){
    delayCounter++;

    if(checkeredGridWhite[0][0].sidelength < pulseGoal && expanding){
      expandSquares(this.graphics, checkeredGridWhite, 1);
    }
    else {
      expanding = false;

      if(checkeredGridWhite[0][0].sidelength > returnGoal && delayCounter >= 30){
        shrinkSquares(this.graphics, checkeredGridWhite, 1);
      }
      else if(delayCounter >= 60){
        // Move on to the next animation?
        animationNumber = 30;
        delayCounter = 0;
        expanding = true;
        pulseGoal = 153.033;
      }
    }
    this.game.stage.backgroundColor = "0x000000";
    drawGrid(this.graphics, checkeredGridWhite);
  }

  if(animationNumber == 31){
    state30visited += 1;

    if(state30visited < 3){
      animationNumber = 32;
    }
    else {
      animationNumber = 34;
      delayCounter = 0;
    }
  }

  // Spin squares
  if(animationNumber == 32){

    this.game.stage.backgroundColor = "0xffffff";
    drawGrid(this.graphics, checkeredGridBlack);

    spinSquaresTwoDirections(this.graphics, checkeredGrid, -1 * rotationAngle);

    if(rotationSum < 179){
      rotationSum += Math.abs(rotationAngle);
    }
    else {
        // checkeredGrid = createCheckeredHalfEmptyGrid(this.game.width, this.game.height, squaresInColumn, "0x000000", false);
        checkeredGrid = createOverflowingCheckeredHalfEmptyGrid(this.game.width, this.game.height, squaresInColumn, "0x000000", true, 100, 100);

        rotationSum = 0;
        delayCounter = 0;

        animationNumber = 30;
    }
  }

  if(animationNumber == 34){
    this.game.stage.backgroundColor = "0xffffff";

    if(rotationSum < 180){
      spinSquaresTwoDirections(this.graphics, checkeredGrid, rotationAngle);
      spinSquaresTwoDirections(this.graphics, checkeredGridWhite, rotationAngle);
      // spinSquaresSameDirection(graphics, checkeredGrid, rotationAngle);
      rotationSum += Math.abs(rotationAngle);
    }
    else {
      checkeredGrid = createOverflowingCheckeredHalfEmptyGrid(this.game.width, this.game.height, squaresInColumn, "0xffffff", true, 100, 100);

      rotationSum = 0;
      delayCounter = 0;
      animationNumber = 35;
    }
  }

  if(animationNumber == 35){
    delayCounter++;

    if(delayCounter <= 1){
      spinSquaresTwoDirections(this.graphics, checkeredGrid, 45);
      this.game.stage.backgroundColor = "0x000000";
    }

    drawGrid(this.graphics, checkeredGrid);

    if(delayCounter >= 30){
      delayCounter = 0;
      checkeredGrid = createOverflowingCheckeredHalfEmptyGrid(this.game.width, this.game.height, squaresInColumn, "0x000000", true, 100, 100);
      animationNumber = 36;
    }
  }

  if(animationNumber == 36){
    delayCounter++;

    if(delayCounter <= 1){
      spinSquaresTwoDirections(this.graphics, checkeredGrid, 45);
      this.game.stage.backgroundColor = "0xffffff";
    }

    drawGrid(this.graphics, checkeredGrid);

    if(delayCounter >= 30){
      delayCounter = 0;
      checkeredGrid = createOverflowingCheckeredHalfEmptyGrid(this.game.width, this.game.height, squaresInColumn, "0xffffff", true, 100, 100);
      animationNumber = 37;
    }
  }

  // Spin squares
  if(animationNumber == 37){
    this.game.stage.backgroundColor = "0x000000";

    drawGrid(this.graphics, checkeredGridWhite);

    spinSquaresTwoDirections(this.graphics, checkeredGrid, -1 * rotationAngle);

    if(rotationSum < 179){
      rotationSum += Math.abs(rotationAngle);
    }
    else {
        rotationSum = 0;
        delayCounter = 0;
        animationNumber = 38;
        this.game.stage.backgroundColor = "0x000000";
        checkeredGrid = createCheckeredHalfEmptyGrid(this.game.width, this.game.height, squaresInColumn, "0xffffff", true);
    }
  }

  /*
   * At this update has run 2631 times => 43.85 seconds
   */

  if(animationNumber == 38){
    delayCounter++;

    drawGrid(this.graphics, checkeredGrid);

    if(delayCounter >= 30){
      delayCounter = 0;
      this.game.stage.backgroundColor = "0xffffff";
      checkeredGrid = createCheckeredHalfEmptyGrid(this.game.width, this.game.height, squaresInColumn, "0x000000", true);
      animationNumber = 39;
    }
  }

  if(animationNumber == 39){
    delayCounter++;

    drawGrid(this.graphics, checkeredGrid);

    if(delayCounter >= 30){
      delayCounter = 0;
      this.game.stage.backgroundColor = "0x000000";
      checkeredGrid = createCheckeredHalfEmptyGrid(this.game.width, this.game.height, squaresInColumn, "0xffffff", true);
      animationNumber = 40;
    }
  }

  /*
   * Prepare to change squares to circles
   */
  if(animationNumber == 40){
    delayCounter++;

    drawGrid(this.graphics, checkeredGrid);
    cornerradius = 1;
    roundedGrid = createCheckeredHalfEmptyRoundedSquareGrid(this.game.width, this.game.height, 6, 0xffffff, true, cornerradius);

    var overflow = 2 * roundedGrid[0][0].sidelength;
    circleGrid = createOverflowingHalfEmptyCircleGrid(game.width, game.height, 6, 0xffffff, true, overflow, overflow);

    if(delayCounter >= 48){
      delayCounter = 0;
      animationNumber = 41;
    }
  }

  /*
   * Go from squares to circles
   * Start time 45.65
   */
  if(animationNumber == 41){
    delayCounter ++;
    cornerradius++;

    if(cornerradius < 50 && delayCounter <  60){
      roundedGrid = createCheckeredHalfEmptyRoundedSquareGrid(this.game.width, this.game.height, 6, 0xffffff, true, cornerradius);
    }
    else {
      delayCounter = 0;
      animationNumber = 42;
    }

    drawGrid(this.graphics, roundedGrid);
  }

  /*
   * Circles, time 46.65 to 47.5 => 0.8 s => 51 frames
   */
  if(animationNumber == 42){
    delayCounter++;

    if(delayCounter <= 50){
      slideShapesSidewaysToDirections(circleGrid, -2);
    }

    if(delayCounter > 51){
      delayCounter = 0;
      animationNumber = 43;
    }

    drawGrid(this.graphics, circleGrid);

  }

  /**
   * Circles up, 25 frames
   * Start at 47.5 + 0.33 s => 48.53
   */
  if(animationNumber == 43){
    delayCounter++;

    // Positive number -> even rows will slide down
    slideShapesUpDownToDirections(circleGrid, 5);

    drawGrid(this.graphics, circleGrid);

    if(delayCounter >= 20){
      delayCounter = 0;
      animationNumber = 44;
    }

  }

  /*
   * Circles
   * Moving takes 0.417 seconds
   *
   * End at 48.7 seconds
   */
  if(animationNumber == 44){
    delayCounter++;

    if(delayCounter <= 25){
      slideShapesSidewaysToDirections(circleGrid, 4);
    }

    drawGrid(this.graphics, circleGrid);

    if(delayCounter == 25 + 27){
      delayCounter = -1;
      animationNumber = 45;
    }

  }

  /*
   * Expand circles
   * From 48.7 to 49.2 => 0.5 s => 30 frames
   */
  if(animationNumber == 45){
    delayCounter++;

    if(delayCounter % 10 == 0){
      expandShapes(circleGrid, 10);
    }

    if(delayCounter >= 30){
      animationNumber = 46;
    }

    drawGrid(this.graphics, circleGrid);

  }

  /*
   * Create squares that will be placed between the circles
   */
  if(animationNumber == 46){

    // createOverflowingCheckeredHalfEmptyGrid(gameWidth, gameHeight, squaresInColumn, color, startsFromCorner, overflowX, overflowY);
    checkeredGrid = createOverflowingCheckeredHalfEmptyGrid(this.game.width, this.game.height, squaresInColumn, "0x000000", true, 100, 100);

    //shrinkSquares(graphics, grid, amount)
    shrinkSquares(this.graphics, checkeredGrid, 40);

    // spinSquaresSameDirection(graphics, grid, rotationAngle)
    spinSquaresSameDirection(this.graphics, checkeredGrid, 45);

    delayCounter = -1;
    animationNumber = 47;

  }

  /*
   * Squares between circles
   * From 49.2 to 49.8 => 0.6 s => 36 frames
   *
   * Actually: From 49.2 to 50.6 => 1.4 s => 84 frames
   */
  if(animationNumber == 47){
    delayCounter++;

    if(delayCounter == 9 || delayCounter == 18){
      expandShapes(checkeredGrid, 3);
    }

    if(delayCounter >= 27){
      expandShapes(checkeredGrid, 0.25);
    }

    drawGrid(this.graphics, circleGrid);
    drawGrid(this.graphics, checkeredGrid);

    if(delayCounter == 84){
      delayCounter = 0;
      animationNumber = 48;
    }

  }

  if(animationNumber == 48){
    delayCounter++;

    spinSquaresSameDirection(this.graphics, checkeredGrid, 45);
    expandSquares(this.graphics, checkeredGrid, 2);

    drawGrid(this.graphics, circleGrid);
    drawGrid(this.graphics, checkeredGrid);

    if(delayCounter == 5){
      delayCounter = 0;
      animationNumber = 49;
    }

  }

  /*
   * Wait from 50.6 till 52.7 => 1.1 s => 126 frames
   */
  if(animationNumber == 49){
    delayCounter++;

    if(delayCounter == 126){
      delayCounter = 0;
      animationNumber = 50;
    }

  }

  /*
   * "Roll" credits at 52.7
   */
  if(animationNumber == 50){

    creditstyle = { font: "37px Helvetica", fill: "#ffffff", align: "center", fontWeight: "bold" };
    credit1 = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Animation by Rikkokiri", creditstyle);
    credit1.anchor.set(0.5);
    credit1.alpha = 0.1;

    fadeInCredit1 = this.game.add.tween(credit1).to( { alpha: 1 }, 2000, "Linear");
    fadeInCredit1.onComplete.add(credit1FadeOutTween, this);
    animationNumber = 51;

  }

  if(animationNumber == 51){
    fadeInCredit1.start();
  }

  /*
   * Credits 4 * 2 s => 8
   * Start fading song at 60.7
   * Song should end at 65.8
   */
  if(animationNumber == 53){
    music.fadeOut(8 * 1000);
  }

}

function credit1FadeOutTween(){

  animationNumber = 52;

  fadeOutCredit1 = this.game.add.tween(credit1);
  fadeOutCredit1.to({alpha: 0}, 2000, "Linear");
  fadeOutCredit1.onComplete.addOnce(credit2FadeInTween, this);
  fadeOutCredit1.start();
}

function credit2FadeInTween(){

  credit2 = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Song \n Sail by AWOLNATION", creditstyle);
  credit2.anchor.set(0.5);
  credit2.alpha = 0.1;

  fadeInCredit2 = this.game.add.tween(credit2);
  fadeInCredit2.to( { alpha: 1 }, 2000, "Linear");
  fadeInCredit2.onComplete.addOnce(credit2FadeOutTween, this);
  fadeInCredit2.start();

}

function credit2FadeOutTween(){

  fadeOutCredit2 = this.game.add.tween(credit2);
  fadeOutCredit2.to({alpha: 0}, 2000, "Linear");
  fadeOutCredit2.onComplete.addOnce(finishAnimation);
  fadeOutCredit2.start();

}

function finishAnimation(){
  animationNumber = 53;
  return;
}

function backToReadyState(){
  this.game.state.start('ready');
}
/*
 * ==================================  FUNCTIONS   ==================================
 */

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

AnimationState.prototype.quickGridPulse = function(grid, backgroundColor, time) {
    delayCounter++;
    expandMove = 2.5;

    if(grid[0][1].sidelength < pulseGoal && expanding){
      expandSquares(this.graphics, grid, expandMove);
    }
    else {
      expanding = false;

      if(grid[0][1].sidelength > returnGoal && delayCounter >= time / 2){
        shrinkSquares(this.graphics, grid, expandMove);
      }
      else if(delayCounter >= time){
        delayCounter = 0;
        expanding = true;
        return true;
      }
    }
    this.game.stage.backgroundColor = backgroundColor;
    drawGrid(this.graphics, grid);
}
