title: Virus Outbreak 2 (DIVOC-20)
title_th: ไวรัสระบาด 2 (DIVOC-20)
stars: 2
tech: Divide and conquer recognition, Return extra information (count of 1s) to the parent
tech_th: ตรวจสอบแบบ divide and conquer, คืนข้อมูลเพิ่ม (จำนวนเลข 1) ให้ตัวแม่
complexity: O(L) per code, L = 2^k ≤ 1024 · O(k) stack
key: A code is valid iff both halves are valid and their counts of 1s differ by at most 1. Let the recursive check return the count of 1s (or INVALID), so the parent gets both facts it needs from one call per half.
key_th: รหัสถูกต้องก็ต่อเมื่อทั้งสองครึ่งถูกต้องและจำนวนเลข 1 ของสองครึ่งต่างกันไม่เกิน 1 ให้ฟังก์ชันตรวจคืนจำนวนเลข 1 (หรือ INVALID) ตัวแม่จึงได้ข้อมูลที่ต้องการทั้งสองอย่างจากการเรียกครึ่งละครั้งเดียว
tests: all 3 PDF samples, 300 random codes (k ≤ 6) against a brute force, and 15 random valid codes with k = 10, all accepted.
tests_th: ตัวอย่างทั้ง 3 ใน PDF สุ่มรหัส 300 ชุด (k ≤ 6) เทียบกับ brute force และรหัสที่ถูกต้องแบบสุ่ม 15 ชุดที่ k = 10 ต้องตอบ yes ทั้งหมด
==== en
## Technique: divide and conquer that returns more than yes/no

Checking a recursively defined object splits the range in half, checks both halves, and combines them. Often the combine step needs **a property of each half** (here: its number of 1s). Computing that property separately would rescan the range at every level and cost O(L log L).

The standard fix is to let the recursive function **return the property** along with validity. One common encoding: return the value when valid, and a sentinel (here `INVALID = −1`) when not.

## How it maps onto this problem

### Step 1: the rule

A virus of length L is `a + b` with `a`, `b` viruses of length L/2 and `|ones(a) − ones(b)| ≤ 1`. Every code of length 2 is a virus.

### Step 2: one function, two answers

```cpp
onesIfVirus(left, right):
    length 2           → return code[left] + code[left+1]
    leftOnes  = onesIfVirus(left, middle);   if INVALID → INVALID
    rightOnes = onesIfVirus(middle, right);  if INVALID → INVALID
    |leftOnes − rightOnes| > 1               → INVALID
    return leftOnes + rightOnes
```

The count of the whole range is just the sum of the halves, so it comes for free.

{{viz}}

### Step 3: cost

Each call does O(1) work besides two calls on half the range: T(L) = 2·T(L/2) + O(1) = **O(L)**. Returning early on INVALID skips the right half entirely.

:::warn Traps
- The rule compares the halves at **every** level, not only the top.
- Do not count the 1s with a loop inside each call: correct, but O(L log L) and it misses the point of the technique.
:::

## Solution

{{code}}

**Complexity.** O(L) per code with L = 2^k ≤ 1024, at most 15 codes. Memory: the code plus a recursion of depth k: **O(L)**.

{{tested}}
==== th
## เทคนิค: divide and conquer ที่คืนมากกว่า yes/no

การตรวจวัตถุที่นิยามแบบ recursive จะแบ่งช่วงครึ่งหนึ่ง ตรวจทั้งสองครึ่ง แล้วรวมผล บ่อยครั้งขั้นการรวมต้องใช้ **คุณสมบัติของแต่ละครึ่ง** (ในข้อนี้คือจำนวนเลข 1) ถ้าคำนวณคุณสมบัตินั้นแยก จะต้องสแกนช่วงซ้ำทุกระดับ เสีย O(L log L)

วิธีมาตรฐานคือให้ฟังก์ชัน recursive **คืนคุณสมบัตินั้น** พร้อมกับความถูกต้อง การเข้ารหัสที่ใช้บ่อย: คืนค่าเมื่อถูกต้อง และคืนค่าพิเศษ (ในข้อนี้ `INVALID = −1`) เมื่อไม่ถูกต้อง

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: กฎ

ไวรัสยาว L คือ `a + b` โดย `a`, `b` เป็นไวรัสยาว L/2 และ `|ones(a) − ones(b)| ≤ 1` รหัสยาว 2 ทุกแบบเป็นไวรัส

### ขั้นที่ 2: ฟังก์ชันเดียว สองคำตอบ

```cpp
onesIfVirus(left, right):
    ยาว 2              → return code[left] + code[left+1]
    leftOnes  = onesIfVirus(left, middle);   ถ้า INVALID → INVALID
    rightOnes = onesIfVirus(middle, right);  ถ้า INVALID → INVALID
    |leftOnes − rightOnes| > 1               → INVALID
    return leftOnes + rightOnes
```

จำนวนเลข 1 ของทั้งช่วงคือผลบวกของสองครึ่ง จึงได้มาฟรี

{{viz}}

### ขั้นที่ 3: ค่าใช้จ่าย

แต่ละการเรียกทำงาน O(1) นอกจากการเรียกสองครั้งบนช่วงครึ่งหนึ่ง: T(L) = 2·T(L/2) + O(1) = **O(L)** การคืนค่าทันทีเมื่อ INVALID ทำให้ข้ามครึ่งขวาไปได้ทั้งหมด

:::warn กับดัก
- กฎเปรียบเทียบสองครึ่งใน **ทุก** ระดับ ไม่ใช่แค่ระดับบนสุด
- อย่านับเลข 1 ด้วยลูปในทุกการเรียก: ถูกแต่เป็น O(L log L) และพลาดจุดประสงค์ของเทคนิคนี้
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** O(L) ต่อรหัส โดย L = 2^k ≤ 1024 ไม่เกิน 15 รหัส หน่วยความจำ: รหัสและ recursion ลึก k: **O(L)**

{{tested}}
