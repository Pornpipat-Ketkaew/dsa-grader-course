title: One Two Apart
title_th: One Two Apart (1 กับ 2 ต้องห่างกัน)
stars: 3
tech: DP with states (last two values), Transition by a local rule
tech_th: DP แบบมีสถานะ (สองค่าสุดท้าย), เปลี่ยนสถานะตามกฎเฉพาะที่
complexity: O(27 n) time · O(1) memory
key: A new value must not clash with the values one and two positions back, so the state is the pair (previous, last). Count arrays per pair; append value v to (previous, last) when v clashes with neither, landing in state (last, v). Nine states, 27 checks per step.
key_th: ค่าใหม่ต้องไม่ชนกับค่าที่อยู่ก่อนหน้าหนึ่งและสองตำแหน่ง สถานะจึงเป็นคู่ (previous, last) นับอาร์เรย์แยกตามคู่ ต่อค่า v หลัง (previous, last) เมื่อ v ไม่ชนกับทั้งสองตัว แล้วไปอยู่ที่สถานะ (last, v) มี 9 สถานะ ตรวจ 27 ครั้งต่อก้าว
tests: all 5 PDF samples plus n = 2 (7, listed in the PDF), 12 random n against a brute force over all 3^n arrays, and n = 10^6 in 0.08 s.
tests_th: ตัวอย่างทั้ง 5 ใน PDF และ n = 2 (7 ตามที่ PDF แสดง) สุ่ม n 12 ค่าเทียบกับ brute force บนอาร์เรย์ทั้ง 3^n แบบ และ n = 10^6 ใช้ 0.08 วินาที
==== en
## Technique: choosing the state from the rule's reach

The rule "a 1 and a 2 may not be within distance 2" looks **two cells back**. So when appending a value, we must know the last **two** values, and nothing earlier matters. In general:

> rule reaches k positions back ⇒ state = the last k values (3^k states here).

Then it is the same machinery as [Table no 11](a64_q2_table_no_11.html): count per state, step by step.

## How it maps onto this problem

### Step 1: state and start

`ways[previous][last]` = number of valid arrays of the current length ending with `previous, last`. For length 2 every pair is allowed except `1,2` and `2,1`: 7 arrays, matching the PDF. n = 1 is handled separately (3 arrays).

### Step 2: transition

For each state `(previous, last)` and each new `value`:

> if `value` clashes neither with `previous` (distance 2) nor with `last` (distance 1), then `next[last][value] += ways[previous][last]`.

Pairs already inside the state were checked when they were created, so they never need re-checking.

{{viz}}

### Step 3: totals and modulo

The answer is the sum of all nine counts. Every addition is taken mod 100 000 007; values stay below 2·10⁸, safe in `long long`.

:::warn Traps
- Checking only the neighbor (distance 1) misses the "two apart" half: n = 3 would print 17 instead of 15 (it would allow 102 and 201).
- `1,1` and `2,2` and anything with 0 are fine; only 1–2 pairs clash.
:::

## Solution

{{code}}

**Complexity.** 9 states × 3 values per step: **O(27 n)** time, **O(1)** memory.

{{tested}}
==== th
## เทคนิค: เลือกสถานะจากระยะที่กฎมองไปถึง

กฎ "1 กับ 2 ห้ามอยู่ห่างกันไม่เกิน 2" มองย้อนไป **สองช่อง** ตอนต่อค่าใหม่เราจึงต้องรู้ค่า **สองตัว** สุดท้าย และค่าก่อนหน้านั้นไม่มีผล โดยทั่วไป:

> กฎมองย้อนไป k ตำแหน่ง ⇒ สถานะ = k ค่าสุดท้าย (ในข้อนี้มี 3^k สถานะ)

จากนั้นก็เป็นกลไกเดียวกับ [Table no 11](a64_q2_table_no_11.html): นับแยกตามสถานะ ทีละก้าว

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: สถานะและจุดเริ่ม

`ways[previous][last]` = จำนวนอาร์เรย์ที่ถูกต้องในความยาวปัจจุบันที่จบด้วย `previous, last` เมื่อยาว 2 ทุกคู่ใช้ได้ยกเว้น `1,2` และ `2,1`: 7 แบบ ตรงกับ PDF ส่วน n = 1 แยกกรณีไว้ (3 แบบ)

### ขั้นที่ 2: การเปลี่ยนสถานะ

สำหรับแต่ละสถานะ `(previous, last)` และค่าใหม่ `value`:

> ถ้า `value` ไม่ชนกับ `previous` (ระยะ 2) และไม่ชนกับ `last` (ระยะ 1) แล้ว `next[last][value] += ways[previous][last]`

คู่ที่อยู่ในสถานะแล้วถูกตรวจไปตอนสร้าง จึงไม่ต้องตรวจซ้ำ

{{viz}}

### ขั้นที่ 3: ผลรวมและมอดุโล

คำตอบคือผลรวมของทั้งเก้าค่า ทุกการบวก mod 100 000 007 ค่าไม่เกิน 2·10⁸ ปลอดภัยใน `long long`

:::warn กับดัก
- ตรวจแค่ตัวที่ติดกัน (ระยะ 1) จะพลาดครึ่ง "ห่างสองช่อง": n = 3 จะพิมพ์ 17 แทน 15 (ยอมให้ 102 และ 201)
- `1,1` และ `2,2` และทุกคู่ที่มี 0 ใช้ได้ มีแค่คู่ 1–2 ที่ชนกัน
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** 9 สถานะ × 3 ค่าต่อก้าว: เวลา **O(27 n)** หน่วยความจำ **O(1)**

{{tested}}
