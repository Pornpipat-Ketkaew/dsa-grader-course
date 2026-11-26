title: Travelling Tourist
title_th: Travelling Tourist (เที่ยวให้ครบ k ที่)
stars: 3
tech: Dijkstra from each site, Bitmask DP over visited sets (Held–Karp), Reduce the graph to the important nodes
tech_th: Dijkstra จากแต่ละสถานที่, DP บิตมาสก์บนเซตที่ไปแล้ว (Held–Karp), ลดกราฟเหลือแค่จุดสำคัญ
complexity: O(k · m log n + 2^k · k²) time · O(n + m + 2^k · k) memory
key: Between two consecutive sites the trip should take the cheapest route, so first compute fare[i][j] between all k sites with Dijkstra. Then only the order of the k ≤ 8 sites matters: best[visited][last] = cheapest way to have visited that set ending at last, extended one unvisited site at a time.
key_th: ระหว่างสถานที่สองที่ที่ไปต่อกัน ควรใช้เส้นทางที่ถูกที่สุด จึงหา fare[i][j] ระหว่างทั้ง k สถานที่ด้วย Dijkstra ก่อน จากนั้นสำคัญแค่ลำดับของ k ≤ 8 สถานที่: best[visited][last] = ค่าเดินทางถูกที่สุดที่ไปครบเซตนั้นและจบที่ last ขยายทีละหนึ่งที่ที่ยังไม่ไป
tests: all 4 PDF samples, 300 random networks against a brute force over all site orders with Floyd–Warshall, and a complete graph n = 500 (124 750 lines) with k = 8 in 0.03 s.
tests_th: ตัวอย่างทั้ง 4 ใน PDF เครือข่ายสุ่ม 300 ชุดเทียบกับ brute force ที่ลองทุกลำดับพร้อม Floyd–Warshall และกราฟสมบูรณ์ n = 500 (124 750 เส้น) กับ k = 8 ใช้ 0.03 วินาที
==== en
## Technique: shortest paths between key nodes + bitmask DP

Two tools combine here:

1. **Compress the graph.** When a tour only cares about visiting k special nodes, the part between two consecutive special nodes should be a shortest path. Running Dijkstra from each special node gives a k × k distance table, and the rest of the graph can be forgotten.
2. **Bitmask DP (Held–Karp).** "Visit every node of a small set in the best order" has k! orders, but the future only depends on **which** nodes are already visited and **where** we stand. That is 2^k · k states instead of k! orders.

## How it maps onto this problem

### Step 1: fares between sites

Run Dijkstra from each of the k sites over the n stations (adjacency lists, priority queue, skip outdated entries). Keep `fare[i][j]` = cheapest fare from site i to site j. Passing through another site on the way does not count as visiting it, and does not need to: the DP decides the visiting order explicitly.

### Step 2: the DP

> `best[visited][last]` = cheapest total fare to have visited exactly the sites in bitmask `visited`, ending at site `last`.

- start: `best[{i}][i] = 0` for every site (the trip may start anywhere);
- extend: for every unvisited `next`: `best[visited ∪ {next}][next] = min(…, best[visited][last] + fare[last][next])`;
- answer: `min over last of best[all][last]` (the trip may end anywhere).

Processing `visited` in increasing numeric order is valid: adding a bit always makes the number larger, so a state is final before it is extended.

{{viz}}

### Step 3: costs

k Dijkstras: 8 · m log n with m ≤ 124 750. The DP: 2⁸ · 8 · 8 = 16 384 steps. The k! = 40 320 orders would also be fine here, but the bitmask DP is the technique that scales (k = 15 is still instant, 15! is not).

:::warn Traps
- The tourist does not return to the start: this is a path, not a cycle.
- Sites are given as station numbers; the DP works with their index 0..k−1.
- Use the cheapest route between sites, not the direct line (sample 2: 4 → 3 → 2 → 1 = 38 + 24 + 38).
:::

## Solution

{{code}}

