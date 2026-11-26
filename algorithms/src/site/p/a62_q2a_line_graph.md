title: Count Line Graphs
title_th: นับกราฟเส้นตรง
stars: 2
tech: Connected components by DFS, Path test (degree ≤ 2 and edges = nodes − 1), Handshake lemma
tech_th: หา component ด้วย DFS, ตรวจ path (degree ≤ 2 และเส้น = ปม − 1), handshake lemma
complexity: O(v + e) time and memory
key: A "line" is a path. A connected component is a path exactly when no node has degree above 2 and it has no cycle, i.e. its edge count is nodes − 1. One iterative DFS per component gathers the node count, the largest degree and the degree sum (= 2 × edges).
key_th: "กราฟเส้นตรง" คือ path component ที่เชื่อมกันเป็น path ก็ต่อเมื่อไม่มีปมที่ degree เกิน 2 และไม่มีวงรอบ คือจำนวนเส้นเท่ากับปม − 1 DFS แบบวนลูปหนึ่งครั้งต่อ component เก็บจำนวนปม degree สูงสุด และผลรวม degree (= 2 × จำนวนเส้น)
tests: the PDF samples (sample 4 under the strict rule, see Traps), 300 random graphs against a brute force that tries every node ordering, a 100 000-node path (no recursion) and v = 100 000, e = 200 000 in 0.08 s.
tests_th: ตัวอย่างใน PDF (ตัวอย่าง 4 ใช้กฎแบบเข้มงวด ดูกับดัก) กราฟสุ่ม 300 ชุดเทียบกับ brute force ที่ลองทุกลำดับปม path ยาว 100 000 ปม (ไม่ใช้ recursion) และ v = 100 000, e = 200 000 ใช้ 0.08 วินาที
==== en
## Technique: per-component properties from one traversal

"For every connected component, decide whether it has property P" is solved by the component-counting loop: each unvisited node starts a traversal, and while the traversal visits the component it also **collects whatever P needs**. Here P is "is a path", and a path is characterised by two numbers:

> a connected graph is a path ⇔ every degree ≤ 2 **and** edges = nodes − 1.

Why: degrees ≤ 2 leave only paths and rings (cycles). A connected graph with nodes − 1 edges is a tree, which rules out the ring. A single node (0 edges) is a path of length 0.

## How it maps onto this problem

### Step 1: what to collect

While popping each node of the component:
- `nodes++`;
- `degreeSum += degree(node)`;
- `degreesOk = false` if some degree exceeds 2.

Every edge has two ends inside the component, so **edges = degreeSum / 2** (the handshake lemma). No edge needs to be counted separately.

### Step 2: decide

The component is a line when `degreesOk && edges == nodes − 1`.

{{viz}}

### Step 3: shape does not matter

The PDF's second picture looks like a small binary tree (0 with children 1 and 2), but 1 – 0 – 2 is a path: every degree ≤ 2 and 2 edges on 3 nodes. The test only looks at degrees and counts, never at how the graph is drawn or rooted.

:::warn Traps
- **Sample 4 vs the grader.** The PDF prints 2 for `0-1` plus the ring `2-3-4`, as if a ring were a line. A degree-only check reproduces that sample but scored 40/100 on the real grader; the strict path definition above is the one the statement describes ("a tree where every node has one child"), and a ring is not a tree.
- A recursive DFS on a 100 000-node path is 100 000 calls deep. Use an explicit stack.
- Isolated nodes are lines (sample 3: `3 0` → 3).
:::

## Solution

{{code}}

**Complexity.** Each node is pushed once and each adjacency entry read once: **O(v + e)**. Memory: **O(v + e)**.

{{tested}}
==== th
## เทคนิค: เก็บคุณสมบัติของแต่ละ component จากการท่องครั้งเดียว

"ตัดสินว่าแต่ละ component มีคุณสมบัติ P ไหม" แก้ได้ด้วยลูปนับ component: ปมที่ยังไม่ถูกเยี่ยมเริ่มการท่องหนึ่งครั้ง และระหว่างที่การท่องเยี่ยม component นั้นก็ **เก็บทุกอย่างที่ P ต้องใช้** ไปด้วย ในข้อนี้ P คือ "เป็น path" และ path ถูกระบุได้ด้วยตัวเลขสองตัว:

> กราฟที่เชื่อมกันเป็น path ⇔ ทุก degree ≤ 2 **และ** เส้น = ปม − 1

เพราะ: degree ≤ 2 เหลือแค่ path กับวงแหวน (cycle) กราฟที่เชื่อมกันและมีเส้น ปม − 1 เส้นคือต้นไม้ จึงตัดวงแหวนทิ้ง ปมเดี่ยว (0 เส้น) คือ path ยาว 0

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: เก็บอะไรบ้าง

ขณะ pop แต่ละปมของ component:
- `nodes++`
- `degreeSum += degree(node)`
- `degreesOk = false` ถ้ามี degree เกิน 2

ทุกเส้นมีปลายสองข้างอยู่ใน component **เส้น = degreeSum / 2** (handshake lemma) ไม่ต้องนับเส้นแยก

### ขั้นที่ 2: ตัดสิน

component เป็นเส้นตรงเมื่อ `degreesOk && edges == nodes − 1`

{{viz}}

### ขั้นที่ 3: รูปร่างที่วาดไม่สำคัญ

รูปที่สองใน PDF ดูเหมือน binary tree เล็ก ๆ (0 มีลูก 1 และ 2) แต่ 1 – 0 – 2 คือ path: ทุก degree ≤ 2 และมี 2 เส้นบน 3 ปม การตรวจดูแค่ degree และจำนวน ไม่สนว่ากราฟวาดหรือเลือกรากอย่างไร

:::warn กับดัก
- **ตัวอย่าง 4 กับ grader** PDF พิมพ์ 2 สำหรับ `0-1` บวกวงแหวน `2-3-4` เหมือนนับวงแหวนเป็นเส้นตรง การตรวจแค่ degree ได้ตัวอย่างนี้ตรง แต่ได้ 40/100 บน grader จริง นิยาม path แบบเข้มงวดข้างบนคือสิ่งที่โจทย์บรรยาย ("ต้นไม้ที่ทุกปมมีลูกปมเดียว") และวงแหวนไม่ใช่ต้นไม้
- DFS แบบ recursive บน path 100 000 ปมลึก 100 000 ชั้น ใช้ stack ที่สร้างเอง
- ปมโดดเดี่ยวเป็นเส้นตรง (ตัวอย่าง 3: `3 0` → 3)
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** ทุกปมถูก push ครั้งเดียว และทุกรายการเพื่อนบ้านถูกอ่านครั้งเดียว: **O(v + e)** หน่วยความจำ: **O(v + e)**

{{tested}}
