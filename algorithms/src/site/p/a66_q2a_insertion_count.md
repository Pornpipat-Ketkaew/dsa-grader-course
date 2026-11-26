title: Insertion Sort Count
title_th: นับการเลื่อนใน Insertion Sort
stars: 2
tech: Inversions, Fenwick tree (BIT)
tech_th: Inversion, Fenwick tree (BIT)
complexity: O(n log n + m) time · O(n) memory
key: Value k is shifted by line 07 once for every LARGER value on its LEFT. Count that for all values in one left-to-right scan with a Fenwick tree over the values, then answer each query from a table.
key_th: ค่า k ถูกบรรทัด 07 เลื่อนหนึ่งครั้งต่อค่าที่ใหญ่กว่าซึ่งอยู่ทางซ้ายของมัน นับสิ่งนี้ให้ทุกค่าในการสแกนซ้ายไปขวารอบเดียวด้วย Fenwick tree บนค่า แล้วตอบทุกคำถามจากตาราง
tests: all 5 samples (the PDF ones plus the worked example) and 300 random permutations against a direct simulation of the PDF's insertion sort; n = 200 000 random runs in 0.02 s and a reversed array gives the maximum 199 999. ASan + UBSan clean.
tests_th: ตัวอย่างทั้ง 5 ชุด (จาก PDF และตัวอย่างที่อธิบายไว้) และสุ่ม permutation 300 ชุด เทียบกับการจำลอง insertion sort ของ PDF ตรง ๆ กรณี n = 200 000 แบบสุ่มใช้ 0.02 วินาที และอาร์เรย์เรียงกลับด้านได้ค่าสูงสุด 199 999 ไม่พบข้อผิดพลาดจาก ASan + UBSan
==== en
## Technique: inversions + a Fenwick tree

Two pieces from Lesson 09:

- **Inversions.** A pair (i, j) with i < j and A[i] > A[j] is an inversion. Insertion sort moves an element exactly once per inversion it is involved in, so "how much work does insertion sort do?" is always a question about inversions.
- **Fenwick tree (BIT).** An array that supports "mark value v" and "how many marked values are ≤ v" in **O(log n)** each. It is the standard tool for *"how many earlier elements are bigger / smaller than me?"*.

## How it maps onto this problem

### Step 1: what makes line 07 move value k?

Line 07 is `A[i-1] = A[i]`: it moves A[i] **one cell to the left**, and it happens while some `tmp` is being inserted and `A[i] < tmp`.

The PDF's version works **right to left**: `pos` goes n−2, n−3, …, 0, and `A[pos+1..n-1]` is already sorted. Follow one value k at original index p:

- Elements to the **right** of k (indices > p) are inserted **before** k joins the sorted part. They can never push k.
- When k itself is inserted, k is `tmp`; line 07 moves *other* elements, not k.
- After that, every element x to the **left** of k (index < p) is inserted. x slides through the sorted part past every element smaller than x. So k is moved exactly once **if and only if k < x**.

:::key The reduction
**shifts(k) = number of indices j < p with A[j] > k**, the number of inversions in which k is the right element. Example from the PDF, k = 20 at index 3: to its left are 30, 40, 60, all larger → 3 shifts. k = 60: nothing larger on its left → 0.
:::

Watch the sort itself and the counter for one chosen value:

{{viz:sim}}

### Step 2: why not count per query?

For each query, finding k and scanning everything left of it costs O(n), so O(n·m) = 2·10⁸ in the worst case. That is borderline. Simulating the sort is far worse: a reversed array has n²/2 ≈ 2·10¹⁰ shifts. Instead we compute the answer for **every value at once** in O(n log n), and each query becomes a table lookup.

### Step 3: one left-to-right scan with a Fenwick tree over the values

Values are distinct and lie in 1..n, so they can be the BIT's indices directly (no compression).

