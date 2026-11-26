title: Path Sum
title_th: ผลรวมบนเส้นทาง (Path Sum)
stars: 3
tech: DFS over simple paths (backtracking), Range bound for pruning, Heaviest-first ordering
tech_th: DFS แจกแจง simple path (backtracking), ขอบเขตช่วงค่าสำหรับตัดกิ่ง, ลองเส้นที่หนักก่อน
complexity: exponential worst case; all n = 20 tests under 0.2 s · O(n + m) memory
key: Enumerate simple paths from every start node by DFS with an onPath mark, answering all 8 queries in the same search. A path's weight only grows and can grow by at most the sum of the heaviest edges of the nodes not on it, so cut as soon as no open query lies in that range; stop everything once all 8 are YES.
key_th: แจกแจง simple path จากทุกจุดเริ่มด้วย DFS ที่มีเครื่องหมาย onPath และตอบทั้ง 8 คำถามในการค้นหาเดียวกัน น้ำหนักของเส้นทางมีแต่เพิ่มขึ้น และเพิ่มได้ไม่เกินผลรวมเส้นที่หนักที่สุดของจุดที่ยังไม่อยู่บนเส้นทาง จึงตัดทันทีที่ไม่มีคำถามที่ยังเปิดอยู่ในช่วงนั้น และหยุดทั้งหมดเมื่อทั้ง 8 ข้อเป็น YES
tests: the PDF sample, a 1-node case and 300 random graphs against a brute force that lists every simple path; n = 20 complete graphs with random, tiny and near-20 000 queries, a 20-node chain, and 16 random dense graphs, the slowest at 0.17 s.
tests_th: ตัวอย่างใน PDF กรณี 1 จุด และกราฟสุ่ม 300 ชุดเทียบกับ brute force ที่แจกแจงทุก simple path กราฟสมบูรณ์ n = 20 ที่คำถามสุ่ม เล็กมาก และใกล้ 20 000 กราฟสายโซ่ 20 จุด และกราฟหนาแน่นสุ่ม 16 ชุด ช้าที่สุด 0.17 วินาที
==== en
## Technique: backtracking over simple paths + a bound on the value

A **simple path** is grown one edge at a time by DFS. The only rule is "never step onto a node already on the path", kept with a boolean `onPath[]` that is set before the recursive call and cleared after it (choose / explore / un-choose). Every prefix of the DFS is itself a simple path, so every call is a candidate answer.

On its own that enumerates up to about n! paths. The second ingredient is a **bound on the value** the path can still reach:

- edge weights are positive, so the weight **only grows**: anything below the current weight is out of reach;
- each node not yet on the path can add at most one edge, and that edge weighs at most the node's **heaviest edge**.

So every extension of the current path has weight in the range

> `pathWeight .. pathWeight + remainingGain`, where `remainingGain` = Σ heaviestEdge[node] over nodes not on the path.

## How it maps onto this problem

### Step 1: answer all 8 queries in one search

Running a separate search per K would repeat the same exponential work 8 times. Instead keep `found[8]` and `openCount`. At each call, mark every open query whose target equals `pathWeight`. When `openCount` reaches 0 nothing more can change the output, so the search stops at once.

### Step 2: the cut

At the start of `extend(node, pathWeight)`:

```cpp
if (!openQueryIn(pathWeight, pathWeight + remainingGain)) return;
```

Note that answered queries do not count: once K is YES there is no reason to keep looking for it. As queries get answered, the cut gets stronger.

`remainingGain` is kept up to date in O(1): subtract `heaviestEdge[next]` when `next` joins the path, add it back when it leaves.

### Step 3: every start node, heaviest edges first

A path can start anywhere, so `main` starts the DFS from each node in turn (a path and its reverse are both found, which is harmless). Each adjacency list is sorted by weight, heaviest first. Heavy paths are built early, so large targets are answered early, which lets the cut remove more of the remaining tree. In tests this alone took a dense n = 20 case from 0.72 s to 0.006 s.

{{viz}}

:::warn Traps
- The cycle 0→1→2→0 in the sample is not simple: `onPath` must include the start node.
- A path of one node has weight 0, and every K ≥ 1, so a single node never answers a query; it is still the root of the search.
- Do not stop a branch the moment the weight passes **one** target: another open target may still be larger.
:::

## Solution

{{code}}

**Complexity.** Exponential in the worst case (it lists simple paths), but the range cut and the early stop keep every n = 20 test under 0.2 s. Memory: adjacency lists and a recursion of depth n: **O(n + m)**.

{{tested}}
==== th
## เทคนิค: backtracking บน simple path + ขอบเขตของค่า

