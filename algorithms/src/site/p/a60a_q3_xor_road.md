title: Beautiful Roads (XOR)
title_th: ถนนสวย
stars: 2
tech: Maximum spanning tree, Prim with reversed comparisons, Implicit complete graph (weights computed on the fly)
tech_th: ต้นไม้ทอดข้ามที่มากที่สุด, Prim ที่กลับการเปรียบเทียบ, กราฟสมบูรณ์แฝง (คำนวณน้ำหนักตอนใช้)
complexity: O(n²) time · O(n) memory
key: Choose n − 1 roads that connect all districts with the largest total beauty: a maximum spanning tree of the complete graph with weight x XOR y. MST algorithms work for "maximum" by reversing every comparison. Prim's array version needs no stored weights: x ^ y is computed when needed.
key_th: เลือกถนน n − 1 เส้นที่เชื่อมทุกอำเภอและมีความสวยรวมมากที่สุด: ต้นไม้ทอดข้ามที่มากที่สุดของกราฟสมบูรณ์ที่น้ำหนักเป็น x XOR y อัลกอริทึม MST ใช้กับ "มากที่สุด" ได้โดยกลับทุกการเปรียบเทียบ Prim แบบอาร์เรย์ไม่ต้องเก็บน้ำหนัก: คำนวณ x ^ y ตอนใช้
tests: the PDF sample and n = 1, 300 random inputs against a brute force over all spanning trees, and n = 2 000 codes up to 2³⁰ in 0.02 s.
tests_th: ตัวอย่างใน PDF และ n = 1, ข้อมูลสุ่ม 300 ชุดเทียบกับ brute force ที่ลองทุกต้นไม้ทอดข้าม และ n = 2 000 ที่รหัสถึง 2³⁰ ใช้ 0.02 วินาที
==== en
## Technique: maximum spanning tree

A **maximum** spanning tree is found by the same algorithms as a minimum one, with every comparison reversed (equivalently: negate all weights and find the minimum). The cut property holds in mirror form: the **largest** edge across any split is in some maximum spanning tree.

The graph here is **implicit**: every pair of districts is an edge, with a weight given by a formula. Prim's array version only ever asks for "the weight between the new tree vertex and each outside vertex", so the weights never need to be stored: n = 2 000 would otherwise mean 2 million pairs.

## How it maps onto this problem

### Step 1: what is being maximised

n − 1 roads that connect all n districts form a spanning tree. Beauty of the road x–y is `x XOR y`. Maximise the sum: a maximum spanning tree.

### Step 2: Prim, reversed

`bestLink[v]` = the most beautiful road from v to the tree (start: −1 = none, and 0 for the first district). Each round take the outside district with the **largest** `bestLink`, add it, and raise `bestLink[v]` of the others with `code[new] ^ code[v]`.

{{viz}}

```diagram
sample: 3 = 0011, 10 = 1010, 9 = 1001, 6 = 0110
tree from 3: 3–9 (1010 = 10), 9–6 (1111 = 15), 6–10 (1100 = 12)      10 + 15 + 12 = 37
```

### Step 3: size of the answer

Each road is below 2³⁰ and there are up to 1 999 roads: about 2·10¹², far above 32 bits. Use a 64-bit total.

:::warn Traps
- Greedy "connect each district to its best partner": can create cycles and miss connectivity; the tree must be built by an MST algorithm.
- Storing all n² weights: unnecessary (and with `long long`, 32 MB).
- `int` total: overflows.
:::

## Solution

{{code}}

**Complexity.** n rounds of two O(n) scans: **O(n²)** = 4·10⁶ steps. Memory: **O(n)**.

{{tested}}
==== th
## เทคนิค: ต้นไม้ทอดข้ามที่มากที่สุด

ต้นไม้ทอดข้าม **ที่มากที่สุด** หาได้ด้วยอัลกอริทึมเดียวกับแบบน้อยที่สุด เพียงกลับทุกการเปรียบเทียบ (เทียบเท่ากับกลับเครื่องหมายน้ำหนักทั้งหมดแล้วหาค่าน้อยที่สุด) cut property ยังเป็นจริงในรูปกลับด้าน: เส้นที่ **มากที่สุด** ที่ข้ามรอยแบ่งใด ๆ อยู่ในต้นไม้ทอดข้ามที่มากที่สุดสักต้น

กราฟในข้อนี้เป็น **กราฟแฝง**: ทุกคู่ของอำเภอเป็นเส้น และน้ำหนักมาจากสูตร Prim แบบอาร์เรย์ถามแค่ "น้ำหนักระหว่างจุดใหม่ในต้นไม้กับแต่ละจุดข้างนอก" จึงไม่ต้องเก็บน้ำหนักเลย ไม่เช่นนั้น n = 2 000 จะมีถึง 2 ล้านคู่

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: สิ่งที่ต้องทำให้มากที่สุด

ถนน n − 1 เส้นที่เชื่อมครบ n อำเภอคือต้นไม้ทอดข้าม ความสวยของถนน x–y คือ `x XOR y` ทำผลรวมให้มากที่สุด: ต้นไม้ทอดข้ามที่มากที่สุด

### ขั้นที่ 2: Prim แบบกลับด้าน

`bestLink[v]` = ถนนที่สวยที่สุดจาก v ไปยังต้นไม้ (เริ่ม: −1 = ยังไม่มี และ 0 สำหรับอำเภอแรก) แต่ละรอบเลือกอำเภอข้างนอกที่ `bestLink` **มากที่สุด** เพิ่มเข้าไป แล้วยก `bestLink[v]` ของอำเภออื่นด้วย `code[ใหม่] ^ code[v]`

{{viz}}

```diagram
ตัวอย่าง: 3 = 0011, 10 = 1010, 9 = 1001, 6 = 0110
ต้นไม้จาก 3: 3–9 (1010 = 10), 9–6 (1111 = 15), 6–10 (1100 = 12)      10 + 15 + 12 = 37
```

### ขั้นที่ 3: ขนาดของคำตอบ

ถนนแต่ละเส้นน้อยกว่า 2³⁰ และมีได้ถึง 1 999 เส้น: ราว 2·10¹² เกิน 32 บิตไปมาก ใช้ผลรวม 64 บิต

:::warn กับดัก
- โลภแบบ "ต่อแต่ละอำเภอกับคู่ที่ดีที่สุดของมัน": อาจเกิดวงรอบและเชื่อมไม่ครบ ต้นไม้ต้องสร้างด้วยอัลกอริทึม MST
- เก็บน้ำหนักทั้ง n² ค่า: ไม่จำเป็น (และถ้าเป็น `long long` ใช้ 32 MB)
- ผลรวมเป็น `int`: ล้น
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** n รอบ รอบละสองการไล่ O(n): **O(n²)** = 4·10⁶ ขั้น หน่วยความจำ: **O(n)**

{{tested}}
