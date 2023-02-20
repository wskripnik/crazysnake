let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };
const username = document.getElementById("username");
username.onfocus = () => {
  gameOn = false;
  if (username.innerHTML === "your name") {
    username.innerHTML = "";
  }
};
username.onblur = () => {
  gameOn = true;
  if (username.innerHTML === "") {
    username.innerHTML = "your name";
  }
  localStorage.setItem("username", username.innerHTML);
};
let gameOn = true;

window.addEventListener("keydown", (e) => {
  if (gameOn) {
    switch (e.key) {
      case "ArrowUp":
        if (lastInputDirection.y !== 0) break;
        inputDirection = { x: 0, y: -1 };
        break;
      case "ArrowDown":
        if (lastInputDirection.y !== 0) break;
        inputDirection = { x: 0, y: 1 };
        break;
      case "ArrowLeft":
        if (lastInputDirection.x !== 0) break;
        inputDirection = { x: -1, y: 0 };
        break;
      case "ArrowRight":
        if (lastInputDirection.x !== 0) break;
        inputDirection = { x: 1, y: 0 };
        break;
    }
  }
});

export function getInputDirection() {
  lastInputDirection = inputDirection;
  return inputDirection;
}

export function showName() {
  const storedUsername = localStorage.getItem("username");
  if (storedUsername) {
    username.innerHTML = storedUsername;
  } else {
    const u = document.getElementById("username");
    username.innerHTML = getName();
  }
}

function enterNewName() {
  const u = document.getElementById("username");
  u.innerHTML = `<input value="${getName()}" type="text" />`;
}

export function getName() {
  return username.innerHTML;
}
