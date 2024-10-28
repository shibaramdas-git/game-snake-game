const board = document.getElementById("game-board");
const starterScreen = document.querySelector(".starter-screen");

// Variables
let snake = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
];
let food = generateFood();
let direction = "right";
let gameStarted = false;

// Draww game map, snake, food
function Draw() {
  board.innerHTML = "";
  DrawSnake();
  DrawFood();
}
// Draw snake
function DrawSnake() {
  snake.forEach((segment) => {
    //create snake element
    const snakeElement = createChildElement("div", "snake");
    //Set position to center every time
    setPosition(snakeElement, segment);
    board.appendChild(snakeElement);
  });
}
// Draw food
function DrawFood() {
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
  const x = Math.floor(Math.random() * 20) + 1;
  const y = Math.floor(Math.random() * 20) + 1;
  return { x, y };
}

// Move the snake
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
}
setInterval(() => {
  Draw();
  move();
}, 200);

// Start the game
// function startGame() {
//   gameStarted = true;
//   starterScreen.style.display = "none";
//   Draw();
//   let gameInterval = setInterval(() => {
//     move();
//   }, 800);
// }

// Handle keypress event
// function handleKeyPress(event) {
//   if (
//     (gameStarted === false && event.code == "Space") ||
//     (gameStarted === false && event.key === " ")
//   ) {
//     startGame();
//   } else {
//     switch (event.key) {
//       case "ArrowUp":
//         direction = "up";
//         break;
//       case "ArrowDown":
//         direction = "down";
//         break;
//       case "ArrowRight":
//         direction = "right";
//         break;
//       case "ArrowLeft":
//         direction = "left";
//         break;
//     }
//   }
// }
// document.addEventListener("keydown", handleKeyPress);
