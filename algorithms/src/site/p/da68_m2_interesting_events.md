title: Interesting Events
title_th: วันที่น่าสนใจ (Interesting Events)
stars: 2
tech: Sweep line (difference events), Binary search on boundaries
tech_th: Sweep line (เหตุการณ์ +1/−1), Binary search บนขอบช่วง
complexity: O((n + q) log n) time · O(n) memory
key: Turn each booth into +1 at l and −1 at r+1, sweep the sorted events, and record the stretches of days where the open count is ≥ k. Each query is then a binary search among those stretches.
key_th: เปลี่ยนแต่ละบูธเป็น +1 ที่วัน l และ −1 ที่วัน r+1 กวาด (sweep) เหตุการณ์ที่เรียงแล้ว แล้วจดช่วงวันที่จำนวนบูธที่เปิด ≥ k จากนั้นตอบแต่ละคำถามด้วย binary search บนช่วงเหล่านั้น
tests: both PDF samples, a boundary case at day 10⁹, and 400 random cases against a brute force that counts the booths open on day x; n = q = 200 000 runs in 0.08 s. ASan + UBSan clean.
tests_th: ตัวอย่างทั้ง 2 ชุดใน PDF กรณีขอบที่วัน 10⁹ และสุ่ม 400 ชุดเทียบกับ brute force ที่นับบูธที่เปิดในวัน x กรณี n = q = 200 000 ใช้ 0.08 วินาที ไม่พบข้อผิดพลาดจาก ASan + UBSan
==== en
## Technique: sweep line over +1 / −1 events

When many intervals are switched on and off along a line, you do not need to look at every point. Put an **event** at each place where the count changes:

- `+1` where an interval starts,
- `−1` just **after** it ends.

Sort the events and walk them left to right, keeping a running count. Between two consecutive event positions the count is constant. That is the **sweep line** of Lesson 10, also called a difference array on sorted coordinates.

The second tool is **binary search on sorted boundaries** (Lesson 08): once you have a sorted list of "stretches", finding which stretch contains x takes O(log n).

## How it maps onto this problem

### Step 1: events

Booth i is open on days l..r **inclusive**. It adds +1 on day l and stops counting on day r + 1:

```diagram
booths [1,4] [3,6] [4,8]      k = 2
events (1,+1) (5,-1) (3,+1) (7,-1) (4,+1) (9,-1)
sorted (1,+1) (3,+1) (4,+1) (5,-1) (7,-1) (9,-1)
```

:::warn r + 1, not r
The booth is still open on day r. Placing −1 at r would make day r look one booth short. Days go up to 10⁹, and r + 1 = 10⁹ + 1 still fits in `int` (limit ≈ 2.1·10⁹).
:::

### Step 2: sweep and record "interesting" stretches

Walk the events in day order. Apply **all** events of the same day together, then compare the count before and after that day:

- the count rises to ≥ k → an interesting stretch **starts** on this day;
- the count drops below k → the stretch **ends** just before this day.

```diagram
day      1    3    4    5    7    9
count    1    2    3    2    1    0
         ·    ▲start             ▲? no: it fell below 2 at day 7
interesting stretch: from day 3 until day 7 (days 3,4,5,6)
from  = [3]     until = [7]
```

Both lists come out sorted because the sweep moves left to right, and the stretches never overlap.

:::key Why the same day must be applied together
A booth that closes on day d−1 (event at d) and another that opens on day d both act on day d. If you check "≥ k" between them you might record a fake stretch that ends and restarts on the same day, or a fake gap.
:::

{{viz}}

### Step 3: answer a query by binary search

Day x is interesting iff it lies inside some stretch [from[i], until[i]). Find the last stretch that **starts on or before x**:

`i = upper_bound(from, x) − 1`

and check `i ≥ 0` and `x < until[i]`. For the example: x = 6 → i = 0, 6 < 7 → YES; x = 8 → i = 0, 8 ≥ 7 → NO; x = 2 → i = −1 → NO.

:::warn Traps
- An array indexed by day: days go up to 10⁹.
- Re-scanning all booths per query: O(n·q) = 4·10¹⁰.
- Output of 200 000 lines: use `'\n'` and fast I/O (the PDF says the same).
:::

## Solution

{{code}}

**Complexity.** Sorting 2n events: O(n log n). The sweep is O(n). Each query is one binary search: O(q log n). Total **O((n + q) log n)**. Memory: the events and the stretch lists, **O(n)**.

{{tested}}
==== th
## เทคนิค: sweep line บนเหตุการณ์ +1 / −1

เมื่อมีช่วงจำนวนมากถูกเปิดและปิดตามเส้นจำนวน เราไม่จำเป็นต้องดูทุกจุด แค่วาง **เหตุการณ์** ไว้ทุกจุดที่จำนวนเปลี่ยน:

