/**
*
*/

function AnimationState() {}

var graphics;
var centerX;
var centerY;

AnimationState.prototype = {

  create: function() {

    // Create the graphics objects and so on...
    this.createEssentials();
    // Music!
    music = this.game.add.audio('sail');
    music.play();


    introSquare = new SolidSquare(100, 100, 50, "0xffffff");



  },

  update: function() {

    graphics.clear();

    introSquare.drawSquare(graphics);

  },

  createEssentials: function() {

    graphics = this.game.add.graphics(0,0);
    centerX = this.game.width / 2;
    centerY = this.game.height / 2;

  }


}
