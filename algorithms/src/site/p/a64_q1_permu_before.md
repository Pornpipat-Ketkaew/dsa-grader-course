title: Permutation with Constraint
title_th: การเรียงสับเปลี่ยนที่มีเงื่อนไขก่อนหลัง
stars: 2
tech: Permutation backtracking, Pruning by precedence
tech_th: Backtracking สร้าง permutation, ตัดกิ่งด้วยเงื่อนไขลำดับก่อนหลัง
complexity: O(answers · n²) time · O(n) memory (+ output)
key: Generate permutations in lexicographic order by trying values 0..n−1 at each position, and refuse to place b while its required predecessor a is not yet placed. The rule is checked the moment it could break, so no dead branch survives a single step.
key_th: สร้าง permutation ตามลำดับพจนานุกรมโดยลองค่า 0..n−1 ที่แต่ละตำแหน่ง และไม่ยอมวาง b ถ้าตัวที่ต้องมาก่อน (a) ยังไม่ถูกวาง กฎถูกตรวจทันทีที่มีโอกาสผิด กิ่งที่ผิดจึงไม่รอดเกินหนึ่งก้าว
tests: all 5 PDF samples, an impossible case (0 before 1 and 1 before 0 → no output) and 300 random cases against a brute force that filters all n! permutations; n = 11 with 5 rules (1 247 400 lines) in 0.22 s and n = 20 with a chain of 19 rules (one answer) instantly.
tests_th: ตัวอย่างทั้ง 5 ใน PDF กรณีเป็นไปไม่ได้ (0 ก่อน 1 และ 1 ก่อน 0 → ไม่พิมพ์อะไร) และสุ่ม 300 ชุดเทียบกับ brute force ที่กรองทั้ง n! แบบ กรณี n = 11 มี 5 กฎ (1 247 400 บรรทัด) ใช้ 0.22 วินาที และ n = 20 ที่เป็นสายกฎ 19 ข้อ (คำตอบเดียว) เสร็จทันที
==== en
## Technique: permutation backtracking + pruning at the earliest moment

The standard permutation generator keeps `used[value]` and, at each position, tries every unused value in increasing order:

```cpp
for (value = 0; value < n; value++)
    if (!used[value]) { used[value] = true; perm[position] = value;
                        generate(position + 1);
                        used[value] = false; }
```

Trying values in increasing order at every position produces the permutations in **lexicographic order**, which is exactly the vector order the statement defines.

The extra skill here is **pruning**: reject a partial permutation as soon as it **can no longer** become valid, instead of building all n! and checking at the end.

## How it maps onto this problem

### When can "a before b" break?

The rule fails exactly when b is placed while a is still unplaced. Since positions are filled left to right, a would then end up after b. So the check belongs **at the moment b is placed**:

> b may be placed only if `used[a]` is already true.

Every b appears in at most one rule, so one array `mustComeAfter[b] = a` (or NONE) stores all rules.

```diagram
n = 4, rules: 3 before 2, 2 before 1
position 0: try 0 ✓   try 1 ✗ (needs 2)   try 2 ✗ (needs 3)   try 3 ✓
under "0":  try 1 ✗   try 2 ✗   try 3 ✓  → "0 3": try 1 ✗  try 2 ✓ → "0 3 2": try 1 ✓ → 0 3 2 1
```

:::key The check is exact
If b passes the test, then a is already to its left, and the rule can never break later. If b fails, every completion of this prefix violates the rule. So every leaf the search reaches is a valid permutation, and no final check is needed.
:::

Without pruning, n = 20 means 20! ≈ 2.4·10¹⁸ leaves. With a chain of rules 0 → 1 → … → 19, the pruned search walks a single path.

{{viz}}

### Output volume

The answer itself can be large (11!/2⁵ = 1 247 400 lines in one of the tests). Build the lines in one `string` and print once, with fast I/O as the statement suggests.

:::warn Traps
- Checking the rules only at the leaf: correct but too slow for the last 50% of the tests.
- Checking "a is placed" at the moment **a** is placed: that is the wrong side of the rule.
- Contradictory rules (0 before 1 and 1 before 0) produce no lines at all.
:::

## Solution

{{code}}

**Complexity.** Each call loops over n values with an O(1) test, so the cost is O(n) per node of the pruned tree; the tree has at most n levels above each printed permutation: **O(answers · n²)** in the worst case, plus the output. Memory: O(n) plus the output buffer.

