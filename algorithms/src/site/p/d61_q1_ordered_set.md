title: Union / Intersection of Ordered Set
title_th: Union / Intersection ของเซตแบบมีลำดับ
stars: 2
tech: Membership by sort + binary search, Order-preserving filter
tech_th: ตรวจสมาชิกด้วย sort + binary search, กรองโดยรักษาลำดับ
complexity: O((|A| + |B|) log n) time · O(|A| + |B|) memory
files: sol/d61_q1_ordered_set/student.h
pdf: C:\dataAlgoGraderProblems\d61_q1_ordered_set\problem.pdf
key: Both answers are "walk one list in its own order and keep the items that pass a membership test on the other list". Make the test O(log n) by sorting a copy once.
key_th: คำตอบทั้งสองคือ "เดินรายการหนึ่งตามลำดับของมัน แล้วเก็บตัวที่ผ่านการตรวจว่าเป็นสมาชิกของอีกรายการ" ทำให้การตรวจเป็น O(log n) ด้วยการเรียงสำเนาครั้งเดียว
tests: the PDF example (built with the official main.cpp) and 300 random pairs of sets up to 60 elements against a brute force, plus a std::string instantiation to make sure the template only needs operator<. ASan + UBSan clean.
tests_th: ตัวอย่างใน PDF (คอมไพล์กับ main.cpp ที่ให้มา) และสุ่ม 300 คู่ของเซตขนาดไม่เกิน 60 เทียบกับ brute force พร้อมทดสอบกับ std::string เพื่อยืนยันว่า template ต้องการแค่ operator< ไม่พบข้อผิดพลาดจาก ASan + UBSan
==== en
## Technique: a filter pass with a fast membership test

Many "set" questions on *ordered* data reduce to the same loop:

```cpp
for (each item x of list P, in P's order)
    if (x is / is not in list Q) keep x;
```

The loop itself is O(|P|). The only design decision is **how to answer "is x in Q?"**:

| membership structure | build | one query | needs |
|---|---|---|---|
| linear scan of Q | 0 | O(|Q|) | `==` |
| `unordered_set<T>` | O(|Q|) | O(1) avg | `std::hash<T>` |
| `set<T>` | O(|Q| log |Q|) | O(log |Q|) | `<` |
| **sorted copy + `binary_search`** | O(|Q| log |Q|) | O(log |Q|) | `<` |

A linear scan gives O(|A|·|B|) = 10¹⁰ for 10⁵ elements: too slow. The function is a **template**, and the grader may call it with a type that has `operator<` but no hash, so a hash set is risky. A sorted vector with `binary_search` needs only `<`, uses one contiguous array (cache-friendly), and is typically faster than `std::set`.

## How it maps onto this problem

### Union(A, B): "A first, then what only B has"

The required order is: every element of A in A's order, then the elements of B that are **not** in A, in B's order.

```diagram
A = <4 6 9 0 7>        B = <0 3 2 4 5>
result starts as a copy of A:      4 6 9 0 7
walk B:  0 in A? yes → skip
         3 in A? no  → append      4 6 9 0 7 3
         2 in A? no  → append      4 6 9 0 7 3 2
         4 in A? yes → skip
         5 in A? no  → append      4 6 9 0 7 3 2 5
```

So: `result = A`, sort a copy of A, then **filter B** with "not in A".

### Intersect(A, B): "A's order, only what B has"

The answer must follow A's order, so we walk **A** and keep x when x is in B. The membership structure is therefore built from **B**.

```diagram
A = <3 9 0 1 6>   B = <4 6 9 1 7>   sorted B = 1 4 6 7 9
3 → no   9 → yes   0 → no   1 → yes   6 → yes      result <9 1 6>
```

:::key Which list do you walk, which do you sort?
Walk the list whose **order the answer must keep**; sort the **other** list for lookups. Union walks B (A is already copied in front), Intersect walks A.
:::

:::proof Why no duplicates appear
A and B are sets (no repeats inside each). Union appends a B element only if A lacks it, and B lists each value once, so no value is added twice. Intersect keeps a subset of A, which has no repeats.
:::

{{viz}}

:::warn Traps
- Sorting **A or B themselves** destroys the order the answer needs. Sort a **copy**.
- `find` on a vector inside the loop is linear: O(n²) in total.
- Using `unordered_set<T>` in a template compiles only if `std::hash<T>` exists.
:::

## Solution

Only `student.h` is submitted.

{{code}}

**Complexity.** Sorting a copy: O(n log n). Each of the ≤ n filter steps does one binary search: O(log n). Total **O((|A| + |B|) log n)**, at most a few million comparisons for 10⁵ elements. Memory: the sorted copy and the result, **O(|A| + |B|)**.

{{tested}}
==== th
## เทคนิค: เดินกรองรายการพร้อมการตรวจสมาชิกที่เร็ว

คำถามเรื่อง "เซต" บนข้อมูลที่ *มีลำดับ* หลายข้อลดรูปเป็นลูปเดียวกัน:

```cpp
for (each item x of list P, in P's order)
    if (x is / is not in list Q) keep x;
```

