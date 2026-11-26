title: Grandfather
title_th: ปู่ (Grandfather)
stars: 2
tech: Hash map (unordered_map), Parent pointers
tech_th: Hash map (unordered_map), ตัวชี้ไปยังพ่อ (parent pointer)
complexity: O(N + M) average time · O(N) memory
key: Store fatherOf[son] in a hash map keyed by the 13-digit id. A grandfather is two look-ups away; two people are cousins iff they differ and both grandfathers exist and are equal.
key_th: เก็บ fatherOf[son] ใน hash map โดยใช้เลขบัตร 13 หลักเป็นคีย์ ปู่อยู่ห่างไปสองครั้งของการค้นหา สองคนเป็นลูกพี่ลูกน้องเมื่อเป็นคนละคน ปู่ของทั้งคู่มีจริงและเป็นคนเดียวกัน
tests: both PDF samples and 300 random family forests (shared grandfathers, unknown people, a == b, siblings) against a brute force; a 10⁶ + 10⁶ timing case runs in about 0.7 s. ASan + UBSan clean.
tests_th: ตัวอย่างทั้ง 2 ชุดใน PDF และสุ่มป่าครอบครัว 300 ชุด (ปู่ร่วมกัน, คนที่ไม่รู้จัก, a == b, พี่น้อง) เทียบกับ brute force กรณีใหญ่ 10⁶ + 10⁶ ใช้เวลาประมาณ 0.7 วินาที ไม่พบข้อผิดพลาดจาก ASan + UBSan
==== en
## Technique: a hash map as a "parent pointer" array

A family is a **forest**: every person has at most one father. The classic way to store a forest is a *parent array* `parent[v]`. Here the ids are up to 10¹³, far too large to index an array, so the array becomes a **hash map** `unordered_map<long long, long long>`: same idea, O(1) average per access, memory proportional only to the N stored edges.

## How it maps onto this problem

### The structure

Each input line "F S" is one edge child → father: `fatherOf[S] = F`.

```diagram
            1                 fatherOf
          ┌─┴─┐               2  → 1
          2   3               3  → 1
         ┌┴┐  │               20 → 2
        20 21 30              21 → 2
                              30 → 3
```

### Grandfather = two hops

`grandfatherOf(x)` follows the pointer twice: x → father → grandfather. Either hop may fail (the person or the father is not in the data); then the grandfather is **unknown**.

:::key Use find(), not operator[]
`fatherOf[x]` on a missing key **inserts** x with value 0. That silently creates fake people (and "father 0" would make unrelated people look related). Always look up with `find()` and compare with `end()`.
:::

### The cousin test

Two people A and B are cousins iff all three hold:

1. A ≠ B (a person is not their own cousin);
2. A's grandfather is known;
3. B's grandfather is the same person.

Siblings also share a grandfather, and the statement's definition counts them too. Only "same grandfather and different people" matters.

```diagram
query  (20, 30):  20 → 2 → 1      30 → 3 → 1      same grandfather 1, 20 ≠ 30  → YES
query  (2, 30):   2 → 1 → ?       grandfather of 2 unknown                     → NO
query  (20, 20):  same person                                                  → NO
```

{{viz}}

### Why it is fast enough

N and M are both up to 10⁶, so the program does about 2·10⁶ insertions/lookups and reads 4·10⁶ numbers.

- `reserve(2N)` allocates the buckets once, avoiding repeated rehashing while inserting a million keys.
- `ios_base::sync_with_stdio(false); cin.tie(nullptr);` and `'\n'` (not `endl`) keep the I/O linear.

:::warn Traps
- `int` ids: 13 digits overflow `int`. Use `long long`.
- `std::map` works but is O(log N) per access and noticeably slower on 2·10⁶ operations.
- Treating "unknown == unknown" as equal: two people with no known grandfather are **not** cousins.
:::

## Solution

{{code}}

**Complexity.** Each of the N insertions and 2M grandfather queries is O(1) on average: **O(N + M)**. The map holds N entries: **O(N)** memory.

{{tested}}
==== th
## เทคนิค: ใช้ hash map เป็นอาร์เรย์ "ตัวชี้ไปยังพ่อ"