**Complexity.** **O(k · m log n)** for the Dijkstras plus **O(2^k · k²)** for the DP. Memory: the graph **O(n + m)** and the DP table **O(2^k · k)**.

{{tested}}
==== th
## เทคนิค: เส้นทางสั้นที่สุดระหว่างจุดสำคัญ + DP บิตมาสก์

ข้อนี้รวมเครื่องมือสองอย่าง:

1. **บีบกราฟ** เมื่อการเดินทางสนใจแค่การไปให้ครบ k จุดพิเศษ ช่วงระหว่างสองจุดพิเศษที่ต่อกันควรเป็นเส้นทางสั้นที่สุด การรัน Dijkstra จากแต่ละจุดพิเศษได้ตารางระยะทาง k × k และลืมส่วนอื่นของกราฟได้
2. **DP บิตมาสก์ (Held–Karp)** "ไปให้ครบทุกจุดในเซตเล็ก ๆ ด้วยลำดับที่ดีที่สุด" มี k! ลำดับ แต่อนาคตขึ้นกับแค่ว่าไป **จุดไหน** มาแล้วและยืนอยู่ **ที่ไหน** จึงมี 2^k · k สถานะแทน k! ลำดับ

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: ค่าเดินทางระหว่างสถานที่

รัน Dijkstra จากแต่ละสถานที่ทั้ง k ที่บนสถานี n สถานี (รายการเพื่อนบ้าน, priority queue, ข้ามรายการที่ล้าสมัย) เก็บ `fare[i][j]` = ค่าเดินทางถูกที่สุดจากสถานที่ i ไป j การผ่านสถานที่อื่นระหว่างทางไม่นับว่าได้เที่ยว และไม่จำเป็นต้องนับ: DP กำหนดลำดับการเที่ยวเองอย่างชัดเจน

### ขั้นที่ 2: DP

> `best[visited][last]` = ค่าเดินทางรวมถูกที่สุดที่ไปครบสถานที่ในบิตมาสก์ `visited` พอดี และจบที่สถานที่ `last`

- เริ่ม: `best[{i}][i] = 0` ทุกสถานที่ (เริ่มที่ไหนก็ได้)
- ขยาย: สำหรับทุก `next` ที่ยังไม่ไป: `best[visited ∪ {next}][next] = min(…, best[visited][last] + fare[last][next])`
- คำตอบ: `min ของ best[ทั้งหมด][last]` ทุก last (จบที่ไหนก็ได้)

การไล่ `visited` ตามค่าตัวเลขจากน้อยไปมากใช้ได้: การเพิ่มบิตทำให้ตัวเลขใหญ่ขึ้นเสมอ สถานะจึงเสร็จก่อนถูกขยาย

{{viz}}

### ขั้นที่ 3: ค่าใช้จ่าย

Dijkstra k ครั้ง: 8 · m log n โดย m ≤ 124 750 ส่วน DP: 2⁸ · 8 · 8 = 16 384 ขั้น การลองทั้ง k! = 40 320 ลำดับก็ทันในข้อนี้ แต่ DP บิตมาสก์คือเทคนิคที่ขยายได้ (k = 15 ยังเสร็จทันที แต่ 15! ไม่ทัน)

:::warn กับดัก
- นักท่องเที่ยวไม่ต้องกลับจุดเริ่ม: นี่คือเส้นทาง ไม่ใช่วงรอบ
- สถานที่ให้มาเป็นหมายเลขสถานี DP ใช้ดัชนี 0..k−1 ของมัน
- ใช้เส้นทางที่ถูกที่สุดระหว่างสถานที่ ไม่ใช่เส้นตรง (ตัวอย่าง 2: 4 → 3 → 2 → 1 = 38 + 24 + 38)
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** **O(k · m log n)** สำหรับ Dijkstra บวก **O(2^k · k²)** สำหรับ DP หน่วยความจำ: กราฟ **O(n + m)** และตาราง DP **O(2^k · k)**

{{tested}}
