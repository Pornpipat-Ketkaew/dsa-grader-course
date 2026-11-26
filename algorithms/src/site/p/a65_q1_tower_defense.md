title: Tower Defense
title_th: Tower Defense (ป้อมปืน)
stars: 3
tech: Backtracking over choices, Branch and bound
tech_th: Backtracking เลือกทางเลือก, Branch and bound (ตัดกิ่งด้วยขอบเขต)
complexity: O((m+1)^k) worst case, far less with the bound · O(m + k) memory
key: Each useful hit lowers the total power by exactly 1, so the task is "maximize useful hits". Give every tower a target in turn (any monster in range that still has power, or no useful hit) and cut a branch as soon as hits + remaining towers cannot beat the best found.
key_th: การยิงที่มีผลแต่ละครั้งลดพลังรวมได้ 1 พอดี โจทย์จึงกลายเป็น "ทำให้ยิงได้ผลมากที่สุด" ให้ป้อมแต่ละป้อมเลือกเป้าทีละป้อม (มอนสเตอร์ในระยะที่ยังมีพลัง หรือไม่ยิงโดนอะไรที่มีผล) และตัดกิ่งทันทีที่ hits + จำนวนป้อมที่เหลือ ไม่มีทางชนะค่าที่ดีที่สุดที่เจอแล้ว
tests: all 3 PDF samples and 300 random cases (m, k ≤ 6) against a brute force that tries every assignment; three m = k = 8, w = n worst cases (power 1000, power 1, and only 7 useful hits possible) each well under the time limit.
tests_th: ตัวอย่างทั้ง 3 ใน PDF และสุ่ม 300 ชุด (m, k ≤ 6) เทียบกับ brute force ที่ลองทุกการกำหนดเป้า และกรณีแย่สุด m = k = 8, w = n สามแบบ (พลัง 1000, พลัง 1 และยิงได้ผลแค่ 7 ครั้ง) แต่ละกรณีใช้เวลาต่ำกว่าเวลาจำกัดมาก
==== en
## Technique: backtracking with branch and bound

Backtracking makes one decision per level: here, **level = tower**, and the choices are the targets of that tower. A leaf is a full plan for all k towers.

When we **optimize** instead of listing, a second tool becomes available: **branch and bound**. At every node compute an optimistic bound on the best value any leaf below can reach. If that bound cannot beat the best leaf already found, the whole subtree is skipped.

```cpp
void search(level, value) {
    if (value + bestPossibleGain(level) <= best) return;   // bound
    if (level == last) { best = value; return; }
    for (each choice) { apply; search(level + 1, value + gain); undo; }
}
```

## How it maps onto this problem

### Step 1: turn "minimum remaining power" into "maximum useful hits"

A hit on a monster with power > 0 lowers the total by exactly 1. A hit on a monster already at 0 changes nothing. So

> remaining power = total power − (number of useful hits)

and minimizing the left side is the same as maximizing `hits`. The answer is `totalPower − bestHits`.

### Step 2: the choices of one tower

Tower `tower` may shoot any monster `monster` with `|monsterAt[monster] − towerAt[tower]| ≤ reach` and `power[monster] > 0`. Choose it by `power[monster]--`, recurse to `tower + 1` with `hits + 1`, then undo with `power[monster]++`.

There is always one more option: **no useful hit**. It covers a tower with nothing in range, and a tower whose monsters are all at 0. Skipping it would make such inputs lose whole branches.

:::warn Why not greedy?
Towers T0 and T1, monsters M0 and M1 with power 1. T0 reaches both, T1 reaches only M0. Greedy "shoot the first monster in range" sends T0 to M0, and T1 is left with nothing: 1 hit. The best plan (T0 → M1, T1 → M0) makes 2. A tower's choice changes what later towers can do, so every choice must be tried.
:::

### Step 3: the bound

At the call for `tower` there are `towerCount − tower` towers left, and each can add at most one useful hit. So

> if `hits + (towerCount − tower) ≤ bestHits`, nothing below can be strictly better: return.

Because `bestHits` starts at 0 and the first leaf reached is the "everyone shoots something" branch tried first, a good `bestHits` appears early and cuts many later branches. Once some plan hits with every tower (`bestHits = towerCount`), every remaining call is cut immediately.

{{viz}}

### Step 4: is it fast enough?

Each tower has at most m + 1 choices, so the tree has at most (m+1)^k = 9⁸ ≈ 4.3·10⁷ leaves for m = k = 8. The bound and the `power > 0` test remove most of them; the hardest test (only 7 useful hits exist, so no branch ever reaches 8) still finishes far inside 1 second.

## Solution

{{code}}

**Complexity.** At most (m+1)^k leaves with O(m) work per node in the worst case, usually far fewer thanks to the bound; with m, k ≤ 8 that is safe. Memory: the arrays plus a recursion of depth k: **O(m + k)**.

{{tested}}
==== th
## เทคนิค: backtracking พร้อม branch and bound

