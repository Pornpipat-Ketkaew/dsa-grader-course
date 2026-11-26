title: Hacking
title_th: Hacking (ไวรัสบุกเครือข่าย)
stars: 2
tech: Multi-source Dijkstra, Vertex weights as edge weights, Maximum of shortest distances
tech_th: Dijkstra หลายต้นทาง, น้ำหนักบนจุดเป็นน้ำหนักบนเส้น, ค่ามากที่สุดของระยะสั้นที่สุด
complexity: O((n + m) log n) time · O(n + m) memory
key: A server falls at (the time its attacker fell) + c[server], so the earliest fall time is a shortest path where entering server v costs c[v]. Start Dijkstra with all k first targets in the heap at time c[s], and answer the largest fall time, the moment the last server is hacked.
key_th: เซิร์ฟเวอร์ถูกแฮกที่ (เวลาที่ผู้โจมตีถูกแฮก) + c[เซิร์ฟเวอร์] เวลาถูกแฮกเร็วสุดจึงเป็นเส้นทางสั้นที่สุดที่การเข้าเซิร์ฟเวอร์ v เสีย c[v] เริ่ม Dijkstra โดยใส่เป้าแรกทั้ง k ตัวลงใน heap ที่เวลา c[s] แล้วตอบเวลาที่มากที่สุด คือตอนที่เซิร์ฟเวอร์ตัวสุดท้ายถูกแฮก
tests: all 3 PDF samples, 300 random networks against a brute force that simulates the attack second by second, and n = 10 000, m = 40 000 in 0.01 s.
tests_th: ตัวอย่างทั้ง 3 ใน PDF เครือข่ายสุ่ม 300 ชุดเทียบกับ brute force ที่จำลองการโจมตีทีละวินาที และ n = 10 000, m = 40 000 ใช้ 0.01 วินาที
==== en
## Technique: Dijkstra with several sources and weights on vertices

Two variations of Dijkstra meet here:

- **Several sources.** Put every source in the heap at its starting value before the loop. The algorithm is unchanged; each vertex ends with the best value over all sources.
- **Weights on vertices.** If entering vertex v costs `c[v]` no matter where you come from, every edge u → v simply weighs `c[v]`.

And the answer is not one distance but the **maximum** of all shortest distances: the time at which the slowest server falls.

## How it maps onto this problem

### Step 1: the fall time is a shortest distance

Server v falls at `fall[u] + c[v]` once a neighbour u has fallen, and the virus takes the earliest option. That is exactly `fall[v] = min over neighbours u of fall[u] + c[v]`: a shortest-path equation with positive weights.

### Step 2: the first targets

A first target s needs c[s] seconds from time 0, so it starts with `fall[s] = c[s]` (not 0). All k of them enter the heap together.

```diagram
sample 2:  c = 2 5 3 1,  first target 0
0 falls at 2 → 1 at 2+5 = 7, 2 at 2+3 = 5 → 3 at 5+1 = 6 (via 2)
all hacked at max(2, 7, 5, 6) = 7
```

{{viz}}

### Step 3: answer

The network is fully hacked when the last server falls: print `max fall[v]`. The statement guarantees a connected network, so every server falls eventually.

:::warn Traps
- Starting the first targets at 0 instead of c[s] (sample 1 would print 3 instead of 8).
- The PDF says "n − 1 lines" of cables but the samples have m lines: read m.
- The output paragraph in the PDF (about "choke points") is copy-paste noise: print one number.
:::

## Solution

{{code}}

**Complexity.** Each server is finalized once and each cable relaxed twice, with heap operations: **O((n + m) log n)**. Memory: **O(n + m)**.

{{tested}}
==== th
## เทคนิค: Dijkstra หลายต้นทางและน้ำหนักบนจุด

Dijkstra สองแบบมาเจอกันในข้อนี้:

- **หลายต้นทาง** ใส่ทุกต้นทางลงใน heap ด้วยค่าเริ่มต้นของมันก่อนเริ่มลูป อัลกอริทึมเหมือนเดิม ทุกจุดได้ค่าดีที่สุดจากทุกต้นทาง
- **น้ำหนักบนจุด** ถ้าการเข้าจุด v เสีย `c[v]` ไม่ว่ามาจากไหน ทุกเส้น u → v ก็มีน้ำหนัก `c[v]`

และคำตอบไม่ใช่ระยะเดียว แต่เป็น **ค่ามากที่สุด** ของระยะสั้นที่สุดทั้งหมด: เวลาที่เซิร์ฟเวอร์ที่ช้าที่สุดถูกแฮก

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: เวลาถูกแฮกคือระยะสั้นที่สุด

เซิร์ฟเวอร์ v ถูกแฮกที่ `fall[u] + c[v]` เมื่อเพื่อนบ้าน u ถูกแฮกแล้ว และไวรัสเลือกทางที่เร็วที่สุด จึงได้ `fall[v] = min ของ fall[u] + c[v] จากเพื่อนบ้าน u` ซึ่งคือสมการเส้นทางสั้นที่สุดที่น้ำหนักเป็นบวก

### ขั้นที่ 2: เป้าแรก

เป้าแรก s ใช้ c[s] วินาทีตั้งแต่เวลา 0 จึงเริ่มที่ `fall[s] = c[s]` (ไม่ใช่ 0) ทั้ง k ตัวเข้า heap พร้อมกัน

```diagram
ตัวอย่าง 2: c = 2 5 3 1, เป้าแรก 0
0 ถูกแฮกที่ 2 → 1 ที่ 2+5 = 7, 2 ที่ 2+3 = 5 → 3 ที่ 5+1 = 6 (ผ่าน 2)
ถูกแฮกครบที่ max(2, 7, 5, 6) = 7
```

{{viz}}

### ขั้นที่ 3: คำตอบ

เครือข่ายถูกแฮกครบเมื่อเครื่องสุดท้ายถูกแฮก: พิมพ์ `max fall[v]` โจทย์รับประกันว่าเครือข่ายเชื่อมกัน ทุกเครื่องจึงถูกแฮกในที่สุด

:::warn กับดัก
- ให้เป้าแรกเริ่มที่ 0 แทน c[s] (ตัวอย่าง 1 จะได้ 3 แทน 8)
- PDF บอกว่าสายมี "n − 1 บรรทัด" แต่ตัวอย่างมี m บรรทัด: อ่าน m
- ย่อหน้าผลลัพธ์ใน PDF (เรื่อง "choke point") ถูกคัดลอกมาผิด: พิมพ์ตัวเลขเดียว
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** แต่ละเซิร์ฟเวอร์ถูกยืนยันครั้งเดียว และแต่ละสายถูกผ่อนคลายสองครั้ง พร้อมงาน heap: **O((n + m) log n)** หน่วยความจำ: **O(n + m)**

{{tested}}
