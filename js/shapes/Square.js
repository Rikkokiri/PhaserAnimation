/**
 * @author Rikkokiri
 */

/**
 * Create a new square.
 *
 * @class Square
 * @constructor
 *
 * @param {Number} upperLeftX - The x-coordinate of the (originally) upper left corner of the rectangle. [undefined -> 0]
 * @param {Number} upperLeftY - The y-coordinate of the (originally) upper left corner of the rectangle. [undefined -> 0]
 * @param {Number} sidelength - The length of the square's side. [undefined -> 0]
 * @param {String} color - The color that is used to draw the rectangle. Must be a valid hexadecimal number. [undefined -> 0xff0000]
 * @param {Number} linewidth - Width of the line that is used to draw the circle. [undefined -> 1]
 * @param {Boolean} fill - If true, the rectangle is filled with the color specified by @param color, else no fill. [undefined -> true]
 *
 */
function Square (upperLeftX, upperLeftY, sidelength, color, linewidth, fill) {

  Rec.call(this, upperLeftX, upperLeftY, sidelength, sidelength, color, linewidth, fill);
  this.sidelength = sidelength;

}

Square.prototype = Object.create(Rec.prototype);
Square.prototype.constructor = Square;


// ---------- ADD METHODS? ----------
