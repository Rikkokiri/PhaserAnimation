var upperTeeth = [];
var lowerTeeth = [];
var distance;
var growingSum = 0;

function createTeeth(gameWidth, gameHeight){

  var teethWidth = gameWidth / 18;
  var teethLength = gameHeight * (5 / 12);
  distance = gameHeight * (1 / 12);

  var y = 0 - teethLength;

  for(var x = teethWidth / 2; x < gameWidth + teethWidth; x += 3 * teethWidth){
    // function Rec (upperLeftX, upperLeftY, height, width, color, linewidth, fill) {
    upperTeeth.push(new Rec(x, y, teethLength, teethWidth, 0x000000));
  }

  y = gameHeight;

  for(var x = 2 * teethWidth; x < gameWidth; x += 3 * teethWidth){
    lowerTeeth.push(new Rec(x, y, teethLength, teethWidth, 0x000000));
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

/**
 *
 */
function widenTeeth(amountOnBothSides){
  for(var index = 0; index < upperTeeth.length; index++){
    upperTeeth[index].stretchWidth(2 * amountOnBothSides);
  }

  for(var index = 0; index < lowerTeeth.length; index++){
    lowerTeeth[index].stretchTop(2 * amountOnBothSides);
  }
}

// Not needed
function animateTeethGrowing(graphics, amount){

  if(growingSum <  2 * distance ){
    growTeeth(amount);
    growingSum += amount;
  }
  drawTeeth(graphics);

}
