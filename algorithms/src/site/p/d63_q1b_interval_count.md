title: Interval Count
title_th: Interval Count (นับจำนวนในช่วง)
stars: 1
tech: Sort once, answer many range-count queries, lower_bound and upper_bound
tech_th: เรียงครั้งเดียว ตอบคำถามนับในช่วงได้หลายครั้ง, lower_bound และ upper_bound
complexity: O((n + m) log n) time · O(n) memory
key: After sorting, the numbers inside [p − k, p + k] form one contiguous block. Its first index is lower_bound(p − k) (first value ≥ p − k) and the index just past it is upper_bound(p + k) (first value > p + k); the count is their difference.
key_th: หลังเรียง ตัวเลขที่อยู่ใน [p − k, p + k] เป็นก้อนเดียวที่ติดกัน ดัชนีแรกของก้อนคือ lower_bound(p − k) (ค่าแรกที่ ≥ p − k) และดัชนีถัดจากก้อนคือ upper_bound(p + k) (ค่าแรกที่ > p + k) จำนวนคือผลต่างของทั้งสอง
tests: all 3 PDF samples, a case where p + k = 2·10⁹ overflows int, 300 random cases against a direct count, and n = m = 200 000 in 0.09 s.
tests_th: ตัวอย่างทั้ง 3 ใน PDF กรณี p + k = 2·10⁹ ที่ล้น int สุ่ม 300 ชุดเทียบกับการนับตรง ๆ และ n = m = 200 000 ใช้ 0.09 วินาที
==== en
## Technique: range counting with two boundaries

"How many values lie in [lo, hi]?" asked many times about the **same** set: sort the set once, then each question is two binary searches.

In a sorted array the values in [lo, hi] are one block:

- **first** = `lower_bound(lo)`: first index with value ≥ lo (equal values are inside, so they must not be skipped);
- **pastLast** = `upper_bound(hi)`: first index with value > hi (equal values are inside, so stop after them).

Count = pastLast − first. This "half-open" pair [first, pastLast) is the standard way to describe a block: an empty block simply has first = pastLast.

```diagram
sorted: 1 3 5 9 10        p = 3, k = 1 → [2, 4]
        ↑ ↑               first = index 1 (3 is the first ≥ 2)
            ↑             pastLast = index 2 (5 is the first > 4)        count 1
```

## How it maps onto this problem

### Step 1: sort the list

The list comes unsorted (sample 3 gives 4 8 2), so sort it once: O(n log n).

### Step 2: each query

lo = p − k, hi = p + k. Both can leave the 0 … 10⁹ range: p − k can be negative (fine: then first = 0), and p + k can reach 2·10⁹, which does **not** fit in `int`. Keep p, k and the values in `long long`.

{{viz}}

### Step 3: output

All answers go on one line, separated by spaces. With 200 000 answers, build one string and print it once.

:::warn Traps
- p + k in `int`: overflow at 2·10⁹ gives a negative bound and a wrong count.
- `upper_bound(p − k)` or `lower_bound(p + k)`: off by the values that are exactly on the ends.
- Counting by scanning: 4·10¹⁰ steps.
:::

## Solution

{{code}}

**Complexity.** Sorting O(n log n) and two O(log n) searches per query: **O((n + m) log n)**. Memory: **O(n)**.

{{tested}}
==== th
## เทคนิค: นับในช่วงด้วยรอยต่อสองข้าง

"มีค่ากี่ตัวใน [lo, hi]?" ถามหลายครั้งกับเซต **เดียวกัน**: เรียงเซตครั้งเดียว แล้วแต่ละคำถามคือ binary search สองครั้ง

ในอาร์เรย์ที่เรียงแล้ว ค่าใน [lo, hi] เป็นก้อนเดียว:

- **first** = `lower_bound(lo)`: ดัชนีแรกที่ค่า ≥ lo (ค่าที่เท่ากันอยู่ในช่วง จึงต้องไม่ข้าม)
- **pastLast** = `upper_bound(hi)`: ดัชนีแรกที่ค่า > hi (ค่าที่เท่ากันอยู่ในช่วง จึงหยุดหลังพวกมัน)

จำนวน = pastLast − first คู่แบบ "ครึ่งเปิด" [first, pastLast) คือวิธีมาตรฐานในการบอกก้อน: ก้อนว่างคือ first = pastLast พอดี

```diagram
เรียงแล้ว: 1 3 5 9 10     p = 3, k = 1 → [2, 4]
           ↑ ↑            first = ดัชนี 1 (3 คือตัวแรกที่ ≥ 2)
               ↑          pastLast = ดัชนี 2 (5 คือตัวแรกที่ > 4)        จำนวน 1
```

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: เรียงรายการ

รายการมาแบบไม่เรียง (ตัวอย่าง 3 ให้ 4 8 2) จึงเรียงครั้งเดียว: O(n log n)

### ขั้นที่ 2: แต่ละคำถาม

lo = p − k, hi = p + k ทั้งสองค่าหลุดช่วง 0 … 10⁹ ได้: p − k ติดลบได้ (ไม่เป็นไร: first = 0) และ p + k สูงถึง 2·10⁹ ซึ่ง **ไม่** พอดีกับ `int` เก็บ p, k และค่าต่าง ๆ เป็น `long long`

{{viz}}

### ขั้นที่ 3: ผลลัพธ์

คำตอบทั้งหมดอยู่บรรทัดเดียว คั่นด้วยช่องว่าง เมื่อมี 200 000 คำตอบ ให้สร้าง string เดียวแล้วพิมพ์ครั้งเดียว

:::warn กับดัก
- p + k เป็น `int`: ล้นที่ 2·10⁹ ได้ขอบติดลบและนับผิด
- `upper_bound(p − k)` หรือ `lower_bound(p + k)`: ผิดไปเท่าจำนวนค่าที่อยู่ตรงขอบพอดี
- นับด้วยการไล่: 4·10¹⁰ ขั้น
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** เรียง O(n log n) และค้นหา O(log n) สองครั้งต่อคำถาม: **O((n + m) log n)** หน่วยความจำ: **O(n)**

{{tested}}
