title: Remaining Merge
title_th: Remaining Merge (นับส่วนที่เหลือของ merge)
stars: 2
tech: Merge sort (divide and conquer), Instrumented simulation
tech_th: Merge sort (divide and conquer), จำลองการทำงานพร้อมตัวนับ
complexity: O(N log N) time · O(N) memory
key: The question is about one specific algorithm, so run that algorithm exactly as written and count. Merge sort is O(N log N), fast enough for N = 200 000; the only care is to keep the pseudocode's tie rule (A[i] ≤ A[j] takes the left) because it decides which half runs out first.
key_th: โจทย์ถามถึงอัลกอริทึมตัวหนึ่งโดยเฉพาะ จึงรันอัลกอริทึมนั้นตามที่เขียนไว้ทุกบรรทัดแล้วนับ merge sort เป็น O(N log N) เร็วพอสำหรับ N = 200 000 สิ่งเดียวที่ต้องระวังคือใช้กฎเสมอตาม pseudocode (A[i] ≤ A[j] หยิบซ้าย) เพราะมันเป็นตัวกำหนดว่าครึ่งไหนหมดก่อน
tests: all 3 PDF samples, N = 1, 300 random arrays against a Python transcription of the pseudocode, and N = 200 000 random values in 0.04 s.
tests_th: ตัวอย่างทั้ง 3 ใน PDF, N = 1, สุ่มอาร์เรย์ 300 ชุดเทียบกับ Python ที่เขียนตาม pseudocode ทุกบรรทัด และ N = 200 000 ค่าสุ่ม ใช้ 0.04 วินาที
==== en
## Technique: merge sort, and "simulate when you can afford it"

Merge sort is the standard divide-and-conquer sort: sort the left half, sort the right half, merge the two sorted halves with two read pointers. The recursion has log₂ N levels and each level merges N elements in total, so it runs in O(N log N).

When a problem asks **how many times a line of a given algorithm runs**, the first thing to check is whether simply running the algorithm is fast enough. Here it is: N log N ≈ 3.6·10⁶ steps. So the cleanest correct answer is an instrumented copy of the pseudocode, with a counter on lines 11 and 14.

## How it maps onto this problem

### Step 1: what lines 11 and 14 are

In `merge`, the main loop (lines 3–9) runs while **both** halves have elements. When one half runs out, the other half's remaining elements are appended one by one: line 11 for the left half, line 14 for the right. So each merge adds

> (length of the half that did not run out) − (how many of its elements the main loop already took).

### Step 2: copy the tie rule exactly

Line 4 is `if A[i] ≤ A[j]`: on equal values the **left** element is taken. With equal values (like sample 3, all zeros) this makes the left half run out first and the whole right half becomes leftovers. Using `<` instead would give different counts, so the comparison must match the pseudocode.

```diagram
sample 3: 0 0 0 0 0 0 0      every merge empties the left half first
merge sizes (left,right): (1,1) x3 → 1 each = 3
                          (2,1) → 1   (2,2) → 2   (4,3) → 3      total 9
```

{{viz}}

### Step 3: implementation details

- One shared `buffer` of size N instead of a fresh `B` per call (same result, no allocations).
- `int` is enough for values up to 10⁹; the counter is at most N·log₂N ≈ 3.6·10⁶, but `long long` costs nothing.

:::warn Traps
- Counting the appends of the main loop too: only lines 11 and 14 count.
- Using `<` in the comparison: changes which half runs out on ties.
- Recursion is fine: depth is only log₂ N ≈ 18.
:::

## Solution

{{code}}

**Complexity.** The merge sort itself: **O(N log N)** time, **O(N)** extra memory for the buffer, recursion depth O(log N).

{{tested}}
==== th
## เทคนิค: merge sort และ "จำลองเมื่อทำได้ทัน"

Merge sort คือการเรียงแบบ divide and conquer มาตรฐาน: เรียงครึ่งซ้าย เรียงครึ่งขวา แล้วรวมสองครึ่งที่เรียงแล้วด้วยตัวชี้อ่านสองตัว recursion มี log₂ N ระดับ แต่ละระดับรวมข้อมูลทั้งหมด N ตัว จึงใช้เวลา O(N log N)

เมื่อโจทย์ถามว่า **บรรทัดหนึ่งของอัลกอริทึมที่กำหนดทำงานกี่ครั้ง** สิ่งแรกที่ต้องตรวจคือการรันอัลกอริทึมนั้นตรง ๆ เร็วพอไหม ในข้อนี้เร็วพอ: N log N ≈ 3.6·10⁶ ขั้น คำตอบที่ถูกและสะอาดที่สุดจึงเป็นสำเนาของ pseudocode ที่ติดตัวนับไว้ที่บรรทัด 11 และ 14

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: บรรทัด 11 และ 14 คืออะไร

ใน `merge` ลูปหลัก (บรรทัด 3–9) ทำงานขณะที่ **ทั้งสอง** ครึ่งยังมีข้อมูล เมื่อครึ่งหนึ่งหมด ข้อมูลที่เหลือของอีกครึ่งจะถูกต่อท้ายทีละตัว: บรรทัด 11 สำหรับครึ่งซ้าย บรรทัด 14 สำหรับครึ่งขวา แต่ละ merge จึงเพิ่ม

> (ความยาวของครึ่งที่ไม่หมด) − (จำนวนตัวของครึ่งนั้นที่ลูปหลักหยิบไปแล้ว)

### ขั้นที่ 2: ลอกกฎเสมอให้ตรง

บรรทัด 4 คือ `if A[i] ≤ A[j]`: เมื่อค่าเท่ากันจะหยิบตัว **ซ้าย** เมื่อมีค่าเท่ากัน (เช่นตัวอย่าง 3 ที่เป็นศูนย์ทั้งหมด) ครึ่งซ้ายจะหมดก่อน และครึ่งขวาทั้งหมดกลายเป็นส่วนที่เหลือ ถ้าใช้ `<` จะได้จำนวนต่างไป การเปรียบเทียบจึงต้องตรงกับ pseudocode

```diagram
ตัวอย่าง 3: 0 0 0 0 0 0 0      ทุก merge ครึ่งซ้ายหมดก่อน
ขนาด merge (ซ้าย,ขวา): (1,1) x3 → ครั้งละ 1 = 3
                       (2,1) → 1   (2,2) → 2   (4,3) → 3      รวม 9
```

{{viz}}

### ขั้นที่ 3: รายละเอียดการเขียน

- ใช้ `buffer` ขนาด N ตัวเดียวร่วมกัน แทนการสร้าง `B` ใหม่ทุกครั้ง (ผลเหมือนกัน ไม่ต้องจองหน่วยความจำซ้ำ)
- `int` พอสำหรับค่าถึง 10⁹ ตัวนับมีค่าไม่เกิน N·log₂N ≈ 3.6·10⁶ แต่ใช้ `long long` ก็ไม่เสียอะไร

:::warn กับดัก
- นับการต่อท้ายในลูปหลักด้วย: นับเฉพาะบรรทัด 11 และ 14
- ใช้ `<` ในการเปรียบเทียบ: เปลี่ยนว่าครึ่งไหนหมดก่อนเมื่อค่าเท่ากัน
- recursion ไม่มีปัญหา: ลึกแค่ log₂ N ≈ 18
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** ตัว merge sort เอง: เวลา **O(N log N)** หน่วยความจำเพิ่ม **O(N)** สำหรับ buffer ความลึก recursion O(log N)

{{tested}}
