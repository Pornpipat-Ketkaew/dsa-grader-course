title: Graph Coloring
title_th: ระบายสีกราฟ (Graph Coloring)
stars: 3
tech: Branch and bound, Symmetry breaking (one new color), Most-constrained-vertex order (DSATUR)
tech_th: Branch and bound, ตัดความสมมาตร (สีใหม่ลองสีเดียว), เลือกจุดที่ถูกบังคับมากที่สุดก่อน (DSATUR)
complexity: exponential worst case; every N = 50 test under 0.04 s · O(N²) memory
key: Color one vertex per level. Reuse any color no neighbor has, or open exactly one new color, since unused colors are interchangeable. Always color next the vertex that already sees the most different colors, and cut any branch that uses as many colors as the best coloring found.
key_th: ระบายจุดละหนึ่งระดับ ใช้สีเดิมที่ไม่มีเพื่อนบ้านใช้ หรือเปิดสีใหม่เพียงสีเดียว เพราะสีที่ยังไม่ใช้ทุกสีเหมือนกัน เลือกระบายจุดที่เห็นสีต่างกันมากที่สุดก่อนเสมอ และตัดทุกกิ่งที่ใช้สีเท่ากับการระบายที่ดีที่สุดที่เจอแล้ว
tests: the PDF sample (K₄), one vertex, the 5-cycle and 300 random graphs (N ≤ 8) against a brute force that tries k = 1, 2, … colors; N = 50 random graphs with edge density 10–90 % (answers 4, 6, 10, 13, 21, each under 0.04 s) and the Mycielski graph M₅ (23 vertices, no triangle, needs 5 colors).
tests_th: ตัวอย่างใน PDF (K₄), จุดเดียว, วง 5 จุด และกราฟสุ่ม 300 ชุด (N ≤ 8) เทียบกับ brute force ที่ลอง k = 1, 2, … สี กราฟสุ่ม N = 50 ความหนาแน่น 10–90 % (คำตอบ 4, 6, 10, 13, 21 แต่ละชุดไม่ถึง 0.04 วินาที) และกราฟ Mycielski M₅ (23 จุด ไม่มีสามเหลี่ยม แต่ต้องใช้ 5 สี)
==== en
## Technique: branch and bound with a smart order

Minimum coloring is NP-hard, so there is no polynomial formula; we search. A plain search ("vertex 0, 1, 2, … each try colors 1..k") is far too slow for N = 50. Three ideas turn it into a fast search:

| idea | what it does | why it is correct |
|---|---|---|
| **bound** | stop a branch already using ≥ `bestColors` colors | colors are never removed further down, so the branch cannot end below that |
| **symmetry breaking** | a vertex may take any color in use, or **one** new color | renaming unused colors gives the same coloring; trying "color 5" and "color 6" as new is duplicate work |
| **variable order** | color next the uncolored vertex with the most distinct neighbor colors (its *saturation*) | any order is complete; this one fails early on bad branches |

## How it maps onto this problem

### Step 1: state and levels

One level = one vertex. The state is `color[vertex]` (0 = not colored) plus `colorsUsed`; colors in use are always exactly 1..colorsUsed, because new colors are opened in order.

### Step 2: keeping saturation up to date in O(N)

To choose the next vertex quickly, keep for every vertex `neighborsWithColor[vertex][c]`, the number of colored neighbors having color c, and `distinctNeighborColors[vertex]`, the number of c with a non-zero count.

- `paint(vertex, c)`: for each neighbor, increase its count for c; if that count went 0 → 1, its saturation grows by 1.
- `erase(vertex)`: the exact reverse; if a count drops 1 → 0, the saturation shrinks.

With these, "may vertex take color c?" is `neighborsWithColor[vertex][c] == 0`, an O(1) test.

### Step 3: the search

```diagram
search(colored, colorsUsed):
  colorsUsed >= bestColors      → cut
  colored == N                  → bestColors = colorsUsed
  vertex = max saturation (ties: max degree)
  for c = 1..colorsUsed with no neighbor of color c:   paint, search(colored+1, colorsUsed), erase
  paint new color colorsUsed+1,                         search(colored+1, colorsUsed+1), erase
```

On the 5-cycle: vertex 0 gets 1, vertex 1 (sees {1}) gets 2, vertex 2 (sees {2}) gets 1, vertex 3 (sees {1}) gets 2, and vertex 4 sees {1, 2}, so it needs color 3. The bound then cuts every other branch that would reach 3 colors.

{{viz}}

### Step 4: why the order matters

A vertex with high saturation has the fewest legal colors. Coloring it first means a doomed branch runs out of options near the top of the tree, instead of after many levels of wasted work. Breaking ties by degree picks the vertex that will constrain the most others. Together with a good first answer (found by the very first descent), the bound prunes almost everything on random graphs with N = 50.

:::warn Traps
- Trying every unused color as "new" multiplies the work by up to N! for no gain.
- `neighborsWithColor` needs N + 1 columns (colors 1..N).
- The input may repeat an edge or contain a self-loop: skip them so degrees stay right.
- N = 1 with no edges needs 1 color, not 0.
:::

## Solution

{{code}}

**Complexity.** Exponential in the worst case (the problem is NP-hard); each node costs O(N) for the vertex choice plus O(N) per paint/erase. Every N = 50 test runs in under 0.04 s. Memory: the adjacency matrix and the count table: **O(N²)**.