```diagram
for index = 0 .. n-1:
    value = A[index]
    seen so far              = index                       (everything to the left)
    seen and <= value        = countSeenAtMost(value)      (BIT prefix query)
    seen and  > value        = index - countSeenAtMost(value)   ← shiftsOf[value]
    markSeen(value)                                        (BIT point update)
```

:::warn Read before you write
Query `countSeenAtMost(value)` **before** `markSeen(value)`. Otherwise the value counts itself as "seen and ≤ value" and every answer is off by one (in the other direction it would stay correct here, but the habit matters).
:::

### Step 4: how the Fenwick tree answers in O(log n)

Cell `seenCount[node]` stores the count for the value range `(node − lowbit(node), node]`, where `lowbit(node) = node & -node` is the lowest set bit.

```diagram
node (binary)   covers values
 1  0001        1
 2  0010        1..2
 3  0011        3
 4  0100        1..4
 6  0110        5..6
 8  1000        1..8
countSeenAtMost(7): 7 (0111) → 6 (0110) → 4 (0100) → 0     ranges 7 | 5..6 | 1..4  = 1..7
markSeen(5):        5 (0101) → 6 (0110) → 8 (1000) → 16 > n  every cell whose range contains 5
```

Each step removes or adds the lowest set bit, so a query or update touches at most ⌈log₂ n⌉ + 1 cells.

{{viz:bit}}

## Solution

{{code}}

**Complexity.** n updates and n prefix queries on the BIT: **O(n log n)** ≈ 3.6·10⁶ steps for n = 2·10⁵; then m O(1) lookups. Memory: the BIT and the answer table, **O(n)**.

{{tested}}
==== th
## เทคนิค: inversion + Fenwick tree

สองชิ้นส่วนจากบทที่ 09:

- **Inversion** คู่ (i, j) ที่ i < j และ A[i] > A[j] เรียกว่า inversion การเรียงแบบแทรก (insertion sort) เลื่อนสมาชิกหนึ่งครั้งพอดีต่อหนึ่ง inversion ที่มันเกี่ยวข้อง คำถาม "insertion sort ทำงานมากแค่ไหน" จึงเป็นคำถามเรื่อง inversion เสมอ
- **Fenwick tree (BIT)** อาร์เรย์ที่ทำ "ทำเครื่องหมายค่า v" และ "มีค่าที่ทำเครื่องหมายแล้วกี่ตัวที่ ≤ v" ได้ใน **O(log n)** ต่อครั้ง เป็นเครื่องมือมาตรฐานสำหรับ *"มีตัวก่อนหน้ากี่ตัวที่มากกว่า/น้อยกว่าฉัน?"*

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: อะไรทำให้บรรทัด 07 เลื่อนค่า k?

บรรทัด 07 คือ `A[i-1] = A[i]`: เลื่อน A[i] **ไปทางซ้ายหนึ่งช่อง** ซึ่งเกิดขึ้นขณะกำลังแทรก `tmp` บางตัวและ `A[i] < tmp`

เวอร์ชันใน PDF ทำงาน **จากขวาไปซ้าย**: `pos` เป็น n−2, n−3, …, 0 และ `A[pos+1..n-1]` เรียงแล้ว ลองติดตามค่า k ที่ index เดิม p:

- ตัวที่อยู่ **ทางขวา** ของ k (index > p) ถูกแทรก **ก่อน** k จะเข้าไปอยู่ในส่วนที่เรียงแล้ว จึงไม่มีทางผลัก k
- ตอนแทรก k เอง k คือ `tmp` บรรทัด 07 เลื่อนตัว *อื่น* ไม่ใช่ k
- หลังจากนั้น ทุกตัว x ที่อยู่ **ทางซ้าย** ของ k (index < p) จะถูกแทรก x ไถลผ่านทุกตัวในส่วนที่เรียงแล้วซึ่งน้อยกว่า x ดังนั้น k ถูกเลื่อนหนึ่งครั้ง **ก็ต่อเมื่อ k < x**

