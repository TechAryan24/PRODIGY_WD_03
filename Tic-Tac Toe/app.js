let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let scoreX = 0;
let scoreO = 0;

// the different Winning Patterns
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
];

// initialize the socore of x or o to incremented by 1 when one of them wins 

function updateScores() {
    document.getElementById('scoreX').innerText = `Player X : ${scoreX}`;
    document.getElementById('scoreO').innerText = `Player O : ${scoreO}`;
}

// Resets the Game
const resetGame = () => {
    turnO = true;
    enabledBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "";
        box.style.textDecoration = "";
    }
}

// Indicating who wins the game
const showWinner = (winner, winningPattern) => {
    if (winner) {
        msg.innerText = `Congratulations! Winner is ${winner}`;
        highlightWinningPattern(winningPattern);
    } else {
        msg.innerText = "Oh! It's a Draw.";
    }
    msgContainer.classList.remove("hide");
    disabledBoxes();
    if (winner === "O") {
        scoreO++;
    } else if (winner === "X") {
        scoreX++;
    }
    updateScores();
}

// winning pattern is shown
const highlightWinningPattern = (pattern) => {
    for (let index of pattern) {
        boxes[index].style.backgroundColor = "yellow"; 
    }
}

// Analyzes the winner of the game
const checkWinner = () => {
    let isDraw = true;
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val == pos2Val && pos2Val == pos3Val) {
                showWinner(pos1Val, pattern);
                return;
            }
        }

        if (pos1Val === "" || pos2Val === "" || pos3Val === "") {
            isDraw = false;
        }
    }

    if (isDraw) {
        showWinner(null, []);
    }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

updateScores();
