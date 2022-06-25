

const gameBoard = (() => {
    let gameBoard
    // () => gameBoard
    // retrieves gameboard or creates it if undefined
    const getGameBoard = () => {
        if(gameBoard === undefined) {
            gameBoard = createGameBoard([[],[],[]])
            return gameBoard
        }
        return gameBoard
    }

    let createGameBoard = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length; j++) {
                arr[i][j] = Spot(j, i, "")                
            }
        }
        return arr
    }

    // gameBoard Spot => gameBoard
    // sets a spot in the gameBoard

    const setGameBoard = (spot) => {
        gameBoard[spot.getJ()][spot.getI()] = spot
        return gameBoard
    }

    // Symbol Symbol -> Symbol
    // decides turn
    const turn = (sym1, sym2) => {
        if (search(sym1) === search(sym2)) {
            return sym1
        }
        return sym2
    }

    // Symbol => Number
    // how many times a symbol appears in the grid
    const search = sym => {
        times = 0
        for (let i = 0; i < gameBoard.length; i++) {
            for (let j = 0; j < gameBoard.length; j++) {
                if (gameBoard[i][j].getSym() === sym) {
                    times++
                }   
            }
        }
        return times
    }

    // Spot -> Boolean
    // produces true if spot is valid
    const isValid = spot => {
        return gameBoard[spot.getJ()][spot.getI()].getSym() === ""
    }

    // Symbol Symbol -> String
    // declares winnner if any, D if no winner
    const isWinner = (sym1 , sym2) => {
        if ((search(sym1) <= 2) && (search(sym2) <= 2)) {
            return "D"
        }
        if (winRows(sym1, sym2) !== "D") {
            return winRows(sym1,sym2)
        }
        if (winCols(sym1, sym2) !== "D") {
            return winCols(sym1, sym2)
        }
        if (winDiagonals(sym1, sym2) !== "D") {
            return winDiagonals(sym1, sym2)
        }

        return "D"
    }
    // Symbol Symbol -> String
    // checks row condition for winning
    const winRows = (sym1, sym2) => {
        if (gameBoard.some(row => row.every(spot => spot.getSym() === sym1))) {
            return sym1
        }
        if (gameBoard.some(row => row.every(spot => spot.getSym() === sym2))) {
            return sym2
        }
        return "D"
    }

    // Symbol Symbol -> String
    // checks column condition for winning
    const winCols = (sym1, sym2) => {
        for (let i = 0; i < 3; i++) {
            if (arrayColumn(gameBoard, i).every(spot => spot.getSym() === sym1)) {
                return sym1
            }
            if (arrayColumn(gameBoard, i).every(spot => spot.getSym() === sym2)) {
                return sym2
            }
        }
        return "D"
    }

    // Symbol Symbol -> String
    // checks diagonals condition for winning 
    const winDiagonals = (sym1, sym2) => {
        if([[gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]],
            [gameBoard[0][2], gameBoard[1][1], gameBoard[2][0]]].some(row => row.every(spot => spot.getSym() === sym1))) {
                return sym1
        }
        if([[gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]],
            [gameBoard[0][2], gameBoard[1][1], gameBoard[2][0]]].some(row => row.every(spot => spot.getSym() === sym2))) {
                return sym2
        }
        return "D"
    }

    const arrayColumn = (arr, n) => arr.map(x => x[n]);

    return {getGameBoard, setGameBoard, turn, isValid, isWinner}
})()


const Spot = (i ,j, sym) => {
    const getI = () => i
    const getJ = () => j
    const getSym = () => sym
    const setSym = (newSym) => {
        sym = newSym
    }
    return {getI, getJ, getSym, setSym}
}

const Player = (sym) => {
    const getSym = () => sym
    const setSym = (newSym) => {
        sym = newSym
        return sym
    }
    //  gameBoard number number => gameboard
    //  places symbol on board at spot at gameboard[j][i]
    const pick = (gameBoard, i, j) => {
        if (gameBoard.isValid(Spot(i,j,""))) {
            return gameBoard.setGameBoard(Spot(i,j, getSym()))
        }
        alert("not valid move")
        return
    }

    return {pick, getSym, setSym}
}