const gameboard = (function () {
    const gameArray = [];
    gameArray.length = 10;
    gameArray.fill('');

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
            return true;
        } else {
            return false;
        }
    }
    return {gameArray, completedGame};
})();

gameboard.gameArray[0] = 'x';
gameboard.gameArray[1] = '0';
gameboard.gameArray[2] = 'x';

const displayController = (function () {
    const tilesGrid = document.createElement("div");
    document.body.appendChild(tilesGrid);  

    const updateDisplay = () => {
        tilesGrid.innerHTML = "";
        gameboard.gameArray.forEach((value) => {
            const tile = document.createElement("div");
            const tileContent = document.createTextNode(value);
            tile.appendChild(tileContent);
            tilesGrid.appendChild(tile);
        })
    }
    return {updateDisplay};
})();