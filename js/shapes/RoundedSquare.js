/**
 * @author Rikkokiri
 */

 /**
  * @class RoundedSquare
  * @constructor
  *
  * @param {Number} upperLeftX - The x-coordinate of the square's upper left corner. Undefined -> 0.
  * @param {Number} upperLeftY - The y-coordinate of the square's upper left corner. Undefined -> 0.
  * @param {Number} sidelength - The length of the square's side. Undefined -> 0.
  * @param {Number} cornerradius - The radius of square's corners. Undefined -> 50
  * @param {Number} color - The color used to draw & fill the square. Undefined -> 0xff0000
  * @param {Number} linewidth - Width of the line that is used to draw the square. Undefined -> 1.
  * @param {Number} fill - If true, the square is filled with the color defined by @param color, else no fill. Undefined -> true.
  *
  */
function RoundedSquare (upperLeftX, upperLeftY, sidelength, cornerradius, color, linewidth, fill) {

  if (upperLeftX === undefined){ upperLeftX = 0; }
  if (upperLeftY === undefined){ upperLeftXY = 0; }
  if (sidelength === undefined){ sidelength = 0; }
  if (cornerradius === undefined){ cornerradius = 50; }
  if (color === undefined) { color = 0xff0000; }
  if (linewidth === undefined) { linewidth = 1; }
  if (fill === undefined) { fill = true; }

  // TODO Remove?
  this.x = upperLeftX;
  this.y = upperLeftY;

  this.sidelength = sidelength;
  this.color = color;
  this.linewidth = linewidth;
  this.fill = fill;

  this.center = new Phaser.Point(upperLeftX + sidelength / 2, upperLeftY + sidelength / 2);

  // Create the rounded square from Phaser.RoundedRectangle
  this.square = new Phaser.RoundedRectangle(upperLeftX, upperLeftY, sidelength, sidelength, cornerradius);

}

RoundedSquare.prototype = {

  /**
   * Draw the square to the given graphics.
   * @param {} graphics - The graphics object that is used to draw the square.
   */
  draw: function(graphics) {

    if(this.fill){
      graphics.beginFill(this.color);
      graphics.drawShape(this.square);
      graphics.endFill();

    }
    // No fill
    else {
      graphics.lineStyle(this.linewidth, this.color);
      graphics.drawShape(this.square);
    }

  },

  /**
   * TODO COMMENT
   *
   * @param {Number} radius -
   */
  setRadius: function(radius){
    this.cornerradius = radius;
  },

  // TODO METHODS FOR INCREASING AND DECREASING THE CORNERRADIUS
  increaseRadius: function(amount){
    // Can't go below 1
  },

  decreaseRadius: function(amount){
    // Going above sidelength / 2 doesn't change anything anymore
    
  },


  /*
   * TODO Method's for moving the shape
   */
   // ------- METHODS FOR MOVING THE rectangle --------------

   /**
    * Move up
    * @param {Number} distance - How many pixels the rectangle is moved upwards
    */
   moveUp: function(distance){
     for(var point = 0; point < 4; point++){
       this.rec.points[point].y -= distance;
     }
    // Update center
    this.center.y -= distance;
   },

   /**
    * Move down
    * @param {Number} distance - How many pixels the rectangle is moved downwards
    */
   moveDown: function(distance){
     this.moveUp(-distance);
   },

   /**
    * Move left
    * @param {Number} distance - How many pixels the rectangle is moved left
    */
   moveLeft: function(distance){
     for(var point = 0; point < 4; point++){
       this.rec.points[point].x -= distance;
     }
     // Update center
     this.center.x -= distance;
   },

   /**
    * Move right
    * @param {Number} distance - How many pixels the rectangle is moved right
    */
   moveRight: function(distance){
     this.moveLeft(-distance);
   },

   // TODO Other directions?

   /**
    * Move the rectangle so that it's center is on the given coordinates
    * @param {}
    */
    centerOn: function(x, y){

      // Calculate the change in the coordinates
      moveX = x - this.center.x;
      moveY = y - this.center.y;

      // Update the center coordinates
      this.center.setTo(x, y);

      // Update the corner coordinates
      for( var point = 0; point < 4; point++ ){
        this.rec.points[point].x += moveX;
        this.rec.points[point].y += moveY;
      }

    },

   // ------- Change color? --------------

   // TODO Check color code validity?
   setColor: function(newColor){
     this.color = newColor;
   },

   /**
    * TODO DOCUMENTATION
    * @param {Boolean} fill - True, rectangle is
    */
   setFill(fill){
     if(fill !== undefined){
        this.fill = fill;
     }
   },

   // ------- Shrink and expand rectangle --------------

   // TODO

   /**
    * Move the corners of the rectangle towards its center point by the given amount
    * and hence the rectangle shrinks.
    *
    * The shrinking stops when the lenght of the rectangle's side drops below zero.
    *
    * @param {Number} amount - How much rectangle's corners are moved towards its center point.
    */
   shrink: function(amount){

       if(this.cornerDistance >= 0){

         this.cornerDistance -= amount;

         for( var point = 0; point < 4; point++ ){
           this.rec.points[point].rotate(this.center.x, this.center.y, 0, true, this.cornerDistance);
         }

         this.sidelength = Math.sqrt(2 * Math.pow(this.cornerDistance, 2));

       }
   },

   /**
    * Move the corners of the rectangle away from its center point by the given amount and hence
    * the rectangle expands.
    *
    * @param {Number} amount - How much rectangle's corners are moved away from its center point.
    */
   expand: function(amount){
     this.cornerDistance += amount;

     for( var point = 0; point < 4; point++ ){
       this.rec.points[point].rotate(this.center.x, this.center.y, 0, true, this.cornerDistance);
     }

     this.sidelength = Math.sqrt(2 * Math.pow(this.cornerDistance, 2));
   }



}
