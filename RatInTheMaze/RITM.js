let maze = [];
let isEditing = false;
let startTimer = 0;
let ratSpeed = 200;
let ratImage = document.createElement('img');
let wheatImage = document.createElement('img');
var ratBoardRowSize, ratBoardColSize;
ratImage.src = "./RatInTheMaze/rat.png";
ratImage.style.width = "80%";
ratImage.style.height = "80%";
wheatImage.src = "./RatInTheMaze/wheat.png";
wheatImage.style.width = "80%";
wheatImage.style.height = "80%";

function createMazeUI() {
    ratBoardRowSize = document.querySelector('.rowCountRat').value;
    ratBoardColSize = document.querySelector('.colCountRat').value;
    for (let i = 0; i < ratBoardRowSize; i++) {
        let tableRow = document.createElement('tr');
        tableRow.id = "rowR" + i;
        let mazeRow = [];
        for (let j = 0; j < ratBoardColSize; j++) {
            let tableCol = document.createElement('td');
            tableCol.id = "colR" + i + "" + j;
            tableRow.append(tableCol);
            if ((i + j) % 2) {
                tableCol.style.background = "lightgrey";
            } else {
                tableCol.style.background = "white";
            }
            mazeRow.push(1);
        }
        maze.push(mazeRow);
        document.querySelector(".ratBoard").append(tableRow);
    }
}

document.querySelector('.ratBoardCreater').addEventListener('click', () => {
    createMazeUI();
    document.querySelector('.editModeStatusRat').style.display = "block";
    document.querySelector('.editRatBoard').style.display = "block";
    document.querySelector('.runRat').style.display = "block";
    document.querySelector('#colR' + 0 + 0).append(ratImage);
    document.querySelector('#colR' + 0 + 0).style.background = "green";
    document.querySelector('#colR' + String(ratBoardRowSize-1) + String(ratBoardColSize-1)).style.background = "green";
    console.log(document.querySelector('#colR' + String(ratBoardRowSize-1) + String(ratBoardColSize-1)));
    document.querySelector('#colR' + String(ratBoardRowSize-1) + String(ratBoardColSize-1)).append(wheatImage);
})

function editBoardFunction() {
    isEditing = !isEditing;
    document.querySelector(".editModeStatusRat").textContent = isEditing ? "Edit Mode" : "No Edit";

    let rowCountRat = document.querySelector('.rowCountRat').value;
    let colCountRat = document.querySelector('.colCountRat').value;
    for (let i = 0; i < rowCountRat; i++) {
        for (let j = 0; j < colCountRat; j++) {
            document.getElementById("colR" + i + "" + j).addEventListener('click', function () {
                if (isEditing) {
                    this.style.background = this.style.background === "black" ? ((i + j) % 2 ? "lightgrey" : "white") : "black";
                    maze[i][j] = maze[i][j] ? 0 : 1;
                }
            })
        }
    }
}


document.querySelector('.editRatBoard').addEventListener('click', editBoardFunction);




















function isSafeR(maze, x, y) {
    return (x >= 0 && x < ratBoardRowSize && y >= 0
        && y < ratBoardColSize && maze[x][y] == 1);
}

function solveMaze(maze) {
    let sol = new Array(ratBoardRowSize);
    for (let i = 0; i < ratBoardRowSize; i++) {
        sol[i] = new Array(ratBoardRowSize);
        for (let j = 0; j < ratBoardColSize; j++) {
            sol[i][j] = 0;
        }
    }

    if (solveMazeUtil(maze, 0, 0, sol) == false) {
        // document.write("Solution doesn't exist");
        return false;
    }

    return true;
}
function solveMazeUtil(maze, x, y, sol) {
    console.log(x, y);
    if (x == ratBoardRowSize - 1 && y == ratBoardColSize - 1
        && maze[x][y] == 1) {
        startTimer += ratSpeed;
        setTimeout(() => {
            document.querySelector('#colR' + x + y).style.background = "green";
            document.querySelector('#colR' + x + y).innerHTML = '';
            document.querySelector('#colR' + x + y).append(ratImage);
        }, startTimer);
        sol[x][y] = 1;
        startTimer += ratSpeed;
        return true;
    }
    if (isSafeR(maze, x, y) == true) {
        if (sol[x][y] == 1)
            return false;

        startTimer += ratSpeed;
        setTimeout(() => {
            if(!(x === 0 && y === 0))
                document.querySelector('#colR' + x + y).style.background = "lightgreen";
            document.querySelector('#colR' + x + y).append(ratImage);
        }, startTimer);

        sol[x][y] = 1;

        if (solveMazeUtil(maze, x + 1, y, sol))
            return true;

        if (solveMazeUtil(maze, x, y + 1, sol))
            return true;

        if (solveMazeUtil(maze, x - 1, y, sol))
            return true;

        if (solveMazeUtil(maze, x, y - 1, sol))
            return true;

        startTimer += ratSpeed;
        setTimeout(() => {
            document.querySelector('#colR' + x + y).style.background = 'red';
            setTimeout(() => {
                document.querySelector('#colR' + x + y).style.background = ((x + y) % 2) ? "lightgrey" : "white";
            }, 10);
        }, startTimer);
        sol[x][y] = 0;
        return false;
    }

    return false;
}

document.querySelector('.runRat').addEventListener('click', () => {
    ratBoardRowSize = maze.length;
    ratBoardColSize = maze[0].length;
    solveMaze(maze);
})