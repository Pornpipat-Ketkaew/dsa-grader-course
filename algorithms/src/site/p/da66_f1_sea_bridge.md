title: Sea Bridge
title_th: Sea Bridge (สร้างถนนเชื่อมสองประเทศ)
stars: 2
tech: Multi-source BFS by layers, Shortest path between two sets, Fast grid input
tech_th: BFS หลายต้นทางทีละชั้น, เส้นทางสั้นที่สุดระหว่างสองเซต, อ่านตารางขนาดใหญ่อย่างเร็ว
complexity: O(R · C) time and memory
key: The cheapest connected road is a shortest grid path from some country-1 cell to some country-2 cell (counting cells). BFS from all country-1 cells at once, one layer per extra road cell, avoiding volcanoes; the first layer that touches a country-2 cell gives the answer.
key_th: ถนนที่เชื่อมกันและสั้นที่สุดคือเส้นทางสั้นที่สุดบนตารางจากช่องประเทศ 1 สักช่องไปยังช่องประเทศ 2 สักช่อง (นับเป็นช่อง) BFS จากทุกช่องประเทศ 1 พร้อมกัน ทีละชั้นต่อหนึ่งช่องถนนที่เพิ่ม หลบภูเขาไฟ ชั้นแรกที่แตะช่องประเทศ 2 คือคำตอบ
tests: all 7 PDF samples, 300 random maps of up to 12 cells against a brute force that tries every set of cells, and a 5 000 × 5 000 map (50 MB of input) with the two countries in opposite corners in 0.34 s.
tests_th: ตัวอย่างทั้ง 7 ใน PDF แผนที่สุ่ม 300 ชุด (ไม่เกิน 12 ช่อง) เทียบกับ brute force ที่ลองทุกเซตของช่อง และแผนที่ 5 000 × 5 000 (ข้อมูล 50 MB) ที่สองประเทศอยู่คนละมุม ใช้ 0.34 วินาที
==== en
## Technique: shortest path between two sets of vertices

"Shortest path from **any** vertex of set A to **any** vertex of set B" needs only one search: start a BFS with every vertex of A in the queue (multi-source), and stop the moment the search reaches a vertex of B. The layer at which that happens is the distance between the sets.

Processing the queue **layer by layer** (remember where the current layer ends) makes the layer number explicit and lets the search stop exactly when B is touched.

## How it maps onto this problem

### Step 1: a minimal road is a path

A connected set of cells that touches both countries contains a path from a country-1 cell to a country-2 cell, and that path alone is already a valid road. So the answer is the fewest cells on such a path, both ends included. Volcanoes are the only blocked cells; country cells may be used too (they just cost a cell like any other).

### Step 2: layered BFS

- Layer 1: all country-1 cells (a road of 1 cell).
- Layer L + 1: unvisited non-volcano cells next to layer L.
- When a neighbour of layer L is a country-2 cell, the road is L + 1 cells: print and stop.

Marking a visited cell as "blocked" (the same value as a volcano) keeps one byte per cell and one test per neighbour.

```diagram
sample 1:   0 0 0 0 0         layer 1: A          (the 1 at row 2, column 5)
            0 B 0 0 A         layer 2, 3: cells to the left of A
            0 0 0 0 0         expanding layer 3 touches B → 3 + 1 = 4 cells
```

{{viz}}

### Step 3: 25 million cells

R, C ≤ 5 000 means up to 25·10⁶ cells and about 50 MB of input. Two details keep this fast:

- **Reading:** every cell is a single digit, so read a whole row with `getline` and take its digit characters in order, instead of 25 million `cin >> int` calls.
- **Memory:** one `char` per cell (25 MB) plus an `int` queue, both indexed by `row * C + col`.

:::warn Traps
- BFS from each country-1 cell separately: up to 25·10⁶ searches.
- Counting steps instead of cells: a road from A to an adjacent B is 2 cells.
- Two countries touching each other: the answer is 2, found in the very first layer (sample 4).
:::

## Solution

{{code}}

**Complexity.** Each cell enters the queue at most once: **O(R · C)** time and memory.

