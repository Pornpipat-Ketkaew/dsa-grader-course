title: Internet Provider
title_th: Internet Provider (สาย UTP กับ Modem)
stars: 3
tech: Kruskal with union-find, MST exchange argument (cut the longest tree edges), Forests with K components
tech_th: Kruskal ด้วย union-find, เหตุผลแลกเปลี่ยนของ MST (ตัดเส้นที่ยาวที่สุดในต้นไม้), ป่าที่มี K component
complexity: O(M log M) time · O(N + M) memory
key: K modems connect K separate pieces for free, so the cables only need to form a forest with K trees. The cheapest such forest is the MST without its K − 1 longest edges. Run Kruskal, sum all tree edges except the K − 1 longest, multiply by U.
key_th: modem K เครื่องเชื่อม K ชิ้นที่แยกกันได้ฟรี สายจึงต้องเป็นแค่ป่าที่มี K ต้น ป่าแบบนั้นที่ถูกที่สุดคือ MST ที่ตัดเส้นที่ยาวที่สุด K − 1 เส้นออก รัน Kruskal รวมความยาวเส้นในต้นไม้ยกเว้น K − 1 เส้นที่ยาวที่สุด แล้วคูณ U
tests: all 3 PDF samples and a 2-city case, 300 random networks against a brute force that tries every modem placement with an MST of the rest, and N = 100 000, M = 200 000, K = 500 in 0.07 s.
tests_th: ตัวอย่างทั้ง 3 ใน PDF และกรณี 2 เมือง, เครือข่ายสุ่ม 300 ชุดเทียบกับ brute force ที่ลองวาง modem ทุกแบบพร้อม MST ของส่วนที่เหลือ และ N = 100 000, M = 200 000, K = 500 ใช้ 0.07 วินาที
==== en
## Technique: Kruskal, and what an MST knows about forests

**Kruskal** sorts the edges by weight and takes each one unless it would close a cycle, which a **union-find** structure answers in almost O(1). The edges it takes, in order, have a strong property:

> stopping Kruskal after N − K edges gives a minimum spanning forest with K trees.

In other words, removing the K − 1 heaviest edges of an MST leaves the cheapest way to split the vertices into K connected groups. (Same exchange argument as for the MST: any cheaper K-forest would let Kruskal pick a lighter edge earlier.)

## How it maps onto this problem

### Step 1: what modems do

Cities with modems talk to each other directly, wherever they are. So with K modems, the cables only have to connect every city to **some** modem city: the cable network may consist of K separate pieces, one modem in each, and the modems join the pieces.

### Step 2: the cheapest K pieces

The cheapest cable network with K pieces is the MST minus its K − 1 longest edges. Kruskal already produces the MST edges in increasing order, so just leave out the last K − 1 of them. (K = 0 or 1: nothing is left out; one modem alone cannot connect anything.)

```diagram
sample 3 (K = 3): MST lengths 1 2 3 4 5 6 8 9 (all 8 edges)
drop the 2 longest (9 and 8): 1 + 2 + 3 + 4 + 5 + 6 = 21
```

{{viz}}

### Step 3: cost

Sum the kept lengths and multiply by U (price per metre).

:::warn Traps
- Dropping K longest edges instead of K − 1: K modems join K pieces, which needs only K − 1 links.
- Dropping the longest **routes of the input** instead of the longest **tree** edges.
- Total length up to 10⁸ metres × U = 10: use `long long`.
:::

## Solution

{{code}}

**Complexity.** Sorting dominates: **O(M log M)**; union-find with path halving is almost O(1) per operation. Memory: **O(N + M)**.

{{tested}}
==== th
## เทคนิค: Kruskal และสิ่งที่ MST บอกเกี่ยวกับป่า

**Kruskal** เรียงเส้นตามน้ำหนัก แล้วเลือกทีละเส้น ยกเว้นเส้นที่จะทำให้เกิดวงรอบ ซึ่งโครงสร้าง **union-find** ตอบได้เกือบ O(1) เส้นที่มันเลือกตามลำดับมีคุณสมบัติสำคัญ:

> หยุด Kruskal หลังได้ N − K เส้น จะได้ป่าทอดข้ามที่น้อยที่สุดที่มี K ต้น

กล่าวอีกแบบ: การถอดเส้นที่หนักที่สุด K − 1 เส้นของ MST ให้วิธีที่ถูกที่สุดในการแบ่งจุดเป็น K กลุ่มที่เชื่อมกัน (เหตุผลแลกเปลี่ยนเดียวกับ MST: ถ้ามีป่า K ต้นที่ถูกกว่า Kruskal จะต้องเลือกเส้นที่เบากว่าได้ก่อนหน้านั้น)

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: modem ทำอะไร

เมืองที่มี modem ติดต่อกันได้โดยตรงไม่ว่าอยู่ที่ไหน เมื่อมี modem K เครื่อง สายจึงต้องเชื่อมแต่ละเมืองไปยังเมืองที่มี modem **สักเมือง** เท่านั้น: เครือข่ายสายแยกเป็น K ชิ้นได้ ชิ้นละหนึ่ง modem แล้ว modem เชื่อมชิ้นเหล่านั้นเข้าด้วยกัน

### ขั้นที่ 2: K ชิ้นที่ถูกที่สุด

เครือข่ายสายที่ถูกที่สุดที่มี K ชิ้นคือ MST ลบเส้นที่ยาวที่สุด K − 1 เส้น Kruskal ให้เส้นของ MST เรียงจากสั้นไปยาวอยู่แล้ว จึงแค่ไม่เอา K − 1 เส้นสุดท้าย (K = 0 หรือ 1: ไม่ต้องตัดอะไร modem เครื่องเดียวเชื่อมอะไรไม่ได้)

```diagram
ตัวอย่าง 3 (K = 3): ความยาวใน MST 1 2 3 4 5 6 8 9 (ครบ 8 เส้น)
ตัด 2 เส้นที่ยาวที่สุด (9 และ 8): 1 + 2 + 3 + 4 + 5 + 6 = 21
```

{{viz}}

### ขั้นที่ 3: ค่าใช้จ่าย

รวมความยาวที่เก็บไว้แล้วคูณ U (ราคาต่อเมตร)

:::warn กับดัก
- ตัดเส้นที่ยาวที่สุด K เส้นแทน K − 1: modem K เครื่องเชื่อม K ชิ้น ต้องการแค่ K − 1 การเชื่อม
- ตัดเส้นทาง **ในข้อมูลเข้า** ที่ยาวที่สุด แทนเส้น **ในต้นไม้** ที่ยาวที่สุด
- ความยาวรวมได้ถึง 10⁸ เมตร × U = 10: ใช้ `long long`
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** การเรียงเป็นส่วนหลัก: **O(M log M)** union-find แบบ path halving เกือบ O(1) ต่อครั้ง หน่วยความจำ: **O(N + M)**

{{tested}}
