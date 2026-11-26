title: SackKnap
title_th: SackKnap (เป้น้ำหนักพอดี ราคาน้อยที่สุด)
stars: 2
tech: 0/1 knapsack DP, Exact-weight target, One array with a downward loop
tech_th: DP แบบ 0/1 knapsack, น้ำหนักเป้าหมายพอดี, อาร์เรย์เดียวกับลูปนับลง
complexity: O(n · V) = 10^8 simple steps · O(V) memory
key: cheapest[w] = lowest price of a set of items weighing exactly w (or impossible). Add the items one by one; for each, walk w from V down to its weight and try cheapest[w − weight] + price. Walking down guarantees each item is used at most once. Answer cheapest[V] or −1.
key_th: cheapest[w] = ราคาต่ำสุดของชุดของที่หนักรวม w พอดี (หรือเป็นไปไม่ได้) เพิ่มของทีละชิ้น สำหรับแต่ละชิ้นไล่ w จาก V ลงไปถึงน้ำหนักของมัน แล้วลอง cheapest[w − weight] + price การไล่ลงรับประกันว่าแต่ละชิ้นถูกใช้ไม่เกินครั้งเดียว คำตอบคือ cheapest[V] หรือ −1
tests: all 3 PDF samples, 300 random cases against a brute force over subsets, n = V = 10 000 random (0.06 s), and 10 000 items of weight 1 and price 10^9 (answer 10^13, checks 64-bit sums).
tests_th: ตัวอย่างทั้ง 3 ใน PDF สุ่ม 300 ชุดเทียบกับ brute force บนเซตย่อย n = V = 10 000 แบบสุ่ม (0.06 วินาที) และของ 10 000 ชิ้นหนัก 1 ราคา 10^9 (คำตอบ 10^13 ตรวจผลรวม 64 บิต)
==== en
## Technique: 0/1 knapsack with a one-dimensional table

The classic 0/1 knapsack table is `best[i][w]` = best value using the first i items with weight w. Row i depends only on row i−1:

> `best[i][w] = best of ( best[i−1][w] , best[i−1][w − weight_i] + value_i )`.

Keeping one array and updating it **from large w to small w** reuses the same memory: when we read `best[w − weight]`, that cell has not been updated for item i yet, so it still holds row i−1. (Walking upward would read an already-updated cell and use item i twice, which is the unbounded knapsack.)

## How it maps onto this problem

### Step 1: the variant

Two changes from the textbook version:

1. **exact** weight: start with only `cheapest[0] = 0` reachable and every other weight marked impossible, so only exact sums ever become reachable;
2. **minimize** the price instead of maximizing.

### Step 2: the update

```cpp
for total = V down to weight:
    if cheapest[total - weight] is reachable:
        cheapest[total] = min(cheapest[total], cheapest[total - weight] + price)
```

{{viz}}

### Step 3: limits

n · V = 10⁸ very simple steps: fine in 1 s. Prices up to 10⁹ and up to 10⁴ items: sums up to 10¹³, so `long long`. The PDF allows 1024 MB, but the one-row DP needs only V + 1 numbers.

:::warn Traps
- Using 0 to mean "unreachable" breaks minimization; use a separate marker (here −1, which is also the required output).
- Looping `total` upward lets an item be taken many times.
- Reading 2·10⁴ numbers: fast I/O is enough; there is no need for `scanf`.
:::

## Solution

{{code}}

**Complexity.** **O(n · V)** ≤ 10⁸ steps. Memory: **O(V)**.

{{tested}}
==== th
## เทคนิค: 0/1 knapsack ด้วยตารางหนึ่งมิติ

ตาราง 0/1 knapsack แบบคลาสสิกคือ `best[i][w]` = ค่าที่ดีที่สุดเมื่อใช้ของ i ชิ้นแรกและน้ำหนัก w แถว i ขึ้นกับแถว i−1 เท่านั้น:

> `best[i][w] = ดีที่สุดของ ( best[i−1][w] , best[i−1][w − weight_i] + value_i )`

การเก็บอาร์เรย์เดียวแล้วอัปเดต **จาก w มากไป w น้อย** ใช้หน่วยความจำเดิมซ้ำได้: ตอนอ่าน `best[w − weight]` ช่องนั้นยังไม่ถูกอัปเดตสำหรับชิ้น i จึงยังเป็นค่าของแถว i−1 (ถ้าไล่ขึ้นจะอ่านช่องที่อัปเดตแล้ว และใช้ชิ้น i สองครั้ง ซึ่งกลายเป็น unbounded knapsack)

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: รูปแบบที่ต่างไป

ต่างจากตำราสองอย่าง:

1. น้ำหนัก **พอดี**: เริ่มด้วย `cheapest[0] = 0` เท่านั้นที่ไปถึงได้ และน้ำหนักอื่นทั้งหมดเป็นไปไม่ได้ จึงมีแต่ผลรวมที่พอดีเท่านั้นที่จะไปถึงได้
2. หาราคา **น้อยที่สุด** แทนมากที่สุด

### ขั้นที่ 2: การอัปเดต

```cpp
for total = V down to weight:
    if cheapest[total - weight] is reachable:
        cheapest[total] = min(cheapest[total], cheapest[total - weight] + price)
```

{{viz}}

### ขั้นที่ 3: ขีดจำกัด

n · V = 10⁸ ขั้นที่ง่ายมาก: ทันใน 1 วินาที ราคาถึง 10⁹ และของถึง 10⁴ ชิ้น: ผลรวมถึง 10¹³ จึงใช้ `long long` PDF ให้หน่วยความจำ 1024 MB แต่ DP แถวเดียวใช้แค่ V + 1 ตัว

:::warn กับดัก
- ใช้ 0 แทน "ไปไม่ถึง" ทำให้การหาค่าน้อยสุดพัง ให้ใช้เครื่องหมายแยก (ในข้อนี้ −1 ซึ่งเป็นผลลัพธ์ที่ต้องพิมพ์ด้วย)
- ไล่ `total` ขึ้นทำให้หยิบของชิ้นเดียวได้หลายครั้ง
- อ่านตัวเลข 2·10⁴ ตัว: fast I/O ก็พอ ไม่จำเป็นต้องใช้ `scanf`
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** **O(n · V)** ≤ 10⁸ ขั้น หน่วยความจำ: **O(V)**

{{tested}}
