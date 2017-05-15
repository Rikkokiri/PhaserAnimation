/**
 * @author Rikkokiri
 */

/**
 * Creates a new circle.
 *
 * @class Circle
 * @constructor
 *
 * @param {Number} centerX - X-coordinate of the center of the circle. [undefined -> 0]
 * @param {Number} centerY - Y-coordinate of the center of the circle. [undefined -> 0]
 * @param {Number} diameter - Diamater of the circle. [undefined -> 0]
 * @param {String} color - Color of the line that is used to draw the circle. Must be a valid hexadecimal number. If undefined, default 0xff0000.
 * @param {Number} linewidth - Width of the line that is used to draw the circle. If undefined, width is set to 1.
 * @param {Boolean} fill - If true, circle is filled with the color, else no fill.
 *                           If left undefined, fill.
 */
function Circle (centerX, centerY, diameter, color, linewidth, fill) {

  if (centerX === undefined) { centerX = 0; }
  if (centerY === undefined) { centerY = 0; }
  if (diameter === undefined) { diameter = 0; }
  if (color === undefined) { color = 0xff0000; }
  if (linewidth === undefined) { linewidth = 1; }
  if (fill === undefined) { fill = true; }

  this.diameter = diamater;
  this.center = new Phaser.Point(centerX, centerY);
  this.color = color;
  this.linewidth = linewidth;
  this.fill = fill;

  // Create the actual circle
  this.circle = new Phaser.Circle(this.center.x, this.center.y, this.diameter);

}


Solidcircle.prototype = {

  /**
   * Draw the circle.
   * @param {} graphics - The graphics object that is used for drawing the circle.
   */
   drawCircle: function(graphics) {

     // If the circle is filled with the color
     if(fill){
       graphics.beginFill(this.color);
       graphics.drawCircle(this.circle.x, this.circle.y, this.circle.diameter);
       graphics.endFill();

     }
     else {



     }
   },

   // ------- METHODS FOR MOVING THE circle --------------

   /**
    * Move up
    * @param {Number} distance - How many pixels the circle is moved upwards
    */
   moveUp: function(distance){

     // TODO

   },

   /**
    * Move down
    * @param {Number} distance - How many pixels the circle is moved downwards
    */
   moveDown: function(distance){

     // TODO

   },

   /**
    * Move left
    * @param {Number} distance - How many pixels the circle is moved left
    */
   moveLeft: function(distance){

     // TODO

   },

   /**
    * Move right
    * @param {Number} distance - How many pixels the circle is moved right
    */
   moveRight: function(distance){

     // TODO

   },

   /**
    * Move the circle so that it's center is on the given coordinates
    * @param {}
    */
    centerOn: function(x, y){

      // TODO

    },

   // ------- Change color? --------------

   // TODO Check color code validity?
   /**
    * @param {Hexadecimal} newColor - The new color of the circle as a hexadecimal value.
    * The value must be a valid hexadecimal.
    */
   setcolor: function(newColor){
     this.color = newColor;
   },

   // ------- Shrink and expand circle --------------

   /**
    * Shrink the circle (decrease the radius) by the given amount.
    *
    * The shrinking stops when the circle's radius drops to zero.
    *
    * @param {Number} amount - How much circle's radius is decreased.
    */
   shrink: function(amount){

     // TODO

   },

   /**
    * Expand the circle (increase the radius) by the given amount.
    *
    * @param {Number} amount - How much circle's radius is increasesed
    */
   expand: function(amount){

     // TODO

   }


   // --- OTHER METHOD IDEAS ---

   /**
    * Calculate the sidelength of the largest square that can fit inside the circle
    *
    * Another method for getting coordinates for such square?
    */



}
