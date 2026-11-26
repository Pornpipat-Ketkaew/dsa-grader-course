title: Line Monopoly
title_th: เกมเศรษฐีบนเส้นตรง (Line Monopoly)
stars: 3
tech: Ordered map of disjoint intervals, Amortised merging
tech_th: map ที่เก็บช่วงไม่ซ้อนทับ, การรวมช่วงแบบ amortised
complexity: O(n log n) time · O(n) memory
key: Keep the bought cells as a map start → end of disjoint, non-touching blocks. A purchase swallows every block it overlaps or touches and inserts one merged block; the answer to a query is the map's size.
key_th: เก็บช่องที่ซื้อแล้วเป็น map start → end ของก้อนที่ไม่ซ้อนทับและไม่ติดกัน การซื้อแต่ละครั้งกลืนทุกก้อนที่ทับหรือแตะ แล้วใส่ก้อนที่รวมแล้วหนึ่งก้อน คำตอบของการถามคือขนาดของ map
tests: the PDF sample, touching blocks ([7,8] [3,4] [5,6] → 1), a purchase covering everything, and 400 random action lists against a brute force that marks cells; n = 200 000 alternating buy/query runs in 0.08 s. ASan + UBSan clean.
tests_th: ตัวอย่างใน PDF ก้อนที่ติดกัน ([7,8] [3,4] [5,6] → 1) การซื้อที่ครอบทั้งหมด และสุ่ม 400 ชุดเทียบกับ brute force ที่ทำเครื่องหมายทีละช่อง กรณี n = 200 000 สลับซื้อ/ถามใช้ 0.08 วินาที ไม่พบข้อผิดพลาดจาก ASan + UBSan
==== en
## Technique: a sorted map of disjoint intervals

The line has 10⁹ cells, so marking cells is impossible. Store the bought region the way a human would describe it: as **maximal blocks** `[start, end]`, kept in an ordered `map<int,int>` from start to end.

Keep this **invariant** after every operation:

> blocks are disjoint, sorted by start, and **never touching** (at least one free cell between two blocks).

With that invariant, the minimum number of intervals to report is exactly the number of blocks, `owned.size()`, available in O(1) at any moment. All the work is in keeping the invariant during a purchase.

## How it maps onto this problem

### Step 1: which blocks does [from, to] affect?

A block must be merged if it **overlaps or touches** the new range. Touching matters because cells are integers: [2,4] and [5,10] together are just [2,10]. In terms of the map:

- the block **starting at or before `from`** is affected if its end ≥ `from − 1`;
- every block **starting in `(from, to + 1]`** is affected.

`upper_bound(from)` gives the first block starting after `from`; one step back (`prev`) is the candidate on the left.

### Step 2: swallow them, left to right

Starting at the first affected block, repeatedly widen `[from, to]` to cover the block and erase it, until the next block starts after `to + 1`. Then insert the single merged block.

```diagram
owned:   [4,7]        [10,20]       [30,35]
buy 5..11
  first affected: [4,7]   (starts ≤ 5 and 7 ≥ 5-1)    → from=4, to=11, erase
  next: [10,20]           (10 ≤ 11+1)                 → to=20, erase
  next: [30,35]           (30 > 20+1)                 → stop
owned:   [4,20]                       [30,35]          size = 2
```

{{viz}}

:::proof Why it is fast: amortised analysis
Each purchase inserts **one** block. A block can be erased **at most once**. So over n purchases the total number of erasures is ≤ n, even though a single purchase might erase many blocks. Every map operation is O(log n), so the whole program is O(n log n), and every query is O(1).
:::

### Why not count at query time?

The first 60% of the tests ask only once at the end, so sorting all purchases and merging once would pass them. The remaining 40% ask many times; recomputing per query is O(n) each, O(n²) total. The map keeps the answer up to date incrementally.

:::warn Traps
- Forgetting **touching** blocks: [3,4] [5,6] [7,8] must be reported as 1.
- Forgetting the block that starts **before** `from` but reaches into the range.
- Erasing while iterating: use the iterator returned by `erase`.
- `to + 1` with to = 10⁹ is 10⁹ + 1, still inside `int`.
:::

## Solution

{{code}}

**Complexity.** n inserts, at most n erasures and n lookups on a balanced tree: **O(n log n)**. Each query: O(1). Memory: at most one block per purchase, **O(n)**.

{{tested}}
==== th
## เทคนิค: map ที่เรียงลำดับของช่วงที่ไม่ซ้อนทับ