- `+1` ที่ช่วงเริ่ม
- `−1` ถัดจากจุดที่ช่วง **จบ** หนึ่งหน่วย

เรียงเหตุการณ์แล้วเดินจากซ้ายไปขวาพร้อมตัวนับสะสม ระหว่างตำแหน่งเหตุการณ์สองตำแหน่งที่ติดกัน จำนวนจะคงที่ นี่คือ **sweep line** ในบทที่ 10 หรือเรียกว่า difference array บนพิกัดที่เรียงแล้ว

เครื่องมือที่สองคือ **binary search บนขอบที่เรียงแล้ว** (บทที่ 08): เมื่อได้รายการ "ช่วง" ที่เรียงแล้ว การหาว่าช่วงไหนมี x ใช้ O(log n)

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: เหตุการณ์

บูธ i เปิดวัน l..r **รวมปลายทั้งสอง** จึงบวก +1 ที่วัน l และหยุดนับที่วัน r + 1:

```diagram
บูธ  [1,4] [3,6] [4,8]      k = 2
เหตุการณ์ (1,+1) (5,-1) (3,+1) (7,-1) (4,+1) (9,-1)
เรียงแล้ว (1,+1) (3,+1) (4,+1) (5,-1) (7,-1) (9,-1)
```

:::warn r + 1 ไม่ใช่ r
บูธยังเปิดอยู่ในวัน r ถ้าวาง −1 ที่ r วัน r จะดูเหมือนขาดไปหนึ่งบูธ วันมีค่าถึง 10⁹ และ r + 1 = 10⁹ + 1 ยังอยู่ใน `int` ได้ (ขีดจำกัด ≈ 2.1·10⁹)
:::

### ขั้นที่ 2: กวาดและจดช่วง "น่าสนใจ"

เดินเหตุการณ์ตามลำดับวัน ประมวลผล **ทุก** เหตุการณ์ของวันเดียวกันพร้อมกัน แล้วเทียบจำนวนก่อนและหลังวันนั้น:

- จำนวนขึ้นมา ≥ k → ช่วงน่าสนใจ **เริ่ม** ที่วันนี้
- จำนวนลดลงต่ำกว่า k → ช่วงนั้น **จบ** ก่อนวันนี้

```diagram
วัน      1    3    4    5    7    9
จำนวน    1    2    3    2    1    0
         ·    ▲เริ่ม             ▲ ลดต่ำกว่า 2 ที่วัน 7
ช่วงน่าสนใจ: ตั้งแต่วัน 3 จนก่อนวัน 7 (วัน 3,4,5,6)
from  = [3]     until = [7]
```

รายการทั้งสองเรียงอยู่แล้วเพราะการกวาดเดินจากซ้ายไปขวา และช่วงไม่ซ้อนทับกัน

:::key ทำไมเหตุการณ์ของวันเดียวกันต้องทำพร้อมกัน
บูธที่ปิดวัน d−1 (เหตุการณ์ที่ d) กับบูธที่เปิดวัน d มีผลกับวัน d ทั้งคู่ ถ้าตรวจ "≥ k" ระหว่างสองเหตุการณ์นี้ อาจได้ช่วงปลอมที่จบแล้วเริ่มใหม่ในวันเดียวกัน หรือช่องว่างปลอม
:::

{{viz}}

### ขั้นที่ 3: ตอบคำถามด้วย binary search

วัน x น่าสนใจเมื่ออยู่ในช่วง [from[i], until[i]) ช่วงใดช่วงหนึ่ง ให้หาช่วงสุดท้ายที่ **เริ่มไม่หลัง x**:

`i = upper_bound(from, x) − 1`

แล้วตรวจ `i ≥ 0` และ `x < until[i]` ตัวอย่าง: x = 6 → i = 0, 6 < 7 → YES; x = 8 → i = 0, 8 ≥ 7 → NO; x = 2 → i = −1 → NO

:::warn กับดัก
- ใช้อาร์เรย์ที่มีวันเป็น index: วันมีค่าถึง 10⁹
- ไล่ทุกบูธในทุกคำถาม: O(n·q) = 4·10¹⁰
- พิมพ์ 200 000 บรรทัด: ใช้ `'\n'` และ fast I/O (PDF ก็บอกไว้)
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** เรียงเหตุการณ์ 2n ตัว: O(n log n) การกวาด O(n) แต่ละคำถามเป็น binary search หนึ่งครั้ง: O(q log n) รวม **O((n + q) log n)** หน่วยความจำ: เหตุการณ์และรายการช่วง **O(n)**

{{tested}}
