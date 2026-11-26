title: ABCD Permutation
title_th: เรียงสับเปลี่ยน ABCD
stars: 2
tech: Backtracking with a remaining-count array, Dictionary order by construction
tech_th: Backtracking พร้อมอาร์เรย์นับที่เหลือ, ได้ลำดับพจนานุกรมจากวิธีสร้าง
complexity: O(4^N · N) time · O(N) memory (+ output)
key: Same skeleton as ABC Permutation with four letters: at each of the N positions try A, B, C, D in order while that letter has copies left (at most a, b, c, d). Buffer the strings, then print the count and the buffer.
key_th: โครงเดียวกับ ABC Permutation แต่มีสี่ตัวอักษร: ที่แต่ละตำแหน่งจาก N ตำแหน่ง ลอง A, B, C, D ตามลำดับตราบที่ตัวนั้นยังเหลือ (ไม่เกิน a, b, c, d) เก็บสตริงไว้ แล้วพิมพ์จำนวนตามด้วยบัฟเฟอร์
tests: both PDF samples, the all-different case "4 1 1 1 1" (24 permutations) and 300 random (N, a, b, c, d) against a brute force over all 4^N strings. ASan + UBSan clean.
tests_th: ตัวอย่างทั้งสองใน PDF กรณีต่างกันหมด "4 1 1 1 1" (24 แบบ) และสุ่ม 300 ชุด (N, a, b, c, d) เทียบกับ brute force ที่ลองทั้ง 4^N สตริง ไม่พบข้อผิดพลาดจาก ASan + UBSan
==== en
## Technique: limited-supply permutations by backtracking

The state of the search is one small array, `remaining[4]` = how many more copies of A, B, C, D may still be used. The recursion fills one position per level:

1. **choose** a letter with `remaining > 0`: decrement it and write it at `position`;
2. **explore**: `generate(position + 1)`;
3. **un-choose**: increment it back.

After step 3 the array is exactly as before step 1, so the next letter at the same position starts from a clean state. That symmetry is what makes backtracking correct.

## How it maps onto this problem

### Reading the limits correctly

The statement says each letter appears **at most** a, b, c, d times, and the length is N. Sample 1 (N = 2, a = 2, b = 2, c = 1, d = 0) prints AA, AB, AC, BA, BB, BC, CA, CB: AA and BB are allowed (a, b ≥ 2), CC is not (c = 1), and nothing contains D.

### Dictionary order

Trying the letters in the order A, B, C, D at every depth produces the strings in dictionary order. Proof sketch: two strings first differ at position p; the one with the smaller letter at p belongs to an earlier child of the same call at depth p, and the whole subtree of an earlier child is printed before any later child's subtree.

```diagram
N = 2, a=2 b=2 c=1 d=0                 start
                     ┌───────────────┬──┴────────────┬─────────────┐
                     A               B               C             D ✕ (d = 0)
               ┌─────┼─────┐   ┌─────┼─────┐   ┌─────┤
               AA    AB    AC  BA    BB    BC  CA    CB    CC ✕ (c used up)
```

### Count first, lines after

P is printed before the strings, so the strings go into a buffer during the search; the count is printed once the search is over. With N ≤ 9 the worst case is 4⁹ = 262 144 strings, about 2.6 MB of output: a single `cout << output` is fast.

{{viz}}

:::warn Traps
- Forgetting `remaining[letter]++` after the recursive call.
- Requiring that all copies be used (that would be "exactly a, b, c, d").
- Printing the strings before P.
:::

## Solution

{{code}}

**Complexity.** Each call loops over 4 letters; the tree has depth N and at most 4^N leaves (262 144 for N = 9): **O(4^N · N)** in the worst case including writing the strings. Memory: depth N plus the output buffer.

{{tested}}
==== th
## เทคนิค: การเรียงสับเปลี่ยนที่มีจำนวนจำกัดด้วย backtracking

สถานะของการค้นหาคืออาร์เรย์เล็ก ๆ ตัวเดียว `remaining[4]` = ยังใช้ A, B, C, D ได้อีกกี่ตัว recursion เติมหนึ่งตำแหน่งต่อหนึ่งระดับ:

1. **เลือก** ตัวอักษรที่ `remaining > 0`: ลดค่าลงและเขียนที่ `position`
2. **สำรวจ**: `generate(position + 1)`
3. **ยกเลิก**: เพิ่มค่าคืน

หลังขั้นที่ 3 อาร์เรย์จะเหมือนก่อนขั้นที่ 1 ทุกประการ ตัวอักษรถัดไปที่ตำแหน่งเดิมจึงเริ่มจากสถานะที่สะอาด ความสมมาตรนี้คือสิ่งที่ทำให้ backtracking ถูกต้อง

## นำมาใช้กับโจทย์นี้อย่างไร

### อ่านขีดจำกัดให้ถูก

โจทย์บอกว่าแต่ละตัวอักษรมี **ได้ไม่เกิน** a, b, c, d ตัว และความยาวคือ N ตัวอย่างที่ 1 (N = 2, a = 2, b = 2, c = 1, d = 0) พิมพ์ AA, AB, AC, BA, BB, BC, CA, CB: AA และ BB ได้ (a, b ≥ 2) CC ไม่ได้ (c = 1) และไม่มี D เลย

### ลำดับพจนานุกรม

การลองตัวอักษรตามลำดับ A, B, C, D ทุกระดับทำให้ได้สตริงตามลำดับพจนานุกรม เหตุผลย่อ: สองสตริงที่ต่างกันครั้งแรกที่ตำแหน่ง p ตัวที่มีตัวอักษรเล็กกว่าที่ p อยู่ในลูกที่มาก่อนของการเรียกเดียวกันที่ความลึก p และกิ่งย่อยทั้งหมดของลูกที่มาก่อนถูกพิมพ์ก่อนกิ่งย่อยของลูกที่มาทีหลังเสมอ

```diagram
N = 2, a=2 b=2 c=1 d=0                 start
                     ┌───────────────┬──┴────────────┬─────────────┐
                     A               B               C             D ✕ (d = 0)
               ┌─────┼─────┐   ┌─────┼─────┐   ┌─────┤
               AA    AB    AC  BA    BB    BC  CA    CB    CC ✕ (C หมดแล้ว)
```

### จำนวนก่อน บรรทัดทีหลัง

P ต้องพิมพ์ก่อนสตริง สตริงจึงถูกเก็บในบัฟเฟอร์ระหว่างค้นหา แล้วพิมพ์จำนวนเมื่อค้นหาเสร็จ เมื่อ N ≤ 9 กรณีแย่สุดคือ 4⁹ = 262 144 สตริง ประมาณ 2.6 MB การ `cout << output` ครั้งเดียวเร็วพอ

{{viz}}

:::warn กับดัก
- ลืม `remaining[letter]++` หลังเรียกตัวเอง
- บังคับให้ใช้ครบทุกตัว (นั่นคือ "พอดี a, b, c, d")
- พิมพ์สตริงก่อน P
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** แต่ละการเรียกวนสี่ตัวอักษร ต้นไม้ลึก N และมีใบไม่เกิน 4^N ใบ (262 144 เมื่อ N = 9): **O(4^N · N)** ในกรณีแย่สุดรวมการเขียนสตริง หน่วยความจำ: ความลึก N บวกบัฟเฟอร์ผลลัพธ์

{{tested}}
