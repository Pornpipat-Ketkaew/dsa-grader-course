title: Matrix Modulo
title_th: เมทริกซ์มอดุโล (Matrix Modulo)
stars: 2
tech: Divide and conquer exponentiation (fast power), Modular arithmetic
tech_th: ยกกำลังแบบ divide and conquer (fast power), เลขคณิตมอดุลาร์
complexity: O(log n) matrix multiplications · O(log n) recursion depth
key: A^n = (A^(n/2))² when n is even and (A^(n/2))²·A when n is odd. Solve the half problem once, reuse it twice, so n ≤ 2^30 needs about 30 levels instead of 10^9 multiplications. Reduce every entry mod k after each multiplication so numbers stay below 10^8.
key_th: A^n = (A^(n/2))² เมื่อ n เป็นเลขคู่ และ (A^(n/2))²·A เมื่อ n เป็นเลขคี่ แก้ปัญหาครึ่งหนึ่งครั้งเดียวแล้วใช้ซ้ำสองครั้ง n ≤ 2^30 จึงใช้แค่ราว 30 ระดับแทนการคูณ 10^9 ครั้ง ลดทุกช่องด้วย mod k หลังการคูณทุกครั้งเพื่อให้ตัวเลขไม่เกิน 10^8
tests: all 4 PDF samples, n = 1 (must print A mod k), k = 1, n = 2^30, and 300 random cases against a direct loop; n = 2^30 − 1 with k = 9973 checked against Python's exact square-and-multiply.
tests_th: ตัวอย่างทั้ง 4 ใน PDF, n = 1 (ต้องพิมพ์ A mod k), k = 1, n = 2^30 และสุ่ม 300 ชุดเทียบกับการวนลูปตรง ๆ กรณี n = 2^30 − 1 กับ k = 9973 ตรวจกับ Python ที่ยกกำลังแบบ square-and-multiply ด้วยจำนวนเต็มแม่นยำ
==== en
## Technique: divide and conquer on the exponent

Computing A^n by n − 1 multiplications is O(n), too slow for n = 2^30. Divide and conquer splits the exponent in half:

```diagram
A^n = A^(n/2) · A^(n/2)          n even
A^n = A^(n/2) · A^(n/2) · A      n odd        (n/2 rounded down)
A^1 = A                          base case
```

The key is that **both halves are the same matrix**: compute `half = A^(n/2)` once and multiply it by itself. Each call halves n, so there are about log₂ n ≤ 30 calls, each doing at most 2 multiplications.

This works for anything with an associative multiplication: numbers, matrices, and (here) matrices mod k.

## How it maps onto this problem

### Step 1: a 2×2 multiply that stays small

The statement gives the rule (MN) mod k = ((M mod k)(N mod k)) mod k. So:

1. Reduce A's entries mod k right after reading.
2. In `multiply`, take every result entry mod k.

Then every entry is < k ≤ 10 000, each product is < 10^8, and a sum of two products is < 2·10^8: `long long` is more than enough (even `int` would fit).

### Step 2: the recursion

```cpp
Matrix power(A, exponent):
    if exponent == 1: return A
    half = power(A, exponent / 2)        // ONE recursive call
    result = half * half
    if exponent is odd: result = result * A
    return result
```

Calling `power` twice for the two halves would rebuild the same matrix twice per level, giving 2^30 calls again. One call per level is what makes it logarithmic.

{{viz}}

:::warn Traps
- n = 1: the answer is A mod k, not A. Reducing A right after reading handles this.
- k = 1: every entry is 0.
- Take mod k after **every** multiplication. Without it the entries grow exponentially and overflow after a few levels.
:::

## Solution

{{code}}

**Complexity.** About log₂ n ≤ 30 levels, each with at most two 2×2 multiplications (8 products each): **O(log n)**. Memory: recursion depth O(log n).

{{tested}}
==== th
## เทคนิค: divide and conquer บนเลขชี้กำลัง

การหา A^n ด้วยการคูณ n − 1 ครั้งเป็น O(n) ช้าเกินไปเมื่อ n = 2^30 divide and conquer แบ่งเลขชี้กำลังครึ่งหนึ่ง:

```diagram
A^n = A^(n/2) · A^(n/2)          n คู่
A^n = A^(n/2) · A^(n/2) · A      n คี่         (n/2 ปัดลง)
A^1 = A                          กรณีฐาน
```

หัวใจคือ **ครึ่งทั้งสองเป็นเมทริกซ์เดียวกัน**: คำนวณ `half = A^(n/2)` ครั้งเดียวแล้วคูณกับตัวเอง ทุกการเรียกแบ่ง n ครึ่ง จึงมีราว log₂ n ≤ 30 การเรียก แต่ละครั้งคูณไม่เกิน 2 ครั้ง

ใช้ได้กับทุกอย่างที่การคูณมีสมบัติการเปลี่ยนกลุ่ม: ตัวเลข เมทริกซ์ และ (ในข้อนี้) เมทริกซ์ mod k

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: การคูณ 2×2 ที่ตัวเลขไม่โต

โจทย์ให้กฎ (MN) mod k = ((M mod k)(N mod k)) mod k ดังนั้น:

1. ลดสมาชิกของ A ด้วย mod k ทันทีหลังอ่าน
2. ใน `multiply` ให้ mod k ทุกช่องของผลลัพธ์

แล้วทุกช่องจะ < k ≤ 10 000 ผลคูณแต่ละตัว < 10^8 และผลบวกของผลคูณสองตัว < 2·10^8: `long long` เพียงพอเกินพอ (`int` ก็ยังพอ)

### ขั้นที่ 2: recursion

```cpp
Matrix power(A, exponent):
    if exponent == 1: return A
    half = power(A, exponent / 2)        // เรียกตัวเองครั้งเดียว
    result = half * half
    if exponent is odd: result = result * A
    return result
```

ถ้าเรียก `power` สองครั้งสำหรับสองครึ่ง จะสร้างเมทริกซ์เดิมซ้ำสองรอบในทุกระดับ กลับไปเป็น 2^30 การเรียกอีก การเรียกครั้งเดียวต่อระดับคือสิ่งที่ทำให้เป็น log

{{viz}}

:::warn กับดัก
- n = 1: คำตอบคือ A mod k ไม่ใช่ A การลด A ทันทีหลังอ่านจัดการกรณีนี้
- k = 1: ทุกช่องเป็น 0
- ต้อง mod k หลังการคูณ **ทุกครั้ง** ถ้าไม่ทำ สมาชิกจะโตแบบเลขชี้กำลังและล้นภายในไม่กี่ระดับ
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** ราว log₂ n ≤ 30 ระดับ แต่ละระดับคูณเมทริกซ์ 2×2 ไม่เกินสองครั้ง (ครั้งละ 8 ผลคูณ): **O(log n)** หน่วยความจำ: ความลึก recursion O(log n)

{{tested}}
