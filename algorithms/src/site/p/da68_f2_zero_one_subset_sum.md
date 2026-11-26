title: 0-1 Subset Sum
title_th: 0-1 Subset Sum (แทนเลข 1 ให้ผลรวมพอดี)
stars: 2
tech: Counting DP (items × sum), Ignore what does not matter (the zeros)
tech_th: DP นับวิธี (จำนวนชิ้น × ผลรวม), ตัดสิ่งที่ไม่มีผลทิ้ง (เลข 0)
complexity: O(ones · S · K) time ≤ 22 500 · O(S) memory
key: Zeros contribute nothing and positions of the 1s do not matter, so the question is: in how many ways can `ones` values, each 1..K, add up to S? Fill the 1s one at a time: ways after f ones at sum s = Σ_{x=1..K} ways after f−1 ones at sum s − x.
key_th: เลข 0 ไม่มีผลและตำแหน่งของเลข 1 ไม่สำคัญ คำถามจึงเป็น: ค่า `ones` ตัว ตัวละ 1..K รวมกันได้ S กี่วิธี? แทนเลข 1 ทีละตัว: จำนวนวิธีหลังแทน f ตัวที่ผลรวม s = Σ_{x=1..K} จำนวนวิธีหลังแทน f−1 ตัวที่ผลรวม s − x
tests: both PDF samples, an all-zero array (0 ways), 300 random cases against a brute force over all fillings, and N = 15 ones with K = 10, S = 82 against Python.
tests_th: ตัวอย่างทั้งสองใน PDF อาร์เรย์ที่เป็น 0 ทั้งหมด (0 วิธี) สุ่ม 300 ชุดเทียบกับ brute force ที่ลองทุกการแทน และเลข 1 ทั้ง 15 ตัวกับ K = 10, S = 82 เทียบกับ Python
==== en
## Technique: counting DP over (items processed, running sum)

When each of several independent positions takes one of a few values and we count the assignments with a given total, the state is "how many positions are decided, and what is the sum so far". Each new position spreads every count to the sums `sum + value`. This is the same idea as counting dice totals.

## How it maps onto this problem

### Step 1: reduce the input

A 0 stays 0 and adds nothing. A 1 becomes some value 1..K. So only `ones`, the number of 1s, matters. Sample 2: three 1s, values 1..7, total 6.

### Step 2: the recurrence

> `ways_f[s] = Σ_{x = 1..min(K, s)} ways_{f−1}[s − x]`, with `ways_0[0] = 1`.

The code keeps one row `ways` and builds the next row in `next`. A fresh row per step is what makes every 1 take **exactly one** value (reusing the same row in place would let one 1 take several values).

{{viz}}

### Step 3: sizes

At most 10¹⁵ assignments (K^15), so `long long`. The work is ones × S × K ≤ 15 × 150 × 10.

:::warn Traps
- An array of only 0s has sum 0 and S > 0, so the answer is 0.
- Each 1 must become at least 1: the value range starts at 1, not 0.
:::

## Solution

{{code}}

**Complexity.** **O(ones · S · K)** ≤ 22 500 steps. Memory: two rows of length S + 1: **O(S)**.

{{tested}}
==== th
## เทคนิค: DP นับวิธีบน (จำนวนชิ้นที่จัดการแล้ว, ผลรวมสะสม)

เมื่อแต่ละตำแหน่งที่เป็นอิสระต่อกันรับค่าได้ไม่กี่แบบ และเราต้องการนับการกำหนดค่าที่ได้ผลรวมที่กำหนด สถานะคือ "ตัดสินใจไปแล้วกี่ตำแหน่ง และผลรวมตอนนี้เท่าไร" ตำแหน่งใหม่แต่ละตัวกระจายจำนวนวิธีไปยังผลรวม `sum + value` เหมือนการนับผลรวมของการทอยลูกเต๋า

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: ลดรูปอินพุต

เลข 0 ยังคงเป็น 0 และไม่เพิ่มอะไร เลข 1 กลายเป็นค่า 1..K สิ่งที่สำคัญจึงมีแค่ `ones` คือจำนวนเลข 1 ตัวอย่าง 2: เลข 1 สามตัว ค่า 1..7 ผลรวม 6

### ขั้นที่ 2: สูตรเวียนเกิด

> `ways_f[s] = Σ_{x = 1..min(K, s)} ways_{f−1}[s − x]` โดย `ways_0[0] = 1`

โค้ดเก็บแถวเดียว `ways` แล้วสร้างแถวถัดไปใน `next` การใช้แถวใหม่ทุกก้าวคือสิ่งที่ทำให้เลข 1 แต่ละตัวรับค่า **ได้ค่าเดียวพอดี** (ถ้าเขียนทับแถวเดิม เลข 1 ตัวเดียวจะรับหลายค่าได้)

{{viz}}

### ขั้นที่ 3: ขนาดตัวเลข

มีการกำหนดค่าไม่เกิน 10¹⁵ แบบ (K^15) จึงใช้ `long long` งานทั้งหมดคือ ones × S × K ≤ 15 × 150 × 10

:::warn กับดัก
- อาร์เรย์ที่เป็น 0 ทั้งหมดมีผลรวม 0 และ S > 0 คำตอบจึงเป็น 0
- เลข 1 แต่ละตัวต้องเป็นอย่างน้อย 1: ช่วงค่าเริ่มที่ 1 ไม่ใช่ 0
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** **O(ones · S · K)** ≤ 22 500 ขั้น หน่วยความจำ: สองแถวยาว S + 1: **O(S)**

{{tested}}
