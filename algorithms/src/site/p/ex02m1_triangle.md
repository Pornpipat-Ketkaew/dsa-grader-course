title: Number Triangle
title_th: สามเหลี่ยมตัวเลข (Number Triangle)
stars: 2
tech: Dynamic programming bottom-up, Optimal substructure, In-place 1-D table
tech_th: Dynamic programming แบบ bottom-up, โครงสร้างย่อยที่เหมาะสมที่สุด, ตารางหนึ่งมิติแบบเขียนทับ
complexity: O(N²) time · O(N) extra memory
key: The best route from a cell is the cell's number plus the better of the best routes from its two children. Compute that from the bottom level upward; the answer is the value at the top. One row array is enough because each entry is overwritten only after it has been read.
key_th: เส้นทางที่ดีที่สุดจากช่องหนึ่งคือตัวเลขของช่องนั้นบวกกับเส้นทางที่ดีที่สุดของลูกที่ดีกว่าในสองตัว คำนวณจากระดับล่างสุดขึ้นไป คำตอบคือค่าที่ยอด อาร์เรย์แถวเดียวก็พอเพราะแต่ละช่องถูกเขียนทับหลังจากถูกอ่านแล้วเท่านั้น
tests: all 3 PDF samples, 300 random triangles (N ≤ 12) against a brute force over all 2^(N−1) routes, and N = 100 with every number 1000 (answer 100 000).
tests_th: ตัวอย่างทั้ง 3 ใน PDF สามเหลี่ยมสุ่ม 300 ชุด (N ≤ 12) เทียบกับ brute force ที่ลองทุกเส้นทาง 2^(N−1) แบบ และ N = 100 ที่ทุกตัวเป็น 1000 (คำตอบ 100 000)
==== en
## Technique: optimal substructure, solved bottom-up

A problem has **optimal substructure** when an optimal solution is made of optimal solutions of subproblems. For routes: the best route from a cell continues with the best route from whichever child it goes to; otherwise we could swap in a better tail and improve it.

So we define the subproblem, find its recurrence, and fill a table in an order where the children are known first.

## How it maps onto this problem

### Step 1: the subproblem

> `best[level][position]` = the largest sum of a route that **starts** at (level, position) and goes down to the bottom.

From (level, position) the route goes to (level+1, position) or (level+1, position+1), so

> `best[level][position] = triangle[level][position] + max(best[level+1][position], best[level+1][position+1])`,

with `best[bottom][position] = triangle[bottom][position]`. The answer is `best[0][0]`.

### Step 2: fill order

Every entry reads the level below, so fill levels from the bottom up: `level = N−2 down to 0`. The loop variable counts down past 0, so it must be a signed `int`.

{{viz}}

### Step 3: one row is enough

Inside one level, going left to right, `best[position]` is overwritten after `best[position]` and `best[position+1]` were read. `best[position+1]` is still the level below, because it is overwritten only in the next step. So a single array of length N holds the whole DP.

:::warn Why not greedy?
Going to the larger child each step fails on Fig. 1: from 7, greedy picks 8 and ends with 7+8+1+7+5 = 28, while the optimum goes through the smaller 3 (7+3+8+7+5 = 30). The DP looks at whole subtrees, not single numbers.
:::

## Solution

{{code}}

**Complexity.** N(N+1)/2 entries, O(1) each: **O(N²)** time. Memory: the triangle O(N²) plus one row **O(N)**.

{{tested}}
==== th
## เทคนิค: โครงสร้างย่อยที่เหมาะสมที่สุด แก้แบบ bottom-up

โจทย์มี **optimal substructure** เมื่อคำตอบที่ดีที่สุดประกอบจากคำตอบที่ดีที่สุดของปัญหาย่อย สำหรับเส้นทาง: เส้นทางที่ดีที่สุดจากช่องหนึ่งจะเดินต่อด้วยเส้นทางที่ดีที่สุดจากลูกที่มันลงไป ไม่อย่างนั้นเราสลับเอาหางที่ดีกว่ามาใส่และทำให้ดีขึ้นได้

เราจึงนิยามปัญหาย่อย หาสูตรเวียนเกิด และเติมตารางตามลำดับที่รู้ค่าของลูกก่อน

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: ปัญหาย่อย

> `best[level][position]` = ผลรวมมากที่สุดของเส้นทางที่ **เริ่ม** ที่ (level, position) แล้วลงไปถึงล่างสุด

จาก (level, position) เส้นทางไป (level+1, position) หรือ (level+1, position+1) ดังนั้น

> `best[level][position] = triangle[level][position] + max(best[level+1][position], best[level+1][position+1])`

โดย `best[ล่างสุด][position] = triangle[ล่างสุด][position]` คำตอบคือ `best[0][0]`

### ขั้นที่ 2: ลำดับการเติม

ทุกช่องอ่านระดับข้างล่าง จึงเติมจากล่างขึ้นบน: `level = N−2 ลงไปถึง 0` ตัวแปรลูปนับลงผ่าน 0 จึงต้องเป็น `int` ที่มีเครื่องหมาย

{{viz}}

### ขั้นที่ 3: แถวเดียวก็พอ

ภายในระดับเดียว ไล่จากซ้ายไปขวา `best[position]` ถูกเขียนทับหลังจากอ่าน `best[position]` และ `best[position+1]` แล้ว `best[position+1]` ยังเป็นค่าของระดับล่าง เพราะมันถูกเขียนทับในก้าวถัดไปเท่านั้น อาร์เรย์ยาว N ตัวเดียวจึงเก็บ DP ทั้งหมดได้

:::warn ทำไมไม่ใช้ greedy?
การเลือกลูกที่มากกว่าทุกก้าวพังในรูปที่ 1: จาก 7 greedy เลือก 8 และจบที่ 7+8+1+7+5 = 28 แต่คำตอบที่ดีที่สุดผ่าน 3 ที่น้อยกว่า (7+3+8+7+5 = 30) DP ดูทั้งกิ่งย่อย ไม่ใช่แค่ตัวเลขตัวเดียว
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** N(N+1)/2 ช่อง ช่องละ O(1): เวลา **O(N²)** หน่วยความจำ: สามเหลี่ยม O(N²) บวกแถวเดียว **O(N)**

{{tested}}
