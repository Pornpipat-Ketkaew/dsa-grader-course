title: Dense Graph
title_th: Dense Graph (กราฟแบบเมทริกซ์)
stars: 1
tech: Adjacency matrix, Graph representation
tech_th: เมทริกซ์ประชิด (adjacency matrix), การเก็บกราฟ
complexity: O(1) per add / remove / query · O(n²) transpose and memory
files: sol/d57_q1_dense/densegraph.h
pdf: C:\dataAlgoGraderProblems\d57_q1_dense\problem.pdf
key: With up to n² edges, store the graph as an n × n table of booleans. Each edge is one cell, so add, remove and query are single reads or writes, duplicates are impossible, and the transpose is the mirrored matrix.
key_th: เมื่อมีเส้นได้ถึง n² เส้น ให้เก็บกราฟเป็นตาราง boolean ขนาด n × n เส้นหนึ่งเส้นคือช่องหนึ่งช่อง การเพิ่ม ลบ และถามจึงเป็นการอ่านหรือเขียนครั้งเดียว เส้นซ้ำเกิดไม่ได้ และ transpose คือเมทริกซ์ที่สะท้อนตามแนวทแยง
tests: all 10 cases of the official main_dense.cpp (including n = 1 000 with 100 000 and 200 000 edges, 0.04 s), and 4 000 random graphs with mixed add / remove / copy / assign / double transpose checked against a set of pairs. ASan + UBSan clean.
tests_th: ทั้ง 10 กรณีของ main_dense.cpp ที่ให้มา (รวม n = 1 000 ที่มี 100 000 และ 200 000 เส้น ใช้ 0.04 วินาที) และกราฟสุ่ม 4 000 กราฟที่ผสมการเพิ่ม ลบ คัดลอก กำหนดค่า และ transpose สองครั้ง ตรวจเทียบกับเซตของคู่ ไม่พบข้อผิดพลาดจาก ASan + UBSan
==== en
## Technique: choosing a graph representation

Every graph algorithm in this chapter starts by storing the graph. There are two classic choices, and the right one depends on how many edges there can be:

| | adjacency matrix | adjacency list / set |
|---|---|---|
| memory | n² | n + \|E\| |
| "is a → b an edge?" | O(1) | O(degree) list, O(log degree) set |
| visit all neighbours of a | O(n) | O(degree) |
| fits when | \|E\| can be close to n² | \|E\| much smaller than n² |

This problem promises n ≤ 1 000 and up to n² edges: a **dense** graph. A matrix of 10⁶ booleans is small, and it makes every operation a single cell. The sister problem [Sparse Graph](d57_q1_sparse.html) has n ≤ 100 000, where the matrix would need 10¹⁰ cells.

## How it maps onto this problem

### Step 1: the data

`hasEdge[a][b]` is true exactly when the edge a → b exists. It is a directed graph, so `hasEdge[a][b]` and `hasEdge[b][a]` are independent, and a self-loop is the diagonal cell `hasEdge[a][a]`.

### Step 2: the operations are one cell each

- `AddEdge(a, b)`: `hasEdge[a][b] = true`. Adding twice writes true twice: duplicates handle themselves.
- `RemoveEdge(a, b)`: `hasEdge[a][b] = false`. Removing a missing edge writes false again: nothing changes, as required.
- `DoesEdgeExist(a, b)`: return the cell.

{{viz}}

### Step 3: copy and transpose

`vector` copies itself deeply, so the copy constructor just copies `n` and the matrix. The same holds for the assignment `g = g2` in the tests: the compiler-generated assignment copies the vector.

The transpose reverses every edge: a → b becomes b → a, so cell [a][b] moves to [b][a]. That is the matrix mirrored over its diagonal. Build it in a new `DenseGraph` and return it; the original is only read (the method is `const`).

:::key Why vector&lt;vector&lt;bool&gt;&gt;
`vector<bool>` packs 8 cells per byte, so even n = 1 000 costs only 125 KB, and copying is cheap. A raw `bool hasEdge[1000][1000]` member would work too, but every copy (and the tests make several) would move 1 MB regardless of n.
:::

:::warn Traps
- `DenseGraph()` must create **3** vertices, not 0.
- The transpose must not change the original graph: build a new one.
- `DoesEdgeExist(a, b)` is directional: 0 → 1 does not mean 1 → 0.
:::

## Solution

Only `densegraph.h` is submitted; the grader's `main_dense.cpp` runs the tests.

{{code}}

