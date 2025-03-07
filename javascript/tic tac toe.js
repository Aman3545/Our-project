/*DOM Element Selection*/
document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll(".square");
  const resetButton = document.getElementById("reset-button");
  const gameChoice = document.getElementById("game-choice");
  const gameBoard = document.getElementById("game-board");
  const gameStatus = document.getElementById("game-status");

  /*Game Variables*/
  let currentPlayer = "X";
  let gameActive = false;
  let isPlayerVsComputer = false;
  let gameState = ["", "", "", "", "", "", "", "", ""];

  /*Start Game Function*/
  const startGame = (isComputer) => {
    isPlayerVsComputer = isComputer;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameStatus.textContent = `${currentPlayer}'s turn`;
    gameBoard.style.display = "grid";
    squares.forEach((square, index) => {
      square.textContent = "";
      square.addEventListener("click", () => handleSquareClick(index), {
        once: true,
      });
    });
    gameChoice.style.display = "none";
    gameActive = true;
  };

  /* Handle Square Click*/
  const handleSquareClick = (index) => {
    if (gameState[index] === "" && gameActive) {
      gameState[index] = currentPlayer;
      squares[index].textContent = currentPlayer;
      if (checkWinner()) {
        gameStatus.textContent = `${currentPlayer} wins!`;
        gameActive = false;
      } else if (gameState.every((cell) => cell !== "")) {
        gameStatus.textContent = "It's a draw!";
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        gameStatus.textContent = `${currentPlayer}'s turn`;
        if (isPlayerVsComputer && currentPlayer === "O") {
          computerMove();
        }
      }
    }
  };

  /*  Check Winner*/
  const checkWinner = () => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Horizontal
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Vertical
      [0, 4, 8],
      [2, 4, 6], // Diagonal
    ];

    return winPatterns.some((pattern) => {
      const [a, b, c] = pattern;
      return (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      );
    });
  };

  /* Computer Move*/
  const computerMove = () => { //Show an arrow
    const emptySquares = gameState// find empty square 
      .map((value, index) => (value === "" ? index : -1))
      .filter((index) => index !== -1);

    const randomIndex =  //select an index from the list
      emptySquares[Math.floor(Math.random() * emptySquares.length)];
    gameState[randomIndex] = "O";//marks the  randomly selected square 
    squares[randomIndex].textContent = "O";// updates the visual representation 
    if (checkWinner()) {//calls checkwinner
      gameStatus.textContent = "Computer wins!";//to show the computer is win
      gameActive = false;//end the game 
    } else if (gameState.every((cell) => cell !== "")) {//show there are no empty square left
      gameStatus.textContent = "It's a draw!";//show no one has won
      gameActive = false;// end the game there are no more possible move
    } else {
      currentPlayer = "X";// set the currentplayer to 
      gameStatus.textContent = `${currentPlayer}'s turn`;//update the game status message
    }
  };

  /* Reset Game*/
  resetButton.addEventListener("click", () => {
    gameBoard.style.display = "none";
    gameChoice.style.display = "flex";
    gameStatus.textContent = "";
    gameActive = false;
  });

  /*Game Mode Selection*/
  document
    .getElementById("player-vs-player")
    .addEventListener("click", () => startGame(false));
  document
    .getElementById("player-vs-computer")
    .addEventListener("click", () => startGame(true));
});
