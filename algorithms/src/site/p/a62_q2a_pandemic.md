title: Pandemic
title_th: โรคระบาด
stars: 2
tech: Multi-source BFS on a grid, Distance limit (day T), Grid as a graph
tech_th: BFS หลายต้นทางบนตาราง, จำกัดระยะ (วันที่ T), มองตารางเป็นกราฟ
complexity: O(r · c) time and memory, independent of T
key: The day a province gets infected is its BFS distance from the nearest initially infected province. Put all day-0 provinces in the queue at the start and run one BFS over the grid (4 neighbours, mountains blocked), never expanding a province infected on day T. Every province that enters the queue is infected by day T.
key_th: วันที่จังหวัดหนึ่งติดเชื้อคือระยะ BFS จากจังหวัดที่ติดเชื้อตั้งแต่แรกที่ใกล้ที่สุด ใส่ทุกจังหวัดวันที่ 0 ลงในคิวตั้งแต่เริ่ม แล้วรัน BFS ครั้งเดียวบนตาราง (เพื่อนบ้าน 4 ทิศ ภูเขาผ่านไม่ได้) โดยไม่ขยายจังหวัดที่ติดเชื้อในวันที่ T ทุกจังหวัดที่เข้าคิวติดเชื้อภายในวันที่ T
tests: all 3 PDF samples, 300 random maps against a day-by-day simulation, and a 500 × 500 map with T = 1 000 000 in 0.02 s.
tests_th: ตัวอย่างทั้ง 3 ใน PDF แผนที่สุ่ม 300 ชุดเทียบกับการจำลองทีละวัน และแผนที่ 500 × 500 ที่ T = 1 000 000 ใช้ 0.02 วินาที
==== en
## Technique: multi-source BFS

BFS from one source gives every vertex its distance from that source. With **several** sources, put them all in the queue at distance 0 before starting. The BFS then expands all of them layer by layer together, and each vertex gets its distance to the **nearest** source, in one pass. (Equivalently: add an imaginary super-source joined to every real source.)

A grid is a graph: each cell is a vertex, joined to its up / down / left / right neighbours, with blocked cells removed.

## How it maps onto this problem

### Step 1: infection day = BFS distance

On day x + 1 every neighbour of a day-x province gets infected. That is exactly the BFS layering: `infectedDay[next] = infectedDay[current] + 1` the first time `next` is reached. A province is reached first by its nearest source, so the BFS day is the true infection day.

### Step 2: stop at T

Do not expand a province with `infectedDay == T`: its neighbours would only be infected on day T + 1. Everything that ever enters the queue has day ≤ T, so the answer is the number of provinces that entered the queue.

{{viz}}

### Step 3: why T up to 10⁶ is harmless

Simulating day by day costs O(r · c) per day, up to 10⁶ days. BFS touches each province once no matter how large T is, and it stops by itself when nothing new can be reached (after at most r · c layers).

:::warn Traps
- One BFS **per source**: up to 250 000 sources × 250 000 cells.
- Day-by-day simulation over T days: far too slow for T = 10⁶ (and pointless once the spread stops).
- T = 0: the answer is the number of 1s (no province is expanded).
- Mountains are never infected and never pass the virus on.
:::

## Solution

{{code}}

**Complexity.** Each province enters the queue at most once and checks 4 neighbours: **O(r · c)** time and memory, independent of T.

{{tested}}
==== th
## เทคนิค: BFS หลายต้นทาง

BFS จากต้นทางเดียวให้ระยะจากต้นทางนั้นแก่ทุกจุด เมื่อมี **หลาย** ต้นทาง ให้ใส่ทุกต้นทางลงในคิวที่ระยะ 0 ก่อนเริ่ม BFS จะขยายทุกต้นทางไปพร้อมกันทีละชั้น และทุกจุดได้ระยะไปยังต้นทางที่ **ใกล้ที่สุด** ในรอบเดียว (เทียบเท่ากับเพิ่มต้นทางสมมุติที่เชื่อมกับต้นทางจริงทุกตัว)

ตารางคือกราฟ: แต่ละช่องคือจุด เชื่อมกับเพื่อนบ้านบน / ล่าง / ซ้าย / ขวา โดยตัดช่องที่ผ่านไม่ได้ออก

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: วันติดเชื้อ = ระยะ BFS

ในวันที่ x + 1 เพื่อนบ้านทุกจังหวัดของจังหวัดวันที่ x จะติดเชื้อ นี่คือการแบ่งชั้นของ BFS พอดี: `infectedDay[next] = infectedDay[current] + 1` ในครั้งแรกที่ไปถึง `next` จังหวัดถูกไปถึงก่อนโดยต้นทางที่ใกล้ที่สุด วันจาก BFS จึงเป็นวันติดเชื้อจริง

### ขั้นที่ 2: หยุดที่ T

ไม่ขยายจังหวัดที่ `infectedDay == T`: เพื่อนบ้านของมันจะติดในวันที่ T + 1 ทุกจังหวัดที่เคยเข้าคิวมีวัน ≤ T คำตอบจึงเป็นจำนวนจังหวัดที่เข้าคิว

{{viz}}

### ขั้นที่ 3: ทำไม T ถึง 10⁶ จึงไม่เป็นปัญหา

การจำลองทีละวันใช้ O(r · c) ต่อวัน ได้ถึง 10⁶ วัน BFS แตะแต่ละจังหวัดครั้งเดียวไม่ว่า T จะใหญ่แค่ไหน และหยุดเองเมื่อไปถึงที่ใหม่ไม่ได้แล้ว (ไม่เกิน r · c ชั้น)

:::warn กับดัก
- BFS **หนึ่งครั้งต่อต้นทาง**: ต้นทางได้ถึง 250 000 จุด × 250 000 ช่อง
- จำลองทีละวันไป T วัน: ช้าเกินไปมากเมื่อ T = 10⁶ (และไม่มีประโยชน์เมื่อการระบาดหยุดแล้ว)
- T = 0: คำตอบคือจำนวนเลข 1 (ไม่มีจังหวัดถูกขยาย)
- ภูเขาไม่ติดเชื้อ และไม่ส่งต่อไวรัส
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** แต่ละจังหวัดเข้าคิวไม่เกินครั้งเดียวและตรวจเพื่อนบ้าน 4 ทิศ: **O(r · c)** ทั้งเวลาและหน่วยความจำ ไม่ขึ้นกับ T

{{tested}}
