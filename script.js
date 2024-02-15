const board = document.querySelector(".board");
const scoreElement = document.querySelector(".score");
const highscoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX;
let foodY;
let snakeX = 5;
let snakeY = 5;
let velocityX = 0;
let velocityY = 0;
let snakeLength = [];
let setIntervalId;
let score = 0;

//High Score del local storage

let highScore = localStorage.getItem("high-score") || 0;
highscoreElement.innerHTML = `High Score: ${highScore}`;

// posicion aleatoria de la comida

const updateFood = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
  clearInterval(setIntervalId);
  alert("Game Over! Presione OK para volver a jugar");
  location.reload();
};

// cambiar la velocidad dependiendo de la tecla

const changeDirection = (e) => {
  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
};

//cambiar direccion para las teclas

controls.forEach((button) =>
  button.addEventListener("click", () =>
    changeDirection({ key: button.dataset.key })
  )
);

const initGame = () => {
  if (gameOver) return handleGameOver();
  let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

  if (snakeX === foodX && snakeY === foodY) {
    updateFood();
    snakeLength.push([foodY, foodX]);
    score++;
    highScore = score >= highScore ? score : highScore;

    localStorage.setItem("high-score", highScore);
    scoreElement.innerHTML = `Score : ${score}`;
    highscoreElement.innerHTML = `High Score : ${highScore}`;
  }

  snakeX += velocityX;
  snakeY += velocityY;

  for (let i = snakeLength.length - 1; i > 0; i--) {
    snakeLength[i] = snakeLength[i - 1];
  }

  snakeLength[0] = [snakeX, snakeY];

  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    return (gameOver = true);
  }

  for (let i = 0; i < snakeLength.length; i++) {
    html += `<div class="head" style="grid-area: ${snakeLength[i][1]} / ${snakeLength[i][0]}"></div>`;

    if (
      i !== 0 &&
      snakeLength[0][1] === snakeLength[i][1] &&
      snakeLength[0][0] === snakeLength[i][0]
    ) {
      gameOver = true;
    }
  }

  board.innerHTML = html;
};

updateFood();
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keyup", changeDirection);
