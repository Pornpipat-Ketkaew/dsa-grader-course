title: Detecting a Cycle
title_th: Detecting a Cycle (ตรวจหาวงรอบ)
stars: 2
tech: BFS with parent pointers, Tree edges vs non-tree edges, Forest test
tech_th: BFS พร้อม parent, เส้นของต้นไม้กับเส้นนอกต้นไม้, ตรวจว่าเป็นป่า
complexity: O(N + E) per graph · O(N + E) memory
key: A search builds a spanning forest; each vertex enters it through exactly one tree edge (to its parent). In an undirected simple graph, any edge u–w where w is already discovered and is not u's parent is a second route between them: a cycle. If no such edge appears, the graph is a forest.
key_th: การค้นหาสร้างป่าทอดข้าม แต่ละจุดเข้ามาผ่านเส้นของต้นไม้หนึ่งเส้นพอดี (ไปหา parent) ในกราฟไม่มีทิศทางแบบ simple เส้น u–w ที่ w ถูกค้นพบแล้วและไม่ใช่ parent ของ u คือเส้นทางที่สองระหว่างทั้งคู่: วงรอบ ถ้าไม่มีเส้นแบบนี้เลย กราฟเป็นป่า
tests: the PDF sample (4 graphs), 300 random inputs of up to 5 graphs against a brute force, and 100 graphs with N = 1 000, E = 10 000 in 0.11 s.
tests_th: ตัวอย่างใน PDF (4 กราฟ) ข้อมูลสุ่ม 300 ชุด ชุดละไม่เกิน 5 กราฟ เทียบกับ brute force และ 100 กราฟที่ N = 1 000, E = 10 000 ใช้ 0.11 วินาที
==== en
## Technique: classify edges during a graph search

When BFS or DFS discovers a vertex w from u, the edge u–w becomes a **tree edge**. The tree edges form a spanning forest (one tree per component), and a forest has no cycles. Every other edge of the graph is a **non-tree edge**, and adding any edge to a tree creates exactly one cycle:

> the graph has a cycle ⇔ the search meets at least one non-tree edge.

## How it maps onto this problem

### Step 1: recognise a non-tree edge

Keep `parent[v]` for every discovered vertex (−1 for a root, −2 for undiscovered). While expanding u, for each neighbour w:

- w undiscovered → tree edge, `parent[w] = u`;
- w == `parent[u]` → this is u's own tree edge seen from the other side: ignore;
- otherwise → w was discovered through another route: **non-tree edge, cycle**.

```diagram
0 – 1 – 2 – 3          BFS from 0: tree edges 0-1, 0-4, 1-2, 4-5, 2-3
 \           |         then 5 looks at 3: discovered, parent[5] = 4 ≠ 3
  4 – 5 –––––          → second path 3…0…5: cycle
```

{{viz}}

### Step 2: why "not my parent" is exact

The graph is simple (no repeated edges), so the edge back to the parent appears exactly once in u's list, and the rule skips exactly that one. A child w of u is discovered by u itself during this same scan and is never seen twice. Every other discovered neighbour must be a non-tree edge.

### Step 3: every component, every graph

Start a BFS from every undiscovered vertex, because a cycle can sit in any component (sample graph 3 has an isolated vertex 3). Read all E edges of a graph before answering, so the next graph starts at the right place.

:::idea A counting cross-check
A forest with C trees on N vertices has exactly N − C edges. So "cycle ⇔ E > N − C", where C comes from the same BFS. In particular E ≥ N always means YES.
:::

:::warn Traps
- Treating the edge back to the parent as a cycle: every edge would look like one.
- Searching only from vertex 0: the cycle may be in another component.
- Stopping input early when a cycle is found inside the reading loop: the next graph is then read from the wrong line. (The solution stores all edges first, then searches.)
:::

## Solution

{{code}}

**Complexity.** Each vertex is queued once and each adjacency entry is read once: **O(N + E)** per graph, at most 100 × 21 000 steps in total. Memory: **O(N + E)**.

{{tested}}
==== th
## เทคนิค: แยกประเภทเส้นระหว่างการค้นหาในกราฟ