**Simple path** ถูกต่อทีละเส้นด้วย DFS กฎเดียวคือ "ห้ามเดินไปจุดที่อยู่บนเส้นทางแล้ว" เก็บด้วย boolean `onPath[]` ที่ตั้งก่อนเรียกตัวเองและล้างหลังจากนั้น (เลือก / สำรวจ / ยกเลิก) ทุก prefix ของ DFS ก็เป็น simple path ด้วย ทุกการเรียกจึงเป็นคำตอบที่เป็นไปได้

ถ้าทำแค่นั้นจะแจกแจงได้ถึงราว n! เส้นทาง ส่วนผสมที่สองคือ **ขอบเขตของค่า** ที่เส้นทางยังไปถึงได้:

- น้ำหนักเส้นเป็นบวก น้ำหนักเส้นทางจึง **มีแต่เพิ่ม**: ค่าที่ต่ำกว่าน้ำหนักปัจจุบันไปไม่ถึงแล้ว
- จุดที่ยังไม่อยู่บนเส้นทางแต่ละจุดเพิ่มเส้นได้ไม่เกินหนึ่งเส้น และเส้นนั้นหนักไม่เกิน **เส้นที่หนักที่สุด** ของจุดนั้น

ดังนั้นทุกการต่อเส้นทางปัจจุบันมีน้ำหนักอยู่ในช่วง

> `pathWeight .. pathWeight + remainingGain` โดย `remainingGain` = Σ heaviestEdge[node] ของจุดที่ไม่อยู่บนเส้นทาง

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: ตอบทั้ง 8 คำถามในการค้นหาเดียว

การค้นหาแยกสำหรับ K แต่ละตัวจะทำงานแบบเลขชี้กำลังซ้ำ 8 รอบ ให้เก็บ `found[8]` และ `openCount` แทน ในแต่ละการเรียก ทำเครื่องหมายทุกคำถามที่ยังเปิดอยู่ซึ่งมีค่าเท่ากับ `pathWeight` เมื่อ `openCount` เป็น 0 ไม่มีอะไรเปลี่ยนผลลัพธ์ได้อีก การค้นหาจึงหยุดทันที

### ขั้นที่ 2: การตัด

ที่ต้น `extend(node, pathWeight)`:

```cpp
if (!openQueryIn(pathWeight, pathWeight + remainingGain)) return;
```

สังเกตว่าคำถามที่ตอบแล้วไม่นับ: เมื่อ K เป็น YES แล้วก็ไม่ต้องหามันอีก ยิ่งตอบคำถามได้มากขึ้น การตัดก็ยิ่งแรงขึ้น

`remainingGain` อัปเดตได้ใน O(1): ลบ `heaviestEdge[next]` เมื่อ `next` เข้ามาในเส้นทาง และบวกคืนเมื่อออกไป

### ขั้นที่ 3: ทุกจุดเริ่ม และลองเส้นหนักก่อน

เส้นทางเริ่มที่ไหนก็ได้ `main` จึงเริ่ม DFS จากแต่ละจุดตามลำดับ (เส้นทางและเส้นทางย้อนกลับถูกพบทั้งคู่ ซึ่งไม่เสียหาย) รายการเพื่อนบ้านแต่ละรายการเรียงตามน้ำหนักจากหนักไปเบา เส้นทางหนักถูกสร้างเร็ว ค่า K ใหญ่ ๆ จึงถูกตอบเร็ว และทำให้การตัดลบส่วนที่เหลือของต้นไม้ได้มากขึ้น ในการทดสอบ การเรียงนี้อย่างเดียวทำให้กรณีกราฟหนาแน่น n = 20 เร็วขึ้นจาก 0.72 วินาที เป็น 0.006 วินาที

{{viz}}

:::warn กับดัก
- วง 0→1→2→0 ในตัวอย่างไม่ใช่ simple path: `onPath` ต้องรวมจุดเริ่มด้วย
- เส้นทางที่มีจุดเดียวมีน้ำหนัก 0 และทุก K ≥ 1 จุดเดียวจึงไม่เคยตอบคำถามใด แต่ยังเป็นรากของการค้นหา
- อย่าหยุดกิ่งทันทีที่น้ำหนักเกินค่าเป้าหมาย **ตัวเดียว**: อาจมีเป้าหมายอื่นที่ยังเปิดอยู่และมากกว่า
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** เป็นเลขชี้กำลังในกรณีแย่สุด (แจกแจง simple path) แต่การตัดด้วยช่วงค่าและการหยุดเร็วทำให้ทุกชุดทดสอบ n = 20 ใช้ไม่ถึง 0.2 วินาที หน่วยความจำ: รายการเพื่อนบ้านและ recursion ลึก n: **O(n + m)**

{{tested}}
