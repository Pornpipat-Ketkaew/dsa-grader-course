title: Map Walk
title_th: เดินบนแผนที่ (Map Walk)
stars: 2
tech: DFS enumeration of simple paths, Backtracking on a visited grid
tech_th: DFS ไล่ทุกเส้นทางที่ไม่ซ้ำช่อง, Backtracking บนตาราง visited
complexity: O(number of paths · path length) time · O(R·C) memory
key: Depth-first search from (1,1) that tries the moves in the order A (right), B (down), C (up), marks a cell visited on entry and unmarks it on return. Every arrival at (R,C) prints the current command string, already in alphabetical order.
key_th: DFS จาก (1,1) ที่ลองการเดินตามลำดับ A (ขวา), B (ลง), C (ขึ้น) ทำเครื่องหมายช่องเมื่อเข้าและลบเมื่อกลับ ทุกครั้งที่ถึง (R,C) ให้พิมพ์สตริงคำสั่งปัจจุบัน ซึ่งเรียงตามตัวอักษรอยู่แล้ว
tests: the 3 PDF samples, 3 hand-made mazes (a single long winding path, 1×1) and 300 random small maps against an independent brute force; a 10×10 random map with 5 509 paths runs in 0.007 s, well inside 32 MB because nothing is stored.
tests_th: ตัวอย่างทั้ง 3 ใน PDF เขาวงกตที่ทำเอง 3 แบบ (ทางเดียวคดเคี้ยวยาว, 1×1) และสุ่ม 300 แผนที่เล็กเทียบกับ brute force อีกตัว แผนที่สุ่ม 10×10 ที่มี 5 509 เส้นทางใช้ 0.007 วินาที และอยู่ใน 32 MB สบายเพราะไม่เก็บอะไรไว้
==== en
## Technique: DFS that enumerates simple paths

Shortest-path problems use BFS and visit each cell **once overall**. Counting or listing **all** paths is different: a cell may appear in many paths, just never twice in the **same** path. The tool is **backtracking DFS**:

```cpp
void walk(cell) {
    if (cell is the goal) { report the path; return; }
    for (each move in the required order)
        if (next is inside, free and not on the current path) {
            mark next visited;   append move;     // choose
            walk(next);                           // explore
            remove move;         unmark next;     // un-choose
        }
}
```

`visited` here means "on the **current** path", not "ever seen". Unmarking on return is what lets the next branch use the cell again.

## How it maps onto this problem

### The four rules become four checks

| rule in the statement | check in the loop |
|---|---|
| 1. stay inside the map | `1 ≤ nextRow ≤ R`, `1 ≤ nextColumn ≤ C` |
| 2. never revisit a cell | `!visited[nextRow][nextColumn]` |
| 3. the game ends at (R, C) | `return` right after printing (no move out of the goal) |
| 4. no-entry cells | `!blocked[nextRow][nextColumn]` |

### Alphabetical output for free

The commands are letters A < B < C, and the output must be in alphabetical order. Trying the moves at every cell in the order **A, B, C** makes the DFS produce paths in exactly that order (the same argument as for dictionary-order permutations). No sorting, no storing.

```diagram
2 × 3 map, no walls          paths in the order DFS finds them
(1,1) → (1,2) → (1,3)        A A B
  │       │       │          A B A
(2,1) → (2,2) → (2,3)        B A A
                             B A C A B   ← goes up again: allowed, since (1,2),(1,3) are not on the path yet
```

{{viz}}

### Why print immediately (32 MB)

The number of paths in a 10 × 10 map can be enormous, and the memory limit is only 32 MB. Never collect the paths in a vector: print each one the moment it is found. `cout` with `ios_base::sync_with_stdio(false)` buffers the output efficiently. The current path itself is one `string` used as a stack (`push_back` / `pop_back`).

:::warn Traps
- Marking (1,1) visited is required: otherwise a path could come back up into the start cell.
- Continuing past (R, C): rule 3 says the game ends there, so `return` after printing.
- Using BFS-style "visited forever" marks: you would find only one path.
- A 1 × 1 map: the start is the goal, so print one empty line, then DONE.
:::

## Solution

{{code}}

**Complexity.** Each DFS call does 3 checks; the work is proportional to the number of partial paths explored, which is exponential in the worst case, but the statement's tests are built so the answer is printable. Memory: the R·C grids and a recursion depth of at most R·C.

{{tested}}
==== th
## เทคนิค: DFS ที่ไล่ทุกเส้นทางที่ไม่ซ้ำช่อง

