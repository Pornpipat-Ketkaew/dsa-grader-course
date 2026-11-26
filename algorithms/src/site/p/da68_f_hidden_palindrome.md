title: Hidden Palindrome
title_th: Hidden Palindrome (พาลินโดรมที่ซ่อนอยู่)
stars: 2
tech: Interval DP (longest palindromic subsequence), Two-row memory
tech_th: DP บนช่วง (palindromic subsequence ที่ยาวที่สุด), ใช้หน่วยความจำสองแถว
complexity: O(N²) time · O(N) memory
key: Let best(left, right) be the longest palindromic subsequence inside letters[left..right]. Equal ends wrap the inside: best(left+1, right−1) + 2. Different ends cannot both be used: max(best(left+1, right), best(left, right−1)). Fill left from N−1 down to 0 and keep only two rows.
key_th: ให้ best(left, right) เป็น palindromic subsequence ที่ยาวที่สุดใน letters[left..right] ถ้าปลายทั้งสองเท่ากันให้ครอบข้างใน: best(left+1, right−1) + 2 ถ้าต่างกันใช้ทั้งคู่ไม่ได้: max(best(left+1, right), best(left, right−1)) เติม left จาก N−1 ลงไปถึง 0 และเก็บแค่สองแถว
tests: all 3 PDF samples, N = 2 ("ab" → 1), 300 random strings against a brute force over subsequences, and N = 3000 in 0.01 s.
tests_th: ตัวอย่างทั้ง 3 ใน PDF, N = 2 ("ab" → 1) สุ่มสตริง 300 ชุดเทียบกับ brute force บน subsequence และ N = 3000 ใช้ 0.01 วินาที
==== en
## Technique: interval DP

When the answer for a sequence depends on what happens at **both ends**, the natural state is an interval `[left, right]`. Each step removes one or both ends, so every interval depends only on **shorter** intervals inside it. Fill the table so shorter intervals come first.

## How it maps onto this problem

### Step 1: state and base

> `best[left][right]` = longest palindromic subsequence of `letters[left..right]`; `best[i][i] = 1`.

### Step 2: the two ends

- `letters[left] == letters[right]`: put them as the outer pair around the best palindrome strictly inside: `best[left+1][right−1] + 2` (inside is empty, so 0, when `right = left + 1`).
- different: no palindrome can start with one and end with the other, so at least one end is unused: `max(best[left+1][right], best[left][right−1])`.

```diagram
a b c b d a b        best[0][5] ("abcbda"): 'a' = 'a' → best[1][4] ("bcbd") + 2 = 3 + 2 = 5
0 1 2 3 4 5 6        → "abcba"
```

(This is also LCS of the string and its reverse, but the interval form is the direct one.)

### Step 3: order and memory

`best[left][right]` reads row `left+1` (below) and `best[left][right−1]` (same row, to the left). So rows go from `left = N−1` **down** to 0 (an `int` counter), and inside a row `right` goes up. Only the current row and the row below are ever read, so two arrays of length N replace the N × N table: 2·3000 ints instead of 9·10⁶.

{{viz}}

:::warn Traps
- The chosen letters need not be adjacent: this is a sub**sequence**, not a palindromic substring.
- The `right = left + 1` equal case must give 2, not read `best[left+1][left]`.
- After the last `swap`, the finished row 0 is in `below`.
:::

## Solution

{{code}}

**Complexity.** N(N−1)/2 cells, O(1) each: **O(N²)** = 4.5·10⁶ for N = 3000. Memory: two rows, **O(N)**.

{{tested}}
==== th
## เทคนิค: DP บนช่วง

เมื่อคำตอบของลำดับขึ้นกับสิ่งที่เกิดที่ **ปลายทั้งสองข้าง** สถานะที่เป็นธรรมชาติคือช่วง `[left, right]` แต่ละก้าวตัดปลายหนึ่งหรือสองข้าง ทุกช่วงจึงขึ้นกับช่วงที่ **สั้นกว่า** ที่อยู่ข้างในเท่านั้น เติมตารางให้ช่วงที่สั้นกว่ามาก่อน

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: สถานะและกรณีฐาน

> `best[left][right]` = palindromic subsequence ที่ยาวที่สุดของ `letters[left..right]` และ `best[i][i] = 1`

### ขั้นที่ 2: ปลายทั้งสอง

- `letters[left] == letters[right]`: ใช้เป็นคู่นอกสุดครอบพาลินโดรมที่ดีที่สุดข้างใน: `best[left+1][right−1] + 2` (ข้างในว่าง คือ 0 เมื่อ `right = left + 1`)
- ต่างกัน: ไม่มีพาลินโดรมไหนเริ่มด้วยตัวหนึ่งและจบด้วยอีกตัว อย่างน้อยปลายหนึ่งข้างไม่ถูกใช้: `max(best[left+1][right], best[left][right−1])`

```diagram
a b c b d a b        best[0][5] ("abcbda"): 'a' = 'a' → best[1][4] ("bcbd") + 2 = 3 + 2 = 5
0 1 2 3 4 5 6        → "abcba"
```

(นี่เท่ากับ LCS ของสตริงกับสตริงกลับด้านด้วย แต่รูปแบบช่วงตรงไปตรงมากว่า)

### ขั้นที่ 3: ลำดับและหน่วยความจำ

`best[left][right]` อ่านแถว `left+1` (ข้างล่าง) และ `best[left][right−1]` (แถวเดียวกัน ทางซ้าย) แถวจึงไล่จาก `left = N−1` **ลง** ไปถึง 0 (ตัวนับเป็น `int`) และภายในแถว `right` ไล่ขึ้น มีแค่แถวปัจจุบันกับแถวข้างล่างที่ถูกอ่าน อาร์เรย์ยาว N สองตัวจึงแทนตาราง N × N ได้: 2·3000 ตัวแทน 9·10⁶ ตัว

{{viz}}

:::warn กับดัก
- ไม่ต้องติดกัน: นี่คือ sub**sequence** ไม่ใช่ palindromic substring
- กรณีเท่ากันที่ `right = left + 1` ต้องได้ 2 ไม่ใช่ไปอ่าน `best[left+1][left]`
- หลัง `swap` ครั้งสุดท้าย แถว 0 ที่เสร็จแล้วอยู่ใน `below`
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** N(N−1)/2 ช่อง ช่องละ O(1): **O(N²)** = 4.5·10⁶ เมื่อ N = 3000 หน่วยความจำ: สองแถว **O(N)**

{{tested}}
