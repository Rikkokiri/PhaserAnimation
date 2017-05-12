/**
*
*/

function AnimationState() {}

AnimationState.prototype = {

  create: function() {

    // Create the graphics objects and so on...
    this.createEssentials();

    introSquare = new SolidSquare(100, 100, 50, "0xffffff");


    // Finally... Music!
    music = this.game.add.audio('sail');
    music.play();

  },

  createEssentials: function() {

    this.graphics = this.game.add.graphics(0,0);
    this.centerX = this.game.width / 2;
    this.centerY = this.game.height / 2;

  }

}

AnimationState.prototype.update = function() {

  this.graphics.clear();

}
