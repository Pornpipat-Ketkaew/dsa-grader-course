title: Buffet Flight
title_th: Buffet Flight (บินฟรี จ่ายแค่ค่าสนามบิน)
stars: 2
tech: Modelling costs as edge weights, Dijkstra (O(n²) array version on a dense graph)
tech_th: แปลงค่าใช้จ่ายเป็นน้ำหนักเส้น, Dijkstra (แบบอาร์เรย์ O(n²) บนกราฟหนาแน่น)
complexity: O(n² + m) time · O(n²) memory
key: Each flight a → b always costs co[a] + ci[b], whatever happened before, so put that number on the edge. All weights are positive: Dijkstra from airport 0. With up to n² − n flights the graph is dense, so the O(n²) array version is the right one.
key_th: เที่ยวบิน a → b เสีย co[a] + ci[b] เสมอไม่ว่าก่อนหน้าจะเป็นอย่างไร จึงเขียนค่านี้ไว้บนเส้น น้ำหนักทุกเส้นเป็นบวก: Dijkstra จากสนามบิน 0 เมื่อมีเที่ยวบินได้ถึง n² − n เส้น กราฟจึงหนาแน่น Dijkstra แบบอาร์เรย์ O(n²) จึงเหมาะที่สุด
tests: all 3 PDF samples and n = 1, 300 random networks against a Bellman–Ford brute force, and n = 2 000 with all 3 998 000 flights (35 MB of input) in 0.30 s.
tests_th: ตัวอย่างทั้ง 3 ใน PDF และ n = 1, เครือข่ายสุ่ม 300 ชุดเทียบกับ brute force แบบ Bellman–Ford และ n = 2 000 ที่มีครบทั้ง 3 998 000 เที่ยวบิน (ข้อมูล 35 MB) ใช้ 0.30 วินาที
==== en
## Technique: turn the cost rule into edge weights

Shortest-path algorithms need a weight on each edge. When a cost is described another way (here: fees at airports), check whether the price of one step depends only on that step. If it does, compute it once per edge and the problem becomes a plain shortest-path problem.

Then pick the Dijkstra implementation by density: with E close to n², the **O(n²) array version** beats the heap version (O(E log n) ≈ 4·10⁶ · 11).

## How it maps onto this problem

### Step 1: the weight of a flight

Flying a → b pays the take-off fee at a and the landing fee at b, and nothing else: **w(a, b) = co[a] + ci[b]**. It does not depend on earlier flights, and it is ≥ 2 > 0, so Dijkstra applies. The start airport is free (cost 0).

```diagram
sample 1:  0 → 1 → 2 → 3        ci = 100 1 2 3,  co = 10 20 30 40
w(0,1) = co[0] + ci[1] = 10 + 1 = 11      cost: 0, 11, 11 + 22 = 33, 33 + 33 = 66
```

### Step 2: dense storage and the array Dijkstra

Store the flights in an n × n byte matrix (4 MB for n = 2 000). Each round scans for the cheapest unfinalized airport, finalizes it and relaxes its whole row.

{{viz}}

### Step 3: output

Print all n costs in order, with −1 for airports never reached (sample 2: nothing flies into airport 1).

:::warn Traps
- Read the fee lines in the right order: **ci (landing) first**, then co (take-off).
- Adding co[b] when landing at b: the take-off fee is paid only when leaving.
- Up to 8 million numbers of input: fast `cin` is required.
:::

## Solution

{{code}}

**Complexity.** Reading the flights O(m), Dijkstra O(n²): **O(n² + m)**, at most about 8·10⁶ steps. Memory: **O(n²)** bytes for the flight matrix.

{{tested}}
==== th
## เทคนิค: แปลงกฎค่าใช้จ่ายเป็นน้ำหนักเส้น

อัลกอริทึมเส้นทางสั้นที่สุดต้องการน้ำหนักบนแต่ละเส้น เมื่อค่าใช้จ่ายถูกบรรยายแบบอื่น (ในข้อนี้: ค่าบริการที่สนามบิน) ให้ตรวจว่าราคาของหนึ่งก้าวขึ้นกับก้าวนั้นอย่างเดียวไหม ถ้าใช่ ก็คำนวณครั้งเดียวต่อเส้น แล้วโจทย์กลายเป็นเส้นทางสั้นที่สุดธรรมดา

จากนั้นเลือกวิธีเขียน Dijkstra ตามความหนาแน่น: เมื่อ E ใกล้ n² **แบบอาร์เรย์ O(n²)** ชนะแบบ heap (O(E log n) ≈ 4·10⁶ · 11)

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: น้ำหนักของเที่ยวบิน

บิน a → b จ่ายค่าบินออกที่ a และค่าลงจอดที่ b ไม่มีอย่างอื่น: **w(a, b) = co[a] + ci[b]** ไม่ขึ้นกับเที่ยวบินก่อนหน้า และ ≥ 2 > 0 จึงใช้ Dijkstra ได้ สนามบินเริ่มต้นไม่เสียอะไร (cost 0)

```diagram
ตัวอย่าง 1: 0 → 1 → 2 → 3        ci = 100 1 2 3,  co = 10 20 30 40
w(0,1) = co[0] + ci[1] = 10 + 1 = 11      cost: 0, 11, 11 + 22 = 33, 33 + 33 = 66
```

### ขั้นที่ 2: เก็บแบบหนาแน่นและ Dijkstra แบบอาร์เรย์

เก็บเที่ยวบินในเมทริกซ์ไบต์ n × n (4 MB เมื่อ n = 2 000) แต่ละรอบไล่หาสนามบินที่ถูกที่สุดที่ยังไม่ยืนยัน ยืนยันมัน แล้วผ่อนคลายทั้งแถว

{{viz}}

### ขั้นที่ 3: ผลลัพธ์

พิมพ์ค่าใช้จ่ายทั้ง n ค่าตามลำดับ และ −1 สำหรับสนามบินที่ไปไม่ถึง (ตัวอย่าง 2: ไม่มีเที่ยวบินเข้าสนามบิน 1)

:::warn กับดัก
- อ่านบรรทัดค่าบริการให้ถูกลำดับ: **ci (ลงจอด) ก่อน** แล้วค่อย co (บินออก)
- บวก co[b] ตอนลงจอดที่ b: ค่าบินออกจ่ายตอนออกเท่านั้น
- ข้อมูลเข้าได้ถึง 8 ล้านตัวเลข: ต้องใช้ `cin` แบบเร็ว
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** อ่านเที่ยวบิน O(m) และ Dijkstra O(n²): **O(n² + m)** ไม่เกินราว 8·10⁶ ขั้น หน่วยความจำ: **O(n²)** ไบต์สำหรับเมทริกซ์เที่ยวบิน

{{tested}}
