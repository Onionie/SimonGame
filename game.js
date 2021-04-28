var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function nextSequence() {
  userClickedPattern = []
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  console.log(gamePattern);
}

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    // if the user got the most recent answer right
    // then check that they have finished their sequence
    // with another if statement

    if (userClickedPattern.length === gamePattern.length) {

      // begin nextSequence after a 1000 millisecond delay
      // clear user array
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {

    // play wrong mp3 if user got one of the answers wrong
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    // apply game-over style to body if user got one of the answers wrong
    $("body").addClass("game-over");

    // remove game-over style after 200 milliseconds
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    // change h1 title to Game Over
    $("#level-title").text("Game Over!");
    startOver();
  }
}

function startOver() {
    // reset game values
    level = 0;
    gamePattern = [];
    started = false;
}

function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(".btn").on("click", function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length-1);
});

$(document).keydown(function(event) {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
