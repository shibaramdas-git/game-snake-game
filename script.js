// Constants
const INITIAL_SPEED = 200;
const MIN_SPEED = 120;
const SPEED_INCREMENT = 6;
const GRID_SIZE = getComputedStyle(document.documentElement).getPropertyValue(
  "--grid-size"
);

// HTML elements
const board = document.getElementById("game-board");
const starterScreen = document.querySelector(".starter-screen");
const scoreDisplay = document.querySelector("#score");
const highScoreDisplay = document.querySelector("#highScore");

// Variables
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = "right";
let gameStarted = false;
let gameSpeed = INITIAL_SPEED;
let gameInterval;
let highScore = 0;

document.addEventListener("keydown", handleKeyPress);
// ==============================================================
// Initialize and start game()
// ==============================================================
function startGame() {
  gameStarted = true;
  starterScreen.style.display = "none";
  gameInterval = setInterval(gameLoop, gameSpeed);
  // console.log(`game speed - ${gameSpeed} , direction - ${direction}`);
}

// Opposite of startGame();
function stopGame() {
  gameStarted = false;
  clearInterval(gameInterval);
  starterScreen.style.display = "block";
  board.innerHTML = ""; //Removes snake & food when game is over
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  food = generateFood();
  direction = "right";
  gameSpeed = INITIAL_SPEED;
  stopGame();
  updateScore();
  updateHighScore();
}

function gameLoop() {
  draw();
  move();
  checkCollision();
}
// ==============================================================
// draw functions
// ==============================================================
function draw() {
  board.innerHTML = "";
  drawSnake();
  drawFood();
  updateScore();
}

function drawSnake() {
  snake.forEach((segment) => {
    const snakeElement = createChildElement("div", "snake");
    //Set position to center every time
    setPosition(snakeElement, segment);
    board.appendChild(snakeElement);
  });
}

function drawFood() {
  const foodElement = createChildElement("div", "food");
  setPosition(foodElement, food);
  board.appendChild(foodElement);
}

// ==============================================================
// Movement and direction handling
// ==============================================================
function handleKeyPress(event) {
  if (!gameStarted && (event.code == "Space" || event.key === " ")) {
    startGame();
  }
}
function getNewDirection(key) {
  switch (key) {
    case "ArrowUp":
      direction = "up";
      break;
    case "ArrowDown":
      direction = "down";
      break;
    case "ArrowRight":
      direction = "right";
      break;
    case "ArrowLeft":
      direction = "left";
      break;
  }
}

// Move the snake (MAIN FUNCTION)
function move() {
  let head = { ...snake[0] }; //Accessing the head of snake
  switch (direction) {
    case "right":
      head.x++;
      break;
    case "left":
      head.x--;
      break;
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
  }

  snake.unshift(head);

  // snake.pop();

  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
    gameSpeed = increaseSpeed(gameSpeed);
    clearInterval(gameInterval); //To start new interval with new speed
    gameInterval = setInterval(() => {
      draw();
      move();
      checkCollision();
    }, gameSpeed);
  } else {
    snake.pop();
  }
}

// setInterval(() => {
//   draw();
//   move();
// }, 200);

// Lets increase speed on every food
function increaseSpeed(speed) {
  // console.log(speed);
  if (speed > MIN_SPEED) {
    speed -= SPEED_INCREMENT;
    console.log(speed);
  }
  return speed;
}
// ==============================================================
// Helper functions
// ==============================================================

function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}
function createChildElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}
function generateFood() {
  const x = Math.floor(Math.random() * GRID_SIZE) + 1;
  const y = Math.floor(Math.random() * GRID_SIZE) + 1;
  return { x, y };
}

// ==============================================================
// Check collision with walls and snakes body itself
// ==============================================================

function checkCollision() {
  let head = snake[0];
  //Check for boundary
  if (head.x < 1 || head.x > GRID_SIZE || head.y < 1 || head.y > GRID_SIZE) {
    console.log("out", "Grid size- ", GRID_SIZE);
    resetGame();
  }

  //Check for its body
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      resetGame();
      console.log("out");
    }
  }
}

// ==============================================================
// Score Display
// ==============================================================

function updateScore() {
  let currentScore = snake.length - 1;
  scoreDisplay.textContent = `Score: ${currentScore
    .toString()
    .padStart(3, "0")}`;
}
function updateHighScore() {
  let currentScore = snake.length - 1;
  if (currentScore > highScore) {
    highScore = currentScore;
    highScoreDisplay.textContent = `High Score: ${highScore
      .toString()
      .padStart(3, "0")}`;
  }
  highScoreDisplay.style.display = "block";
}
