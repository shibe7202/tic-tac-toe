const gameboard = (function () {
    let gameArray = [];
    gameArray.length = 9;
    gameArray.fill('');
    let playerTurn = 'X';
    let tiedGame = false;
    let player1 = "Player 1";
    let player2 = "Player 2";

    function newGame () {
        resetArray();  
        playerTurn = 'X'; 
        tiedGame = false;   
        player1 = document.getElementById("player-1").value;
        player2 = document.getElementById("player-2").value;
        resultDisplay.innerHTML = "";
        displayController.updateDisplay();
    }

    function resetArray () {
        gameArray.length = 0;
        gameArray.length = 9;
        gameArray.fill('');   
    }

    const completedGame = () => {
        const scanLine = (i, j, k) => {
            if (!gameArray[i] || !gameArray[j] || !gameArray[k]) {
                return false;
            } else {
            return gameArray[i] === gameArray[j] && gameArray[j] === gameArray[k];
            }
        }
        const scanEveryRow = () => {    
            return scanLine(0, 1, 2) || scanLine(3, 4, 5) || scanLine(6, 7, 8);
        }
        const scanEveryCol = () => {
            return scanLine(0, 3, 6) || scanLine(1, 4, 7) || scanLine(2, 5, 8);
        }
        const scanDiagonals = () => {
            return scanLine(0, 4, 8) || scanLine(2 , 4 , 6);
        }

        let winnerFound = scanEveryRow() || scanEveryCol() || scanDiagonals();
        if (winnerFound) {
            return true;
        } else if (!winnerFound && !gameArray.includes('')) {
            tiedGame = true;
            return true;
        } else {
            return false;
        }
    }

    function markTile (event) {
        if (completedGame()) {
            return;
        }
        let index = +event.currentTarget.className.split(' ')[0];
        if (gameArray[index] === '') {
            gameArray[index] = playerTurn;
            if (completedGame()) {
                const displayMessage = document.createTextNode(findWinner());
                resultDisplay.appendChild(displayMessage);
            }
            playerTurn = playerTurn === 'X' ? 'O' : 'X';
            displayController.updateDisplay();
        }
    }

    function findWinner() {
        if (tiedGame) {
            return "Tie";
        } else if (playerTurn === 'X') {
            return `${player1} wins.`;
        } else {
            return `${player2} wins.`;
        }
    }

    return {gameArray, completedGame, markTile, newGame};
})();

const displayController = (function () {
    const tilesGrid = document.createElement("div");
    tilesGrid.classList.add("tiles-grid")
    document.body.appendChild(tilesGrid);  

    const updateDisplay = () => {
        tilesGrid.innerHTML = "";
        gameboard.gameArray.forEach((value, index) => {
            const tile = document.createElement("div");
            tile.classList.add(`${index}`, "tile");
            tile.addEventListener("click", gameboard.markTile);
            const tileContent = document.createTextNode(value);
            tile.appendChild(tileContent);
            tilesGrid.appendChild(tile);
        })
    }
    return {updateDisplay};
})();


const start = document.getElementById("start");
start.addEventListener("click", gameboard.newGame);

const resultDisplay = document.createElement("p");
document.body.appendChild(resultDisplay);  

displayController.updateDisplay();