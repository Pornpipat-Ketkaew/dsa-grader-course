title: Fractional Knapsack
title_th: Fractional Knapsack (เป้แบบแบ่งของได้)
stars: 1
tech: Greedy by ratio (value per unit weight), Exchange argument
tech_th: Greedy ตามอัตราส่วน (ราคาต่อหน่วยน้ำหนัก), Exchange argument
complexity: O(N log N) time · O(N) memory
key: When items can be cut, every unit of weight should carry as much value as possible. Sort by price/weight, take whole items while they fit, then a fraction of the next one to fill the bag exactly, and stop.
key_th: เมื่อแบ่งของได้ น้ำหนักทุกหน่วยควรให้มูลค่ามากที่สุด เรียงตาม price/weight หยิบทั้งชิ้นตราบใดที่ใส่ได้ แล้วหยิบบางส่วนของชิ้นถัดไปให้เต็มกระเป๋าพอดี แล้วหยุด
tests: both PDF samples, a case where everything fits, 300 random cases against an independent float implementation, and N = 100 000 in well under the limit.
tests_th: ตัวอย่างทั้งสองใน PDF กรณีที่ใส่ได้ทั้งหมด สุ่ม 300 ชุดเทียบกับโปรแกรมทศนิยมที่เขียนแยก และ N = 100 000 ใช้เวลาน้อยกว่าเวลาจำกัดมาก
==== en
## Technique: greedy by ratio

Fractional knapsack is the greedy problem where the obvious rule really works. Think of every item as a liquid: item i is `w[i]` units of weight, each unit worth `v[i] / w[i]`. Filling the bag unit by unit, the best next unit is always the most valuable one available.

**Exchange argument.** Suppose an optimal filling uses some weight of item `b` while a better-ratio item `a` is not fully used. Swap a small amount ε of weight from `b` to `a`: the weight is unchanged and the value changes by ε·(v[a]/w[a] − v[b]/w[b]) ≥ 0. Repeating this shows the greedy filling is optimal.

(The 0/1 knapsack, where items cannot be cut, breaks this argument and needs dynamic programming: see Chapter 14.)

## How it maps onto this problem

### Step 1: sort by ratio without dividing

Sort item indices by `v/w`, largest first. Comparing `v[a]/w[a] > v[b]/w[b]` is the same as `v[a]·w[b] > v[b]·w[a]` because weights are positive, and the product form avoids division in the comparator.

### Step 2: fill

```cpp
for each item in that order, while room > 0:
    if weight fits:  take it all,   room -= weight
    else:            take room/weight of it, room = 0 (the bag is full, stop)
```

At most one item is taken partially, and it is the last one.

{{viz}}

### Step 3: output

Print with 4 decimals (`fixed << setprecision(4)`). `double` has about 15 significant digits, far more than the required 0.00001 % accuracy.

:::warn Traps
- W and the prices/weights are **real numbers**: read them as `double`.
- If the total weight is below W, every item is taken and the loop simply ends.
- Prices come first, then weights, each on its own line.
:::

## Solution

{{code}}

**Complexity.** The sort: **O(N log N)**, then one scan O(N). Memory: **O(N)**.

{{tested}}
==== th
## เทคนิค: greedy ตามอัตราส่วน

Fractional knapsack คือโจทย์ greedy ที่กฎตรงไปตรงมาใช้ได้จริง ให้มองของแต่ละชิ้นเป็นของเหลว: ของชิ้นที่ i มีน้ำหนัก `w[i]` หน่วย แต่ละหน่วยมีค่า `v[i] / w[i]` เมื่อเติมกระเป๋าทีละหน่วย หน่วยถัดไปที่ดีที่สุดคือหน่วยที่มีค่ามากที่สุดที่ยังเหลืออยู่เสมอ

**Exchange argument** สมมติว่าการเติมที่ดีที่สุดใช้น้ำหนักบางส่วนของ `b` ขณะที่ของ `a` ที่อัตราส่วนดีกว่ายังใช้ไม่หมด ย้ายน้ำหนักจำนวนเล็ก ε จาก `b` ไป `a`: น้ำหนักเท่าเดิม มูลค่าเปลี่ยนไป ε·(v[a]/w[a] − v[b]/w[b]) ≥ 0 ทำซ้ำไปเรื่อย ๆ แสดงว่าการเติมแบบ greedy ดีที่สุด

(0/1 knapsack ที่แบ่งของไม่ได้ทำให้เหตุผลนี้ใช้ไม่ได้ และต้องใช้ dynamic programming: ดูบทที่ 14)

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: เรียงตามอัตราส่วนโดยไม่หาร

เรียงดัชนีของตาม `v/w` จากมากไปน้อย การเทียบ `v[a]/w[a] > v[b]/w[b]` เหมือนกับ `v[a]·w[b] > v[b]·w[a]` เพราะน้ำหนักเป็นบวก รูปแบบผลคูณหลีกเลี่ยงการหารใน comparator

### ขั้นที่ 2: เติม

```cpp
for each item in that order, while room > 0:
    if weight fits:  take it all,   room -= weight
    else:            take room/weight of it, room = 0 (เต็มแล้ว หยุด)
```

มีของไม่เกินหนึ่งชิ้นที่ถูกหยิบบางส่วน และเป็นชิ้นสุดท้าย

{{viz}}

### ขั้นที่ 3: ผลลัพธ์

พิมพ์ทศนิยม 4 ตำแหน่ง (`fixed << setprecision(4)`) `double` มีความแม่นยำราว 15 หลัก มากกว่าความแม่นยำ 0.00001 % ที่ต้องการมาก

:::warn กับดัก
- W ราคา และน้ำหนักเป็น **จำนวนจริง**: อ่านเป็น `double`
- ถ้าน้ำหนักรวมน้อยกว่า W ของทุกชิ้นถูกหยิบ และลูปก็จบเอง
- ราคามาก่อน แล้วจึงเป็นน้ำหนัก แต่ละชุดอยู่คนละบรรทัด
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** การเรียง: **O(N log N)** แล้วไล่หนึ่งรอบ O(N) หน่วยความจำ: **O(N)**

{{tested}}