ครอบครัวคือ **ป่า (forest)** เพราะทุกคนมีพ่อได้อย่างมากหนึ่งคน วิธีมาตรฐานในการเก็บป่าคือ *อาร์เรย์พ่อ* `parent[v]` แต่ในข้อนี้เลขบัตรใหญ่ถึง 10¹³ ใช้เป็นดัชนีอาร์เรย์ไม่ได้ เราจึงเปลี่ยนอาร์เรย์เป็น **hash map** `unordered_map<long long, long long>`: แนวคิดเดิม เข้าถึงเฉลี่ย O(1) และใช้หน่วยความจำตามจำนวนเส้น N เส้นที่เก็บเท่านั้น

## นำมาใช้กับโจทย์นี้อย่างไร

### โครงสร้างข้อมูล

แต่ละบรรทัด "F S" คือเส้นเชื่อมหนึ่งเส้น ลูก → พ่อ: `fatherOf[S] = F`

```diagram
            1                 fatherOf
          ┌─┴─┐               2  → 1
          2   3               3  → 1
         ┌┴┐  │               20 → 2
        20 21 30              21 → 2
                              30 → 3
```

### ปู่ = กระโดดสองครั้ง

`grandfatherOf(x)` ตามตัวชี้สองครั้ง: x → พ่อ → ปู่ ครั้งใดครั้งหนึ่งอาจล้มเหลว (ไม่มีข้อมูลของคนนั้นหรือของพ่อ) เมื่อนั้นถือว่า **ไม่รู้จักปู่**

:::key ใช้ find() ไม่ใช่ operator[]
`fatherOf[x]` เมื่อไม่มีคีย์ x จะ **แทรก** x ด้วยค่า 0 ทันที ทำให้เกิดคนปลอมขึ้นเงียบ ๆ (และ "พ่อหมายเลข 0" อาจทำให้คนที่ไม่เกี่ยวกันดูเหมือนเป็นญาติ) ให้ค้นหาด้วย `find()` แล้วเทียบกับ `end()` เสมอ
:::

### การตรวจลูกพี่ลูกน้อง

A กับ B เป็นลูกพี่ลูกน้องเมื่อครบสามข้อ:

1. A ≠ B (คนเดียวกันไม่ใช่ลูกพี่ลูกน้องของตัวเอง)
2. รู้จักปู่ของ A
3. ปู่ของ B เป็นคนเดียวกัน

พี่น้องแท้ ๆ ก็มีปู่คนเดียวกัน และนิยามของโจทย์นับรวมด้วย สิ่งที่สำคัญมีแค่ "ปู่คนเดียวกันและเป็นคนละคน"

```diagram
คำถาม (20, 30):  20 → 2 → 1      30 → 3 → 1      ปู่คือ 1 เหมือนกัน และ 20 ≠ 30  → YES
คำถาม (2, 30):   2 → 1 → ?       ไม่รู้จักปู่ของ 2                               → NO
คำถาม (20, 20):  คนเดียวกัน                                                       → NO
```

{{viz}}

### ทำไมเร็วพอ

N และ M ใหญ่ได้ถึง 10⁶ โปรแกรมจึงแทรก/ค้นหาประมาณ 2·10⁶ ครั้ง และอ่านตัวเลข 4·10⁶ ตัว

- `reserve(2N)` จองถังไว้ครั้งเดียว ไม่ต้อง rehash ซ้ำ ๆ ระหว่างแทรกคีย์นับล้าน
- `ios_base::sync_with_stdio(false); cin.tie(nullptr);` และ `'\n'` (ไม่ใช่ `endl`) ทำให้ I/O เป็นเชิงเส้น

:::warn กับดัก
- ใช้ `int` เก็บเลขบัตร: 13 หลักล้น `int` ต้องใช้ `long long`
- `std::map` ใช้ได้แต่ O(log N) ต่อครั้ง และช้ากว่าชัดเจนเมื่อทำ 2·10⁶ ครั้ง
- ถือว่า "ไม่รู้จัก == ไม่รู้จัก" เท่ากัน: สองคนที่ไม่รู้จักปู่ทั้งคู่ **ไม่ใช่** ลูกพี่ลูกน้อง
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** การแทรก N ครั้งและการหาปู่ 2M ครั้ง ครั้งละ O(1) โดยเฉลี่ย: **O(N + M)** map เก็บ N รายการ: หน่วยความจำ **O(N)**

{{tested}}
