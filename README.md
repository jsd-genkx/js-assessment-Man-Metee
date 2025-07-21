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

Step 1: ทำความเข้าใจเกมและวางเงื่อนไขหลัก
• ผู้เล่นต้องเดินในแผนที่ 2 มิติเพื่อหา "หมวก" (^) ที่ซ่อนอยู่
• หลีกเลี่ยงการตก "หลุม" (O) หรือเดินออกนอกขอบสนาม
• ผู้เล่นเริ่มต้นที่ตำแหน่ง [0][0] โดยทิ้งรอยไว้เป็น \*

Step 2: ออกแบบโครงสร้างโปรแกรม
• สร้างคลาส Field เพื่อเป็นตัวแทนของสนามทั้งหมด
• กำหนดเมธอดหลัก เช่น print(), move(), askQuestion(), generateField()
• ใช้ prompt-sync และ clear-screen เพื่อโต้ตอบกับผู้เล่นผ่าน terminal

Step 3: สร้างกลไกควบคุมการเคลื่อนที่
• เขียนเมธอด askQuestion() เพื่อรับ input ทิศทางจากผู้เล่น (U/D/L/R)
• เขียนเมธอด move() เพื่อคำนวณตำแหน่งใหม่
• ตรวจสอบสถานะตำแหน่งใหม่ว่า:
  o ชนะ (เจอหมวก ^)
  o แพ้ (ตกหลุม O)
  o ออกจากสนาม -->

Step 4: เพิ่มระบบสุ่มสนามให้แตกต่างกันในแต่ละรอบ
• สร้างเมธอด static generateField(height, width, holePercentage)
• ใช้ Math.random() ในการสุ่มหลุม (O) และพื้นที่ปกติ (░)
• สุ่มตำแหน่งของหมวก ^ โดยหลีกเลี่ยง [0][0]
• วางตำแหน่งเริ่มต้นของผู้เล่นไว้ที่ [0][0]

Step 5: สร้างโครงสร้างเกมหลักและลูปการเล่น
• สร้างฟังก์ชัน playGame() เพื่อควบคุมลูปเกม
• ใช้ลูป while (!gameOver) เพื่อวนการเล่น
• ในแต่ละรอบแสดงแผนที่ใหม่ (print()) และรับ input (askQuestion())

Step 6: เพิ่มระบบถามเล่นซ้ำ (Play Again)
• เมื่อเกมจบ (แพ้หรือชนะ) ให้แสดงข้อความ "Game Over"
• ถามผู้เล่นว่าอยากเล่นใหม่ไหม (Y/N)
• ถ้าตอบ Y → เรียก playGame() อีกครั้งเพื่อเริ่มใหม่
• ถ้าตอบ N → แสดง "Goodbye!" และปิดโปรแกรม

Step 7: ทดสอบทุกกรณีเพื่อความถูกต้องและสมบูรณ์
• ทดสอบกรณี:
  o เดินตกหลุม
  o เดินออกขอบ
  o เดินถึงหมวก
  o การอัปเดตตำแหน่งบนแผนที่
  o การสุ่มแผนที่แต่ละรอบ
  o การวนเล่นใหม่

_Notes:_<br>
_- You can attach flowcharts, diagrams, and images as needed._<br>
_- The purpose of this section is not to explain your code but rather to convey your thoughts and ideas._

[🔝 Back to Table of Contents](#table-of-contents)
