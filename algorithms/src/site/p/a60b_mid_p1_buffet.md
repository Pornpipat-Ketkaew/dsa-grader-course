title: Buffet Line
title_th: Buffet Line (ไฟส่องโต๊ะบุฟเฟต์)
stars: 1
tech: Greedy covering points with intervals, Leftmost uncovered point, Push the choice as far right as possible
tech_th: Greedy ครอบคลุมจุดด้วยช่วง, จุดที่ยังไม่ถูกครอบคลุมซ้ายสุด, ดันการเลือกไปทางขวาให้มากที่สุด
complexity: O(f log f) time (the sort) · O(f) memory
key: The leftmost dark food must be lit by some lamp within w of it. Of all such lamps, the one at food + w lights everything the others light to the right, so place it there, skip all food it covers, and repeat.
key_th: อาหารที่มืดซ้ายสุดต้องถูกหลอดไฟสักดวงที่อยู่ห่างไม่เกิน w ส่อง ในบรรดาหลอดไฟเหล่านั้น ดวงที่ตำแหน่ง food + w ส่องทุกอย่างทางขวาที่ดวงอื่นส่องได้ จึงวางที่นั่น ข้ามอาหารทั้งหมดที่มันส่องถึง แล้วทำซ้ำ
tests: all 3 PDF samples, w = 10 000 with one food, 300 random cases against a brute force over lamp sets, and n = f = 10 000 with w = 0 (10 000 lamps).
tests_th: ตัวอย่างทั้ง 3 ใน PDF, w = 10 000 กับอาหารชิ้นเดียว, สุ่ม 300 ชุดเทียบกับ brute force ที่ลองทุกชุดหลอดไฟ และ n = f = 10 000 กับ w = 0 (10 000 ดวง)
==== en
## Technique: greedy cover, anchored at the leftmost uncovered point

"Cover all points with the fewest intervals of length 2w" has a clean greedy:

1. Look at the **leftmost** point that is not covered yet. Something must cover it.
2. Among all intervals that cover it, choose the one reaching **farthest right**.
3. Mark everything it covers, and repeat from step 1.

**Why it is optimal.** Take any optimal set of lamps and look at the lamp `L` that lights the leftmost food `x`. Its position is at most `x + w`. Moving it to exactly `x + w` still lights `x`, loses nothing (there is no food left of `x`), and lights at least as much to the right. Repeating this exchange turns any optimal answer into the greedy one without increasing the count.

## How it maps onto this problem

### Step 1: sort the food cells

The input lists food cells in any order (sample 3 is shuffled), so sort them. The hint in the PDF says the same.

### Step 2: one variable is enough

Keep `litUpTo`: every cell at or left of it is lit. Scan food left to right:

- `food ≤ litUpTo`: already lit, nothing to do;
- `food > litUpTo`: it is the leftmost dark food. Put a lamp at `food + w`, which lights `food .. food + 2w`, so `litUpTo = food + 2w`.

{{viz}}

### Step 3: the edge of the table

`food + w` may be beyond cell n. That is harmless: a lamp at cell n would light the same food (no food lies beyond n), and only the count is printed.

:::warn Traps
- Forgetting to sort: the greedy needs food from left to right.
- Placing the lamp **on** the food (`food`) instead of `food + w`: still valid, but wastes half of the lamp's reach and gives too many lamps.
- w = 0: every food cell needs its own lamp.
:::

## Solution

{{code}}

**Complexity.** Sorting: **O(f log f)**; the scan is O(f). Memory: **O(f)**.

{{tested}}
==== th
## เทคนิค: greedy ครอบคลุม โดยยึดจุดที่ยังไม่ถูกครอบคลุมซ้ายสุด

"ครอบคลุมทุกจุดด้วยช่วงยาว 2w ให้ใช้น้อยที่สุด" มี greedy ที่สวยงาม:

1. ดูจุด **ซ้ายสุด** ที่ยังไม่ถูกครอบคลุม ต้องมีอะไรสักอย่างครอบคลุมมัน
2. ในบรรดาช่วงทั้งหมดที่ครอบคลุมจุดนั้น เลือกช่วงที่ไปได้ **ไกลทางขวาที่สุด**
3. ทำเครื่องหมายทุกอย่างที่มันครอบคลุม แล้วกลับไปขั้นที่ 1

**ทำไมดีที่สุด** นำชุดหลอดไฟที่ดีที่สุดใด ๆ มาดูหลอด `L` ที่ส่องอาหารซ้ายสุด `x` ตำแหน่งของมันไม่เกิน `x + w` การย้ายไปที่ `x + w` พอดียังส่อง `x` ได้ ไม่เสียอะไร (ไม่มีอาหารทางซ้ายของ `x`) และส่องทางขวาได้อย่างน้อยเท่าเดิม การสลับแบบนี้ซ้ำ ๆ เปลี่ยนคำตอบที่ดีที่สุดใด ๆ ให้เป็นคำตอบของ greedy โดยจำนวนไม่เพิ่ม

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: เรียงช่องอาหาร

อินพุตให้ช่องอาหารมาลำดับใดก็ได้ (ตัวอย่าง 3 สลับมา) จึงต้องเรียง คำแนะนำใน PDF ก็บอกเช่นนั้น

### ขั้นที่ 2: ตัวแปรเดียวพอ

เก็บ `litUpTo`: ทุกช่องที่อยู่ที่หรือทางซ้ายของมันสว่างแล้ว ไล่อาหารจากซ้ายไปขวา:

- `food ≤ litUpTo`: สว่างแล้ว ไม่ต้องทำอะไร
- `food > litUpTo`: มันคืออาหารที่มืดซ้ายสุด วางหลอดไฟที่ `food + w` ซึ่งส่อง `food .. food + 2w` ดังนั้น `litUpTo = food + 2w`

{{viz}}

### ขั้นที่ 3: ขอบโต๊ะ

`food + w` อาจเลยช่อง n ไป ไม่เป็นปัญหา: หลอดไฟที่ช่อง n ส่องอาหารชุดเดียวกัน (ไม่มีอาหารเลย n) และโจทย์พิมพ์แค่จำนวน

:::warn กับดัก
- ลืมเรียง: greedy ต้องไล่อาหารจากซ้ายไปขวา
- วางหลอดไฟ **บน** อาหาร (`food`) แทน `food + w`: ยังถูกต้องแต่เสียระยะส่องไปครึ่งหนึ่ง และได้จำนวนหลอดมากเกินไป
- w = 0: อาหารทุกช่องต้องมีหลอดไฟของตัวเอง
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** การเรียง: **O(f log f)** การไล่เป็น O(f) หน่วยความจำ: **O(f)**

{{tested}}
