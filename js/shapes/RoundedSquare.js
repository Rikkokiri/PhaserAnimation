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
  if (color === undefined){ color = 0xff0000; }
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

    if(fill){
      graphics.beginFill(this.color);
      graphics.drawShape(this.square);
      graphics.endFill();

    }
    // No fill
    else {
      graphics.lineStyle(this.linewidth, this.color);
      graphics.drawShape(this.square);
    }

  }

  /*
   * TODO Method's for moving the shape
   */



}