{{tested}}
==== th
## เทคนิค: branch and bound พร้อมลำดับที่ฉลาด

การระบายสีน้อยที่สุดเป็นปัญหา NP-hard ไม่มีสูตรเวลาพหุนาม เราจึงต้องค้นหา การค้นหาธรรมดา ("จุด 0, 1, 2, … แต่ละจุดลองสี 1..k") ช้าเกินไปมากสำหรับ N = 50 มีสามแนวคิดที่ทำให้เร็ว:

| แนวคิด | ทำอะไร | ทำไมถูกต้อง |
|---|---|---|
| **ขอบเขต** | หยุดกิ่งที่ใช้สีไปแล้ว ≥ `bestColors` สี | ลึกลงไปไม่มีการลดจำนวนสี กิ่งนี้จึงจบต่ำกว่านั้นไม่ได้ |
| **ตัดความสมมาตร** | จุดหนึ่งใช้สีที่มีอยู่แล้วสีใดก็ได้ หรือสีใหม่ **หนึ่ง** สี | การเปลี่ยนชื่อสีที่ยังไม่ใช้ให้ผลเหมือนเดิม การลอง "สี 5" และ "สี 6" เป็นสีใหม่คืองานซ้ำ |
| **ลำดับการเลือกจุด** | ระบายจุดที่เพื่อนบ้านมีสีต่างกันมากที่สุด (*saturation*) ก่อน | ลำดับใดก็ครบถ้วน แต่ลำดับนี้ทำให้กิ่งที่แย่ล้มเหลวเร็ว |

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: สถานะและระดับ

หนึ่งระดับ = หนึ่งจุด สถานะคือ `color[vertex]` (0 = ยังไม่ระบาย) และ `colorsUsed` สีที่ใช้อยู่คือ 1..colorsUsed พอดีเสมอ เพราะเปิดสีใหม่ตามลำดับ

### ขั้นที่ 2: อัปเดต saturation ใน O(N)

เพื่อเลือกจุดถัดไปได้เร็ว เก็บสำหรับทุกจุด `neighborsWithColor[vertex][c]` คือจำนวนเพื่อนบ้านที่ระบายแล้วและมีสี c และ `distinctNeighborColors[vertex]` คือจำนวน c ที่นับได้ไม่เป็นศูนย์

- `paint(vertex, c)`: เพื่อนบ้านแต่ละจุดเพิ่มตัวนับของสี c ถ้าตัวนับเปลี่ยนจาก 0 → 1 saturation ของมันเพิ่ม 1
- `erase(vertex)`: ทำย้อนกลับพอดี ถ้าตัวนับลดจาก 1 → 0 saturation ลดลง

ด้วยข้อมูลนี้ "จุดนี้ใช้สี c ได้ไหม?" คือ `neighborsWithColor[vertex][c] == 0` ตรวจได้ใน O(1)

### ขั้นที่ 3: การค้นหา

```diagram
search(colored, colorsUsed):
  colorsUsed >= bestColors      → ตัด
  colored == N                  → bestColors = colorsUsed
  vertex = saturation มากสุด (เสมอ: degree มากสุด)
  for c = 1..colorsUsed ที่ไม่มีเพื่อนบ้านสี c:   paint, search(colored+1, colorsUsed), erase
  paint สีใหม่ colorsUsed+1,                     search(colored+1, colorsUsed+1), erase
```

บนวง 5 จุด: จุด 0 ได้สี 1 จุด 1 (เห็น {1}) ได้สี 2 จุด 2 (เห็น {2}) ได้สี 1 จุด 3 (เห็น {1}) ได้สี 2 และจุด 4 เห็น {1, 2} จึงต้องใช้สี 3 จากนั้นขอบเขตตัดทุกกิ่งอื่นที่จะใช้ถึง 3 สี

{{viz}}

### ขั้นที่ 4: ทำไมลำดับจึงสำคัญ

จุดที่ saturation สูงมีสีที่ใช้ได้น้อยที่สุด การระบายมันก่อนทำให้กิ่งที่ไปไม่รอดหมดทางเลือกตั้งแต่ใกล้ยอดต้นไม้ แทนที่จะเสียงานไปหลายระดับก่อน การตัดสินเสมอด้วย degree เลือกจุดที่จะบังคับจุดอื่นมากที่สุด เมื่อรวมกับคำตอบแรกที่ดี (ได้จากการลงลึกครั้งแรก) ขอบเขตก็ตัดเกือบทั้งหมดบนกราฟสุ่ม N = 50

:::warn กับดัก
- ลองทุกสีที่ยังไม่ใช้เป็น "สีใหม่" ทำให้งานเพิ่มถึง N! เท่าโดยไม่ได้อะไร
- `neighborsWithColor` ต้องมี N + 1 คอลัมน์ (สี 1..N)
- อินพุตอาจมีเส้นซ้ำหรือ self-loop: ข้ามไปเพื่อให้ degree ถูกต้อง
- N = 1 ไม่มีเส้นใช้ 1 สี ไม่ใช่ 0
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** เป็นเลขชี้กำลังในกรณีแย่สุด (ปัญหาเป็น NP-hard) แต่ละโหนดใช้ O(N) ในการเลือกจุด และ O(N) ต่อการ paint/erase ทุกชุดทดสอบ N = 50 ใช้ไม่ถึง 0.04 วินาที หน่วยความจำ: เมทริกซ์ประชิดและตารางตัวนับ: **O(N²)**

{{tested}}