เส้นมี 10⁹ ช่อง ทำเครื่องหมายทีละช่องไม่ได้ ให้เก็บส่วนที่ซื้อแล้วแบบที่คนอธิบาย: เป็น **ก้อนที่ใหญ่ที่สุด** `[start, end]` ใน `map<int,int>` ที่เรียงตาม start

รักษา **invariant** นี้ไว้หลังทุกการกระทำ:

> ก้อนไม่ซ้อนทับกัน เรียงตาม start และ **ไม่ติดกัน** (มีช่องว่างอย่างน้อยหนึ่งช่องระหว่างสองก้อน)

เมื่อ invariant นี้เป็นจริง จำนวนช่วงที่น้อยที่สุดที่ต้องรายงานก็คือจำนวนก้อน `owned.size()` ซึ่งได้ใน O(1) ทุกเมื่อ งานทั้งหมดอยู่ที่การรักษา invariant ระหว่างการซื้อ

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: [from, to] กระทบก้อนไหนบ้าง?

ก้อนต้องถูกรวมถ้า **ทับหรือแตะ** ช่วงใหม่ การแตะสำคัญเพราะช่องเป็นจำนวนเต็ม: [2,4] กับ [5,10] รวมกันก็คือ [2,10] ในมุมของ map:

- ก้อนที่ **เริ่มไม่หลัง `from`** ถูกกระทบถ้าจุดจบ ≥ `from − 1`
- ทุกก้อนที่ **เริ่มในช่วง `(from, to + 1]`** ถูกกระทบ

`upper_bound(from)` ให้ก้อนแรกที่เริ่มหลัง `from` ถอยไปหนึ่งก้าว (`prev`) คือก้อนที่อาจกระทบทางซ้าย

### ขั้นที่ 2: กลืนทีละก้อนจากซ้ายไปขวา

เริ่มที่ก้อนแรกที่ถูกกระทบ ขยาย `[from, to]` ให้ครอบก้อนนั้นแล้วลบทิ้ง ทำซ้ำจนก้อนถัดไปเริ่มหลัง `to + 1` แล้วใส่ก้อนที่รวมแล้วหนึ่งก้อน

```diagram
owned:   [4,7]        [10,20]       [30,35]
ซื้อ 5..11
  ก้อนแรกที่กระทบ: [4,7]   (เริ่ม ≤ 5 และ 7 ≥ 5-1)    → from=4, to=11, ลบ
  ถัดไป: [10,20]           (10 ≤ 11+1)                → to=20, ลบ
  ถัดไป: [30,35]           (30 > 20+1)                → หยุด
owned:   [4,20]                       [30,35]          size = 2
```

{{viz}}

:::proof ทำไมเร็ว: การวิเคราะห์แบบ amortised
การซื้อแต่ละครั้งใส่ก้อน **หนึ่ง** ก้อน และก้อนหนึ่งถูกลบได้ **ไม่เกินหนึ่งครั้ง** ดังนั้นตลอดการซื้อ n ครั้ง จำนวนการลบรวม ≤ n แม้การซื้อครั้งเดียวอาจลบหลายก้อนก็ตาม การทำงานกับ map แต่ละครั้งเป็น O(log n) โปรแกรมทั้งหมดจึงเป็น O(n log n) และการถามแต่ละครั้งเป็น O(1)
:::

### ทำไมไม่นับตอนถาม?

60% แรกของชุดทดสอบถามครั้งเดียวตอนท้าย การเรียงการซื้อทั้งหมดแล้วรวมครั้งเดียวก็ผ่าน แต่อีก 40% ถามหลายครั้ง การคำนวณใหม่ทุกครั้งใช้ O(n) ต่อครั้ง รวม O(n²) map ทำให้คำตอบเป็นปัจจุบันอยู่เสมอแบบค่อย ๆ อัปเดต

:::warn กับดัก
- ลืมก้อนที่ **แตะกัน**: [3,4] [5,6] [7,8] ต้องรายงานเป็น 1
- ลืมก้อนที่เริ่ม **ก่อน** `from` แต่ยื่นเข้ามาในช่วง
- ลบขณะวนลูป: ให้ใช้ iterator ที่ `erase` คืนมา
- `to + 1` เมื่อ to = 10⁹ เป็น 10⁹ + 1 ยังอยู่ใน `int`
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** ใส่ n ครั้ง ลบไม่เกิน n ครั้ง และค้นหา n ครั้งบนต้นไม้สมดุล: **O(n log n)** การถามแต่ละครั้ง O(1) หน่วยความจำ: ไม่เกินหนึ่งก้อนต่อการซื้อ **O(n)**

{{tested}}
