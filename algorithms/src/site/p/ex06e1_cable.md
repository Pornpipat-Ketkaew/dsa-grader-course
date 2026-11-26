title: Cable Company
title_th: Cable Company (วางสายไฟเบอร์ให้ถูกที่สุด)
stars: 2
tech: Minimum spanning tree, Prim's algorithm (O(N²) array version for a complete graph)
tech_th: ต้นไม้ทอดข้ามที่น้อยที่สุด, อัลกอริทึมของ Prim (แบบอาร์เรย์ O(N²) สำหรับกราฟสมบูรณ์)
complexity: O(N²) time and memory
key: The cheapest set of cables that connects every centre is a minimum spanning tree. Every pair of centres has a price, so the graph is complete; Prim's array version (pick the outside centre with the cheapest link, then update all links) runs in O(N²), the same as reading the input.
key_th: ชุดสายที่ถูกที่สุดที่เชื่อมทุกศูนย์คือต้นไม้ทอดข้ามที่น้อยที่สุด ทุกคู่ของศูนย์มีราคา กราฟจึงสมบูรณ์ Prim แบบอาร์เรย์ (เลือกศูนย์นอกต้นไม้ที่สายเชื่อมถูกที่สุด แล้วปรับสายเชื่อมของทุกศูนย์) ใช้ O(N²) เท่ากับการอ่านข้อมูล
tests: both PDF samples and N = 2, 300 random price tables against a brute force that tries every set of N − 1 cables, and N = 1 000 in 0.03 s.
tests_th: ตัวอย่างทั้งสองใน PDF และ N = 2, ตารางราคาสุ่ม 300 ชุดเทียบกับ brute force ที่ลองทุกชุดของสาย N − 1 เส้น และ N = 1 000 ใช้ 0.03 วินาที
==== en
## Technique: minimum spanning tree with Prim

"Connect everything as cheaply as possible" asks for a **minimum spanning tree (MST)**: a cheapest set of edges that connects all vertices. It never contains a cycle (dropping a cycle edge keeps everything connected and saves money), so it has exactly N − 1 edges.

**Prim** grows one tree from any vertex. At every step it adds the cheapest edge between the tree and the outside. This is safe by the **cut property**: for any split of the vertices into two sides, the cheapest edge crossing the split belongs to some MST.

Like Dijkstra, Prim has two implementations: an array scan (O(N²)) or a heap (O(E log N)). On a complete graph E ≈ N²/2, so the array version wins.

## How it maps onto this problem

### Step 1: the triangle input

Line i (i = 0..N−2) lists the prices from centre i to centres i+1, i+2, …, N−1. Store each price in both `cost[i][j]` and `cost[j][i]`.

### Step 2: Prim with `cheapestLink`

Keep `cheapestLink[v]` = cheapest cable from v to any centre already in the tree. Each round:

1. pick the outside centre with the smallest `cheapestLink` and add it (pay that link);
2. for every outside centre, `cheapestLink[v] = min(cheapestLink[v], cost[new][v])`.

{{viz}}

```diagram
sample 1:  0-1 = 1, 0-2 = 3, 0-3 = 4, 1-2 = 2, 1-3 = 7, 2-3 = 6
tree: 0 → 1 (1) → 2 (2) → 3 (min(4, 7, 6) = 4)     total 7
```

:::warn Traps
- Reading the triangle as a full matrix, or as "cost to centre k" with k counted from 0 on every line: the k-th number on line i is the cable to centre i + 1 + k.
- Using shortest paths (Dijkstra from 0): that minimises each centre's distance to 0, not the total cable cost.
- Prices can be 0; that is fine for Prim.
:::

## Solution

{{code}}

**Complexity.** N rounds of two O(N) scans: **O(N²)**. Memory: **O(N²)** for the prices.

{{tested}}
==== th
## เทคนิค: ต้นไม้ทอดข้ามที่น้อยที่สุดด้วย Prim

"เชื่อมทุกอย่างให้ถูกที่สุด" คือการหา **ต้นไม้ทอดข้ามที่น้อยที่สุด (MST)**: ชุดเส้นที่ถูกที่สุดที่เชื่อมทุกจุด มันไม่มีวงรอบ (ถอดเส้นหนึ่งในวงยังเชื่อมกันครบและประหยัดเงิน) จึงมี N − 1 เส้นพอดี

**Prim** ขยายต้นไม้ต้นเดียวจากจุดไหนก็ได้ ทุกขั้นเพิ่มเส้นที่ถูกที่สุดระหว่างต้นไม้กับข้างนอก ซึ่งปลอดภัยด้วย **cut property**: ไม่ว่าแบ่งจุดเป็นสองฝั่งแบบไหน เส้นที่ถูกที่สุดที่ข้ามรอยแบ่งอยู่ใน MST สักต้นเสมอ

เหมือน Dijkstra, Prim เขียนได้สองแบบ: ไล่หาในอาร์เรย์ (O(N²)) หรือ heap (O(E log N)) บนกราฟสมบูรณ์ E ≈ N²/2 แบบอาร์เรย์จึงชนะ

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: ข้อมูลรูปสามเหลี่ยม

บรรทัด i (i = 0..N−2) ให้ราคาจากศูนย์ i ไปศูนย์ i+1, i+2, …, N−1 เก็บแต่ละราคาทั้งใน `cost[i][j]` และ `cost[j][i]`

### ขั้นที่ 2: Prim ด้วย `cheapestLink`

เก็บ `cheapestLink[v]` = สายที่ถูกที่สุดจาก v ไปยังศูนย์ใดก็ได้ที่อยู่ในต้นไม้แล้ว แต่ละรอบ:

1. เลือกศูนย์นอกต้นไม้ที่ `cheapestLink` น้อยที่สุด แล้วเพิ่มเข้าไป (จ่ายสายนั้น)
2. สำหรับทุกศูนย์นอกต้นไม้ `cheapestLink[v] = min(cheapestLink[v], cost[ใหม่][v])`

{{viz}}

```diagram
ตัวอย่าง 1: 0-1 = 1, 0-2 = 3, 0-3 = 4, 1-2 = 2, 1-3 = 7, 2-3 = 6
ต้นไม้: 0 → 1 (1) → 2 (2) → 3 (min(4, 7, 6) = 4)     รวม 7
```

:::warn กับดัก
- อ่านสามเหลี่ยมเป็นเมทริกซ์เต็ม หรืออ่านเป็น "ราคาไปศูนย์ k" ที่ k เริ่มนับจาก 0 ทุกบรรทัด: ตัวเลขตัวที่ k บนบรรทัด i คือสายไปศูนย์ i + 1 + k
- ใช้เส้นทางสั้นที่สุด (Dijkstra จาก 0): นั่นทำให้ระยะของแต่ละศูนย์ถึง 0 น้อยที่สุด ไม่ใช่ราคาสายรวม
- ราคาเป็น 0 ได้ Prim รับได้
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** N รอบ รอบละสองการไล่ O(N): **O(N²)** หน่วยความจำ: **O(N²)** สำหรับราคา

{{tested}}
