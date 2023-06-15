//Play with Player Movement

//Set up Canvas and Graphics Context

let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

//Global Variables
let player1 = {
  x: 770,
  y: 250,
  w: 30,
  h: 100,
  // xSpeed: 0,
  // ySpeed: 0,
};

let player2 = {
  x: 0,
  y: 250,
  w: 30,
  h: 100,
  // xSpeed: 0,
  ySpeed: 0,
};
let player3 = {
  x: 400,
  y: 300,
  r: 10,
  start: 0,
  end: 2 * Math.PI,
  xSpeed: 2,
  ySpeed: 2,
};

let point = 0;
let score = 0;
let ArrowUpPressed = false;
let ArrowDownPressed = false;
let KeyW = false;
let KeyS = false;

// Main progrm loop
requestAnimationFrame(draw);

function draw() {
  //Move playerBlue based on what key is pressed / held down

  //Drawing
  ctx.clearRect(0, 0, cnv.width, cnv.height);
  ctx.font = "30px Consolas";
  ctx.fillText("Score:", 200, 30);
  ctx.fillText(score, 300, 30);

  //Drawing Score for computer
  ctx.font = "30px Consolas";
  ctx.fillText("Score:", 500, 30);
  ctx.fillText(point, 600, 30);

  //Draw Player1
  ctx.fillStyle = "white";
  ctx.fillRect(player1.x, player1.y, player1.w, player1.h);

  //Draw player2
  ctx.fillStyle = "white";
  ctx.fillRect(player2.x, player2.y, player2.w, player2.h);

  //Draw Background
  ctx.fillStyle = "white";
  ctx.fillRect(400, 0, 1, 600);

  //Draw Ball
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(player3.x, player3.y, player3.r, player3.start, player3.end);
  ctx.fill();

  //count score for player1
  if (player3.x > player1.x && player3.y < player1.y) {
    score++;
  } else if (player3.x > player1.x && player3.y > player1.y + player1.h) {
    score++;
  }

  //count score for computer
  if (player3.x < player2.x && player3.y < player2.y) {
    point++;
  } else if (player3.x < player2.x && player3.y > player2.y + player2.h) {
    point++;
  }
  console.log(point);

  if (ArrowDownPressed) {
    player1.y += 4;
  }
  if (ArrowUpPressed) {
    player1.y -= 4;
  }
  // if (KeyWPressed) {
  //   player2.y -= 1;
  // }
  // if (KeySPressed) {
  //   player2.y += 1;
  // }

  //Collisions player 1
  if (player1.y < 0) {
    player1.y = 0;
  }
  if (player1.y + player1.h > 600) {
    player1.y = 600 - player1.h;
  }

  //Physics Ball
  player3.y += player3.ySpeed;
  player3.x += player3.xSpeed;
  // Check collision with player
  if (
    player3.x > player1.x &&
    player1.y < player3.y < player1.y + player1.h / 2
  ) {
    player3.xSpeed = -2;
    player3.ySpeed = -2;
  } else if (
    player3.x > player1.x &&
    player1.y < player3.y > player1.y + player1.h / 2
  ) {
    player3.xSpeed = -2;
    player3.ySpeed = 2;
  }

  if (
    player3.x > player1.x &&
    player3.y + player3.h > (player1.y + player1.h) / 2
  ) {
    player3.ySpeed = 2;
    player3.xSpeed = -2;
  } else if (
    player3.x > player1.x &&
    player3.y + player3.h < (player1.y + player1.h) / 2
  ) {
    player3.xSpeed = -2;
    player3.ySpeed = 2;
  }
  //Check collision with wall
  if (player3.x == 760) {
    console.log("point");
  }

  if (player3.y + player3.r * 2 > 600) {
    player3.y = 600 - player3.r * 2;
    player3.ySpeed = -2;
    player3.xSpeed = 2;
  }

  if (player3.y < 0 && player3.xSpeed == -2) {
    player3.ySpeed = 2;
    player3.xSpeed = -2;
  } else if (player3.y < 0 && player3.xSpeed == 2) {
    player3.ySpeed = 2;
    player3.xSpeed = 2;
  }
  if (player3.x < player2.x + player2.w) {
    player3.xSpeed = 2;
  }

  //Collisions for player2
  if (player2.y < 0) {
    player2.y = 0;
  }
  if (player2.y + player2.h > 600) {
    player2.y = 600 - player2.h;
  }

  // Contol Player 2
  if (player3.y > player2.y) {
    player2.y += 2;
  } else if (player3.y < player2.y) {
    player2.y -= 2;
  } else {
    player2.y = player2.y;
  }
  //Request another Animation Frame
  requestAnimationFrame(draw);
}

//Key Event Stuff

document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler(event) {
  //KeyIsPressed movement Player1

  if (event.code == "ArrowUp") {
    ArrowUpPressed = true;
  } else if (event.code == "ArrowDown") {
    ArrowDownPressed = true;
  }
  //player2
  // if (event.code == "KeyW") {
  //   KeyWPressed = true;
  // } else if (event.code == "KeyS") {
  //   KeySPressed = true;
  // }
}
document.addEventListener("keyup", keyupHandler);

function keyupHandler(event) {
  //KeyIsPressed movement Player1
  // if (!event.repeat) {
  if (event.code == "ArrowUp") {
    ArrowUpPressed = false;
  } else if (event.code == "ArrowDown") {
    ArrowDownPressed = false;
  }
}

document.getElementById("btn");
document.addEventListener("click", btnClicked);
function btnClicked() {
  Math.random();
  if (Math.random() > 0.75) {
    player3.xSpeed += 1;
    player3.ySpeed += 1;
  } else if (Math.random() < 0.75) {
    player3.xSpeed -= 1;
    player3.ySpeed -= 1;
  }

  console.log(player3.xSpeed);
}
