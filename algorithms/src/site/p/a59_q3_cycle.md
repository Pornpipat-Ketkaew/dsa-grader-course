title: Cycle in a Tree
title_th: วงวนในต้นไม้
stars: 2
tech: Leaf peeling (repeatedly removing degree-1 nodes), Unicyclic graphs
tech_th: ลอกใบ (ลบปม degree 1 ซ้ำ ๆ), กราฟที่มีวงรอบเดียว
complexity: O(n) time and memory
key: A connected graph with n nodes and n edges has exactly one cycle, with trees hanging off it. A leaf (degree 1) cannot be on the cycle; removing it can only create new leaves. Peel leaves until none remain: the survivors all have degree 2 and are exactly the cycle, whose size equals their count.
key_th: กราฟที่เชื่อมกันซึ่งมี n ปมและ n เส้นมีวงรอบเดียวพอดี และมีต้นไม้ห้อยออกจากวงรอบ ใบ (degree 1) อยู่บนวงรอบไม่ได้ การลบใบทำได้แค่สร้างใบใหม่ ลอกใบไปเรื่อย ๆ จนไม่เหลือ ปมที่รอดมีทุกปม degree 2 และคือวงรอบพอดี ขนาดของวงรอบเท่ากับจำนวนปมที่เหลือ
tests: the PDF sample and a triangle, 300 random unicyclic graphs against a brute force, a 100 000-node ring, a path closed into a ring, and a 100 000-node path ending in a triangle (answer 3) in 0.03 s.
tests_th: ตัวอย่างใน PDF และสามเหลี่ยม กราฟวงรอบเดียวแบบสุ่ม 300 ชุดเทียบกับ brute force วงแหวน 100 000 ปม path ที่ปิดเป็นวง และ path 100 000 ปมที่ปลายเป็นสามเหลี่ยม (คำตอบ 3) ใช้ 0.03 วินาที
==== en
## Technique: peel off what cannot matter

Some structure in a graph can be found by **removing everything that provably is not part of it**. For cycles the removable things are leaves: a node with only one edge is a dead end, and a cycle needs two edges at every node. Removing a leaf lowers its neighbour's degree, which may make that neighbour a leaf too, so the peeling continues inward, like a BFS from all leaves at once (it is the same idea as Kahn's topological sort, on undirected degrees).

## How it maps onto this problem

### Step 1: the shape of the graph

n nodes, n edges, connected: a spanning tree uses n − 1 edges, so there is exactly one extra edge and exactly one cycle. Everything else is trees hanging off cycle nodes.

```diagram
sample:   3 – 1 – 0 – 2 – 6        cycle 0-1-4-5-2-0
              |       | \          hanging trees: 3 (on 1), 8 (on 5), 6 and 7 (on 2)
              4 ––––– 5   7
                      |
                      8
```

### Step 2: peel

Put all degree-1 nodes in a list. Repeatedly take one out, remove it, and decrease the degree of its single remaining neighbour; if that neighbour now has degree 1, it becomes a leaf too.

{{viz}}

### Step 3: what is left is the cycle

Peeling stops when no node has degree 1. Every survivor has degree ≥ 2 within the survivors, and a hanging tree always has a leaf, so no tree part can survive; the cycle nodes keep their two cycle edges forever, so none of them is removed. Hence the survivors are exactly the cycle, and a cycle has as many edges as nodes: the answer is `remaining`.

:::idea Alternative: DFS back edge
A DFS that records depths finds the single non-tree edge u–w (w an ancestor of u); the cycle size is `depth[u] − depth[w] + 1`. It needs a true DFS order (recursion or a careful stack) and recursion would be 100 000 deep on the ring tests, which is why peeling is the safer choice here.
:::

:::warn Traps
- Answering with the number of edges or nodes in total: only the cycle counts.
- A recursive DFS on the 100 000-node ring or path tests overflows small stacks.
:::

