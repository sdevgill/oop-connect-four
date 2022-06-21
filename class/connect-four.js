const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ']]

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('t', 'test command (remove)', ConnectFour.testCommand);

    this.cursor.setBackgroundColor();
    Screen.render();
  }

  static checkWin(grid) {
    // Return false if the game has not ended
    let winner = false;

    // Array to store winning combinations
    let winningCombos = [];

    // Return 'X' if player X wins (4 in a row)
    // Return 'O' if player O wins (4 in a row)

    const checkPlayerWin = (arr) => {
      if (arr.includes('X') && arr.includes('X') && arr.includes('X') && arr.includes('X')) {
        winner = 'X';
      } else if (arr.includes('O') && arr.includes('O') && arr.includes('O') && arr.includes('O')) {
        winner = 'O';
      }
    };

    // const checkPlayerWin = (arr) => {
    //   if (arr.includes(['X', 'X', 'X', 'X'])) {
    //     winner = 'X';
    //   } else if (arr.includes(['O', 'O', 'O', 'O'])) {
    //     winner = 'O';
    //   }
    // };

    // Return 'T' if the game is a tie
    const checkTie = () => {
      let blankSpaces = winningCombos.flat().filter(space => space === " ").length;

      if (blankSpaces === 0 && winner === false) {
        winner = "T";
      }
    };

    // // Check for horizontal wins
    grid.forEach(row => winningCombos.push(row));

    // Check for vertical wins
    for (let i = 0; i < grid[0].length; i++) {
      let col = [];
      grid.forEach(row => col.push(row[i]));
      winningCombos.push(col);
    }

    // Check for diagonal wins
    let leftToRight = [];
    let rightToLeft = [];

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid.length; col++) {

        if (row === col) {
          leftToRight.push(grid[row][col]);
        }

        if (row + col === grid.length - 1) {
          rightToLeft.push(grid[row][col]);
        }
      }
    }

    winningCombos.push(leftToRight);
    winningCombos.push(rightToLeft);

    // Check for winner
    winningCombos.forEach(checkPlayerWin);

    checkTie();

    return winner;
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = ConnectFour;
