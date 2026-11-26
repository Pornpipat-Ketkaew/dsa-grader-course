title: Sparse Graph
title_th: Sparse Graph (กราฟแบบรายการประชิด)
stars: 2
tech: Adjacency sets (one std::set per vertex), Graph representation
tech_th: เซตประชิด (std::set ต่อหนึ่งจุด), การเก็บกราฟ
complexity: O(log degree) per add / remove / query · O(n + |E|) transpose and memory
files: sol/d57_q1_sparse/sparsegraph.h
pdf: C:\dataAlgoGraderProblems\d57_q1_sparse\problem.pdf
key: n can be 100 000, so an n × n matrix is impossible; store only the edges that exist. One set of out-neighbours per vertex keeps memory at O(n + |E|), rejects duplicates by itself, and answers "does a → b exist" in O(log degree).
key_th: n มีได้ถึง 100 000 เมทริกซ์ n × n จึงเป็นไปไม่ได้ ให้เก็บแค่เส้นที่มีอยู่จริง เซตของเพื่อนบ้านขาออกหนึ่งเซตต่อหนึ่งจุดใช้หน่วยความจำ O(n + |E|) กันเส้นซ้ำได้เอง และตอบ "มี a → b ไหม" ใน O(log degree)
tests: all 10 cases of the official main_sparse.cpp (n ≈ 100 000 with 500 000 edges and three transposes in case 10, 0.78 s), and 4 000 random graphs with mixed add / remove / copy / assign / double transpose checked against a set of pairs. ASan + UBSan clean.
tests_th: ทั้ง 10 กรณีของ main_sparse.cpp ที่ให้มา (n ≈ 100 000 กับ 500 000 เส้นและ transpose สามครั้งในกรณี 10 ใช้ 0.78 วินาที) และกราฟสุ่ม 4 000 กราฟที่ผสมการเพิ่ม ลบ คัดลอก กำหนดค่า และ transpose สองครั้ง ตรวจเทียบกับเซตของคู่ ไม่พบข้อผิดพลาดจาก ASan + UBSan
==== en
## Technique: adjacency lists, kept as sets

When |E| is far below n², a matrix wastes almost all of its cells. An **adjacency list** stores, for every vertex, only the neighbours it actually has: memory n + |E|. (The comparison table is on [Dense Graph](d57_q1_dense.html).)

The list can be a `vector<int>` or a `set<int>`. The choice follows from the operations the problem asks for:

- BFS / DFS only walk neighbours: a `vector` is the fastest.
- This class must also **find** and **delete** one specific edge, and ignore duplicates. A `set<int>` does all three in O(log degree), and a vertex with 100 000 out-edges cannot slow it down.

## How it maps onto this problem

### Step 1: the data

`outgoing[a]` = the set of all b with an edge a → b. Only the vertex count `n` and these n sets are stored: n = 100 000 empty sets plus 500 000 entries is a few tens of MB, compared with 10¹⁰ cells for a matrix.

### Step 2: the operations

- `AddEdge(a, b)`: `outgoing[a].insert(b)`; a set keeps one copy, so a second add does nothing.
- `RemoveEdge(a, b)`: `outgoing[a].erase(b)`; erasing a missing value is allowed and does nothing.
- `DoesEdgeExist(a, b)`: `outgoing[a].count(b) > 0`. It looks only inside a's set, so the direction is respected.

{{viz}}

### Step 3: copy and transpose

Copying `n` and the `vector<set<int>>` makes a deep copy, which is all the copy constructor needs.

The transpose visits every stored edge once: for each `from` (upward) and each `to` in `outgoing[from]`, insert `from` into `transposed.outgoing[to]`.

:::idea A free speed-up: insert with a hint
`from` only grows during the loop, so each value inserted into `transposed.outgoing[to]` is larger than everything already there. `insert(set.end(), from)` tells the set where it belongs, and the insertion becomes amortized O(1) instead of O(log degree). The whole transpose is then O(n + |E|).
:::

:::warn Traps
- An `n × n` array: 10¹⁰ cells, far over any memory limit.
- A plain `vector<int>` per vertex with a linear scan for duplicates: a vertex with 100 000 out-edges makes every add O(100 000).
- `SparseGraph()` must create **3** vertices.
:::

## Solution