:::key การลดรูปปัญหา
**shifts(k) = จำนวน index j < p ที่ A[j] > k** คือจำนวน inversion ที่ k เป็นตัวด้านขวา ตัวอย่างจาก PDF: k = 20 ที่ index 3 ทางซ้ายมี 30, 40, 60 ใหญ่กว่าทั้งหมด → เลื่อน 3 ครั้ง ส่วน k = 60 ไม่มีตัวที่ใหญ่กว่าทางซ้าย → 0 ครั้ง
:::

ดูการเรียงจริงพร้อมตัวนับของค่าที่เลือก:

{{viz:sim}}

### ขั้นที่ 2: ทำไมไม่นับแยกทีละคำถาม?

ถ้าทุกคำถามหาตำแหน่ง k แล้วไล่ทุกตัวทางซ้าย ใช้ O(n) ต่อคำถาม รวม O(n·m) = 2·10⁸ ในกรณีแย่สุด ซึ่งเฉียดเวลา ส่วนการจำลองการเรียงแย่กว่านั้นมาก อาร์เรย์เรียงกลับด้านมีการเลื่อน n²/2 ≈ 2·10¹⁰ ครั้ง เราจึงคำนวณคำตอบของ **ทุกค่าพร้อมกัน** ใน O(n log n) แล้วแต่ละคำถามกลายเป็นการเปิดตาราง

### ขั้นที่ 3: สแกนซ้ายไปขวารอบเดียวด้วย Fenwick tree บนค่า

ค่าทุกตัวไม่ซ้ำและอยู่ใน 1..n จึงใช้เป็น index ของ BIT ได้ตรง ๆ (ไม่ต้องบีบพิกัด)

```diagram
for index = 0 .. n-1:
    value = A[index]
    เห็นแล้วทั้งหมด            = index                       (ทุกตัวทางซ้าย)
    เห็นแล้วและ <= value       = countSeenAtMost(value)      (BIT ถาม prefix)
    เห็นแล้วและ  > value       = index - countSeenAtMost(value)   ← shiftsOf[value]
    markSeen(value)                                          (BIT อัปเดตจุด)
```

:::warn อ่านก่อนเขียน
ถาม `countSeenAtMost(value)` **ก่อน** `markSeen(value)` ไม่อย่างนั้นค่าจะนับตัวเองเป็น "เห็นแล้วและ ≤ value" ทำให้คำตอบคลาดไปหนึ่ง
:::

### ขั้นที่ 4: Fenwick tree ตอบใน O(log n) ได้อย่างไร

ช่อง `seenCount[node]` เก็บจำนวนของช่วงค่า `(node − lowbit(node), node]` โดย `lowbit(node) = node & -node` คือบิตที่เป็น 1 ตัวต่ำสุด

```diagram
node (ฐานสอง)   ครอบคลุมค่า
 1  0001        1
 2  0010        1..2
 3  0011        3
 4  0100        1..4
 6  0110        5..6
 8  1000        1..8
countSeenAtMost(7): 7 (0111) → 6 (0110) → 4 (0100) → 0     ช่วง 7 | 5..6 | 1..4  = 1..7
markSeen(5):        5 (0101) → 6 (0110) → 8 (1000) → 16 > n  ทุกช่องที่ช่วงครอบคลุม 5
```

แต่ละก้าวลบหรือบวกบิตต่ำสุด การถามหรืออัปเดตจึงแตะไม่เกิน ⌈log₂ n⌉ + 1 ช่อง

{{viz:bit}}

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** อัปเดต n ครั้งและถาม prefix n ครั้งบน BIT: **O(n log n)** ≈ 3.6·10⁶ ขั้นเมื่อ n = 2·10⁵ จากนั้นเปิดตาราง m ครั้ง ครั้งละ O(1) หน่วยความจำ: BIT และตารางคำตอบ **O(n)**

{{tested}}