**Complexity.** Add, remove, query: **O(1)**. Copy and transpose: **O(n²)**. Memory: **n²** bits.

{{tested}}
==== th
## เทคนิค: เลือกวิธีเก็บกราฟ

อัลกอริทึมกราฟทุกตัวในบทนี้เริ่มจากการเก็บกราฟ มีสองทางเลือกคลาสสิก และทางที่ถูกขึ้นกับว่าเส้นมีได้มากแค่ไหน:

| | เมทริกซ์ประชิด | รายการ / เซตประชิด |
|---|---|---|
| หน่วยความจำ | n² | n + \|E\| |
| "a → b เป็นเส้นไหม?" | O(1) | O(degree) แบบรายการ, O(log degree) แบบเซต |
| เยี่ยมเพื่อนบ้านทั้งหมดของ a | O(n) | O(degree) |
| เหมาะเมื่อ | \|E\| ใกล้ n² ได้ | \|E\| น้อยกว่า n² มาก |

ข้อนี้รับประกัน n ≤ 1 000 และเส้นได้ถึง n²: กราฟ **หนาแน่น** เมทริกซ์ boolean 10⁶ ช่องถือว่าเล็ก และทำให้ทุกคำสั่งเป็นช่องเดียว ข้อพี่น้อง [Sparse Graph](d57_q1_sparse.html) มี n ≤ 100 000 ซึ่งเมทริกซ์จะต้องใช้ 10¹⁰ ช่อง

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: ข้อมูล

`hasEdge[a][b]` เป็นจริงก็ต่อเมื่อมีเส้น a → b เป็นกราฟมีทิศทาง `hasEdge[a][b]` และ `hasEdge[b][a]` จึงเป็นอิสระต่อกัน และวงวนตัวเองคือช่องบนแนวทแยง `hasEdge[a][a]`

### ขั้นที่ 2: ทุกคำสั่งคือช่องเดียว

- `AddEdge(a, b)`: `hasEdge[a][b] = true` เพิ่มสองครั้งก็แค่เขียน true สองครั้ง: เส้นซ้ำจัดการตัวเอง
- `RemoveEdge(a, b)`: `hasEdge[a][b] = false` ลบเส้นที่ไม่มีก็แค่เขียน false ซ้ำ: ไม่มีอะไรเปลี่ยนตามที่โจทย์ต้องการ
- `DoesEdgeExist(a, b)`: คืนค่าช่องนั้น

{{viz}}

### ขั้นที่ 3: คัดลอกและ transpose

`vector` คัดลอกตัวเองแบบลึก copy constructor จึงแค่คัดลอก `n` และเมทริกซ์ การกำหนดค่า `g = g2` ในชุดทดสอบก็เช่นกัน: assignment ที่คอมไพเลอร์สร้างให้คัดลอก vector เอง

Transpose กลับทิศทุกเส้น: a → b กลายเป็น b → a ช่อง [a][b] จึงย้ายไป [b][a] ซึ่งคือเมทริกซ์ที่สะท้อนตามแนวทแยง สร้างใน `DenseGraph` ตัวใหม่แล้วคืนค่า กราฟเดิมถูกอ่านอย่างเดียว (เมธอดเป็น `const`)

:::key ทำไมใช้ vector&lt;vector&lt;bool&gt;&gt;
`vector<bool>` อัด 8 ช่องต่อไบต์ แม้ n = 1 000 ก็ใช้แค่ 125 KB และคัดลอกได้เร็ว สมาชิก `bool hasEdge[1000][1000]` แบบดิบก็ใช้ได้ แต่ทุกการคัดลอก (ซึ่งชุดทดสอบทำหลายครั้ง) จะย้าย 1 MB ไม่ว่า n เท่าไร
:::

:::warn กับดัก
- `DenseGraph()` ต้องสร้าง **3** จุด ไม่ใช่ 0
- Transpose ห้ามเปลี่ยนกราฟเดิม: สร้างกราฟใหม่
- `DoesEdgeExist(a, b)` มีทิศทาง: 0 → 1 ไม่ได้แปลว่า 1 → 0
:::

## โค้ดเฉลย

ส่งแค่ `densegraph.h` ส่วน `main_dense.cpp` ของ grader เป็นตัวทดสอบ

{{code}}

**ความซับซ้อน** เพิ่ม ลบ ถาม: **O(1)** คัดลอกและ transpose: **O(n²)** หน่วยความจำ: **n²** บิต

{{tested}}
