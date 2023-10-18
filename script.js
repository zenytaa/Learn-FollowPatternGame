let buttonColores = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;
$(document).keydown(() => {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").on("input", function () {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  animate(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

// function to make pattern
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColores[randomNumber];
  gamePattern.push(randomChosenColor);
  // add animation(class pressed in css)
  animate(randomChosenColor);
  playSound(randomChosenColor);
}

// function playSound(name) {
//   let audio = new Audio("./sounds/" + name + ".mp3");
//   audio.play();
// }

let playSound = (name) => new Audio("./sounds/" + name + ".mp3").play();

// function animate(currentColor) {
//   $("#" + currentColor).addClass("pressed");
//   setTimeout(function () {
//     $("#" + currentColor).removeClass("pressed");
//   }, 100);
// }

let animate = (currentColor) => {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    new Audio("./sounds/wrong.mp3").play();
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

let startOver = () => {
  level = 0;
  gamePattern = [];
  started = false;
};
