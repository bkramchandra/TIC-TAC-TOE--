// indow.addEventListener('DOMContentLoaded', () => {
//     const tiles=Array.from(document.querySelectorAll('.tile'));
//     const playerDisplay = document.querySelector(',display-player');
//     const resetbutton = document.querySelector('.#reset');
//     const announcer = document.querySelector('.display');

//     let board = ['', '', '', '', '', '', '', '', ''];
//     let currentplayer = 'X';
//     let isgameactive = true;

//     const playerX_won = 'player_won';
//     const playerO_won = 'player_won';
//     const tie = 'TIE';

//     const winningcondition = [
//         [0, 1, 2],
//         [3, 4, 5],
//         [6, 7, 8],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [2, 4, 6]
//     ];

//     function handleresultvalidation() {
//         let roundwon = false;
//         for(let i = 0; i <= 7; i++) {
//             const wincondition = winningcondition[i];
//             const a = board[wincondition[0]];
//             const b = board[wincondition[1]];
//             const c = board[wincondition[2]];
//             if (a === '' || b ==='' || c === '') {
//                 continue;
//             }
//             if (a === b &&b === c) {
//                 roundwon = true;
//                 break;
//             }
//         }
//         if(roundwon) {
//             announce(currentplayer === 'x' ? player_won : playerO_won);
//             isgameActive = false;
//             return;
//         }
//         if (!board.include(''))
//             announce(TIE);
//     }
//     const announce = (type) => {
//         switch(type) {
//             announcer.innerHTML = 'player <span class="playerO">O</span> won';
//             break;
//         case playerX_won:
//             announcer.innerHTML = 'player <span class="playerX">X</span> won';
//             break;
//             case TIE:

//             announcer.innerText = 'TIE';
//         }
//     };
//     const isValidAction = (tile) => {
//         if(tile.innerText === 'X' || tile.innerText ==='O'){
//             return false;
//         }
//         return true;
//     };
//     const updateBoard = (index) =>{
//         board[index] = currentplayer;
//     }


// })
const tiles = document.querySelectorAll(".tile");
const display = document.querySelector(".display");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function updateDisplay() {
    display.innerHTML =
        `Player <span class="display-player player${currentPlayer}">${currentPlayer}</span>'s turn`;
}

function checkWin() {
    for (let condition of winConditions) {
        const [a, b, c] = condition;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            gameActive = false;
            display.innerHTML =
                `Player <span class="display-player player${currentPlayer}">${currentPlayer}</span> wins!`;
            return;
        }
    }

    if (!board.includes("")) {
        gameActive = false;
        display.textContent = "It's a draw!";
    }
}

function handleTileClick(index) {
    if (!gameActive || board[index] !== "") return;

    board[index] = currentPlayer;
    tiles[index].textContent = currentPlayer;
    tiles[index].classList.add(`player${currentPlayer}`);

    checkWin();

    if (gameActive) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateDisplay();
    }
}

tiles.forEach((tile, index) => {
    tile.addEventListener("click", () => handleTileClick(index));
});

resetButton.addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";

    tiles.forEach(tile => {
        tile.textContent = "";
        tile.classList.remove("playerX", "playerO");
    });

    updateDisplay();
});

updateDisplay();
