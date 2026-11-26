title: Table no 11
title_th: Table no 11 (ตารางที่ไม่มี 1 ติดกัน)
stars: 2
tech: DP with states (last column), State transition graph, O(1) memory rolling variables
tech_th: DP แบบมีสถานะ (คอลัมน์สุดท้าย), กราฟการเปลี่ยนสถานะ, ตัวแปรหมุนเวียนหน่วยความจำ O(1)
complexity: O(n) time · O(1) memory
key: Build the table column by column. Only the last column decides what may come next, and a column can be 0/0, 1/0 or 0/1 (1/1 is forbidden). Count tables by the state of their last column: 0/0 follows anything, 1/0 follows 0/0 or 0/1, 0/1 follows 0/0 or 1/0.
key_th: สร้างตารางทีละคอลัมน์ มีแค่คอลัมน์สุดท้ายที่กำหนดว่าคอลัมน์ถัดไปเป็นอะไรได้ และคอลัมน์หนึ่งเป็น 0/0, 1/0 หรือ 0/1 (1/1 ห้าม) นับตารางแยกตามสถานะของคอลัมน์สุดท้าย: 0/0 ต่อหลังอะไรก็ได้ 1/0 ต่อหลัง 0/0 หรือ 0/1 และ 0/1 ต่อหลัง 0/0 หรือ 1/0
tests: the counts in the PDF (n = 2 → 7, n = 3 → 17), all 3 PDF samples, a brute force over all 4^n tables for n = 1..9, and n = 10^7 against a Python loop.
tests_th: จำนวนใน PDF (n = 2 → 7, n = 3 → 17) ตัวอย่างทั้ง 3 ใน PDF, brute force บนตารางทั้ง 4^n แบบเมื่อ n = 1..9 และ n = 10^7 เทียบกับลูปใน Python
==== en
## Technique: DP over a small set of states

Many counting problems on long sequences have a **local rule** ("no two adjacent 1s", "no 1 near a 2"). Then the only thing the future needs to know about the prefix built so far is a small piece of its end: the **state**. Count prefixes per state, and move from length L to L + 1 with a transition table:

> `count_{L+1}[newState] = Σ count_L[oldState]` over allowed pairs (oldState → newState).

The number of states is tiny, so the whole DP is O(n · states²) time and O(states) memory.

## How it maps onto this problem

### Step 1: what is a state?

Read the table column by column. A column has two cells; `1/1` already breaks the rule (the two 1s are adjacent vertically). So a column is one of

> `0/0` (empty), `1/0` (top 1), `0/1` (bottom 1).

Horizontal adjacency only involves the previous column, so the last column is the whole state.

### Step 2: transitions

- `0/0` may follow any column;
- `1/0` may follow `0/0` or `0/1` (not another top 1);
- `0/1` may follow `0/0` or `1/0`.

```diagram
length 1:  empty 1, top 1, bottom 1            total 3
length 2:  empty 3, top 2, bottom 2            total 7   (matches the PDF)
length 3:  empty 7, top 5, bottom 5            total 17
```

{{viz}}

### Step 3: memory and speed

Each step needs only the three previous counts, so three variables replace the table. n = 10⁷ steps of a few additions each take about 0.05 s. Take everything mod 100 000 007 (sums of three values stay below 3.1·10⁸, fine in `long long`).

:::warn Trap
The PDF forbids hard-coding answers. The DP computes every n, so it is the honest solution and is fast enough for n = 10⁷.
:::

## Solution

{{code}}

**Complexity.** **O(n)** time with 3 states, **O(1)** memory.

{{tested}}
==== th
## เทคนิค: DP บนสถานะจำนวนน้อย

โจทย์นับวิธีบนลำดับยาว ๆ หลายข้อมี **กฎเฉพาะที่** ("ไม่มี 1 สองตัวติดกัน", "ไม่มี 1 ใกล้ 2") สิ่งเดียวที่อนาคตต้องรู้เกี่ยวกับ prefix ที่สร้างแล้วคือส่วนเล็ก ๆ ที่ปลายของมัน: **สถานะ** นับ prefix แยกตามสถานะ แล้วขยับจากความยาว L ไป L + 1 ด้วยตารางการเปลี่ยนสถานะ:

> `count_{L+1}[newState] = Σ count_L[oldState]` สำหรับคู่ที่อนุญาต (oldState → newState)

จำนวนสถานะน้อยมาก DP ทั้งหมดจึงใช้เวลา O(n · states²) และหน่วยความจำ O(states)

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: สถานะคืออะไร?

อ่านตารางทีละคอลัมน์ คอลัมน์หนึ่งมีสองช่อง `1/1` ผิดกฎทันที (1 สองตัวติดกันในแนวตั้ง) คอลัมน์จึงเป็นหนึ่งใน

> `0/0` (ว่าง), `1/0` (1 ด้านบน), `0/1` (1 ด้านล่าง)

การติดกันในแนวนอนเกี่ยวกับคอลัมน์ก่อนหน้าเท่านั้น คอลัมน์สุดท้ายจึงเป็นสถานะทั้งหมด

### ขั้นที่ 2: การเปลี่ยนสถานะ

- `0/0` ต่อหลังคอลัมน์ใดก็ได้
- `1/0` ต่อหลัง `0/0` หรือ `0/1` (ไม่ต่อหลัง 1 ด้านบน)
- `0/1` ต่อหลัง `0/0` หรือ `1/0`

```diagram
ยาว 1:  ว่าง 1, บน 1, ล่าง 1            รวม 3
ยาว 2:  ว่าง 3, บน 2, ล่าง 2            รวม 7   (ตรงกับ PDF)
ยาว 3:  ว่าง 7, บน 5, ล่าง 5            รวม 17
```

{{viz}}

### ขั้นที่ 3: หน่วยความจำและความเร็ว

แต่ละก้าวต้องใช้แค่จำนวนสามค่าก่อนหน้า ตัวแปรสามตัวจึงแทนตารางได้ n = 10⁷ ก้าว ก้าวละไม่กี่การบวก ใช้ราว 0.05 วินาที mod 100 000 007 ทุกครั้ง (ผลบวกสามค่าไม่เกิน 3.1·10⁸ ปลอดภัยใน `long long`)

:::warn กับดัก
PDF ห้ามจำคำตอบไว้ล่วงหน้า DP คำนวณทุก n จึงเป็นคำตอบที่ถูกต้องตามกติกาและเร็วพอสำหรับ n = 10⁷
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** เวลา **O(n)** มี 3 สถานะ หน่วยความจำ **O(1)**

{{tested}}
