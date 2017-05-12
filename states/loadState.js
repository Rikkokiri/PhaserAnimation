/**
 * State where all assets required by the animation are loaded.
 */
function LoadState (){}

LoadState.prototype = {

  /*
   *                P R E L O A D
   * ============================================
   */
  preload: function() {

    // Center the canvas horizontally and vertically
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;

    this.ready = false;

    // . . . Load the assets for the animation . . .

    // Firefox doesn't support mp3 files, so use ogg
    this.game.load.audio('sail', 'resources/sail.ogg');


  },

  /*
   *                U P D A T E
   * ============================================
   */
  update: function() {

    // If music has been loaded, move to the next state
    if(this.cache.isSoundDecoded('sail') && this.ready === false){
      this.ready = true;
      this.game.state.start('ready');
    }

  }
};
