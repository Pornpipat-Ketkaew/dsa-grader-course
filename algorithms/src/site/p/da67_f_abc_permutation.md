title: ABC Permutation
title_th: เรียงสับเปลี่ยน ABC
stars: 2
tech: Backtracking with a remaining-count array, Choose / explore / un-choose
tech_th: Backtracking พร้อมอาร์เรย์นับที่เหลือ, เลือก / สำรวจ / ยกเลิก
complexity: O(3^N · N) time · O(N) memory (+ output)
key: Fill the N positions left to right; at each position try A, B, C in alphabetical order if that letter still has copies left. Alphabetical order at every level gives dictionary order of the whole strings, and the count is known only at the end, so buffer the lines.
key_th: เติม N ตำแหน่งจากซ้ายไปขวา ที่แต่ละตำแหน่งลอง A, B, C ตามลำดับตัวอักษรถ้าตัวนั้นยังมีเหลือ การเรียงตามตัวอักษรทุกระดับให้ลำดับพจนานุกรมของทั้งสตริง และรู้จำนวนตอนจบเท่านั้น จึงเก็บบรรทัดไว้ก่อน
tests: the three PDF samples plus 3 hand cases (one with no answer) and 300 random (N, i, j, k) against a brute force over all 3^N strings. ASan + UBSan clean.
tests_th: ตัวอย่างทั้งสามใน PDF และกรณีที่คิดเอง 3 ชุด (ชุดหนึ่งไม่มีคำตอบ) และสุ่ม 300 ชุด (N, i, j, k) เทียบกับ brute force ที่ลองทั้ง 3^N สตริง ไม่พบข้อผิดพลาดจาก ASan + UBSan
==== en
## Technique: backtracking with "choose → explore → un-choose"

This is the canonical **permutation-with-limited-supply** backtracking from Lesson 11:

```cpp
void generate(int position) {
    if (position == length) { record word; return; }
    for (letter in alphabetical order)
        if (remaining[letter] > 0) {
            remaining[letter]--;  word[position] = letter;   // choose
            generate(position + 1);                          // explore
            remaining[letter]++;                             // un-choose
        }
}
```

The array `remaining[]` is the whole state. Decrement before the recursive call, increment right after: when a call returns, the state is exactly as it was before it was made.

## How it maps onto this problem

### "at most i, j, k", not "exactly"

Look at sample 1: N = 2, i = 0, j = 1, k = 3 gives BC, CB, **CC**. The counts are **upper limits**, and the string has length N (not i + j + k). So a letter is allowed while `remaining[letter] > 0`, and a string is complete when it has N letters, whatever is left over.

### Dictionary order comes for free

At every position we try A, then B, then C. Two strings first differ at some position p; the one with the smaller letter at p was produced in an earlier branch of the call at depth p. So the leaves appear in dictionary order, with no sorting.

```diagram
N = 2, A ≤ 1, B ≤ 1, C ≤ 3        remaining shown as (A,B,C)
                    start (1,1,3)
          ┌───────────┼───────────┐
          A (0,1,3)   B (1,0,3)   C (1,1,2)
        ┌─┴─┐       ┌─┴─┐       ┌─┼─┐
        B   C       A   C       A B C
        AB  AC      BA  BC      CA CB CC         7 strings, already sorted
        (A used up under A: no AA)
```

### Print the count first

The first output line is P, but we only know P after the search. Append each finished string to an output buffer, count them, and print `P` followed by the buffer.

{{viz}}

:::warn Traps
- Forgetting the un-choose step (`remaining[letter]++`): later branches see too few letters.
- Treating i, j, k as exact counts: sample 1 would print nothing.
- P can be 0 (for example N = 3 with only 2 letters available in total): print just `0`.
- Partial credit (40%) exists for printing only P correctly, but the full search is cheap: at most 3¹² ≈ 5.3·10⁵ strings.
:::

## Solution

{{code}}

