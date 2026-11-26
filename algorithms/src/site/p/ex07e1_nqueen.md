title: n-Queen
title_th: n ราชินี (n-Queen)
stars: 2
tech: Backtracking row by row, O(1) attack test with column/diagonal flags
tech_th: Backtracking ทีละแถว, ตรวจการโจมตีใน O(1) ด้วยธงคอลัมน์/แนวทแยง
complexity: about O(n!) time (14 200 solutions for n = 12, 0.08 s) · O(n) memory
key: Put exactly one queen per row, so rows never clash. Columns and both diagonal directions are tracked by three boolean arrays indexed by column, row+column and row−column+n−1, making "is this square attacked?" O(1).
key_th: วางราชินีแถวละหนึ่งตัวพอดี แถวจึงไม่มีทางชนกัน ส่วนคอลัมน์และแนวทแยงทั้งสองทิศติดตามด้วยอาร์เรย์ boolean สามตัวที่ใช้ดัชนี column, row+column และ row−column+n−1 ทำให้ "ช่องนี้ถูกโจมตีไหม?" เป็น O(1)
tests: both PDF samples and every n from 1 to 12 against the known sequence 1, 0, 0, 2, 10, 4, 40, 92, 352, 724, 2680, 14200, plus a brute force over permutations for small n; n = 12 takes 0.08 s.
tests_th: ตัวอย่างทั้งสองใน PDF และทุก n ตั้งแต่ 1 ถึง 12 เทียบกับลำดับที่รู้คำตอบ 1, 0, 0, 2, 10, 4, 40, 92, 352, 724, 2680, 14200 และ brute force บน permutation เมื่อ n เล็ก กรณี n = 12 ใช้ 0.08 วินาที
==== en
## Technique: backtracking with constant-time constraint checks

N-queens is the textbook backtracking problem. Two design decisions make it fast:

1. **Choose the decision variable so that one constraint holds automatically.** Every row holds exactly one queen, so the recursion places "the queen of row `row`", and two queens can never share a row.
2. **Make the validity test O(1).** Instead of scanning earlier queens (O(n) per test), keep three boolean arrays: column used, "\" diagonal used, "/" diagonal used.

## How it maps onto this problem

### Indexing the diagonals

All squares on one "/" diagonal have the same `row + column` (0 … 2n−2). All squares on one "\" diagonal have the same `row − column`, which ranges over −(n−1) … n−1, so shift it by n − 1 to get an index 0 … 2n−2.

```diagram
row+column (/)            row-column+n-1 (\)        n = 4
0 1 2 3                   3 2 1 0
1 2 3 4                   4 3 2 1
2 3 4 5                   5 4 3 2
3 4 5 6                   6 5 4 3
```

A square (row, column) is safe iff `columnUsed[column]`, `antiDiagonalUsed[row+column]` and `diagonalUsed[row−column+n−1]` are all false.

### The recursion

`place(row)`: for each column of this row that is safe, set the three flags, recurse into `row + 1`, then clear the three flags (un-choose). Reaching `row == n` means all n rows have a queen: count one solution.

{{viz}}

### Why this is fast enough

The search tree has n choices on the first row, at most n − 1 safe columns on the next, and so on, so it is bounded by about n! nodes, and the diagonal checks prune far more. For n = 12 the program explores a few hundred thousand nodes and finds 14 200 solutions in under 0.1 s.

:::warn Traps
- Diagonal index `row − column` is negative for column > row: add n − 1.
- Array sizes: the diagonal arrays need 2n − 1 entries (23 for n = 12), not n.
- Forgetting to clear the flags after the recursive call.
- Counting is all that is asked: do not store boards.
:::

## Solution

{{code}}

**Complexity.** Bounded by O(n!) nodes with O(1) work each, far fewer in practice because of the diagonal pruning. Memory: three flag arrays and a recursion of depth n: **O(n)**.

{{tested}}
==== th
## เทคนิค: backtracking พร้อมการตรวจเงื่อนไขในเวลาคงที่

n-Queen คือโจทย์ backtracking ตามตำรา การออกแบบสองอย่างทำให้เร็ว:

1. **เลือกตัวแปรการตัดสินใจให้เงื่อนไขหนึ่งเป็นจริงเอง** ทุกแถวมีราชินีหนึ่งตัวพอดี recursion จึงวาง "ราชินีของแถว `row`" และราชินีสองตัวไม่มีทางอยู่แถวเดียวกัน
2. **ทำให้การตรวจความถูกต้องเป็น O(1)** แทนที่จะไล่ดูราชินีก่อนหน้า (O(n) ต่อครั้ง) ให้เก็บอาร์เรย์ boolean สามตัว: คอลัมน์ที่ใช้แล้ว แนวทแยง "\" ที่ใช้แล้ว และแนวทแยง "/" ที่ใช้แล้ว

## นำมาใช้กับโจทย์นี้อย่างไร

### การให้ดัชนีแนวทแยง

ทุกช่องบนแนวทแยง "/" เส้นเดียวกันมี `row + column` เท่ากัน (0 … 2n−2) ทุกช่องบนแนวทแยง "\" เส้นเดียวกันมี `row − column` เท่ากัน ซึ่งมีค่า −(n−1) … n−1 จึงเลื่อนด้วย n − 1 ให้ได้ดัชนี 0 … 2n−2

```diagram
row+column (/)            row-column+n-1 (\)        n = 4
0 1 2 3                   3 2 1 0
1 2 3 4                   4 3 2 1
2 3 4 5                   5 4 3 2
3 4 5 6                   6 5 4 3
```

ช่อง (row, column) ปลอดภัยเมื่อ `columnUsed[column]`, `antiDiagonalUsed[row+column]` และ `diagonalUsed[row−column+n−1]` เป็นเท็จทั้งหมด

### Recursion

`place(row)`: สำหรับแต่ละคอลัมน์ของแถวนี้ที่ปลอดภัย ตั้งธงทั้งสาม เรียก `row + 1` แล้วล้างธงทั้งสาม (ยกเลิก) เมื่อถึง `row == n` แปลว่าทุกแถวมีราชินีแล้ว นับหนึ่งคำตอบ

{{viz}}

### ทำไมเร็วพอ

ต้นไม้ค้นหามี n ทางเลือกในแถวแรก ไม่เกิน n − 1 คอลัมน์ที่ปลอดภัยในแถวถัดไป และต่อไปเรื่อย ๆ จึงไม่เกินประมาณ n! โหนด และการตรวจแนวทแยงตัดกิ่งได้มากกว่านั้นมาก เมื่อ n = 12 โปรแกรมสำรวจไม่กี่แสนโหนดและพบ 14 200 คำตอบในเวลาไม่ถึง 0.1 วินาที

:::warn กับดัก
- ดัชนี `row − column` ติดลบเมื่อ column > row: ต้องบวก n − 1
- ขนาดอาร์เรย์: อาร์เรย์แนวทแยงต้องมี 2n − 1 ช่อง (23 เมื่อ n = 12) ไม่ใช่ n
- ลืมล้างธงหลังเรียกตัวเอง
- โจทย์ถามแค่จำนวน: ไม่ต้องเก็บกระดาน
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** ไม่เกิน O(n!) โหนด โหนดละ O(1) และน้อยกว่านั้นมากในทางปฏิบัติเพราะการตัดด้วยแนวทแยง หน่วยความจำ: อาร์เรย์ธงสามตัวและ recursion ลึก n: **O(n)**

{{tested}}
