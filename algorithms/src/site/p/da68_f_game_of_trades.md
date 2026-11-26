title: Game of Trade
title_th: Game of Trade (เกมซื้อขาย)
stars: 3
tech: Greedy on independent units, Best and second-best (exclude one), Counting sort by value
tech_th: Greedy บนหน่วยที่เป็นอิสระ, ค่าดีที่สุดและอันดับสอง (ตัดตัวหนึ่งออก), counting sort ตามค่า
complexity: O(N·M + 1000) time · O(N·M) memory (the input)
key: Each unit bought is independent, so its best profit is (highest buy price among NPCs other than the seller) − (sell price). Keeping the best and second-best buyer per item answers "best other than the seller" in O(1). Bucket units by profit (1..999) and take the K most profitable.
key_th: แต่ละหน่วยที่ซื้อเป็นอิสระต่อกัน กำไรที่ดีที่สุดของมันจึงเป็น (ราคารับซื้อสูงสุดในบรรดา NPC ที่ไม่ใช่ผู้ขาย) − (ราคาขาย) การเก็บผู้ซื้อที่ดีที่สุดและอันดับสองของแต่ละสินค้าตอบ "ดีที่สุดที่ไม่ใช่ผู้ขาย" ได้ใน O(1) แยกหน่วยเป็นถังตามกำไร (1..999) แล้วเลือก K หน่วยที่กำไรสูงที่สุด
tests: both PDF samples, a case with no profitable trade, 300 random cases against a brute force that lists every unit's profit and sorts, and N = M = 1000 with K = 10^9 in 0.13 s.
tests_th: ตัวอย่างทั้งสองใน PDF กรณีที่ไม่มีการซื้อขายที่ได้กำไร สุ่ม 300 ชุดเทียบกับ brute force ที่แจกแจงกำไรของทุกหน่วยแล้วเรียง และ N = M = 1000 กับ K = 10^9 ใช้ 0.13 วินาที
==== en
## Technique: break the problem into independent units, then greedy

A greedy "take the best first" is obviously right when the choices **do not interact**. The work in such problems is to reach that form:

