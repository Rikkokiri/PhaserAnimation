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
                new Phaser.Point(upperLeftX + this.width, upperLeftY),
                new Phaser.Point(upperLeftX + this.width, upperLeftY + this.height),
                new Phaser.Point(upperLeftX, upperLeftY + this.height)];

    this.center = new Phaser.Point(upperLeftX + this.width / 2, upperLeftY + this.height / 2);

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

         this.updateWidth();
         this.updateHeight();

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

     this.updateWidth();
     this.updateHeight();

   },

   /*
    * TODO Methods for strecthing the rectangle?
    *
    */

    stretchBottom: function(amount){

      var angle2 = this.getPoint(1).angle(this.getPoint(2), true);
      angle2 -= 90;

      var angle3 = this.getPoint(0).angle(this.getPoint(3), true);
      angle3 -= 90;

      var y2 = this.getPoint(2).y;
      var y3 = this.getPoint(3).y;

      var newPoint2 = new Phaser.Point(this.getPoint(2).x, y2 + amount);
      var newPoint3 = new Phaser.Point(this.getPoint(3).x, y3 + amount);

      newPoint2.rotate(this.getPoint(2).x, this.getPoint(2).y, angle2, true, amount);
      newPoint3.rotate(this.getPoint(3).x, this.getPoint(3).y, angle3, true, amount);

      this.rec.points[2].setTo(newPoint2.x, newPoint2.y);
      this.rec.points[3].setTo(newPoint3.x, newPoint3.y);

      this.updateDimensions();
    },

    /*
     *
     */
    stretchTop: function(amount){

      var angle1 = this.getPoint(2).angle(this.getPoint(1), true);
      angle1 -= 90;

      var angle0 = this.getPoint(3).angle(this.getPoint(0), true);
      angle0 -= 90;

      var y1 = this.getPoint(1).y;
      var y0 = this.getPoint(0).y;

      var newPoint1 = new Phaser.Point(this.getPoint(1).x, y1 + amount);
      var newPoint0 = new Phaser.Point(this.getPoint(0).x, y0 + amount);

      newPoint1.rotate(this.getPoint(1).x, this.getPoint(1).y, angle1, true, amount);
      newPoint0.rotate(this.getPoint(0).x, this.getPoint(0).y, angle0, true, amount);

      this.rec.points[1].setTo(newPoint1.x, newPoint1.y);
      this.rec.points[0].setTo(newPoint0.x, newPoint0.y);

      this.updateDimensions();
    },

    /*
     *
     */
    stretchLeft: function(amount){

      var angle0 = this.getPoint(1).angle(this.getPoint(0), true);
      angle0 -= 90;

      var angle3 = this.getPoint(2).angle(this.getPoint(3), true);
      angle3 -= 90;

      var y0 = this.getPoint(0).y;
      var y3 = this.getPoint(3).y;

      var newPoint0 = new Phaser.Point(this.getPoint(0).x, y0 + amount);
      var newPoint3 = new Phaser.Point(this.getPoint(3).x, y3 + amount);

      newPoint0.rotate(this.getPoint(0).x, this.getPoint(0).y, angle0, true, amount);
      newPoint3.rotate(this.getPoint(3).x, this.getPoint(3).y, angle3, true, amount);

      this.rec.points[0].setTo(newPoint0.x, newPoint0.y);
      this.rec.points[3].setTo(newPoint3.x, newPoint3.y);

      this.updateDimensions();
    },

    /*
     *
     */
    stretchRight: function(amount){

      var angle1 = this.getPoint(0).angle(this.getPoint(1), true);
      angle1 -= 90;

      var angle2 = this.getPoint(3).angle(this.getPoint(2), true);
      angle2 -= 90;

      var y1 = this.getPoint(1).y;
      var y2 = this.getPoint(2).y;

      var newPoint1 = new Phaser.Point(this.getPoint(1).x, y1 + amount);
      var newPoint2 = new Phaser.Point(this.getPoint(2).x, y2 + amount);

      newPoint1.rotate(this.getPoint(1).x, this.getPoint(1).y, angle1, true, amount);
      newPoint2.rotate(this.getPoint(2).x, this.getPoint(2).y, angle2, true, amount);

      this.rec.points[1].setTo(newPoint1.x, newPoint1.y);
      this.rec.points[2].setTo(newPoint2.x, newPoint2.y);

      this.updateDimensions();
    },

    /*
     *
     */
    stretchWidth: function(amount){
      this.stretchRight(amount / 2.0);
      this.stretchLeft(amount / 2.0)
    },

    /*
     *
     */
    stretchHeight: function(amount){
      this.stretchTop(amount / 2.0);
      this.stretchBottom(amount / 2.0);
    },

    /*
     * Methods for shrinking too?
     */
     shrinkBottom: function(amount){

       var newHeigth;
       (this.height - amount < 0) ? newHeigth = 0 : newHeigth = this.height - amount;

       var angle2 = this.getPoint(1).angle(this.getPoint(2), true);
       angle2 -= 90;

       var angle3 = this.getPoint(0).angle(this.getPoint(3), true);
       angle3 -= 90;

       var newPoint2 = new Phaser.Point(this.getPoint(1).x, this.getPoint(1).y + newHeigth);
       var newPoint3 = new Phaser.Point(this.getPoint(0).x, this.getPoint(0).y + newHeigth);

       newPoint2.rotate(this.getPoint(1).x, this.getPoint(1).y, angle2, true, newHeigth);
       newPoint3.rotate(this.getPoint(0).x, this.getPoint(0).y, angle3, true, newHeigth);

       this.rec.points[2].setTo(newPoint2.x, newPoint2.y);
       this.rec.points[3].setTo(newPoint3.x, newPoint3.y);

       this.updateDimensions();
     },

     /*
      *
      */
     shrinkTop: function(amount){
       var newHeigth;
       (this.height - amount < 0) ? newHeigth = 0 : newHeigth = this.height - amount;

       var angle1 = this.getPoint(2).angle(this.getPoint(1), true);
       angle1 -= 90;

       var angle0 = this.getPoint(3).angle(this.getPoint(0), true);
       angle0 -= 90;

       var newPoint1 = new Phaser.Point(this.getPoint(2).x, this.getPoint(2).y + newHeigth);
       var newPoint0 = new Phaser.Point(this.getPoint(3).x, this.getPoint(3).y + newHeigth);

       newPoint1.rotate(this.getPoint(2).x, this.getPoint(2).y, angle1, true, newHeigth);
       newPoint0.rotate(this.getPoint(3).x, this.getPoint(3).y, angle0, true, newHeigth);

       this.rec.points[1].setTo(newPoint1.x, newPoint1.y);
       this.rec.points[0].setTo(newPoint0.x, newPoint0.y);

       this.updateDimensions();
     },

     /*
      *
      */
     shrinkLeft: function(amount){
       var newWidth;
       (this.width - amount < 0) ? newWidth = 0 : newWidth = this.width - amount;

       var angle0 = this.getPoint(1).angle(this.getPoint(0), true);
       angle0 -= 90;

       var angle3 = this.getPoint(2).angle(this.getPoint(3), true);
       angle3 -= 90;

       var newPoint0 = new Phaser.Point(this.getPoint(1).x, this.getPoint(1).y + newWidth);
       var newPoint3 = new Phaser.Point(this.getPoint(2).x, this.getPoint(2).y + newWidth);

       newPoint0.rotate(this.getPoint(1).x, this.getPoint(1).y, angle0, true, newWidth);
       newPoint3.rotate(this.getPoint(2).x, this.getPoint(2).y, angle3, true, newWidth);

       this.rec.points[0].setTo(newPoint0.x, newPoint0.y);
       this.rec.points[3].setTo(newPoint3.x, newPoint3.y);

       this.updateDimensions();
     },

     /*
      *
      */
     shrinkRight: function(amount){
       var newWidth;
       (this.width - amount < 0) ? newWidth = 0 : newWidth = this.width - amount;

       var angle1 = this.getPoint(0).angle(this.getPoint(1), true);
       angle1 -= 90;

       var angle2 = this.getPoint(3).angle(this.getPoint(2), true);
       angle2 -= 90;

       var newPoint1 = new Phaser.Point(this.getPoint(0).x, this.getPoint(0).y + newWidth);
       var newPoint2 = new Phaser.Point(this.getPoint(3).x, this.getPoint(3).y + newWidth);

       newPoint1.rotate(this.getPoint(0).x, this.getPoint(0).y, angle1, true, newWidth);
       newPoint2.rotate(this.getPoint(3).x, this.getPoint(3).y, angle2, true, newWidth);

       this.rec.points[1].setTo(newPoint1.x, newPoint1.y);
       this.rec.points[2].setTo(newPoint2.x, newPoint2.y);

       this.updateDimensions();
     },

     /*
      *
      */
     shrinkWidth: function(amount){
       this.stretchLeft(-amount / 2.0);
       this.stretchRight(-amount / 2.0)
     },

     /*
      *
      */
     shrinkHeight: function(amount){
       this.stretchTop(-amount / 2.0);
       this.stretchBottom(-amount / 2.0);
     },

     // =====================================================

     /**
      * Move the rectangle a specified distance in to a direction given as angle
      *
      * @param {Number} distance - Distance the rectangle will be moved (as pixels).
      *                            The distance is from current center point to center point after moving.
      *                            If distance is not given, it will set to 0.
      * @param {Number} angle - Angle (in degrees) determining the direction the rectangle will be moved to. Angle 0 is left, and 90 downwards (on xy-axis).
      *                         If angle is not given, it will be set to 0.
      */
     moveDistanceInAngle(distance, angle){
       if(distance === undefined) { distance = 0; }
       if(angle === undefined ) { angle = 0; }

       var angleInRadians = angle * (Math.PI / 180);

       var end = new Phaser.Line().fromAngle(this.center.x, this.center.y, angleInRadians, distance).end;
       this.centerOn(end.x, end.y);

     },


     // ============= Some helper methods ===================

     updateDimensions: function(){
       this.updateWidth();
       this.updateHeight();
       this.updateCornerDistance();
     },

     updateCornerDistance: function(){
       // Calculate the corner distance using good old Pythagoras
       this.cornerDistance = Math.sqrt( Math.pow((this.width / 2), 2) + Math.pow((this.height / 2), 2) );
     },

     updateWidth: function(){
       this.width = Phaser.Point.distance(this.getPoint(0), this.getPoint(1), false);
     },

     updateHeight: function(){
       this.height = Phaser.Point.distance(this.getPoint(1), this.getPoint(2), false);
     }

}