โจทย์เส้นทางสั้นที่สุดใช้ BFS และเยี่ยมแต่ละช่อง **ครั้งเดียวตลอดการทำงาน** แต่การนับหรือแสดง **ทุก** เส้นทางต่างออกไป: ช่องหนึ่งอยู่ได้ในหลายเส้นทาง แต่ห้ามซ้ำในเส้นทาง **เดียวกัน** เครื่องมือคือ **DFS แบบ backtracking**:

```cpp
void walk(cell) {
    if (cell is the goal) { report the path; return; }
    for (each move in the required order)
        if (next is inside, free and not on the current path) {
            mark next visited;   append move;     // choose
            walk(next);                           // explore
            remove move;         unmark next;     // un-choose
        }
}
```

`visited` ในที่นี้แปลว่า "อยู่บนเส้นทาง **ปัจจุบัน**" ไม่ใช่ "เคยเห็นแล้ว" การลบเครื่องหมายตอนกลับคือสิ่งที่ทำให้กิ่งถัดไปใช้ช่องนั้นได้อีก

## นำมาใช้กับโจทย์นี้อย่างไร

### กฎสี่ข้อกลายเป็นการตรวจสี่อย่าง

| กฎในโจทย์ | การตรวจในลูป |
|---|---|
| 1. ห้ามออกนอกตาราง | `1 ≤ nextRow ≤ R`, `1 ≤ nextColumn ≤ C` |
| 2. ห้ามเดินซ้ำช่อง | `!visited[nextRow][nextColumn]` |
| 3. เกมจบที่ (R, C) | `return` ทันทีหลังพิมพ์ (ไม่เดินออกจากเป้าหมาย) |
| 4. ช่องห้ามเข้า | `!blocked[nextRow][nextColumn]` |

### ได้ลำดับตัวอักษรฟรี

คำสั่งเป็นตัวอักษร A < B < C และต้องแสดงตามลำดับตัวอักษร การลองการเดินที่ทุกช่องตามลำดับ **A, B, C** ทำให้ DFS สร้างเส้นทางตามลำดับนั้นพอดี (เหตุผลเดียวกับการเรียงสับเปลี่ยนตามพจนานุกรม) ไม่ต้องเรียงและไม่ต้องเก็บ

```diagram
แผนที่ 2 × 3 ไม่มีกำแพง       เส้นทางตามลำดับที่ DFS พบ
(1,1) → (1,2) → (1,3)        A A B
  │       │       │          A B A
(2,1) → (2,2) → (2,3)        B A A
                             B A C A B   ← ขึ้นกลับไปได้ เพราะ (1,2),(1,3) ยังไม่อยู่บนเส้นทาง
```

{{viz}}

### ทำไมต้องพิมพ์ทันที (32 MB)

จำนวนเส้นทางในแผนที่ 10 × 10 อาจมหาศาล และหน่วยความจำจำกัดแค่ 32 MB ห้ามเก็บเส้นทางลงเวกเตอร์ ให้พิมพ์ทันทีที่พบ `cout` พร้อม `ios_base::sync_with_stdio(false)` จัดบัฟเฟอร์ให้อย่างมีประสิทธิภาพ ส่วนเส้นทางปัจจุบันเป็น `string` ตัวเดียวที่ใช้เหมือนสแตก (`push_back` / `pop_back`)

:::warn กับดัก
- ต้องทำเครื่องหมาย (1,1) ว่าเยี่ยมแล้ว ไม่อย่างนั้นเส้นทางอาจย้อนกลับขึ้นมาที่ช่องเริ่ม
- เดินต่อหลัง (R, C): กฎข้อ 3 บอกว่าเกมจบที่นั่น ให้ `return` หลังพิมพ์
- ใช้เครื่องหมาย "เยี่ยมแล้วตลอดไป" แบบ BFS: จะได้เส้นทางเดียว
- แผนที่ 1 × 1: จุดเริ่มคือเป้าหมาย พิมพ์บรรทัดว่างหนึ่งบรรทัดแล้วตามด้วย DONE
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** แต่ละการเรียก DFS ตรวจ 3 ทิศ งานแปรผันตามจำนวนเส้นทางบางส่วนที่สำรวจ ซึ่งเป็นเลขชี้กำลังในกรณีแย่สุด แต่ชุดทดสอบของโจทย์ออกแบบให้คำตอบพิมพ์ได้ หน่วยความจำ: ตาราง R·C และความลึก recursion ไม่เกิน R·C

{{tested}}