Only `sparsegraph.h` is submitted; the grader's `main_sparse.cpp` runs the tests.

{{code}}

**Complexity.** Add, remove, query: **O(log degree)**. Copy and transpose: **O(n + |E|)**. Memory: **O(n + |E|)**.

{{tested}}
==== th
## เทคนิค: รายการประชิด เก็บเป็นเซต

เมื่อ |E| น้อยกว่า n² มาก เมทริกซ์จะเปลืองช่องเกือบทั้งหมด **รายการประชิด** (adjacency list) เก็บเฉพาะเพื่อนบ้านที่มีจริงของแต่ละจุด: หน่วยความจำ n + |E| (ตารางเปรียบเทียบอยู่ที่ [Dense Graph](d57_q1_dense.html))

รายการเป็น `vector<int>` หรือ `set<int>` ก็ได้ ทางเลือกมาจากคำสั่งที่โจทย์ต้องการ:

- BFS / DFS แค่เดินไปตามเพื่อนบ้าน: `vector` เร็วที่สุด
- คลาสนี้ต้อง **ค้นหา** และ **ลบ** เส้นที่ระบุได้ด้วย และต้องไม่เก็บเส้นซ้ำ `set<int>` ทำได้ทั้งสามอย่างใน O(log degree) และจุดที่มีเส้นขาออก 100 000 เส้นก็ทำให้ช้าไม่ได้

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: ข้อมูล

`outgoing[a]` = เซตของทุก b ที่มีเส้น a → b เก็บแค่จำนวนจุด `n` กับเซต n เซตนี้: เซตว่าง 100 000 เซตบวก 500 000 สมาชิกใช้หน่วยความจำไม่กี่สิบ MB เทียบกับ 10¹⁰ ช่องของเมทริกซ์

### ขั้นที่ 2: คำสั่งต่าง ๆ

- `AddEdge(a, b)`: `outgoing[a].insert(b)` เซตเก็บแค่ชุดเดียว การเพิ่มครั้งที่สองจึงไม่ทำอะไร
- `RemoveEdge(a, b)`: `outgoing[a].erase(b)` การลบค่าที่ไม่มีทำได้และไม่ทำอะไร
- `DoesEdgeExist(a, b)`: `outgoing[a].count(b) > 0` ดูแค่ในเซตของ a ทิศทางจึงถูกต้อง

{{viz}}

### ขั้นที่ 3: คัดลอกและ transpose

การคัดลอก `n` และ `vector<set<int>>` เป็นการคัดลอกแบบลึก ซึ่งคือทั้งหมดที่ copy constructor ต้องทำ

Transpose เยี่ยมทุกเส้นที่เก็บไว้ครั้งเดียว: สำหรับแต่ละ `from` (จากน้อยไปมาก) และแต่ละ `to` ใน `outgoing[from]` ใส่ `from` ลงใน `transposed.outgoing[to]`

:::idea เร็วขึ้นฟรี: insert พร้อม hint
`from` มีแต่เพิ่มขึ้นระหว่างลูป ค่าที่ใส่ลงใน `transposed.outgoing[to]` จึงมากกว่าทุกค่าที่อยู่ในนั้นแล้ว `insert(set.end(), from)` บอกเซตว่าค่านี้อยู่ตรงไหน การใส่จึงเป็น amortized O(1) แทน O(log degree) transpose ทั้งหมดจึงเป็น O(n + |E|)
:::

:::warn กับดัก
- อาร์เรย์ `n × n`: 10¹⁰ ช่อง เกินหน่วยความจำทุกขีดจำกัด
- `vector<int>` ธรรมดาต่อจุดที่ไล่หาเส้นซ้ำแบบเชิงเส้น: จุดที่มีเส้นขาออก 100 000 เส้นทำให้ทุกการเพิ่มเป็น O(100 000)
- `SparseGraph()` ต้องสร้าง **3** จุด
:::

## โค้ดเฉลย

ส่งแค่ `sparsegraph.h` ส่วน `main_sparse.cpp` ของ grader เป็นตัวทดสอบ

{{code}}

**ความซับซ้อน** เพิ่ม ลบ ถาม: **O(log degree)** คัดลอกและ transpose: **O(n + |E|)** หน่วยความจำ: **O(n + |E|)**

{{tested}}
