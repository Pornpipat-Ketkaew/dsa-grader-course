title: Coloring Book
title_th: Coloring Book (สมุดระบายสี)
stars: 1
tech: Counting connected components, Flood fill with an explicit stack, Walls stored as bit flags
tech_th: นับ connected component, Flood fill ด้วย stack, ขอบเก็บเป็นบิต
complexity: O(R·C) time and memory
key: Every region needs its own color, so the answer is the number of regions: connected components of the grid where two neighbouring cells are joined unless a wall separates them. Each wall is stored in only one of its two cells, so each direction reads its bit from the right cell.
key_th: แต่ละพื้นที่ต้องมีสีของตัวเอง คำตอบจึงเป็นจำนวนพื้นที่: connected component ของตารางที่ช่องข้างกันเชื่อมกัน ยกเว้นมีขอบกั้น ขอบแต่ละเส้นถูกเก็บไว้ในช่องเดียวจากสองช่อง แต่ละทิศจึงต้องอ่านบิตจากช่องที่ถูกต้อง
tests: all 3 PDF samples, a 1 × 1 grid, a 100 × 100 grid where every cell is walled off (10 000 colors), 300 random grids against a union-find brute force, and a random 100 × 100 grid in 0.006 s.
tests_th: ตัวอย่างทั้ง 3 ใน PDF ตาราง 1 × 1 ตาราง 100 × 100 ที่ทุกช่องถูกล้อม (10 000 สี) ตารางสุ่ม 300 ชุดเทียบกับ brute force แบบ union-find และตารางสุ่ม 100 × 100 ใช้ 0.006 วินาที
==== en
## Technique: connected components by flood fill

A grid is a graph: cells are vertices and neighbouring cells are joined by an edge unless something blocks them. "How many separate areas?" is "how many connected components?", and the standard way to count them is:

> scan every cell; when a cell is not yet visited, it starts a new component: count it and **flood fill** (DFS or BFS) everything reachable from it.

Each cell is visited once and each of its 4 sides is checked once, so the whole count is O(R·C).

## How it maps onto this problem

### Step 1: the answer is the number of regions

Different regions get different colors, and one region needs only one color. So the number of colors is exactly the number of regions.

### Step 2: reading the walls

A cell's number has two bits: **1 = wall on top**, **2 = wall on the right** (3 = both). Each wall between two cells is therefore written **once**, in one of the two cells:

| move from (r, c) to | blocked when |
|---|---|
| up, (r − 1, c) | `border[r][c] & 1` |
| down, (r + 1, c) | `border[r + 1][c] & 1` (the top wall of the cell below) |
| left, (r, c − 1) | `border[r][c − 1] & 2` (the right wall of the cell on the left) |
| right, (r, c + 1) | `border[r][c] & 2` |

The edge of the page always blocks, which the bounds checks (`r > 0`, `r + 1 < rows`, …) already handle.

```diagram
sample 1:   0 0        ┌───────┐
            3 1        │ A   A │      region A = the top row (no wall between them)
                       ├───┬───┤      (1,0) = 3: wall on top and on its right
                       │ B │ C │      (1,1) = 1: wall on top
                       └───┴───┘      3 regions → 3 colors
```

### Step 3: flood fill with an explicit stack

Mark a cell when it is **pushed**, not when it is popped, so no cell is pushed twice. With at most 10 000 cells a recursive DFS would also work, but the explicit stack never risks a deep recursion.

{{viz}}

:::warn Traps
- Checking only the current cell's bits: the wall below a cell and the wall on its left are stored in the neighbours.
- Reading the rows bottom to top: the first input row is the top of the picture (sample 1 then gives 1 instead of 3).
- Counting walls or cells instead of regions.
:::

## Solution

{{code}}

**Complexity.** Every cell is pushed and popped once and checks 4 sides: **O(R·C)**. Memory: **O(R·C)** for the grid and the marks.

{{tested}}
==== th
## เทคนิค: นับ connected component ด้วย flood fill

ตารางคือกราฟ: ช่องคือจุด และช่องข้างกันเชื่อมด้วยเส้น ยกเว้นมีอะไรกั้น "มีกี่พื้นที่ที่แยกกัน?" คือ "มีกี่ connected component?" และวิธีนับมาตรฐานคือ:

> ไล่ทุกช่อง เมื่อเจอช่องที่ยังไม่เคยไป มันเริ่ม component ใหม่: นับเพิ่มหนึ่ง แล้ว **flood fill** (DFS หรือ BFS) ทุกช่องที่ไปถึงได้จากมัน

แต่ละช่องถูกไปครั้งเดียว และแต่ละด้านทั้ง 4 ถูกตรวจครั้งเดียว การนับทั้งหมดจึงเป็น O(R·C)

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: คำตอบคือจำนวนพื้นที่

พื้นที่ต่างกันได้สีต่างกัน และพื้นที่หนึ่งต้องการสีเดียว จำนวนสีจึงเท่ากับจำนวนพื้นที่พอดี

### ขั้นที่ 2: การอ่านขอบ

ตัวเลขของช่องมีสองบิต: **1 = ขอบด้านบน**, **2 = ขอบด้านขวา** (3 = ทั้งคู่) ขอบระหว่างสองช่องจึงถูกเขียน **ครั้งเดียว** ในช่องใดช่องหนึ่ง:

| เดินจาก (r, c) ไป | ถูกกั้นเมื่อ |
|---|---|
| บน, (r − 1, c) | `border[r][c] & 1` |
| ล่าง, (r + 1, c) | `border[r + 1][c] & 1` (ขอบบนของช่องข้างล่าง) |
| ซ้าย, (r, c − 1) | `border[r][c − 1] & 2` (ขอบขวาของช่องทางซ้าย) |
| ขวา, (r, c + 1) | `border[r][c] & 2` |

ขอบกระดาษกั้นเสมอ ซึ่งการตรวจขอบเขต (`r > 0`, `r + 1 < rows`, …) จัดการให้แล้ว

```diagram
ตัวอย่าง 1: 0 0        ┌───────┐
            3 1        │ A   A │      พื้นที่ A = แถวบน (ไม่มีขอบกั้นระหว่างกัน)
                       ├───┬───┤      (1,0) = 3: มีขอบบนและขอบขวา
                       │ B │ C │      (1,1) = 1: มีขอบบน
                       └───┴───┘      3 พื้นที่ → 3 สี
```

### ขั้นที่ 3: flood fill ด้วย stack

ทำเครื่องหมายช่องตอน **push** ไม่ใช่ตอน pop ช่องจึงไม่ถูก push ซ้ำ ด้วยช่องไม่เกิน 10 000 ช่อง DFS แบบ recursive ก็ใช้ได้ แต่ stack ที่เขียนเองไม่เสี่ยง recursion ลึกเลย

{{viz}}

:::warn กับดัก
- ตรวจแค่บิตของช่องปัจจุบัน: ขอบใต้ช่องและขอบซ้ายของช่องถูกเก็บไว้ในช่องข้างเคียง
- อ่านแถวจากล่างขึ้นบน: แถวแรกของข้อมูลคือด้านบนของภาพ (ไม่เช่นนั้นตัวอย่าง 1 จะได้ 1 แทน 3)
- นับขอบหรือนับช่องแทนการนับพื้นที่
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** ทุกช่องถูก push และ pop ครั้งเดียว และตรวจ 4 ด้าน: **O(R·C)** หน่วยความจำ: **O(R·C)** สำหรับตารางและเครื่องหมาย

{{tested}}
