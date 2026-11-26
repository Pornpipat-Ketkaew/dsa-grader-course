title: Farthest City
title_th: เมืองไกลสุด
stars: 2
tech: Dijkstra (O(N²) array version for an adjacency matrix), Single-source shortest paths
tech_th: Dijkstra (แบบอาร์เรย์ O(N²) สำหรับเมทริกซ์ประชิด), เส้นทางสั้นที่สุดจากต้นทางเดียว
complexity: O(N²) time · O(N²) memory (the input matrix)
key: Compute the shortest distance from city 1 to every city with Dijkstra, then print the largest one, or −1 if some city cannot be reached. The input is a full matrix, so the simple O(N²) Dijkstra (scan for the closest city, relax its row) is already optimal.
key_th: หาระยะสั้นที่สุดจากเมือง 1 ไปทุกเมืองด้วย Dijkstra แล้วพิมพ์ค่าที่มากที่สุด หรือ −1 ถ้ามีเมืองที่ไปไม่ถึง ข้อมูลเข้าเป็นเมทริกซ์เต็ม Dijkstra แบบง่าย O(N²) (หาเมืองที่ใกล้ที่สุด แล้วผ่อนคลายแถวของมัน) จึงดีที่สุดแล้ว
tests: both PDF samples (including an unreachable city), 300 random graphs against a Floyd–Warshall brute force, and N = 1 000 with half of all roads present in 0.06 s.
tests_th: ตัวอย่างทั้งสองใน PDF (รวมเมืองที่ไปไม่ถึง) กราฟสุ่ม 300 ชุดเทียบกับ brute force แบบ Floyd–Warshall และ N = 1 000 ที่มีถนนครึ่งหนึ่งของทุกคู่ ใช้ 0.06 วินาที
==== en
## Technique: Dijkstra's algorithm

For non-negative edge weights, Dijkstra computes the shortest distance from one source to every vertex:

1. `distance[source] = 0`, every other distance ∞; nothing is finalized.
2. Repeat: pick the **unfinalized vertex with the smallest distance**, finalize it.
3. **Relax** its outgoing edges: `distance[v] = min(distance[v], distance[u] + w(u, v))`.

Why the picked distance is final: any other route to u must leave the finalized set through some unfinalized vertex x with `distance[x] ≥ distance[u]`, and the rest of that route has non-negative length, so it cannot be shorter.

**Two implementations.** "Pick the smallest" can be a linear scan (O(N) per round, **O(N²)** total) or a priority queue (**O(E log N)**). With an adjacency matrix the relax step already costs O(N) per vertex, so the array version is the right one: simple and optimal for dense input.

## How it maps onto this problem

### Step 1: the matrix is the graph

Row i, column j holds the length of the one-way road i → j; −1 means no road and the diagonal is 0. During relaxation skip entries ≤ 0.

### Step 2: Dijkstra from the capital

Run the N rounds above from city 1 (index 0). If a round finds no reached, unfinalized city, the remaining cities are unreachable and the loop can stop.

{{viz}}

### Step 3: the answer

If any distance is still ∞, print −1. Otherwise print the maximum distance: the shortest distance to the farthest city (6 in the sample, city 5 via 1 → 2 → 5).

:::warn Traps
- Printing the sum or the closest city: the PDF title is about the **farthest** city, and the sample prints 6, the maximum.
- Road lengths are < 10⁶ and a shortest path has at most 999 roads: up to about 10⁹, so use `long long` for distances to be safe.
- Reading 10⁶ numbers: use fast `cin`.
:::

## Solution

{{code}}

**Complexity.** N rounds, each with an O(N) scan and an O(N) relaxation: **O(N²)**, the same as reading the matrix. Memory: **O(N²)** for the matrix.

{{tested}}
==== th
## เทคนิค: อัลกอริทึมของ Dijkstra

เมื่อน้ำหนักเส้นไม่ติดลบ Dijkstra หาระยะสั้นที่สุดจากต้นทางหนึ่งไปทุกจุด:

1. `distance[source] = 0` จุดอื่นเป็น ∞ ยังไม่มีจุดไหนถูกยืนยัน
2. ทำซ้ำ: เลือก **จุดที่ยังไม่ยืนยันซึ่งมีระยะน้อยที่สุด** แล้วยืนยันมัน
3. **ผ่อนคลาย** (relax) เส้นที่ออกจากมัน: `distance[v] = min(distance[v], distance[u] + w(u, v))`

ทำไมระยะที่เลือกเป็นค่าสุดท้าย: เส้นทางอื่นไป u ต้องออกจากกลุ่มที่ยืนยันแล้วผ่านจุด x ที่ยังไม่ยืนยันซึ่ง `distance[x] ≥ distance[u]` และส่วนที่เหลือของเส้นทางยาวไม่ติดลบ จึงสั้นกว่าไม่ได้

**การเขียนสองแบบ** "เลือกตัวที่น้อยที่สุด" ทำได้ด้วยการไล่หาแบบเชิงเส้น (O(N) ต่อรอบ รวม **O(N²)**) หรือ priority queue (**O(E log N)**) เมื่อเป็นเมทริกซ์ประชิด ขั้นผ่อนคลายก็ใช้ O(N) ต่อจุดอยู่แล้ว แบบอาร์เรย์จึงเหมาะที่สุด: ง่ายและดีที่สุดสำหรับข้อมูลหนาแน่น

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: เมทริกซ์คือกราฟ

แถว i คอลัมน์ j คือความยาวถนนทางเดียว i → j โดย −1 คือไม่มีถนน และแนวทแยงเป็น 0 ตอนผ่อนคลายให้ข้ามช่องที่ ≤ 0

### ขั้นที่ 2: Dijkstra จากเมืองหลวง

ทำ N รอบข้างบนจากเมือง 1 (ดัชนี 0) ถ้ารอบไหนไม่เจอเมืองที่ไปถึงแล้วแต่ยังไม่ยืนยัน เมืองที่เหลือไปไม่ถึง หยุดลูปได้

{{viz}}

### ขั้นที่ 3: คำตอบ

ถ้ายังมีระยะเป็น ∞ พิมพ์ −1 ไม่เช่นนั้นพิมพ์ระยะที่มากที่สุด: ระยะสั้นที่สุดไปยังเมืองที่ไกลที่สุด (6 ในตัวอย่าง เมือง 5 ผ่าน 1 → 2 → 5)

:::warn กับดัก
- พิมพ์ผลรวมหรือเมืองที่ใกล้ที่สุด: ตัวอย่างพิมพ์ 6 ซึ่งเป็นค่ามากที่สุด
- ถนนยาว < 10⁶ และเส้นทางสั้นที่สุดมีไม่เกิน 999 ถนน: ได้ถึงราว 10⁹ ใช้ `long long` สำหรับระยะเพื่อความปลอดภัย
- อ่านตัวเลข 10⁶ ตัว: ใช้ `cin` แบบเร็ว
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** N รอบ แต่ละรอบไล่หา O(N) และผ่อนคลาย O(N): **O(N²)** เท่ากับการอ่านเมทริกซ์ หน่วยความจำ: **O(N²)** สำหรับเมทริกซ์

{{tested}}
