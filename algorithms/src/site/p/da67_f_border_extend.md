title: Border Extend
title_th: Border Extend (ถมที่รอบเกาะ)
stars: 2
tech: Multi-source BFS on a grid, Distance to the nearest source, Depth limit k
tech_th: BFS หลายต้นทางบนตาราง, ระยะไปยังต้นทางที่ใกล้ที่สุด, จำกัดความลึก k
complexity: O(R · C) time and memory
key: "Distance from land" of a water cell is its BFS distance from the set of all land cells. Start one BFS with every land cell in the queue at distance 0, stop expanding at distance k, and mark every water cell the BFS reaches as 2.
key_th: "ระยะห่างจากพื้นดิน" ของช่องน้ำคือระยะ BFS จากเซตของช่องดินทั้งหมด เริ่ม BFS ครั้งเดียวโดยใส่ทุกช่องดินลงในคิวที่ระยะ 0 หยุดขยายที่ระยะ k แล้วทำเครื่องหมาย 2 ให้ทุกช่องน้ำที่ BFS ไปถึง
tests: all 5 PDF samples, 300 random maps against a brute force that takes the Manhattan distance from every water cell to every land cell, and a 1 000 × 1 000 map with one land cell and k = 2 000 in 0.06 s.
tests_th: ตัวอย่างทั้ง 5 ใน PDF แผนที่สุ่ม 300 ชุดเทียบกับ brute force ที่หาระยะแมนฮัตตันจากทุกช่องน้ำไปทุกช่องดิน และแผนที่ 1 000 × 1 000 ที่มีดินช่องเดียวและ k = 2 000 ใช้ 0.06 วินาที
==== en
## Technique: distance to the nearest of many sources

The question "how far is each cell from the **closest** land cell?" has as many sources as there are land cells. Running a BFS from each of them would repeat the work up to a million times. The standard fix is the **multi-source BFS**: put every source in the queue at distance 0 before the loop starts. The first time BFS reaches a cell is via the nearest source, so one pass gives every cell its distance to the nearest land.

On a grid the walking rule (up, down, left, right, staying inside the map) is exactly "neighbours in a grid graph". Note that the walk may cross land and water alike; only the start must be land.

## How it maps onto this problem

### Step 1: sources

While reading the map, push every 1 into the queue with `distance = 0`.

### Step 2: layers, cut at k

Pop cells in order. A cell at distance k is not expanded: its neighbours would be at distance k + 1. Every neighbour that has no distance yet gets `distance + 1` and, since it was not land, becomes a 2.

{{viz}}

### Step 3: output

Print the map in the input format. The output has up to 10⁶ numbers, so build one string and print it once (the PDF also warns against `endl`).

:::warn Traps
- BFS from every land cell separately, or for every water cell a search for the nearest land: both are O((R·C)²) in the worst case.
- k can be larger than the map: the BFS simply runs out of cells, nothing special is needed.
- The distance is measured to the **original** land; freshly filled cells are not new sources (the layered BFS already handles this, because layers grow by exactly one step).
:::

## Solution

{{code}}

**Complexity.** Each cell enters the queue at most once and checks 4 neighbours: **O(R · C)** time and memory, independent of k.

{{tested}}
==== th
## เทคนิค: ระยะไปยังต้นทางที่ใกล้ที่สุดจากหลายต้นทาง

คำถาม "แต่ละช่องอยู่ห่างจากช่องดินที่ **ใกล้ที่สุด** แค่ไหน?" มีต้นทางเท่ากับจำนวนช่องดิน การรัน BFS จากแต่ละต้นทางจะทำงานซ้ำได้ถึงล้านครั้ง วิธีมาตรฐานคือ **BFS หลายต้นทาง**: ใส่ทุกต้นทางลงในคิวที่ระยะ 0 ก่อนเริ่มลูป ครั้งแรกที่ BFS ไปถึงช่องหนึ่งคือผ่านต้นทางที่ใกล้ที่สุด รอบเดียวจึงได้ระยะไปยังดินที่ใกล้ที่สุดของทุกช่อง

บนตาราง กฎการเดิน (บน ล่าง ซ้าย ขวา อยู่ในแผนที่) ก็คือ "เพื่อนบ้านในกราฟตาราง" พอดี สังเกตว่าการเดินผ่านดินหรือน้ำก็ได้ เฉพาะจุดเริ่มที่ต้องเป็นดิน

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: ต้นทาง

ระหว่างอ่านแผนที่ push ทุกเลข 1 ลงในคิวพร้อม `distance = 0`

### ขั้นที่ 2: ทีละชั้น ตัดที่ k

pop ช่องตามลำดับ ช่องที่ระยะ k ไม่ถูกขยาย: เพื่อนบ้านของมันจะอยู่ที่ระยะ k + 1 เพื่อนบ้านทุกช่องที่ยังไม่มีระยะได้ `distance + 1` และเพราะไม่ใช่ดิน จึงกลายเป็น 2

{{viz}}

### ขั้นที่ 3: ผลลัพธ์

พิมพ์แผนที่ในรูปแบบเดียวกับข้อมูลเข้า ผลลัพธ์มีได้ถึง 10⁶ ตัวเลข จึงสร้าง string เดียวแล้วพิมพ์ครั้งเดียว (PDF ก็เตือนไม่ให้ใช้ `endl`)

:::warn กับดัก
- BFS จากแต่ละช่องดินแยกกัน หรือค้นหาดินที่ใกล้ที่สุดสำหรับทุกช่องน้ำ: ทั้งคู่เป็น O((R·C)²) ในกรณีแย่สุด
- k อาจใหญ่กว่าแผนที่: BFS แค่หมดช่องให้ไป ไม่ต้องทำอะไรพิเศษ
- ระยะวัดไปยังดิน **เดิม** ช่องที่เพิ่งถมไม่ใช่ต้นทางใหม่ (BFS ทีละชั้นจัดการให้อยู่แล้ว เพราะแต่ละชั้นเพิ่มทีละหนึ่งก้าวพอดี)
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** แต่ละช่องเข้าคิวไม่เกินครั้งเดียวและตรวจเพื่อนบ้าน 4 ทิศ: **O(R · C)** ทั้งเวลาและหน่วยความจำ ไม่ขึ้นกับ k

{{tested}}
