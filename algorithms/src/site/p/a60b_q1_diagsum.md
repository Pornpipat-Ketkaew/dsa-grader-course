title: Diagonal Sum
title_th: ผลรวมแนวทแยง
stars: 2
tech: Kadane's algorithm (maximum subarray), Diagonal indexing
tech_th: อัลกอริทึมของ Kadane (maximum subarray), การไล่ดัชนีแนวทแยง
complexity: O(n²) time · O(n²) memory
key: Each down-right diagonal is just a 1-D array, and a "diagonal sum" is a contiguous piece of it. Run Kadane on each of the 2n−1 diagonals: O(n²), better than the O(n³) the PDF hints at.
key_th: เส้นทแยงลงขวาแต่ละเส้นคืออาร์เรย์ 1 มิติ และ "ผลรวมแนวทแยง" คือช่วงต่อเนื่องของมัน รัน Kadane บนเส้นทแยงทั้ง 2n−1 เส้น: O(n²) ดีกว่า O(n³) ที่ PDF แนะนำ
tests: all PDF samples (including the third one whose table has more numbers than n²) plus n = 1, and 300 random tables against an O(n⁴) brute force over every (i, j, k); n = 1000 runs in 0.06 s. ASan + UBSan clean.
tests_th: ตัวอย่างทุกชุดใน PDF (รวมชุดที่ 3 ที่มีตัวเลขเกิน n²) และ n = 1 และสุ่ม 300 ตารางเทียบกับ brute force O(n⁴) ที่ลองทุก (i, j, k) กรณี n = 1000 ใช้ 0.06 วินาที ไม่พบข้อผิดพลาดจาก ASan + UBSan
==== en
## Technique: Kadane's maximum subarray

**Kadane's algorithm** finds the largest sum of a contiguous piece of an array in one pass. Keep one number:

> `bestEndingHere` = the largest sum of a piece that **ends exactly at the current element**.

When the next element x arrives, a piece ending at x either is x alone, or is the best piece ending at the previous element plus x:

`bestEndingHere = max(x, bestEndingHere + x)`

The answer is the largest `bestEndingHere` ever seen. One pass, O(length), O(1) extra memory. It is a tiny DP: the state is "best piece ending here", and the recurrence above has only two choices.

## How it maps onto this problem

### Step 1: a diagonal sum is a subarray

