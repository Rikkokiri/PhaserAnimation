var upperTeeth = [];
var lowerTeeth = [];
var distance;
var growingSum = 0;

function createTeeth(gameWidth, gameHeight){

  var teethWidth = gameHeight / 16;
  var teethLength = gameHeight * (5 / 12);
  distance = gameHeight * (1 / 12);

  var y = 0;

  for(var x = teethWidth / 2; x < gameWidth; x += 3 * teethWidth){
    // function Rec (upperLeftX, upperLeftY, height, width, color, linewidth, fill) {
    upperTeeth.push(new Rec(x, y, teethLength, teethWidth, 0xffffff));
  }

  y = gameHeight * (7 / 12);

  for(var x = 2 * teethWidth; x < gameWidth; x += 3 * teethWidth){
    upperTeeth.push(new Rec(x, y, teethLength, teethWidth, 0xffffff));
  }

}

/**
 * Draw the shapes that form the "teeth"
 */
function drawTeeth(graphics){

  for(var index = 0; index < upperTeeth.length; index++){
    upperTeeth[index].draw(graphics);
  }

  for(var index = 0; index < lowerTeeth.length; index++){
    lowerTeeth[index].draw(graphics);
  }

}

/**
 *
 */
function growTeeth(amount){

  for(var index = 0; index < upperTeeth.length; index++){
    upperTeeth[index].stretchBottom(amount);
  }

  for(var index = 0; index < lowerTeeth.length; index++){
    lowerTeeth[index].stretchTop(amount);
  }

}

function animateTeethGrowing(graphics, amount){

  if(growingSum < distance){
    growTeeth(amount);
    growingSum += amount;
  }
  drawTeeth(graphics);

}
