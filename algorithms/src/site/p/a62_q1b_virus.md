title: Virus Check (DIVOC)
title_th: ตรวจไวรัส (DIVOC)
stars: 2
tech: Divide and conquer recognition, Mutual recursion (virus / reversed virus)
tech_th: ตรวจสอบแบบ divide and conquer, recursion ไขว้กัน (ไวรัส / ไวรัสกลับด้าน)
complexity: O(L^1.59) per code, L = 2^k ≤ 256 · O(k) stack
key: Read the building rule backwards: a code of length L is a virus iff its right half is a virus and its left half is a virus or a reversed virus. "Reversed virus" needs its own test, and reversing a + b gives reverse(b) + reverse(a), which yields a second rule of the same shape.
key_th: อ่านกฎการสร้างย้อนกลับ: รหัสยาว L เป็นไวรัสก็ต่อเมื่อครึ่งขวาเป็นไวรัส และครึ่งซ้ายเป็นไวรัสหรือไวรัสกลับด้าน "ไวรัสกลับด้าน" ต้องมีฟังก์ชันตรวจของตัวเอง และการกลับ a + b ได้ reverse(b) + reverse(a) ซึ่งให้กฎที่สองที่มีรูปแบบเดียวกัน
tests: all 4 PDF samples, the PDF table (exactly 6 viruses of length 8), 300 random codes (k ≤ 5) against a brute force that generates every virus, and 10 random viruses with k = 8, all accepted.
tests_th: ตัวอย่างทั้ง 4 ใน PDF ตารางใน PDF (ไวรัสยาว 8 มี 6 แบบพอดี) สุ่มรหัส 300 ชุด (k ≤ 5) เทียบกับ brute force ที่สร้างไวรัสทุกแบบ และไวรัสสุ่ม 10 ตัวที่ k = 8 ต้องตอบ yes ทั้งหมด
==== en
## Technique: recognize a recursive structure by splitting in the middle

When an object of size 2^k is **defined** as two objects of size 2^(k−1) joined together, checking it is divide and conquer:

1. split the range `left .. right−1` at `middle`;
2. check each half recursively;
3. combine the two answers by the joining rule.

The base case is the smallest size in the definition. The recursion depth is k and the ranges are index pairs, so nothing is copied.

## How it maps onto this problem

### Step 1: the rule, read backwards

A virus of length L is `a' + b` where `a` and `b` are viruses of length L/2 and `a'` is `a` or `reverse(a)`. So

> **isVirus(range)** = isVirus(right half) AND (isVirus(left half) OR isReversedVirus(left half)), and for length 2 it must be exactly `0 1`.

### Step 2: what is a "reversed virus"?

`isReversedVirus(range)` means "this range read backwards is a virus". Reverse the definition:

```diagram
virus          =  a'           +  b
reversed virus =  reverse(b)   +  reverse(a')
                  ^ left half     ^ right half
left  half: reverse(b)  → must be a REVERSED virus
right half: reverse(a') → a' was a or reverse(a), so this is reverse(a) or a:
                          a reversed virus OR a virus
```

> **isReversedVirus(range)** = isReversedVirus(left half) AND (isVirus(right half) OR isReversedVirus(right half)), and for length 2 it must be exactly `1 0`.

The two functions call each other: **mutual recursion**. C++ needs a declaration of the second function before the first one uses it.

{{viz}}

### Step 3: cost

Each call makes at most 3 recursive calls on half the length (the `&&` and `||` short-circuit often make it fewer), so T(L) = 3·T(L/2) + O(1) = O(L^log₂3) ≈ O(L^1.59). For L = 256 that is at most 3^8 = 6 561 calls per code.

:::warn Traps
- Mutation applies only to the **left** part `a`. Allowing the right half to be reversed accepts codes that are not viruses (for example `0 1 1 0`).
- The reversed check is not "reverse the array and call isVirus" on every level; that would copy arrays. The rule above works on the same ranges.
:::

## Solution

{{code}}

