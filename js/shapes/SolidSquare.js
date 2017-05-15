/**
 * @author Rikkokiri
 */

/**
 * Create a new square.
 *
 * @class SolidSquare
 * @constructor
 *
 * @param {Number} upperLeftX -
 * @param {Number} upperLeftY -
 * @param {Number} sidelength -
 * @param {String} color -
 * @param {Number} linewidth -
 * @param {Boolean} fill - If true, the
 */
function SolidSquare (upperLeftX, upperLeftY, sidelength, color, linewidth, fill) {

  if (upperLeftX === undefined) { upperLeftX = 0; }
  if (upperLeftY === undefined) { upperLeftY = 0; }
  if (sidelength === undefined) { sidelength = 0; }
  if (color === undefined) { color = 0xff0000; }
  if (linewidth === undefined) { linewidth = 1; }
  if (fill === undefined) { fill = true; }

  this.sidelength = sidelength;

  var points = [new Phaser.Point(upperLeftX, upperLeftY),
                new Phaser.Point(upperLeftX + sidelength, upperLeftY),
                new Phaser.Point(upperLeftX + sidelength, upperLeftY + sidelength),
                new Phaser.Point(upperLeftX, upperLeftY + sidelength)];

  this.center = new Phaser.Point(upperLeftX + sidelength / 2, upperLeftY + sidelength / 2);
  this.color = color;
  this.linewidth = linewidth;
  this.fill = fill;

  // Calculate the distance from the corner of the square to the center point of the square
  // Standard Pythagoras
  this.cornerDistance = Math.sqrt(2 * Math.pow((sidelength/2), 2));

  // Create the actual square with Phaser.Polygon
  this.square = new Phaser.Polygon(points);

}


SolidSquare.prototype = {

   /**
    * Draw the square to the given graphics
    *
    * @param {} graphics - The graphics object that is used for drawing the square.
    */
   draw: function(graphics) {

     graphics.beginFill(this.color);
     graphics.drawPolygon(this.square);
     graphics.endFill();
   },

   // ------- Spin that shit! -------

   /**
    * Roate square around its center.
    * @param {} graphics -
    */
   rotateAroundCenter: function(rotationAngle){
     for( var point = 0; point < 4; point++ ) {
      this.square.points[point].rotate(this.center.x, this.center.y, rotationAngle, true, this.cornerDistance);
     }
   },

   rotateAroundPoint: function(point){

     // TODO

   },

   rotateAroundCorner: function(cornerNumber){

     // TODO

   },

   // ------- METHODS FOR MOVING THE SQUARE --------------

   /**
    * Move up
    * @param {Number} distance - How many pixels the square is moved upwards
    */
   moveUp: function(distance){
     for(var point = 0; point < 4; point++){
       this.square.points[point].y -= distance;
     }
    // Update center
    this.center.y -= distance;
   },

   /**
    * Move down
    * @param {Number} distance - How many pixels the square is moved downwards
    */
   moveDown: function(distance){
     this.moveUp(-distance);
   },

   /**
    * Move left
    * @param {Number} distance - How many pixels the square is moved left
    */
   moveLeft: function(distance){
     for(var point = 0; point < 4; point++){
       this.square.points[point].x -= distance;
     }
     // Update center
     this.center.x -= distance;
   },

   /**
    * Move right
    * @param {Number} distance - How many pixels the square is moved right
    */
   moveRight: function(distance){
     this.moveLeft(-distance);
   },

   // TODO Other directions?

   /**
    * Move the square so that it's center is on the given coordinates
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
        this.square.points[point].x += moveX;
        this.square.points[point].y += moveY;
      }

    },

   // ------- Change color? --------------

   // TODO Check color code validity?
   setColor: function(newColor){
     this.color = newColor;
   },

   // ------- Shrink and expand square --------------

   // TODO

   /**
    * Move the corners of the square towards its center point by the given amount
    * and hence the square shrinks.
    *
    * The shrinking stops when the lenght of the square's side drops below zero.
    *
    * @param {Number} amount - How much square's corners are moved towards its center point.
    */
   shrink: function(amount){

       if(this.cornerDistance >= 0){

         this.cornerDistance -= amount;

         for( var point = 0; point < 4; point++ ){
           this.square.points[point].rotate(this.center.x, this.center.y, 0, true, this.cornerDistance);
         }

         this.sidelength = Math.sqrt(2 * Math.pow(this.cornerDistance, 2));

       }
   },

   /**
    * Move the corners of the square away from its center point by the given amount and hence
    * the square expands.
    *
    * @param {Number} amount - How much square's corners are moved away from its center point.
    */
   expand: function(amount){
     this.cornerDistance += amount;

     for( var point = 0; point < 4; point++ ){
       this.square.points[point].rotate(this.center.x, this.center.y, 0, true, this.cornerDistance);
     }

     this.sidelength = Math.sqrt(2 * Math.pow(this.cornerDistance, 2));
   }

 }
