/**
*
*/

function ReadyState() {}

var playButton;

ReadyState.prototype = {

  /*
   *                P R E L O A D
   * ============================================
   */
  preload: function() {

    this.game.load.spritesheet('playbutton', 'resources/playbutton.png');

  },

  /*
   *                C R E A T E
   * ============================================
   */
  create: function() {

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

    var tweenFadeButton = this.game.add.tween(playButton)
      //to(properties, duration, ease, autoStart, delay, repeat, yoyo)
      .to({alpha: 0}, 500, Phaser.Easing.Linear.None, false, 250, 0, false);

    tweenFadeButton.onComplete.add(function(){
      this.game.state.start('animation');
    }, this);

    tweenFadeButton.start();
  },



};
