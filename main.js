"use strict";
import promptSync from "prompt-sync";
import clear from "clear-screen";

const prompt = promptSync({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field = [[]]) {
    this.field = field;
    this.positionRow = 0;
    this.positionCol = 0;
    this.gameOver = false;
    this.field[this.positionRow][this.positionCol] = pathCharacter;
  }

  print() {
    clear();
    this.field.forEach((row) => console.log(row.join("")));
  }

  askQuestion() {
    const input = prompt("Which way? (U = up, D = down, L = left, R = right): ").toUpperCase();
    switch (input) {
      case "U":
        this.move(-1, 0);
        break;
      case "D":
        this.move(1, 0);
        break;
      case "L":
        this.move(0, -1);
        break;
      case "R":
        this.move(0, 1);
        break;
      default:
        console.log("Invalid input. Use U, D, L or R.");
    }
  }

  move(rowOffset, colOffset) {
    const newRow = this.positionRow + rowOffset;
    const newCol = this.positionCol + colOffset;

    if (this.isOutOfBounds(newRow, newCol)) {
      console.log("You went out of bounds! Game Over.");
      this.gameOver = true;
      return;
    }

    const nextTile = this.field[newRow][newCol];

    if (nextTile === hole) {
      console.log("You fell into a hole! Game Over.");
      this.gameOver = true;
      return;
    } else if (nextTile === hat) {
      console.log("Congratulations, you found your hat! 🎉");
      this.gameOver = true;
      return;
    }

    this.positionRow = newRow;
    this.positionCol = newCol;
    this.field[newRow][newCol] = pathCharacter;
  }

  isOutOfBounds(row, col) {
    return row < 0 || col < 0 || row >= this.field.length || col >= this.field[0].length;
  }

  static generateField(height, width, holePercentage) {
    const field = [];
    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        const randomNum = Math.random();
        row.push(randomNum < holePercentage ? hole : fieldCharacter);
      }
      field.push(row);
    }

    // Set player's start position
    field[0][0] = pathCharacter;

    // Place the hat at a random position (not [0][0])
    let hatRow, hatCol;
    do {
      hatRow = Math.floor(Math.random() * height);
      hatCol = Math.floor(Math.random() * width);
    } while (hatRow === 0 && hatCol === 0);

    field[hatRow][hatCol] = hat;

    return field;
  }
}

function playGame() {
  const myField = new Field(Field.generateField(10, 10, 0.2));

  while (!myField.gameOver) {
    myField.print();
    myField.askQuestion();
  }

  console.log("\nGame Over. Thanks for playing!");
  const again = prompt("Play again? (Y/N): ").toUpperCase();
  if (again === "Y") {
    playGame();
  } else {
    console.log("Goodbye!");
    process.exit();
  }
}

playGame();

