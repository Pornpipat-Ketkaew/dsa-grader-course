title: Class Selection
title_th: เลือกวิชาเรียน (Class Selection)
stars: 1
tech: Greedy (interval scheduling), Earliest finish time first, Exchange argument
tech_th: Greedy (interval scheduling), เลือกที่จบเร็วที่สุดก่อน, การพิสูจน์แบบสลับ (exchange argument)
complexity: O(N log N) time (the sort) · O(N) memory
key: Sort the classes by finish time and scan once, keeping a class whenever it starts at or after the finish of the last kept class. Finishing as early as possible leaves the most room for everything after it, and an exchange argument proves no other choice can do better.
key_th: เรียงวิชาตามเวลาจบแล้วไล่ครั้งเดียว เก็บวิชาที่เริ่มตอนหรือหลังเวลาจบของวิชาที่เก็บล่าสุด การจบให้เร็วที่สุดเหลือเวลาให้วิชาหลังจากนั้นมากที่สุด และ exchange argument พิสูจน์ว่าไม่มีทางเลือกอื่นดีกว่า
tests: both PDF samples, a single class, 300 random cases against a brute force over all subsets, and N = 100 000 in well under the limit.
tests_th: ตัวอย่างทั้งสองใน PDF กรณีวิชาเดียว สุ่ม 300 ชุดเทียบกับ brute force ที่ลองทุกเซตย่อย และ N = 100 000 ใช้เวลาน้อยกว่าเวลาจำกัดมาก
==== en
## Technique: greedy, with a proof

A **greedy algorithm** builds the answer one irrevocable choice at a time, always taking the choice that looks best right now. It is fast (usually a sort plus one scan) but only correct when we can **prove** that the local choice never hurts. The usual proof tool is the **exchange argument**: take any optimal answer, swap one of its choices for the greedy one, and show it stays valid and no worse.

Interval scheduling ("choose the most non-overlapping intervals") is the textbook case, and its correct rule is **earliest finish time first**.

## How it maps onto this problem

### Step 1: the rule

Sort classes by `F`. Keep a running `lastFinish` (the finish of the last chosen class, −∞ at first). Walk the sorted list: if `S ≥ lastFinish` the class fits after everything chosen, so take it and set `lastFinish = F`; otherwise skip it.

The statement says classes `a` and `b` are compatible when `S[a] ≥ F[b]`, so touching is allowed: the test is `≥`, not `>`.

{{viz}}

### Step 2: why it is optimal (exchange argument)

Let `g` be the class with the earliest finish, and take any optimal schedule `O`. Let `o` be the class in `O` that finishes first.

- `F[g] ≤ F[o]` by the choice of `g`.
- Every other class in `O` starts at or after `F[o]`, hence at or after `F[g]`.
- So replacing `o` by `g` in `O` gives a valid schedule of the same size.

So some optimal schedule starts with `g`. Remove `g` and everything overlapping it; what remains is the same problem on the classes starting at or after `F[g]`, and the same argument applies again. The greedy therefore builds an optimal schedule step by step.

### Step 3: other "natural" rules are wrong

Earliest start, shortest class, fewest overlaps: each has a counterexample (see the [midterm version](a58_m_p4.html) of this problem, where all four rules race on the same input).

:::warn Traps
- Use `≥` when comparing start with `lastFinish` (sample 2 chains 1–2, 2–3, 3–4, 4–5 → 4).
- Sort pairs `(finish, start)`: sorting by start time is the classic wrong rule.
- Start times and finish times come on **two separate lines**, all starts first.
:::

## Solution

{{code}}

**Complexity.** Sorting dominates: **O(N log N)**; the scan is O(N). Memory: **O(N)**.

{{tested}}
==== th
## เทคนิค: greedy พร้อมการพิสูจน์

