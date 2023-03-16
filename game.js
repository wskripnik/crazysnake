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
import { showName, getName } from "./input.js";

let lastrenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById("game-board");
const scoreElement = document.getElementById("score");
const deadAudio = new Audio("./audio/Crazy_Snake_Death_music_2.0.wav");
const LEADERBOARD_SIZE = 10;
buildLeaderboard();
showName();

function buildLeaderboard() {
  const l = document.getElementById("leaderboard");
  let html =
    '<table><thead><tr><th colspan="3">Leaderboard</th></tr></thead><tbody>';

  let leaderboard = localStorage.getItem("leaderboard");
  if (leaderboard) {
    leaderboard = JSON.parse(leaderboard);
    let counter = 1;
    for (let i in leaderboard) {
      html += `<tr><td>${counter++}. </td><td>${i}</td><td>${
        leaderboard[i]
      }</td></tr>`;
    }
  }
  html += "</tbody></table>";
  l.innerHTML = html;
}

function main(currentTime) {
  if (gameOver) {
    gameAudio.pause();
    deadAudio.play();
    setTimeout(function () {
      deadAudio.pause();
      deadAudio.currentTime = 0;
    }, 100);
    let leaderboard = localStorage.getItem("leaderboard");
    let leaderboardTrimmed = {};
    const score = getScore();
    const name_ = getName();
    if (leaderboard) {
      leaderboard = JSON.parse(leaderboard);
      if (leaderboard) {
        if (score > parseInt(leaderboard[name_]) || !leaderboard[name_]) {
          if (name_ !== 'your name') {
            leaderboard[name_] = score;
          }
        }
        leaderboard = _.reduceRight(
          _.invert(_.invert(leaderboard)),
          function (current, val, key) {
            current[key] = parseInt(val);
            return current;
          },
          {}
        );
        if (Object.keys(leaderboard).length > LEADERBOARD_SIZE) {
          let counter = 1;
          for (let i in leaderboard) {
            if (counter++ <= LEADERBOARD_SIZE) {
              leaderboardTrimmed[i] = leaderboard[i];
            }
          }
        } else {
          leaderboardTrimmed = leaderboard;
        }
      }
    } else {
      leaderboardTrimmed = {};
      if (name_ !== 'your name') {
        leaderboardTrimmed[name_] = score;
      }
    }
    localStorage.setItem("leaderboard", JSON.stringify(leaderboardTrimmed));
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
