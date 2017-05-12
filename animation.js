/**
 *
 */
function Animation() {}

Animation.prototype = {
  start: function(){

    // Canvas will be tied directly to the body element
    var game = new Phaser.Game(800, 600, Phaser.CANVAS);

    // Add different states to the game object
    game.state.add('load', LoadState);
    game.state.add('ready', ReadyState);
    game.state.add('animation', AnimationState);
//
    // Finally start the preload state
    game.state.start('load');

  }
}
