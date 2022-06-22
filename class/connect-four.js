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

    // Create commands for left/right movement and help
    Screen.addCommand('h', 'show commands', Screen.printCommands);
    Screen.addCommand('left', 'move left', this.cursor.left);
    Screen.addCommand('right', 'move right', this.cursor.right);
    // Create a command to place a move
    Screen.addCommand('return', 'make move', this.makeMove);

    this.cursor.setBackgroundColor();

    Screen.render();
  }

  // Check for wins after each move
  makeMove = () => {
    let player = this.playerTurn;

    // Check if the cursor is on blank space
    if (Screen.grid[this.cursor.row][this.cursor.col] === ' ') {
      // Place the player's symbol on the given column
      // Screen.setGrid(this.cursor.row, this.cursor.col, player);
      Screen.setGrid[this.cursor.row][this.cursor.col] = player;

      // Check for a win
      let winner = ConnectFour.checkWin(Screen.grid);
      if (winner !== false) {
        ConnectFour.endGame(winner);
      }

      // Switch players
      if (player === "X") {
        this.playerTurn = "O";
      } else {
        this.playerTurn = "X";
      }

    } else {
      Screen.setMessage(`Invalid move. Space already taken. \nPlayer ${this.playerTurn}, make your move.`);
    }

    Screen.render();
  }

  static checkWin(grid) {
    // Return false if the game has not ended
    let winner = false;

    let player = this.playerTurn;

    // Switch player
    if (player === "X") {
      this.playerTurn = "O";
    } else {
      this.playerTurn = "X";
    }

    // Return 'T' if the game is a tie
    const checkTie = () => {
      let blankSpaces = grid.flat().filter(space => space === " ").length;

      if (blankSpaces === 0 && winner === false) {
        winner = "T";
      }
    };

    // Check for wins
    // Return 'X' if player X wins (4 in a row)
    // Return 'O' if player O wins (4 in a row)

    const fourInARow = (player) => {
      // Horizontal
      for (let i = 0; i < grid[0].length - 3; i++) {
        for (let j = 0; j < grid.length; j++) {
          if (grid[j][i] === player && grid[j][i + 1] === player && grid[j][i + 2] === player && grid[j][i + 3] === player) {
            winner = player;
          }
        }
      }

      // Vertical
      for (let i = 0; i < grid.length - 3; i++) {
        for (let j = 0; j < grid[0].length; j++) {
          if (grid[i][j] === player && grid[i + 1][j] === player && grid[i + 2][j] === player && grid[i + 3][j] === player) {
            winner = player;
          }
        }
      }

      // Diagonal ascending
      for (let i = 3; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length - 3; j++) {
          if (grid[i][j] === player && grid[i - 1][j + 1] === player && grid[i - 2][j + 2] === player && grid[i - 3][j + 3] === player) {
            winner = player;
          }
        }
      }

      // Diagonal descending
      for (let i = 3; i < grid.length; i++) {
        for (let j = 3; j < grid[0].length; j++) {
          if (grid[i][j] === player && grid[i - 1][j - 1] === player && grid[i - 2][j - 2] === player && grid[i - 3][j - 3] === player) {
            winner = player;
          }
        }
      }
    }

    // Check for winner
    fourInARow(player);

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
