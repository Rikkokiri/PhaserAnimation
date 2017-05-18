/**
 * @author Rikkokiri
 */

var gWidth;
var gHeight;
var gCenterX;
var gCenterY;
var game;

var presentsText;
var line1Content = ["The ", "result ", "of ", "days ", "of"];
var line2Content = ["shameless", "procrastination"];
var line1;
var line2;

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

/**
 * Method for displaying the "... presents" text
 */
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

// ----------- Methods for removing the text -----------
/*
 * These methods are not at all general and the functionality could be implemented using
 * a general remove function. However, I didn't want to make references to specific variables
 * from the animationState, so I ended up solving the text remove issue this way.
 * It sucks, but I've written worse things. Especially in this project.
 */

/**
 * Method for removing the present text
 */
function removePresentsText(){
  game.world.remove(presentsText);
}

/**
 * Method for removing the title text
 */
function removeTitle(){
  game.world.remove(line1);
  game.world.remove(line2);
}

// -----------------------------------------------------

function disPlayTitleMessage(phase){

  if(phase == 1){

  }
  if(phase == 2){

  }
  if(phase == 3){

  }
  if(phase == 4){

  }
  if(phase == 5){

  }
  if(phase == 6){

  }
  if(phase == 7){

  }

}

function gerTitleMessageSoFar(phase){
  var subarray;

  // First line
  if(phase <= lineContent1.length){
    subarray = lineContent1.slice(0, phase - 1);
  }
  // Second line
  else {
    subarray = lineContent2.slice(0, phase - 1);
  }

  return subarray.join();
}
