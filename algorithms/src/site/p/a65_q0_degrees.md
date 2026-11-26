title: Degrees
title_th: Degrees (นับปมตาม degree)
stars: 1
tech: Adjacency matrix, Degree = row sum, Counting into buckets, Fast input
tech_th: เมทริกซ์ประชิด, degree = ผลรวมแถว, นับใส่ถัง, อ่านข้อมูลเร็ว
complexity: O(n²) time (reading the matrix) · O(n) memory
key: In an undirected adjacency matrix, row i lists the neighbours of node i, so degree(i) is the number of 1s in row i. Then count how many nodes have each degree 0..k. The matrix itself is never stored; with n = 5 000 the real cost is reading 25 million cells, so count the '1' characters of each line.
key_th: ในเมทริกซ์ประชิดของกราฟไม่มีทิศทาง แถว i คือรายชื่อเพื่อนบ้านของปม i degree(i) จึงเป็นจำนวนเลข 1 ในแถว i จากนั้นนับว่ามีกี่ปมที่มี degree แต่ละค่า 0..k ไม่ต้องเก็บเมทริกซ์ไว้เลย เมื่อ n = 5 000 ต้นทุนจริงคือการอ่าน 25 ล้านช่อง จึงนับตัวอักษร '1' ของแต่ละบรรทัด
tests: the PDF sample, n = 1 and an edgeless graph, 300 random graphs against a brute force, and n = 5 000 with half of all pairs connected (50 MB of input) in 0.03 s.
tests_th: ตัวอย่างใน PDF, n = 1 และกราฟไม่มีเส้น, กราฟสุ่ม 300 ชุดเทียบกับ brute force และ n = 5 000 ที่เชื่อมครึ่งหนึ่งของทุกคู่ (ข้อมูล 50 MB) ใช้ 0.03 วินาที
==== en
## Technique: reading a graph from an adjacency matrix

An adjacency matrix has a 1 in cell (i, j) when nodes i and j are joined. For an **undirected** graph the matrix is symmetric, and **row i is exactly the neighbour list of node i**. So:

> degree(i) = number of 1s in row i (the row sum).

The second half is a classic **counting into buckets**: `nodesWithDegree[d]++` for every node, then print buckets 0..k.

## How it maps onto this problem

### Step 1: one pass over the rows

For each row, count its 1s. Nothing else from the row is needed later, so the matrix is never stored: only `degree[n]` survives. Keep the largest degree k as you go.

### Step 2: buckets 0..k

`nodesWithDegree` has k + 1 entries. Every degree from 0 to k is printed, **including counts of 0** (the sample prints `0 1 4 1`: no node of degree 0).

{{viz}}

### Step 3: input speed is the real problem

With n = 5 000 the input has 25 000 000 numbers, about 50 MB. The algorithm is trivial; reading is not:

| reading method | n = 5 000 |
|---|---|
| `cin >> int` (sync off) | ≈ 0.4 s and more on a slow judge |
| `cin >> char` | ≈ 0.4 s |
| `getline` + count the `'1'` characters | **0.03 s** |

Each cell is a single digit and each row is one line, so counting `'1'` characters in the line gives the row sum directly. `getline` reads the line in one go, and `std::count` scans it at memory speed.

:::warn Traps
- Printing only the degrees that occur: the answer has exactly k + 1 numbers, zeros included.
- Storing an `int` matrix of 5 000 × 5 000 = 100 MB for nothing.
- After `cin >> n`, the rest of that first line is still unread: call `getline` once to finish it before reading rows.
:::

## Solution

{{code}}

**Complexity.** Every cell is read once: **O(n²)**, which is the size of the input. Memory: **O(n)** for the degrees and one line.

{{tested}}
==== th
## เทคนิค: อ่านกราฟจากเมทริกซ์ประชิด

เมทริกซ์ประชิดมีเลข 1 ที่ช่อง (i, j) เมื่อปม i และ j เชื่อมกัน สำหรับกราฟ **ไม่มีทิศทาง** เมทริกซ์จะสมมาตร และ **แถว i คือรายชื่อเพื่อนบ้านของปม i พอดี** ดังนั้น:

> degree(i) = จำนวนเลข 1 ในแถว i (ผลรวมแถว)

ครึ่งหลังคือ **การนับใส่ถัง** แบบคลาสสิก: `nodesWithDegree[d]++` สำหรับทุกปม แล้วพิมพ์ถัง 0..k

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: ไล่แถวรอบเดียว

ในแต่ละแถว นับเลข 1 ไม่ต้องใช้อะไรจากแถวนั้นอีก จึงไม่ต้องเก็บเมทริกซ์: เหลือแค่ `degree[n]` และเก็บ degree มากที่สุด k ไปพร้อมกัน

### ขั้นที่ 2: ถัง 0..k

`nodesWithDegree` มี k + 1 ช่อง พิมพ์ทุก degree ตั้งแต่ 0 ถึง k **รวมช่องที่นับได้ 0** (ตัวอย่างพิมพ์ `0 1 4 1`: ไม่มีปมที่ degree 0)

{{viz}}

### ขั้นที่ 3: ปัญหาจริงคือความเร็วในการอ่าน

เมื่อ n = 5 000 ข้อมูลเข้ามี 25 000 000 ตัวเลข ราว 50 MB อัลกอริทึมง่ายมาก แต่การอ่านไม่ง่าย:

| วิธีอ่าน | n = 5 000 |
|---|---|
| `cin >> int` (ปิด sync) | ≈ 0.4 วินาที และนานกว่านั้นบน grader ที่ช้า |
| `cin >> char` | ≈ 0.4 วินาที |
| `getline` + นับตัวอักษร `'1'` | **0.03 วินาที** |

ทุกช่องเป็นเลขหลักเดียวและทุกแถวอยู่ในบรรทัดเดียว การนับตัวอักษร `'1'` ในบรรทัดจึงได้ผลรวมแถวทันที `getline` อ่านทั้งบรรทัดในครั้งเดียว และ `std::count` ไล่ด้วยความเร็วระดับหน่วยความจำ

:::warn กับดัก
- พิมพ์แค่ degree ที่มีปม: คำตอบมี k + 1 ตัวพอดี รวมเลข 0
- เก็บเมทริกซ์ `int` ขนาด 5 000 × 5 000 = 100 MB โดยไม่จำเป็น
- หลัง `cin >> n` ส่วนที่เหลือของบรรทัดแรกยังไม่ถูกอ่าน: เรียก `getline` หนึ่งครั้งให้จบบรรทัดก่อนอ่านแถว
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** อ่านทุกช่องครั้งเดียว: **O(n²)** ซึ่งเท่ากับขนาดข้อมูลเข้า หน่วยความจำ: **O(n)** สำหรับ degree และบรรทัดเดียว

{{tested}}
