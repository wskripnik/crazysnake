import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
  getSnakeHead,
  getSnakeIntersection,
} from "./snake.js";
import {
  update as updateFood,
  draw as drawFood,
  getScore,
  gameAudio,
} from "./food.js";
import { outsideGrid } from "./grid.js";

let lastrenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById("game-board");
const scoreElement = document.getElementById("score");
const deadAudio = new Audio("./audio/Crazy_Snake_Death_music_2.0.wav");

function main(currentTime) {
  if (gameOver) {
    gameAudio.pause();
    deadAudio.play();
    setTimeout(function() {
      deadAudio.pause()
      deadAudio.currentTime = 0;
    }, 100)
    if (confirm("You died :(, Press ok to restart.")) {
      location.reload();
    }
    return;
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastrenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastrenderTime = currentTime;
  update();
  draw();
  scoreElement.innerHTML = getScore();
}

window.requestAnimationFrame(main);

function update() {
  if (gameAudio.paused || gameAudio.ended || gameAudio.currentTime === 0) {
    gameAudio.play();
  }
  updateSnake();
  updateFood();
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard, "food");
  drawFood(gameBoard, "food2");
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || getSnakeIntersection();
}