1. Show that every unit can be valued on its own (no unit's value depends on which others are chosen).
2. Compute each unit's best value.
3. Take the best K units.

When values are small integers (here 1..999), step 3 needs no comparison sort: a **counting array** indexed by value, scanned from high to low, picks the top K in O(max value).

## How it maps onto this problem

### Step 1: units are independent

A unit of item j bought from NPC i can be sold to any NPC except i, and buyers have no limit. Buying it costs `X[i][j]` and selling earns `Y[k][j]`, so its profit is

> `profit(i, j) = max over k ≠ i of Y[k][j] − X[i][j]`

and that does not depend on any other unit. All `Z[i][j]` units of the same (i, j) share this profit. Units with profit ≤ 0 are never worth buying.

### Step 2: "best other than i" in O(1)

Scanning all k ≠ i for every i would be O(N²) per item, 10⁹ in total. Instead, find the best buyer (`bestBuyer`, `bestPrice`) and the second-best price once per item. Then

> best other than i = `secondPrice` if i is `bestBuyer`, else `bestPrice`.

(If the top price appears twice, `secondPrice` equals it, which is still correct.)

{{viz}}

### Step 3: the K best units

Profits lie in 1..999, so `unitsWithProfit[p] += Z[i][j]`. Then walk p = 999 down to 1, taking `min(K, unitsWithProfit[p])` units each time. This is the greedy "most profitable first", sorted by counting.

### Step 4: sizes

Up to 10⁶ cells × 1000 units each = 10⁹ units, and K ≤ 10⁹, so counts, K and the answer (up to 10⁹ × 999) need `long long`.

:::warn Traps
- Selling back to the same NPC is forbidden: the best buyer may be the seller itself.
- Trades with profit ≤ 0 must be skipped, not counted as negative.
- Reading 3·10⁶ numbers: use fast I/O as the statement says.
:::

## Solution

{{code}}

**Complexity.** One pass over the N × M tables: **O(N·M)**, plus O(1000) for the buckets. Memory: the three tables, **O(N·M)**.

{{tested}}
==== th
## เทคนิค: แยกโจทย์เป็นหน่วยที่เป็นอิสระ แล้วใช้ greedy

greedy แบบ "เลือกที่ดีที่สุดก่อน" ถูกต้องชัดเจนเมื่อทางเลือก **ไม่มีผลต่อกัน** งานในโจทย์แบบนี้คือการทำให้อยู่ในรูปนั้น:

1. แสดงว่าแต่ละหน่วยคิดมูลค่าได้ด้วยตัวเอง (มูลค่าของหน่วยหนึ่งไม่ขึ้นกับว่าเลือกหน่วยอื่นอะไรไป)
2. คำนวณมูลค่าที่ดีที่สุดของแต่ละหน่วย
3. เลือก K หน่วยที่ดีที่สุด

เมื่อค่าเป็นจำนวนเต็มเล็ก ๆ (ในข้อนี้ 1..999) ขั้นที่ 3 ไม่ต้องใช้การเรียงแบบเปรียบเทียบ: **อาร์เรย์นับ** ที่ใช้ค่าเป็นดัชนี ไล่จากมากไปน้อย ก็เลือก K ตัวบนสุดได้ใน O(ค่าสูงสุด)

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: หน่วยเป็นอิสระต่อกัน

สินค้า j หนึ่งหน่วยที่ซื้อจาก NPC i ขายให้ NPC ตัวไหนก็ได้ยกเว้น i และผู้ซื้อไม่มีขีดจำกัด การซื้อเสีย `X[i][j]` การขายได้ `Y[k][j]` กำไรของมันจึงเป็น

> `profit(i, j) = max ของ Y[k][j] เมื่อ k ≠ i − X[i][j]`

ซึ่งไม่ขึ้นกับหน่วยอื่นเลย ทั้ง `Z[i][j]` หน่วยของคู่ (i, j) เดียวกันมีกำไรเท่ากัน หน่วยที่กำไร ≤ 0 ไม่คุ้มที่จะซื้อ

### ขั้นที่ 2: "ดีที่สุดที่ไม่ใช่ i" ใน O(1)

การไล่ k ≠ i ทั้งหมดสำหรับทุก i จะเป็น O(N²) ต่อสินค้า รวม 10⁹ ให้หาผู้ซื้อที่ดีที่สุด (`bestBuyer`, `bestPrice`) และราคาอันดับสองครั้งเดียวต่อสินค้าแทน แล้ว

> ดีที่สุดที่ไม่ใช่ i = `secondPrice` ถ้า i คือ `bestBuyer` ไม่อย่างนั้น `bestPrice`

(ถ้าราคาสูงสุดมีสองตัว `secondPrice` จะเท่ากับมัน ซึ่งยังถูกต้อง)

{{viz}}

### ขั้นที่ 3: K หน่วยที่ดีที่สุด

กำไรอยู่ใน 1..999 จึงทำ `unitsWithProfit[p] += Z[i][j]` แล้วไล่ p = 999 ลงไปถึง 1 เลือก `min(K, unitsWithProfit[p])` หน่วยทุกครั้ง นี่คือ greedy "กำไรมากที่สุดก่อน" ที่เรียงด้วยการนับ

### ขั้นที่ 4: ขนาดตัวเลข

ได้ถึง 10⁶ ช่อง × ช่องละ 1000 หน่วย = 10⁹ หน่วย และ K ≤ 10⁹ ตัวนับ K และคำตอบ (ถึง 10⁹ × 999) จึงต้องเป็น `long long`

:::warn กับดัก
- ห้ามขายคืนให้ NPC ตัวเดิม: ผู้ซื้อที่ดีที่สุดอาจเป็นผู้ขายเอง
- การซื้อขายที่กำไร ≤ 0 ต้องข้าม ไม่ใช่นับเป็นค่าลบ
- อ่านตัวเลข 3·10⁶ ตัว: ใช้ fast I/O ตามที่โจทย์บอก
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** ไล่ตาราง N × M หนึ่งรอบ: **O(N·M)** บวก O(1000) สำหรับถัง หน่วยความจำ: ตารางสามตัว **O(N·M)**

{{tested}}