{{tested}}
==== th
## เทคนิค: backtracking สร้าง permutation + ตัดกิ่งเร็วที่สุด

ตัวสร้าง permutation มาตรฐานเก็บ `used[value]` และที่แต่ละตำแหน่งลองทุกค่าที่ยังไม่ใช้ตามลำดับจากน้อยไปมาก:

```cpp
for (value = 0; value < n; value++)
    if (!used[value]) { used[value] = true; perm[position] = value;
                        generate(position + 1);
                        used[value] = false; }
```

การลองค่าจากน้อยไปมากทุกตำแหน่งทำให้ได้ permutation ตาม **ลำดับพจนานุกรม** ซึ่งตรงกับลำดับแบบ vector ที่โจทย์นิยาม

ทักษะเพิ่มในข้อนี้คือ **การตัดกิ่ง**: ทิ้ง permutation ที่สร้างไปได้บางส่วนทันทีที่มัน **ไม่มีทาง** ถูกต้องได้อีก แทนการสร้างครบ n! แบบแล้วตรวจตอนท้าย

## นำมาใช้กับโจทย์นี้อย่างไร

### กฎ "a ก่อน b" ผิดได้เมื่อไหร่?

กฎผิดก็ต่อเมื่อวาง b ในขณะที่ a ยังไม่ถูกวาง เพราะตำแหน่งถูกเติมจากซ้ายไปขวา a จะไปอยู่หลัง b การตรวจจึงต้องอยู่ **ตอนวาง b**:

> วาง b ได้ก็ต่อเมื่อ `used[a]` เป็นจริงแล้ว

b แต่ละตัวอยู่ในกฎไม่เกินหนึ่งข้อ อาร์เรย์เดียว `mustComeAfter[b] = a` (หรือ NONE) จึงเก็บกฎได้ทั้งหมด

```diagram
n = 4, กฎ: 3 ก่อน 2, 2 ก่อน 1
ตำแหน่ง 0: ลอง 0 ✓   ลอง 1 ✗ (ต้องมี 2)   ลอง 2 ✗ (ต้องมี 3)   ลอง 3 ✓
ใต้ "0":   ลอง 1 ✗   ลอง 2 ✗   ลอง 3 ✓  → "0 3": ลอง 1 ✗  ลอง 2 ✓ → "0 3 2": ลอง 1 ✓ → 0 3 2 1
```

:::key การตรวจนี้แม่นยำ
ถ้า b ผ่านการตรวจ แปลว่า a อยู่ทางซ้ายแล้ว และกฎนี้ไม่มีทางผิดในภายหลัง ถ้า b ไม่ผ่าน ทุกวิธีเติมต่อจาก prefix นี้ผิดกฎแน่นอน ทุกใบที่การค้นหาไปถึงจึงเป็น permutation ที่ถูกต้อง ไม่ต้องตรวจซ้ำตอนท้าย
:::

ถ้าไม่ตัดกิ่ง n = 20 มีใบถึง 20! ≈ 2.4·10¹⁸ ใบ แต่ถ้ากฎเป็นสาย 0 → 1 → … → 19 การค้นหาที่ตัดกิ่งแล้วเดินแค่เส้นทางเดียว

{{viz}}

### ปริมาณผลลัพธ์

คำตอบเองอาจใหญ่ (11!/2⁵ = 1 247 400 บรรทัดในชุดทดสอบหนึ่ง) สร้างบรรทัดลงใน `string` เดียวแล้วพิมพ์ครั้งเดียว พร้อม fast I/O ตามที่โจทย์แนะนำ

:::warn กับดัก
- ตรวจกฎตอนถึงใบเท่านั้น: ถูกแต่ช้าเกินไปสำหรับ 50% สุดท้าย
- ตรวจ "a ถูกวางแล้ว" ตอนวาง **a**: ตรวจผิดฝั่งของกฎ
- กฎขัดแย้งกัน (0 ก่อน 1 และ 1 ก่อน 0) ทำให้ไม่มีบรรทัดใดเลย
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** แต่ละการเรียกวนค่า n ค่าพร้อมการตรวจ O(1) จึงใช้ O(n) ต่อโหนดของต้นไม้ที่ตัดกิ่งแล้ว ต้นไม้มีไม่เกิน n ระดับเหนือแต่ละ permutation ที่พิมพ์: **O(คำตอบ · n²)** ในกรณีแย่สุด บวกขนาดผลลัพธ์ หน่วยความจำ: O(n) บวกบัฟเฟอร์ผลลัพธ์

{{tested}}
