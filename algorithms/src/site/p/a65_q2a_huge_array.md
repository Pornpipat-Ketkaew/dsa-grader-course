title: Huge Array
title_th: Huge Array (อาร์เรย์ขนาดมหึมา)
stars: 2
tech: Work on runs instead of elements, Prefix sums of counts, Binary search on the prefix sums (lower_bound)
tech_th: ทำงานกับชุดแทนสมาชิกทีละตัว, ผลรวมสะสมของจำนวน, Binary search บนผลรวมสะสม (lower_bound)
complexity: O((N + Q) log N) time · O(N) memory
key: The array can have 2·10⁹ elements, so never build it. Sort the N runs (value, copies) by value; the sorted huge array is those runs back to back. The running total of copies gives the last position of each run, and the run holding position P is the first one whose last position is ≥ P: a lower_bound.
key_th: อาร์เรย์มีได้ถึง 2·10⁹ ตัว จึงห้ามสร้างจริง เรียง N ชุด (ค่า, จำนวน) ตามค่า อาร์เรย์ใหญ่ที่เรียงแล้วก็คือชุดเหล่านั้นต่อกัน ผลรวมสะสมของจำนวนให้ตำแหน่งสุดท้ายของแต่ละชุด และชุดที่มีตำแหน่ง P คือชุดแรกที่ตำแหน่งสุดท้าย ≥ P: lower_bound
tests: both PDF samples, 300 random cases against building and sorting the real array, and N = Q = 100 000 with a total of 2·10⁹ elements (last position asked) in 0.05 s.
tests_th: ตัวอย่างทั้งสองใน PDF สุ่ม 300 ชุดเทียบกับการสร้างและเรียงอาร์เรย์จริง และ N = Q = 100 000 ที่มีสมาชิกรวม 2·10⁹ ตัว (ถามตำแหน่งสุดท้ายด้วย) ใช้ 0.05 วินาที
==== en
## Technique: prefix sums + binary search over compressed data

When data is given as **runs** ("value x, repeated c times"), work with the runs, not the elements. Two tools make positions easy:

- **prefix sums of the run lengths**: `last[i] = c₀ + c₁ + … + cᵢ` is the position of the last element of run i (1-based), so run i covers positions `last[i−1] + 1 … last[i]`;
- **binary search on last[]**: it is increasing, so "which run contains position P?" is the first i with `last[i] ≥ P`: `lower_bound(last, P)`.

## How it maps onto this problem

### Step 1: sorting the huge array = sorting the runs

Sorting the huge array puts all copies of the same value together, in increasing order of value. So the sorted huge array is exactly: the runs sorted by value, written one after another. Sorting N pairs instead of 2·10⁹ numbers.

Two runs with the same value (sample 2 has 9 twice) simply sit next to each other; nothing needs merging.

### Step 2: prefix sums

```diagram
sample 2 sorted:  (4,5) (7,7) (8,3) (9,1) (9,3)
last[]:              5    12    15    16    19
P = 8  → first last ≥ 8 is 12 → value 7
P = 15 → first last ≥ 15 is 15 → value 8
```

The total S reaches 2·10⁹, which does not fit in `int`: `last` is `long long`.

### Step 3: each query

`run = lower_bound(last, P)`; print `runs[run].value`.

{{viz}}

:::warn Traps
- Building the array: 2·10⁹ ints = 8 GB.
- `upper_bound` instead of `lower_bound`: the last position of a run (P = last[i]) would be given to the next run.
- `int` for the running total: overflows near 2.1·10⁹.
:::

## Solution

{{code}}

**Complexity.** Sorting O(N log N), then O(log N) per query: **O((N + Q) log N)**. Memory: **O(N)**.

{{tested}}
==== th
## เทคนิค: ผลรวมสะสม + binary search บนข้อมูลที่บีบอัด

เมื่อข้อมูลมาเป็น **ชุด (run)** ("ค่า x ซ้ำ c ครั้ง") ให้ทำงานกับชุด ไม่ใช่สมาชิกทีละตัว เครื่องมือสองอย่างทำให้เรื่องตำแหน่งง่าย:

- **ผลรวมสะสมของความยาวชุด**: `last[i] = c₀ + c₁ + … + cᵢ` คือตำแหน่งของสมาชิกตัวสุดท้ายของชุด i (นับจาก 1) ชุด i จึงครอบตำแหน่ง `last[i−1] + 1 … last[i]`
- **binary search บน last[]**: มันเพิ่มขึ้นเสมอ "ตำแหน่ง P อยู่ในชุดไหน?" จึงคือ i ตัวแรกที่ `last[i] ≥ P`: `lower_bound(last, P)`

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: เรียงอาร์เรย์ใหญ่ = เรียงชุด

การเรียงอาร์เรย์ใหญ่ทำให้สำเนาของค่าเดียวกันอยู่ด้วยกัน เรียงตามค่าจากน้อยไปมาก อาร์เรย์ใหญ่ที่เรียงแล้วจึงคือ: ชุดที่เรียงตามค่า เขียนต่อกัน เรียงแค่ N คู่แทน 2·10⁹ ตัว

ชุดสองชุดที่ค่าเท่ากัน (ตัวอย่าง 2 มี 9 สองชุด) ก็อยู่ติดกันเอง ไม่ต้องรวม

### ขั้นที่ 2: ผลรวมสะสม

```diagram
ตัวอย่าง 2 เรียงแล้ว: (4,5) (7,7) (8,3) (9,1) (9,3)
last[]:                 5    12    15    16    19
P = 8  → last ตัวแรกที่ ≥ 8 คือ 12 → ค่า 7
P = 15 → last ตัวแรกที่ ≥ 15 คือ 15 → ค่า 8
```

ผลรวม S สูงถึง 2·10⁹ ซึ่งไม่พอดีกับ `int`: `last` เป็น `long long`

### ขั้นที่ 3: แต่ละคำถาม

`run = lower_bound(last, P)` แล้วพิมพ์ `runs[run].value`

{{viz}}

:::warn กับดัก
- สร้างอาร์เรย์จริง: 2·10⁹ int = 8 GB
- ใช้ `upper_bound` แทน `lower_bound`: ตำแหน่งสุดท้ายของชุด (P = last[i]) จะถูกยกให้ชุดถัดไป
- ผลรวมสะสมเป็น `int`: ล้นแถว 2.1·10⁹
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** เรียง O(N log N) แล้ว O(log N) ต่อคำถาม: **O((N + Q) log N)** หน่วยความจำ: **O(N)**

{{tested}}
