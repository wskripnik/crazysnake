import { onSnake, expandSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";

let food = getRandomFoodPosition();
let food2 = getRandomFoodPosition();
const EXPANSION_RATE = 1;
const SCORE_INCREMENT = {
  food: 1,
  food2: 5,
};
let score = 0;
const scoreAudio = new Audio("./audio/score.wav");
export const gameAudio = new Audio("./audio/crazy snake music.wav");

export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    score += SCORE_INCREMENT["food"];
    gameAudio.pause();
    scoreAudio.play();
    setTimeout(function() {      
      scoreAudio.pause()
      scoreAudio.currentTime = 0;
    }, 100)
    food = getRandomFoodPosition();
  } else if (onSnake(food2)) {
    expandSnake(EXPANSION_RATE + 1);
    score += SCORE_INCREMENT["food2"];
    gameAudio.pause();
    scoreAudio.play();
    setTimeout(function() {      
      scoreAudio.pause()
      scoreAudio.currentTime = 0;
    }, 100)
    food2 = getRandomFoodPosition();
  }
}

export function draw(gameBoard, className) {
  const foodElement = document.createElement("div");
  if (className === "food") {
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
  } else {
    foodElement.style.gridRowStart = food2.y;
    foodElement.style.gridColumnStart = food2.x;
  }

  foodElement.classList.add(className);
  gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition() {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
}

export function getScore() {
  return score;
}