**Complexity.** O(L^1.59) per code with L = 2^k ≤ 256, at most 10 codes. Memory: the code plus a recursion of depth k: **O(L)**.

{{tested}}
==== th
## เทคนิค: ตรวจโครงสร้าง recursive โดยแบ่งตรงกลาง

เมื่อวัตถุขนาด 2^k ถูก **นิยาม** ว่าเป็นวัตถุขนาด 2^(k−1) สองตัวต่อกัน การตรวจมันก็คือ divide and conquer:

1. แบ่งช่วง `left .. right−1` ที่ `middle`
2. ตรวจแต่ละครึ่งแบบ recursive
3. รวมคำตอบทั้งสองด้วยกฎการต่อ

กรณีฐานคือขนาดเล็กที่สุดในนิยาม ความลึกของ recursion คือ k และช่วงเป็นคู่ดัชนี จึงไม่มีการคัดลอกอะไรเลย

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: อ่านกฎย้อนกลับ

ไวรัสยาว L คือ `a' + b` โดย `a` และ `b` เป็นไวรัสยาว L/2 และ `a'` คือ `a` หรือ `reverse(a)` ดังนั้น

> **isVirus(ช่วง)** = isVirus(ครึ่งขวา) AND (isVirus(ครึ่งซ้าย) OR isReversedVirus(ครึ่งซ้าย)) และเมื่อยาว 2 ต้องเป็น `0 1` พอดี

### ขั้นที่ 2: "ไวรัสกลับด้าน" คืออะไร?

`isReversedVirus(ช่วง)` หมายถึง "ช่วงนี้อ่านย้อนหลังแล้วเป็นไวรัส" กลับนิยาม:

```diagram
ไวรัส          =  a'           +  b
ไวรัสกลับด้าน  =  reverse(b)   +  reverse(a')
                  ^ ครึ่งซ้าย      ^ ครึ่งขวา
ครึ่งซ้าย: reverse(b)  → ต้องเป็นไวรัสกลับด้าน
ครึ่งขวา: reverse(a') → a' คือ a หรือ reverse(a) อันนี้จึงเป็น reverse(a) หรือ a:
                        ไวรัสกลับด้าน หรือ ไวรัส
```

> **isReversedVirus(ช่วง)** = isReversedVirus(ครึ่งซ้าย) AND (isVirus(ครึ่งขวา) OR isReversedVirus(ครึ่งขวา)) และเมื่อยาว 2 ต้องเป็น `1 0` พอดี

ฟังก์ชันทั้งสองเรียกกันไปมา: **mutual recursion** ใน C++ ต้องประกาศฟังก์ชันที่สองก่อนที่ฟังก์ชันแรกจะใช้

{{viz}}

### ขั้นที่ 3: ค่าใช้จ่าย

แต่ละการเรียกเรียกตัวเองไม่เกิน 3 ครั้งบนความยาวครึ่งหนึ่ง (`&&` และ `||` แบบ short-circuit มักทำให้น้อยกว่านั้น) T(L) = 3·T(L/2) + O(1) = O(L^log₂3) ≈ O(L^1.59) เมื่อ L = 256 ไม่เกิน 3^8 = 6 561 การเรียกต่อรหัส

:::warn กับดัก
- การกลายพันธุ์เกิดกับส่วน **ซ้าย** `a` เท่านั้น ถ้ายอมให้ครึ่งขวากลับด้านได้ จะรับรหัสที่ไม่ใช่ไวรัส (เช่น `0 1 1 0`)
- การตรวจกลับด้านไม่ใช่ "กลับอาร์เรย์แล้วเรียก isVirus" ในทุกระดับ เพราะต้องคัดลอกอาร์เรย์ กฎด้านบนทำงานบนช่วงเดิมได้เลย
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** O(L^1.59) ต่อรหัส โดย L = 2^k ≤ 256 ไม่เกิน 10 รหัส หน่วยความจำ: รหัสและ recursion ลึก k: **O(L)**

{{tested}}
