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
    this.addMarkers();

    // music.play("xxzz");
    // animationNumber = 21;

    // music.play("xxzz2");
    // animationNumber = 24;

    music.play("PA");
    animationNumber = 26;

    //
    var startTime = this.game.time.now;

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
    music.addMarker("xxzz", 17.3, 60);
    music.addMarker("xxzz2", 21.3, 60);
    music.addMarker("PA", 25.3, 60);

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

    if(delayCounter >= 48){
      animationNumber = 1;
      delayCounter = 0;
    }
  }

  // Prepare for the next phase
  if(animationNumber == 1){
    delayCounter++;

    if(delayCounter >= 30){
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

  //Prepare for square slide animation
  if(animationNumber == 21){
    this.prepareSlideAnimation();
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
    // checkeredGrid = createCheckeredHalfEmptyGrid(game.width, game.height, squaresInColumn, "0x000000", false);
    checkeredGridBlack = createOverflowingCheckeredHalfEmptyGrid(this.game.width, this.game.height, squaresInColumn, "0x000000", false, 100, 100);
    // checkeredGridWhite = createOverflowingCheckeredHalfEmptyGrid(this.game.width, this.game.height, squaresInColumn, "0xFFFFFF", false, 100, 100);
    checkeredGridWhite = createCheckeredHalfEmptyGrid(this.game.width, this.game.height, squaresInColumn, 0xFFFFFF, true);

    console.log(checkeredGridBlack);
    console.log(checkeredGridWhite);

    drawGrid(this.graphics, checkeredGridBlack);

    // pulseGoal = 1.15 * checkeredGridBlack[0][1].sidelength;
    pulseGoal = 140;
    // shrinkGoal = 80;
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
    (animationNumber == 28) ? expandMove = 1 : expandMove = 3;

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
        pulseGoal = 163;
      }
    }
    this.game.stage.backgroundColor = "0x000000";
    drawGrid(this.graphics, checkeredGridWhite);
  }

  if(animationNumber == 31){
    this.game.stage.backgroundColor = "0xffffff";
    drawGrid(this.graphics, checkeredGridBlack);

  }

  // // Spin squares
  // if(animationNumber == 29){
  //
  //   spinSquaresTwoDirections(this.graphics, checkeredGrid, -1 * rotationAngle);
  //
  //   if(rotationSum < 179){
  //     rotationSum += Math.abs(rotationAngle);
  //   }
  //   else {
  //       checkeredGrid = createCheckeredHalfEmptyGrid(this.game.width, this.game.height, squaresInColumn, "0x000000", false);
  //       this.game.stage.backgroundColor = 0xffffff;
  //       rotationSum = 0;
  //       animationNumber = 30;
  //   }
  //
  // }
  //
  // if(animationNumber == 30){
  //
  //   if(rotationSum < 120){
  //     spinSquaresTwoDirections(this.graphics, checkeredGrid, rotationAngle);
  //     // spinSquaresSameDirection(graphics, checkeredGrid, rotationAngle);
  //     rotationSum += Math.abs(rotationAngle);
  //   }
  //   else {
  //     drawGrid(this.graphics, checkeredGrid);
  //   }
  // }

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
