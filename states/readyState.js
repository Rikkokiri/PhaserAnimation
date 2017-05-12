/**
*
*/

function ReadyState() {}

var playButton;

ReadyState.prototype = {

  preload: function() {

    this.game.load.spritesheet('playbutton', 'resources/playbutton.png');

  },

  create: function() {

    console.log("ReadyState active");

    // Create the play button
    playButton = this.game.add.button(this.game.width / 2, this.game.height / 2, 'playbutton', this.onPlayButtonClick);

    //  setting the anchor to the center
    playButton.anchor.setTo(0.5, 0.5);

    // Hitting the spacebar should also start the animation
    this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.spacebar.onDown.add(this.onPlayButtonClick, this);

  },

  // When the play button is pushed, move to the next state
  onPlayButtonClick: function() {
    this.game.state.start('animation');
  },



};
