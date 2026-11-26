title: Exchange
title_th: Exchange (แลกเงินได้กำไรไม่จำกัด)
stars: 3
tech: Logarithms turn products into sums, Negative-cycle detection with Bellman–Ford, Early exit via the improvement pointers, Fast decimal input
tech_th: ลอการิทึมเปลี่ยนผลคูณเป็นผลรวม, ตรวจวงรอบติดลบด้วย Bellman–Ford, หยุดก่อนด้วยตัวชี้การปรับ, อ่านทศนิยมอย่างเร็ว
complexity: O(N³) per table worst case, usually a few rounds · O(N²) memory
key: Money multiplies along a route, and a loop is profitable when its product of rates exceeds 1. With weight −log(rate) products become sums and "product > 1" becomes "sum < 0": infinite money is exactly a negative cycle. Detect it with Bellman–Ford from a virtual source (all potentials 0), stopping as soon as the improvement pointers form a loop.
key_th: เงินคูณกันไปตามเส้นทาง และวงหนึ่งได้กำไรเมื่อผลคูณของอัตราเกิน 1 เมื่อใช้น้ำหนัก −log(อัตรา) ผลคูณจะกลายเป็นผลรวม และ "ผลคูณ > 1" กลายเป็น "ผลรวม < 0": เงินไม่จำกัดคือวงรอบติดลบพอดี ตรวจด้วย Bellman–Ford จากต้นทางสมมุติ (potential ทั้งหมดเป็น 0) และหยุดทันทีที่ตัวชี้การปรับเป็นวง
tests: the PDF sample, single-currency and sparse tables, a 3-currency ring hidden in larger tables, 300 random tables against a brute force, and 20 tables of 500 × 500 (5 million rates) without and with a barely profitable loop in 0.21 s and 0.14 s.
tests_th: ตัวอย่างใน PDF ตารางสกุลเดียวและตารางที่มีอัตรา 0 มาก วงสามสกุลที่ซ่อนในตารางใหญ่ ตารางสุ่ม 300 ชุดเทียบกับ brute force และ 20 ตาราง 500 × 500 (5 ล้านอัตรา) แบบไม่มีและมีวงที่ได้กำไรเพียงเล็กน้อย ใช้ 0.21 และ 0.14 วินาที
==== en
## Technique: −log turns "multiply" into "add"

Shortest-path algorithms add weights along a path. When a quantity **multiplies** along a path (exchange rates, probabilities), take logarithms: log(a · b) = log a + log b. Choosing weight **w = −log(rate)** also flips the direction of "good":

> product of rates on a loop > 1 ⇔ Σ log(rate) > 0 ⇔ Σ w < 0.

So a profitable loop is precisely a **negative cycle**, and the negative-cycle test of Bellman–Ford answers the question.

## How it maps onto this problem

### Step 1: build the weights

Every ordered pair (a, b) with R[a][b] > 0 is an edge of weight −log R[a][b]. A rate of 0 means "no exchange": weight ∞. The diagonal R[a][a] = 1 gives weight 0, harmless.

### Step 2: Bellman–Ford from a virtual source

A profitable loop can start from any currency, so start every potential at 0 (a hidden source with 0-edges to all currencies) and relax all N² pairs per round:

- a round with no change → no negative cycle → **NO**;
- a change in round N → negative cycle → **YES**.

{{viz}}

### Step 3: stop early with the improvement pointers

N rounds of N² pairs is 1.25·10⁸ per table, times 20 tables. Most tables answer much sooner:

