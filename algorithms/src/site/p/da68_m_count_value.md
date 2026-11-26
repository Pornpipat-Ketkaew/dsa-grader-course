title: Count Value in Map
title_th: Count Value in Map (นับค่าใน map ตามช่วง)
stars: 2
tech: Re-index the data by what is queried (values, not keys), Sort + lower_bound / upper_bound
tech_th: จัดข้อมูลใหม่ตามสิ่งที่ถูกถาม (value ไม่ใช่ key), เรียง + lower_bound / upper_bound
complexity: O((N + M) log N) time · O(N) memory
files: sol/da68_m_count_value/student.h
key: A map is sorted by key, but the queries ask about values, so the map's order is useless. Copy the N values into a vector, sort it once, and answer each [A, B] with upper_bound(B) − lower_bound(A), clamped at 0 when A > B.
key_th: map เรียงตาม key แต่คำถามถามถึง value ลำดับของ map จึงใช้ไม่ได้ คัดลอก value N ตัวลง vector เรียงครั้งเดียว แล้วตอบแต่ละ [A, B] ด้วย upper_bound(B) − lower_bound(A) โดยให้เป็น 0 เมื่อ A > B
tests: the PDF sample, a repeated key (the later value wins), 300 random maps with negative keys and values and some A > B queries against a direct count, and N = M = 200 000 in 0.23 s (mostly building the map).
tests_th: ตัวอย่างใน PDF กรณี key ซ้ำ (ค่าหลังทับค่าแรก) สุ่ม 300 ชุดที่ key และ value ติดลบได้และมีคำถาม A > B เทียบกับการนับตรง ๆ และ N = M = 200 000 ใช้ 0.23 วินาที (ส่วนใหญ่คือการสร้าง map)
==== en
## Technique: sort by what you search

A sorted container only helps with searches **on its sort key**. `std::map<long long,int>` is ordered by key; the question here is about the **mapped values**, which can be in any order along the map. So build a second structure ordered by the value:

1. copy all values into a `vector<int>` (O(N));
2. sort it (O(N log N));
3. answer each range question by the two-boundary count (O(log N)).

This is the same range count as Interval Count: the values in [A, B] form one block [lower_bound(A), upper_bound(B)).

## How it maps onto this problem

### Step 1: copy the values

Iterate over the map and push `entry.second`. Keys are ignored entirely: only how many keys have a value in range matters, and each key appears once in a map.

```diagram
map (by key):  -1→0   2→6   4→2   9→9   10→5
values:         0     6     2     9     5      → sorted: 0 2 5 6 9
query [0, 5]:  first = index 0 (0 ≥ 0), pastLast = index 3 (6 > 5)  → 3
```

### Step 2: each query

`first = lower_bound(values, A)`, `pastLast = upper_bound(values, B)`. If A > B the block is empty, but pastLast can then be **before** first; subtracting would give a negative number that wraps around in `size_t`. Return 0 in that case.

{{viz}}

:::warn Traps
- Searching the map with `lower_bound(A)`: that searches keys, not values.
- Scanning the map per query: N·M = 4·10¹⁰.
- `pastLast - first` when A > B: a negative difference stored in `size_t` becomes a huge number.
- Only `student.h` is submitted: include what it uses (`<vector>`, `<map>`, `<algorithm>`), and do not read or print anything.
:::

## Solution

{{code}}

**Complexity.** **O((N + M) log N)**. Memory: **O(N)** for the copied values.

{{tested}}
==== th
## เทคนิค: เรียงตามสิ่งที่จะค้นหา

container ที่เรียงแล้วช่วยได้แค่การค้นหา **ตามคีย์ที่ใช้เรียง** `std::map<long long,int>` เรียงตาม key แต่คำถามในข้อนี้ถามถึง **ค่า (mapped value)** ซึ่งอยู่ลำดับใดก็ได้ใน map จึงต้องสร้างโครงสร้างที่สองที่เรียงตามค่า:

1. คัดลอกค่าทั้งหมดลง `vector<int>` (O(N))
2. เรียง (O(N log N))
3. ตอบแต่ละคำถามช่วงด้วยการนับสองรอยต่อ (O(log N))

นี่คือการนับในช่วงแบบเดียวกับ Interval Count: ค่าใน [A, B] เป็นก้อนเดียว [lower_bound(A), upper_bound(B))

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: คัดลอกค่า

วนผ่าน map แล้ว push `entry.second` ไม่สนใจ key เลย: สนใจแค่ว่ามีกี่ key ที่ค่าอยู่ในช่วง และแต่ละ key ปรากฏครั้งเดียวใน map

```diagram
map (ตาม key): -1→0   2→6   4→2   9→9   10→5
ค่า:            0     6     2     9     5      → เรียง: 0 2 5 6 9
คำถาม [0, 5]:  first = ดัชนี 0 (0 ≥ 0), pastLast = ดัชนี 3 (6 > 5)  → 3
```

### ขั้นที่ 2: แต่ละคำถาม

`first = lower_bound(values, A)`, `pastLast = upper_bound(values, B)` ถ้า A > B ก้อนว่าง แต่ pastLast อาจอยู่ **ก่อน** first การลบจะได้ค่าติดลบที่วนเป็นเลขมหาศาลใน `size_t` กรณีนี้คืน 0

{{viz}}

:::warn กับดัก
- ค้นใน map ด้วย `lower_bound(A)`: นั่นค้น key ไม่ใช่ value
- ไล่ map ทุกคำถาม: N·M = 4·10¹⁰
- `pastLast - first` เมื่อ A > B: ผลต่างติดลบที่เก็บใน `size_t` กลายเป็นเลขมหาศาล
- ส่งแค่ `student.h`: include สิ่งที่ใช้ (`<vector>`, `<map>`, `<algorithm>`) และห้ามอ่านหรือพิมพ์อะไร
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** **O((N + M) log N)** หน่วยความจำ: **O(N)** สำหรับค่าที่คัดลอก

{{tested}}