Backtracking ตัดสินใจหนึ่งเรื่องต่อหนึ่งระดับ ในข้อนี้ **ระดับ = ป้อม** และทางเลือกคือเป้าของป้อมนั้น ใบหนึ่งใบคือแผนที่ครบทั้ง k ป้อม

เมื่อเรา **หาค่าที่ดีที่สุด** แทนการแจกแจง จะมีเครื่องมือที่สองให้ใช้: **branch and bound** ที่ทุกโหนดคำนวณขอบเขตแบบมองโลกในแง่ดีของค่าที่ดีที่สุดที่ใบใต้โหนดนี้ทำได้ ถ้าขอบเขตนั้นชนะใบที่ดีที่สุดที่เจอแล้วไม่ได้ ก็ข้ามทั้งกิ่งย่อย

```cpp
void search(level, value) {
    if (value + bestPossibleGain(level) <= best) return;   // ขอบเขต
    if (level == last) { best = value; return; }
    for (each choice) { apply; search(level + 1, value + gain); undo; }
}
```

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: เปลี่ยน "พลังเหลือน้อยที่สุด" เป็น "ยิงได้ผลมากที่สุด"

การยิงมอนสเตอร์ที่มีพลัง > 0 ลดพลังรวมได้ 1 พอดี การยิงมอนสเตอร์ที่เหลือ 0 แล้วไม่เปลี่ยนอะไร ดังนั้น

> พลังที่เหลือ = พลังรวม − (จำนวนการยิงที่มีผล)

การทำให้ฝั่งซ้ายน้อยที่สุดจึงเหมือนกับการทำให้ `hits` มากที่สุด คำตอบคือ `totalPower − bestHits`

### ขั้นที่ 2: ทางเลือกของป้อมหนึ่งป้อม

ป้อม `tower` ยิงมอนสเตอร์ `monster` ใดก็ได้ที่ `|monsterAt[monster] − towerAt[tower]| ≤ reach` และ `power[monster] > 0` เลือกด้วย `power[monster]--` เรียกต่อที่ `tower + 1` พร้อม `hits + 1` แล้วยกเลิกด้วย `power[monster]++`

มีอีกทางเลือกหนึ่งเสมอ: **ไม่ยิงโดนอะไรที่มีผล** ครอบคลุมป้อมที่ไม่มีอะไรในระยะ และป้อมที่มอนสเตอร์ในระยะเหลือ 0 หมดแล้ว ถ้าข้ามทางเลือกนี้ อินพุตแบบนั้นจะเสียทั้งกิ่งไป

:::warn ทำไมไม่ใช้ greedy?
ป้อม T0 และ T1 มอนสเตอร์ M0 และ M1 พลัง 1 T0 ยิงถึงทั้งคู่ T1 ยิงถึงแค่ M0 greedy แบบ "ยิงตัวแรกที่อยู่ในระยะ" ส่ง T0 ไปยิง M0 แล้ว T1 ไม่เหลืออะไรให้ยิง: ได้ 1 ครั้ง แผนที่ดีที่สุด (T0 → M1, T1 → M0) ได้ 2 ครั้ง ทางเลือกของป้อมหนึ่งเปลี่ยนสิ่งที่ป้อมถัดไปทำได้ จึงต้องลองทุกทางเลือก
:::

### ขั้นที่ 3: ขอบเขต

ตอนเรียกสำหรับ `tower` ยังเหลือ `towerCount − tower` ป้อม และแต่ละป้อมเพิ่มการยิงที่มีผลได้ไม่เกินหนึ่งครั้ง ดังนั้น

> ถ้า `hits + (towerCount − tower) ≤ bestHits` ไม่มีอะไรข้างล่างดีกว่าได้จริง: return

เพราะ `bestHits` เริ่มที่ 0 และใบแรกที่ไปถึงคือกิ่ง "ทุกป้อมยิงอะไรสักอย่าง" ที่ถูกลองก่อน ค่า `bestHits` ที่ดีจึงปรากฏเร็วและตัดกิ่งหลัง ๆ ได้มาก เมื่อมีแผนที่ทุกป้อมยิงได้ผล (`bestHits = towerCount`) ทุกการเรียกที่เหลือจะถูกตัดทันที

{{viz}}

### ขั้นที่ 4: เร็วพอไหม?

ป้อมแต่ละป้อมมีทางเลือกไม่เกิน m + 1 ทาง ต้นไม้จึงมีใบไม่เกิน (m+1)^k = 9⁸ ≈ 4.3·10⁷ ใบเมื่อ m = k = 8 ขอบเขตและการตรวจ `power > 0` ตัดส่วนใหญ่ออก ชุดทดสอบที่ยากที่สุด (ยิงได้ผลแค่ 7 ครั้ง ไม่มีกิ่งใดถึง 8) ก็ยังเสร็จภายใน 1 วินาทีได้สบาย

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** ใบไม่เกิน (m+1)^k ใบ โหนดละ O(m) ในกรณีแย่สุด และน้อยกว่านั้นมากด้วยขอบเขต เมื่อ m, k ≤ 8 ปลอดภัย หน่วยความจำ: อาร์เรย์และ recursion ลึก k: **O(m + k)**

{{tested}}
