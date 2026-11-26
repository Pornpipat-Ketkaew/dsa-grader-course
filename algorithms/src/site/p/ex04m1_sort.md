title: 3 Values Sort
title_th: เรียงสามค่าด้วยการสลับน้อยที่สุด
stars: 2
tech: Counting (zones), Cycle decomposition, Greedy
tech_th: การนับ (โซน), แยกเป็นวงจร (cycle), Greedy
complexity: O(N) time · O(N) memory
key: The sorted array is three zones. Count misplaced[zone][value]. Every pair of elements sitting in each other's zone costs one swap; whatever is left forms 3-cycles that cost two swaps per three elements.
key_th: อาร์เรย์ที่เรียงแล้วแบ่งเป็นสามโซน นับ misplaced[zone][value] คู่ที่อยู่ในโซนของกันและกันใช้การสลับครั้งเดียว ที่เหลือเป็นวงสามตัว ใช้สองครั้งต่อสามตัว
tests: both PDF samples plus "3 1 2" (a pure 3-cycle), and 300 random arrays compared with a BFS over all arrangements (the true minimum number of swaps); n = 100 000 runs in 0.01 s. ASan + UBSan clean.
tests_th: ตัวอย่างทั้ง 2 ชุดใน PDF และ "3 1 2" (วงสามตัวล้วน) และสุ่ม 300 ชุดเทียบกับ BFS บนทุกการจัดเรียง (จำนวนการสลับน้อยที่สุดจริง) กรณี n = 100 000 ใช้ 0.01 วินาที ไม่พบข้อผิดพลาดจาก ASan + UBSan
==== en
## Technique: count, then reason about cycles

You never need to perform the swaps. The minimum number of swaps to sort is a property of the **cycles** of misplaced elements, and with only three distinct values those cycles can be counted with a 3×3 table. That is a counting problem (Lesson 09) plus a greedy argument (Lesson 13).

## How it maps onto this problem

### Step 1: the zones

After sorting, all 1s come first, then all 2s, then all 3s. Counting tells you where each zone starts and ends:

```diagram
values   2 2 1 3 2 1 3            count: 1 → 2, 2 → 3, 3 → 2
zones   [1 1][2 2 2][3 3]         zone 1 = [0,2), zone 2 = [2,5), zone 3 = [5,7)
```

### Step 2: the 3×3 table

For every position, look at (the zone it belongs to, the value it holds). `misplaced[z][v]` counts positions in zone z holding value v. The diagonal (z = v) is already correct; the six off-diagonal cells are the elements that must move.

```diagram
                 holds 1   holds 2   holds 3
zone 1  (0..1)      0         2         0
zone 2  (2..4)      1         1         1
zone 3  (5..6)      1         0         1
```

### Step 3: one swap fixes at most two elements

A swap touches two positions, so it can put **at most two** elements into their zones, and it does that only when the two are in **each other's** zone: a 2 in zone 1 together with a 1 in zone 2. That is a **2-cycle**. Take every such pair first:

`pairSwaps = min(m[1][2], m[2][1]) + min(m[1][3], m[3][1]) + min(m[2][3], m[3][2])`

:::proof Why taking all 2-cycles first is optimal
Each 2-cycle swap achieves the best a single swap can ever do (2 elements fixed). Using it never blocks a later move: the two elements it fixes are not needed by anyone else. So an optimal solution may as well start with all of them.
:::

### Step 4: what is left are 3-cycles

