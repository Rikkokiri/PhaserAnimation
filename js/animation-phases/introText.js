/**
 * @author Rikkokiri
 */

var gWidth;
var gHeight;
var gCenterX;
var gCenterY;
var game;

var presentsText;
var line1Content = ["THE ", "RESULT ", "OF ", "DAYS ", "OF"];
var line2Content = "S H A M E L E S S "
var line3Content = "PROCRASTINATION";
var line1;
var line2;
var line3;

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
  presentsText.fontSize = 50;
  presentsText.fontWeight = 'bold';
  presentsText.fill = "#ffffff";

  var titlestyle = { font: "37px Helvetica", fill: "#ffffff", align: "center", fontWeight: "bold" };
  line1 = game.add.text(0, 0, line1Content.join(""), titlestyle);
  line2 = game.add.text(0, 0, line2Content, titlestyle);
  line3 = game.add.text(0, 0, line3Content, titlestyle);

  centerText(line1);

  line2.fontSize += 17;
  centerText(line2);

  line3.fontSize += 11;
  centerText(line3);

  line1.y -= line2.height / 2 + 17;
  line3.y += line2.height / 2 + 22;

  line1.setText("");
  line2.setText("");
  line3.setText("");

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
  }
  if(phase == 2){
    presentsText.setText("RIKKOKIRI PRESENTS", true);
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
  game.world.remove(line3);
}

// -----------------------------------------------------

function disPlayTitleMessage(phase){
  var subarray;

  // First line
  if(phase <= line1Content.length){
    subarray = line1Content.slice(0, phase);
    line1.setText(subarray.join(""), true);
  }
  // Second line
  else if(phase - line1Content.length == 1) {
    line2.setText(line2Content);
  }
  else {
    line3.setText(line3Content);
  }

}