**อัลกอริทึม greedy** สร้างคำตอบทีละการตัดสินใจที่ย้อนกลับไม่ได้ โดยเลือกสิ่งที่ดูดีที่สุดในตอนนั้นเสมอ มันเร็ว (มักเป็นการเรียงหนึ่งครั้งกับการไล่หนึ่งรอบ) แต่จะถูกก็ต่อเมื่อเรา **พิสูจน์** ได้ว่าการเลือกเฉพาะหน้านั้นไม่ทำให้เสียหาย เครื่องมือพิสูจน์ที่ใช้บ่อยคือ **exchange argument**: นำคำตอบที่ดีที่สุดใด ๆ มาสลับการเลือกหนึ่งอย่างให้เป็นของ greedy แล้วแสดงว่ายังถูกต้องและไม่แย่ลง

Interval scheduling ("เลือกช่วงที่ไม่ทับกันให้ได้มากที่สุด") คือตัวอย่างตามตำรา และกฎที่ถูกต้องคือ **เลือกที่จบเร็วที่สุดก่อน**

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: กฎ

เรียงวิชาตาม `F` เก็บค่า `lastFinish` (เวลาจบของวิชาที่เลือกล่าสุด เริ่มที่ −∞) ไล่รายการที่เรียงแล้ว: ถ้า `S ≥ lastFinish` วิชานี้ต่อท้ายทุกวิชาที่เลือกได้ จึงเลือกและตั้ง `lastFinish = F` ไม่อย่างนั้นข้าม

โจทย์บอกว่าวิชา `a` และ `b` ใช้ห้องร่วมกันได้เมื่อ `S[a] ≥ F[b]` การชนกันพอดีจึงยอมได้: ใช้ `≥` ไม่ใช่ `>`

{{viz}}

### ขั้นที่ 2: ทำไมดีที่สุด (exchange argument)

ให้ `g` เป็นวิชาที่จบเร็วที่สุด และให้ `O` เป็นตารางที่ดีที่สุดใด ๆ ให้ `o` เป็นวิชาใน `O` ที่จบก่อนวิชาอื่น

- `F[g] ≤ F[o]` เพราะวิธีเลือก `g`
- วิชาอื่นทุกวิชาใน `O` เริ่มตอนหรือหลัง `F[o]` จึงเริ่มตอนหรือหลัง `F[g]` ด้วย
- ดังนั้นการแทน `o` ด้วย `g` ใน `O` ได้ตารางที่ถูกต้องและขนาดเท่าเดิม

แปลว่ามีตารางที่ดีที่สุดที่เริ่มด้วย `g` เอา `g` และทุกวิชาที่ทับมันออก ที่เหลือคือโจทย์เดิมบนวิชาที่เริ่มตอนหรือหลัง `F[g]` และใช้เหตุผลเดิมซ้ำได้ greedy จึงสร้างตารางที่ดีที่สุดทีละขั้น

### ขั้นที่ 3: กฎที่ "ดูเป็นธรรมชาติ" อื่น ๆ ผิด

เริ่มเร็วที่สุด, วิชาสั้นที่สุด, ทับน้อยที่สุด: ทุกกฎมีตัวอย่างค้าน (ดู [ข้อสอบกลางภาค](a58_m_p4.html) ของโจทย์เดียวกันนี้ ที่ให้ทั้งสี่กฎแข่งกันบนอินพุตเดียวกัน)

:::warn กับดัก
- ใช้ `≥` เมื่อเทียบเวลาเริ่มกับ `lastFinish` (ตัวอย่าง 2 ต่อกัน 1–2, 2–3, 3–4, 4–5 → 4)
- เรียงคู่ `(finish, start)`: การเรียงตามเวลาเริ่มคือกฎผิดคลาสสิก
- เวลาเริ่มและเวลาจบมาใน **สองบรรทัดแยกกัน** เวลาเริ่มทั้งหมดมาก่อน
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** การเรียงเป็นส่วนหลัก: **O(N log N)** การไล่เป็น O(N) หน่วยความจำ: **O(N)**

{{tested}}
