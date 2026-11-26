title: Chocolate
title_th: ช็อกโกแลต (Chocolate)
stars: 2
tech: Counting DP (ordered compositions), Decide by the last step
tech_th: DP นับวิธี (ลำดับที่เรียงตามลำดับสำคัญ), แบ่งกรณีตามก้าวสุดท้าย
complexity: O(n · k) time · O(n) memory
key: Split all eating plans of a bar of length L by what was eaten on the last day: if it was s pieces, the earlier days ate a bar of length L − s in any valid way. So ways[L] = Σ ways[L − s] over allowed s ≤ L, with ways[0] = 1, filled for L = 1..n.
key_th: แบ่งทุกแผนการกินแท่งยาว L ตามจำนวนที่กินในวันสุดท้าย: ถ้ากิน s ชิ้น วันก่อนหน้าก็กินแท่งยาว L − s ด้วยวิธีที่ถูกต้องใดก็ได้ ดังนั้น ways[L] = Σ ways[L − s] สำหรับ s ที่ยอมได้และ ≤ L โดย ways[0] = 1 เติมสำหรับ L = 1..n
tests: all 4 PDF samples, 300 random cases against a brute force that enumerates plans, and n = 10 000 with S = {1..10} against Python.
tests_th: ตัวอย่างทั้ง 4 ใน PDF สุ่ม 300 ชุดเทียบกับ brute force ที่แจกแจงทุกแผน และ n = 10 000 กับ S = {1..10} เทียบกับ Python
==== en
## Technique: counting DP by the last decision

To **count** objects built from a sequence of choices, split them into disjoint groups by the **last** choice. Each group is "a smaller object, then that last choice", so its size is the count for the smaller object. Summing over the groups gives the recurrence. Because the groups are disjoint and cover everything, nothing is double-counted or missed.

## How it maps onto this problem

### Step 1: the state

`ways[length]` = number of different eating records for a bar of exactly `length` pieces.

### Step 2: the recurrence

On the last day some allowed `s ≤ length` pieces are eaten; before that, a bar of `length − s` was eaten in any valid way:

> `ways[length] = Σ ways[length − s]` over allowed s ≤ length, and `ways[0] = 1`.

`ways[0] = 1` is the empty plan: once the bar is gone there is exactly one way to continue, by stopping. Order matters here ([1,3] and [3,1] are different records), and splitting by the last day counts ordered sequences, which is exactly what is wanted.

```diagram
S = {1, 3}:  ways = 1 1 1 2 3 4 6 ...
                    0 1 2 3 4 5 6       ways[4] = ways[3] + ways[1] = 2 + 1 = 3
```

{{viz}}

### Step 3: modulo

The counts grow exponentially, so add modulo 1 000 003 every time. Two values below the modulus add to less than 2 100 000, safe in `int`.

:::warn Traps
- `ways[0]` must be 1, not 0.
- Only sizes `s ≤ length` may be used.
- With S = {1, 2} the answer is a Fibonacci number (sample 2: 89).
:::

## Solution

{{code}}

**Complexity.** n lengths × k sizes: **O(n · k)** ≤ 10⁵. Memory: **O(n)**.

{{tested}}
==== th
## เทคนิค: DP นับวิธีโดยแบ่งตามการตัดสินใจครั้งสุดท้าย

เพื่อ **นับ** สิ่งที่สร้างจากลำดับของการเลือก ให้แบ่งเป็นกลุ่มที่ไม่ทับกันตามการเลือก **ครั้งสุดท้าย** แต่ละกลุ่มคือ "สิ่งที่เล็กกว่า แล้วตามด้วยการเลือกสุดท้ายนั้น" ขนาดของกลุ่มจึงเท่ากับจำนวนของสิ่งที่เล็กกว่า ผลรวมของทุกกลุ่มคือสูตรเวียนเกิด เพราะกลุ่มไม่ทับกันและครอบคลุมทุกแบบ จึงไม่นับซ้ำและไม่ตกหล่น

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: สถานะ

`ways[length]` = จำนวนบันทึกการกินที่ต่างกันสำหรับแท่งยาว `length` ชิ้นพอดี

### ขั้นที่ 2: สูตรเวียนเกิด

วันสุดท้ายกิน `s ≤ length` ชิ้นที่ยอมได้ ก่อนหน้านั้นกินแท่งยาว `length − s` ด้วยวิธีที่ถูกต้องใดก็ได้:

> `ways[length] = Σ ways[length − s]` สำหรับ s ที่ยอมได้และ ≤ length และ `ways[0] = 1`

`ways[0] = 1` คือแผนว่าง: เมื่อแท่งหมดแล้วมีวิธีเดียวคือหยุด ในข้อนี้ลำดับสำคัญ ([1,3] กับ [3,1] เป็นบันทึกต่างกัน) และการแบ่งตามวันสุดท้ายนับลำดับที่เรียงตามลำดับสำคัญ ซึ่งตรงกับที่ต้องการพอดี

```diagram
S = {1, 3}:  ways = 1 1 1 2 3 4 6 ...
                    0 1 2 3 4 5 6       ways[4] = ways[3] + ways[1] = 2 + 1 = 3
```

{{viz}}

### ขั้นที่ 3: มอดุโล

จำนวนวิธีโตแบบเลขชี้กำลัง จึงบวกแบบ mod 1 000 003 ทุกครั้ง สองค่าที่ต่ำกว่าตัวหารบวกกันได้ไม่ถึง 2 100 000 ปลอดภัยใน `int`

:::warn กับดัก
- `ways[0]` ต้องเป็น 1 ไม่ใช่ 0
- ใช้ได้เฉพาะขนาด `s ≤ length`
- เมื่อ S = {1, 2} คำตอบคือเลขฟีโบนัชชี (ตัวอย่าง 2: 89)
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** n ความยาว × k ขนาด: **O(n · k)** ≤ 10⁵ หน่วยความจำ: **O(n)**

{{tested}}
