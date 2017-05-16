/**
 * @author Rikkokiri
 */

/**
 * Create a new rectangle.
 *
 * @class Rec
 * @constructor
 *
 * @param {Number} upperLeftX - The x-coordinate of the (originally) upper left corner of the rectangle. [undefined -> 0]
 * @param {Number} upperLeftY - The y-coordinate of the (originally) upper left corner of the rectangle. [undefined -> 0]
 * @param {Number} height - Heigth of the rectangle. [undefined -> 0]
 * @param {Number} width - Width of the rectangle. [undefined -> 0]
 * @param {String} color - The color that is used to draw the rectangle. Must be a valid hexadecimal number. [undefined -> 0xff0000]
 * @param {Number} linewidth - Width of the line that is used to draw the rectangle. [undefined -> 1]
 * @param {Boolean} fill - If true, the rectangle is filled with the color specified by @param color, else no fill. [undefined -> true]
 *
 */
function Rec (upperLeftX, upperLeftY, height, width, color, linewidth, fill) {

  if (upperLeftX === undefined) { upperLeftX = 0; }
  if (upperLeftY === undefined) { upperLeftY = 0; }
  if (height === undefined) { height = 0; }
  if (width === undefined) { width = 0; }
  if (color === undefined) { color = 0xff0000; }
  if (linewidth === undefined) { linewidth = 1; }
  if (fill === undefined) { fill = true; }

}
