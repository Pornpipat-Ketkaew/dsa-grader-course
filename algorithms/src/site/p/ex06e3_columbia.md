title: Columbia
title_th: Columbia (ค่าผ่านเมืองบนตาราง)
stars: 2
tech: Dijkstra with a binary heap, Grid graph with weights on cells, Lazy deletion
tech_th: Dijkstra ด้วย binary heap, กราฟตารางที่มีน้ำหนักบนช่อง, ลบแบบขี้เกียจ (lazy deletion)
complexity: O(R·C · log(R·C)) time · O(R·C) memory
key: Moving into a block costs that block's fee, so the grid is a graph whose edge u → v weighs fee[v] ≥ 0. Run Dijkstra from the top-left block (cost 0) with a priority queue, skipping outdated heap entries, and print every block's cost.
key_th: การเดินเข้าช่องเสียค่าผ่านของช่องนั้น ตารางจึงเป็นกราฟที่เส้น u → v มีน้ำหนัก fee[v] ≥ 0 รัน Dijkstra จากช่องบนซ้าย (cost 0) ด้วย priority queue ข้ามรายการใน heap ที่ล้าสมัย แล้วพิมพ์ค่าของทุกช่อง
tests: the PDF sample and a 1 × 1 grid, 300 random grids against a Bellman–Ford brute force, and R · C = 200 000 in 0.05 s.
tests_th: ตัวอย่างใน PDF และตาราง 1 × 1, ตารางสุ่ม 300 ชุดเทียบกับ brute force แบบ Bellman–Ford และ R · C = 200 000 ใช้ 0.05 วินาที
==== en
## Technique: Dijkstra with a priority queue

On a sparse graph (each vertex has few edges) the array version of Dijkstra wastes time scanning all vertices every round. The heap version keeps candidate `(distance, vertex)` pairs in a min-heap instead:

```
push (0, source)
while heap not empty:
    pop (d, u)
    if d > distance[u]: continue          // outdated entry ("lazy deletion")
    for each edge u → v with weight w:
        if d + w < distance[v]: distance[v] = d + w, push (d + w, v)
```

A vertex can be pushed several times (once per improvement); only the entry that matches its current distance is processed. Total cost **O(E log E)**.

## How it maps onto this problem

### Step 1: weights on cells → weights on edges

Paying to **enter** a block means every move into block v costs `fee[v]`, wherever it comes from. So the grid graph (4 neighbours) has edge weights `w(u → v) = fee[v]`, all ≥ 0. The start block is free: `cost[top-left] = 0`.

### Step 2: run Dijkstra

R · C ≤ 200 000 blocks and at most 4 edges each: the heap version is the right choice (the array version would be O((R·C)²) = 4·10¹⁰).

{{viz}}

### Step 3: print the grid

`cost` is a full R × C table; print it row by row.

```diagram
sample:  fees        costs
1 1 1 1          0 1 2 3
9 8 7 1          9 9 9 4      ← (2,0) costs 8: the detour along row 0, down the right
1 1 1 1          8 7 6 5         column and back along row 2 pays eight 1s, cheaper than 9 + 1
1 2 4 9          9 9 10 14
```

:::warn Traps
- Fees can be 0: Dijkstra is fine with 0 weights, but BFS is not (weights differ).
- The start block's own fee is not paid.
- Forgetting the "outdated entry" check: still correct, but every stale entry is expanded again.
:::

## Solution

{{code}}

**Complexity.** At most 4·R·C pushes, each O(log): **O(R·C · log(R·C))**. Memory: **O(R·C)**.

{{tested}}
==== th
## เทคนิค: Dijkstra ด้วย priority queue

บนกราฟที่เบาบาง (แต่ละจุดมีเส้นไม่กี่เส้น) Dijkstra แบบอาร์เรย์เสียเวลาไล่ทุกจุดทุกรอบ แบบ heap เก็บคู่ `(distance, vertex)` ที่เป็นตัวเลือกไว้ใน min-heap แทน:

```
push (0, source)
while heap ไม่ว่าง:
    pop (d, u)
    if d > distance[u]: continue          // รายการล้าสมัย ("lazy deletion")
    for แต่ละเส้น u → v น้ำหนัก w:
        if d + w < distance[v]: distance[v] = d + w, push (d + w, v)
```

จุดหนึ่งอาจถูก push หลายครั้ง (ครั้งละหนึ่งการปรับปรุง) แต่ประมวลผลเฉพาะรายการที่ตรงกับระยะปัจจุบัน รวม **O(E log E)**

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: น้ำหนักบนช่อง → น้ำหนักบนเส้น

การจ่ายเพื่อ **เข้า** ช่องแปลว่าทุกการเดินเข้าช่อง v เสีย `fee[v]` ไม่ว่ามาจากไหน กราฟตาราง (เพื่อนบ้าน 4 ทิศ) จึงมีน้ำหนักเส้น `w(u → v) = fee[v]` ซึ่ง ≥ 0 ทั้งหมด ช่องเริ่มต้นฟรี: `cost[บนซ้าย] = 0`

### ขั้นที่ 2: รัน Dijkstra

R · C ≤ 200 000 ช่อง แต่ละช่องมีเส้นไม่เกิน 4: แบบ heap จึงเหมาะ (แบบอาร์เรย์จะเป็น O((R·C)²) = 4·10¹⁰)

{{viz}}

### ขั้นที่ 3: พิมพ์ตาราง

`cost` คือตาราง R × C เต็ม พิมพ์ทีละแถว

```diagram
ตัวอย่าง: ค่าผ่าน    cost
1 1 1 1          0 1 2 3
9 8 7 1          9 9 9 4      ← (2,0) เสีย 8: อ้อมไปตามแถว 0 ลงคอลัมน์ขวา
1 1 1 1          8 7 6 5         แล้วกลับตามแถว 2 จ่ายเลข 1 แปดตัว ถูกกว่า 9 + 1
1 2 4 9          9 9 10 14
```

:::warn กับดัก
- ค่าผ่านเป็น 0 ได้: Dijkstra รับน้ำหนัก 0 ได้ แต่ BFS ใช้ไม่ได้ (น้ำหนักไม่เท่ากัน)
- ไม่ต้องจ่ายค่าผ่านของช่องเริ่มต้น
- ลืมตรวจ "รายการล้าสมัย": ยังถูกต้อง แต่รายการเก่าทุกตัวถูกขยายซ้ำ
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** push ไม่เกิน 4·R·C ครั้ง ครั้งละ O(log): **O(R·C · log(R·C))** หน่วยความจำ: **O(R·C)**

{{tested}}
