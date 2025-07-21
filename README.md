# JavaScript Assessment: Find Your Hat

[Codecademy](https://www.codecademy.com/projects/practice/find-your-hat)

## Table of Contents

- [JavaScript Assessment: Find Your Hat](#javascript-assessment-find-your-hat)
  - [Table of Contents](#table-of-contents)
  - [Repo Instructions](#repo-instructions)
  - [Project Goals](#project-goals)
  - [Project Requirements](#project-requirements)
    - [Game Rules:](#game-rules)
  - [JavaScript Assessment Rubric](#javascript-assessment-rubric)
    - [Thinking Process](#thinking-process)

---

## Repo Instructions

1. Clone the assessment repository, open it in your working directory, commit your progress accordingly, and push the repository to share it with the instructors.
2. Read the instructions in the `README.md` file.
3. Start the project:

   ```terminal
   npm install
   npm run dev
   ```

4. Edit `package.json` file by updating the `"author"` field with your Zoom name.
5. Edit **Thinking Process** section at the end of the `README.md` file. 👉 [Go to Thinking Process](#thinking-process)

[🔝 Back to Table of Contents](#table-of-contents)

---

## Project Goals

- In this project, you’ll be building an interactive terminal game.
- The scenario is that the player has lost their hat in a field full of holes, and they must navigate back to it without falling down one of the holes or stepping outside of the field.

[🔝 Back to Table of Contents](#table-of-contents)

## Project Requirements

- Your project is centered on a `Field` class.
- Give your `Field` class a `.print()` method that prints the current state of the field.

  > The Field constructor should take a two-dimensional array representing the “field” itself.
  >
  > A field consists of a grid containing “holes” (O) and one “hat” (^).
  >
  > We use a neutral background character (░) to indicate the rest of the field itself.
  >
  > The player will begin in the upper-left of the field, and the player’s path is represented by \*.

  ```js
  const myField = new Field([
  	["*", "░", "O"],
  	["░", "O", "░"],
  	["░", "^", "░"],
  ]);

  // Output:
  *░O
  ░O░
  ░^░

  ```

- Your game should be playable by users. In order to facilitate this, build out the following behavior:

  - When a user runs `main.js`, they should be prompted for input and be able to indicate which direction they’d like to `move`.
  - After entering an instruction, the user should see a printed result of their current field map with the tiles they have visited marked with the player's path. They should be prompted for their next move.

[🔝 Back to Table of Contents](#table-of-contents)

### Game Rules:

**1. Wins by finding their hat.**

**2. Loses by landing on (and falling in) a hole.**

**3. Loses by attempting to move “outside” the field.**

**When any of the above occur, let the user know and end the game.**

[🔝 Back to Table of Contents](#table-of-contents)

---

## JavaScript Assessment Rubric

1. Class Method ที่ควรมีครบ: (2 pts ครบถ้วน | 1 pts มีไม่ครบ | 0 pts ไม่มีเลย)

- constructor
- moveRight
- moveLeft
- moveUp
- moveDown

2. Print Map (2 pts ครบถ้วน | 1 pts มีไม่ครบ | 0 pts ไม่มีเลย)

3. เดินได้ถูกต้อง & Update Map ได้ถูกต้อง (2 pts ครบถ้วน | 1 pts มีไม่ครบ | 0 pts ไม่มีเลย)

- เลี้ยวซ้าย
- เลี้ยวขวา
- ขึ้น
- ลง

4. Game Logic: (2 pts ครบถ้วน | 1 pts มีไม่ครบ | 0 pts ไม่มีเลย)

- Wins by finding their hat
- Loses by landing on (and falling in) a hole.
- Attempts to move "outside" the field. (Warning message when actor attempts to move outside)

5. มี Random ตำแหน่ง: (2 pts ครบถ้วน | 1 pts มีไม่ครบ | 0 pts ไม่มีเลย)

- holes
- hat
- actor

6. Thinking process & Breakdown the steps of a thinking process (5 pts ครบถ้วน | 3 pts มีไม่ครบ | 0 pts ไม่มีเลย)

[🔝 Back to Table of Contents](#table-of-contents)

---

**Please Write Down Your Thinking Process Below:**

---

### Thinking Process

1. Understand the Game Requirements
   • Player starts at the top left corner (\*) of a 2D field.
   • Goal: find a hat (^).
   • Lose by stepping into a hole (O) or moving out of bounds.
   • Accept only W/A/S/D controls.
   • Show a welcome screen and replay option.
   • Add warnings before an out of bounds move and colorize key messages.

2. Set Up the CLI Environment
   • Use prompt sync for synchronous user input.
   • Use clear screen to redraw the field cleanly on each turn.

3. Define Game Symbols
   • hat = "^"
   • hole = "O"
   • fieldCharacter = "░" (empty tile)
   • pathCharacter = "\*" (player’s trail)

4. Design the Field Class
   • Constructor
   a. Accepts a 2D array (field).
   b. Initializes player position at [0,0], marks it with \*.
   c. Tracks gameOver state and last warning direction.

   • print() Method
   a. Clears the console and prints each row of the field.
   b. Renders the current \* in bold red
   c. Renders any ^ (hat) in bold green.

   • askQuestion() Method
   a. Prompts “Which way? (W/A/S/D):”
   b. Normalizes input, then calls one of four methods:moveUp(), moveDown(), moveLeft(), moveRight().
   c. Handles invalid keys by warning the user and pausing.
   Prompts “Which way? (W/A/S/D):”.

   • move() Method
   a. Calculates new position.
   b. Out of bounds logic: - On first attempt, warn “If you go <dir> again it will be out of bounds…” and pause. - If the same direction is chosen again, trigger game over with a red “You went out of bounds!” message.
   c. Hole check: if stepping on O, red “You fell into a hole! Game Over.”
   d. Hat check: if stepping on ^, green “Congratulations, you found your hat! 🎉”
   e. Otherwise, update position and mark the path.

   • isOutOfBounds() Helper
   a. Returns true if row/col is outside the field dimensions.
   • static generateField()
   a. Builds a random height×width field, placing holes according to holePercentage.
   b. Ensures the start is \* and places the hat at a random non start position.

5. Implement the Main Game Loop (playGame())
   • Welcome screen: clear console, display title, goal, then the controls block in bold red with arrow emojis (⬆️⬇️⬅️➡️), pause for Enter.
   • Generate a new random 10×10 field with 20% holes.
   • Loop: print field → ask question → repeat until gameOver.
   • After the loop, print “Game Over. Thanks for playing!” (no color).
   • Prompt “Play again? (Y/N):” with Y in green and N in red.
   • Restart on “Y”, exit on “N”.

6. Add a Welcome Screen
   • Clear the console.
   • Print game title, goal, controls, and “Press Enter to start…”
   • Wait for the user to press Enter before calling playGame().

7. Test All Scenarios
   • Valid W/A/S/D moves.
   • Invalid key presses (e.g. “X”).
   • First out of bounds warning and second move causing game over.
   • Stepping into a hole → Game Over.
   • Finding the hat → success.
   • Replay prompt correctly interprets Y/N with colored hints.

_Notes:_<br>
_- You can attach flowcharts, diagrams, and images as needed._<br>
_- The purpose of this section is not to explain your code but rather to convey your thoughts and ideas._

[🔝 Back to Table of Contents](#table-of-contents)
