title: K Connected City
title_th: K Connected City (เลือก K เมืองที่เชื่อมกัน)
stars: 2
tech: BFS order, Prefix of a traversal is connected, Early stop
tech_th: ลำดับ BFS, prefix ของการท่องกราฟเชื่อมกันเสมอ, หยุดก่อนกำหนด
complexity: O(N + M) time and memory (usually far less: the BFS stops after K cities)
key: In any BFS (or DFS) order, each newly discovered city is adjacent to a city discovered before it. So the first K cities of the order form a connected set by themselves. Run BFS from any city and print the first K.
key_th: ในลำดับ BFS (หรือ DFS) ใด ๆ เมืองที่เพิ่งถูกค้นพบจะติดกับเมืองที่ถูกค้นพบก่อนหน้าเสมอ K เมืองแรกของลำดับจึงเป็นเซตที่เชื่อมกันเอง รัน BFS จากเมืองไหนก็ได้แล้วพิมพ์ K เมืองแรก
tests: all 3 PDF samples and N = 2, 300 random connected kingdoms (trees, lines, complete graphs, random), every output checked by a validator (K distinct cities, connected inside the set), and N = 100 000, M = 200 000, K = N in 0.09 s.
tests_th: ตัวอย่างทั้ง 3 ใน PDF และ N = 2, อาณาจักรเชื่อมกันแบบสุ่ม 300 ชุด (ต้นไม้ เส้นตรง กราฟสมบูรณ์ สุ่ม) ทุกคำตอบตรวจด้วยตัวตรวจ (K เมืองไม่ซ้ำ เชื่อมกันภายในเซต) และ N = 100 000, M = 200 000, K = N ใช้ 0.09 วินาที
==== en
## Technique: a traversal grows a connected set one vertex at a time

Graph search maintains a set of discovered vertices, and it only ever adds a vertex **through an edge from a vertex already in the set**. So after every step the discovered set is connected (inside itself). That makes traversal orders useful beyond "can I reach X?":

> every prefix of a BFS / DFS order induces a connected subgraph.

## How it maps onto this problem

### Step 1: the condition is "the K chosen cities are connected among themselves"

Travelling only through owned cities means the K cities must form a connected subgraph. The kingdom is connected, so a BFS from any city (city 1 is as good as any) reaches all N cities.

### Step 2: take a prefix of the BFS order

Let the queue be a plain array `order`. City i (i ≥ 2 in the order) was pushed while expanding some city earlier in the array, through a road. By induction, `order[0..K−1]` is connected: the first city alone is, and each next city attaches to one already inside.

```diagram
sample 1:  5 – 1 – 3 – 4 – 2      BFS from 1: order = 1, 5, 3, 4, 2
K = 3  →  1 5 3   (5 and 3 both hang on 1)
```

The PDF answer `1 3 4` is different; any valid set is accepted.

{{viz}}

### Step 3: stop early

The BFS can stop as soon as `order` holds K cities: the remaining work does not change the answer. When K is small this skips almost the whole graph; in the worst case (K = N) it is a full BFS, O(N + M).

:::warn Traps
- Choosing "city 1 and its K − 1 smallest neighbours" or "K smallest numbers": not connected in general.
- A DFS order works as well, but a recursive DFS on a line of 100 000 cities (30 % of the tests) can overflow the stack. BFS has no recursion.
- Large output: print with `'\n'`, not `endl`.
:::

## Solution

{{code}}

**Complexity.** At most every city is pushed once and every road scanned twice: **O(N + M)** time and memory.

{{tested}}
==== th
## เทคนิค: การท่องกราฟขยายเซตที่เชื่อมกันทีละจุด

การค้นหาในกราฟเก็บเซตของจุดที่ค้นพบแล้ว และจะเพิ่มจุดใหม่ **ผ่านเส้นจากจุดที่อยู่ในเซตแล้ว** เท่านั้น หลังทุกขั้นเซตที่ค้นพบจึงเชื่อมกัน (ภายในตัวเอง) ลำดับการท่องจึงมีประโยชน์มากกว่าแค่ "ไปถึง X ได้ไหม?":

> ทุก prefix ของลำดับ BFS / DFS เป็นกราฟย่อยที่เชื่อมกัน

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: เงื่อนไขคือ "K เมืองที่เลือกเชื่อมกันเอง"

การเดินทางผ่านแค่เมืองที่เป็นเจ้าของ แปลว่า K เมืองต้องเป็นกราฟย่อยที่เชื่อมกัน อาณาจักรเชื่อมกันทั้งหมด BFS จากเมืองไหนก็ได้ (เมือง 1 ก็ได้) จึงไปถึงครบ N เมือง

### ขั้นที่ 2: เอา prefix ของลำดับ BFS

ให้คิวเป็นอาร์เรย์ธรรมดา `order` เมืองที่ i (i ≥ 2 ในลำดับ) ถูก push ขณะขยายเมืองที่อยู่ก่อนหน้าในอาร์เรย์ผ่านถนนเส้นหนึ่ง โดยอุปนัย `order[0..K−1]` เชื่อมกัน: เมืองแรกเมืองเดียวเชื่อมกันแน่นอน และเมืองถัดไปแต่ละเมืองต่อกับเมืองที่อยู่ข้างในแล้ว

```diagram
ตัวอย่าง 1:  5 – 1 – 3 – 4 – 2      BFS จาก 1: order = 1, 5, 3, 4, 2
K = 3  →  1 5 3   (ทั้ง 5 และ 3 ห้อยอยู่กับ 1)
```

คำตอบใน PDF `1 3 4` ต่างออกไป แต่โจทย์รับเซตที่ถูกต้องใดก็ได้

{{viz}}

### ขั้นที่ 3: หยุดก่อน

BFS หยุดได้ทันทีที่ `order` มีครบ K เมือง งานที่เหลือไม่เปลี่ยนคำตอบ เมื่อ K เล็กจะข้ามกราฟเกือบทั้งหมด กรณีแย่สุด (K = N) คือ BFS เต็ม O(N + M)

:::warn กับดัก
- เลือก "เมือง 1 กับเพื่อนบ้าน K − 1 เมืองที่เลขน้อยสุด" หรือ "K เลขที่น้อยที่สุด": โดยทั่วไปไม่เชื่อมกัน
- ลำดับ DFS ก็ใช้ได้ แต่ DFS แบบ recursive บนเส้นตรง 100 000 เมือง (30 % ของชุดทดสอบ) อาจทำ stack ล้น BFS ไม่มี recursion
- ผลลัพธ์ใหญ่: พิมพ์ด้วย `'\n'` ไม่ใช่ `endl`
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** ทุกเมืองถูก push ไม่เกินครั้งเดียว และทุกถนนถูกไล่สองครั้ง: **O(N + M)** ทั้งเวลาและหน่วยความจำ

{{tested}}