- Record `lastImprovedFrom[v] = u` whenever u lowers v.
- If these pointers ever form a loop, that loop is a negative cycle (each currency was last improved by the previous one around the loop, and adding up the improvements shows the loop's weight is negative). Then answer YES immediately.

Checking the pointers costs O(N) per round, nothing compared with the N² relaxations.

### Step 4: input speed

The input can hold 20 × 250 000 = 5·10⁶ decimals. `cin >> double` takes about 0.8 s just for that, so the solution reads lines and converts plain decimals digit by digit (0.2 s total).

:::warn Traps
- Using products directly: amounts on a profitable loop grow without bound and overflow; logs keep the numbers small.
- Comparing doubles without a tolerance: a "loop" with product exactly 1 can look negative by 10⁻¹⁶. The solution ignores improvements smaller than 10⁻¹².
- A rate of 0: `log(0)` is −∞, so it must become weight +∞ (no edge), not −∞.
:::

## Solution

{{code}}

**Complexity.** At most N rounds of N² relaxations: **O(N³)** per table in the worst case; random tables stop after a few rounds. Memory: **O(N²)**.

{{tested}}
==== th
## เทคนิค: −log เปลี่ยน "คูณ" เป็น "บวก"

อัลกอริทึมเส้นทางสั้นที่สุดบวกน้ำหนักไปตามเส้นทาง เมื่อปริมาณ **คูณ** กันไปตามเส้นทาง (อัตราแลกเปลี่ยน ความน่าจะเป็น) ให้ใช้ลอการิทึม: log(a · b) = log a + log b การเลือกน้ำหนัก **w = −log(อัตรา)** ยังกลับทิศของ "ดี" ด้วย:

> ผลคูณอัตราบนวง > 1 ⇔ Σ log(อัตรา) > 0 ⇔ Σ w < 0

วงที่ได้กำไรจึงคือ **วงรอบติดลบ** พอดี และการตรวจวงรอบติดลบของ Bellman–Ford ตอบคำถามนี้ได้

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: สร้างน้ำหนัก

ทุกคู่ลำดับ (a, b) ที่ R[a][b] > 0 คือเส้นน้ำหนัก −log R[a][b] อัตรา 0 หมายถึง "แลกไม่ได้": น้ำหนัก ∞ แนวทแยง R[a][a] = 1 ให้น้ำหนัก 0 ไม่มีผล

### ขั้นที่ 2: Bellman–Ford จากต้นทางสมมุติ

วงที่ได้กำไรเริ่มที่สกุลไหนก็ได้ จึงให้ potential ทุกตัวเริ่มที่ 0 (ต้นทางลับที่มีเส้น 0 ไปทุกสกุล) แล้วผ่อนคลายทั้ง N² คู่ต่อรอบ:

- รอบที่ไม่มีอะไรเปลี่ยน → ไม่มีวงรอบติดลบ → **NO**
- มีการเปลี่ยนในรอบที่ N → มีวงรอบติดลบ → **YES**

{{viz}}

### ขั้นที่ 3: หยุดก่อนด้วยตัวชี้การปรับ

N รอบ × N² คู่ คือ 1.25·10⁸ ต่อตาราง คูณ 20 ตาราง ตารางส่วนใหญ่ตอบได้เร็วกว่านั้นมาก:

- จด `lastImprovedFrom[v] = u` ทุกครั้งที่ u ทำให้ v ลดลง
- ถ้าตัวชี้เหล่านี้เป็นวงเมื่อไร วงนั้นคือวงรอบติดลบ (แต่ละสกุลถูกปรับล่าสุดโดยสกุลก่อนหน้าในวง และเมื่อรวมการปรับทั้งหมดจะได้ว่าน้ำหนักของวงติดลบ) ตอบ YES ได้ทันที

การตรวจตัวชี้ใช้ O(N) ต่อรอบ น้อยมากเมื่อเทียบกับการผ่อนคลาย N² ครั้ง

### ขั้นที่ 4: ความเร็วในการอ่าน

ข้อมูลเข้ามีทศนิยมได้ถึง 20 × 250 000 = 5·10⁶ ตัว `cin >> double` ใช้ราว 0.8 วินาทีแค่ส่วนนี้ โค้ดเฉลยจึงอ่านทีละบรรทัดแล้วแปลงทศนิยมธรรมดาทีละหลัก (รวม 0.2 วินาที)

:::warn กับดัก
- ใช้ผลคูณตรง ๆ: จำนวนเงินบนวงที่ได้กำไรโตไม่สิ้นสุดและล้น ลอการิทึมทำให้ตัวเลขเล็ก
- เปรียบเทียบ double โดยไม่มีค่าเผื่อ: "วง" ที่ผลคูณเท่ากับ 1 พอดีอาจดูติดลบได้ 10⁻¹⁶ โค้ดเฉลยไม่สนการดีขึ้นที่น้อยกว่า 10⁻¹²
- อัตรา 0: `log(0)` เป็น −∞ จึงต้องเป็นน้ำหนัก +∞ (ไม่มีเส้น) ไม่ใช่ −∞
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** ไม่เกิน N รอบ รอบละ N² การผ่อนคลาย: **O(N³)** ต่อตารางในกรณีแย่สุด ตารางสุ่มหยุดหลังไม่กี่รอบ หน่วยความจำ: **O(N²)**

{{tested}}