ตัวลูปใช้ O(|P|) สิ่งเดียวที่ต้องออกแบบคือ **จะตอบ "x อยู่ใน Q ไหม?" อย่างไร**:

| โครงสร้างตรวจสมาชิก | สร้าง | ถามหนึ่งครั้ง | ต้องมี |
|---|---|---|---|
| ไล่ Q ทีละตัว | 0 | O(|Q|) | `==` |
| `unordered_set<T>` | O(|Q|) | O(1) เฉลี่ย | `std::hash<T>` |
| `set<T>` | O(|Q| log |Q|) | O(log |Q|) | `<` |
| **สำเนาที่เรียงแล้ว + `binary_search`** | O(|Q| log |Q|) | O(log |Q|) | `<` |

การไล่ทีละตัวให้ O(|A|·|B|) = 10¹⁰ เมื่อมี 10⁵ ตัว ช้าเกินไป ฟังก์ชันนี้เป็น **template** และ grader อาจเรียกด้วยชนิดข้อมูลที่มี `operator<` แต่ไม่มี hash การใช้ hash set จึงเสี่ยง ส่วนเวกเตอร์ที่เรียงแล้วกับ `binary_search` ต้องการแค่ `<` ใช้อาร์เรย์ต่อเนื่องก้อนเดียว (เป็นมิตรกับ cache) และมักเร็วกว่า `std::set`

## นำมาใช้กับโจทย์นี้อย่างไร

### Union(A, B): "A มาก่อน แล้วตามด้วยสิ่งที่มีแต่ใน B"

ลำดับที่ต้องการคือ: สมาชิกทุกตัวของ A ตามลำดับของ A แล้วต่อด้วยสมาชิกของ B ที่ **ไม่อยู่** ใน A ตามลำดับของ B

```diagram
A = <4 6 9 0 7>        B = <0 3 2 4 5>
result เริ่มจากสำเนาของ A:       4 6 9 0 7
เดิน B:  0 อยู่ใน A? ใช่    → ข้าม
         3 อยู่ใน A? ไม่    → ต่อท้าย   4 6 9 0 7 3
         2 อยู่ใน A? ไม่    → ต่อท้าย   4 6 9 0 7 3 2
         4 อยู่ใน A? ใช่    → ข้าม
         5 อยู่ใน A? ไม่    → ต่อท้าย   4 6 9 0 7 3 2 5
```

ดังนั้น: `result = A` เรียงสำเนาของ A แล้ว **กรอง B** ด้วยเงื่อนไข "ไม่อยู่ใน A"

### Intersect(A, B): "ลำดับของ A เฉพาะตัวที่ B มี"

คำตอบต้องเรียงตาม A เราจึงเดิน **A** และเก็บ x เมื่อ x อยู่ใน B โครงสร้างตรวจสมาชิกจึงสร้างจาก **B**

```diagram
A = <3 9 0 1 6>   B = <4 6 9 1 7>   B ที่เรียงแล้ว = 1 4 6 7 9
3 → ไม่   9 → ใช่   0 → ไม่   1 → ใช่   6 → ใช่      ผลลัพธ์ <9 1 6>
```

:::key เดินรายการไหน เรียงรายการไหน?
เดินรายการที่ **คำตอบต้องรักษาลำดับ** และเรียง **อีกรายการ** ไว้สำหรับค้นหา Union เดิน B (A ถูกคัดลอกไว้ข้างหน้าแล้ว) ส่วน Intersect เดิน A
:::

:::proof ทำไมไม่มีค่าซ้ำ
A และ B เป็นเซต (ภายในแต่ละตัวไม่มีค่าซ้ำ) Union จะต่อท้ายสมาชิกของ B ก็ต่อเมื่อ A ไม่มีค่านั้น และ B มีแต่ละค่าครั้งเดียว จึงไม่มีค่าถูกเพิ่มสองครั้ง Intersect เก็บเพียงบางส่วนของ A ซึ่งไม่มีค่าซ้ำอยู่แล้ว
:::

{{viz}}

:::warn กับดัก
- เรียง **A หรือ B ตัวจริง** จะทำลายลำดับที่คำตอบต้องใช้ ให้เรียง **สำเนา**
- ใช้ `find` บนเวกเตอร์ในลูป เป็นการไล่เชิงเส้น รวมเป็น O(n²)
- ใช้ `unordered_set<T>` ใน template จะคอมไพล์ผ่านก็ต่อเมื่อมี `std::hash<T>`
:::

## โค้ดเฉลย

ส่งเฉพาะไฟล์ `student.h`

{{code}}

**ความซับซ้อน** เรียงสำเนา: O(n log n) การกรองไม่เกิน n ขั้น ขั้นละหนึ่ง binary search: O(log n) รวม **O((|A| + |B|) log n)** ไม่เกินไม่กี่ล้านการเปรียบเทียบเมื่อมี 10⁵ ตัว หน่วยความจำ: สำเนาที่เรียงและผลลัพธ์ **O(|A| + |B|)**

{{tested}}
