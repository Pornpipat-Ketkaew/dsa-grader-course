title: New Game Plus
title_th: New Game Plus (เขาวงกตห้ามใช้ประตูซ้ำ)
stars: 3
tech: DP on a grid with an extra state (the last door), Column-by-column sweep, Rolling arrays
tech_th: DP บนตารางที่มีสถานะเพิ่ม (ประตูล่าสุด), ไล่ทีละคอลัมน์, อาร์เรย์หมุนเวียน
complexity: O(R · C · 4 · 3) time · O(R) memory
key: Every move goes one column right, so columns are natural DP layers. The rule "not the same door twice in a row" needs to know the door used to enter the current room, so the state is (row, entering door). For each column, push every count through the two or three doors that differ from the entering door.
key_th: ทุกการเดินไปทางขวาหนึ่งคอลัมน์ คอลัมน์จึงเป็นชั้นของ DP โดยธรรมชาติ กฎ "ห้ามใช้ประตูเดิมติดกัน" ต้องรู้ประตูที่ใช้เข้าห้องปัจจุบัน สถานะจึงเป็น (แถว, ประตูที่ใช้เข้า) ในแต่ละคอลัมน์ ส่งจำนวนวิธีผ่านประตูสองหรือสามบานที่ต่างจากประตูที่ใช้เข้า
tests: all 6 PDF samples, a 25 × 25 open grid (43 099 679), 300 random grids against a brute force over all walks, and a 500 × 500 grid with 10 % walls in 0.02 s.
tests_th: ตัวอย่างทั้ง 6 ใน PDF ตารางเปิด 25 × 25 (43 099 679) ตารางสุ่ม 300 ชุดเทียบกับ brute force ที่ลองทุกการเดิน และตาราง 500 × 500 มีกำแพง 10 % ใช้ 0.02 วินาที
==== en
## Technique: add the missing memory to the state

A grid-path count is a DP when every move goes "forward" (here: one column right), because then the columns form layers and no path revisits a layer. If a rule depends on **how** we arrived (here: the previous door), plain `ways[row]` is not enough to decide the next move. The fix is always the same: **put that information into the state**.

> state = (row, door used to enter this room), with a special value START for the first column.

## How it maps onto this problem

### Step 1: states and start

`ways[row][door]` = number of different room lists that end in room (row, current column) and entered it through `door` ∈ {X, Y, Z}, or `START` in column 1. Every open room in column 1 has `ways[row][START] = 1`.

### Step 2: transition to the next column

From state (row, entered), each door `door ≠ entered` leads to row + {−1, 0, +1} in the next column. If that room exists and is open:

> `next[newRow][door] += ways[row][entered]`.

START differs from every door, so the first move may use any door.

```diagram
sample 2:   0 1 0      column 1: (1) start, (2) start
            0 0 0      column 2: (2,2) via Z from row 1 and via Y from row 2 → Z:1 Y:1
                       column 3: (1,3) via X from both → X:2;  (2,3) via Y only from the Z list → Y:1
                       total 3
```

{{viz}}

### Step 3: answer and memory

The answer is the sum of every state in the last column. Only two columns are alive at a time, so two R × 4 arrays are enough. All additions are mod 100 000 007.

:::warn Traps
- Different lists of rooms count separately even if they share rooms: the DP counts paths, not end rooms.
- Blocked rooms cannot be start or end rooms either: they never get a count.
- R = 2 with Y repeated: (2,1) → (2,2) → (2,3) is illegal (sample 2).
:::

## Solution

{{code}}

**Complexity.** R · C rooms × 4 entering states × 3 doors: **O(R · C)** with a constant 12, about 3·10⁶ for 500 × 500. Memory: two columns, **O(R)** (plus the map).

{{tested}}
==== th
## เทคนิค: ใส่ข้อมูลที่ขาดไปลงในสถานะ

การนับเส้นทางบนตารางเป็น DP ได้เมื่อทุกการเดินไป "ข้างหน้า" (ในข้อนี้: ไปขวาหนึ่งคอลัมน์) เพราะคอลัมน์กลายเป็นชั้น และไม่มีเส้นทางไหนกลับมาชั้นเดิม ถ้ากฎขึ้นกับว่าเรามาถึง **อย่างไร** (ในข้อนี้: ประตูก่อนหน้า) แค่ `ways[row]` ไม่พอตัดสินการเดินถัดไป วิธีแก้เหมือนเดิมทุกครั้ง: **ใส่ข้อมูลนั้นลงในสถานะ**

> สถานะ = (แถว, ประตูที่ใช้เข้าห้องนี้) โดยมีค่าพิเศษ START สำหรับคอลัมน์แรก

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: สถานะและจุดเริ่ม

`ways[row][door]` = จำนวนรายการห้องที่ต่างกันที่จบที่ห้อง (row, คอลัมน์ปัจจุบัน) และเข้าห้องนั้นทาง `door` ∈ {X, Y, Z} หรือ `START` ในคอลัมน์ 1 ห้องที่เปิดทุกห้องในคอลัมน์ 1 มี `ways[row][START] = 1`

### ขั้นที่ 2: เปลี่ยนไปคอลัมน์ถัดไป

จากสถานะ (row, entered) ประตูแต่ละบาน `door ≠ entered` พาไปแถว row + {−1, 0, +1} ในคอลัมน์ถัดไป ถ้าห้องนั้นมีอยู่และเปิด:

> `next[newRow][door] += ways[row][entered]`

START ต่างจากทุกประตู การเดินครั้งแรกจึงใช้ประตูไหนก็ได้

```diagram
ตัวอย่าง 2: 0 1 0      คอลัมน์ 1: (1) เริ่ม, (2) เริ่ม
            0 0 0      คอลัมน์ 2: (2,2) ทาง Z จากแถว 1 และทาง Y จากแถว 2 → Z:1 Y:1
                       คอลัมน์ 3: (1,3) ทาง X จากทั้งคู่ → X:2;  (2,3) ทาง Y ได้จากรายการ Z เท่านั้น → Y:1
                       รวม 3
```

{{viz}}

### ขั้นที่ 3: คำตอบและหน่วยความจำ

คำตอบคือผลรวมของทุกสถานะในคอลัมน์สุดท้าย มีแค่สองคอลัมน์ที่ใช้งานพร้อมกัน อาร์เรย์ R × 4 สองตัวจึงพอ ทุกการบวก mod 100 000 007

:::warn กับดัก
- รายการห้องที่ต่างกันนับแยกกันแม้จะใช้ห้องร่วมกัน: DP นับเส้นทาง ไม่ใช่ห้องปลายทาง
- ห้องห้ามเข้าเป็นห้องเริ่มหรือห้องจบไม่ได้ด้วย: จึงไม่เคยได้รับจำนวนวิธี
- R = 2 ที่ Y ซ้ำ: (2,1) → (2,2) → (2,3) ผิดกฎ (ตัวอย่าง 2)
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** R · C ห้อง × 4 สถานะการเข้า × 3 ประตู: **O(R · C)** คูณค่าคงที่ 12 ราว 3·10⁶ เมื่อ 500 × 500 หน่วยความจำ: สองคอลัมน์ **O(R)** (บวกแผนที่)

{{tested}}
