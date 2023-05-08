// -------------------------- All the common variables ----------------------------------- //
let allTimeOuts = [];
let startingDelay = 0;
let slider = document.querySelector('.slider');
let sudokuSpeed = slider.value ? slider.value : 100;
let board = [
    [3, 0, 6, 5, 0, 8, 4, 0, 0],
    [5, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 7, 0, 0, 0, 0, 3, 1],
    [0, 0, 3, 0, 1, 0, 0, 8, 0],
    [9, 0, 0, 8, 6, 3, 0, 0, 5],
    [0, 5, 0, 0, 9, 0, 6, 0, 0],
    [1, 3, 0, 0, 0, 0, 2, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 7, 4],
    [0, 0, 5, 2, 0, 6, 3, 0, 0]
];
let oldBoard = board.map(i => i.slice());
let N = board.length;



// -------------------------- UI Manipulations Functions ----------------------------------- //
function createSudokuBoardUI() {
    let size = 9;
    for (let i = 0; i < size; i++) {
        let tableRow = document.createElement('tr');
        tableRow.id = "rowS" + i;
        for (let j = 0; j < size; j++) {
            let tableCol = document.createElement('td');
            tableCol.id = "colS" + i + "" + j;
            tableRow.append(tableCol);
            if ((i + j) % 2) {
                tableCol.style.background = "lightgrey";
            } else {
                tableCol.style.background = "white";
            }
        }
        document.querySelector(".sudokuBoard").append(tableRow);
    }
}

function makeBoard(i, j, val) {
    startingDelay += sudokuSpeed;
    let t = setTimeout(() => {
        if (val != 0) {
            document.querySelector("#colS" + i + j).style.background = "lightgreen";
            document.querySelector("#colS" + i + j).textContent = val;
        } else {
            document.querySelector("#colS" + i + j).style.background = "red";
            setTimeout(() => {
                document.querySelector("#colS" + i + j).style.background = (i + j) % 2 ? 'lightgrey' : 'white';
                document.querySelector("#colS" + i + j).textContent = '';
            }, 10);
        }
    }, startingDelay)
    allTimeOuts.push(t);
    board[i][j] = val;
}

function print(board) {
    let size = 9;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i][j]) {
                let selectedCell = document.querySelector("#colS" + i + j);
                selectedCell.textContent = board[i][j];
                selectedCell.style.background = "grey";
                selectedCell.style.color = "white";
            }
        }
    }
}

function clearAllTimeouts() {
    for (let i = 0; i < allTimeOuts.length; i++) {
        clearTimeout(allTimeOuts[i]);
    }
}



// -------------------------- Sudoku Logic Functions ----------------------------------- //
function isSafeS(board, row, col, num) {

    for (let d = 0; d < board.length; d++) {
        if (board[row][d] == num) {
            return false;
        }
    }

    for (let r = 0; r < board.length; r++) {
        if (board[r][col] == num) {
            return false;
        }
    }

    let sqrt = Math.floor(Math.sqrt(board.length));
    let boxRowStart = row - row % sqrt;
    let boxColStart = col - col % sqrt;

    for (let r = boxRowStart;
        r < boxRowStart + sqrt; r++) {
        for (let d = boxColStart;
            d < boxColStart + sqrt; d++) {
            if (board[r][d] == num) {
                return false;
            }
        }
    }

    return true;
}

function solveSudoku(board) {
    let row = -1;
    let col = -1;
    let isEmpty = true;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (board[i][j] == 0) {
                row = i;
                col = j;

                isEmpty = false;
                break;
            }
        }
        if (!isEmpty) {
            break;
        }
    }

    if (isEmpty) {
        return true;
    }

    for (let num = 1; num <= N; num++) {
        if (isSafeS(board, row, col, num)) {
            makeBoard(row, col, num);
            if (solveSudoku(board)) {

                return true;
            }
            else {

                makeBoard(row, col, 0);
            }
        }
    }
    return false;
}



// ----------------------------- Event Listeners -------------------------------------- //
document.querySelector('.killProgram').addEventListener('click', function() {
    this.disabled = true;
    document.querySelector('.sudokuRunner').disabled = false;
    clearAllTimeouts();
    startingDelay = 0;
    board = oldBoard.map(i => i.slice());
    document.querySelector('.sudokuBoard').innerHTML = '';
    createSudokuBoardUI();
    print(board);
})

slider.addEventListener('change', () => {
    sudokuSpeed = Number(slider.value);
})

document.querySelector('.sudokuRunner').addEventListener('click', function() {
    this.disabled = true;
    document.querySelector('.killProgram').disabled = false;
    solveSudoku(board);
    console.log(board);
})



// -------------------------- First time execution ----------------------------------- //
createSudokuBoardUI();
print(board);