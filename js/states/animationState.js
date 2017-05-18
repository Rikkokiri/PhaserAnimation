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
var delayNeeded = true;

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

// -------- For repeating state 30 -------
var state30visited = 0;

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

    prepareIntroTexts(this.game);

    // For square reveal

    // Create the squares that will be moved to reveal the 6 x 8 checkered square grid
    revealSquareGrid = createRevealSquares(this.game.width, this.game.height, squaresInColumn);

    // Create the checkered 6 x 8 square grid
    checkeredGrid = createCheckeredHalfEmptyGrid(this.game.width, this.game.height, squaresInColumn, "0xffffff", true);

    // - - -  Finally... Music! - - -
    music = this.game.add.audio('sail');
    // this.addMarkers();

    // music.play("xxzz");
    // animationNumber = 21;

    // music.play("teeth");
    // animationNumber = 18;

    // music.play("PA");
    // animationNumber = 26;
    music.play();

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

    // Lift the background
    music.addMarker("teeth", 13.3, 90);
    music.addMarker("xxzz", 17.3, 60);
    music.addMarker("xxzz2", 21.3, 60);
    music.addMarker("PA", 25.3, 120);

  },


  /**
   * TODO EXPLAIN
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

    if(delayCounter == 24 || delayCounter == 48){
      displayPresentsText(delayCounter / 24);
    }

    if(delayCounter >= 72){
      animationNumber = 1;
      delayCounter = -1;
    }
  }

  // Wait from 1.3 second mark to 5.3 second mark
  // => 4 seconds => 240 frames
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

  // Bring the one white square in at 5.3 seconds
  // Prepare for the next phase
  if(animationNumber == 7){

    delayCounter++;

    if(delayCounter >= 30){
      animationNumber = 8;
      prepareOneSquareAnimation(this.game.width, this.game.height);
      delayCounter = -1;
      oneSquare.draw(this.graphics);
    }

  }

  // Bring forward one square
  if(animationNumber == 8){
    delayCounter++;

    if(delayCounter % 30 == 0){
      oneSquareSequence(delayCounter / 30);
    }

    oneSquare.draw(this.graphics);

    if(delayCounter >= 210){
      delayCounter = 0;
      animationNumber = 9;
    }

  }

  // Square explosion!
  if(animationNumber == 9){
    drawLittleSquares(this.graphics);

    animationNumber = 10;
    delayCounter = 0;
    this.game.stage.backgroundColor = "0x000000"; // TODO Remove?
  }

  if(animationNumber == 10){

    delayCounter = 10;
    animationNumber = 11;
  }

  if(animationNumber == 11){
    delayCounter++;

    drawGrid(this.graphics, littleSquares);

    // oneSquare.draw(this.graphics); //TODO



    // This will just be a placeholder for a while
    // Wait for the part where the square sliding sequence starts

    if(delayCounter == 200){
      this.game.stage.backgroundColor = 0xffffff;
    }

    // Song at 17.4 seconds at this point
    // Wait for 12.4 seconds?
    // 60 fps => counter 60 * 12 = 720
    if(delayCounter >= 240){
      animationNumber = 18;
      delayCounter = 0;
    }

  }

  // Prepare "the teeth"
  if(animationNumber == 18){
    createTeeth(this.game.width, this.game.height);
    this.game.stage.backgroundColor = "0xffffff";
    delayCounter = -1;
    animationNumber = 19;
  }

  /*
   * The teeth sequence will run from 13.3 s till 17.3 s and hence last 4 seconds
   * which equals to 240 frames (60 fps).
   *
   * Beats will go as follows: Move, move, wait, move, move, move wait, close gaps TODO Remove
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
      animationNumber = 20;
    }

  }

  if(animationNumber == 20){
    delayCounter++;


    if(delayCounter >= 30){
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
        // this.game.stage.backgroundColor = 0xffffff;
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

  if(animationNumber == 40){
    console.log("STATE 40");
    drawGrid(this.graphics, checkeredGrid);
  }

  // TODO Go from squares to circles



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
