title: Shortest Start
title_th: Shortest Start (เลือกจุดเริ่มที่ดีที่สุด)
stars: 2
tech: Bellman–Ford (negative weights), Multi-source by a virtual source, Early termination
tech_th: Bellman–Ford (น้ำหนักติดลบ), หลายต้นทางด้วยต้นทางสมมุติ, หยุดก่อนกำหนด
complexity: O(n · m) worst case, usually far fewer rounds · O(n + m) memory
key: Negative weights rule out Dijkstra, and there is no negative cycle, so Bellman–Ford works. "Start from any of k nodes" = a virtual source with 0-weight edges to each of them, which just means all k starts begin at distance 0. Relax all edges in rounds until nothing changes, then print distance[v].
key_th: น้ำหนักติดลบทำให้ใช้ Dijkstra ไม่ได้ และไม่มีวงรอบติดลบ Bellman–Ford จึงใช้ได้ "เริ่มจากจุดใดก็ได้ใน k จุด" = ต้นทางสมมุติที่มีเส้นน้ำหนัก 0 ไปยังทุกจุด ซึ่งก็คือให้ทั้ง k จุดเริ่มที่ระยะ 0 ผ่อนคลายทุกเส้นเป็นรอบ ๆ จนไม่มีอะไรเปลี่ยน แล้วพิมพ์ distance[v]
tests: both PDF samples and n = 1, 300 random graphs without negative cycles against a brute force, and two worst-case graphs with n = 5 000, m = 100 000 (a DAG and a reversed chain that improves one node per round) in 0.05 s and 0.27 s.
tests_th: ตัวอย่างทั้งสองใน PDF และ n = 1, กราฟสุ่มที่ไม่มีวงรอบติดลบ 300 ชุดเทียบกับ brute force และกราฟแย่สุดสองชุดที่ n = 5 000, m = 100 000 (DAG และสายโซ่กลับทิศที่ดีขึ้นทีละจุดต่อรอบ) ใช้ 0.05 และ 0.27 วินาที
==== en
## Technique: Bellman–Ford

Dijkstra's "the closest vertex is final" argument breaks with negative edges: a longer-looking route may later get cheaper. **Bellman–Ford** makes no such assumption:

```
repeat n − 1 times:
    for every edge a → b with weight w:
        distance[b] = min(distance[b], distance[a] + w)
```

After round r, every vertex whose shortest path uses at most r edges is correct. Without negative cycles a shortest path has at most n − 1 edges, so n − 1 rounds suffice. If a whole round changes nothing, no later round can either: stop early.

## How it maps onto this problem

### Step 1: many starts = one virtual source

Add an imaginary vertex S with a 0-weight edge to each allowed start. The best start for v is then the shortest path from S to v. Running Bellman–Ford from S is the same as setting **distance = 0 for every start** before round 1; the virtual vertex never needs to exist.

### Step 2: rounds of relaxation

Store the edges in one array (Bellman–Ford does not need adjacency lists). Skip edges whose tail is still unreached, so that "∞ + negative" never sneaks in.

```diagram
sample 2: starts 0 1 3 4, goal 5     all starts at 0
round 1:  1→2: 0+5 = 5   2→5: 5−4 = 1   3→2: 0+2 = 2
round 2:  2→5: 2−4 = −2               round 3: no change → stop
```

{{viz}}

### Step 3: answer

Print `distance[v]`. The statement guarantees some start reaches v.

:::warn Traps
- Using Dijkstra: wrong with negative weights (sample 2 needs the route through the −4 edge found after a cheaper value of node 2 appears).
- Running k separate Bellman–Fords: k up to 5 000 times slower.
- Relaxing from unreached vertices with a sentinel like INT_MAX: `INT_MAX + (−4)` looks like a real distance.
:::

## Solution

{{code}}

**Complexity.** At most n − 1 rounds of m relaxations: **O(n · m)** = 5·10⁸ simple steps in the very worst case, usually stopping after a few rounds. Memory: **O(n + m)**.

{{tested}}
==== th
## เทคนิค: Bellman–Ford

เหตุผลของ Dijkstra ที่ว่า "จุดที่ใกล้ที่สุดเป็นค่าสุดท้าย" ใช้ไม่ได้เมื่อมีเส้นติดลบ: เส้นทางที่ดูยาวกว่าอาจถูกลงทีหลัง **Bellman–Ford** ไม่ได้สมมุติแบบนั้น:

```
ทำซ้ำ n − 1 ครั้ง:
    for ทุกเส้น a → b น้ำหนัก w:
        distance[b] = min(distance[b], distance[a] + w)
```

หลังรอบที่ r ทุกจุดที่เส้นทางสั้นที่สุดใช้ไม่เกิน r เส้นจะถูกต้อง เมื่อไม่มีวงรอบติดลบ เส้นทางสั้นที่สุดมีไม่เกิน n − 1 เส้น จึงพอที่ n − 1 รอบ ถ้าทั้งรอบไม่มีอะไรเปลี่ยน รอบถัดไปก็ไม่เปลี่ยน: หยุดได้เลย

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: หลายจุดเริ่ม = ต้นทางสมมุติหนึ่งจุด

เพิ่มจุดสมมุติ S ที่มีเส้นน้ำหนัก 0 ไปยังจุดเริ่มที่อนุญาตทุกจุด จุดเริ่มที่ดีที่สุดสำหรับ v ก็คือเส้นทางสั้นที่สุดจาก S ไป v การรัน Bellman–Ford จาก S เหมือนกับการตั้ง **distance = 0 ให้ทุกจุดเริ่ม** ก่อนรอบแรก จุดสมมุติไม่ต้องมีอยู่จริง

### ขั้นที่ 2: ผ่อนคลายเป็นรอบ

เก็บเส้นไว้ในอาร์เรย์เดียว (Bellman–Ford ไม่ต้องใช้รายการเพื่อนบ้าน) ข้ามเส้นที่ต้นเส้นยังไปไม่ถึง เพื่อไม่ให้ "∞ + ค่าติดลบ" แอบเข้ามา

```diagram
ตัวอย่าง 2: จุดเริ่ม 0 1 3 4, เป้าหมาย 5     ทุกจุดเริ่มเป็น 0
รอบ 1:  1→2: 0+5 = 5   2→5: 5−4 = 1   3→2: 0+2 = 2
รอบ 2:  2→5: 2−4 = −2                 รอบ 3: ไม่เปลี่ยน → หยุด
```

{{viz}}

### ขั้นที่ 3: คำตอบ

พิมพ์ `distance[v]` โจทย์รับประกันว่ามีจุดเริ่มที่ไปถึง v

:::warn กับดัก
- ใช้ Dijkstra: ผิดเมื่อมีน้ำหนักติดลบ (ตัวอย่าง 2 ต้องใช้เส้นทางผ่านเส้น −4 หลังจากจุด 2 ได้ค่าที่ถูกลง)
- รัน Bellman–Ford แยก k ครั้ง: ช้าลงได้ถึง 5 000 เท่า
- ผ่อนคลายจากจุดที่ยังไปไม่ถึงโดยใช้ค่าเฝ้าเช่น INT_MAX: `INT_MAX + (−4)` จะดูเหมือนระยะจริง
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** ไม่เกิน n − 1 รอบ รอบละ m การผ่อนคลาย: **O(n · m)** = 5·10⁸ ขั้นง่าย ๆ ในกรณีแย่ที่สุดจริง ๆ ปกติหยุดหลังไม่กี่รอบ หน่วยความจำ: **O(n + m)**

{{tested}}
