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

    this.height = height;
    this.width = width;

    var points = [new Phaser.Point(upperLeftX, upperLeftY),
                new Phaser.Point(upperLeftX + width, upperLeftY),
                new Phaser.Point(upperLeftX + width, upperLeftY + height),
                new Phaser.Point(upperLeftX, upperLeftY + height)];

    this.center = new Phaser.Point(upperLeftX + width / 2, upperLeftY + height / 2);

    this.color = color;
    this.linewidth = linewidth;
    this.fill = fill;

    // Calculate the corner distance using good old Pythagoras
    this.cornerDistance = Math.sqrt( Math.pow((this.width / 2), 2) + Math.pow((this.height / 2), 2) );

    // Create the actual shape using Phaser.Polygon
    this.rec = new Phaser.Polygon(points);

}


Rec.prototype = {

    /**
     * Draw the rectangle to the given graphics
     *
     * @param {} graphics - The graphics object that is used for drawing the rectangle.
     */
    draw: function(graphics) {
      if(this.fill){
        graphics.lineStyle(0);
        graphics.beginFill(this.color);
        graphics.drawPolygon(this.rec);
        graphics.endFill();
      }
      else {
        graphics.lineStyle(this.linewidth, this.color, 1);
        graphics.drawPolygon(this.rec);
        graphics.lineTo(this.rec.points[3], this.rec.points[0])
      }
    },

    /**
     * Get the point of a square specified by a given number.
     * The numbering starts from 0, from what originally was the upper left corner and moves clockwise from there.
     *
     * @param {Number} pointNumber [0-3] - The number of the requested point of the rectangle
     * @return {Phaser.Point}
     */
    getPoint: function(pointNumber){

      // TODO Throw an exception if the pointNumber isn't between 0-3?

      return this.rec.points[pointNumber];
    },

    // ------- Spin that shit! -------

   /**
    * Roate rectangle around its center.
    * @param {} graphics -
    */
   rotateAroundCenter: function(rotationAngle){
     for( var point = 0; point < 4; point++ ) {
      this.rec.points[point].rotate(this.center.x, this.center.y, rotationAngle, true, this.cornerDistance);
     }
   },

   rotateAroundPoint: function(point){

     // TODO

   },

   rotateAroundCorner: function(cornerNumber){

     // TODO

   },

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

         // Update width and height
         var width = Phaser.Point.distance(rec.getPoint(0), rec.getPoint(1), false);
         var height = Phaser.Point.distance(rec.getPoint(1), rec.getPoint(2), false);

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

     // Update width and height
     var width = Phaser.Point.distance(rec.getPoint(0), rec.getPoint(1), false);
     var height = Phaser.Point.distance(rec.getPoint(1), rec.getPoint(2), false);

   }

   /*
    * TODO Methods for strecthing the rectangle?
    *
    */

}
