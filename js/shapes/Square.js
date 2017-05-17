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


// ------- Shrink and expand rectangle --------------

/**
 * Move the corners of the rectangle towards its center point by the given amount
 * and hence the rectangle shrinks.
 *
 * The shrinking stops when the lenght of the rectangle's side drops below zero.
 *
 * @param {Number} amount - How much rectangle's corners are moved towards its center point.
 */
Square.prototype.shrink = function(amount){

    if(this.cornerDistance >= 0){

      this.cornerDistance -= amount;

      for( var point = 0; point < 4; point++ ){
        this.rec.points[point].rotate(this.center.x, this.center.y, 0, true, this.cornerDistance);
      }

      this.sidelength = Math.sqrt(2 * Math.pow(this.cornerDistance, 2));
      this.height = this.sidelength;
      this.width = this.sidelength;
    }
}

/**
 * Move the corners of the rectangle away from its center point by the given amount and hence
 * the rectangle expands.
 *
 * @param {Number} amount - How much rectangle's corners are moved away from its center point.
 */
Square.prototype.expand = function(amount){
  this.cornerDistance += amount;
  console.log("Expand called");

  for( var point = 0; point < 4; point++ ){
    this.rec.points[point].rotate(this.center.x, this.center.y, 0, true, this.cornerDistance);
  }

  this.sidelength = Math.sqrt(2 * Math.pow(this.cornerDistance, 2));
  this.height = this.sidelength;
  this.width = this.sidelength;
}


/**
 * Set the length of the square's side. THe size of the square will change but the center point
 * will remain the same.
 *
 * @param {Number} newSidelength -
 */
Square.prototype.setSize = function(newSidelength){
  if(newSidelength < 0){
    newSidelength = 0;
  }

  this.sidelength = newSidelength;

  var newCornerDistance = Math.sqrt(2 * Math.pow((newSidelength / 2), 2));

  if(newCornerDistance > this.cornerDistance){
    this.expand( newCornerDistance - this.cornerDistance );
  }
  else if(newCornerDistance < this.cornerDistance){
    this.shrink(this.cornerDistance - newCornerDistance );
  }

}
