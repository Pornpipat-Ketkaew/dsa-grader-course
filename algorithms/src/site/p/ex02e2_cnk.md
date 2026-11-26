title: Binomial Coefficient
title_th: สัมประสิทธิ์ทวินาม (Binomial Coefficient)
stars: 1
tech: Dynamic programming on a 2-D table (Pascal's triangle)
tech_th: Dynamic programming บนตารางสองมิติ (สามเหลี่ยมปาสคาล)
complexity: O(N²) time and memory (N ≤ 30)
key: The given recurrence C(n,k) = C(n−1,k−1) + C(n−1,k) only looks one row up, so fill Pascal's triangle row by row; every entry is computed once from two entries that are already there.
key_th: สูตรเวียนเกิด C(n,k) = C(n−1,k−1) + C(n−1,k) ดูแค่แถวข้างบนหนึ่งแถว จึงเติมสามเหลี่ยมปาสคาลทีละแถว ทุกช่องคำนวณครั้งเดียวจากสองช่องที่มีอยู่แล้ว
tests: all 3 PDF samples and every pair 1 ≤ K ≤ N ≤ 30 (465 cases) against Python's math.comb.
tests_th: ตัวอย่างทั้ง 3 ใน PDF และทุกคู่ 1 ≤ K ≤ N ≤ 30 (465 กรณี) เทียบกับ math.comb ของ Python
==== en
## Technique: a 2-D DP table filled in dependency order

When a recurrence has two parameters, its subproblems form a 2-D table. The only design question is the **fill order**: each entry must be computed after every entry it reads.

## How it maps onto this problem

### Step 1: states and dependencies

State `(row, column)` = C(row, column). The PDF's recurrence reads `(row−1, column−1)` and `(row−1, column)`: both are in the row above.

```diagram
row 0:          1
row 1:        1   1
row 2:      1   2   1
row 3:    1   3   3   1          C(3,1) = C(2,0) + C(2,1) = 1 + 2
row 4:  1   4   6   4   1
```

### Step 2: order and base cases

Fill row = 0, 1, …, N. In each row set both ends to 1 (`k = 0` and `k = n`), then the inner entries `column = 1 .. row−1` from the row above.

{{viz}}

### Step 3: why not the plain recursion

Without the table, C(30, 15) expands into 155 117 520 leaves (the answer itself, built from 1s). The table has only 31·32/2 = 496 entries.

:::warn Traps
- C(30, 15) = 155 117 520 fits in `int`, but intermediate rows are fine too; `long long` is safe anyway.
- Do not compute n! / (k! (N−k)!) directly: 30! overflows every built-in integer.
:::

## Solution

{{code}}

**Complexity.** About N²/2 entries, O(1) each: **O(N²)** time and memory.

{{tested}}
==== th
## เทคนิค: ตาราง DP สองมิติ เติมตามลำดับการพึ่งพา

เมื่อสูตรเวียนเกิดมีสองพารามิเตอร์ ปัญหาย่อยจะเป็นตารางสองมิติ คำถามเดียวด้านการออกแบบคือ **ลำดับการเติม**: แต่ละช่องต้องคำนวณหลังทุกช่องที่มันอ่าน

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: สถานะและการพึ่งพา

สถานะ `(row, column)` = C(row, column) สูตรใน PDF อ่าน `(row−1, column−1)` และ `(row−1, column)`: ทั้งคู่อยู่ในแถวข้างบน

```diagram
แถว 0:          1
แถว 1:        1   1
แถว 2:      1   2   1
แถว 3:    1   3   3   1          C(3,1) = C(2,0) + C(2,1) = 1 + 2
แถว 4:  1   4   6   4   1
```

### ขั้นที่ 2: ลำดับและกรณีฐาน

เติม row = 0, 1, …, N ในแต่ละแถวตั้งปลายทั้งสองเป็น 1 (`k = 0` และ `k = n`) แล้วเติมช่องด้านใน `column = 1 .. row−1` จากแถวข้างบน

{{viz}}

### ขั้นที่ 3: ทำไมไม่ใช้ recursion ธรรมดา

ถ้าไม่มีตาราง C(30, 15) จะแตกเป็นใบ 155 117 520 ใบ (ตัวคำตอบเองที่สร้างจากเลข 1) ตารางมีแค่ 31·32/2 = 496 ช่อง

:::warn กับดัก
- C(30, 15) = 155 117 520 ใส่ `int` ได้ และแถวระหว่างทางก็ใส่ได้ แต่ `long long` ปลอดภัยกว่า
- อย่าคำนวณ n! / (k! (N−k)!) ตรง ๆ: 30! ล้นจำนวนเต็มทุกชนิดใน C++
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** ประมาณ N²/2 ช่อง ช่องละ O(1): เวลาและหน่วยความจำ **O(N²)**

{{tested}}
