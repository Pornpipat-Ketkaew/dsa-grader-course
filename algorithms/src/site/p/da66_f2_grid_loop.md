title: Grid Loop
title_th: Grid Loop (นับถนนวงวน)
stars: 2
tech: Implicit graph on a grid, Components with degree ≤ 2 (paths vs cycles), Iterative DFS
tech_th: กราฟแฝงบนตาราง, component ที่ degree ≤ 2 (path กับวงรอบ), DFS แบบวนลูป
complexity: O(R · C) time and memory
key: Join two neighbouring cells when each one's road opens toward the other. Every cell has two exits, so every cell has at most two connections, and each component is either a path or a loop. It is a loop exactly when every exit of every cell in it is connected; its length is its number of cells.
key_th: เชื่อมช่องสองช่องที่ติดกันเมื่อถนนของแต่ละช่องเปิดหากัน ทุกช่องมีทางออกสองทาง จึงเชื่อมได้ไม่เกินสองทาง แต่ละ component จึงเป็น path หรือวงวน เป็นวงวนก็ต่อเมื่อทุกทางออกของทุกช่องในนั้นต่อถึงกัน ความยาวคือจำนวนช่อง
tests: all 3 PDF samples plus 1 × 1 and the 2 × 2 ring, 300 random maps against a brute force, a 1 000 × 1 000 frame-shaped loop of length 3 996, and a random 1 000 × 1 000 map, each in 0.07 s.
tests_th: ตัวอย่างทั้ง 3 ใน PDF บวก 1 × 1 และวงแหวน 2 × 2, แผนที่สุ่ม 300 ชุดเทียบกับ brute force, วงวนรูปกรอบ 1 000 × 1 000 ยาว 3 996 และแผนที่สุ่ม 1 000 × 1 000 ใช้ชุดละ 0.07 วินาที
==== en
## Technique: build the graph in your head, then classify components

Many grid problems hide a graph whose edges are defined by a rule instead of an edge list. Here the rule is: cells u and v (side by side) are joined when **u opens toward v and v opens toward u**. There is no need to store this graph; a traversal simply evaluates the rule when it looks at a neighbour.

Then reuse a fact from [Count Line Graphs](a62_q2a_line_graph.html): when every vertex has degree ≤ 2, a connected component is either a path or a cycle.

## How it maps onto this problem

### Step 1: exits as directions

Number the sides 0 = up, 1 = right, 2 = down, 3 = left. Each road type is a pair of sides: type 1 = (left, right), 2 = (up, down), 3 = (up, right), 4 = (right, down), 5 = (down, left), 6 = (left, up). Leaving through side s enters the neighbour from side (s + 2) mod 4, so the neighbour must open toward (s + 2) mod 4.

### Step 2: one traversal per component

Start a DFS at every unvisited cell. For each popped cell look through both exits:

- the exit leaves the map, or the neighbour does not open back → a **dead end**: the component cannot be a loop;
- otherwise the neighbour is connected: push it if not yet visited.

The component is a loop when no dead end was seen; its length is the number of cells visited.

{{viz}}

### Step 3: why "no dead end" means "loop"

Every cell has exactly two exits. If all of them are connected, every cell has degree exactly 2 in the component, and a connected graph where all degrees are 2 is a single cycle. If any exit is dead, that cell has degree ≤ 1 and the component is a path.

:::warn Traps
- Checking only that a cell opens toward its neighbour: the neighbour must also open back.
- Following a road with "walk until I return" from every cell: correct, but without marking visited cells every loop is walked once per cell, O((R·C)²) on a big loop.
- No loops: print just `0`, not `0 0`.
:::

## Solution

{{code}}

**Complexity.** Each cell is pushed once and checks its 2 exits: **O(R · C)** time and memory.

{{tested}}
==== th
## เทคนิค: สร้างกราฟในหัว แล้วแยกประเภท component

โจทย์ตารางหลายข้อซ่อนกราฟที่เส้นถูกนิยามด้วยกฎแทนรายการเส้น ในข้อนี้กฎคือ: ช่อง u และ v (ติดกัน) เชื่อมกันเมื่อ **u เปิดไปหา v และ v เปิดไปหา u** ไม่ต้องเก็บกราฟนี้ไว้ การท่องกราฟแค่ประเมินกฎตอนที่มองไปที่เพื่อนบ้าน

แล้วใช้ข้อเท็จจริงจาก [นับกราฟเส้นตรง](a62_q2a_line_graph.html): เมื่อทุกจุดมี degree ≤ 2 component ที่เชื่อมกันเป็น path หรือ cycle อย่างใดอย่างหนึ่ง

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: ทางออกเป็นทิศ

ให้หมายเลขด้าน 0 = บน, 1 = ขวา, 2 = ล่าง, 3 = ซ้าย ถนนแต่ละแบบคือคู่ของด้าน: แบบ 1 = (ซ้าย, ขวา), 2 = (บน, ล่าง), 3 = (บน, ขวา), 4 = (ขวา, ล่าง), 5 = (ล่าง, ซ้าย), 6 = (ซ้าย, บน) การออกทางด้าน s คือการเข้าเพื่อนบ้านทางด้าน (s + 2) mod 4 เพื่อนบ้านจึงต้องเปิดด้าน (s + 2) mod 4

### ขั้นที่ 2: ท่องหนึ่งครั้งต่อ component

เริ่ม DFS ที่ทุกช่องที่ยังไม่ถูกเยี่ยม สำหรับแต่ละช่องที่ pop ให้ดูทั้งสองทางออก:

- ทางออกออกนอกแผนที่ หรือเพื่อนบ้านไม่เปิดกลับ → **ทางตัน**: component นี้เป็นวงวนไม่ได้
- นอกนั้นเพื่อนบ้านเชื่อมกัน: push ถ้ายังไม่ถูกเยี่ยม

component เป็นวงวนเมื่อไม่เจอทางตันเลย ความยาวคือจำนวนช่องที่เยี่ยม

{{viz}}

### ขั้นที่ 3: ทำไม "ไม่มีทางตัน" แปลว่า "วงวน"

ทุกช่องมีทางออกสองทางพอดี ถ้าต่อถึงกันทั้งหมด ทุกช่องมี degree 2 พอดีใน component และกราฟที่เชื่อมกันซึ่งทุก degree เป็น 2 คือวงรอบวงเดียว ถ้ามีทางออกไหนตัน ช่องนั้นมี degree ≤ 1 และ component เป็น path

:::warn กับดัก
- ตรวจแค่ว่าช่องเปิดไปหาเพื่อนบ้าน: เพื่อนบ้านต้องเปิดกลับด้วย
- เดินตามถนน "จนกลับมาที่เดิม" จากทุกช่อง: ถูกต้อง แต่ถ้าไม่ทำเครื่องหมายช่องที่เยี่ยมแล้ว วงวนหนึ่งวงจะถูกเดินซ้ำทุกช่อง O((R·C)²) เมื่อวงวนใหญ่
- ไม่มีวงวน: พิมพ์แค่ `0` ไม่ใช่ `0 0`
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** แต่ละช่องถูก push ครั้งเดียวและตรวจทางออก 2 ทาง: **O(R · C)** ทั้งเวลาและหน่วยความจำ

{{tested}}
