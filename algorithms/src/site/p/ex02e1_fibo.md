title: Fibonacci
title_th: ฟีโบนัชชี (Fibonacci)
stars: 1
tech: Dynamic programming (bottom-up table), Overlapping subproblems
tech_th: Dynamic programming (ตาราง bottom-up), ปัญหาย่อยที่ซ้อนทับกัน
complexity: O(N) time · O(N) memory
key: The recursive definition calls the same F(i) exponentially many times. There are only N + 1 different subproblems, so compute each once, from small to large, in a table.
key_th: นิยามแบบ recursive เรียก F(i) ตัวเดิมซ้ำเป็นจำนวนเลขชี้กำลัง แต่มีปัญหาย่อยต่างกันแค่ N + 1 ตัว จึงคำนวณแต่ละตัวครั้งเดียว จากเล็กไปใหญ่ ในตาราง
tests: all 3 PDF samples and every N from 1 to 45 against Python's exact big integers.
tests_th: ตัวอย่างทั้ง 3 ใน PDF และทุก N ตั้งแต่ 1 ถึง 45 เทียบกับจำนวนเต็มขนาดใหญ่แบบแม่นยำของ Python
==== en
## Technique: dynamic programming = recursion without repeated work

Dynamic programming (DP) applies when a problem has

1. **optimal / recursive substructure**: the answer is built from answers of smaller instances, and
2. **overlapping subproblems**: those smaller instances repeat many times.

Then each subproblem is solved **once** and stored. Two styles:

| style | how | when |
|---|---|---|
| top-down (memoization) | keep the recursion, cache each result in `memo[]` | natural, only visits needed states |
| bottom-up (tabulation) | fill a table in an order where every dependency is already filled | no recursion, usually simplest and fastest |

## How it maps onto this problem

### Step 1: the subproblems

F(i) depends on F(i−1) and F(i−2). The plain recursion for F(45) makes about 3.7·10⁹ calls because F(43), F(42), … are recomputed in every branch. Yet there are only 46 distinct values F(0) … F(45).

{{viz}}

### Step 2: the table and its order

`fib[index]` needs `fib[index−1]` and `fib[index−2]`, both smaller indices. So filling `index = 2, 3, …, N` in increasing order always finds its inputs ready.

### Step 3: size of the numbers

F(45) = 1 134 903 170 is just below 2³¹ − 1, so it fits in `int`, but the next sum would not. `long long` removes the worry.

:::idea Even less memory
Only the last two values are ever read, so two variables would do (O(1) memory). With N ≤ 45 the table is clearer and costs nothing.
:::

## Solution

{{code}}

**Complexity.** N − 1 additions: **O(N)** time, **O(N)** memory.

{{tested}}
==== th
## เทคนิค: dynamic programming = recursion ที่ไม่ทำงานซ้ำ

Dynamic programming (DP) ใช้ได้เมื่อโจทย์มี

1. **โครงสร้างย่อยแบบ recursive**: คำตอบสร้างจากคำตอบของโจทย์ที่เล็กกว่า และ
2. **ปัญหาย่อยที่ซ้อนทับกัน**: โจทย์ที่เล็กกว่าเหล่านั้นถูกถามซ้ำหลายครั้ง

แล้วแก้แต่ละปัญหาย่อย **ครั้งเดียว** และเก็บไว้ มีสองแบบ:

| แบบ | ทำอย่างไร | ใช้เมื่อ |
|---|---|---|
| top-down (memoization) | คง recursion ไว้ แคชผลแต่ละตัวใน `memo[]` | เป็นธรรมชาติ ไปเฉพาะสถานะที่ต้องใช้ |
| bottom-up (tabulation) | เติมตารางตามลำดับที่ทุกตัวที่ต้องพึ่งถูกเติมไว้แล้ว | ไม่มี recursion มักง่ายและเร็วที่สุด |

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: ปัญหาย่อย

F(i) ขึ้นกับ F(i−1) และ F(i−2) recursion ธรรมดาสำหรับ F(45) เรียกราว 3.7·10⁹ ครั้ง เพราะ F(43), F(42), … ถูกคำนวณใหม่ในทุกกิ่ง ทั้งที่มีค่าต่างกันแค่ 46 ค่า F(0) … F(45)

{{viz}}

### ขั้นที่ 2: ตารางและลำดับการเติม

`fib[index]` ต้องใช้ `fib[index−1]` และ `fib[index−2]` ซึ่งเป็นดัชนีที่เล็กกว่าทั้งคู่ การเติม `index = 2, 3, …, N` ตามลำดับจากน้อยไปมากจึงพบข้อมูลที่ต้องใช้พร้อมเสมอ

### ขั้นที่ 3: ขนาดตัวเลข

F(45) = 1 134 903 170 ต่ำกว่า 2³¹ − 1 เล็กน้อย จึงใส่ `int` ได้ แต่ผลบวกถัดไปจะไม่พอ ใช้ `long long` ก็หมดกังวล

:::idea ใช้หน่วยความจำน้อยลงอีก
มีแค่สองค่าล่าสุดที่ถูกอ่าน ใช้ตัวแปรสองตัวก็พอ (หน่วยความจำ O(1)) แต่เมื่อ N ≤ 45 ตารางอ่านง่ายกว่าและไม่เสียอะไร
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** บวก N − 1 ครั้ง: เวลา **O(N)** หน่วยความจำ **O(N)**

{{tested}}
