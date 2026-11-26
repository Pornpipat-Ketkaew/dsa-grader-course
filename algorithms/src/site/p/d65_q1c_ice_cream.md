title: Saving for Ice Cream
title_th: Saving for Ice Cream (เก็บเงินซื้อไอศกรีม)
stars: 2
tech: Prefix sums over days (piecewise-constant rate), Turn the scam into a higher target, Binary search for the first day reaching it (lower_bound)
tech_th: ผลรวมสะสมรายวัน (อัตราคงที่เป็นช่วง ๆ), เปลี่ยนการโดนหลอกเป็นเป้าที่สูงขึ้น, Binary search หาวันแรกที่ถึงเป้า (lower_bound)
complexity: O(D + n + m log D) time with D = 100 001 days · O(D) memory
key: Build savedBy[day] once (a prefix sum of the daily rate). For a query (P, x): if savedBy[x] ≥ P he buys before the scam and the target is P; otherwise the savedBy[x] baht are lost and he needs savedBy ≥ P + savedBy[x]. savedBy strictly increases, so the first day reaching the target is a lower_bound.
key_th: สร้าง savedBy[day] ครั้งเดียว (ผลรวมสะสมของอัตรารายวัน) สำหรับคำถาม (P, x): ถ้า savedBy[x] ≥ P เขาซื้อก่อนโดนหลอก เป้าคือ P ไม่เช่นนั้นเงิน savedBy[x] บาทหายไป และต้องมี savedBy ≥ P + savedBy[x] savedBy เพิ่มขึ้นเสมอ วันแรกที่ถึงเป้าจึงเป็น lower_bound
tests: all 3 PDF samples (including unsorted change days), 300 random cases against a day-by-day simulation, and n = 40 000, m = 100 000 in 0.03 s.
tests_th: ตัวอย่างทั้ง 3 ใน PDF (รวมวันเปลี่ยนที่ไม่เรียง) สุ่ม 300 ชุดเทียบกับการจำลองทีละวัน และ n = 40 000, m = 100 000 ใช้ 0.03 วินาที
==== en
## Technique: prefix sums turn "when does the total reach T?" into a search

If a quantity is accumulated day by day with non-negative amounts, its running total `total[d]` never decreases. Then "on which day does the total first reach T?" is the first d with `total[d] ≥ T`: `lower_bound(total, T)`.

The art is to rewrite each question so that it becomes exactly that form.

## How it maps onto this problem

### Step 1: savedBy for every day

The days only go up to 100 000 (answers and scam days are bounded by it), so simply compute the money for **every** day once:

- `rateFrom[day]` = the new rate starting that day (the change days arrive in any order, so store them by day);
- walk the days forward, switch the rate when a change starts, and `savedBy[day] = savedBy[day − 1] + rate`.

### Step 2: the scam becomes a target

On the scam day x he saves, then (if he can) buys, then loses everything.

- **savedBy[x] ≥ P**: he reaches P on or before day x, before any loss. Target = P.
- **savedBy[x] < P**: everything he had on day x (savedBy[x]) is gone. From day x + 1 he has `savedBy[d] − savedBy[x]`, and he needs that ≥ P. Target = **P + savedBy[x]**.

Either way: the answer is the first day with savedBy ≥ target.

```diagram
sample 2: rates 3 3 3 3 2 2 5 5 5 …   savedBy 3 6 9 12 14 16 21 26 31 …
P = 12, x = 3: savedBy[3] = 12 ≥ 12  → target 12 → day 3
P = 13, x = 3: savedBy[3] = 12 < 13  → target 25 → day 7 (26)
```

{{viz}}

### Step 3: search

Every rate is ≥ 1, so savedBy strictly increases and `lower_bound(savedBy, target)` is the answer. Values stay below 2³⁰ + 10⁸, but `long long` costs nothing here.

:::warn Traps
- Treating the scam day as lost even when he already had enough that day (the samples with P = 11, 12 check this).
- Forgetting that the change days are not sorted (sample 3).
- Simulating each query day by day: 10⁵ · 10⁵.
:::

## Solution

{{code}}

**Complexity.** O(D) to build the table, O(log D) per query: **O(D + n + m log D)**. Memory: **O(D)**.

{{tested}}
==== th
## เทคนิค: ผลรวมสะสมเปลี่ยน "ยอดรวมถึง T เมื่อไหร่?" ให้เป็นการค้นหา

ถ้าปริมาณหนึ่งถูกสะสมรายวันด้วยค่าที่ไม่ติดลบ ยอดรวมสะสม `total[d]` จะไม่ลดลง ดังนั้น "ยอดรวมถึง T ครั้งแรกวันไหน?" คือ d ตัวแรกที่ `total[d] ≥ T`: `lower_bound(total, T)`

ศิลปะอยู่ที่การเขียนคำถามแต่ละข้อใหม่ให้อยู่ในรูปนั้นพอดี

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: savedBy ของทุกวัน

วันไปถึงแค่ 100 000 (คำตอบและวันที่โดนหลอกไม่เกินนี้) จึงคำนวณเงินของ **ทุกวัน** ครั้งเดียวได้เลย:

- `rateFrom[day]` = อัตราใหม่ที่เริ่มวันนั้น (วันเปลี่ยนมาไม่เรียง จึงเก็บตามวัน)
- เดินวันไปข้างหน้า เปลี่ยนอัตราเมื่อถึงวันเปลี่ยน แล้ว `savedBy[day] = savedBy[day − 1] + rate`

### ขั้นที่ 2: การโดนหลอกกลายเป็นเป้า

วันที่โดนหลอก x เขาเก็บเงินก่อน แล้ว (ถ้าทำได้) ซื้อ แล้วจึงเสียเงินทั้งหมด

- **savedBy[x] ≥ P**: เขาถึง P ในวัน x หรือก่อนนั้น ก่อนเสียเงิน เป้า = P
- **savedBy[x] < P**: เงินทั้งหมดที่มีในวัน x (savedBy[x]) หายไป ตั้งแต่วัน x + 1 เขามี `savedBy[d] − savedBy[x]` และต้องได้ ≥ P เป้า = **P + savedBy[x]**

ไม่ว่ากรณีไหน: คำตอบคือวันแรกที่ savedBy ≥ เป้า

```diagram
ตัวอย่าง 2: อัตรา 3 3 3 3 2 2 5 5 5 …   savedBy 3 6 9 12 14 16 21 26 31 …
P = 12, x = 3: savedBy[3] = 12 ≥ 12  → เป้า 12 → วัน 3
P = 13, x = 3: savedBy[3] = 12 < 13  → เป้า 25 → วัน 7 (26)
```

{{viz}}

### ขั้นที่ 3: ค้นหา

อัตราทุกค่า ≥ 1 savedBy จึงเพิ่มขึ้นเสมอ และ `lower_bound(savedBy, target)` คือคำตอบ ค่าไม่เกิน 2³⁰ + 10⁸ แต่ใช้ `long long` ก็ไม่เสียอะไร

:::warn กับดัก
- ถือว่าเงินวันที่โดนหลอกหายไปแม้วันนั้นมีพอซื้อแล้ว (ตัวอย่าง P = 11, 12 ตรวจข้อนี้)
- ลืมว่าวันเปลี่ยนไม่ได้เรียงมา (ตัวอย่าง 3)
- จำลองทีละวันทุกคำถาม: 10⁵ · 10⁵
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** O(D) สร้างตาราง, O(log D) ต่อคำถาม: **O(D + n + m log D)** หน่วยความจำ: **O(D)**

{{tested}}
