title: Chocolate Truffle
title_th: Chocolate Truffle (ช็อกโกแลตชิ้นที่ชอบถัดไป)
stars: 2
tech: Linearise a grid walk (row-major index), Successor search with lower_bound, Wrap-around (cyclic order)
tech_th: เปลี่ยนการเดินบนตารางเป็นเส้นตรง (ดัชนีแบบแถวก่อน), หาตัวถัดไปด้วย lower_bound, การวนรอบ
complexity: O((k + Q) log k) time · O(k) memory
key: Somchai eats in reading order and wraps around, so number each cell (p − 1)·C + (q − 1): the walk is just 0, 1, 2, … modulo R·C. Sort the favourites' numbers; from start s the next favourite is lower_bound(s) and the wait is f − s, or, if none is ≥ s, the first favourite of the next round: f₀ + R·C − s.
key_th: สมชายกินตามลำดับการอ่านแล้ววนรอบ จึงให้เลขช่อง (p − 1)·C + (q − 1): การเดินคือ 0, 1, 2, … mod R·C เรียงเลขของชิ้นที่ชอบ จากจุดเริ่ม s ชิ้นถัดไปคือ lower_bound(s) และรอ f − s วัน หรือถ้าไม่มีตัวที่ ≥ s คือชิ้นแรกของรอบถัดไป: f₀ + R·C − s
tests: all 5 PDF samples, R = C = 10⁹ with an answer of 10¹⁸ − 1, 300 random boxes against a cell-by-cell walk, and k = 500 000, Q = 200 000 on a 10⁹ × 10⁹ box in 0.17 s.
tests_th: ตัวอย่างทั้ง 5 ใน PDF, R = C = 10⁹ ที่คำตอบเป็น 10¹⁸ − 1, กล่องสุ่ม 300 ชุดเทียบกับการเดินทีละช่อง และ k = 500 000, Q = 200 000 บนกล่อง 10⁹ × 10⁹ ใช้ 0.17 วินาที
==== en
## Technique: flatten the order, then successor search

Two ideas:

1. **Row-major numbering.** Walking a grid row by row, left to right, visits cell (p, q) at step `(p − 1)·C + (q − 1)` (0-based). Any question about "how far along this walk" becomes arithmetic on these numbers.
2. **Successor in a sorted list.** "The next favourite at or after s" is the first element ≥ s: `lower_bound`. With a cyclic walk, if no element is ≥ s, the next one is the **smallest** element, one full round later.

## How it maps onto this problem

### Step 1: numbers instead of cells

R and C reach 10⁹, so R·C reaches 10¹⁸: it fits in `long long` (up to 9.2·10¹⁸), not in `int`. The box itself is never stored; only the k favourite numbers are.

```diagram
sample 5: R = 2, C = 5, favourite (1,3) = 2
 step:  0 1 [2] 3 4
        5 6  7  8 9
start (1,2) = 1: next ≥ 1 is 2 → 2 − 1 = 1 day
start (1,4) = 3: nothing ≥ 3 → wrap: 2 + 10 − 3 = 9 days
```

### Step 2: each query

`next = lower_bound(favourite, s)`:

- found: the answer is `*next − s` (0 when the start itself is a favourite);
- not found: `favourite[0] + R·C − s`.

{{viz}}

:::warn Traps
- Simulating day by day: up to 10¹⁸ days.
- `(row - 1) * cols` with `int` operands: overflows before it is stored in a `long long`; make row and cols `long long` first.
- Forgetting the wrap-around (the last 45% of the tests need it).
- `upper_bound`: would skip a favourite exactly at the start (answer 0).
:::

## Solution

{{code}}

**Complexity.** Sorting O(k log k), O(log k) per query: **O((k + Q) log k)**. Memory: **O(k)**.

{{tested}}
==== th
## เทคนิค: ทำลำดับให้เป็นเส้นตรง แล้วหาตัวถัดไป

สองแนวคิด:

1. **การให้เลขแบบแถวก่อน (row-major)** การเดินบนตารางทีละแถว จากซ้ายไปขวา ไปถึงช่อง (p, q) ในก้าวที่ `(p − 1)·C + (q − 1)` (นับจาก 0) ทุกคำถามเรื่อง "เดินไปไกลแค่ไหน" จึงกลายเป็นเลขคณิตบนตัวเลขเหล่านี้
2. **ตัวถัดไปในรายการที่เรียง** "ชิ้นที่ชอบตัวถัดไปที่ ≥ s" คือสมาชิกตัวแรกที่ ≥ s: `lower_bound` เมื่อการเดินวนรอบ ถ้าไม่มีตัวที่ ≥ s ตัวถัดไปคือตัวที่ **น้อยที่สุด** ในรอบถัดไป

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: ใช้ตัวเลขแทนช่อง

R และ C ถึง 10⁹ R·C จึงถึง 10¹⁸: พอดีกับ `long long` (ถึง 9.2·10¹⁸) แต่ไม่พอดีกับ `int` ไม่ต้องเก็บกล่องเลย เก็บแค่เลขของชิ้นที่ชอบ k ตัว

```diagram
ตัวอย่าง 5: R = 2, C = 5, ชิ้นที่ชอบ (1,3) = 2
 ลำดับ: 0 1 [2] 3 4
        5 6  7  8 9
เริ่ม (1,2) = 1: ตัวถัดไปที่ ≥ 1 คือ 2 → 2 − 1 = 1 วัน
เริ่ม (1,4) = 3: ไม่มีตัวที่ ≥ 3 → วน: 2 + 10 − 3 = 9 วัน
```

### ขั้นที่ 2: แต่ละคำถาม

`next = lower_bound(favourite, s)`:

- เจอ: คำตอบคือ `*next − s` (เป็น 0 เมื่อจุดเริ่มเป็นชิ้นที่ชอบเอง)
- ไม่เจอ: `favourite[0] + R·C − s`

{{viz}}

:::warn กับดัก
- จำลองทีละวัน: ถึง 10¹⁸ วัน
- `(row - 1) * cols` ที่ตัวถูกดำเนินการเป็น `int`: ล้นก่อนเก็บลง `long long` ต้องให้ row และ cols เป็น `long long` ตั้งแต่แรก
- ลืมการวนรอบ (45% สุดท้ายของชุดทดสอบต้องใช้)
- ใช้ `upper_bound`: จะข้ามชิ้นที่ชอบที่อยู่ตรงจุดเริ่มพอดี (คำตอบ 0)
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** เรียง O(k log k), O(log k) ต่อคำถาม: **O((k + Q) log k)** หน่วยความจำ: **O(k)**

{{tested}}
