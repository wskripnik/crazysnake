const NAME_LENGHT = 17;
let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };
const username = document.getElementById("username");
let focused = false;
username.onfocus = () => {
  focused = true;
  gameOn = false;
  if (username.innerHTML === "your name") {
    username.innerHTML = "";
  }
};
username.onblur = () => {
  focused = false;
  gameOn = true;
  if (username.innerHTML === "") {
    username.innerHTML = "your name";
  } 
  username.innerHTML = getName()
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
  if (focused && e.key !== 'Backspace') {
    if(e.key === 'Enter'){
      e.target.blur(); 
      e.preventDefault();
    }


    let name = username.innerHTML;
    if (name.length >= NAME_LENGHT) {
      e.preventDefault();
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

export function getName() {
  return username.innerHTML.substring(0, NAME_LENGHT).replace(/[^a-z0-9 _-]/gi, '');
}