{{tested}}
==== th
## เทคนิค: เส้นทางสั้นที่สุดระหว่างสองเซตของจุด

"เส้นทางสั้นที่สุดจากจุด **ใดก็ได้** ในเซต A ไปยังจุด **ใดก็ได้** ในเซต B" ต้องค้นหาแค่ครั้งเดียว: เริ่ม BFS โดยใส่ทุกจุดของ A ลงในคิว (หลายต้นทาง) แล้วหยุดทันทีที่การค้นหาไปถึงจุดของ B ชั้นที่เกิดเหตุการณ์นั้นคือระยะระหว่างสองเซต

การประมวลผลคิว **ทีละชั้น** (จำว่าชั้นปัจจุบันจบตรงไหน) ทำให้รู้หมายเลขชั้นชัดเจน และหยุดได้พอดีเมื่อแตะ B

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: ถนนที่น้อยที่สุดคือ path

เซตของช่องที่เชื่อมกันและแตะทั้งสองประเทศจะมี path จากช่องประเทศ 1 ไปช่องประเทศ 2 อยู่ข้างใน และ path นั้นเพียงอย่างเดียวก็เป็นถนนที่ถูกต้องแล้ว คำตอบจึงเป็นจำนวนช่องน้อยที่สุดบน path แบบนั้น นับทั้งสองปลาย ภูเขาไฟเป็นช่องเดียวที่ผ่านไม่ได้ ช่องของประเทศใช้ได้ (แค่เสียหนึ่งช่องเหมือนช่องอื่น)

### ขั้นที่ 2: BFS ทีละชั้น

- ชั้น 1: ทุกช่องประเทศ 1 (ถนนยาว 1 ช่อง)
- ชั้น L + 1: ช่องที่ไม่ใช่ภูเขาไฟและยังไม่ถูกเยี่ยมที่ติดกับชั้น L
- เมื่อเพื่อนบ้านของชั้น L เป็นช่องประเทศ 2 ถนนยาว L + 1 ช่อง: พิมพ์แล้วหยุด

การทำเครื่องหมายช่องที่เยี่ยมแล้วว่า "ผ่านไม่ได้" (ค่าเดียวกับภูเขาไฟ) ทำให้ใช้หนึ่งไบต์ต่อช่องและตรวจครั้งเดียวต่อเพื่อนบ้าน

```diagram
ตัวอย่าง 1: 0 0 0 0 0         ชั้น 1: A          (เลข 1 ที่แถว 2 คอลัมน์ 5)
            0 B 0 0 A         ชั้น 2, 3: ช่องทางซ้ายของ A
            0 0 0 0 0         ขยายชั้น 3 แล้วแตะ B → 3 + 1 = 4 ช่อง
```

{{viz}}

### ขั้นที่ 3: 25 ล้านช่อง

R, C ≤ 5 000 แปลว่ามีได้ถึง 25·10⁶ ช่อง และข้อมูลเข้าราว 50 MB รายละเอียดสองอย่างทำให้เร็ว:

- **การอ่าน:** ทุกช่องเป็นเลขหลักเดียว จึงอ่านทั้งแถวด้วย `getline` แล้วหยิบตัวอักษรที่เป็นตัวเลขตามลำดับ แทนการเรียก `cin >> int` 25 ล้านครั้ง
- **หน่วยความจำ:** `char` หนึ่งตัวต่อช่อง (25 MB) บวกคิว `int` ทั้งคู่ใช้ดัชนี `row * C + col`

:::warn กับดัก
- BFS จากแต่ละช่องประเทศ 1 แยกกัน: ค้นหาได้ถึง 25·10⁶ ครั้ง
- นับก้าวแทนนับช่อง: ถนนจาก A ไป B ที่อยู่ติดกันยาว 2 ช่อง
- สองประเทศติดกัน: คำตอบคือ 2 เจอในชั้นแรกเลย (ตัวอย่าง 4)
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** แต่ละช่องเข้าคิวไม่เกินครั้งเดียว: **O(R · C)** ทั้งเวลาและหน่วยความจำ

{{tested}}
