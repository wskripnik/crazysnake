import { onSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";

let Rock = getRandomRockPosition();


let score = 0;
const gameAudio = new Audio("./audio/crazy snake music.wav");
const scoreAudio = new Audio("./audio/Crazy snake score music.wav");

export function update() {
  if (
    (gameAudio.paused && gameAudio.currentTime > 0 && !gameAudio.ended) ||
    gameAudio.currentTime === 0
  ) {
    gameAudio.play();
  }
 
  }


export function draw(gameBoard, className) {
  const foodElement = document.createElement("div");
  if (className === "Rock") {
    rockElement.style.gridRowStart = food.y;
    rockElement.style.gridColumnStart = food.x;
  } else {
    rockElement.style.gridRowStart = food2.y;
   rockElement.style.gridColumnStart = food2.x;
  }

  rockElement.classList.add(className);
  gameBoard.appendChild(foodElement);
}

function getRockFoodPosition() 
  let newRockPosition;
  while (newRockPosition == null || onSnake(newFoodPosition)) {
    newRockPosition = randomGridPosition();
  newRockPosition;
}