**Complexity.** Each call does O(3) work. The tree has depth N and at most 3^N leaves (≈ 5.3·10⁵ for N = 12), so the search is O(3^N · N) in the worst case, and the output itself is P·(N + 1) characters. Memory: depth N plus the output buffer.

{{tested}}
==== th
## เทคนิค: backtracking แบบ "เลือก → สำรวจ → ยกเลิก"

นี่คือ backtracking มาตรฐานของ **การเรียงสับเปลี่ยนที่มีจำนวนจำกัด** ในบทที่ 11:

```cpp
void generate(int position) {
    if (position == length) { record word; return; }
    for (letter in alphabetical order)
        if (remaining[letter] > 0) {
            remaining[letter]--;  word[position] = letter;   // choose
            generate(position + 1);                          // explore
            remaining[letter]++;                             // un-choose
        }
}
```

อาร์เรย์ `remaining[]` คือสถานะทั้งหมด ลดค่าก่อนเรียกตัวเอง และเพิ่มคืนทันทีหลังกลับมา: เมื่อการเรียกจบ สถานะจะเหมือนก่อนเรียกทุกประการ

## นำมาใช้กับโจทย์นี้อย่างไร

### "ไม่เกิน i, j, k" ไม่ใช่ "พอดี"

ดูตัวอย่างที่ 1: N = 2, i = 0, j = 1, k = 3 ได้ BC, CB, **CC** จำนวนที่ให้มาคือ **ขีดจำกัดบน** และสตริงยาว N (ไม่ใช่ i + j + k) ตัวอักษรจึงใช้ได้ตราบที่ `remaining[letter] > 0` และสตริงเสร็จเมื่อครบ N ตัว ไม่ว่าจะเหลือตัวไหนอยู่

### ได้ลำดับพจนานุกรมฟรี

ทุกตำแหน่งลอง A แล้ว B แล้ว C สองสตริงที่ต่างกันครั้งแรกที่ตำแหน่ง p ตัวที่มีตัวอักษรเล็กกว่าที่ p ถูกสร้างในกิ่งที่มาก่อนของการเรียกที่ความลึก p ใบจึงออกมาตามลำดับพจนานุกรมโดยไม่ต้องเรียง

```diagram
N = 2, A ≤ 1, B ≤ 1, C ≤ 3        remaining แสดงเป็น (A,B,C)
                    start (1,1,3)
          ┌───────────┼───────────┐
          A (0,1,3)   B (1,0,3)   C (1,1,2)
        ┌─┴─┐       ┌─┴─┐       ┌─┼─┐
        B   C       A   C       A B C
        AB  AC      BA  BC      CA CB CC         7 สตริง เรียงแล้ว
        (ใต้ A ใช้ A หมดแล้ว: ไม่มี AA)
```

### พิมพ์จำนวนก่อน

บรรทัดแรกคือ P แต่เรารู้ P หลังค้นหาเสร็จ จึงต่อสตริงที่เสร็จแต่ละตัวลงบัฟเฟอร์ นับไว้ แล้วพิมพ์ `P` ตามด้วยบัฟเฟอร์

{{viz}}

:::warn กับดัก
- ลืมขั้นยกเลิก (`remaining[letter]++`): กิ่งถัดไปจะเห็นตัวอักษรน้อยเกินจริง
- ถือว่า i, j, k เป็นจำนวนพอดี: ตัวอย่างที่ 1 จะไม่พิมพ์อะไรเลย
- P เป็น 0 ได้ (เช่น N = 3 แต่มีตัวอักษรรวมแค่ 2 ตัว): พิมพ์แค่ `0`
- มีคะแนนบางส่วน (40%) ถ้าพิมพ์ P ถูกอย่างเดียว แต่การค้นหาเต็มถูกมาก: ไม่เกิน 3¹² ≈ 5.3·10⁵ สตริง
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** แต่ละการเรียกทำงาน O(3) และจำนวนใบไม่เกิน 3^N ≈ 5.3·10⁵ เมื่อ N = 12 หน่วยความจำ: ความลึก N บวกบัฟเฟอร์ผลลัพธ์

{{tested}}
