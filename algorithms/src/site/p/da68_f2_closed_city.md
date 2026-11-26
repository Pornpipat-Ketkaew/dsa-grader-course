title: Closed City
title_th: เมืองปิด
stars: 1
tech: Removing forbidden vertices before the search, Dijkstra with a binary heap, Early exit at the target
tech_th: ลบจุดต้องห้ามก่อนค้นหา, Dijkstra ด้วย binary heap, หยุดเมื่อถึงเป้าหมาย
complexity: O((N + M) log N) time · O(N + M) memory
key: "The path may not pass through closed cities" means those cities, and every road touching them, are simply not in the graph. Skip such roads while reading, then run a normal Dijkstra from city 1 and stop when city N is popped.
key_th: "เส้นทางห้ามผ่านเมืองปิด" แปลว่าเมืองเหล่านั้นและถนนทุกเส้นที่แตะมันไม่อยู่ในกราฟเลย ข้ามถนนแบบนั้นตอนอ่าน แล้วรัน Dijkstra ธรรมดาจากเมือง 1 และหยุดเมื่อ pop เมือง N
tests: both PDF samples and N = 2, 300 random graphs against a Floyd–Warshall brute force on the open cities, and a large random graph in 0.10 s.
tests_th: ตัวอย่างทั้งสองใน PDF และ N = 2, กราฟสุ่ม 300 ชุดเทียบกับ brute force แบบ Floyd–Warshall บนเมืองที่เปิด และกราฟสุ่มขนาดใหญ่ ใช้ 0.10 วินาที
==== en
## Technique: change the graph, not the algorithm

When a shortest-path problem adds a restriction like "never use these vertices", the cleanest solution usually **builds a different graph** on which the plain algorithm answers the question. A forbidden vertex is a vertex with no usable edges, so deleting its edges is enough; Dijkstra itself stays untouched.

## How it maps onto this problem

### Step 1: drop the closed roads while reading

Mark the K closed cities first (they come before the roads). For each road a–b, if a or b is closed, ignore it; otherwise add it to both adjacency lists.

### Step 2: Dijkstra from city 1

Weights are road lengths (positive), so the heap version of Dijkstra applies. City N's distance is final the moment it is popped, so the loop can stop there.

```diagram
sample 2: closed 3 and 4
1 –5– 2 –15– 5        roads through 3 or 4 vanish (1-4, 4-5, 2-3, 3-5)
                      the only route left: 1 → 2 → 5 = 5 + 15 = 20
```

{{viz}}

:::warn Traps
- Checking "is closed" only when popping a city: a closed city then still gets a distance and is never expanded, which also works, but forgetting the check entirely lets paths pass through it.
- K = 0 makes the second input line empty (sample 1): reading with `cin >>` skips it automatically.
- Distances may exceed 2³¹ on large inputs: use `long long`.
:::

## Solution

{{code}}

**Complexity.** **O((N + M) log N)** with the heap. Memory: **O(N + M)**.

{{tested}}
==== th
## เทคนิค: เปลี่ยนกราฟ ไม่ใช่เปลี่ยนอัลกอริทึม

เมื่อโจทย์เส้นทางสั้นที่สุดเพิ่มข้อจำกัดอย่าง "ห้ามใช้จุดเหล่านี้" วิธีที่สะอาดที่สุดมักเป็นการ **สร้างกราฟใหม่** ที่อัลกอริทึมธรรมดาตอบคำถามได้ จุดต้องห้ามคือจุดที่ไม่มีเส้นให้ใช้ การลบเส้นของมันจึงพอ Dijkstra เองไม่ต้องแก้

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: ทิ้งถนนที่ปิดตอนอ่าน

ทำเครื่องหมายเมืองปิด K เมืองก่อน (มาก่อนถนน) สำหรับแต่ละถนน a–b ถ้า a หรือ b ปิด ให้ข้าม ไม่เช่นนั้นใส่ลงในรายการเพื่อนบ้านทั้งสองฝั่ง

### ขั้นที่ 2: Dijkstra จากเมือง 1

น้ำหนักคือความยาวถนน (เป็นบวก) ใช้ Dijkstra แบบ heap ได้ ระยะของเมือง N เป็นค่าสุดท้ายทันทีที่ถูก pop ลูปจึงหยุดตรงนั้นได้

```diagram
ตัวอย่าง 2: ปิด 3 และ 4
1 –5– 2 –15– 5        ถนนที่ผ่าน 3 หรือ 4 หายไป (1-4, 4-5, 2-3, 3-5)
                      เส้นทางเดียวที่เหลือ: 1 → 2 → 5 = 5 + 15 = 20
```

{{viz}}

:::warn กับดัก
- ตรวจ "ปิดไหม" ตอน pop เท่านั้น: เมืองปิดยังได้ระยะแต่ไม่ถูกขยาย ก็ใช้ได้เหมือนกัน แต่ถ้าลืมตรวจเลย เส้นทางจะผ่านมันได้
- K = 0 ทำให้บรรทัดที่สองว่าง (ตัวอย่าง 1): อ่านด้วย `cin >>` ข้ามให้เอง
- ระยะอาจเกิน 2³¹ เมื่อข้อมูลใหญ่: ใช้ `long long`
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** **O((N + M) log N)** ด้วย heap หน่วยความจำ: **O(N + M)**

{{tested}}
