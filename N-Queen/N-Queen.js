var queenBoardSize;
let currentTime = 1000;
var speed;
let queenImage = document.createElement('img');
let queenWrapper = document.createElement('div');
let queenBoard = [];
queenImage.src = "./N-Queen/queenImage.png";
queenImage.style.width = "50%";
queenImage.style.height = "50%";
queenImage.style.margin = "auto";
queenWrapper.innerHTML = queenImage;

let notPossible = (row, col) => {
    currentTime += speed;
    setTimeout(() => {
        document.querySelector('.status').innerHTML = `Checking Row ${row} and Column ${col}`;
        let queenImage = document.createElement('img');
        queenImage.src = "./N-Queen/queenImage.png";
        document.getElementById(`blockQ${row}${col}`).appendChild(queenImage);
    }, currentTime);
    currentTime += speed;
    setTimeout(() => {
        document.getElementById(`blockQ${row}${col}`).innerHTML = '';
    }, currentTime);
}

function isSafeQ(queenBoard, row, col) {
    notPossible(row, col);
    for (let i = 0; i < col; i++) {
        if (queenBoard[row][i] == 1) {
            console.log("H1");
            return false
        }
    }
    for (i = row, j = col; i >= 0 && j >= 0; i--, j--)
        if (queenBoard[i][j]) {
            console.log("H2");
            return false
        }
    for (i = row, j = col; j >= 0 && i < queenBoardSize; i++, j--)
        if (queenBoard[i][j]) {
            console.log("H3");
            return false
        }

    return true
}

function solveNQUtil(queenBoard, col) {
    console.log(col, queenBoardSize);
    if (col >= queenBoardSize)
        return true
    for (let i = 0; i < queenBoardSize; i++) {
        let safeStatus = isSafeQ(queenBoard, i, col)
        console.log(safeStatus);
        if (safeStatus == true) {
            setTimeout(() => {
                let queenImage = document.createElement('img');
                queenImage.src = "./N-Queen/queenImage.png";
                document.getElementById(`blockQ${i}${col}`).appendChild(queenImage);
            }, currentTime);
            currentTime += speed;
            queenBoard[i][col] = 1
            console.log(i, col);
            if (solveNQUtil(queenBoard, col + 1) == true) {
                return true
            }
            setTimeout(() => {
                document.getElementById(`blockQ${i}${col}`).innerHTML = '';
            }, currentTime);
            queenBoard[i][col] = 0
        } else {
            setTimeout(() => {
                document.querySelector('.status').innerHTML = `Not valid for Row ${i} and Column ${col}`;
            }, currentTime);
        }
    }
    return false
}
function solveNQ() {
    for (let i = 0; i < queenBoardSize; i++) {
        let row = document.createElement('tr');
        row.id = `rowQ${i}`;
        for (let j = 0; j < queenBoardSize; j++) {
            let block = document.createElement('td');
            block.id = `blockQ${i}${j}`
            if ((i + j) % 2) {
                block.style.background = "lightgrey";
            }
            row.appendChild(block);
        }
        document.getElementById('nQueenContainer').appendChild(row);
        // console.log(document.getElementById('nQueenContainer'), row);
    }

    for (let i = 0; i < queenBoardSize; i++) {
        tmp = [];
        for (let j = 0; j < queenBoardSize; j++) {
            tmp.push(0);
        }
        queenBoard.push(tmp);
    }

    if (solveNQUtil(queenBoard, 0) == false) {
        alert("Solution does not exist")
        document.querySelector('table').innerHTML = "";
        return false
    }
    return true
}

document.querySelector('.projectRunnerNQueen').addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        speed = Number(document.querySelector('.customSpeed').value) || 100;
        document.querySelector('.customSpeed').style.display = "none";
        queenBoardSize = document.querySelector('.projectRunnerNQueen').value;
        queenBoardSize = Number(queenBoardSize);
        currentTime = 1000;
        solveNQ();
    }
});