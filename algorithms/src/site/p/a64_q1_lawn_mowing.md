title: Lawn Mowing
title_th: Lawn Mowing (ตัดหญ้าตามงบ)
stars: 2
tech: Prefix sums (range sum in O(1)), Fold a per-cell fee into the prefix sum, Binary search on a monotone prefix sum (upper_bound)
tech_th: ผลรวมสะสม (ผลรวมช่วงใน O(1)), รวมค่าแรงต่อช่องเข้าไปในผลรวมสะสม, Binary search บนผลรวมสะสมที่เพิ่มขึ้นเสมอ (upper_bound)
complexity: O(n + m log n) time · O(n) memory
key: Mowing l..r costs Σ(A[i] + k) over the range, so build two prefix sums: costBefore (with the k per cell folded in) and grassBefore. costBefore never decreases, so the farthest affordable end is the last e with costBefore[e] ≤ costBefore[l] + budget: an upper_bound. The answer is grassBefore[e] − grassBefore[l].
key_th: การตัด l..r เสีย Σ(A[i] + k) ในช่วงนั้น จึงสร้างผลรวมสะสมสองชุด: costBefore (รวม k ต่อช่องเข้าไป) และ grassBefore costBefore ไม่ลดลง จุดจบที่ไกลที่สุดที่จ่ายไหวจึงเป็น e ตัวสุดท้ายที่ costBefore[e] ≤ costBefore[l] + งบ: upper_bound คำตอบคือ grassBefore[e] − grassBefore[l]
tests: both PDF samples, 300 random cases (with zero grass and k = 0) against trying every end, and n = m = 500 000 with k = 1 000 and budgets up to 10¹² in 0.12 s.
tests_th: ตัวอย่างทั้งสองใน PDF สุ่ม 300 ชุด (มีหญ้า 0 และ k = 0) เทียบกับการลองทุกจุดจบ และ n = m = 500 000 กับ k = 1 000 และงบถึง 10¹² ใช้ 0.12 วินาที
==== en
## Technique: prefix sums + binary search on them

**Prefix sums.** With `before[i] = A[0] + … + A[i−1]` (and `before[0] = 0`), the sum of any range l..r is `before[r+1] − before[l]`: O(1) per range after O(n) preparation.

**Prefix sums are sorted when the terms are ≥ 0.** Then "how far can I go from l before the sum exceeds a limit?" is a binary search on `before`: the last e with `before[e] ≤ before[l] + limit`, which is `upper_bound(before, before[l] + limit) − 1`.

## How it maps onto this problem

### Step 1: fold the fee into the prefix sum

The price of cells l..r is the grass plus k per cell: Σ (A[i] + k). So the per-cell price is A[i] + k, and one prefix sum handles it:

```cpp
costBefore[i + 1]  = costBefore[i]  + A[i] + k;
grassBefore[i + 1] = grassBefore[i] + A[i];
```

A second prefix sum without k gives the grass actually cut.

### Step 2: the farthest end

Mowing cells start..e − 1 costs `costBefore[e] − costBefore[start]`. It must be ≤ budget, so we want the **last** e (from start to n) with

> costBefore[e] ≤ costBefore[start] + budget.

Since A[i] + k ≥ 0, costBefore never decreases: `upper_bound` over costBefore[start..n] gives the first e that is too expensive; one before it is the answer e. (e = start means even one cell is too expensive: grass 0.)

```diagram
sample 2: A = 1 1 1 1 1, k = 2        costBefore: 0 3 6 9 12 15
start 0, budget 10 → limit 10 → last costBefore ≤ 10 is 9 at e = 3
grass = grassBefore[3] − grassBefore[0] = 3
```

{{viz}}

### Step 3: sizes

costBefore reaches 500 000 · 2 000 = 10⁹ and budgets reach 10¹²: `long long`. 500 000 queries: build the output in one string.

:::warn Traps
- Stopping at the first cell with A[i] > remaining money: correct, but O(n) per query (the 40% subtask only).
- Searching grassBefore with the budget: ignores the k per cell (works only for the k = 0 subtask).
- `upper_bound` over the whole array instead of from start: can return an end before start when the budget is small.
:::

## Solution

{{code}}

**Complexity.** O(n) to build, O(log n) per query: **O(n + m log n)**. Memory: **O(n)**.

{{tested}}
==== th
## เทคนิค: ผลรวมสะสม + binary search บนผลรวมสะสม

**ผลรวมสะสม** เมื่อมี `before[i] = A[0] + … + A[i−1]` (และ `before[0] = 0`) ผลรวมช่วง l..r ใด ๆ คือ `before[r+1] − before[l]`: O(1) ต่อช่วงหลังเตรียม O(n)

**ผลรวมสะสมเรียงอยู่แล้วเมื่อทุกพจน์ ≥ 0** ดังนั้น "จาก l ไปได้ไกลแค่ไหนก่อนผลรวมเกินขีด?" คือ binary search บน `before`: e ตัวสุดท้ายที่ `before[e] ≤ before[l] + limit` ซึ่งคือ `upper_bound(before, before[l] + limit) − 1`

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: รวมค่าแรงเข้าไปในผลรวมสะสม

ราคาของช่อง l..r คือหญ้าบวก k ต่อช่อง: Σ (A[i] + k) ราคาต่อช่องจึงเป็น A[i] + k และผลรวมสะสมชุดเดียวจัดการได้:

```cpp
costBefore[i + 1]  = costBefore[i]  + A[i] + k;
grassBefore[i + 1] = grassBefore[i] + A[i];
```

ผลรวมสะสมชุดที่สองที่ไม่มี k ให้ปริมาณหญ้าที่ตัดได้จริง

### ขั้นที่ 2: จุดจบที่ไกลที่สุด

การตัดช่อง start..e − 1 เสีย `costBefore[e] − costBefore[start]` ต้อง ≤ งบ เราจึงต้องการ e **ตัวสุดท้าย** (จาก start ถึง n) ที่

> costBefore[e] ≤ costBefore[start] + งบ

เพราะ A[i] + k ≥ 0 costBefore จึงไม่ลดลง `upper_bound` บน costBefore[start..n] ให้ e ตัวแรกที่แพงเกิน ตัวก่อนหน้าคือคำตอบ e (e = start แปลว่าแม้ช่องเดียวก็แพงเกิน: หญ้า 0)

```diagram
ตัวอย่าง 2: A = 1 1 1 1 1, k = 2      costBefore: 0 3 6 9 12 15
เริ่ม 0 งบ 10 → ขีด 10 → costBefore ตัวสุดท้ายที่ ≤ 10 คือ 9 ที่ e = 3
หญ้า = grassBefore[3] − grassBefore[0] = 3
```

{{viz}}

### ขั้นที่ 3: ขนาด

costBefore ถึง 500 000 · 2 000 = 10⁹ และงบถึง 10¹²: `long long` คำถาม 500 000 ข้อ: สร้างผลลัพธ์ใน string เดียว

:::warn กับดัก
- หยุดที่ช่องแรกที่ A[i] > เงินที่เหลือ: ถูกแต่ O(n) ต่อคำถาม (ได้แค่ส่วน 40%)
- ค้นใน grassBefore ด้วยงบ: ไม่นับ k ต่อช่อง (ถูกแค่ส่วน k = 0)
- `upper_bound` ทั้งอาร์เรย์แทนการเริ่มจาก start: อาจได้จุดจบก่อน start เมื่องบน้อย
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** สร้าง O(n), O(log n) ต่อคำถาม: **O(n + m log n)** หน่วยความจำ: **O(n)**

{{tested}}
