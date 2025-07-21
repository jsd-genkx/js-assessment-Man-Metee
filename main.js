"use strict";                                      // Enable strict mode for safer JavaScript
import promptSync from "prompt-sync";              // Import synchronous prompt library
import clear from "clear-screen";                  // Import console clear function

const prompt = promptSync({ sigint: true });       // Initialize prompt()

// ─── Game symbols ────────────────────────────────────────────────────────────────
const hat = "^",                                   // Hat symbol (goal)
      hole = "O",                                  // Hole symbol (lose)
      fieldCharacter = "░",                        // Empty field tile
      pathCharacter = "*";                         // Player’s path symbol

// ─── Field class ──────────────────────────────────────────────────────────────────
class Field {
  constructor(field = [[]]) {
    this.field = field;                            // 2D array storing the map
    this.positionRow = 0;                          // Player’s current row
    this.positionCol = 0;                          // Player’s current column
    this.gameOver = false;                         // Flag to control game loop
    this.lastWarningDirection = null;              // Track last warned OOB direction
    this.field[0][0] = pathCharacter;              // Mark starting position
  }

  print() {
    clear();                                       // Clear console for fresh draw
    // Draw each row, colorizing current position and hat
    for (let r = 0; r < this.field.length; r++) {
      let line = "";
      for (let c = 0; c < this.field[r].length; c++) {
        const cell = this.field[r][c];
        if (r === this.positionRow && c === this.positionCol) {
          // Highlight current '*' in bold red
          line += `\x1b[1;31m${cell}\x1b[0m`;
        } else if (cell === hat) {
          // Highlight hat '^' in bold green
          line += `\x1b[1;32m${cell}\x1b[0m`;
        } else {
          line += cell;                            // Other cells unchanged
        }
      }
      console.log(line);                           // Print the row
    }
  }

  askQuestion() {
    const input = prompt("Which way? (W/A/S/D): ") // Prompt for direction
      .trim()
      .toUpperCase();

    switch (input) {
      case "W": this.moveUp();    break;          // Move up
      case "S": this.moveDown();  break;          // Move down
      case "A": this.moveLeft();  break;          // Move left
      case "D": this.moveRight(); break;          // Move right
      default:
        console.log("\x1b[1;31m⚠️ Invalid input. Please use W, A, S, or D keys only.\x1b[0m"); //Invalid key
        prompt("Press Enter to continue...");     // Pause so user can read
    }
  }

  // ── Movement methods (per rubric) ─────────────────────────────────────────────
  moveUp()    { this.move(-1,  0, "up"); }
  moveDown()  { this.move( 1,  0, "down"); }
  moveLeft()  { this.move( 0, -1, "left"); }
  moveRight() { this.move( 0,  1, "right"); }

  move(rowOffset, colOffset, dirName) {
    const newRow = this.positionRow + rowOffset;   // Calculate new row
    const newCol = this.positionCol + colOffset;   // Calculate new col

    // Out‑of‑bounds check
    if (this.isOutOfBounds(newRow, newCol)) {
      if (dirName === this.lastWarningDirection) {
        console.log("\x1b[1;31mYou went out of bounds! Game Over.\x1b[0m"); // Game Over on second warning
        this.gameOver = true;
      } else {
        console.log(`\x1b[1;31m⚠️ If you go ${dirName} again it will be out of bounds. Please try a different direction.\x1b[0m`); // Red warning for repeat out-of-bounds move

        prompt("Press Enter to continue...");       // Pause
        this.lastWarningDirection = dirName;       // Record warned direction
      }
      return;                                      // Skip rest
    }

    const nextTile = this.field[newRow][newCol];    // Inspect next tile

    // Hole check
    if (nextTile === hole) {
      console.log("\x1b[1;31mYou fell into a hole! Game Over.\x1b[0m");      // Lose on hole
      this.gameOver = true;
      return;
    }

    // Hat check
    if (nextTile === hat) {
      console.log("\x1b[1;32mCongratulations, you found your hat! 🎉\x1b[0m"); // Win on hat
      this.gameOver = true;
      return;
    }

    // Valid move: update position and mark path
    this.positionRow = newRow;
    this.positionCol = newCol;
    this.field[newRow][newCol] = pathCharacter;
    this.lastWarningDirection = null;                // Reset warning tracker
  }

  isOutOfBounds(row, col) {
    // Return true if coordinates are outside map boundaries
    return row < 0 ||
           col < 0 ||
           row >= this.field.length ||
           col >= this.field[0].length;
  }

  static generateField(height, width, holePercentage) {
    // Create 2D array with random holes vs. empty ground
    const field = Array.from({ length: height }, () =>
      Array.from({ length: width }, () =>
        Math.random() < holePercentage ? hole : fieldCharacter
      )
    );
    field[0][0] = pathCharacter;                    // Mark starting point

    // Randomly place hat (not at start)
    let hatRow, hatCol;
    do {
      hatRow = Math.floor(Math.random() * height);
      hatCol = Math.floor(Math.random() * width);
    } while (hatRow === 0 && hatCol === 0);
    field[hatRow][hatCol] = hat;                    // Place hat

    return field;
  }
}

// ─── Main game loop ────────────────────────────────────────────────────────────
function playGame() {
  const myField = new Field(Field.generateField(10, 10, 0.2)); // Generate field
  while (!myField.gameOver) {
    myField.print();                               // Display field
    myField.askQuestion();                         // Handle input
  }

  console.log("\nGame Over. Thanks for playing!"); // End message

  // Replay prompt with colored Y/N options
  const again = prompt(`Play again? (\x1b[1;32mY\x1b[0m/\x1b[1;31mN\x1b[0m): `)
    .trim()
    .toUpperCase();

  if (again === "Y") playGame();                     // Restart on Y
  else { console.log("Goodbye!"); process.exit(); } // Exit on N
}

// ─── Welcome screen ────────────────────────────────────────────────────────────
clear();                                           // Clear console
console.log(`
🎩 Welcome to 'Find Your Hat' Game!
Your goal: Find the ^ (hat) without falling into O (holes) or going out of bounds.
You are marked as '*', and you start at the top-left corner.

Controls:
\x1b[1;31m
  W = Move Up ⬆️

  S = Move Down ⬇️

  A = Move Left ⬅️

  D = Move Right ➡️\x1b[0m

Good luck!

Press Enter to start...
`);
prompt("");                                        // Wait for Enter
playGame();                                        // Start the game
