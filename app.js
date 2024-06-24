let boxes= document.querySelectorAll(".box");
let resetBtn= document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let resetscorebtn = document.querySelector("#reset-score-btn");
let boardSizeInput = document.querySelector("#board-size");
let player1SymbolInput = document.querySelector("#player-1-symbol");
let player2SymbolInput = document.querySelector("#player-2-symbol");
let scoreO = document.querySelector("#score-o");
let scoreX = document.querySelector("#score-x");
let symbolO = document.querySelector("#symbol-o");
let symbolX = document.querySelector("#symbol-x");

let turno=true;
let count=0; //To Track Draw
let scoreOcount =0;
let scoreXcount =0;
let boardSize = 3;
let player1Symbol = "O";
let player2Symbol = "X";
let winpatterns = [];

// const winpatterns=  [
//     [0, 1, 2],
//     [0, 3, 6],
//     [0, 4, 8],
//     [1, 4, 7],
//     [2, 5, 8],
//     [2, 4, 6],
//     [3, 4, 5],
//     [6, 7, 8],
//   ];

  const createBoard = () => {
    const gameBoard = document.querySelector("#game-board");
    gameBoard.innerHTML = '';
    gameBoard.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
    gameBoard.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;
    for (let i = 0; i < boardSize * boardSize; i++) {
      const box = document.createElement("div");
      box.classList.add("box");
      box.setAttribute("id", `box${i}`);
      gameBoard.appendChild(box);
    }
    boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
      box.addEventListener("click", boxClickHandler);
    });
    generateWinPatterns();
  };

  const generateWinPatterns = () => {
    winpatterns = [];
    // Horizontal win patterns
    for (let i = 0; i < boardSize; i++) {
      const pattern = [];
      for (let j = 0; j < boardSize; j++) {
        pattern.push(i * boardSize + j);
      }
      winpatterns.push(pattern);
    }
    // Vertical win patterns
    for (let i = 0; i < boardSize; i++) {
      const pattern = [];
      for (let j = 0; j < boardSize; j++) {
        pattern.push(i + j * boardSize);
      }
      winpatterns.push(pattern);
    }
    // Diagonal win patterns
    const diag1 = [];
    const diag2 = [];
    for (let i = 0; i < boardSize; i++) {
      diag1.push(i * (boardSize + 1));
      diag2.push((i + 1) * (boardSize - 1));
    }
    winpatterns.push(diag1, diag2);
  };
  const resetGame = () => {
    turno = true;
    count = 0;
    enableboxes();
    
    msgContainer.classList.add("hide");
  };

  const updateScores = () => {
    scoreO.innerText = scoreOcount;
    scoreX.innerText = scoreXcount;
  }

  const resetScores = () => {
    scoreOcount = 0;
    scoreXcount = 0;
    updateScores();
  };
  const boxClickHandler = (event) => {
    const box = event.target;
      if (turno) {
        //playerO
        box.innerText = player1Symbol;
        turno = false;
      } else {
        //playerX
        box.innerText = player2Symbol;
        turno = true;
      }
      box.disabled = true;
      count++;
  
      let isWinner = checkWinner();

  
      if (count === (boardSize*boardSize) && !isWinner) {
        gameDraw();
      }
    };


  const gameDraw = () => {
    msg.innerText="Game was a draw";
    msgContainer.classList.remove("hide");
    disableboxes();
  };
  const disableboxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
  };

  const enableboxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText="";
    }
  };
   const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableboxes();
    if (winner === "O") {
        scoreOcount++;
      } else if (winner === "X") {
        scoreXcount++;
      }
      updateScores();
   };

   const checkWinner = () => {
    for (let pattern of winpatterns) {
      let pos1val = boxes[pattern[0]].innerText;
      let isWinningPattern = true;
  
      if (pos1val === "") continue;
  
      for (let i = 1; i < pattern.length; i++) {
        if (boxes[pattern[i]].innerText !== pos1val) {
          isWinningPattern = false;
          break;
        }
      }
  
      if (isWinningPattern) {
        showWinner(pos1val);
        return true;
      }
    }
    return false;
  };
   const startNewGame = () => {
    boardSize = parseInt(boardSizeInput.value);
    player1Symbol = player1SymbolInput.value || "O";
    player2Symbol = player2SymbolInput.value || "X";
    symbolO.innerText = player1Symbol;
    symbolX.innerText = player2Symbol;
    resetGame();
    createBoard();
  };

   newGameBtn.addEventListener("click", startNewGame);
   resetBtn.addEventListener("click", resetGame);
   resetscorebtn.addEventListener("click", resetScores);
   boardSizeInput.addEventListener("change", startNewGame);
   player1SymbolInput.addEventListener("input", startNewGame);
   player2SymbolInput.addEventListener("input", startNewGame);

   createBoard();
  



