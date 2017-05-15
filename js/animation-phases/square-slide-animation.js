/**
 * @author Rikkokiri
 *
 * These functions were written for a specific animation sequence before
 * I decided to start implementing my own classes. I considered rewriting them
 * using my own classes but after all decided to preserve them as they worked just fine.
 */

 /*
  * Some global variables for the square slide animation
  */
 var backgroundpoints;
 var background;
 var bgColor = "0xffffff";
 var graphicsRef;

 var gameWidth;
 var gameHeight;

 /*
  * PREPARE ANIMATION
  */
function prepareSquareSlideAnimation(gWidth, gHeight, graphics){

  gameWidth = gWidth;
  gameHeight = gHeight;

  graphicsRef = graphics;

  backgroundpoints = createBackgroundPoints(gameWidth, gameHeight);
  background = new Phaser.Polygon(backgroundpoints);

}

/*
 * Create the points that define the background
 */
function createBackgroundPoints(gameWidth, gameHeight){
  return [new Phaser.Point(0, 0),
                          new Phaser.Point(gameWidth, 0),
                          new Phaser.Point(gameWidth, gameHeight),
                          new Phaser.Point(0, gameHeight)];
}

/*
 *
 */
function liftBackground(goal, speed){

   if(background.points[3].y > goal){
     background.points[2].y -= speed;
     background.points[3].y -= speed;
   }
   else {
     return true;
   }

   drawPolygonShape(background, bgColor);
}

/*
 *
 */
function drawPolygonShape(shape, color){

   graphicsRef.beginFill(color);
   graphicsRef.drawPolygon(shape);
   graphicsRef.endFill();

   return true;
}

/*
 *
 */
function twoSquaresSlidingFromTheRight(goal, speed){

   if(twoSquares[0].points[0].x > goal){
     twoSquares[0].points = moveShapeHorizontally(twoSquares[0], -speed);
     twoSquares[1].points = moveShapeHorizontally(twoSquares[1], -speed);
   }
   else {
     //Animation finished
     return true;
   }

   drawPolygonShape(twoSquares[0], "0x000000");
   drawPolygonShape(twoSquares[1], "0xffffff");

}

/*
 * TODO Documentation
 */
function moveShapeHorizontally(shape, xChange){

   for(var i = 0; i < shape.points.length; i++){
     shape.points[i].x += xChange
   }

   return shape.points;
}

 /*
  * TODO Documentation
  */
 function moveShapeVertically(shape, yChange){

     for(var i = 0; i < shape.points.length; i++){
       shape.points[i].y += yChange
     }

     return shape.points;
  }

 /*
  * Create two squares that will slide from the side
  */
 function createTwoSquares(width){

   // Upper square
   twoSquares[0] = new Phaser.Polygon([
     new Phaser.Point(gameWidth, 0),
     new Phaser.Point(gameWidth + width, 0),
     new Phaser.Point(gameWidth + width, gameHeight / 2),
     new Phaser.Point(gameWidth, gameHeight / 2)
   ]);

   // Lower square
   twoSquares[1] = new Phaser.Polygon([
     new Phaser.Point(gameWidth, gameHeight / 2),
     new Phaser.Point(gameWidth + width, gameHeight / 2),
     new Phaser.Point(gameWidth + width, gameHeight),
     new Phaser.Point(gameWidth, gameHeight)
   ]);

 }
