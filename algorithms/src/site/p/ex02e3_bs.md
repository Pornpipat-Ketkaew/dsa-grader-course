title: Binary Search Near Repeat
title_th: Binary Search Near Repeat (ค่าซ้ำได้ ตอบดัชนี)
stars: 1
tech: Binary search with an invariant, Equal values on the left side: the last copy
tech_th: Binary search ด้วยเงื่อนไขคงที่, ค่าที่เท่ากันอยู่ฝั่งซ้าย: ได้สำเนาตัวสุดท้าย
complexity: O(N + M log N) time · O(N) memory
key: Same boundary search as Binary Search Near, but now values repeat and the answer is an index. Because "A[i] ≤ x" puts every copy of x on the yes side, left ends on the last copy automatically; −1 comes out by itself when nothing is ≤ x.
key_th: การค้นหารอยต่อเหมือน Binary Search Near แต่ค่าซ้ำได้และคำตอบเป็นดัชนี เพราะ "A[i] ≤ x" ทำให้สำเนาของ x ทุกตัวอยู่ฝั่งใช่ left จึงจบที่สำเนาตัวสุดท้ายเอง และได้ −1 เองเมื่อไม่มีค่าใด ≤ x
tests: the PDF sample, an array of equal values, 300 random cases with many repeats against a linear scan, and N = M = 100 000 in 0.02 s.
tests_th: ตัวอย่างใน PDF อาร์เรย์ที่ค่าเท่ากันหมด สุ่ม 300 ชุดที่มีค่าซ้ำเยอะเทียบกับการไล่ทีละตัว และ N = M = 100 000 ใช้ 0.02 วินาที
==== en
## Technique: which side do equal values go to?

With repeated values, "first or last copy?" is the classic binary-search bug. The invariant template answers it by the **question** you ask, not by ±1 fiddling:

| question `yes(i)` | boundary found | standard name |
|---|---|---|
| A[i] < x | left = last value < x, right = **first copy of x** (or first > x) | lower_bound |
| A[i] ≤ x | left = **last copy of x** (or last < x), right = first > x | upper_bound |

So for any search on repeated values, decide which side the equal values belong to, and write that comparison.

## How it maps onto this problem

### Step 1: the question

"Largest index whose value is not more than x": all copies of x count, and we want the last of them, so equal values go to the **yes** side: `yes(i) = A[i] <= x`. The answer is **left**.

### Step 2: no special cases

- x smaller than A[0]: left never moves, stays −1, which is exactly the required output.
- x at least A[n − 1]: right never moves, left ends at n − 1.

```diagram
A:      10 13 14 14 14 15 16 16 18 200        x = 14
yes?     ✓  ✓  ✓  ✓  ✓  ✗  ✗  ✗  ✗  ✗
                     ↑left ↑right               answer 4
```

{{viz}}

:::warn Traps
- `A[i] < x` instead of `A[i] <= x`: gives the index before the first 14 (1), not the last 14 (4).
- Printing the value instead of the index (the statement's output sentence says "element", but the samples print indices).
- Library binary search is forbidden here too.
:::

## Solution

{{code}}

**Complexity.** **O(N + M log N)**. Memory: **O(N)**.

{{tested}}
==== th
## เทคนิค: ค่าที่เท่ากันไปอยู่ฝั่งไหน?

เมื่อค่าซ้ำได้ "สำเนาแรกหรือสำเนาสุดท้าย?" คือบั๊กคลาสสิกของ binary search แม่แบบเงื่อนไขคงที่ตอบเรื่องนี้ด้วย **คำถาม** ที่เราถาม ไม่ใช่การปรับ ±1:

| คำถาม `yes(i)` | รอยต่อที่ได้ | ชื่อมาตรฐาน |
|---|---|---|
| A[i] < x | left = ค่าสุดท้ายที่ < x, right = **สำเนาแรกของ x** (หรือตัวแรกที่ > x) | lower_bound |
| A[i] ≤ x | left = **สำเนาสุดท้ายของ x** (หรือตัวสุดท้ายที่ < x), right = ตัวแรกที่ > x | upper_bound |

ดังนั้นทุกการค้นหาบนค่าซ้ำ ให้ตัดสินใจว่าค่าที่เท่ากันอยู่ฝั่งไหน แล้วเขียนการเปรียบเทียบนั้น

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: คำถาม

"ดัชนีที่มากที่สุดที่ค่าไม่เกิน x": สำเนาของ x ทุกตัวนับ และเราต้องการตัวสุดท้าย ค่าที่เท่ากันจึงอยู่ฝั่ง **ใช่**: `yes(i) = A[i] <= x` คำตอบคือ **left**

### ขั้นที่ 2: ไม่มีกรณีพิเศษ

- x น้อยกว่า A[0]: left ไม่ขยับ อยู่ที่ −1 ซึ่งตรงกับผลลัพธ์ที่ต้องการพอดี
- x อย่างน้อย A[n − 1]: right ไม่ขยับ left จบที่ n − 1

```diagram
A:      10 13 14 14 14 15 16 16 18 200        x = 14
ใช่?     ✓  ✓  ✓  ✓  ✓  ✗  ✗  ✗  ✗  ✗
                     ↑left ↑right               คำตอบ 4
```

{{viz}}

:::warn กับดัก
- `A[i] < x` แทน `A[i] <= x`: ได้ดัชนีก่อน 14 ตัวแรก (1) ไม่ใช่ 14 ตัวสุดท้าย (4)
- พิมพ์ค่าแทนดัชนี (ประโยคผลลัพธ์ในโจทย์เขียนว่า "element" แต่ตัวอย่างพิมพ์ดัชนี)
- ข้อนี้ก็ห้ามใช้ binary search ของไลบรารีเช่นกัน
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** **O(N + M log N)** หน่วยความจำ: **O(N)**

{{tested}}
