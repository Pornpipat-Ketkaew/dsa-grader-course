title: Recur Matrix
title_th: Matrix ประหลาด (Recur Matrix)
stars: 1
tech: Recursive construction, Divide into four quarters, Offsets (top, left) instead of copies
tech_th: สร้างแบบ recursive, แบ่งเป็นสี่ส่วน, ใช้ตำแหน่ง (top, left) แทนการคัดลอก
complexity: O(4^a) = O(side²) time and memory, the size of the output
key: The definition already is a divide-and-conquer recipe: H(a, b) is four copies of H(a−1, ·) with values b, b−1, b+1, b. Write one recursive function that fills a block of the final matrix given its corner (top, left), so no sub-matrix is ever copied.
key_th: นิยามของโจทย์คือสูตร divide and conquer อยู่แล้ว: H(a, b) คือ H(a−1, ·) สี่ชุดที่มีค่า b, b−1, b+1, b เขียนฟังก์ชัน recursive ตัวเดียวที่เติมบล็อกหนึ่งของเมทริกซ์คำตอบโดยรู้มุม (top, left) จึงไม่ต้องคัดลอกเมทริกซ์ย่อยเลย
tests: all 6 matrices printed in the PDF (H(3,3), H(0,0), H(1,0), H(1,5), H(2,1), H(2,7)) and every a = 0..8 with b ∈ {−100, −3, 0, 42, 100} against a Python version of the definition; a = 8 (256 × 256) in 0.01 s.
tests_th: เมทริกซ์ทั้ง 6 ตัวที่พิมพ์ใน PDF (H(3,3), H(0,0), H(1,0), H(1,5), H(2,1), H(2,7)) และทุก a = 0..8 กับ b ∈ {−100, −3, 0, 42, 100} เทียบกับโปรแกรม Python ที่ทำตามนิยาม กรณี a = 8 (256 × 256) ใช้ 0.01 วินาที
==== en
## Technique: recursive construction on a shared array

A recursive definition ("this object is made of smaller copies of itself") translates line by line into a recursive function. The base case of the definition becomes the base case of the function, and each piece becomes one recursive call.

The design question is **where the pieces go**. Building each sub-matrix as its own `vector` and then copying it into the parent costs extra memory and time at every level. Instead, pass the position of the block inside the one final matrix:

> `build(level, value, top, left)` writes H(level, value) into rows `top .. top + 2^level − 1` and columns `left .. left + 2^level − 1`.

## How it maps onto this problem

### Step 1: base case

H(0, value) is the 1 × 1 matrix [value], so `build(0, value, top, left)` just writes `matrix[top][left] = value`.

### Step 2: four quarters

For level ≥ 1, the side is `2^level` and each quarter has side `half = 2^(level−1)`:

```diagram
              left            left+half
top        +---------------+---------------+
           | H(level-1, v) | H(level-1,v-1)|
top+half   +---------------+---------------+
           | H(level-1,v+1)| H(level-1, v) |
           +---------------+---------------+
```

So the four calls are `(value, top, left)`, `(value−1, top, left+half)`, `(value+1, top+half, left)` and `(value, top+half, left+half)`.

{{viz}}

### Step 3: cost

Each call does O(1) work besides its four children, and the recursion tree has 1 + 4 + 16 + … + 4^a nodes, which is about (4/3)·4^a = O(side²). Printing the answer already takes side² numbers, so nothing can be faster.

:::idea A closed form, for the curious
Every step down adds 0, −1, +1 or 0 depending on the quarter, so the cell (row, column) equals b + (number of 1-bits in row) − (number of 1-bits in column). The recursion is the course technique and is what the problem trains; the formula is a nice check.
:::

## Solution

{{code}}

**Complexity.** O(4^a) calls with O(1) work each, plus printing side² = 4^a numbers. Memory: the side × side matrix: **O(4^a)**.

{{tested}}
==== th
## เทคนิค: สร้างแบบ recursive ลงบนอาร์เรย์เดียวกัน

นิยามแบบ recursive ("วัตถุนี้ประกอบจากสำเนาที่เล็กกว่าของตัวเอง") แปลเป็นฟังก์ชัน recursive ได้ทีละบรรทัด กรณีฐานของนิยามกลายเป็นกรณีฐานของฟังก์ชัน และแต่ละชิ้นกลายเป็นการเรียกตัวเองหนึ่งครั้ง

คำถามด้านการออกแบบคือ **ชิ้นส่วนไปอยู่ที่ไหน** ถ้าสร้างเมทริกซ์ย่อยแต่ละตัวเป็น `vector` ของมันเองแล้วคัดลอกเข้าเมทริกซ์แม่ จะเสียหน่วยความจำและเวลาเพิ่มทุกระดับ ให้ส่งตำแหน่งของบล็อกในเมทริกซ์คำตอบตัวเดียวแทน:

> `build(level, value, top, left)` เขียน H(level, value) ลงในแถว `top .. top + 2^level − 1` และคอลัมน์ `left .. left + 2^level − 1`

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: กรณีฐาน

H(0, value) คือเมทริกซ์ 1 × 1 [value] ดังนั้น `build(0, value, top, left)` แค่เขียน `matrix[top][left] = value`

### ขั้นที่ 2: สี่ส่วน

เมื่อ level ≥ 1 ด้านยาว `2^level` และแต่ละส่วนมีด้านยาว `half = 2^(level−1)`:

```diagram
              left            left+half
top        +---------------+---------------+
           | H(level-1, v) | H(level-1,v-1)|
top+half   +---------------+---------------+
           | H(level-1,v+1)| H(level-1, v) |
           +---------------+---------------+
```

การเรียกทั้งสี่จึงเป็น `(value, top, left)`, `(value−1, top, left+half)`, `(value+1, top+half, left)` และ `(value, top+half, left+half)`

{{viz}}

### ขั้นที่ 3: ค่าใช้จ่าย

แต่ละการเรียกทำงาน O(1) นอกจากลูกทั้งสี่ ต้นไม้ recursion มี 1 + 4 + 16 + … + 4^a โหนด ประมาณ (4/3)·4^a = O(side²) การพิมพ์คำตอบก็ต้องพิมพ์ side² ตัวอยู่แล้ว จึงเร็วกว่านี้ไม่ได้

:::idea สูตรปิด สำหรับคนที่อยากรู้
ทุกครั้งที่ลงไปหนึ่งระดับจะบวก 0, −1, +1 หรือ 0 ตามส่วนที่อยู่ ช่อง (row, column) จึงเท่ากับ b + (จำนวนบิต 1 ใน row) − (จำนวนบิต 1 ใน column) แต่ recursion คือเทคนิคของบทเรียนและเป็นสิ่งที่โจทย์ต้องการฝึก สูตรนี้เหมาะไว้ตรวจคำตอบ
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** O(4^a) การเรียก การเรียกละ O(1) บวกการพิมพ์ side² = 4^a ตัว หน่วยความจำ: เมทริกซ์ side × side: **O(4^a)**

{{tested}}
