var upperTeeth = [];
var lowerTeeth = [];

function createTeeth(gameWidth, gameHeight){

  var teethWidth = gameWidth / 16;
  var teethLength = gameHeigth * (5 / 12);

  var y = 0;

  for(var x = teethWidth / 2; x < gameWidth; x += 3 * teethWidth){
    // function Rec (upperLeftX, upperLeftY, height, width, color, linewidth, fill) {
    upperTeeth.push(new Rec(x, y, teethLength, teethWidth, 0xffffff));
  }

  y = gameHeigth * (7 / 12);

  for(var x = 2 * teethWidth; x < gameWidth; x += 3 * teethWidth){
    upperTeeth.push(new Rec(x, y, teethLength, teethWidth, 0xffffff));
  }

}

/**
 * Draw the shapes that form the "teeth"
 */
function drawTeeth(graphics){

  for(var index = 0; index < upperTeeth.length; index++){
    upperTeeth[i].draw(graphics);
  }

  for(var index = 0; index < lowerTeeth.length; index++){
    lowerTeeth[i].draw(graphics);
  }

}

/**
 *
 */
function growTeeth(){

  for(var index = 0; index < upperTeeth.length; index++){

  }

  for(var index = 0; index < lowerTeeth.length; index++){
    
  }

}