เมื่อ BFS หรือ DFS ค้นพบจุด w จาก u เส้น u–w จะเป็น **เส้นของต้นไม้** เส้นของต้นไม้รวมกันเป็นป่าทอดข้าม (หนึ่งต้นต่อ component) และป่าไม่มีวงรอบ เส้นอื่นทุกเส้นในกราฟเป็น **เส้นนอกต้นไม้** และการเพิ่มเส้นใด ๆ ลงในต้นไม้จะเกิดวงรอบหนึ่งวงพอดี:

> กราฟมีวงรอบ ⇔ การค้นหาเจอเส้นนอกต้นไม้อย่างน้อยหนึ่งเส้น

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: จำเส้นนอกต้นไม้ให้ได้

เก็บ `parent[v]` ของทุกจุดที่ค้นพบ (−1 สำหรับราก, −2 สำหรับยังไม่ค้นพบ) ขณะขยาย u สำหรับเพื่อนบ้าน w แต่ละตัว:

- w ยังไม่ถูกค้นพบ → เส้นของต้นไม้ `parent[w] = u`
- w == `parent[u]` → คือเส้นของต้นไม้ของ u เองที่มองจากอีกฝั่ง: ข้าม
- นอกนั้น → w ถูกค้นพบผ่านเส้นทางอื่น: **เส้นนอกต้นไม้ มีวงรอบ**

```diagram
0 – 1 – 2 – 3          BFS จาก 0: เส้นของต้นไม้ 0-1, 0-4, 1-2, 4-5, 2-3
 \           |         แล้ว 5 มองไปที่ 3: ค้นพบแล้ว parent[5] = 4 ≠ 3
  4 – 5 –––––          → เส้นทางที่สอง 3…0…5: วงรอบ
```

{{viz}}

### ขั้นที่ 2: ทำไม "ไม่ใช่ parent ของฉัน" จึงแม่นยำ

กราฟเป็น simple (ไม่มีเส้นซ้ำ) เส้นกลับไปหา parent จึงปรากฏในรายการของ u ครั้งเดียวพอดี และกฎนี้ข้ามเส้นนั้นเส้นเดียว ลูก w ของ u ถูก u ค้นพบเองในการไล่รอบเดียวกันนี้ และไม่ถูกเห็นซ้ำ เพื่อนบ้านที่ถูกค้นพบแล้วตัวอื่นทั้งหมดจึงต้องเป็นเส้นนอกต้นไม้

### ขั้นที่ 3: ทุก component ทุกกราฟ

เริ่ม BFS จากทุกจุดที่ยังไม่ถูกค้นพบ เพราะวงรอบอยู่ใน component ไหนก็ได้ (กราฟตัวอย่างที่ 3 มีจุด 3 ที่โดดเดี่ยว) อ่านเส้นครบทั้ง E เส้นของกราฟก่อนตอบ กราฟถัดไปจึงเริ่มอ่านถูกที่

:::idea ตรวจซ้ำด้วยการนับ
ป่าที่มี C ต้นบน N จุดมีเส้นพอดี N − C เส้น ดังนั้น "มีวงรอบ ⇔ E > N − C" โดย C ได้จาก BFS เดียวกัน และโดยเฉพาะ E ≥ N แปลว่า YES เสมอ
:::

:::warn กับดัก
- นับเส้นกลับไปหา parent ว่าเป็นวงรอบ: ทุกเส้นจะดูเหมือนวงรอบ
- ค้นหาจากจุด 0 จุดเดียว: วงรอบอาจอยู่ใน component อื่น
- หยุดอ่านข้อมูลทันทีที่เจอวงรอบในลูปอ่าน: กราฟถัดไปจะถูกอ่านผิดบรรทัด (โค้ดเฉลยเก็บเส้นทั้งหมดก่อนแล้วค่อยค้นหา)
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** ทุกจุดเข้าคิวครั้งเดียว และทุกรายการเพื่อนบ้านถูกอ่านครั้งเดียว: **O(N + E)** ต่อกราฟ รวมไม่เกิน 100 × 21 000 ขั้น หน่วยความจำ: **O(N + E)**

{{tested}}
