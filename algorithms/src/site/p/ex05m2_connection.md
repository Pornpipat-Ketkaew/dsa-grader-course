title: Connection
title_th: Connection (เพื่อนระดับ K)
stars: 2
tech: BFS distances, Depth-limited BFS from every vertex, Resetting only what was touched
tech_th: ระยะทางด้วย BFS, BFS จำกัดความลึกจากทุกจุด, รีเซ็ตเฉพาะส่วนที่แตะ
complexity: O(N · (N + E)) worst case, much less in practice · O(N + E) memory
key: "Degree K friends" are the vertices at distance ≤ K. In an unweighted graph BFS discovers vertices in order of distance, so a BFS from each student that does not expand vertices at distance K counts exactly them. Take the maximum over all N students.
key_th: "เพื่อนระดับ K" คือจุดที่ระยะ ≤ K ในกราฟไม่มีน้ำหนัก BFS ค้นพบจุดเรียงตามระยะ BFS จากนักเรียนแต่ละคนที่ไม่ขยายจุดที่ระยะ K จึงนับได้พอดี แล้วเอาค่ามากที่สุดจากทั้ง N คน
tests: the PDF sample, 300 random graphs against a Floyd–Warshall brute force, and N = 1 000, E = 100 000, K = 4 in 0.21 s.
tests_th: ตัวอย่างใน PDF กราฟสุ่ม 300 ชุดเทียบกับ brute force แบบ Floyd–Warshall และ N = 1 000, E = 100 000, K = 4 ใช้ 0.21 วินาที
==== en
## Technique: BFS = shortest distances in an unweighted graph

BFS processes vertices in **layers**: first the source (distance 0), then all its neighbours (distance 1), then their new neighbours (distance 2), and so on. The first time a vertex is discovered, `distance[v]` is already its shortest distance. Two consequences used here:

- "everyone within K steps" is the union of layers 0..K;
- the search can stop growing at layer K: a vertex at distance K is counted but not expanded.

## How it maps onto this problem

### Step 1: one BFS per student

The answer depends on the starting student, so run a BFS from each of the N ≤ 1 000 students. The number of vertices that enter the queue is that student's count (the student is their own degree-0 friend, so the count starts at 1).

### Step 2: the depth limit

When popping a vertex with `distance == K`, skip its neighbours. Everything pushed has distance ≤ K, so the queue size at the end is exactly the count.

```diagram
sample, BFS from 6 (K = 2):   layer 0: 6   layer 1: 0 1 5   layer 2: 4      → 5 friends
         BFS from 4 (K = 2):   layer 0: 4   layer 1: 1 3 5   layer 2: 6 2    → 6 friends (the answer)
```

{{viz}}

### Step 3: make N BFS runs cheap

- The queue is a plain array with `read` and `write` indices, reused for every student.
- After a BFS, only the vertices in `queue[0..write)` have a distance set, so reset just those instead of all N. With a small K a BFS often touches few vertices.

The worst case is N full BFS runs: 1 000 × (1 000 + 200 000 adjacency entries) ≈ 2·10⁸ simple steps, which the tests run in 0.21 s.

:::warn Traps
- Counting only vertices at distance exactly K: the statement says "at most K".
- Forgetting the student themself.
- Using DFS: DFS does not give shortest distances, so its depth limit would cut paths that are actually short.
:::

## Solution

{{code}}

**Complexity.** Each BFS is O(N + E) at most: **O(N · (N + E))** in the worst case. Memory: **O(N + E)**.

{{tested}}
==== th
## เทคนิค: BFS = ระยะทางสั้นที่สุดในกราฟไม่มีน้ำหนัก

BFS ประมวลผลจุดเป็น **ชั้น**: ต้นทางก่อน (ระยะ 0) แล้วเพื่อนบ้านทั้งหมดของมัน (ระยะ 1) แล้วเพื่อนบ้านใหม่ของพวกนั้น (ระยะ 2) ไปเรื่อย ๆ ครั้งแรกที่จุดหนึ่งถูกค้นพบ `distance[v]` ก็คือระยะสั้นที่สุดแล้ว ผลที่ใช้ในข้อนี้มีสองข้อ:

- "ทุกคนที่อยู่ภายใน K ก้าว" คือการรวมชั้น 0..K
- การค้นหาหยุดขยายที่ชั้น K ได้: จุดที่ระยะ K ถูกนับแต่ไม่ถูกขยาย

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: BFS หนึ่งครั้งต่อนักเรียน

คำตอบขึ้นกับนักเรียนที่เริ่ม จึงรัน BFS จากนักเรียนแต่ละคนในทั้ง N ≤ 1 000 คน จำนวนจุดที่เข้าคิวคือจำนวนเพื่อนของนักเรียนคนนั้น (นักเรียนเป็นเพื่อนระดับ 0 ของตัวเอง การนับจึงเริ่มที่ 1)

### ขั้นที่ 2: จำกัดความลึก

เมื่อ pop จุดที่ `distance == K` ให้ข้ามเพื่อนบ้านของมัน ทุกจุดที่ถูก push มีระยะ ≤ K ขนาดคิวตอนจบจึงเท่ากับจำนวนที่ต้องการพอดี

```diagram
ตัวอย่าง BFS จาก 6 (K = 2):   ชั้น 0: 6   ชั้น 1: 0 1 5   ชั้น 2: 4      → เพื่อน 5 คน
         BFS จาก 4 (K = 2):   ชั้น 0: 4   ชั้น 1: 1 3 5   ชั้น 2: 6 2    → เพื่อน 6 คน (คำตอบ)
```

{{viz}}

### ขั้นที่ 3: ทำให้ BFS N ครั้งถูกลง

- คิวเป็นอาร์เรย์ธรรมดาที่มีดัชนี `read` และ `write` ใช้ซ้ำกับนักเรียนทุกคน
- หลัง BFS มีแค่จุดใน `queue[0..write)` ที่ถูกตั้งระยะ จึงรีเซ็ตแค่พวกนั้นแทนทั้ง N จุด เมื่อ K เล็ก BFS มักแตะจุดไม่กี่จุด

กรณีแย่สุดคือ BFS เต็ม N ครั้ง: 1 000 × (1 000 + 200 000 รายการเพื่อนบ้าน) ≈ 2·10⁸ ขั้นง่าย ๆ ซึ่งชุดทดสอบใช้ 0.21 วินาที

:::warn กับดัก
- นับแค่จุดที่ระยะ K พอดี: โจทย์บอกว่า "ไม่เกิน K"
- ลืมนับตัวนักเรียนเอง
- ใช้ DFS: DFS ไม่ได้ให้ระยะสั้นที่สุด การจำกัดความลึกจะตัดเส้นทางที่จริง ๆ แล้วสั้น
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** BFS แต่ละครั้งไม่เกิน O(N + E): **O(N · (N + E))** ในกรณีแย่สุด หน่วยความจำ: **O(N + E)**

{{tested}}
