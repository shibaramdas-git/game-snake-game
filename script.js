// HTML elements
const board = document.getElementById("game-board");
const starterScreen = document.querySelector(".starter-screen");

// Variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = "right";
let gameStarted = false;
let gameSpeedDelay = 200;
let gameInterval;

// draww game map, snake, food
function draw() {
  board.innerHTML = "";
  drawSnake();
  drawFood();
}
// draw snake
function drawSnake() {
  snake.forEach((segment) => {
    //create snake element
    const snakeElement = createChildElement("div", "snake");
    //Set position to center every time
    setPosition(snakeElement, segment);
    board.appendChild(snakeElement);
  });
}
// draw food
function drawFood() {
  const foodElement = createChildElement("div", "food");
  setPosition(foodElement, food);
  board.appendChild(foodElement);
}
// ======================================
// Helper functions
// ======================================

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
  const x = Math.floor(Math.random() * gridSize) + 1;
  const y = Math.floor(Math.random() * gridSize) + 1;
  return { x, y };
}

// Handle keypress event (MAIN FUNCTION)
function handleKeyPress(event) {
  if (
    (gameStarted === false && event.code == "Space") ||
    (gameStarted === false && event.key === " ")
  ) {
    startGame();
  } else {
    switch (event.key) {
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
}

document.addEventListener("keydown", handleKeyPress);

// Start the game
function startGame() {
  gameStarted = true;
  starterScreen.style.display = "none";
  gameInterval = setInterval(() => {
    draw();
    move();
    checkCollision();
  }, gameSpeedDelay);
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
    gameSpeedDelay = increaseSpeed(gameSpeedDelay);
    clearInterval(gameInterval); //To start new interval with new speed
    gameInterval = setInterval(() => {
      draw();
      move();
      checkCollision();
    }, gameSpeedDelay);
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
  if (speed > 150) {
    speed -= 5;
  } else if (gameSpeedDelay > 100) {
    speed -= 3;
  } else if (gameSpeedDelay > 50) {
    speed -= 2;
  } else if (gameSpeedDelay > 25) {
    speed -= 1;
  }
  return speed;
}

// Chechk collision with walls and snakes body itself
function checkCollision() {
  let head = snake[0];
  //Check for boundary
  if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
    console.log("out");
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

function resetGame() {
  stopGame();
  snake = [{ x: 10, y: 10 }];
  food = generateFood();
  direction = "right";
  gameSpeedDelay = 200;
}
// Opposite of startGame();
function stopGame() {
  gameStarted = false;
  starterScreen.style.display = "block";
  clearInterval(gameInterval);
}
