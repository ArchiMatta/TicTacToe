let boxes= document.querySelectorAll(".box");
let resetBtn= document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let resetscorebtn = document.querySelector("#reset-score-btn");
let scoreO = document.querySelector("#score-o");
let scoreX = document.querySelector("#score-x");

let turno=true;
let count=0; //To Track Draw
let scoreOcount =0;
let scoreXcount =0;

const winpatterns=  [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

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
boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (turno) {
        //playerO
        box.innerText = "O";
        turno = false;
      } else {
        //playerX
        box.innerText = "X";
        turno = true;
      }
      box.disabled = true;
      count++;
  
      let isWinner = checkWinner();

  
      if (count === 9 && !isWinner) {
        gameDraw();
      }
    });
  });
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
    for(let pattern of winpatterns){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val === pos2val && pos2val === pos3val){
                showWinner(pos1val);
                return true;
            }
        }
    }
   };

   newGameBtn.addEventListener("click", resetGame);
   resetBtn.addEventListener("click", resetGame);
   resetscorebtn.addEventListener("click", resetScores);
  



