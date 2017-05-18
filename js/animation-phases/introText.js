/**
 * @author Rikkokiri
 */

var gWidth;
var gHeight;
var gCenterX;
var gCenterY;
var game;

var presentsText;

/**
 *
 */
function prepareIntroTexts(thisgame){

  game = thisgame;

  gWidth = game.width;
  gHeight = game.height;
  gCenterX = gWidth / 2;
  gCenterY = gHeight / 2;

  presentsText = game.add.text(-100, -100, "RIKKOKIRI PRESENTS");
  presentsText.font = "Helvetica";
  presentsText.fontsize = 80;
  presentsText.fontWeight = 'bold';
  presentsText.fill = "#ffffff";

}


/* Method for centering the given text element */
function centerText(toBeCentered){
  toBeCentered.y = gCenterY - toBeCentered.height / 2;
  toBeCentered.x = gCenterX - toBeCentered.width / 2;
}

function displayPresentsText(phase){

  if(phase == 1){
    centerText(presentsText);
    presentsText.setText("RIKKOKIRI", true);
    console.log("Display Rikkokiri");
  }
  if(phase == 2){
    presentsText.setText("RIKKOKIRI PRESENTS", true);
    console.log("Display Rikkokiri presents");
  }

}

function removePresentsText(){
  game.world.remove(presentsText);
}

function messageSequence(){

}