## Solution

{{code}}

**Complexity.** Each node is removed at most once and each adjacency entry is touched once: **O(n)**. Memory: **O(n)**.

{{tested}}
==== th
## เทคนิค: ลอกส่วนที่ไม่มีผลออก

โครงสร้างบางอย่างในกราฟหาได้ด้วยการ **ลบทุกอย่างที่พิสูจน์ได้ว่าไม่ใช่ส่วนของมัน** สำหรับวงรอบ สิ่งที่ลบได้คือใบ: ปมที่มีเส้นเดียวเป็นทางตัน แต่วงรอบต้องมีสองเส้นที่ทุกปม การลบใบลด degree ของเพื่อนบ้าน ซึ่งอาจทำให้เพื่อนบ้านกลายเป็นใบด้วย การลอกจึงดำเนินเข้าด้านในต่อไป เหมือน BFS จากทุกใบพร้อมกัน (เป็นแนวคิดเดียวกับ topological sort แบบ Kahn แต่ใช้ degree แบบไม่มีทิศทาง)

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: รูปร่างของกราฟ

n ปม n เส้น เชื่อมกัน: ต้นไม้ทอดข้ามใช้ n − 1 เส้น จึงมีเส้นเกินมาหนึ่งเส้นพอดี และมีวงรอบหนึ่งวงพอดี ส่วนอื่นคือต้นไม้ที่ห้อยจากปมบนวงรอบ

```diagram
ตัวอย่าง:  3 – 1 – 0 – 2 – 6        วงรอบ 0-1-4-5-2-0
              |       | \          ต้นไม้ที่ห้อย: 3 (ที่ 1), 8 (ที่ 5), 6 และ 7 (ที่ 2)
              4 ––––– 5   7
                      |
                      8
```

### ขั้นที่ 2: ลอก

ใส่ทุกปมที่ degree 1 ลงในรายการ หยิบออกทีละตัว ลบมัน แล้วลด degree ของเพื่อนบ้านตัวเดียวที่เหลือ ถ้าเพื่อนบ้านนั้นเหลือ degree 1 ก็กลายเป็นใบด้วย

{{viz}}

### ขั้นที่ 3: ที่เหลือคือวงรอบ

การลอกหยุดเมื่อไม่มีปมที่ degree 1 ทุกปมที่รอดมี degree ≥ 2 ในกลุ่มที่รอด และต้นไม้ที่ห้อยอยู่มีใบเสมอ ส่วนที่เป็นต้นไม้จึงรอดไม่ได้ ส่วนปมบนวงรอบมีเส้นของวงรอบสองเส้นตลอด จึงไม่มีปมไหนถูกลบ ปมที่รอดจึงคือวงรอบพอดี และวงรอบมีเส้นเท่ากับจำนวนปม: คำตอบคือ `remaining`

:::idea อีกทาง: back edge ของ DFS
DFS ที่จดความลึกจะเจอเส้นนอกต้นไม้เส้นเดียว u–w (w เป็นบรรพบุรุษของ u) ขนาดวงรอบคือ `depth[u] − depth[w] + 1` แต่ต้องใช้ลำดับ DFS จริง (recursion หรือ stack ที่จัดการอย่างระวัง) และ recursion จะลึก 100 000 ชั้นในชุดทดสอบวงแหวน การลอกใบจึงปลอดภัยกว่าในข้อนี้
:::

:::warn กับดัก
- ตอบด้วยจำนวนเส้นหรือปมทั้งหมด: นับแค่วงรอบ
- DFS แบบ recursive บนชุดทดสอบวงแหวนหรือ path 100 000 ปมทำ stack เล็กล้น
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** แต่ละปมถูกลบไม่เกินครั้งเดียว และแต่ละรายการเพื่อนบ้านถูกแตะครั้งเดียว: **O(n)** หน่วยความจำ: **O(n)**

{{tested}}