After removing the pairs, for each pair of zones at most one direction remains, so the misplaced elements chain as 1 → 2 → 3 → 1 (or the reverse). Three elements in such a cycle cannot be fixed by one swap (no two of them belong in each other's zone), but **two** swaps suffice: the first fixes one element and turns the other two into a 2-cycle.

```diagram
zone:   1   2   3          swap(zone1, zone3)       swap(zone2, zone3)
holds:  2   3   1    →     1   3   2          →     1   2   3
```

`leftInCycles = (all misplaced) − 2 · pairSwaps` is a multiple of 3, and the answer is

**pairSwaps + 2 · leftInCycles / 3**.

{{viz}}

:::warn Traps
- Counting "positions where the value is wrong" and halving it: wrong for 3-cycles (`3 1 2` has 3 wrong positions and needs 2 swaps, not 1.5).
- Actually sorting with swaps in a greedy order may be fine but is easy to get wrong; counting is shorter and provably minimal.
:::

## Solution

{{code}}

**Complexity.** Two passes over N numbers: **O(N)** time, the array plus a 4×4 table: **O(N)** memory (the counts alone would be O(1) if you stored the input differently, but N ≤ 10⁵ makes that irrelevant).

{{tested}}
==== th
## เทคนิค: นับ แล้ววิเคราะห์วงจร (cycle)

ไม่ต้องสลับจริงเลย จำนวนการสลับน้อยที่สุดที่ทำให้เรียงได้ขึ้นอยู่กับ **วงจร (cycle)** ของตัวที่อยู่ผิดที่ และเมื่อมีค่าต่างกันแค่สามค่า วงจรเหล่านั้นนับได้ด้วยตาราง 3×3 นี่คือปัญหาการนับ (บทที่ 09) บวกเหตุผลแบบ greedy (บทที่ 13)

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: โซน

หลังเรียงแล้ว เลข 1 ทั้งหมดมาก่อน ตามด้วย 2 แล้ว 3 การนับบอกได้ว่าแต่ละโซนเริ่มและจบตรงไหน:

```diagram
values   2 2 1 3 2 1 3            นับ: 1 → 2, 2 → 3, 3 → 2
zones   [1 1][2 2 2][3 3]         โซน 1 = [0,2), โซน 2 = [2,5), โซน 3 = [5,7)
```

### ขั้นที่ 2: ตาราง 3×3

สำหรับทุกตำแหน่ง ดู (โซนที่ตำแหน่งนั้นเป็นของ, ค่าที่ถืออยู่) `misplaced[z][v]` นับตำแหน่งในโซน z ที่ถือค่า v เส้นทแยง (z = v) ถูกต้องแล้ว ช่องนอกเส้นทแยงทั้งหกคือตัวที่ต้องย้าย

```diagram
                 ถือ 1     ถือ 2     ถือ 3
โซน 1  (0..1)      0         2         0
โซน 2  (2..4)      1         1         1
โซน 3  (5..6)      1         0         1
```

### ขั้นที่ 3: สลับหนึ่งครั้งแก้ได้มากสุดสองตัว

การสลับแตะสองตำแหน่ง จึงทำให้เข้าโซนได้ **ไม่เกินสองตัว** และทำได้เฉพาะเมื่อทั้งสองอยู่ใน **โซนของกันและกัน** เช่น เลข 2 ในโซน 1 คู่กับเลข 1 ในโซน 2 นี่คือ **วงสองตัว (2-cycle)** ใช้คู่แบบนี้ให้หมดก่อน:

`pairSwaps = min(m[1][2], m[2][1]) + min(m[1][3], m[3][1]) + min(m[2][3], m[3][2])`

:::proof ทำไมใช้วงสองตัวทั้งหมดก่อนแล้วดีที่สุด
การสลับในวงสองตัวได้ผลดีที่สุดที่การสลับหนึ่งครั้งทำได้ (แก้ได้ 2 ตัว) และไม่ขัดขวางการย้ายอื่นในภายหลัง เพราะสองตัวที่ถูกแก้ไม่มีใครต้องใช้อีก คำตอบที่ดีที่สุดจึงเริ่มด้วยการสลับเหล่านี้ทั้งหมดได้เสมอ
:::

### ขั้นที่ 4: ที่เหลือเป็นวงสามตัว

หลังเอาคู่ออกแล้ว ทุกคู่โซนจะเหลือทิศเดียว ตัวที่ผิดที่จึงต่อกันเป็น 1 → 2 → 3 → 1 (หรือทิศกลับ) สามตัวในวงแบบนี้แก้ด้วยการสลับครั้งเดียวไม่ได้ (ไม่มีสองตัวใดอยู่ในโซนของกันและกัน) แต่ **สองครั้ง** พอ: ครั้งแรกแก้หนึ่งตัว และเปลี่ยนอีกสองตัวให้เป็นวงสองตัว

```diagram
โซน:    1   2   3          swap(โซน1, โซน3)         swap(โซน2, โซน3)
ถือ:    2   3   1    →     1   3   2          →     1   2   3
```

`leftInCycles = (ตัวที่ผิดที่ทั้งหมด) − 2 · pairSwaps` หารด้วย 3 ลงตัว และคำตอบคือ

**pairSwaps + 2 · leftInCycles / 3**

{{viz}}

:::warn กับดัก
- นับ "ตำแหน่งที่ค่าผิด" แล้วหารสอง: ผิดสำหรับวงสามตัว (`3 1 2` ผิดที่ 3 ตำแหน่ง ต้องสลับ 2 ครั้ง ไม่ใช่ 1.5)
- สลับจริงตามลำดับแบบ greedy อาจถูกได้ แต่พลาดง่าย การนับสั้นกว่าและพิสูจน์ได้ว่าน้อยที่สุด
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** ผ่านตัวเลข N ตัวสองรอบ: เวลา **O(N)** อาร์เรย์บวกตาราง 4×4: หน่วยความจำ **O(N)**

{{tested}}
