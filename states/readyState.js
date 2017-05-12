/**
*
*/

function ReadyState() {}

ReadyState.prototype = {

  create: function() {

    console.log("ReadyState active");

    // Start the actual animation
    this.game.state.start('animation');
  }

  // TODO update?
  // When the play button is pushed, move to the next state

};