"Sum of A[i+p][j+p] for p = 0..k−1" walks **down-right** from (i, j). All those cells lie on the same diagonal, the one where `column − row = j − i`. Cutting at the table edge (the PDF's third example) just means the piece cannot go past the diagonal's last cell. So:

:::key The reduction
Every diagonal sum = a contiguous piece of one diagonal. The best diagonal sum = the maximum over all diagonals of that diagonal's **maximum subarray**.
:::

### Step 2: enumerate the diagonals

Label a diagonal by `shift = column − row`, from −(n−1) (bottom-left corner) to n−1 (top-right corner): **2n − 1 diagonals**. The top-left end of diagonal `shift` is `row = max(0, −shift)`, `column = row + shift`.

```diagram
shift:   0   1   2   3              column - row
       ┌───┬───┬───┬───┐
row 0  │ 1 │ 2 │ 3 │ 4 │            shift = 1 : 2, 2, 1          (cells (0,1) (1,2) (2,3))
row 1  │-2 │-5 │ 2 │-5 │            shift = -1: -2, 3, 7         (cells (1,0) (2,1) (3,2))
row 2  │ 6 │ 3 │-7 │ 1 │                        └───┘ best piece 3 + 7 = 10
row 3  │ 3 │-2 │ 7 │-9 │
       └───┴───┴───┴───┘
```

### Step 3: Kadane along each diagonal

Walk (row, column) → (row+1, column+1) until either index reaches n, updating `bestEndingHere` and the global `best`.

{{viz}}

:::proof Why "start fresh" is right
If `bestEndingHere` (ending at the previous cell) is negative, adding it can only make a piece ending at x smaller, so the best piece ending at x is x alone. If it is non-negative, extending it is at least as good. `max(x, bestEndingHere + x)` makes exactly that choice.
:::

### Step 4: all-negative tables

The answer must use **k ≥ 1** cells. Initialise `best` with a real cell (`table[0][0]`), and start every diagonal's `bestEndingHere` with its first cell, never with 0. Then a table full of −1 correctly answers −1, not 0.

:::warn Traps
- Starting `best = 0`: wrong whenever every cell is negative.
- O(n³) (fix the start, extend) or O(n⁴) (fix start and length) are what the PDF suggests; Kadane makes it O(n²), the size of the input.
- The PDF's third sample says n = 3 but prints a 4×4 block. Reading exactly n·n numbers (as the code does) handles it.
:::

## Solution

{{code}}

**Complexity.** Every cell belongs to exactly one diagonal and is visited once: **O(n²)** = 10⁶ steps for n = 1000, which is the size of the input itself. Memory: the table, **O(n²)**.

{{tested}}
==== th
## เทคนิค: maximum subarray ของ Kadane

**อัลกอริทึมของ Kadane** หาผลรวมมากที่สุดของช่วงต่อเนื่องในอาร์เรย์ได้ในรอบเดียว โดยเก็บตัวเลขเพียงตัวเดียว:

> `bestEndingHere` = ผลรวมมากที่สุดของช่วงที่ **จบที่สมาชิกปัจจุบันพอดี**

เมื่อสมาชิกถัดไป x มาถึง ช่วงที่จบที่ x มีได้สองแบบ: x ตัวเดียว หรือช่วงที่ดีที่สุดที่จบที่ตัวก่อนหน้าแล้วต่อด้วย x:

`bestEndingHere = max(x, bestEndingHere + x)`

คำตอบคือ `bestEndingHere` ที่มากที่สุดที่เคยเห็น ใช้รอบเดียว O(ความยาว) หน่วยความจำเพิ่ม O(1) มันคือ DP ขนาดจิ๋ว: สถานะคือ "ช่วงที่ดีที่สุดที่จบตรงนี้" และความสัมพันธ์มีแค่สองทางเลือก

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: ผลรวมแนวทแยงคือ subarray

"ผลรวม A[i+p][j+p] สำหรับ p = 0..k−1" เดิน **ลงขวา** จาก (i, j) ทุกช่องเหล่านั้นอยู่บนเส้นทแยงเดียวกัน คือเส้นที่ `column − row = j − i` การถูกตัดที่ขอบตาราง (ตัวอย่างที่สามใน PDF) แปลว่าช่วงนั้นเลยช่องสุดท้ายของเส้นทแยงไม่ได้เท่านั้น ดังนั้น:

:::key การลดรูปปัญหา
ผลรวมแนวทแยงทุกแบบ = ช่วงต่อเนื่องบนเส้นทแยงเส้นหนึ่ง ผลรวมแนวทแยงที่ดีที่สุด = ค่ามากสุดของ **maximum subarray** ของทุกเส้นทแยง
:::

### ขั้นที่ 2: ไล่ทุกเส้นทแยง

ตั้งชื่อเส้นทแยงด้วย `shift = column − row` ตั้งแต่ −(n−1) (มุมล่างซ้าย) ถึง n−1 (มุมบนขวา): **2n − 1 เส้น** ปลายบนซ้ายของเส้น `shift` คือ `row = max(0, −shift)`, `column = row + shift`

```diagram
shift:   0   1   2   3              column - row
       ┌───┬───┬───┬───┐
row 0  │ 1 │ 2 │ 3 │ 4 │            shift = 1 : 2, 2, 1          (ช่อง (0,1) (1,2) (2,3))
row 1  │-2 │-5 │ 2 │-5 │            shift = -1: -2, 3, 7         (ช่อง (1,0) (2,1) (3,2))
row 2  │ 6 │ 3 │-7 │ 1 │                        └───┘ ช่วงที่ดีที่สุด 3 + 7 = 10
row 3  │ 3 │-2 │ 7 │-9 │
       └───┴───┴───┴───┘
```

### ขั้นที่ 3: Kadane ไปตามแต่ละเส้นทแยง

เดิน (row, column) → (row+1, column+1) จนกว่า index ใดถึง n พร้อมอัปเดต `bestEndingHere` และ `best` รวม

{{viz}}

:::proof ทำไม "เริ่มใหม่" ถึงถูก
ถ้า `bestEndingHere` (ที่จบที่ช่องก่อนหน้า) เป็นลบ การต่อเข้าไปมีแต่ทำให้ช่วงที่จบที่ x เล็กลง ช่วงที่ดีที่สุดที่จบที่ x จึงเป็น x ตัวเดียว ถ้าไม่เป็นลบ การต่อก็ดีอย่างน้อยเท่ากัน `max(x, bestEndingHere + x)` เลือกตามนี้พอดี
:::

### ขั้นที่ 4: ตารางที่ติดลบทั้งหมด

คำตอบต้องใช้ **k ≥ 1** ช่อง ให้ตั้งค่าเริ่ม `best` เป็นช่องจริง (`table[0][0]`) และเริ่ม `bestEndingHere` ของแต่ละเส้นด้วยช่องแรกของเส้นนั้น ไม่ใช่ 0 ตารางที่เป็น −1 ทั้งหมดจึงตอบ −1 ได้ถูก ไม่ใช่ 0

:::warn กับดัก
- เริ่ม `best = 0`: ผิดเมื่อทุกช่องเป็นลบ
- O(n³) (กำหนดจุดเริ่มแล้วยืด) หรือ O(n⁴) (กำหนดจุดเริ่มและความยาว) คือสิ่งที่ PDF แนะนำ Kadane ทำให้เหลือ O(n²) ซึ่งเท่ากับขนาดข้อมูลนำเข้า
- ตัวอย่างที่สามใน PDF บอก n = 3 แต่พิมพ์ตาราง 4×4 การอ่านตัวเลข n·n ตัวพอดี (อย่างที่โค้ดทำ) รับมือได้
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** ทุกช่องอยู่บนเส้นทแยงเส้นเดียวและถูกเยี่ยมครั้งเดียว: **O(n²)** = 10⁶ ขั้นเมื่อ n = 1000 เท่ากับขนาดข้อมูลนำเข้า หน่วยความจำ: ตาราง **O(n²)**

{{tested}}
