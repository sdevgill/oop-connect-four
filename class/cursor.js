const Screen = require("./screen");

class Cursor {

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = 'black';
    this.cursorColor = 'blue';

  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }

  // Create method to reset the Screen after moving the cursor
  resetScreen = (r, c) => {
    this.resetBackgroundColor();
    this.row += r;
    this.col += c;
    this.setBackgroundColor();
    Screen.render();
  }

  left = () => {
    // Move cursor left
    if (this.col > 0 && this.col < this.numCols) {
      this.resetScreen(0, -1);
    }
  }

  right = () => {
    // Move cursor right
    if (this.col >= 0 && this.col < (this.numCols - 1)) {
      this.resetScreen(0, 1);
    }
  }

}


module.exports = Cursor;
