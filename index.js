var warnaTombol = ["red", "blue", "green", "yellow"];
var randomColor = [];
var userColor = [];
var levelStart = 0;

$(document).keypress(function (start) {
  if (start.key === "a") {
    startGame();
  }
});

function startGame() {
  levelStart++;
  randomColor.push(warnaTombol[angkaSelanjutnya()]);
  $("h1").text("Level " + levelStart);
  playSequence();
}

function playSequence() {
  var i = 0;
  var interval = setInterval(function () {
    press(randomColor[i]);
    i++;
    if (i >= randomColor.length) {
      clearInterval(interval);
    }
  }, 1000);
}

function makeSound(sound) {
  var audio = new Audio("sounds/" + sound + ".mp3");
  audio.play();
}

function press(color) {
  $("#" + color).addClass("pressed");
  makeSound(color);
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 500);
}

$(".btn").click(function () {
  var clickedColor = $(this).attr("id");
  press(clickedColor);
  userColor.push(clickedColor);

  if (!checkUserInput()) {
    endGame();
  } else if (userColor.length === randomColor.length) {
    userColor = [];
    setTimeout(function () {
      startGame();
    }, 1000);
  }
});

function checkUserInput() {
  for (var i = 0; i < userColor.length; i++) {
    if (userColor[i] !== randomColor[i]) {
      makeSound("wrong");
      return false;
    }
  }
  return true;
}

function endGame() {
  $("h1").text("Game Over! Press 'A' to Restart");
  makeSound("wrong");
  levelStart = 0;
  randomColor = [];
  userColor = [];
}

function angkaSelanjutnya() {
  return Math.floor(Math.random() * 4);
}
