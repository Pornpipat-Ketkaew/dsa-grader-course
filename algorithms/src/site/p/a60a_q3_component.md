title: Component Count
title_th: Component Count (นับส่วนประกอบเชื่อมโยง)
stars: 1
tech: Graph traversal (DFS with an explicit stack), Connected components, Adjacency lists
tech_th: การท่องกราฟ (DFS ด้วย stack ที่สร้างเอง), ส่วนประกอบเชื่อมโยง, รายการประชิด
complexity: O(v + e) time and memory
key: Scan the nodes in order. Every node that no earlier search has reached belongs to a new component: count it, then run one DFS from it to mark its whole component. Each node and edge is handled once.
key_th: ไล่ปมตามลำดับ ทุกปมที่การค้นหาก่อนหน้ายังไปไม่ถึงคือ component ใหม่: นับเพิ่ม แล้วรัน DFS หนึ่งครั้งจากปมนั้นเพื่อทำเครื่องหมายทั้ง component ทุกปมและทุกเส้นถูกจัดการครั้งเดียว
tests: all 5 PDF samples, 300 random graphs against a union-find brute force, and a 10 000-node chain (the case that overflows a recursive DFS on small stacks) in 0.01 s.
tests_th: ตัวอย่างทั้ง 5 ใน PDF กราฟสุ่ม 300 ชุดเทียบกับ brute force แบบ union-find และสายโซ่ 10 000 ปม (กรณีที่ทำให้ DFS แบบ recursive ล้น stack เมื่อ stack เล็ก) ใช้ 0.01 วินาที
==== en
## Technique: graph traversal finds a whole component

A DFS (or BFS) started at node s visits **exactly** the nodes connected to s: its connected component. Counting components is therefore:

```
for every node s:
    if s is not visited yet:   components++, traverse from s (marking visited)
```

Each traversal marks one full component, so no component is counted twice, and none is missed because every node is tried as a start.

## How it maps onto this problem

### Step 1: adjacency lists

v and e are up to 10 000. Store `neighbors[a]` as a vector and push every undirected edge **both ways** (a → b and b → a). A matrix would also fit here (10⁸ bits), but scanning a row costs O(v) per node, O(v²) in total; lists keep the traversal O(v + e).

### Step 2: the traversal

The DFS uses an explicit `vector<int>` as the stack instead of recursion:

- push `start`, marked visited;
- pop a node, and push every neighbour not yet visited, **marking it when pushed**, so a node never enters the stack twice.

{{viz}}

:::idea Why an explicit stack
A chain 1 – 2 – 3 – … – 10 000 makes a recursive DFS 10 000 calls deep. That usually works, but some judges run with a small stack. The loop version has no depth limit and is just as short.
:::

### Step 3: the count

Every time the outer loop meets an unvisited node, a new component starts. Isolated nodes (no edges) are components of size 1 and are counted the same way (sample 2: `5 0` → 5).

:::warn Traps
- Storing each edge only one way: the search then misses nodes reachable only "backwards".
- Nodes are numbered 1..v: size the arrays v + 1.
- Duplicate edges and triangles (sample 1) are harmless because of the visited marks.
:::

## Solution

{{code}}

**Complexity.** Every node is pushed once and every adjacency entry is read once: **O(v + e)** time and memory.

{{tested}}
==== th
## เทคนิค: การท่องกราฟได้ทั้ง component

DFS (หรือ BFS) ที่เริ่มจากปม s จะเยี่ยม **เฉพาะและทั้งหมด** ของปมที่เชื่อมกับ s: ซึ่งคือ connected component ของมัน การนับ component จึงเป็น:

```
for ทุกปม s:
    if s ยังไม่ถูกเยี่ยม:   components++, ท่องจาก s (ทำเครื่องหมายว่าเยี่ยมแล้ว)
```

การท่องแต่ละครั้งทำเครื่องหมายครบหนึ่ง component จึงไม่มี component ถูกนับซ้ำ และไม่มีที่ตกหล่นเพราะทุกปมถูกลองเป็นจุดเริ่ม

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: รายการประชิด

v และ e ไม่เกิน 10 000 เก็บ `neighbors[a]` เป็น vector และใส่ทุกเส้นไม่มีทิศทาง **ทั้งสองทาง** (a → b และ b → a) เมทริกซ์ก็พอใส่ได้ (10⁸ บิต) แต่การไล่แถวใช้ O(v) ต่อปม รวม O(v²) ส่วนรายการทำให้การท่องเป็น O(v + e)

### ขั้นที่ 2: การท่อง

DFS ใช้ `vector<int>` เป็น stack เองแทน recursion:

- push `start` พร้อมทำเครื่องหมาย
- pop ปมหนึ่ง แล้ว push ทุกเพื่อนบ้านที่ยังไม่ถูกเยี่ยม **ทำเครื่องหมายตอน push** ปมจึงไม่เข้า stack ซ้ำ

{{viz}}

:::idea ทำไมใช้ stack เอง
สายโซ่ 1 – 2 – 3 – … – 10 000 ทำให้ DFS แบบ recursive ลึก 10 000 ชั้น ปกติใช้ได้ แต่ grader บางตัวมี stack เล็ก แบบลูปไม่มีข้อจำกัดความลึกและสั้นพอกัน
:::

### ขั้นที่ 3: การนับ

ทุกครั้งที่ลูปนอกเจอปมที่ยังไม่ถูกเยี่ยม component ใหม่ก็เริ่มขึ้น ปมโดดเดี่ยว (ไม่มีเส้น) คือ component ขนาด 1 และถูกนับแบบเดียวกัน (ตัวอย่าง 2: `5 0` → 5)

:::warn กับดัก
- เก็บเส้นทางเดียว: การค้นหาจะพลาดปมที่ไปถึงได้แค่ "ย้อนทาง"
- ปมมีหมายเลข 1..v: จองอาร์เรย์ขนาด v + 1
- เส้นซ้ำและสามเหลี่ยม (ตัวอย่าง 1) ไม่มีผลเพราะมีเครื่องหมายเยี่ยมแล้ว
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** ทุกปมถูก push ครั้งเดียว และทุกรายการเพื่อนบ้านถูกอ่านครั้งเดียว: **O(v + e)** ทั้งเวลาและหน่วยความจำ

{{tested}}
