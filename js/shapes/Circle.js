/**
 * @author Rikkokiri
 */

/**
 * Creates a new circle.
 *
 * Precondition: Diameter, centerX and centerY must be provided.
 *
 * @param {Number} diameter - Diamater of the circle.
 * @param {Number} centerX - X-coordinate of the center of the circle.
 * @param {Number} centerY - Y-coordinate of the center of the circle.
 * @param {String} lineColor - Color of the line that is used to draw the circle. Must be a valid hexadecimal number. If undefined, default 0x000000.
 * @param {Number} lineWidth - Width of the line that is used to draw the circle. If undefined, width is set to 1.
 * @param {Boolean} nofill - If true, circle is filled with the linecolor, else no fill.
 *                           If left undefined, no fill.
 */
function Circle (centerX, centerY, diameter, lineColor, lineWidth, nofill) {

  this.diameter = diamater;
  this.center = new Phaser.Point(centerX, centerY);
  this.lineColor = (lineColor === undefined) ? 0x000000 : lineColor;
  this.lineWidth = (lineWidth === undefined) ? 1 : lineWidth;
  this.nofill = (nofill === undefined) ? true : nofill;

  // Create the actual circle
  this.circle = new Phaser.Circle(this.center.x, this.center.y, this.diameter);

}


Solidcircle.prototype = {

  /**
   * Draw the circle.
   *
   * @param {} graphics - The graphics object that is used for drawing the circle.
   */
   drawCircle: function(graphics) {
     if(nofill){

       // TODO

     }
     // If the circle is filled with the linecolor
     else {
       graphics.beginFill(this.lineColor);
       graphics.drawCircle(this.circle.x, this.circle.y, this.circle.diameter);
       graphics.endFill();
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
    * @param {Hexadecimal} newColor - The new linecolor of the circle as a hexadecimal value.
    * The value must be a valid hexadecimal.
    */
   setLineColor: function(newColor){
     this.linecolor = newColor;
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


}
